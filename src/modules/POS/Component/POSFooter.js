import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Stack, Typography } from '@mui/material';
import WalletIcon from '@mui/icons-material/Wallet';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Discount } from '@mui/icons-material';

const POSFooter = ({ data }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fieldName, setFieldName] = useState('');
  const [inputValue, setInputValue] = useState({
    Discount: '',
    Shipping: '',
  });

  const handleDialogOpen = (field) => {
    setFieldName(field);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue({ ...inputValue, [fieldName]: e.target.value });
  };

  const DATA = data || {};
  const items = DATA.items ? DATA.items.length : 0;
  const GrandTotal =
    parseFloat(DATA.total || 0) -
    parseFloat(DATA.orderDiscount || 0) +
    parseFloat(inputValue.Shipping || DATA.shipping || 0);

  return (
    <Box>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        spacing={0}
        sx={{ color: 'black' }}
      >
        <Grid item xs={3}>
          <Stack direction={'column'} spacing={2}>
            <Stack
              direction={'row'}
              sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid' }}
            >
              <Typography
                variant="h5"
                sx={{
                  //   fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Shipping :${inputValue.Shipping || DATA.shipping || '0.00'}
              </Typography>
              <IconButton onClick={() => handleDialogOpen('Shipping')}>
                <LocalHospitalOutlinedIcon sx={{ fontSize: '18px' }} />
              </IconButton>
            </Stack>
            <Stack
              direction={'row'}
              sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid' }}
            >
              <Typography variant="h5">Items</Typography>
              <Typography variant="h5">{`${items} (${DATA.totalQuantity || 0})`}</Typography>
            </Stack>
            <Stack
              direction={'row'}
              sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid' }}
            >
              <Typography variant="h5">Order Tax</Typography>
              <Typography variant="h5">$0.00</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack direction={'column'} spacing={2}>
            <Stack
              direction={'row'}
              sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid' }}
            >
              <Typography
                variant="h5"
                sx={{
                  marginLeft: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Discount : ${inputValue.Discount || DATA.orderDiscount || '0.00'}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  marginLeft: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IconButton onClick={() => handleDialogOpen('Discount')}>
                  <LocalHospitalOutlinedIcon sx={{ fontSize: '18px' }} />
                </IconButton>
              </Typography>
            </Stack>
            <Stack
              direction={'row'}
              sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid' }}
            >
              <Typography variant="h5" sx={{ marginLeft: '20px' }}>
                Total
              </Typography>
              <Typography variant="h5" sx={{ marginLeft: '20px' }}>
                {DATA.total || '$0.00'}
              </Typography>
            </Stack>

            <Stack
              direction={'row'}
              sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid' }}
            >
              <Typography variant="h5" sx={{ marginLeft: '20px', fontWeight: 'bold' }}>
                Grand Total
              </Typography>
              <Typography variant="h5">{GrandTotal.toFixed(2)}</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Stack spacing={2} direction={'row'}>
            <Button
              sx={{
                color: '#18be48',
                background: '#e9f9f8',
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
              <WalletIcon />
              Payment
            </Button>
            <Button
              sx={{
                color: '#faa90c',
                background: '#fff6e5',
                width: '100%',
                paddingLeft: '30px',
                paddingRight: '30px',
                borderRadius: '5px',
                '&:hover': {
                  background: '#faa90c',
                  color: '#fff',
                },
              }}
            >
              <RequestQuoteIcon />
              Bill
            </Button>
            <Button
              sx={{
                color: '#273238',
                background: '#e7e8ea',
                width: '100%',
                paddingLeft: '30px',
                paddingRight: '30px',
                borderRadius: '5px',
                '&:hover': {
                  background: '#273238',
                  color: '#fff',
                },
              }}
            >
              <DoNotDisturbIcon />
              Suspend
            </Button>
            <Button
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
            >
              <CancelIcon />
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* Dialog for input */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Enter {fieldName} Value</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={fieldName}
            fullWidth
            value={inputValue[fieldName]}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default POSFooter;
