import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { Button } from 'src/components/shared';
import PopupForm from '../../../components/shared/Form/PopUpform';
import FilterStatus from '../components/FilterData';

const TableHeader = ({ onSelect }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={11} container>
          <Grid item xs={1} style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button variant="contained" onClick={handleOpenPopup}>
              Add New
            </Button>
          </Grid>
          <Grid item xs={1} style={{ display: 'flex', justifyContent: 'start' }}>
            <FilterStatus onFilter={onSelect} />
          </Grid>
          <Grid item xs={5} style={{ display: 'flex', justifyContent: 'flex-start' }}></Grid>
          <Grid item xs={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Stack spacing={1} direction="row">
              {/* <Button variant="contained">Today</Button>
              <Button variant="outlined">Tomorrow</Button>
              <PickerWithButtonField /> */}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <PopupForm open={openPopup} handleClose={handleClosePopup} />
    </Box>
  );
};

export default TableHeader;
