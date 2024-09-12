import React, { useState } from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';

const DynamicHeader = () => {
  // Dynamic data with two values for items
  const [data, setData] = useState({
    items: 2, // Represents the number of items
    totalUnits: 6, // Represents the total units or quantities
    total: 100.0,
    discount: 10.0,
    shipping: 5.0,
    grandTotal: 95.0,
  });

  return (
    <Paper style={{ padding: '16px', backgroundColor: '#e0f7fa' }}>
      <Grid container spacing={2}>
        {/* Display items in the format "Items: 2 (6)" */}
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            <strong>Items:</strong> {`${data.items} (${data.totalUnits})`}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            <strong>Total:</strong> {data.total.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            <strong>Order Discount:</strong> {data.discount.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            <strong>Shipping:</strong> {data.shipping.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            <strong>Grand Total:</strong> {data.grandTotal.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DynamicHeader;
