import AutorenewIcon from '@mui/icons-material/Autorenew';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
const Tabs1 = ({ handleProductNameChange, handleslug, productName, error, handleNext, slug }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <InputLabel sx={{ mb: 1 }}>Product Name</InputLabel>
        <TextField
          label=""
          variant="outlined"
          fullWidth
          required
          size="small"
          sx={{ mb: 0 }}
          value={productName}
          autoFocus
          error={error.productName}
          onChange={handleProductNameChange}
          helperText={error.productName && 'Product Name is required'}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <InputLabel sx={{ mb: 1 }}>Slug</InputLabel>
        <TextField
          label=""
          variant="outlined"
          fullWidth
          required
          size="small"
          sx={{ mb: 0 }}
          defaultValue={slug}
          error={error.slug}
          helperText={error.slug && 'Slug is required'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleslug}>
                  <AutorenewIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <InputLabel sx={{ mb: 1 }}>Weight</InputLabel>
        <TextField label="(kg)" variant="outlined" fullWidth size="small" sx={{ mb: 1 }} />
      </Grid>
      <Grid item xs={12} md={12}>
        <InputLabel sx={{ mb: 1 }}>Barcode Symbology</InputLabel>
        <TextField label="" variant="outlined" fullWidth size="small" sx={{ mb: 1 }} />
      </Grid>
      <Grid item xs={12} md={12}>
        <InputLabel sx={{ mb: 1 }}>Brand</InputLabel>
        <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
          <Select>
            <MenuItem value="Brand 1">Brand 1</MenuItem>
            <MenuItem value="Brand 2">Brand 2</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={12}>
        <InputLabel sx={{ mb: 1 }}>Category</InputLabel>
        <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
          <Select>
            <MenuItem value="Category 1">Category 1</MenuItem>
            <MenuItem value="Category 2">Category 2</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          fullWidth
          //   disabled={!productName || !slug}
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

export default Tabs1;
