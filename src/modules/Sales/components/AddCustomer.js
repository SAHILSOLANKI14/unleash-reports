import React, { useState } from 'react';
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
  IconButton,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

const AddCustomer = ({ open, handleClose }) => {
  const [documentFields, setDocumentFields] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleDocumentChange = (index, field, value) => {
    const newDocumentFields = [...documentFields];
    newDocumentFields[index][field] = value;
    setDocumentFields(newDocumentFields);
  };

  const handleRemove = (index) => {
    setDocumentFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddDocumentField = () => {
    if (selectedDocument) {
      setDocumentFields((prev) => [...prev, { documentType: selectedDocument.title, file: null }]);
      setSelectedDocument(null);
    }
  };

  const Document = [{ title: 'MSA' }, { title: 'Tobacco' }, { title: 'Other' }];
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          position: 'sticky',
          zIndex: 1,
          backgroundColor: 'white',
          borderBottom: '1px solid #ddd',
          padding: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: '400' }}>
          Add Customer
        </Typography>
      </DialogTitle>

      {/* Modal Content */}
      <DialogContent dividers>
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
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
          <Stack
            direction={'row'}
            spacing={2}
            sx={{
              mt: 3,
              mb: 5,
            }}
          >
            <Grid item xs={11}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={Document}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} label="Customer Documents" placeholder="Favorites" />
                )}
                value={selectedDocument}
                onChange={(event, value) => {
                  setSelectedDocument(value);
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                sx={{ background: '#1a79ff', color: 'white' }}
                onClick={handleAddDocumentField}
              >
                <AddIcon />
              </Button>
            </Grid>
          </Stack>
        </Grid>
        {documentFields.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {documentFields.map((doc, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mt: 2, mb: 2 }}
              >
                <TextField
                  type="file"
                  size="small"
                  onChange={(e) => handleDocumentChange(index, 'file', e.target.files[0])}
                />

                <TextField
                  label="Document Type"
                  value={doc.documentType}
                  size="small"
                  variant="outlined"
                  disabled
                />

                <IconButton onClick={() => handleRemove(index)} sx={{ mt: 1 }}>
                  <ClearIcon />
                </IconButton>
              </Stack>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          position: 'sticky',
          zIndex: 1,
          backgroundColor: 'white',
          borderTop: '1px solid #ddd',
          padding: 3,
        }}
      >
        <Button
          onClick={handleClose}
          color="primary"
          sx={{
            border: '1px solid #ec2951',
            color: '#ec2951',
            pl: 4,
            pr: 4,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleClose}
          color="secondary"
          sx={{
            background: '#1a79ff',
            color: 'white',
            fontWeight: '600',
            pl: 4,
            pr: 4,
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
