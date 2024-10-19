import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import AddTable from 'src/modules/Sales/components/FooterTable';
import FormGroup from '@mui/material/FormGroup';
import AddIcon from '@mui/icons-material/Add';

const Payment = ({ open, onClose, formState, totalAmount }) => {
  const [paymentData, setPaymentData] = useState({
    paymentTerm: '',
    staffNote: '',
    saleNote: '',
    orderDiscount: '',
    shipping: '',
    biller: '',
    saleStatus: '',
    totalAmount: '',
    surcharge: '',
    payableAmount: '',
    walkInCustomer: false,
    PaymentNote: '',
  });

  const [quickCashCount, setQuickCashCount] = useState({});
  const [amount, setAmount] = useState(totalAmount);
  const [payingamount, setPayingamount] = useState(totalAmount);

  // Data for Autocomplete
  const Biller = [{ title: 'Unleash POS LLC' }];
  const payingBy = [
    { title: 'Cash' },
    { title: 'Credit Card' },
    { title: 'Check' },
    { title: 'ACH' },
    { title: 'Deposit' },
  ];

  const formatDate = (date) => {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const todayDate = formatDate(new Date());

  const handleAutocompleteChange = (name) => (event, newValue) => {
    setPaymentData((prevState) => {
      const updatedData = {
        ...prevState,
        [name]: newValue ? newValue.title : '',
      };
      localStorage.setItem('POS-Data', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setPaymentData((prevState) => {
      const updatedData = {
        ...prevState,
        [name]: newValue,
      };
      localStorage.setItem('POS-Data', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleQuickCashClick = (amount) => {
    const newTotal = payingamount + amount;
    if (amount === totalAmount) {
      setAmount(totalAmount);
      setPayingamount(totalAmount);
      const updatedPaymentData = {
        ...paymentData,
        totalAmount: totalAmount,
        total: totalAmount,
      };
      setPaymentData(updatedPaymentData);
      localStorage.setItem('POS-Data', JSON.stringify(updatedPaymentData));
    } else {
      setAmount(newTotal);
      setPayingamount(newTotal);
    }
    setPaymentData((prevData) => {
      const updatedQuickCashCount = {
        ...prevData.quickCashCount,
        [amount]: (prevData.quickCashCount[amount] || 0) + 1, // Increment count
      };

      const updatedPaymentData = {
        ...prevData,
        quickCashCount: updatedQuickCashCount,
      };
      return updatedPaymentData;
    });
    setQuickCashCount();
  };
  const handleQuickCashCancel = () => {
    setAmount(totalAmount);
    setPayingamount(totalAmount);
    setQuickCashCount('' || 0);
    setPaymentData((prev) => ({
      ...prev,
      totalAmount: totalAmount,
    }));
  };

  const handleSubmit = () => {
    // setPaymentData((prevData) => ({
    //   ...prevData,
    // totalAmount: 0,
    // }));
    localStorage.setItem('POS-Data', JSON.stringify(paymentData));
    onClose();
  };

  const columns = [
    { id: 'invoiceNo', label: 'Invoice No' },
    { id: 'date', label: 'Date' },
    { id: 'grandTotal', label: 'Grand Total' },
    { id: 'balance', label: 'Balance' },
  ];

  const rows = [
    {
      invoiceNo: formState?.id || '',
      date: todayDate || '',
      grandTotal: formState?.total || '',
      balance: formState?.total || '',
    },
  ];

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('POS-Data')) || {};
    setPaymentData((prevState) => ({
      ...prevState,
      ...storedData,
      quickCashCount: storedData.quickCashCount || {
        10: 0,
        20: 0,
        50: 0,
        100: 0,
        500: 0,
        1000: 0,
        5000: 0,
      },
      orderDiscount: storedData.orderDiscount || '',
      shipping: storedData.shipping || '',
      biller: storedData?.biller || '',
      saleNote: storedData?.saleNote || '',
      staffNote: storedData?.staffNote || '',
      saleStatus: storedData?.saleStatus || '',
      totalAmount: storedData?.totalAmount || '',
      surcharge: storedData?.surcharge || '',
      payableAmount: storedData?.payableAmount || '',
      PaymentNote: storedData?.PaymentNote || '',
    }));
  }, [open]);

  useEffect(() => {
    setAmount(totalAmount);
    setPayingamount(totalAmount);
  }, [open, totalAmount]);
  const itemslength = formState.items.length;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          position: 'sticky',
          zIndex: 1,
          backgroundColor: 'white',
          borderBottom: '1px solid #ddd',
          padding: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: '400' }}>
          Finalize Sale
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <Grid item xs={10} sx={{ mb: 3 }}>
                <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormControl sx={{ width: '48%' }}>
                    <Autocomplete
                      options={Biller}
                      size="small"
                      clearOnEscape
                      value={Biller.find((option) => option.title === paymentData.biller) || null}
                      onChange={handleAutocompleteChange('biller')}
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => <TextField {...params} label="Biller" />}
                    />
                  </FormControl>
                  <FormGroup
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}
                  >
                    <FormControlLabel
                      label="On Account"
                      labelPlacement="start"
                      control={
                        <Switch
                          name="walkInCustomer"
                          onChange={handleChange}
                          checked={paymentData.walkInCustomer}
                          color="secondary"
                        />
                      }
                    />
                  </FormGroup>
                </Stack>
              </Grid>
              <Grid item xs={10} sx={{ mb: 3 }}>
                <Stack direction={'row'} spacing={2}>
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      label="Sale Note"
                      name="saleNote"
                      value={paymentData.saleNote}
                      onChange={handleChange}
                      multiline
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      label="Staff Note"
                      name="staffNote"
                      value={paymentData.staffNote}
                      onChange={handleChange}
                      multiline
                    />
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={10} sx={{ mb: 3 }}>
                <AddTable rows={rows} columns={columns} />
              </Grid>
              <Grid item xs={10} sx={{ mb: 3 }}>
                <Stack direction={'row'} spacing={2}>
                  <FormControl fullWidth>
                    <Autocomplete
                      size="small"
                      options={payingBy}
                      clearOnEscape
                      value={
                        payingBy.find((option) => option.title === paymentData.saleStatus) || null
                      }
                      onChange={handleAutocompleteChange('saleStatus')}
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => <TextField {...params} label="Sale Status *" />}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      label="Amount"
                      name="totalAmount"
                      value={amount}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      label="Surcharge"
                      name="surcharge"
                      value={paymentData.surcharge || ''}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      label="Payable Amount"
                      name="payableAmount"
                      value={payingamount}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={10} sx={{ mb: 3 }}>
                <Stack direction={'row'} spacing={2}>
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      label="Payment Note"
                      name="PaymentNote"
                      value={paymentData.PaymentNote}
                      onChange={handleChange}
                      multiline
                      rows={2}
                    />
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={10} sx={{ mb: 3 }}>
                <Button
                  color="secondary"
                  fullWidth
                  onClick={onClose}
                  sx={{
                    color: '#1a79ff',
                    fontWeight: '600',
                    border: '1px solid #1a79ff',
                    pl: 4,
                    pr: 4,
                    ':hover': {
                      background: '#1a79ff',
                      color: 'white',
                      fontWeight: '600',
                    },
                  }}
                >
                  <AddIcon />
                  Add More Payment
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                Quick Cash
              </Typography>
              <Stack direction={'column'} spacing={1}>
                <Button
                  color="secondary"
                  sx={{
                    color: '#18be48',
                    background: '#e7ffef',
                    width: '100%',
                    paddingLeft: '30px',
                    paddingRight: '30px',
                    borderRadius: '5px',
                    '&:hover': {
                      background: '#18be48',
                      color: '#fff',
                    },
                  }}
                >
                  {paymentData.total || 0}
                </Button>
                {[10, 20, 50, 100, 500, 1000, 5000].map((amount) => (
                  <Button
                    key={amount}
                    color="secondary"
                    sx={{
                      background: '#edf5ff',
                      color: '#1a79ff',
                      fontWeight: '600',
                      pl: 3,
                      pr: 3,
                      borderRadius: 0,
                      ':hover': {
                        background: '#1a79ff',
                        color: 'white',
                        fontWeight: '500',
                        '& span': {
                          color: '#fff',
                        },
                      },
                    }}
                    onClick={() => handleQuickCashClick(amount)}
                  >
                    ${amount}
                    <span
                      style={{
                        marginLeft: '5px',
                        marginTop: '-10px',
                        fontSize: '12px',
                        color: '#555',
                      }}
                    >
                      {paymentData.quickCashCount?.[amount] || 0}
                    </span>
                  </Button>
                ))}

                <Button
                  color="secondary"
                  sx={{
                    color: '#ec2951',
                    background: '#fdedee',
                    width: '100%',
                    paddingLeft: '30px',
                    paddingRight: '30px',
                    borderRadius: '5px',
                    '&:hover': {
                      background: '#ec2951',
                      color: '#fff',
                    },
                  }}
                  // onChange={handleChange}
                  onClick={() => {
                    handleQuickCashCancel();
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          position: 'sticky',
          zIndex: 1,
          backgroundColor: 'white',
          borderTop: '1px solid #ddd',
          padding: 3,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Paper style={{ padding: '10px', backgroundColor: '#e0f0ff' }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">
                      <strong>Total Items:</strong> {itemslength}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">
                      <strong>Total Payable:</strong> ${payingamount || '0.00'}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">
                      <strong>Total Paying:</strong> ${paymentData.orderDiscount || '0.00'}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">
                      <strong>Balance:</strong>
                      {/* ${paymentData.shipping || '0.00'} */}
                      0.00
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Button
                color="secondary"
                fullWidth
                onClick={handleSubmit}
                sx={{
                  background: '#1a79ff',
                  color: 'white',
                  fontWeight: '600',
                  pl: 4,
                  pr: 4,
                  ':hover': {
                    background: '#1a79ff',
                    color: 'white',
                    fontWeight: '500',
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default Payment;
