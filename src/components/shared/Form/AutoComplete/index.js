import React, { useState, useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Autocomplete,
  FormControl,
  TextField,
  Chip,
  CircularProgress,
  createFilterOptions,
  MenuItem,
  ListItemIcon,
  InputAdornment,
  Checkbox,
  Typography,
  Avatar,
} from '@mui/material';
import { isNull, isEmpty } from 'lodash';
// import Avatar from '../../Avatar';
import { debounce } from 'lodash';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
  optAvatar: PropTypes.string,
  disabled: PropTypes.bool,
  groupBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  allowAdd: PropTypes.bool,
  inputProps: PropTypes.any,
  color: PropTypes.string,
  checkboxes: PropTypes.bool,
  freesolo: PropTypes.bool,
  renderOption: PropTypes.func,
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
  optAvatar: '',
  disabled: false,
  groupBy: undefined,
  allowAdd: false,
  inputProps: {},
  InputLabelProps: {},
  color: 'primary',
  checkboxes: false,
  freesolo: false,
  addNew: false,
  addNewLabel: 'Add New',
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
  optAvatar,
  value,
  disabled,
  remoteMethod,
  allowAdd,
  inputProps,
  error,
  addNew,
  addNewLabel,
  helperText,
  color,
  checkboxes,
  onSelectCustomFn = () => {}, // custom callback
  onNewAdd = () => {},
  freesolo,
  InputLabelProps,
  renderOption,
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
    [remoteMethod],
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
    remoteOptions?.length > 0
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
        value={value || null}
        disabled={disabled}
        options={optionsList}
        getOptionLabel={(option) => {
          return option?.['x-add-new-label']
            ? option?.['x-add-new-label']
            : option?.[optLabel]
            ? option?.[optLabel]
            : '';
        }}
        isOptionEqualToValue={(option, value) => {
          if (!option) return false;
          // commenting this for now
          // if (freesolo == true) {
          //   return value.includes(option[optValue]);
          // }
          return option[optValue] === value[optValue];
        }}
        onChange={(event, newValue) => {
          if (!newValue || isNull(newValue) || isEmpty(newValue)) {
            onChange(multiple === true ? [] : {}, event);
          } else {
            if (newValue['x-add-new-label']) {
              onNewAdd(newValue?.name);
              delete newValue['x-add-new-label'];
            }
            onChange(newValue, event);
            onSelectCustomFn();
          }
        }}
        onOpen={(event) => {
          onType(event?.target?.value);
        }}
        className={className}
        onClose={onClose}
        disableCloseOnSelect={checkboxes === true}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            return (
              <Chip
                avatar={
                  showAvatar ? (
                    <Avatar size={24} name={option[optLabel]} src={option[optAvatar]} />
                  ) : null
                }
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
          let { inputValue } = params;
          const isExisting = options.some(
            (option) => inputValue?.trim() === option?.[optLabel]?.trim(),
          );
          filtered = [
            ...(!addNew && allowAdd && inputValue !== '' && !isExisting && !loading
              ? [
                  {
                    [optValue]: undefined,
                    [optLabel]: inputValue,
                    'x-add-new-label': `+ Add ${inputValue}`,
                  },
                ]
              : []),
            ...(addNew && inputValue !== ''
              ? [
                  {
                    [optValue]: undefined,
                    [optLabel]: inputValue,
                    'x-add-new-label': addNewLabel,
                  },
                ]
              : []),
            ...filtered,
          ];
          return filtered;
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              {...inputProps}
              autoComplete="off"
              label={label}
              placeholder={placeholder}
              variant={variant}
              fullWidth={fullWidth}
              error={error}
              helperText={helperText}
              style={props.inputStyles ? props.inputStyles : {}}
              onChange={(e) => {
                e.persist();
                onType(e.target.value);
              }}
              color={color}
              disabled={disabled}
              InputLabelProps={InputLabelProps}
              InputProps={{
                ...params.InputProps,
                ...(showAvatar &&
                  !multiple &&
                  value &&
                  value[optAvatar] && {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar size={32} name={value[optLabel]} src={value[optAvatar]} />
                      </InputAdornment>
                    ),
                  }),
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
                ...(inputProps.startAdornment || params.InputProps.startAdornment
                  ? {
                      startAdornment: (
                        <Fragment>
                          {inputProps.startAdornment}
                          {params.InputProps.startAdornment}
                        </Fragment>
                      ),
                    }
                  : {}),
                autoComplete: 'none',
                ...props?.InputProps,
              }}
            />
          );
        }}
        renderOption={(props, option, { selected }) => {
          if (renderOption && typeof renderOption !== 'undefined')
            return renderOption(option, props);
          return (
            <MenuItem {...props} key={`${props.id}-${option[optValue]}`}>
              {checkboxes ? (
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  color="secondary"
                  checked={selected}
                />
              ) : (
                <>
                  {showAvatar ? (
                    <ListItemIcon>
                      <Avatar size={32} name={option[optLabel]} src={option[optAvatar]} />
                    </ListItemIcon>
                  ) : null}
                </>
              )}

              {option?.['x-add-new-label'] ? (
                addNew ? (
                  <div style={{ color: '#1976D2' }}>{option?.['x-add-new-label']}</div>
                ) : (
                  option?.['x-add-new-label']
                )
              ) : option?.[optLabel] ? (
                <Typography sx={{ whiteSpace: 'break-spaces' }}>{option?.[optLabel]}</Typography>
              ) : (
                ''
              )}
            </MenuItem>
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
