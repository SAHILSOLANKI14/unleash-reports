import {
  FormControl,
  MenuItem,
  Select,
  Box,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
  Stack,
  Switch,
  Button,
} from '@mui/material';

import React, { useCallback, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import ViewListIcon from '@mui/icons-material/ViewList';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import AppGrid from 'src/components/App/AppGrid';
import DynamicHeader from 'src/modules/Sales/components/tableFooter';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import axios from 'axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { debounce } from 'lodash';
import { submitPurchaseData } from '../api/AddPurchaseapi';
import Breadcrumbs from 'src/components/shared/BreadCrumbs/Breadcrumb';

const AddPurchase = () => {
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = useState(() => {
    const savedData = localStorage.getItem('Purchase-Data');
    const parsedState = savedData ? JSON.parse(savedData) : {};
    const today = new Date();
    return savedData
      ? JSON.parse(savedData)
      : {
          selectedDate: parsedState.selectedDate ? new Date(parsedState.selectedDate) : today,
          refrence_No: '',
          Warehouse: '',
          Supplier_id: '',
          Status: '',
          tax_paid: false,
          Show_all_products: false,
          DefaultQuantity: parsedState.DefaultQuantity || 1,
          items: [],
          orderDiscount: '',
          shipping: '',
          payment_terms: '',
          note: '',
          total: '',
          totalQuantity: '',
          total_items: '',
        };
  });
  const [selectedDate, setSelectedDate] = useState(formState.selectedDate);
  // const [loading, setLoading] = React.useState(false);
  const [isLoadingOption, setIsLoadingOption] = useState(false);
  const [taxPaid, setTaxPaid] = useState(true);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [supplier, setSupplier] = useState([]);
  const [products, setProducts] = useState([]);
  const [addproducts, setAddProducts] = useState([]);
  const Warehouse = [{ title: 'Unleash POS LLC' }];
  const Status = [
    { title: 'Pending', id: 12 },
    { title: 'Received', id: 13 },
    { title: 'Ordered', id: 14 },
  ];

  const fetchProducts = useCallback(
    debounce(async (search) => {
      const supplierID = formState.Supplier_id || localStorage.getItem('Supplier_id');

      if (!search || !supplierID) {
        setProducts([]);
        return;
      }

      try {
        const limit = 10;
        const response = await fetch(
          `https://dev.unleashpos.com/api/v1/products?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos&name=${search}&limit=${limit}&supplier_id=${supplierID}`,
        );
        const data = await response.json();
        setProducts(data.data || []);
        setIsLoadingOption(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    }, 300),
    [formState.Supplier_id],
  );

  const fetchSupplier = async () => {
    try {
      const response = await fetch(
        `https://dev.unleashpos.com/api/v1/customers?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos&group=supplier`,
      );
      const data = await response.json();
      console.log('data', data);
      const SupplierCompanies = data.data.map((supplier, index) => ({
        title: `${supplier.company},(${supplier.person}) ${supplier.city}`,
        id: supplier.company_id,
      }));
      console.log('supplier', supplier);
      setSupplier(SupplierCompanies);
      console.log('suppliercompanies', supplier);
      setIsLoadingOption(false);
    } catch (error) {
      console.error('Error fetching Supplier:', error);
    }
  };

  useEffect(() => {
    if (!formState.Supplier_id) {
      setProducts([]);
    } else {
      localStorage.setItem('Purchase-Data', JSON.stringify(formState));
      fetchProducts();
    }
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
        [name]: newValue ? newValue.id : '',
      }));
      if (name === 'Supplier_id') {
        localStorage.setItem('Supplier_id', newValue.id);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    setFormState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormState((prevState) => ({ ...prevState, selectedDate: date }));
  };
  const handleInputChange = (event, search) => {
    if (search !== '') {
      setIsLoadingOption(true);
      fetchProducts(search);
    } else {
      setProducts([]);
    }
  };
  const calculateProductSubtotal = (product) => {
    const price = product?.price || 0;
    const quantity = product?.Quantity || 1;
    return price * quantity;
  };

  const calculateTotalQuantity = (items) => {
    return items.reduce((total, item) => total + (item.Quantity || 0), 0);
  };
  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + (item.subtotal || 0), 0);
  };
  const handleAddProduct = (product) => {
    setAddProducts((prev) => {
      const existingProductIndex = prev.findIndex((p) => p.name === product.name);
      if (existingProductIndex === -1) {
        const newProduct = { ...product, Quantity: formState.DefaultQuantity || 1 };
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
    setAddProducts((prev) => {
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

  const handleQuantityChange = (e, index) => {
    const value = parseInt(e.target.value, 10);
    const updatedQuantity = isNaN(value) ? 0 : Math.max(value, 0);

    setAddProducts((prev) => {
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
  const handleUnitChange = (newValue, index) => {
    const selectedUnit = newValue ? newValue.unit_id : null;

    setAddProducts((prev) => {
      const updatedProducts = [...prev];
      updatedProducts[index].unit = selectedUnit;
      return updatedProducts;
    });
  };

  const columns = [
    {
      name: 'Product (Code - Name)',
      label: 'Product (Code - Name)',
      sort: true,
    },
    {
      name: 'Net Unit Cost',
      label: 'Net Unit Cost',
      sort: true,
    },
    {
      name: 'Quantity',
      label: 'Quantity',
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <TextField
              type="text"
              value={addproducts[dataIndex]?.Quantity || ''}
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
    {
      name: 'Unit',
      label: 'Unit',
      sort: true,
      options: {
        customBodyRenderLite: (dataIndex) => {
          const product = addproducts[dataIndex];
          const unitOptions = product?.unit || [];
          // console.log('unitOptions:', unitOptions);

          return (
            <FormControl size="small" fullWidth>
              <Autocomplete
                options={unitOptions}
                size="small"
                getOptionLabel={(option) => {
                  switch (option.unit_id) {
                    case '9':
                      return 'Each';
                    case '10':
                      return 'Inner';
                    case '11':
                      return 'Case';
                    default:
                      return 'Unknown Unit';
                  }
                }}
                defaultValue={unitOptions?.[0] || ''}
                value={unitOptions.find((unit) => unit.unit_id === unitOptions.unit_id) || null}
                onChange={(event, newValue) => {
                  handleUnitChange(newValue, dataIndex);
                }}
                renderInput={(params) => <TextField {...params} label="Unit" variant="outlined" />}
                isOptionEqualToValue={(option, value) => option.unit_id === value.unit_id}
                fullWidth
              />
            </FormControl>
          );
        },
      },
    },
    {
      name: 'Product Tax',
      label: 'Product Tax',
      sort: true,
    },
    {
      name: 'Subtotal (USD)',
      label: 'Subtotal (USD)',
      sort: true,
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

  // Modify Data mapping to include units

  const Data = addproducts.map((item, index) => ({
    'Product (Code - Name)': item.name,
    'Net Unit Cost': item.product_code || '',
    Quantity: item.Quantity || '0',
    'Product Tax': item.productTax || '$0.00',
    'Subtotal (USD)': item.subtotal || '$0.00',
  }));

  const option = {
    selectableRows: false,
    selectableRowsHideCheckboxes: true,
    textLabels: {
      body: {
        noMatch: '',
      },
    },
  };
  const handleReset = () => {
    const today = new Date();
    const initialFormState = {
      selectedDate: today,
      refrence_No: '',
      Warehouse: '',
      Supplier_id: '',
      Status: '',
      tax_paid: false,
      Show_all_products: false,
      DefaultQuantity: '',
      items: [],
      orderDiscount: '',
      shipping: '',
      payment_terms: '',
      note: '',
      total: '',
      totalQuantity: '',
      total_items: '',
    };
    setFormState(initialFormState);
    setAddProducts([]);
    setProducts([]);
    setSupplier([]);
    localStorage.removeItem('Purchase-Data');
    localStorage.removeItem('Supplier_id');
  };
  const handleSubmit = async () => {
    try {
      const company_id = localStorage.getItem('company_id');
      const responses = await axios.post(`https://dev.unleashpos.com/api/v1/companies`, {
        'api-key': 'kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos',
        company_id: company_id,
      });
      const sale = responses.data;
      console.log('address', sale.data);
      // const Datas = sale.data[1];
      const submittedItems = formState.items.map((item) => ({
        quantity: item.Quantity,
        id: item.id,
      }));
      const data = {
        items: submittedItems,
        customer_id: formState.Supplier_id,
        payment_status: formState.Status,
        total_items: formState.total_items,
        total: formState.total,
        company_id: company_id,
        address_id: '853',
        'api-key': 'kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos',
      };

      const response = await submitPurchaseData(data);
      console.log('Submitted Data', data);
      return response;
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };
  return (
    <Box>
      <Breadcrumbs />
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {/* Date Field */}
          <Grid item xs={12} md={4}>
            <InputLabel>Date</InputLabel>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  size="small"
                  label=""
                  value={formState.selectedDate ? new Date(formState.selectedDate) : null}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          {/* Reference No Field */}
          <Grid item xs={12} md={4}>
            <InputLabel>Reference No</InputLabel>
            <TextField
              type="text"
              name="refrence_No"
              value={formState.refrence_No}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>

          {/* Warehouse Select Field */}
          <Grid item xs={12} md={4}>
            <InputLabel>Warehouse *</InputLabel>
            <FormControl fullWidth variant="outlined" size="small">
              <Autocomplete
                options={Warehouse}
                size="small"
                clearOnEscape
                value={Warehouse.find((option) => option.title === formState.Warehouse) || null}
                onChange={handleAutocompleteChange('Warehouse')}
                getOptionLabel={(option) => `${option.title}`}
                renderInput={(params) => <TextField {...params} label="" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <InputLabel>Supplier</InputLabel>
            <Stack
              direction={'row'}
              spacing={2}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <FormControl fullWidth>
                <Autocomplete
                  key={supplier.id || []}
                  options={supplier || []}
                  // key={customer.id}
                  size="small"
                  clearOnEscape
                  value={supplier.find((option) => option.title === formState.Supplier_id) || null}
                  getOptionLabel={(option) => option.title || ''}
                  renderInput={(params) => <TextField {...params} label="" />}
                  onInputChange={(event, newValue) => {
                    if (newValue.length > 1) {
                      fetchSupplier(newValue);
                    } else {
                      setSupplier([]);
                    }
                  }}
                  noOptionsText="Type to search for a supplier"
                  onChange={handleAutocompleteChanges('Supplier_id')}
                  freeSolo
                />
                {/* {!formState.customer && <FormHelperText>This field is required</FormHelperText>} */}
              </FormControl>
              <PersonIcon />
              <ViewListIcon />
              <AddCircleIcon />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <InputLabel>Status *</InputLabel>
            <FormControl fullWidth variant="outlined" size="small">
              <Autocomplete
                options={Status}
                size="small"
                clearOnEscape
                value={Status.find((option) => option.title === formState.Status) || null}
                onChange={handleAutocompleteChange('Status')}
                getOptionLabel={(option) => `${option.title}`}
                renderInput={(params) => <TextField {...params} label="" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} alignItems="center">
            {/* Tax Paid Toggle */}
            <Grid item>
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <Typography>Tax Paid</Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={taxPaid}
                    onChange={(e) => setTaxPaid(e.target.checked)}
                    color="primary"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Show All Products Toggle */}
            <Grid item>
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <Typography>Show All Products</Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={showAllProducts}
                    onChange={(e) => setShowAllProducts(e.target.checked)}
                    color="primary"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <InputLabel>Default Quantity</InputLabel>
            <TextField
              size="small"
              fullWidth
              type="text"
              name="DefaultQuantity"
              // defaultValue={1}
              onChange={handleChange}
              value={formState.DefaultQuantity}
            ></TextField>
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
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                maxHeight: '200px',
                overflowY: 'auto',
              }}
            >
              <AppGrid data={Data} columns={columns} options={option} />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel>Discount (5/5%)</InputLabel>
            <TextField
              size="small"
              name="orderDiscount"
              fullWidth
              value={formState.orderDiscount}
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel>Shipping</InputLabel>
            <TextField
              size="small"
              fullWidth
              name="shipping"
              value={formState.shipping}
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel>Payment Term</InputLabel>
            <TextField
              size="small"
              fullWidth
              name="payment_terms"
              value={formState.payment_terms}
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item xs={12} md={3}></Grid>
          <Grid item xs={12} md={12}>
            <InputLabel>Note</InputLabel>
            <TextField
              multiline
              rows={3}
              fullWidth
              name="note"
              value={formState.note}
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item xs={12} md={9}></Grid>
          <Grid item xs={12} md={3}>
            <Stack direction={'row'} spacing={2}>
              <Button
                sx={{
                  paddingLeft: '40px',
                  paddingRight: '40px',
                  background: '#2277f5',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                sx={{
                  paddingLeft: '40px',
                  paddingRight: '40px',
                  background: '#ec2951',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
                onClick={handleReset}
              >
                Reset
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <DynamicHeader data={formState} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AddPurchase;
