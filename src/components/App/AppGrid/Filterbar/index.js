import React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Search from './Search';
import Dropdown from './Dropdown';
// import RelativeDateRange from 'src/components/App/FilterBar/RelativeDateRange.js';
import RelativeDateRange from './RelativeDateRange';

import { v4 as uuidv4 } from 'uuid';

function FilterBar({ showSearch, filters, onChange, value }) {
  const id = 'lms-filter-item';

  const handleSearch = (value) => {
    onChange('_search', value);
  };

  const handleFilter = (key, value) => {
    onChange(key, value);
  };

  const renderInput = (filter, index) => {
    switch (filter.type) {
      case 'dropdown':
        return (
          <Dropdown
            filter={filter}
            id={id}
            optLabel={filter?.optLabel || 'label'}
            optValue={filter?.optValue || 'value'}
            onChange={handleFilter}
            value={value[filter.key] || undefined}
          />
        );
        break;

      case 'relativeDateRange':
        return (
          <RelativeDateRange
            filter={filter}
            // value={value1}
            value={value[filter.key] || undefined}
            onChange={(value) => onChange(filter.key, value)}
            filters={value}
            type="button"
            options={filter.options}
            customOptions={filter?.customOptions || undefined}
          />
        );
        break;

      default:
        break;
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      {showSearch && (
        <Grid item xs={12} md={4} lg={4}>
          <Search onChange={handleSearch} value={value?._search || ''} />
        </Grid>
      )}

      <Grid item xs={12} md={8} lg={8}>
        <Stack flex={1} direction="row" spacing={2}>
          {filters.map((filter, index) => (
            <div key={`lms-filter-${index}`}>{renderInput(filter, index)}</div>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

FilterBar.propTypes = {
  showSearch: PropTypes.bool,
  onChange: PropTypes.func,
  filters: PropTypes.array,
  value: PropTypes.any,
};

FilterBar.defaultProps = {
  showSearch: false,
  onChange: () => {},
  filters: [],
  value: {},
};

export default FilterBar;
