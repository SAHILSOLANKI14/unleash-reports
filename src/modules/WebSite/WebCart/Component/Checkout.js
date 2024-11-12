import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Container,
  Box,
  IconButton,
  Stack,
  Divider,
} from '@mui/material';
import { fetchDetailDataRequest } from '../Store/Addaction';
import noimg from '../../../../modules/Categories/images/no_image.png';
import { checkoutRequest } from '../Store/CheckoutAction';
import { useDispatch, useSelector } from 'react-redux';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { loading, error, order } = useSelector((state) => state.checkout);
  const { addressData } = useSelector((state) => state.address);
  const cartItems = useSelector((state) => state.cart.items);
  const address_id = localStorage.getItem('Company_id');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    // address_id: '2',
    'api-key': 'kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos',
    paymentMethod: '',
    city: '',
    state: '',
    postalCode: '',
    Phone: '',
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
      postalCode: address.postal_code,
      Phone: address.phone,
    });

    setIsDialogOpen(false);
  };

  useEffect(() => {
    const reference_no = '2';
    dispatch(fetchDetailDataRequest({ reference_no }));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkoutRequest(formData));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal;
  };

  return (
    <Grid container spacing={4} style={{ padding: '2rem' }}>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      <Grid item xs={12} md={8}>
        <Paper style={{ padding: '2rem' }}>
          <Typography variant="h6" gutterBottom>
            Shipping Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="firstName"
                label="First Name"
                fullWidth
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField label="phone" fullWidth value={formData.Phone} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="City"
                label="City"
                fullWidth
                required
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
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
                name="Postal Code"
                label="Postal Code"
                fullWidth
                required
                value={formData.postalCode}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {order && (
            <Typography sx={{ textAlign: 'center', mt: 3 }} color="primary">
              Order placed successfully! Order ID: {order.id}
            </Typography>
          )}
          {/* <Typography variant="h6" style={{ marginTop: '1rem' }}>
            Shipping Method
          </Typography>
          <Typography variant="body2">
            Enter a shipping address to see accurate shipping options for your order.
          </Typography>

          <Typography variant="h6" style={{ marginTop: '1rem' }}>
            Gift Options
          </Typography>
          <FormControlLabel control={<Checkbox />} label="This is a gift" />
          <Typography variant="body2">
            We'll hide the prices and print your personal message on the packing slip if you include
            one.
          </Typography> */}
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper style={{ padding: '2rem' }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
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
            <Typography sx={{ fontWeight: '600', fontSize: '15px' }}>Shipping (2 items)</Typography>
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

          <Typography variant="h6" style={{ marginTop: '1.5rem' }}>
            Bag Summary
          </Typography>
          <Typography variant="body2" color="primary">
            Arrives in 4-7 days
          </Typography>
          <div style={{ marginTop: '1rem' }}>
            {cartItems.map((item, index) => (
              <Box sx={{ mb: 2 }} key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <img
                      src={noimg}
                      alt="Product"
                      style={{
                        width: '60%',
                        border: '1px solid lightgray',
                        background: 'lightgray',
                        padding: 3,
                      }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h5">{item.name}</Typography>
                    <Typography variant="h5">{item.sku}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.size}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ textDecoration: 'line-through' }}
                    ></Typography>
                    <Typography variant="body2" sx={{ color: '#2277f5', p: 1 }}>
                      ${item.price} × {item.quantity}
                    </Typography>
                    <Stack direction={'row'} spacing={2}>
                      <Button color="primary" size="small" sx={{ border: '1px solid lightgray' }}>
                        Edit
                      </Button>
                      <Button color="primary" size="small" sx={{ border: '1px solid lightgray' }}>
                        Remove
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </div>
        </Paper>
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogTitle>Select Shipping Address</DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default CheckoutPage;
