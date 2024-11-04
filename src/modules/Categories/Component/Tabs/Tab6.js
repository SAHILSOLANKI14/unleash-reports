import SyncIcon from '@mui/icons-material/Sync';
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tab6 = ({ handlePrev, handleNext, formState, handleAutocompleteChanges, onSyncClick }) => {
  const [supplier, setSupplier] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSupplier = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dev.unleashpos.com/api/v1/customers?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos&group=supplier`,
      );
      const data = response.data.data;
      const SupplierCompanies = data.map((supplier) => ({
        title: `${supplier.company}`,
        id: supplier.company_id,
      }));
      setSupplier(SupplierCompanies);
    } catch (error) {
      console.error('Error fetching Supplier:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <Autocomplete
            key={supplier.id || []}
            options={supplier || []}
            size="small"
            clearOnEscape
            value={supplier.find((option) => option.id === formState[`supplier1_id`]) || null}
            getOptionLabel={(option) => option.title || ''}
            renderInput={(params) => <TextField {...params} label={`Supplier_id1`} />}
            onInputChange={(event, newValue) => {
              if (newValue.length > 1) {
                fetchSupplier(newValue);
              } else {
                setSupplier([]);
              }
            }}
            noOptionsText="Type to search for a supplier"
            onChange={handleAutocompleteChanges('supplier1_id')}
            freeSolo
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField variant="outlined" size="small" fullWidth label="Supplier1 Part No " />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField variant="outlined" size="small" fullWidth label="Supplier1 Price " />
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 1 }}
          label="Supplier1 Price "
        >
          <Select defaultValue="Each (1)">
            <MenuItem value="Each (1)">Each (1)</MenuItem>
            <MenuItem value="Inner Pack (2)">Inner Pack (2)</MenuItem>
            <MenuItem value="Case (3)">Case (3)</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={1}>
        <IconButton>
          <SyncIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <Autocomplete
            key={supplier.id || []}
            options={supplier || []}
            size="small"
            clearOnEscape
            value={supplier.find((option) => option.id === formState[`supplier2_id`]) || null}
            getOptionLabel={(option) => option.title || ''}
            renderInput={(params) => <TextField {...params} label="Supplier_id2" />}
            onInputChange={(event, newValue) => {
              if (newValue.length > 1) {
                fetchSupplier(newValue);
              } else {
                setSupplier([]);
              }
            }}
            noOptionsText="Type to search for a supplier"
            onChange={handleAutocompleteChanges('supplier2_id')}
            freeSolo
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField variant="outlined" size="small" fullWidth label="Supplier2 Part No " />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField variant="outlined" size="small" fullWidth label="Supplier2 Price " />
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 1 }}
          label="Supplier2 Price "
        >
          <Select defaultValue="Each (1)">
            <MenuItem value="Each (1)">Each (1)</MenuItem>
            <MenuItem value="Inner Pack (2)">Inner Pack (2)</MenuItem>
            <MenuItem value="Case (3)">Case (3)</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={1}>
        <IconButton>
          <SyncIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <Autocomplete
            key={supplier.id || []}
            options={supplier || []}
            size="small"
            clearOnEscape
            value={supplier.find((option) => option.id === formState[`supplier3_id`]) || null}
            getOptionLabel={(option) => option.title || ''}
            renderInput={(params) => <TextField {...params} label="Supplier_id3" />}
            onInputChange={(event, newValue) => {
              if (newValue.length > 1) {
                fetchSupplier(newValue);
              } else {
                setSupplier([]);
              }
            }}
            noOptionsText="Type to search for a supplier"
            onChange={handleAutocompleteChanges('supplier3_id')}
            freeSolo
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField variant="outlined" size="small" fullWidth label="Supplier3 Part No " />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField variant="outlined" size="small" fullWidth label="Supplier3 Price " />
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 1 }}
          label="Supplier3 Price "
        >
          <Select defaultValue="Each (1)">
            <MenuItem value="Each (1)">Each (1)</MenuItem>
            <MenuItem value="Inner Pack (2)">Inner Pack (2)</MenuItem>
            <MenuItem value="Case (3)">Case (3)</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={1}>
        <IconButton>
          <SyncIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <Autocomplete
            key={supplier.id || []}
            options={supplier || []}
            size="small"
            clearOnEscape
            value={supplier.find((option) => option.id === formState[`supplier4_id`]) || null}
            getOptionLabel={(option) => option.title || ''}
            renderInput={(params) => <TextField {...params} label="Supplier_id4" />}
            onInputChange={(event, newValue) => {
              if (newValue.length > 1) {
                fetchSupplier(newValue);
              } else {
                setSupplier([]);
              }
            }}
            noOptionsText="Type to search for a supplier"
            onChange={handleAutocompleteChanges('supplier4_id')}
            freeSolo
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField variant="outlined" size="small" fullWidth label="Supplier4 Part No " />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField variant="outlined" size="small" fullWidth label="Supplier4 Price " />
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 1 }}
          label="Supplier4 Price "
        >
          <Select defaultValue="Each (1)">
            <MenuItem value="Each (1)">Each (1)</MenuItem>
            <MenuItem value="Inner Pack (2)">Inner Pack (2)</MenuItem>
            <MenuItem value="Case (3)">Case (3)</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={1}>
        <IconButton>
          <SyncIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <Autocomplete
            key={supplier.id || []}
            options={supplier || []}
            size="small"
            clearOnEscape
            value={supplier.find((option) => option.id === formState[`supplier5_id`]) || null}
            getOptionLabel={(option) => option.title || ''}
            renderInput={(params) => <TextField {...params} label="Supplier_id5" />}
            onInputChange={(event, newValue) => {
              if (newValue.length > 1) {
                fetchSupplier(newValue);
              } else {
                setSupplier([]);
              }
            }}
            noOptionsText="Type to search for a supplier"
            onChange={handleAutocompleteChanges('supplier5_id')}
            freeSolo
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField variant="outlined" size="small" fullWidth label="Supplier5 Part No " />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField variant="outlined" size="small" fullWidth label="Supplier5 Price " />
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 1 }}
          label="Supplier5 Price "
        >
          <Select defaultValue="Each (1)">
            <MenuItem value="Each (1)">Each (1)</MenuItem>
            <MenuItem value="Inner Pack (2)">Inner Pack (2)</MenuItem>
            <MenuItem value="Case (3)">Case (3)</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={1}>
        <IconButton>
          <SyncIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} md={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            color: 'white',
            background: '#2277f5',
            fontSize: '16px',
            fontWeight: '600',
          }}
          fullWidth
          onClick={handlePrev}
        >
          Previous
        </Button>
      </Grid>
      <Grid item xs={12} md={8} sx={{ mt: 3 }}></Grid>
      <Grid item xs={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          fullWidth
          sx={{
            color: 'white',
            background: '#2277f5',
            fontSize: '16px',
            fontWeight: '600',
          }}
        >
          Next Step
        </Button>
      </Grid>
    </Grid>
  );
};

export default Tab6;
