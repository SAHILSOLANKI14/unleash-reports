import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutRequest } from '../Store/CheckoutAction';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';

const Checkout = () => {
  const dispatch = useDispatch();
  const { loading, error, order } = useSelector((state) => state.checkout);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
    </div>
  );
};

export default Checkout;
