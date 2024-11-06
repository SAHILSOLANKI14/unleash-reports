import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  TextField,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const Tab8 = ({ handlePrev, handleNext }) => {
  return (
    <form>
      <Grid container spacing={2}>
        {/* Section Title */}
        {/* <Grid item xs={12}>
                  <h2>Review your Details and Submit</h2>
                </Grid> */}
        {/* Checkboxes */}
        <Grid item xs={12} md={12}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox sx={{ color: '#2277f5' }} />}
              label="Featured (Shop homepage listing)"
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: '#2277f5' }} />}
              label="Hide in Shop Module"
            />
            <FormControlLabel control={<Checkbox sx={{ color: '#2277f5' }} />} label="Private" />
          </FormGroup>
        </Grid>
        {/* Hide From Customer Group */}
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Hide From Customer Group</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox sx={{ color: '#2277f5' }} />}
                label="Retailers"
              />
              <FormControlLabel control={<Checkbox sx={{ color: '#2277f5' }} />} label="Test" />
            </FormGroup>
          </FormControl>
        </Grid>
        {/* Product Tags */}
        <Grid item xs={12}>
          <InputLabel>Product Tags</InputLabel>
          <TextField label="" variant="outlined" fullWidth size="small" />
        </Grid>
        {/* Package Quantity */}
        <Grid item xs={12}>
          <InputLabel>Package Quantity</InputLabel>
          <TextField label="" variant="outlined" fullWidth size="small" />
        </Grid>
        {/* <Grid item xs={12} md={2} sx={{ mt: 3 }}>
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
        </Grid> */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              color: 'white',
              background: '#2277f5',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Tab8;
