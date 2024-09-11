import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { Form } from 'src/components/shared';
import { isEmpty } from 'lodash';
import DateRange from './DateRange';
import Dropdown from './Dropdown';

function Filter({ filter, onChange, value, appliedFilters }) {
  const isSet = useMemo(() => value && !isEmpty(value), [value]);

  const renderField = () => {
    switch (filter.type) {
      case 'dropdown':
        const inputProps = {};
        if (filter.remote === true) {
          inputProps.options = [];
          inputProps.remoteMethod = (val) => filter.remoteMethod(val);
        } else {
          inputProps.options = filter.options;
        }
        return (
          <Dropdown
            selected={appliedFilters[filter.key] ? appliedFilters[filter.key] : undefined}
            onChange={(value) => {
              onChange(filter.key, value);
            }}
            fullWidth={true}
            optLabel={filter.optLabel}
            optValue={filter.optValue}
            multiple={filter.multiple}
            value={value ? value : []}
            {...inputProps}
          />
        );
        break;

      case 'dateRange':
        return (
          <DateRange
            filter={filter}
            value={value}
            onChange={(value) => onChange(filter.key, value)}
          />
        );
        break;

      default:
        break;
    }
  };

  return (
    <Form
      initialValues={{
        [filter.key]: isSet,
      }}
    >
      {({ values }) => {
        return (
          <Box display="flex" flexDirection="column">
            <Form.Field.Checkbox
              name={filter.key}
              title={filter.title}
              label={filter.title}
              onChange={(val) => {
                if (val === false) {
                  onChange(filter.key, undefined);
                }
              }}
              color="secondary"
            />
            {values[filter.key] === true ? <Box width="100%">{renderField()}</Box> : null}
          </Box>
        );
      }}
    </Form>
  );
}

export default Filter;
