import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Autocomplete,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import { experimentalStyled as styled } from '@mui/material/styles';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import AppGrid from 'src/components/App/AppGrid';
import ProductGrid from '../Component/ProductGrid';
import POSFooter from './POSFooter';
import { useRef } from 'react';
import Calc from './Calculator';
import DialogContent from './DialogContent';

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
  const customerInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const ProductInputRef = useRef(null);
  const [formState, setFormState] = useState(() => {
    const savedState = localStorage.getItem('POS-Data');
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
          PaymentNote: '',
        };
  });

  const [products, setProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState(() => {
    const savedState = localStorage.getItem('POS-Data');
    const parsedState = savedState ? JSON.parse(savedState) : null;
    return parsedState?.items || [];
  });
  const [customer, setCustomer] = useState([]);
  const [isLoadingOption, setIsLoadingOption] = useState(false);
  const Warehouse = [{ title: 'Unleash POS LLC' }];

  const handleKeyPress = useCallback((event) => {
    if (event.ctrlKey && event.shiftKey) {
      if (event.key === 'Y') {
        if (customerInputRef.current) {
          customerInputRef.current.querySelector('input').focus();
          customerInputRef.current.style.backgroundColor = '#e7e8ea';
          setTimeout(() => {
            customerInputRef.current.style.backgroundColor = '';
          }, 2000);
        }
      } else if (event.key === 'Z') {
        if (ProductInputRef.current) {
          ProductInputRef.current.querySelector('input').focus();
          ProductInputRef.current.style.backgroundColor = '#e7e8ea';
          setTimeout(() => {
            ProductInputRef.current.style.backgroundColor = '';
          }, 2000);
        }
      }
    }
  }, []);
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

      const customerCompanies = data.data.map((customer) => ({
        title: customer.company,
        ID: customer.id,
      }));
      setCustomer(customerCompanies);
      setIsLoadingOption(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
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
      localStorage.setItem('POS-Data', JSON.stringify(updatedFormState));

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
    localStorage.setItem('POS-Data', JSON.stringify(formState));
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [formState, handleKeyPress]);

  const handleAutocompleteChange = (name) => (event, newValue) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: newValue ? newValue.title : '',
    }));
  };
  const columns1 = [
    { name: 'Product', label: 'Product' },
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
      name: 'Action',
      label: 'Action',
      options: {
        customHeadRender: () => {
          return <DeleteRoundedIcon sx={{ mt: 3 }} />;
        },
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
    Product: item.name,
    Price: item.price,
    Quantity: item.Quantity || '0',
    'State Tax': item.state_tax || '$0.00',
    'County Tax': item.county_tax || '$0.00',
    'City Tax': item.city_tax || '$0.00',
    Subtotal: item.subtotal || '$0.00',
  }));

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ width: '100%', flexGrow: 1 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Item sx={{ minHeight: '71vh' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Stack spacing={2}>
                <Grid item xs={2} sm={4} md={12}>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <FormControl fullWidth>
                      <Autocomplete
                        ref={customerInputRef}
                        options={customer || []}
                        // key={customer.id}
                        size="small"
                        clearOnEscape
                        value={
                          customer.find((option) => option.title === formState.customer) || null
                        }
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
                        loading={isLoadingOption}
                        loadingText="Loading...."
                      />
                    </FormControl>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ mr: 2, borderRadius: '5px', width: '40%' }}
                    >
                      NO Balance Invoice
                    </Button>
                    <VisibilityIcon />
                  </Stack>
                </Grid>
                <Grid item xs={2} sm={4} md={12}>
                  <FormControl fullWidth>
                    <Autocomplete
                      options={Warehouse}
                      size="small"
                      clearOnEscape
                      value={
                        Warehouse.find((option) => option.title === formState.Warehouse) || null
                      }
                      onChange={handleAutocompleteChange('Warehouse')}
                      getOptionLabel={(option) => `${option.title}`}
                      renderInput={(params) => <TextField {...params} label="Warehouse" />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                  <Stack sx={{ display: 'flex', justifyContent: 'center' }}></Stack>
                </Grid>
                <Grid item xs={2} sm={4} md={12}>
                  <Grid
                    container
                    spacing={1}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Grid item xs={5}>
                      {/* <Stack direction="row"> */}
                      <Autocomplete
                        ref={ProductInputRef}
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
                    <Grid item xs={1}>
                      <IconButton onClick={handleOpen}>
                        <AddCircleIcon />
                      </IconButton>
                      <DialogContent open={open} onClose={handleClose} />
                    </Grid>
                    {/* </Stack> */}
                    <Grid item xs={3}>
                      <FormGroup
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}
                      >
                        <FormControlLabel
                          label="Cost To Cost"
                          labelPlacement="start"
                          control={
                            <Switch
                              name="Cost_to_Cost"
                              onChange={handleChange}
                              checked={formState.Cost_to_Cost}
                              color="secondary"
                            />
                          }
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={3}>
                      <FormGroup
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}
                      >
                        <FormControlLabel
                          label="Add Shipping"
                          labelPlacement="start"
                          control={
                            <Switch
                              name="AddShipping"
                              onChange={handleChange}
                              checked={formState.AddShipping}
                              color="secondary"
                            />
                          }
                        />
                      </FormGroup>
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
                      maxHeight: '400px',
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
              </Stack>
            </Box>
          </Item>
          <Calc />
        </Grid>
        <Grid item xs={6}>
          <Item sx={{ minHeight: '71vh' }}>
            <ProductGrid selectedProduct={handleAddProduct} />
          </Item>
        </Grid>
      </Grid>
      <Grid item xs={2} sm={4} md={12}>
        <Item>
          <POSFooter data={formState} />
        </Item>
      </Grid>
    </Box>
  );
}
