import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  Stack,
  Menu,
  MenuItem,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesRequest } from '../Category/store/categoriesAction';
import { logout } from '../Auth/Store/authslice';
import CategoryMenu from '../Category/Component';
import logo from '../../../assets/images/unleash-logo.png';
import ProductSearch from './productSearch';
import Cart from '../WebCart/Component/Cart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function CustomHeader() {
  const [searchparam, setSearchparam] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.WebAuth.isAuthenticated);

  const toggleCartDrawer = (open) => () => setIsDrawerOpen(open);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', pt: 0 }}>
        {/* Top Bar */}
        <Box
          display="flex"
          alignItems="center"
          sx={{
            pb: 0,
            pl: 3,
            justifyContent: 'space-between',
            borderBottom: '1px solid #bcbdc1',
            color: '#ffffff',
            background: '#2277f5',
          }}
        >
          <Stack direction="row" spacing={2}>
            <Box display="flex" alignItems="center">
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
            {isAuthenticated ? (
              <>
                <Link to="/">
                  <IconButton>
                    <DashboardIcon sx={{ mr: '2px', fontSize: '20px', color: '#ffffff' }} />
                    <Typography variant="h5" sx={{ textAlign: 'center', color: '#ffffff' }}>
                      Dashboard
                    </Typography>
                  </IconButton>
                </Link>
                <IconButton sx={{ color: '#ffffff' }} onClick={handleLogout}>
                  <LogoutIcon />
                  <Typography
                    variant="h5"
                    sx={{ textAlign: 'center', color: '#ffffff', mr: 1, ml: 1 }}
                  >
                    Logout
                  </Typography>
                </IconButton>
              </>
            ) : (
              <Link to="/login">
                <IconButton sx={{ color: '#ffffff' }}>
                  <LoginIcon />
                  <Typography
                    variant="h5"
                    sx={{ textAlign: 'center', color: '#ffffff', mr: 1, ml: 1 }}
                  >
                    Login
                  </Typography>
                </IconButton>
              </Link>
            )}
          </Stack>
        </Box>

        {/* Main Toolbar */}
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: 2,
            mt: 2,
            p: 1,
            borderBottom: '1px solid #bcbdc1',
          }}
        >
          {/* Logo */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', md: 'none' } }}
            onClick={toggleMobileMenu}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/home">
            <Box display="flex" alignItems="center">
              <img
                src={logo}
                alt="Unleash POS Logo"
                style={{ width: '80%', marginRight: '16px', p: 2 }}
              />
            </Box>
          </Link>

          {/* Navigation Links (Desktop View) */}
          <Box
            display={{ xs: 'none', md: 'flex' }}
            alignItems="center"
            sx={{ fontWeight: '600', color: 'black' }}
          >
            <CategoryMenu />
            <Link to="/home" style={{ padding: '0 10px', textDecoration: 'none', color: 'black' }}>
              <Button>Home</Button>
            </Link>
            <Link
              to="/promotion"
              style={{ padding: '0 10px', textDecoration: 'none', color: 'black' }}
            >
              <Button>Promotions</Button>
            </Link>
            <Link to="#" style={{ padding: '0 10px', textDecoration: 'none', color: 'black' }}>
              <Button>Price Change</Button>
            </Link>
            <Link
              to="/abbreviations"
              style={{ padding: '0 10px', textDecoration: 'none', color: 'black' }}
            >
              <Button>Abbreviations</Button>
            </Link>
          </Box>

          {/* Mobile Menu (Hamburger Icon) */}

          <Drawer anchor="left" open={mobileMenuOpen} onClose={toggleMobileMenu}>
            <Box
              role="presentation"
              sx={{ width: 250 }}
              onClick={toggleMobileMenu}
              onKeyDown={toggleMobileMenu}
            >
              <CategoryMenu />
              <Link to="/home">
                <Button fullWidth>Home</Button>
              </Link>
              <Link to="/promotion">
                <Button fullWidth>Promotions</Button>
              </Link>
              <Link to="#">
                <Button fullWidth>Price Change</Button>
              </Link>
              <Link to="/abbreviations">
                <Button fullWidth>Abbreviations</Button>
              </Link>
            </Box>
          </Drawer>

          <ProductSearch />
          {/* Cart and Search */}

          <Box display="flex" alignItems="center">
            <IconButton aria-label="cart" onClick={toggleCartDrawer(true)}>
              <StyledBadge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleCartDrawer(false)}>
              <Cart onClose={toggleCartDrawer(false)} />
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default CustomHeader;
