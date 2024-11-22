import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
import { useEffect, useState } from 'react';
import {
  Menu as MenuIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { fetchCategoriesRequest } from '../Category/store/categoriesAction';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/unleash-logo.png';
import Cart from '../WebCart/Component/Cart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { logout } from '../Auth/Store/authslice';
import { useDispatch } from 'react-redux';
import GoogleMaps from './productSearch';
import ProductSearch from './productSearch';
import { fetchproductData } from 'src/modules/Categories/API/ProductsApi';
import { fetchproductCategoryData } from '../Category/api';
import CategoryMenu from '../Category/Component';
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCategories, setOpenCategories] = useState({});
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.WebAuth.isAuthenticated);
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };
  const { categories = [], loading } = useSelector((state) => ({
    categories: state.category.categories || [],
    loading: state.category.loading,
  }));

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  const handleCategoryMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const logoutsession = () => {
    dispatch(logout());
  };
  // const handleInputChange = (e) => {};
  const handleCategoryMenuClose = () => {
    setAnchorEl(null);
  };
  const handleCategoryClick = async (categoryId) => {
    const requestPayload = { category_id: categoryId };
    const res = await fetchproductData(requestPayload);
    navigate(`/category/${categoryId}`);
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
            {isAuthenticated ? (
              <>
                <Link to={'/'}>
                  <IconButton>
                    <DashboardIcon sx={{ mr: '2px', fontSize: '20px', color: '#ffffff' }} />
                    <Typography variant="h5" sx={{ textAlign: 'center', color: '#ffffff' }}>
                      Dashboard
                    </Typography>
                  </IconButton>
                </Link>
                {/* <Link to={'/login'}> */}
                <IconButton sx={{ color: '#ffffff' }} onClick={logoutsession}>
                  <LogoutIcon />
                  <Typography
                    variant="h5"
                    sx={{ textAlign: 'center', color: '#ffffff', mr: 1, ml: 1 }}
                  >
                    Logout
                  </Typography>
                </IconButton>
                {/* / */}
              </>
            ) : (
              <Link to={'/login'}>
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

        <Toolbar
          sx={{ justifyContent: 'space-evenly', px: 0, mt: 2, borderBottom: '1px solid #bcbdc1' }}
        >
          <Link to={'/home'}>
            <Box display="flex" alignItems="center" sx={{ pb: 2 }}>
              <img
                src={logo}
                alt="Unleash POS Logo"
                style={{ width: '80%', marginRight: '16px' }}
              />
            </Box>
          </Link>
          <Box>
            {/* <Container> */}
            <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
              <Box display="flex" alignItems="center" sx={{ fontWeight: '600', color: 'black' }}>
                <CategoryMenu />
                <Link
                  to={'/home'}
                  style={{ padding: '0 10px', textDecoration: 'none', color: 'black' }}
                >
                  <Button>Home</Button>
                </Link>
                <Link to={'/promotion'}   style={{ padding: '0 10px', textDecoration: 'none', color: 'black' }}>
                  <Button>Promotions</Button>
                </Link>
                <Link to={'#'}   style={{ padding: '0 10px', textDecoration: 'none', color: 'black' }}>
                  <Button>Price Change</Button>
                </Link>
                <Link to={'/abbreviations'}   style={{ padding: '0 10px', textDecoration: 'none', color: 'black' }}>
                  <Button>Abbreviations</Button>
                </Link>
              </Box>
            </Toolbar>
            {/* </Container> */}
          </Box>
          <Stack direction="row" spacing={2}>
            <ProductSearch />
            <Box display="flex" alignItems="center">
              <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
                <StyledBadge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <Cart onClose={toggleDrawer(false)} />
              </Drawer>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default CustomHeader;
