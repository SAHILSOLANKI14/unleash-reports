import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';

const Tab7 = ({ handleNext, handlePrev }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <InputLabel>Promotion Price</InputLabel>
        <TextField variant="outlined" size="small" fullWidth></TextField>
      </Grid>
      <Grid item xs={12} md={4}>
        <InputLabel>Start Date</InputLabel>
        <TextField variant="outlined" size="small" fullWidth></TextField>
      </Grid>
      <Grid item xs={12} md={4}>
        <InputLabel>End Date</InputLabel>
        <TextField variant="outlined" size="small" fullWidth></TextField>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box sx={{ background: '#f7f8fa', p: 4 }}>
          <Stack direction={'row'} spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <InputLabel sx={{ mb: 2 }}>Promotional Indicator</InputLabel>
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
                label="Supplier5 Price "
              >
                <Select defaultValue="Yes">
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel sx={{ mb: 1 }}>Selling Unit</InputLabel>
              <TextField variant="outlined" size="small" fullWidth></TextField>
            </Grid>
          </Stack>
          <Stack direction={'row'} spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <InputLabel sx={{ mb: 1 }}>Promotion Code</InputLabel>
              <TextField variant="outlined" size="small" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel sx={{ mb: 1 }}>Shipper Flag</InputLabel>
              <TextField variant="outlined" size="small" fullWidth></TextField>
            </Grid>
          </Stack>
          <Stack direction={'row'} spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <InputLabel sx={{ mb: 1 }}>Product Selling Units</InputLabel>
              <TextField variant="outlined" size="small" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <InputLabel>Promotional Indicator</InputLabel>
            <TextField variant="outlined" size="small" fullWidth></TextField> */}
            </Grid>
          </Stack>
        </Box>
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

export default Tab7;
