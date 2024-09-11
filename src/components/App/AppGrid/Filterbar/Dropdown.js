import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import { usePopupState, bindMenu, bindToggle, bindPopover } from 'material-ui-popup-state/hooks';
import useRequest from 'src/components/hooks/useRequest';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { RoundedButton } from './styles';

import CloseIcon from '@mui/icons-material/Close';

function Dropdown({ filter, id, value, ...props }) {
  const [options, setOptions] = useState(filter?.options || []);
  const [search, setSearch] = useState('');
  const popupState = usePopupState({ variant: 'popover', popupId: 'pinnedBoards' });

  const otherProps = {
    ...(filter.icon && { startIcon: filter.icon }),
  };

  let remoteOptions, loading;
  if (filter.remoteMethod) {
    [remoteOptions, { loading }] = useRequest(filter.remoteMethod, search);
  }
  const menuOptions = [...(remoteOptions && remoteOptions.length ? remoteOptions : []), ...options];

  const handleChange = (option) => {
    props.onChange(filter.key, option);
    popupState.close();
  };

  const label = (value && value[props.optLabel]) || filter.title;
  const isSelected = value && !isEmpty(value);

  const handleClick = (event) => {
    if (isSelected) {
      props.onChange(filter.key, undefined);
    } else {
      popupState.setAnchorEl(event.target);
      popupState.open();
    }
  };

  return (
    <>
      <RoundedButton
        selected={isSelected}
        variant={isSelected ? 'contained' : 'outlined'}
        color={isSelected ? 'secondary' : 'primary'}
        {...otherProps}
        onClick={handleClick}
        {...(isSelected && {
          endIcon: <CloseIcon />,
        })}
      >
        {label}
      </RoundedButton>
      <Menu
        {...bindMenu(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {loading && (
          <MenuItem>
            <ListItemText
              primary={
                <Stack direction="row" alignItems="center" spacing={2}>
                  <CircularProgress color="inherit" size={24} />
                  <Typography color="textSecondary" variant="body2">
                    Loading...
                  </Typography>
                </Stack>
              }
            />
          </MenuItem>
        )}
        {menuOptions.map((option, index) => (
          <MenuItem key={`${id}-option-${index}`} onClick={() => handleChange(option)}>
            <ListItemText primary={option[props.optLabel]} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

Dropdown.propTypes = {
  optLabel: PropTypes.string,
  optValue: PropTypes.string,
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  optLabel: 'label',
  optValue: 'value',
  onChange: () => {},
};

export default Dropdown;
