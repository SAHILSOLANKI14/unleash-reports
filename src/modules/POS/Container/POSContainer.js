import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import PosGRID from '../Component/PosGRID';
import Breadcrumbs from 'src/components/shared/BreadCrumbs/Breadcrumb';

const POSContainer = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Breadcrumbs />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <PosGRID />
        </Grid>
      </Grid>
    </Box>
  );
};

export default POSContainer;
