import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Menu,
  MenuItem,
  Collapse,
  InputBase,
  Button,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Phone as PhoneIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { fetchCategoriesRequest } from '../Category/store/categoriesAction';
import { logout } from '../Auth/Store/authslice';
import logo from '../../../assets/images/unleash-logo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

function CustomHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCategories, setOpenCategories] = useState({});

  const isAuthenticated = useSelector((state) => state.WebAuth.isAuthenticated);
  const dispatch = useDispatch();
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
  const handleCategoryMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (categoryId) => {
    setOpenCategories((prevOpen) => ({
      ...prevOpen,
      [categoryId]: !prevOpen[categoryId],
    }));
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
          sx={{ justifyContent: 'space-between', px: 0, mt: 2, borderBottom: '1px solid #bcbdc1' }}
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

          {/* All Categories Menu Button */}
          <Box>
            <Button color="primary" onClick={handleCategoryMenuOpen} startIcon={<MenuIcon />}>
              All Categories
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCategoryMenuClose}
              PaperProps={{
                style: {
                  maxHeight: 400,
                  width: '250px',
                },
              }}
            >
              {loading ? (
                <MenuItem>Loading...</MenuItem>
              ) : (
                categories.map((category) => (
                  <div key={category.id}>
                    <MenuItem onClick={() => handleCategoryClick(category.id)}>
                      {category.name}
                      {openCategories[category.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </MenuItem>
                    {category.child && (
                      <Collapse in={openCategories[category.id]} timeout="auto" unmountOnExit>
                        <Box pl={2}>
                          {category.child.map((child) => (
                            <MenuItem key={child.id}>{child.name}</MenuItem>
                          ))}
                        </Box>
                      </Collapse>
                    )}
                  </div>
                ))
              )}
            </Menu>
          </Box>
          <Button color="primary">Home</Button>
          <Button color="primary">Promotion</Button>
          <Button color="primary">Price change</Button>
          <Button color="primary">Abbreviation</Button>
          <Button color="primary"></Button>
          <Button color="primary"></Button>

          {/* Search Bar */}
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
              <InputBase placeholder="Search Product..." sx={{ ml: 1, flex: 1, color: '#333' }} />
              <IconButton type="submit" sx={{ p: 1, color: '#333' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Box>
            <IconButton aria-label="cart">
              <ShoppingCartIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default CustomHeader;
