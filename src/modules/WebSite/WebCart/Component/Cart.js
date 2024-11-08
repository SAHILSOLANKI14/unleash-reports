import { Box, Button, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
import noimg from '../../../../modules/Categories/images/no_image.png';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../../Product/Store/productSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <Box sx={{ width: 350, p: 2 }} role="presentation">
      <Typography variant="h4" sx={{ mb: 2, fontWeight: '600' }}>
        Shopping Cart
      </Typography>
      <hr></hr>
      {cartItems.map((item, index) => (
        <Box sx={{ mb: 2, borderBottom: '1px solid #bcbdc1' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Box
                component="img"
                src={noimg}
                alt="Product"
                sx={{
                  width: '90%',
                  height: 'auto',
                  borderRadius: 1,
                  objectFit: 'contain',
                }}
              />
            </Grid>
            <Grid item xs={7}>
              <Typography variant="h5" fontWeight="bold" sx={{ mt: 1, mb: 1, textAlign: 'center' }}>
                {item.name}
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  onClick={() => handleDecrement(item.id)}
                  variant="outlined"
                  sx={{
                    minWidth: '30px',
                    minHeight: '30px',
                    borderRadius: '50%',
                    bgcolor: '#f4f4f4',
                  }}
                >
                  -
                </Button>

                <TextField
                  value={item.quantity}
                  variant="outlined"
                  inputProps={{
                    style: {
                      textAlign: 'center',
                      width: '40px',
                      padding: '5px ',
                    },
                    readOnly: true,
                  }}
                />

                <Button
                  onClick={() => handleIncrement(item.id)}
                  variant="outlined"
                  sx={{
                    minWidth: '30px',
                    minHeight: '30px',
                    borderRadius: '50%',
                    bgcolor: '#f4f4f4',
                  }}
                >
                  +
                </Button>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, mb: 1, textAlign: 'center' }}
              >
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => handleRemove(item.id)}>
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}

      <Box sx={{ mt: 2 }}>
        <Stack
          direction={'row'}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontSize: '14px', fontWeight: '600', color: '#2277f5', fontFamily: 'sans-serif' }}
          >
            Total Items: {cartItems.length}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: '14px', fontWeight: '600', color: '#2277f5', fontFamily: 'sans-serif' }}
          >
            Total: ${totalPrice.toFixed(2)}
          </Typography>
        </Stack>
        <Button
          sx={{
            mt: 2,
            border: '1px solid #2277f5',
            fontWeight: '600',
            color: '#2277f5',
            fontFamily: 'sans-serif',
          }}
          fullWidth
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
