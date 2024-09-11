import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Autocomplete,
  FormControl,
  TextField,
  Chip,
  Avatar,
  CircularProgress,
  createFilterOptions,
} from '@mui/material';
import { debounce } from 'lodash';

const propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  remoteMethod: PropTypes.func,
  autocomplete: PropTypes.bool,
  fullWidth: PropTypes.bool,
  showAvatar: PropTypes.bool,
  optLabel: PropTypes.string,
  optValue: PropTypes.string,
  disabled: PropTypes.bool,
  groupBy: PropTypes.string,
  allowAdd: PropTypes.bool,
  inputProps: PropTypes.any,
};

const defaultProps = {
  className: undefined,
  variant: 'standard',
  name: undefined,
  label: undefined,
  defaultValue: undefined,
  placeholder: 'Select',
  multiple: false,
  autocomplete: false,
  fullWidth: false,
  showAvatar: false,
  optLabel: 'label',
  optValue: 'value',
  disabled: false,
  groupBy: undefined,
  allowAdd: false,
  inputProps: {},
};

const InputAutocomplete = ({
  className,
  variant,
  label,
  name,
  defaultValue,
  placeholder,
  options,
  onChange,
  multiple,
  autocomplete,
  fullWidth,
  showAvatar,
  optLabel,
  optValue,
  value,
  disabled,
  remoteMethod,
  allowAdd,
  inputProps,
  error,
  helperText,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [remoteOptions, setRemoteOptions] = useState([]);
  const filter = createFilterOptions();

  const onType = useCallback(
    debounce(async (val) => {
      if (typeof remoteMethod !== 'undefined' && typeof remoteMethod === 'function') {
        setRemoteOptions([]);
        setLoading(true);
        const data = await getRemoteData(val);
        setRemoteOptions(data);
        setLoading(false);
      }
    }, 250),
    [],
  );

  const getRemoteData = async (val) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await remoteMethod(val && typeof val !== 'undefined' ? val : '');
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const onClose = () => {
    // setRemoteOptions([]);
  };

  let optionsList = [];
  if (
    typeof remoteMethod !== 'undefined' &&
    typeof remoteMethod === 'function' &&
    remoteOptions.length > 0
  ) {
    optionsList = remoteOptions;
  } else {
    optionsList = options;
  }

  return (
    <FormControl fullWidth={fullWidth} margin="normal">
      <Autocomplete
        multiple={multiple}
        id={props.id}
        value={value}
        disabled={disabled}
        // options={[...options, ...remoteOptions]}
        options={optionsList}
        getOptionLabel={(option) => {
          return option['x-add-new-label']
            ? option['x-add-new-label']
            : option[optLabel]
            ? option[optLabel]
            : '';
        }}
        isOptionEqualToValue={(option, value) => {
          return option[optValue] === value[optValue];
        }}
        onChange={(event, newValue) => {
          if (newValue['x-add-new-label']) {
            delete newValue['x-add-new-label'];
          }
          if (!newValue.length) newValue = undefined;
          onChange(newValue, event);
        }}
        onOpen={(event) => {
          onType();
        }}
        className={className}
        onClose={onClose}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            return (
              <Chip
                avatar={showAvatar ? <Avatar>T</Avatar> : null}
                variant="filled"
                color="secondary"
                label={option[optLabel]}
                {...getTagProps({ index })}
              />
            );
          })
        }
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        filterOptions={(options, params) => {
          let filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some((option) => inputValue === option[optLabel]);
          if (allowAdd && inputValue !== '' && !isExisting && !loading && options.length <= 0) {
            filtered = [
              {
                [optValue]: undefined,
                [optLabel]: inputValue,
                'x-add-new-label': `+ Add ${inputValue}`,
              },
              ...filtered,
            ];
          }
          return filtered;
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              {...inputProps}
              label={label}
              variant={variant}
              fullWidth={fullWidth}
              error={error}
              helperText={helperText}
              style={props.inputStyles ? props.inputStyles : {}}
              onChange={(e) => {
                e.persist();
                onType(e.target.value);
              }}
              disabled={disabled}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
                ...inputProps,
              }}
            />
          );
        }}
        renderOption={(props, option) => {
          return (
            <li {...props} key={`${props.id}-${option[optValue]}`}>
              {option[optLabel]}
            </li>
          );
        }}
        name={props.name}
        {...props}
      />
    </FormControl>
  );
};

InputAutocomplete.propTypes = propTypes;
InputAutocomplete.defaultProps = defaultProps;

export default InputAutocomplete;
