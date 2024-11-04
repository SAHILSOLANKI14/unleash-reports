import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import AppGrid from 'src/components/App/AppGrid';

const Tab2 = ({ handleNext, handlePrev, Data, columns }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <InputLabel sx={{ mb: 1 }}>Product Cost *</InputLabel>
        <TextField label="Units" variant="outlined" fullWidth size="small" />
      </Grid>
      <Grid item xs={12} md={4}>
        <InputLabel sx={{ mb: 1 }}>Tax Method</InputLabel>
        <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
          <Select>
            <MenuItem value="Brand 1">Exclusive</MenuItem>
            <MenuItem value="Brand 2">Inclusive</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <InputLabel sx={{ mb: 1 }}>Taxable unit of a product</InputLabel>
        <TextField label="Code" variant="outlined" fullWidth size="small" />
      </Grid>
      <Grid item xs={12} md={4}>
        <InputLabel sx={{ mb: 1 }}>State Tax Rate *</InputLabel>
        <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
          <Select>
            <MenuItem value="Brand 1">Exclusive</MenuItem>
            <MenuItem value="Brand 2">Inclusive</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <InputLabel sx={{ mb: 1 }}>County Tax Rate *</InputLabel>
        <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
          <Select>
            <MenuItem value="Brand 1">Exclusive</MenuItem>
            <MenuItem value="Brand 2">Inclusive</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <InputLabel sx={{ mb: 1 }}>City Tax Rate *</InputLabel>
        <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
          <Select>
            <MenuItem value="Brand 1">Exclusive</MenuItem>
            <MenuItem value="Brand 2">Inclusive</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: '700', color: '#273238', fontSize: '15px' }}>
          * The first row corresponds to the default state for the warehouse. Please ensure you add
          the price to the first row to set the default state price for the product.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AppGrid
          data={Data}
          columns={columns}
          options={{
            selectableRows: false,
            selectableRowsHideCheckboxes: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel sx={{ mb: 1 }}>Taxable Sale Quantity</InputLabel>
        <TextField label="" variant="outlined" fullWidth size="small" defaultValue={0} />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel sx={{ mb: 1 }}>Shipping Cost</InputLabel>
        <TextField label="" variant="outlined" fullWidth size="small" defaultValue={0} />
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

export default Tab2;
