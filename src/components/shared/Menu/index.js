import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, ListItemIcon, IconButton } from '@mui/material';
import Button from '../Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { uniqueId } from 'lodash';
import { makeStyles } from '@mui/styles';
import ConfirmDialog from '../../App/ConfirmDialog';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
export const useStyles = makeStyles((theme) => ({
  listItemIcon: {
    minWidth: 36,
  },
}));

const AppMenu = ({
  options,
  loading,
  className = '',
  iconButton,
  iconSearch,
  title,
  buttonStyles,
  color,
  endIcon = false,
  disabled = false,
  trigger,
  ...props
}) => {
  const classes = useStyles();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [savedVal, setSavedVal] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const id = uniqueId('context-menu-');
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSelect = (val) => {
    if (val.confirm && val.confirm == true) {
      setSavedVal(val);
      setConfirmOpen(true);
      handleClose();
    } else {
      val?.onClick();
      handleClose();
    }
  };

  const onConfirm = () => {
    if (savedVal) {
      savedVal?.onClick();
      setSavedVal(null);
    }
    setConfirmOpen(false);
    // val?.onClick();
    // handleClose();
  };

  return (
    <div className={className}>
      {iconButton ? (
        <IconButton
          sx={{ ...buttonStyles }}
          disabled={disabled}
          aria-label="more"
          aria-controls={id}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon color="rbg(0, 0, 0, 0.54)" />
        </IconButton>
      ) : iconSearch ? (
        <Button
          color={color}
          size="medium"
          disabled={disabled}
          variant="outlined"
          onMouseEnter={(e) => handleClick(e)}
          // onMouseLeave={() => {
          //   if (anchorEl != null) {
          //     setAnchorEl(null);
          //   }
          // }}
          sx={{ ...buttonStyles }}
          startIcon={<SearchIcon />}
        >
          {title}
        </Button>
      ) : (
        <Button
          variant="text"
          disabled={disabled}
          sx={{ ...buttonStyles }}
          endIcon={endIcon && <ArrowDropDownIcon />}
          color={color}
          {...props}
          {...(trigger === 'hover' && {
            onMouseEnter: (e) => handleClick(e),
          })}
          {...(trigger === 'click' && {
            onClick: (e) => handleClick(e),
          })}
        >
          {title}
        </Button>
      )}

      {!disabled && (
        <Menu id={id} anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
          {options.map((option, index) => (
            <MenuItem key={`${id}-option-${index}`} onClick={() => onSelect(option)}>
              {option?.icon && (
                <ListItemIcon className={classes.listItemIcon}>{option.icon}</ListItemIcon>
              )}
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      )}
      <ConfirmDialog
        title={savedVal && savedVal.popUpTitle ? savedVal.popUpTitle : 'Are you sure?'}
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={onConfirm}
        onClose={() => {
          setConfirmOpen(false);
        }}
        loading={loading}
      >
        {savedVal && savedVal.confirmMessage && savedVal.confirmMessage
          ? savedVal.confirmMessage
          : ''}
      </ConfirmDialog>
    </div>
  );
};

AppMenu.propTypes = {
  options: PropTypes.array,
  className: PropTypes.string,
  loading: PropTypes.bool,
  title: PropTypes.any,
  iconButton: PropTypes.bool,
  buttonStyles: PropTypes.any,
  color: PropTypes.any,
  trigger: PropTypes.string,
};

AppMenu.defaultProps = {
  options: [],
  className: '',
  loading: false,
  title: undefined,
  iconButton: true,
  buttonStyles: {},
  color: 'inherit',
  trigger: 'click',
};

export default AppMenu;
