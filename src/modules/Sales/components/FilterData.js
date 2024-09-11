import React, { useState } from 'react';
import { Stack, Typography, Box, FormControl, Popover, Grid } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  stack: {
    cursor: 'pointer',
    display: 'flex',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  stackMain: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'start',
    borderRadius: '5px',
  },
  popoverPaper: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
  },
  formControl: {
    minWidth: 200,
  },
  selectRoot: {
    '& .MuiSelect-select': {
      padding: theme.spacing(1),
      fontSize: '15px',
    },
  },
  selectMenu: {
    '& .MuiMenuItem-root': {
      fontSize: '0.875rem', // Reduced font size
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
      },
    },
  },
}));

const FilterStatus = ({ onFilter }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    if (onFilter) {
      onFilter(newValue?.value || '');
    }
  };

  const Values = [
    { value: 'All', label: 'All' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'allocated_pending', label: 'Allocated Pending' },
    { value: 'allocated_submitted', label: 'Allocated Submitted' },
  ];

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;

  return (
    <>
      <Grid container sx={{ flexGrow: 1 }} className={classes.stackMain}>
        <Grid xs={6} md={2}>
          <Stack direction="row" spacing={1} className={classes.stackMain}>
            <Stack
              direction="row"
              spacing={1}
              onClick={handleClick}
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                p: 1,
                cursor: 'pointer',
              }}
              className={classes.stack}
            >
              <FilterListIcon sx={{ color: 'white' }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: '600',
                  fontSize: '1rem',
                  color: 'white',
                }}
              >
                Filter
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          classes: {
            root: classes.popoverPaper,
          },
        }}
      >
        <Box sx={{ minWidth: 200 }}>
          <FormControl variant="outlined" className={classes.formControl}>
            <Autocomplete
              options={Values}
              getOptionLabel={(option) => option.label}
              id="status-filter"
              // className={classes.selectRoot}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} label="Sale Status" />}
              MenuProps={{
                PaperProps: {
                  className: classes.selectMenu,
                },
              }}
            />
          </FormControl>
        </Box>
      </Popover>
    </>
  );
};

FilterStatus.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default FilterStatus;
