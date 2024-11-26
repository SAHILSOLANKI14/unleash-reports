import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailDataRequest } from '../Store/Addaction';
import { checkoutRequest } from '../Store/CheckoutAction';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { loading, error, order } = useSelector((state) => state.checkout);
  const [successMessage, setSuccessMessage] = useState(null);
  const { addressData } = useSelector((state) => state.address);
  const cartItems = useSelector((state) => state.cart.items);
  const address_id = localStorage.getItem('Company_id');
  const [formData, setFormData] = useState({
    email: '',
    address: '',
    address_id: '',
    'api-key': 'kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos',
    paymentMethod: '',
    city: '',
    state: '',
    postal_code: '',
    Phone: '',
    items: '',
  });

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    const formattedAddress = `${address.line1}, ${address.line2 || ''}, ${address.city}, ${
      address.state
    }, ${address.postal_code}`;

    setFormData({
      ...formData,
      address: formattedAddress,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      Phone: address.phone,
    });

    setIsDialogOpen(false);
  };

  useEffect(() => {
    const reference_no = localStorage.getItem('Company_id');
    dispatch(fetchDetailDataRequest({ reference_no }));
  }, [dispatch]);

  // const Add = '2';
  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the cart items to only include name, quantity, and id
    const cartData = cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      id: item.id,
    }));

    setFormData((prevData) => ({
      ...prevData,
      items: cartData,
    }));

    dispatch(checkoutRequest({ ...formData, items: cartData }));
    setSuccessMessage(`Order placed successfully! Order ID: ${formData.email}`);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal;
  };
  const handleSnackbarClose = () => {
    setSuccessMessage(null);
  };
  return (
    <>
      {successMessage && (
        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{
              width: '100%',
              fontSize: '12px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {successMessage}
          </Alert>
          {/* <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
            {successMessage}
          </Alert> */}
        </Snackbar>
      )}
      <h1>
        {loading && <Typography>Loading..</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </h1>
      <Grid container spacing={4} style={{ padding: '2rem' }}>
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: '2rem' }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField 
                  size='small'
                  name="firstName"
                  label="First Name"
                  fullWidth
                  required
                  value={formData.firstName || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                   size='small'
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  required
                  value={formData.lastName || ''}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                   size='small'
                  label="Email"
                  fullWidth
                  value={formData.email || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                   size='small'
                  label="phone"
                  fullWidth
                  value={formData.Phone || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                   size='small'
                  name="address"
                  label="Address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                   size='small'
                  name="City"
                  label="City"
                  fullWidth
                  required
                  value={formData.city || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                   size='small'
                  name="state"
                  label="state"
                  fullWidth
                  required
                  value={formData.state || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                   size='small'
                  name="Postal Code"
                  label="Postal Code"
                  fullWidth
                  required
                  value={formData.postal_code || ''}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box sx={{ p: 2 }}>
              {addressData && addressData.length > 0 ? (
                addressData.map((address, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={selectedAddress === address}
                        onChange={() => handleAddressSelect(address)}
                        color="primary"
                      />
                    }
                    label={`${address.line1}, ${address.line2 || ''}, ${address.city}, ${
                      address.state
                    }, ${address.postalCode}`}
                  />
                ))
              ) : (
                <Typography variant="body1">No address data available.</Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '2rem' }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <div style={{ marginTop: '1rem' }}>
              {cartItems.map((item, index) => (
                <Box sx={{ mb: 2, maxHeight: '70px', overflowY: 'auto' }} key={index}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Stack
                        direction={'row'}
                        spacing={1}
                        sx={{ display: 'flex', justifyContent: 'start', alignItems: 'flex-start' }}
                      >
                        <Typography variant="h5">{item.name}</Typography>
                        <Typography variant="h5">{item.sku}</Typography>
                        {/* <Typography variant="body2" color="textSecondary">
              {item.size}
            </Typography> */}
                        <Typography
                          variant="h5"
                          style={{ textDecoration: 'line-through' }}
                        ></Typography>
                        <Typography variant="h5" sx={{ color: '#2277f5' }}>
                          (${item.price}) × {item.quantity}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </div>

            <Divider style={{ margin: '1rem 0' }} />
            <Grid container justifyContent="space-between">
              <Typography variant="h4" sx={{ fontWeight: '600', fontSize: '15px' }}>
                Subtotal
              </Typography>
              <Typography>{calculateSubtotal()}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography sx={{ fontWeight: '600', fontSize: '15px' }}>Taxes</Typography>
              <Typography>—</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography sx={{ fontWeight: '600', fontSize: '15px' }}>
                Shipping (2 items)
              </Typography>
              <Typography>—</Typography>
            </Grid>
            <Divider style={{ margin: '1rem 0' }} />
            <Grid container justifyContent="space-between">
              <Typography sx={{ fontWeight: '600', fontSize: '15px' }}>Total</Typography>
              <Typography>{calculateTotal()}</Typography>
            </Grid>
            <Button
              variant="outlined"
              fullWidth
              style={{ marginTop: '1rem', border: '2px solid black' }}
              onClick={handleSubmit}
            >
              Buy Now
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </>
  );
};

export default CheckoutPage;
