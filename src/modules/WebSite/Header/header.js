import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
  Container,
  Badge,
  Drawer,
  Grid,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import logo from '../../../assets/images/unleash-logo.png';
import noimg from '../../../modules/Categories/images/no_image.png';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../Product/Store/productSlice';
import { useDispatch } from 'react-redux';
import Cart from '../WebCart/Cart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function CustomHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', pt: 0 }}>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            pb: 0,
            pl: 3,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #bcbdc1',
            color: '#ffffff',
            background: '#2277f5',
          }}
        >
          <Stack direction="row" spacing={2}>
            <Box display="flex" alignItems="start">
              <PhoneIcon sx={{ mr: '2px', color: '#ffffff', fontSize: '20px' }} />
              <Typography variant="h6" sx={{ color: '#ffffff' }}>
                (732) 454-8888
              </Typography>
            </Box>
          </Stack>
          <Typography variant="h6" sx={{ fontSize: '12px', color: '#ffffff', fontWeight: '500' }}>
            Welcome To UNLEASH POS LLC
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link to={'/'}>
              <IconButton>
                <DashboardIcon sx={{ mr: '2px', fontSize: '20px', color: '#ffffff' }} />
                <Typography variant="h5" sx={{ textAlign: 'center', color: '#ffffff' }}>
                  Dashboard
                </Typography>
              </IconButton>
              <IconButton sx={{ color: '#ffffff' }}>
                <AccountCircleIcon />
              </IconButton>
            </Link>
          </Stack>
        </Box>

        <Toolbar
          sx={{ justifyContent: 'space-between', px: 0, mt: 2, borderBottom: '1px solid #bcbdc1' }}
        >
          <Box display="flex" alignItems="center" sx={{ pb: 2 }}>
            <img src={logo} alt="Unleash POS Logo" style={{ width: '80%', marginRight: '16px' }} />
          </Box>
          <Box>
            <Container>
              <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
                <Box display="flex" alignItems="center" sx={{ fontWeight: '600', color: 'black' }}>
                  <Button>All Categories</Button>
                  <Button>Home</Button>
                  <Button>Promotions</Button>
                  <Button>Price Change</Button>
                  <Button>Abbreviations</Button>
                </Box>
              </Toolbar>
            </Container>
          </Box>
          <Stack direction="row" spacing={2}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f4f4f4',
                borderRadius: 1,
                px: 2,
                width: '60%',
              }}
            >
              <InputBase
                placeholder="Search Product..."
                sx={{ ml: 1, flex: 1, color: '#333' }}
                inputProps={{ 'aria-label': 'search product' }}
              />
              <IconButton type="submit" sx={{ p: 1, color: '#333' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Box>

            <Box display="flex" alignItems="center">
              <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
                <StyledBadge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <Cart />
              </Drawer>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default CustomHeader;
