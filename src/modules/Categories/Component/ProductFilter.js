import React from 'react';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  filterInput: {
    marginBottom: theme.spacing(2),
  },
}));

const FilterComponent = ({ filterText, onFilterChange }) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.filterInput}
      label="Filter Suppliers"
      variant="outlined"
      value={filterText}
      onChange={onFilterChange}
      fullWidth
    />
  );
};

export default FilterComponent;
