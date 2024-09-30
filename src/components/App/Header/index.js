import React from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import Badge from '@mui/material/Badge';
import { StyledEngineProvider } from '@mui/material/styles';
import AccountMenu from '../AccountMenu';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import ComputerIcon from '@mui/icons-material/Computer';
import { Link } from 'react-router-dom';

const AppointmentToggle = styled(Paper)({
  backgroundColor: '#fff',
  width: '200px',
  border: '1px solid #eee',
  padding: 0,
  textAlign: 'center',
  '& .MuiFormControlLabel-root': {
    margin: 0,
  },
});

const IconItem = styled(Badge)({
  '& .MuiSvgIcon-root': {
    color: '#273e84',
  },
  '& .MuiBadge-badge': {
    background: 'transparent',
    color: '#273e84',
    border: '2px solid #2157DE',
    'padding-top': '2px',
  },
});

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={7}>
        <Grid item xs={8}>
          <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Patient Name, Etc..."
              inputProps={{ 'aria-label': 'Search Patient Name, Etc...' }}
              fullWidth
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={4} container>
          <Grid item xs={6}>
            <IconButton color="inherit">
              <Link
                to="/pos"
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
              >
                <IconItem
                  sx={{
                    fontSize: '18px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ComputerIcon color="secondary" sx={{ fontSize: '30px' }} />
                  POS
                </IconItem>
              </Link>
            </IconButton>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Stack
              spacing={2}
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <div>
                <Stack spacing={1} direction="row">
                  <IconButton color="inherit">
                    <IconItem>
                      <Badge badgeContent={0} color="secondary">
                        <NotificationsIcon color="secondary" />
                      </Badge>
                    </IconItem>
                  </IconButton>
                  <IconButton color="inherit">
                    <IconItem>
                      <SettingsIcon color="gray" />
                    </IconItem>
                  </IconButton>
                </Stack>
              </div>
              <AccountMenu />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;
