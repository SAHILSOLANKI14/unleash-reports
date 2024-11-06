import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../../assets/images/unleash-logo.png';
function CustomHeader() {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', pt: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 4 }}>
          <Box display="flex" alignItems="center" sx={{ pb: 2 }}>
            <img src={logo} alt="Unleash POS Logo" style={{ width: '60%', marginRight: '16px' }} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f4f4f4',
              borderRadius: 1,
              px: 2,
              width: '40%',
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
            <Typography variant="body1" sx={{ color: '#333', fontWeight: 'bold', mr: 2 }}>
              $930.56
            </Typography>
            <IconButton sx={{ color: '#333' }}>
              <ShoppingCartIcon />
            </IconButton>
            <IconButton sx={{ color: '#333' }}>
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Navigation Links and Contact Section */}
        <Box sx={{ backgroundColor: '#5341f9', py: 1 }}>
          <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
            {/* Navigation Links */}
            <Box display="flex" alignItems="center">
              <Button sx={{ color: '#ffffff', textTransform: 'none' }}>All Categories</Button>
              <Button sx={{ color: '#ffffff', textTransform: 'none' }}>Home</Button>
              <Button sx={{ color: '#ffffff', textTransform: 'none' }}>Promotions</Button>
              <Button sx={{ color: '#ffffff', textTransform: 'none' }}>Price Change</Button>
              <Button sx={{ color: '#ffffff', textTransform: 'none' }}>Abbreviations</Button>
            </Box>

            {/* Contact Info */}
            <Box display="flex" alignItems="center">
              <PhoneIcon sx={{ color: '#ffffff', mr: 1 }} />
              <Typography variant="body1" sx={{ color: '#ffffff' }}>
                (732) 454-8888
              </Typography>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
}

export default CustomHeader;
