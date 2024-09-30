import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Stack,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
const AddCustomer = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          position: 'sticky',
          zIndex: 1,
          backgroundColor: 'white',
          borderBottom: '1px solid #ddd',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: '400' }}>
          Add Customer
        </Typography>
      </DialogTitle>

      {/* Modal Content */}
      <DialogContent dividers>
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Stack spacing={4}>
                <TextField id="outlined-basic" label="Company *" variant="outlined" size="small" />
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={[]}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="Parent Company" placeholder="Favorites" />
                  )}
                />
                <TextField id="outlined-basic" label="First Name" variant="outlined" size="small" />
                <TextField
                  id="outlined-basic"
                  label="Last Name *"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  id="outlined-basic"
                  label="Doing Business as"
                  variant="outlined"
                  size="small"
                />
                <TextField id="outlined-basic" label="Address *" variant="outlined" size="small" />
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={[]}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="Country *" placeholder="Favorites" />
                  )}
                />
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={[]}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="State *" placeholder="Favorites" />
                  )}
                />
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={[]}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="County *" placeholder="Favorites" />
                  )}
                />
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={[]}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="City *" placeholder="Favorites" />
                  )}
                />
                <TextField
                  id="outlined-basic"
                  label="Postal Code"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  id="outlined-basic"
                  label="Attach Document"
                  variant="outlined"
                  size="small"
                />
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={[]}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="Opening Balance Type" placeholder="Favorites" />
                  )}
                />
                <TextField
                  id="outlined-basic"
                  label="Opening Balance"
                  variant="outlined"
                  size="small"
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={4}>
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={[]}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="Customer Group *" placeholder="Favorites" />
                  )}
                />
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={[]}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="Price Group" placeholder="Favorites" />
                  )}
                />
                <TextField id="outlined-basic" label="Fax No" variant="outlined" size="small" />
                <TextField
                  id="outlined-basic"
                  label="Email Address *"
                  variant="outlined"
                  size="small"
                />
                <TextField id="outlined-basic" label="Phone *" variant="outlined" size="small" />
                <TextField
                  id="outlined-basic"
                  label="Customer Terms"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  id="outlined-basic"
                  label="State Tax Registration"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  id="outlined-basic"
                  label="Tobacco Licence Number"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  id="outlined-basic"
                  label="Driver Licence Number"
                  variant="outlined"
                  size="small"
                />
                <TextField id="outlined-basic" label="Password" variant="outlined" size="small" />
                <TextField
                  id="outlined-basic"
                  label="Cell Phone Number"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  id="outlined-basic"
                  label="Max Credit Limit"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  id="outlined-basic"
                  label="Tobacco License Expiry"
                  variant="outlined"
                  size="small"
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Grid item xs={12}>
          <Grid item xs={6}>
            <Autocomplete
              sx={{ mt: 3 }}
              id="size-small-outlined"
              size="small"
              options={[]}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField {...params} label="Customer Documents" placeholder="Favorites" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Button sx={{ background: '#1a79ff', color: 'white' }}>
              <AddIcon />
            </Button>
          </Grid>
        </Grid> 
      </DialogContent>

      {/* Sticky Footer */}
      <DialogActions
        sx={{
          position: 'sticky',
          zIndex: 1,
          backgroundColor: 'white',
          borderTop: '1px solid #ddd',
        }}
      >
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleClose}
          color="secondary"
          sx={{
            background: '#1a79ff',
            color: 'white',
            fontWeight: '500',
            ':hover': {
              background: '#1a79ff',
              color: 'white',
              fontWeight: '500',
            },
          }}
        >
          ADD CUSTOMER
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCustomer;
