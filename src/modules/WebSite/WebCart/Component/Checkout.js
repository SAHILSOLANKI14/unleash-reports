import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutRequest } from '../Store/CheckoutAction';
import { TextField, Button, CircularProgress, Typography, Paper, Grid } from '@mui/material';
import { fetchDetailDataRequest } from '../Store/Addaction';

const Checkout = () => {
  const dispatch = useDispatch();
  const { loading, error, order } = useSelector((state) => state.checkout);
  const { addressData } = useSelector((state) => state.address);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    'api-key': 'kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos',
    paymentMethod: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    // Assuming `reference_no` is available for fetching the address
    const reference_no = '2'; // Replace with actual reference number
    dispatch(fetchDetailDataRequest({ reference_no }));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkoutRequest(formData));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {order && (
        <Typography color="primary">Order placed successfully! Order ID: {order.id}</Typography>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}
          >
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              fullWidth
              value={formData.address}
              onChange={handleChange}
              required
            />
            <TextField
              name="paymentMethod"
              label="Payment Method"
              variant="outlined"
              fullWidth
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            />

            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '1rem' }}>
            <Typography variant="h6">Shipping Address</Typography>
            {addressData ? (
              <div>
                <Typography variant="body1">
                  Street: {addressData[0]?.line1 + addressData[0]?.line2}
                </Typography>
                <Typography variant="body1">City: {addressData[0]?.city}</Typography>
                <Typography variant="body1">State: {addressData[0]?.state}</Typography>
                <Typography variant="body1">Postal Code: {addressData[0]?.postalCode}</Typography>
                {/* Add other address fields as necessary */}
              </div>
            ) : (
              <Typography variant="body1">No address data available.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Checkout;
