import CancelIcon from '@mui/icons-material/Cancel';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import WalletIcon from '@mui/icons-material/Wallet';
import { useEffect, useRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useCallback } from 'react';
import Payment from './Payment';

const POSFooter = ({ data }) => {
  const Shortcutshipping = useRef(null);
  const ShortcutorderDiscount = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fieldName, setFieldName] = useState('');
  const [open, setOpen] = useState(false);

  const [inputValue, setInputValue] = useState({
    orderDiscount: '',
    shipping: '',
  });

  const handleDialogOpen = (field) => {
    setFieldName(field);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue({ ...inputValue, [fieldName]: newValue });

    // Update local storage whenever the input value changes
    const storedData = JSON.parse(localStorage.getItem('POS-Data')) || {};
    localStorage.setItem(
      'POS-Data',
      JSON.stringify({
        ...storedData,
        [fieldName]: newValue,
      }),
    );
  };

  const handleKeypress = useCallback((event) => {
    if (event.shiftKey) {
      switch (event.key) {
        case 'S':
          setFieldName('shipping');
          setDialogOpen(true);
          break;
        case 'D':
          setFieldName('orderDiscount');
          setDialogOpen(true);
          break;
        default:
          break;
      }
    }
  }, []);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('POS-Data')) || {};
    setInputValue({
      orderDiscount: storedData.orderDiscount || '',
      shipping: storedData.shipping || '',
    });
    document.addEventListener('keydown', handleKeypress);
    return () => {
      document.removeEventListener('keydown', handleKeypress);
    };
  }, [handleKeypress]);
  const DATA = data || {};
  const items = DATA.items ? DATA.items.length : 0;
  const GrandTotal =
    parseFloat(DATA.total || 0) -
    parseFloat(inputValue.orderDiscount || 0) +
    parseFloat(inputValue.shipping || DATA.shipping || 0);

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
                ref={Shortcutshipping}
                sx={{
                  //   fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                shipping :${inputValue.shipping || DATA.shipping || '0.00'}
              </Typography>
              <IconButton onClick={() => handleDialogOpen('shipping')}>
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
                ref={ShortcutorderDiscount}
                variant="h5"
                sx={{
                  marginLeft: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Discount : ${inputValue.orderDiscount || DATA.orderDiscount || '0.00'}
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
                <IconButton onClick={() => handleDialogOpen('orderDiscount')}>
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
              onClick={handleOpen}
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
            <Payment open={open} onClose={handleClose} formState={DATA} totalAmount={GrandTotal} />
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
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: '700',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: '600',
              fontSize: '20px',
            }}
          >
            {' '}
            Enter {fieldName} Value
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            mt: 1,
          }}
        >
          <TextField
            autoFocus
            type="number"
            margin="dense"
            label={fieldName}
            fullWidth
            value={inputValue[fieldName]}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 3,
            paddingBottom: '20px',
            paddingTop: '10px',
          }}
        >
          <Button
            onClick={handleDialogClose}
            color="primary"
            sx={{
              border: '1px solid',
              background: '#ec2951',
              color: '#ffffff',
              fontWeight: '600',
              paddingLeft: '20px',
              paddingRight: '20px',
              fontFamily: 'sans-serif',
              borderRadius: '10px',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDialogClose}
            color="primary"
            sx={{
              border: '1px solid',
              background: '#18be48',
              color: '#ffffff',
              fontWeight: '600',
              paddingLeft: '20px',
              paddingRight: '20px',
              fontFamily: 'sans-serif',
              borderRadius: '10px',
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default POSFooter;
