import CloseIcon from '@mui/icons-material/Close';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Autocomplete,
  Button,
  FormControl,
  Input,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import { experimentalStyled as styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import AppGrid from 'src/components/App/AppGrid';
import { submitFormData } from '../api/AddSalesapi';
import DynamicHeader from './tableFooter';
import AddCustomer from './AddCustomer';
import { Save } from '@mui/icons-material';
import CustomerDialog from 'src/modules/Customer/Component/CustomerDialog';
import Breadcrumbs from 'src/components/shared/BreadCrumbs/Breadcrumb';
import Textarea from 'src/components/shared/Form/Textarea';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function AddOrders() {
  const [formState, setFormState] = useState(() => {
    const savedState = localStorage.getItem('form-Data');
    const parsedState = savedState ? JSON.parse(savedState) : {};
    const today = new Date();
    return savedState
      ? JSON.parse(savedState)
      : {
          selectedDate: parsedState.selectedDate ? new Date(parsedState.selectedDate) : today,
          referenceNo: '',
          biller: null,
          warehouse: null,
          customer: null,
          total_items: null,
          walkInCustomer: true,
          items: [],
          totalQuantity: '',
          total: '',
          orderDiscount: '',
          shipping: '',
          selectedFile: null,
          saleStatus: null,
          paymentTerm: '',
          payment_status: null,
          saleNote: '',
          staffNote: '',
        };
  });

  const [selectedDate, setSelectedDate] = useState(formState.selectedDate);
  const [selectedFile, setSelectedFile] = useState(formState.selectedFile);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState([]);
  const [addedProducts, setAddedProducts] = useState(() => {
    const SavedData = localStorage.getItem('form-Data');
    const parsedData = SavedData ? JSON.parse(SavedData) : null;
    return parsedData?.items || [];
  });
  const [customer, setCustomer] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoadingOption, setIsLoadingOption] = useState(false);
  // const [Total, setSubToTal] = useState([]);
  const Biller = [{ title: 'Unleash POS LLC' }];
  const Warehouse = [{ title: 'Unleash POS LLC' }];
  const salestatus = [{ title: 'Pending' }, { title: 'Completed' }, { title: 'Allocated' }];
  const PaymentStatus = [
    { title: 'Pending' },
    { title: 'Due' },
    { title: 'Partial' },
    { title: 'Paid' },
  ];
  const fetchProducts = useCallback(
    debounce(async (search) => {
      if (search) {
        const limit = 10;
        try {
          const response = await fetch(
            `https://dev.unleashpos.com/api/v1/products?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos&name=${search}&limit=${limit}`,
          );
          const data = await response.json();
          setProducts(data.data || []);
          setIsLoadingOption(false);
        } catch (error) {
          console.error('Error fetching products:', error);
          setProducts([]);
        }
      } else {
        setProducts([]);
      }
    }, 300),
    [],
  );
  const fetchCustomer = async () => {
    try {
      const response = await fetch(
        `https://dev.unleashpos.com/api/v1/customers?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos`,
      );
      const data = await response.json();
      console.log('data', data);
      const customerCompanies = data.data.map((customer, index) => ({
        title: `${customer.company},(${customer.person}) ${customer.city}`,
        id: index + 1,
      }));
      console.log('cusotmer', customer);
      setCustomer(customerCompanies);
      setIsLoadingOption(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormState((prevState) => ({ ...prevState, selectedDate: date }));
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    setFormState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleInputChange = (event, search) => {
    if (search !== '') {
      setIsLoadingOption(true);
      fetchProducts(search);
    } else {
      setProducts([]);
    }
  };

  const handleAddProduct = (product) => {
    setAddedProducts((prev) => {
      const existingProductIndex = prev.findIndex((p) => p.name === product.name);
      if (existingProductIndex === -1) {
        const newProduct = { ...product, Quantity: 1 };
        newProduct.subtotal = calculateProductSubtotal(newProduct);
        const updatedProducts = [...prev, newProduct];

        const total = calculateTotal(updatedProducts);
        const totalQuantity = calculateTotalQuantity(updatedProducts);

        setFormState((prevState) => ({
          ...prevState,
          items: updatedProducts,
          total_items: updatedProducts.length,
          totalQuantity: totalQuantity,
          total: total,
        }));
        return updatedProducts;
      } else {
        const updatedProducts = [...prev];
        updatedProducts[existingProductIndex].Quantity += 1;
        updatedProducts[existingProductIndex].subtotal = calculateProductSubtotal(
          updatedProducts[existingProductIndex],
        );
        const total = calculateTotal(updatedProducts);
        const totalQuantity = calculateTotalQuantity(updatedProducts);

        setFormState((prevState) => ({
          ...prevState,
          items: updatedProducts,
          total_items: updatedProducts.length,
          totalQuantity: totalQuantity,
          total: total,
        }));
        return updatedProducts;
      }
    });
  };

  const handleRemoveProduct = (index) => {
    setAddedProducts((prev) => {
      const updatedProducts = prev.filter((_, i) => i !== index);
      const total = calculateTotal(updatedProducts);
      const updatedFormState = {
        ...formState,
        items: updatedProducts,
        total_items: updatedProducts.length,
        totalQuantity: calculateTotalQuantity(updatedProducts),
        total: total,
      };

      setFormState(updatedFormState);
      localStorage.setItem('form-Data', JSON.stringify(updatedFormState));

      return updatedProducts;
    });
  };

  const calculateTotalQuantity = (items) => {
    return items.reduce((total, item) => total + (item.Quantity || 0), 0);
  };
  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + (item.subtotal || 0), 0);
  };

  const calculateProductSubtotal = (product) => {
    const price = product?.price || 0;
    const quantity = product?.Quantity || 1;
    const discount = product?.discount || 0;
    const productTax = product?.productTax || 0;
    const stateTax = product?.state_tax || 0;
    const countyTax = product?.county_tax || 0;
    const cityTax = product?.city_tax || 0;
    const totalTax = productTax + stateTax + countyTax + cityTax;
    return price * quantity + totalTax - discount;
  };

  const handleQuantityChange = (e, index) => {
    const value = parseInt(e.target.value, 10);
    const updatedQuantity = isNaN(value) ? 0 : Math.max(value, 0);

    setAddedProducts((prev) => {
      const updatedProducts = [...prev];
      updatedProducts[index].Quantity = updatedQuantity;
      updatedProducts[index].subtotal = calculateProductSubtotal(updatedProducts[index]);
      const totalQuantity = calculateTotalQuantity(updatedProducts);
      const total = calculateTotal(updatedProducts);
      setFormState((prevState) => ({
        ...prevState,
        items: updatedProducts,
        totalQuantity: totalQuantity,
        total: total,
      }));

      return updatedProducts;
    });
  };

  useEffect(() => {
    localStorage.setItem('form-Data', JSON.stringify(formState));
  }, [formState]);

  const handleAutocompleteChange = (name) => (event, newValue) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: newValue ? newValue.title : '',
    }));
  };
  const handleAutocompleteChanges = (name) => (event, newValue) => {
    if (newValue) {
      setFormState((prevState) => ({
        ...prevState,
        [name]: newValue.id,
      }));
    }
  };

  const handleReset = () => {
    const today = new Date();
    const initialFormState = {
      selectedDate: today,
      referenceNo: '',
      biller: null,
      warehouse: null,
      customer: null,
      walkInCustomer: true,
      items: [],
      totalQuantity: '',
      total: '',
      total_items: '',
      orderDiscount: '',
      shipping: '',
      selectedFile: null,
      salestatus: null,
      paymentTerm: '',
      payment_status: null,
      saleNote: '',
      staffNote: '',
    };
    setFormState(initialFormState);
    setAddedProducts([]);
    setCustomer([]);
    setSelectedFile(null);
    setSelectedDate(today);
    localStorage.removeItem('form-Data');
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const Handlepopup = () => {
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const id = open ? 'simple-popover' : undefined;
  const columns1 = [
    { name: 'Product (Code - Name)', label: 'Product (Code - Name)' },
    { name: 'Serial No', label: 'Serial No' },
    { name: 'Price', label: 'Price' },
    {
      name: 'Quantity',
      label: 'Quantity',
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <TextField
              type="text"
              value={addedProducts[dataIndex]?.Quantity || ''}
              onChange={(e) => handleQuantityChange(e, dataIndex)}
              inputProps={{
                min: 1,
                style: { textAlign: 'center' },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                width: '80px',
                '& input': {
                  textAlign: 'center',
                },
              }}
            />
          );
        },
      },
    },
    { name: 'Discount', label: 'Discount' },
    { name: 'Product Tax', label: 'Product Tax' },
    { name: 'State Tax', label: 'State Tax' },
    { name: 'County Tax', label: 'County Tax' },
    { name: 'City Tax', label: 'City Tax' },
    {
      name: 'Subtotal',
      label: 'Subtotal',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const product = addedProducts[dataIndex];
          const subtotal = calculateProductSubtotal(product);
          return `$${subtotal.toFixed(2)}`;
        },
      },
    },
    {
      name: 'Actions',
      label: 'Actions',
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <Button onClick={() => handleRemoveProduct(dataIndex)}>
              <CloseIcon />
            </Button>
          );
        },
      },
    },
  ];

  const Data = addedProducts.map((item, index) => ({
    'Product (Code - Name)': item.name,
    'Serial No': item.product_code,
    Price: item.price,
    Quantity: item.Quantity || '0',
    Discount: item.discount || '$0.00',
    'Product Tax': item.productTax || '$0.00',
    'State Tax': item.state_tax || '$0.00',
    'County Tax': item.county_tax || '$0.00',
    'City Tax': item.city_tax || '$0.00',
    Subtotal: item.subtotal || '$0.00',
  }));

  const getaddress = async () => {
    const company_id = localStorage.getItem('company_id');
    try {
      const response = await axios.post(`https://dev.unleashpos.com/api/v1/companies`, {
        'api-key': 'kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos',
        company_id: company_id,
      });
      const data = response.data;
      console.log('address', data.data[1]);
      setAddress(data.data[1]);
    } catch (error) {
      console.error('Error fetching address:', error);
      return {};
    }
  };

  const handleSubmit = async () => {
    try {
      const company_id = localStorage.getItem('Company_id');
      const responses = await axios.post(`https://dev.unleashpos.com/api/v1/companies`, {
        'api-key': 'kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos',
        company_id: company_id,
      });
      const sale = responses.data;
      // console.log('address', sale.data[0]);
      const Datas = sale.data[1];
      const submittedItems = formState.items.map((item) => ({
        quantity: item.Quantity,
        id: item.id,
      }));
      const Add = '2';
      const data = {
        items: submittedItems,
        customer_id: formState.customer,
        paid_by: formState.salestatus,
        payment_status: formState.payment_status,
        total_items: formState.total_items,
        total: formState.total,
        company_id: company_id,
        address_id: Add,
        'api-key': 'kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos',
      };

      const response = await submitFormData(data);
      console.log('Submitted Data', data);
      return response;
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Breadcrumbs />
      <Item>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={4}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  size="small"
                  label="Date"
                  value={formState.selectedDate ? new Date(formState.selectedDate) : null}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <FormControl fullWidth>
              <TextField
                size="small"
                name="referenceNo"
                value={formState.referenceNo}
                onChange={handleChange}
                label="Reference No"
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <FormControl fullWidth>
              <Autocomplete
                options={Biller}
                size="small"
                clearOnEscape
                value={Biller.find((option) => option.title === formState.biller) || null}
                onChange={handleAutocompleteChange('biller')}
                getOptionLabel={(option) => `${option.title}`}
                renderInput={(params) => <TextField {...params} label="Biller" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <FormControl fullWidth>
              <Autocomplete
                options={Warehouse}
                size="small"
                clearOnEscape
                value={Warehouse.find((option) => option.title === formState.warehouse) || null}
                onChange={handleAutocompleteChange('warehouse')}
                getOptionLabel={(option) => `${option.title}`}
                renderInput={(params) => <TextField {...params} label="Warehouse*" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <FormControl fullWidth>
                <Autocomplete
                  key={customer.id || []}
                  options={customer || []}
                  // key={customer.id}
                  size="small"
                  clearOnEscape
                  value={customer.find((option) => option.title === formState.customer) || null}
                  getOptionLabel={(option) => option.title || ''}
                  renderInput={(params) => <TextField {...params} label="Customer*" />}
                  onInputChange={(event, newValue) => {
                    if (newValue.length > 2) {
                      fetchCustomer(newValue);
                    } else {
                      setCustomer([]);
                    }
                  }}
                  noOptionsText="Type to search for a customer"
                  onChange={handleAutocompleteChanges('customer')}
                  freeSolo
                  loading={isLoadingOption}
                  loadingText="Loading...."
                />
                {/* {!formState.customer && <FormHelperText>This field is required</FormHelperText>} */}
              </FormControl>
              <ModeEditOutlineOutlinedIcon />
              <IconButton onClick={Handlepopup}>
                <VisibilityIcon />
              </IconButton>
              <CustomerDialog
                open={openPopup}
                handleClose={handleClosePopup}
                // detailData={detailData}
              />
              <IconButton onClick={handleOpen}>
                <PersonAddIcon />
              </IconButton>
              <AddCustomer open={open} handleClose={handleClose} />
            </Stack>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Stack sx={{ display: 'flex', justifyContent: 'center' }}>
              <FormGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
                <FormControlLabel
                  label="Walk in Customer"
                  labelPlacement="start"
                  control={
                    <Switch
                      name="walkInCustomer"
                      onChange={handleChange}
                      checked={formState.walkInCustomer}
                      color="secondary"
                    />
                  }
                />
              </FormGroup>
            </Stack>
          </Grid>
          <Grid item xs={2} sm={4} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  clearOnEscape
                  size="small"
                  options={products || []}
                  getOptionLabel={(option) => option.name || ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Product"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  onInputChange={handleInputChange}
                  onChange={(event, newValue) => {
                    if (newValue) handleAddProduct(newValue);
                  }}
                  freeSolo
                  loading={isLoadingOption}
                  loadingText={
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <CircularProgress size={20} color="secondary" />
                    </Box>
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} sm={4} md={12}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: '500',
                marginLeft: '5px',
                justifyContent: 'left',
                display: 'flex',
                alignItems: 'left',
                marginBottom: 1,
              }}
            >
              Order Items*
            </Typography>
            <Box
              sx={{
                maxHeight: '200px',
                overflowY: 'auto',
              }}
            >
              <AppGrid
                data={Data}
                columns={columns1}
                options={{
                  selectableRows: false,
                  selectableRowsHideCheckboxes: true,
                  textLabels: {
                    body: {
                      noMatch: '',
                    },
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <FormControl fullWidth>
              <TextField
                size="small"
                name="orderDiscount"
                value={formState.orderDiscount}
                onChange={handleChange}
                label="Order Discount"
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <FormControl fullWidth>
              <TextField
                size="small"
                label="Shipping"
                name="shipping"
                value={formState.shipping}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <FormControl fullWidth>
              <Input
                type="file"
                name="selectedFile"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedFile(file);
                  setFormState((prevState) => ({ ...prevState, selectedFile: file }));
                }}
                inputProps={{ accept: '.pdf,.doc,.docx,.jpg,.png' }}
              />
              {selectedFile && <p>{`Selected file: ${selectedFile.name}`}</p>}
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <FormControl fullWidth>
              <Autocomplete
                size="small"
                options={salestatus}
                clearOnEscape
                value={salestatus.find((options) => options.title === formState.salestatus) || null}
                onChange={handleAutocompleteChange('salestatus')}
                getOptionLabel={(option) => `${option.title}`}
                renderInput={(params) => <TextField {...params} label="Sale Status *" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <FormControl fullWidth>
              <TextField
                size="small"
                label="Payment Term"
                name="paymentTerm"
                value={formState.paymentTerm}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <FormControl fullWidth>
              <Autocomplete
                size="small"
                options={PaymentStatus}
                clearOnEscape
                value={
                  PaymentStatus.find((options) => options.title === formState.payment_status) ||
                  null
                }
                onChange={handleAutocompleteChange('payment_status')}
                getOptionLabel={(option) => `${option.title}`}
                renderInput={(params) => <TextField {...params} label="Payment Status *" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={4} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Sale Note"
                name="saleNote"
                value={formState.saleNote}
                onChange={handleChange}
                multiline
                rows={2}
                variant="outlined"
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={4} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Staff Note"
                name="staffNote"
                value={formState.staffNote}
                onChange={handleChange}
                multiline
                rows={2}
                variant="outlined"
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0 }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{ mr: 2, borderRadius: '5px' }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: '5px',
                color: 'red',
                border: '1px solid red',
              }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={2} sm={4} md={12}>
            <DynamicHeader data={formState} />
          </Grid>
        </Grid>
        {/* <Box sx={{ mt: 2 }}></Box> */}
      </Item>
    </Box>
  );
}
