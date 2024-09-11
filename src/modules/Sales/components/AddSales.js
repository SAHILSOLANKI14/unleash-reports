import React, { useState, useEffect, useCallback } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
  FormControl,
  TextField,
  Autocomplete,
  Stack,
  Input,
  Button,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DenseTable from 'src/modules/Categories/Component/ProductDetailTableGrid';
import { submitFormData } from '../api/AddSalesapi';
import CloseIcon from '@mui/icons-material/Close';
import { debounce } from 'lodash';
import AppGrid from 'src/components/App/AppGrid';
import FormHelperText from '@mui/material/FormHelperText';
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
          walkInCustomer: true,
          items: [],
          orderDiscount: '',
          shipping: '',
          selectedFile: null,
          saleStatus: null,
          paymentTerm: '',
          paymentStatus: null,
          saleNote: '',
          staffNote: '',
        };
  });

  const [selectedDate, setSelectedDate] = useState(formState.selectedDate);
  const [selectedFile, setSelectedFile] = useState(formState.selectedFile);
  const [products, setProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [customer, setCustomer] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormState((prevState) => ({ ...prevState, selectedDate: date }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    setFormState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const fetchProducts = useCallback(
    debounce(async (search) => {
      if (search) {
        const limit = 10;
        try {
          const response = await fetch(
            `https://dev.unleashpos.com/api/v1/products?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos&name=${search}&limit=${limit}`,
          );
          const data = await response.json();
          setFormState((prevState) => ({
            ...prevState,
            items: data.data || [],
          }));
        } catch (error) {
          console.error('Error fetching products:', error);
          setFormState((prevState) => ({
            ...prevState,
            items: [],
          }));
        }
      } else {
        setFormState((prevState) => ({
          ...prevState,
          items: [],
        }));
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
      const customerCompanies = data.data.map((customer) => ({
        title: customer.company,
      }));
      setCustomer(customerCompanies);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // console.log('Customers', customer);

  const handleInputChange = (event, search) => {
    if (search !== '') {
      fetchProducts(search);
    } else {
      setProducts([]);
    }
  };

  const handleAddProduct = (product) => {
    setAddedProducts((prev) => {
      const updatedProducts = [...prev, product];
      setFormState((prevState) => ({
        ...prevState,
        items: updatedProducts,
      }));
      return updatedProducts;
    });
  };
  const handleRemoveProduct = (index) => {
    setAddedProducts((prev) => {
      const updatedProducts = prev.filter((_, i) => i !== index);
      setFormState((prevState) => ({
        ...prevState,
        items: updatedProducts,
      }));
      return updatedProducts;
    });
  };
  useEffect(() => {
    localStorage.setItem('form-Data', JSON.stringify(formState));
    // fetchCustomer();
  }, [formState]);

  const columns1 = [
    { name: 'Product (Code - Name)', label: 'Product (Code - Name)' },
    { name: 'Serial No', label: 'Serial No' },
    { name: 'Price', label: 'Price' },
    { name: 'Quantity', label: 'Quantity' },
    { name: 'Discount', label: 'Discount' },
    { name: 'Product Tax', label: 'Product Tax' },
    { name: 'State Tax', label: 'State Tax' },
    { name: 'County Tax', label: 'County Tax' },
    { name: 'City Tax', label: 'City Tax' },
    { name: 'Subtotal', label: 'Subtotal' },
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

  const columns2 = [
    { name: 'Items', label: 'Items' },
    { name: 'Total', label: 'Total' },
    { name: 'Order Discount', label: 'Order Discount' },
    { name: 'Shipping', label: 'Shipping' },
    { name: 'Grand Total', label: 'Grand Total' },
  ];

  const Data = addedProducts.map((item, index) => ({
    'Product (Code - Name)': item.name,
    'Serial No': item.product_code,
    Price: item.price,
    Quantity: item.quantity,
    Discount: item.discount,
    'Product Tax': item.productTax,
    'State Tax': item.state_tax,
    'County Tax': item.county_tax,
    'City Tax': item.city_tax,
    Subtotal: item.subtotal,
  }));

  const handleAutocompleteChange = (name) => (event, newValue) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: newValue ? newValue.title : '', // Store only the title or an empty string
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFormState((prevState) => ({ ...prevState, selectedFile: file }));
  };

  React.useEffect(() => {
    localStorage.setItem('form-Data', JSON.stringify(formState));
  }, [formState]);

  const Biller = [{ title: 'Unleash POS LLC' }];
  const Warehouse = [{ title: 'Unleash POS LLC' }];
  const salestatus = [{ title: 'Pending' }, { title: 'Completed' }, { title: 'Allocated' }];
  const PaymentStatus = [
    { title: 'Pending' },
    { title: 'Due' },
    { title: 'Partial' },
    { title: 'Paid' },
  ];
  const prepareFormData = () => {
    const formData = new FormData();
    formData.append('selectedDate', formState.selectedDate);
    formData.append('referenceNo', formState.referenceNo);
    formData.append('biller', formState.biller?.title || '');
    formData.append('warehouse', formState.warehouse?.title || '');
    formData.append('customer', formState.customer?.title || '');
    formData.append('walkInCustomer', formState.walkInCustomer);
    formData.append('items', JSON.stringify(formState.items));
    formData.append('orderDiscount', formState.orderDiscount);
    formData.append('shipping', formState.shipping);
    if (selectedFile) formData.append('selectedFile', selectedFile);
    formData.append('saleStatus', formState.saleStatus?.title || '');
    formData.append('paymentTerm', formState.paymentTerm);
    formData.append('paymentStatus', formState.paymentStatus?.title || '');
    formData.append('saleNote', formState.saleNote);
    formData.append('staffNote', formState.staffNote);

    return formData;
  };
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value instanceof Date ? value.toISOString() : value);
      });

      const result = await submitFormData(formData);
      console.log('Data submitted successfully:', result);
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Item>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={4}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
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
                  options={customer || []}
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
                  onChange={handleAutocompleteChange('customer')}
                  freeSolo
                />
                {/* {!formState.customer && <FormHelperText>This field is required</FormHelperText>} */}
              </FormControl>
              <ModeEditOutlineOutlinedIcon />
              <VisibilityIcon />
              <PersonAddIcon />
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
                <FormControl fullWidth>
                  <Autocomplete
                    clearOnEscape
                    options={formState.items || []}
                    getOptionLabel={(option) => option.name || ''}
                    renderInput={(params) => <TextField {...params} label="Select Product" />}
                    onInputChange={handleInputChange}
                    onChange={(event, newValue) => {
                      if (newValue) handleAddProduct(newValue);
                    }}
                    freeSolo
                  />
                </FormControl>
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
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <FormControl fullWidth>
              <TextField
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
                options={salestatus}
                clearOnEscape
                value={salestatus.find((options) => options.title === formState.salestatus) || null}
                onChange={handleAutocompleteChange('saleStatus')}
                getOptionLabel={(option) => `${option.title}`}
                renderInput={(params) => <TextField {...params} label="Sale Status *" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <FormControl fullWidth>
              <TextField
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
                options={PaymentStatus}
                clearOnEscape
                value={
                  PaymentStatus.find((options) => options.title === formState.paymentStatus) || null
                }
                onChange={handleAutocompleteChange('paymentStatus')}
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
                rows={4}
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
                rows={4}
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
            sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
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
              onClick={() => {
                console.log('Cancel button clicked');
              }}
            >
              Reset
            </Button>
          </Grid>

          <Grid item xs={2} sm={4} md={12}>
            <AppGrid
              data={Data}
              columns={columns2}
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
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}></Box>
      </Item>
    </Box>
  );
}
