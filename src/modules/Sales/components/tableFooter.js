import { Grid, Paper, Typography } from '@mui/material';

const DynamicHeader = (data) => {
  const Footerdata = data.data;
  const items = Footerdata.items.length;
  const GrandTotal =
    parseFloat(Footerdata.total || 0) -
    parseFloat(Footerdata.orderDiscount || 0) +
    parseFloat(Footerdata.shipping || 0);
  // console.log('first', items);

  return (
    <Paper style={{ padding: '10px', backgroundColor: '#e0f0ff' }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            <strong>Items:</strong> {`${items} ( ${Footerdata.totalQuantity || 0} )`}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            <strong>Total:</strong> ${Footerdata.total || '0.00'}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            <strong>Order Discount:</strong> ${Footerdata.orderDiscount || '0.00'}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            <strong>Shipping:</strong> ${Footerdata.shipping || '0.00'}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            <strong>Grand Total:</strong> ${GrandTotal.toFixed(2) || '0.00'}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DynamicHeader;
