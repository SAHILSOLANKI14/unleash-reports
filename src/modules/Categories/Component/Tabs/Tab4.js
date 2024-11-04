import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Grid, InputLabel, Stack, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Tab4 = ({ handleNext, handlePrev }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Stack direction={'row'}>
          <TextField
            label="Product Image"
            variant="outlined"
            size="small"
            fullWidth
            value={'Product Image'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          label="Product Image Gallery"
          variant="outlined"
          size="small"
          fullWidth
          value={'Product Image Gallery'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload files
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                    multiple
                  />
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <InputLabel>Product Details</InputLabel>
        <TextField id="outlined-multiline-static" multiline rows={7} fullWidth />
      </Grid>
      <Grid item xs={12} md={12}>
        <InputLabel>Product details for invoice</InputLabel>
        <TextField id="outlined-multiline-static" multiline fullWidth rows={7} />
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

export default Tab4;
