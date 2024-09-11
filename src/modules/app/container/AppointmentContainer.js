import { useState } from 'react';
import Grid from '@mui/material/Grid';
import AppGrid from 'src/components/App/AppGrid';
import { appointments } from '../../../mock/appointments';
// import { Button } from 'src/components/shared';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/DeleteOutline';
// import Popover from '@mui/material/Popover';
// import MenuItem from '@mui/material/MenuItem';
// import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// import PickerWithButtonField from 'src/components/App/DatePicker';
import PopupAction from 'src/modules/Sales/components/PopupAction';
import TableHeader from 'src/modules/Sales/components/TableHeader';
function AppointmentContainer() {
  const [open, setOpen] = useState(null);

  const handleActionMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  appointments.map((item, index) => {
    return (item.index = index + 1);
  });
  const columns = [
    {
      label: '#',
      name: 'index',
      width: '30%',
    },
    {
      label: 'Name',
      name: 'name',
    },
    {
      label: 'Age',
      name: 'age',
    },
    {
      label: 'Mobile Number',
      name: 'mobile',
    },
    {
      label: 'Date/Time',
      name: 'date',
    },
    {
      label: 'Symptoms',
      name: 'symptoms',
    },
    {
      label: () => {
        <>
          <PopupAction />
        </>;
      },
      name: 'action',
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <>
              <PopupAction />
            </>
          );
        },
      },
    },
  ];

  return (
    <>
      <TableHeader />
      <Box
        sx={{
          marginBottom: 2,
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <AppGrid
              columns={columns}
              data={appointments}
              selectableRows="none"
              onFilterChange={() => {}}
              appliedFilters={{}}
              bulkActions={[]}
              onBulkAction={() => {}}
              onSort={() => {}}
              onClearFilters={() => {}}
              title=""
              titleProps={{}}
              pagingType="table"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AppointmentContainer;
