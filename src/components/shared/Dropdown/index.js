import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  MenuItem,
  Fade,
  Box,
  Typography,
  TextField,
  CircularProgress,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ButtonBase,
  Stack,
  Tooltip,
} from '@mui/material';

import _, { debounce, uniqueId } from 'lodash';
import { Button, Form } from 'src/components/shared';
import { isEmpty } from 'lodash';
import { useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { StyledPartsSpan, StyledSpan } from './styles';

function FilterPicker({
  label,
  title,
  options = [],
  icon,
  onChange,
  onBlur: onBlurChange = () => null,
  onClear,
  ml,
  mr,
  optLabel,
  optValue,
  selected,
  remoteMethod,
  cancellable,
  searchable,
  className = '',
  multiple,
  customRenderMenu,
  groupBy,
  remote,
  isPrimary,
  apply = false,
  checkbox,
  sx,
  custom = true,
  customHeader = false,
  showEndIcon = true,
  color = undefined,
  index,
  withClearButton,
  ...props
}) {
  let initialValue = props.value;
  if (Array.isArray(props.value)) {
    initialValue = [...props.value];
  } else if (typeof props.value === 'object' && Object.keys(props.value)?.length) {
    initialValue = { ...props.value };
  }
  const id = uniqueId('filter-picker-');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [propsValue, SetPropsValue] = React.useState(initialValue);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [remoteOptions, setRemoteOptions] = React.useState([]);
  const [isMount, setIsMount] = React.useState(true);
  const isSelected = selected && typeof selected !== 'undefined' && !isEmpty(selected);
  const hasRemoteMethod = typeof remoteMethod !== 'undefined' && typeof remoteMethod === 'function';
  const { palette } = useTheme();

  const onBlur = () => {
    onChange();
    handleClose();
    onBlurChange();
  };

  const handleClick = (event, isClear) => {
    if (isClear && withClearButton) {
      event.stopPropagation();
      onBlur();
      onClear?.();
      handleClose();
      return;
    }
    if (isSelected || cancellable) {
      setAnchorEl(event.currentTarget);
      if (hasRemoteMethod) {
        fetchRemoteData('');
      }
    } else {
      onBlur();
      onClear?.();
      handleClose();
    }
  };

  React.useEffect(() => {
    if (isMount) return setIsMount(false);
    // fetchRemoteData(input);
  }, [input]);

  const fetchRemoteData = async (val) => {
    setRemoteOptions([]);
    setLoading(true);
    const data = await getRemoteData(val);
    setRemoteOptions(data);
    setLoading(false);
  };

  const getRemoteData = async (val) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await remoteMethod(val);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setInput('');
    setRemoteOptions([]);
  };

  const onSelect = (val) => {
    if (!multiple || groupBy == '') {
      SetPropsValue(val);
      onChange(val);
      handleClose();
    } else if (multiple) {
      SetPropsValue((prevState) => {
        if (typeof val === 'object') {
          const isExistIndex = prevState?.findIndex(({ id }) => id === val?.id);
          if (isExistIndex >= 0) {
            prevState.splice(isExistIndex, 1);
            return [...prevState];
          } else {
            return [...prevState, val];
          }
        } else {
          return [...prevState, val];
        }
      });
    }
  };

  const onClearInput = () => {
    setInput('');
    fetchRemoteData('');
  };

  const allOptions = useMemo(() => {
    return (
      [...options, ...remoteOptions].sort((a, b) => {
        const isCheckedA =
          propsValue && propsValue.length
            ? propsValue.some((item) => item[optValue] === a[optValue])
            : false;
        const isCheckedB =
          propsValue && propsValue.length
            ? propsValue.some((item) => item[optValue] === b[optValue])
            : false;
        if (isCheckedA === isCheckedB) {
          return 0;
        }
        return isCheckedA ? -1 : 1;
      }) || []
    );
  }, [options, remoteOptions, propsValue]);

  const groups = useMemo(() => {
    let grouped = {};
    const optionsAll = allOptions;
    if (groupBy && groupBy !== '') {
      if (optionsAll.length) {
        for (let i = 0; i < optionsAll.length; i++) {
          const option = optionsAll[i];
          let teamId = option.teamId;
          if (teamId == '') teamId = 'unassigned';
          if (teamId && !grouped[teamId]) {
            grouped[teamId] = {
              team: option.team.filter((team) => team.id === teamId)[0],
              users: [],
            };
          }
          grouped[teamId].users.push(option);
        }
      }
    }
    return grouped;
  }, [options, remoteOptions, groupBy]);

  const groupByCount = useMemo(() => {
    if (!groupBy || groupBy == '') return '';
    const groupCount = (propsValue[groupBy] && propsValue[groupBy].length) || 0;
    const usersLength = (propsValue?.users && propsValue.users.length) || 0;
    const total = groupCount + usersLength;
    return total > 0 ? ` +(${total})` : '';
  }, [groupBy, propsValue]);

  const renderButton = () => {
    return (
      <Button
        aria-controls={id}
        variant="contained"
        disableElevation={true}
        onClick={handleClick}
        startIcon={icon ? icon : null}
        {...(!custom ? { color: 'secondary' } : {})}
        className={(isSelected && (!groupBy || groupByCount)) || !custom ? '' : 'text-muted'}
        endIcon={showEndIcon ? <ArrowDropDownIcon /> : null}
        {...props}
        size="small"
        // color={isSelected ? 'secondary' : 'inherit'}
        sx={
          custom
            ? {
                textTransform: 'none',
                fontWeight: 400,
                padding: '6px 8px',
                color:
                  isSelected && (!groupBy || groupByCount)
                    ? palette.type === 'dark'
                      ? 'rgba(0, 0, 0, 0.87)'
                      : 'rgba(255, 255, 255, 0.87)'
                    : props?.disabled
                    ? palette.text.primary
                    : palette.text.secondary,
                backgroundColor:
                  isSelected && (!groupBy || groupByCount)
                    ? palette.secondary.main
                    : palette.background.bg1,
              }
            : {
                padding: '3px 9px',
                '& p': {
                  fontWeight: 500,
                  fontSize: '0.8125rem',
                  lineHeight: 1.75,
                },
                '& .MuiButton-endIcon': {
                  marginLeft: '2px',
                },
              }
        }
      >
        <Typography noWrap sx={{ maxWidth: '144px' }} variant="body2">
          {isSelected ? (selected[optLabel] ? selected[optLabel] : label) : title}
          {multiple && propsValue.length ? ` (+${propsValue.length})` : ''}
          {groupByCount}
        </Typography>
      </Button>
    );
  };

  return (
    <Box ml={ml} mr={mr} display="flex" index={index} sx={sx} className={`${className}`}>
      {props?.tip ? (
        <Tooltip title={props?.tip || undefined}>
          <div>{renderButton()}</div>
        </Tooltip>
      ) : (
        renderButton()
      )}

      <Menu
        id={id}
        anchorEl={anchorEl}
        keepMounted
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={Boolean(anchorEl)}
        onClose={() => {
          handleClose();
          onBlur();
        }}
        sx={{
          '& .MuiPaper-root': {
            width: '375px',
            maxWidth: '375px',
            maxHeight: '500px',
            overflow: 'hidden',
          },
        }}
      >
        {!customHeader && multiple && apply ? (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              position: 'sticky',
              zIndex: 10,
            }}
            tabIndex={null}
            autoFocus={false}
          >
            <Button onClick={() => onChange(propsValue)} color="secondary">
              Apply
            </Button>
            {withClearButton ? (
              <Button onClick={() => onClear()} sx={{ marginRight: '3px' }} color="secondary">
                Clear All
              </Button>
            ) : (
              <Button iconButton onClick={() => handleClose()}>
                <CloseIcon />
              </Button>
            )}
          </Stack>
        ) : customHeader ? (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              position: 'sticky',
              zIndex: 10,
              padding: '6px 12px',
            }}
          >
            {/* <Typography>Filter by</Typography> */}
            <Button onClick={() => onChange(propsValue)} color="secondary">
              Apply
            </Button>
            <Button onClick={() => onClear()} color="secondary">
              Clear All
            </Button>
          </Stack>
        ) : null}
        {customRenderMenu === false ? (
          <div key={`menu-${id}`}>
            {hasRemoteMethod && searchable && (
              <Box pl={2} pr={2}>
                <Form
                  initialValues={{
                    [`menu-${id}-input`]: '',
                  }}
                >
                  <Form.Field.InputDebounced
                    name={`menu-${id}-input`}
                    placeholder="Search..."
                    variant="outlined"
                    size="small"
                    autoFocus
                    onChange={(value) => {
                      setInput(value);
                      fetchRemoteData(value);
                    }}
                    // notched={false}
                    fullWidth
                    value={input}
                    InputProps={{
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : input && input !== '' ? (
                            <ButtonBase iconButton={true} onClick={onClearInput}>
                              <CloseIcon sx={{ fill: 'rgba(0,0,0,0.6)' }} />
                            </ButtonBase>
                          ) : (
                            <SearchIcon sx={{ fill: 'rgba(0,0,0,0.6)' }} />
                          )}
                        </>
                      ),
                    }}
                  />
                </Form>
              </Box>
            )}
            {loading ? (
              <MenuItem>
                <Box>
                  <span>Loading...</span>
                </Box>
              </MenuItem>
            ) : (
              <div>
                {groupBy && groupBy !== '' ? (
                  <>
                    {Object.keys(groups).map((key, index) => {
                      const group = groups[key];
                      const isUnassigned = key === 'unassigned';
                      const label = key !== 'unassigned' ? group.team.name : 'Unassigned';
                      const checked = !!propsValue?.users?.length
                        ? !group.users.find(
                            (item) => !propsValue.users?.find((ele) => item.id === ele.id),
                          )
                        : false;
                      const indeterminate =
                        !checked &&
                        !!group?.users?.find((item) =>
                          propsValue?.users?.find((ele) => item.id === ele.id),
                        );

                      return (
                        <React.Fragment key={`${group.id}-group-${index}`}>
                          <MenuItem
                            key={`${group.id}-group-${index}`}
                            onClick={() => {
                              const propsValueUpdatedData = {
                                ...propsValue,
                                users: checked
                                  ? propsValue?.users?.filter(
                                      (item) => !group?.users?.find((ele) => ele?.id === item?.id),
                                    )
                                  : [
                                      ...propsValue?.users,
                                      ...group?.users?.filter(
                                        (item) =>
                                          !propsValue?.users?.find((ele) => ele?.id === item?.id),
                                      ),
                                    ],
                              };
                              onSelect(propsValueUpdatedData);
                            }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  color="secondary"
                                  checked={checked}
                                  indeterminate={indeterminate}
                                />
                              }
                              label={label}
                              sx={{
                                height: '24px',
                                width: 'auto',
                                color: 'rgba(0,0,0,0.8)',
                                fontSize: '14px',
                              }}
                              checked={checked}
                            />
                          </MenuItem>
                          {group?.users && group.users.length ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
                              {group.users.map((user, userIndex) => {
                                const checkedUser =
                                  propsValue && propsValue?.users && propsValue.users.length
                                    ? propsValue.users.filter((item) => item.id === user.id)
                                        .length > 0
                                    : false;

                                return (
                                  <MenuItem
                                    key={`${user.id}-option-${userIndex}`}
                                    value={user[optValue]}
                                    onClick={() =>
                                      onSelect({
                                        ...propsValue,
                                        users: [
                                          ...(propsValue &&
                                          propsValue.users &&
                                          propsValue.users.length
                                            ? checkedUser
                                              ? propsValue.users.filter(
                                                  (item) => item.id !== user.id,
                                                )
                                              : propsValue.users
                                            : []),
                                          ...(!checkedUser ? [user] : []),
                                        ],
                                      })
                                    }
                                    dense={multiple === true}
                                  >
                                    <FormGroup>
                                      <FormControlLabel
                                        control={<Checkbox color="secondary" />}
                                        label={
                                          <Typography
                                            noWrap
                                            sx={{ maxWidth: '345px', width: '100%' }}
                                          >
                                            {user[optLabel]}
                                          </Typography>
                                        }
                                        sx={{
                                          height: '24px',
                                          color: 'rgba(0,0,0,0.54)',
                                          fontSize: '14px',
                                        }}
                                        checked={checkedUser}
                                      />
                                    </FormGroup>
                                  </MenuItem>
                                );
                              })}
                            </Box>
                          ) : null}
                        </React.Fragment>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {allOptions.length > 0 ? (
                      <div style={{ maxHeight: '270px', overflowY: 'auto' }}>
                        {allOptions.map((option, index) => {
                          const checked =
                            propsValue && propsValue?.length
                              ? propsValue.filter((item) => item[optValue] === option[optValue])
                                  .length > 0
                              : false;
                          const highlightSearchText = (text) => {
                            const parts = text?.split(new RegExp(`(${input})`, 'gi'));
                            return (
                              <StyledSpan>
                                {parts?.map((part, i) =>
                                  part?.toLowerCase() === input?.toLowerCase() ? (
                                    <StyledPartsSpan key={i}>{part}</StyledPartsSpan>
                                  ) : (
                                    part
                                  ),
                                )}
                              </StyledSpan>
                            );
                          };
                          return (
                            <MenuItem
                              key={`${id}-option-${index}`}
                              value={option[optValue]}
                              onClick={() => onSelect(option)}
                              dense={multiple === true}
                            >
                              <Typography noWrap sx={{ maxWidth: '345px', width: '100%' }}>
                                {multiple === true ? (
                                  <FormGroup>
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label={highlightSearchText(option[optLabel])}
                                      checked={checked}
                                      sx={{ height: '24px' }}
                                    />
                                  </FormGroup>
                                ) : (
                                  option[optLabel]
                                )}
                              </Typography>
                            </MenuItem>
                          );
                        })}
                      </div>
                    ) : (
                      <MenuItem disabled>
                        <Typography>No options.</Typography>
                      </MenuItem>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          customRenderMenu()
        )}
        {customHeader ? (
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              position: 'sticky',
              zIndex: 10,
              padding: '6px 12px',
            }}
          >
            <Button variant="outlined" onClick={() => onChange(propsValue)} color="secondary">
              Apply
            </Button>
          </Stack>
        ) : null}
      </Menu>
    </Box>
  );
}

FilterPicker.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  icon: PropTypes.object,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  remoteMethod: PropTypes.func,
  ml: PropTypes.number,
  mr: PropTypes.number,
  optLabel: PropTypes.string,
  optValue: PropTypes.string,
  selected: PropTypes.any,
  cancellable: PropTypes.bool,
  searchable: PropTypes.bool,
  multiple: PropTypes.bool,
  customRenderMenu: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.bool]),
  groupBy: PropTypes.string,
  withClearButton: PropTypes.bool,
};

FilterPicker.defaultProps = {
  title: undefined,
  options: [],
  icon: undefined,
  onChange: () => {},
  onClear: () => {},
  ml: 0,
  mr: 0,
  optLabel: 'label',
  optValue: 'value',
  selected: {},
  cancellable: true,
  searchable: false,
  multiple: false,
  customRenderMenu: false,
  groupBy: undefined,
  withClearButton: false,
};

export default FilterPicker;
