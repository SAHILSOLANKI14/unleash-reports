import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  InputLabel: {
    color: theme.palette.secondary.dark,
    '&:hover': {
      color: theme.palette.primary.dark,
      background: 'transparent',
    },
  },
  label: {
    color: theme.palette.secondary.dark,
    '&:hover': {
      color: theme.palette.primary.dark,
      background: 'transparent',
    },
  },
}));
export default function InputWithIcon() {
  const classes = useStyles();
  return (
    <Box sx={{ '& > :not(style)': { m: 2, ml: 5 } }}>
      <FormControl variant="standard">
        <InputLabel className={classes.InputLabel} htmlFor="input-with-icon-adornment">
          Customer Name
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel className={classes.InputLabel} htmlFor="input-with-icon-adornment">
          Customer Name
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel className={classes.InputLabel} htmlFor="input-with-icon-adornment">
          Customer Name
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <TextField
        id="input-with-icon-textfield"
        label="Biller Name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        id="input-with-icon-textfield"
        label="Biller Name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        id="input-with-icon-textfield"
        label="Biller Name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="Sale_Status" variant="standard" />
      </Box> */}
    </Box>
  );
}
