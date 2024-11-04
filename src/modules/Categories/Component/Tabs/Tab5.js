import { Button, Grid, InputLabel, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';

const Tab5 = ({ handleChange, checked, handlePrev, handleNext }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <InputLabel>Alert Quantity</InputLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          type="number"
          // value={}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Checkbox
                  sx={{ color: '#2277f5' }}
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <InputLabel>Reorder Threshold Quantity</InputLabel>
        <TextField variant="outlined" size="small" fullWidth />
      </Grid>
      <Grid item xs={12} md={12}>
        <InputLabel>Maximum Quantity per Sale</InputLabel>
        <TextField variant="outlined" size="small" fullWidth />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel>Location (Rack)</InputLabel>
        <TextField variant="outlined" size="small" fullWidth />
      </Grid>
      <Grid item xs={12} md={6}>
        {/* <InputLabel>Location (Rack)</InputLabel>
      <TextField variant="outlined" size="small" fullWidth /> */}
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

export default Tab5;
