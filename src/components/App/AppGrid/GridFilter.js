import React, { useState, useMemo } from 'react';
import { Box, TextField, Popper, Paper, Grow, Menu, Typography } from '@mui/material';
import { uniqueId, isEmpty } from 'lodash';
import { Dropdown, Drawer, Spacer, Button } from 'src/components/shared';
import {
  FiltersContainer,
  FiltersLeft,
  FiltersRight,
  MoreButton,
  ExtraButton,
  MenuPaper,
} from './styles';
import SearchInput from './SearchInput';
import DateRange from './Filter/DateRange';
import RelativeDateRange from './Filter/RelativeDateRange';
import CustomRelativeDateRange from './Filterbar/RelativeDateRange';
import Filter from './Filter';

function GridFilter({
  title,
  titleProps,
  options,
  appliedFilters,
  filters,
  onChange,
  handleClearSort,
  onClearFilters,
  color,
}) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const anchorRef = React.useRef(null);
  const uniqueKey = uniqueId('filters-');

  const open = Boolean(anchorEl);

  const hasSort = useMemo(() => {
    return options?.sortOrder?.name !== 'none' ? true : false;
  }, [options]);

  let primaryFilters = [];
  let drawerFilters = [];
  if (filters && filters.length) {
    primaryFilters = filters.filter((item) => item.isPrimary === true);
    drawerFilters = filters.filter((item) => !item.isPrimary);
  }

  const appliedMoreFilters = useMemo(() => {
    return drawerFilters.filter((item) => appliedFilters.hasOwnProperty(item.key));
  }, [appliedFilters, drawerFilters]);

  const handleDrawerOpen = (event) => {
    setShowDrawer(true);
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerClose = () => {
    setShowDrawer(false);
    setAnchorEl(null);
  };

  const onFilterChange = (key, value) => {
    onChange(key, value);
  };

  const onFilterClear = () => {};

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && showDrawer === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = showDrawer;
  }, [showDrawer]);

  return (
    <>
      <FiltersContainer>
        <FiltersLeft>
          {title && title !== '' && (
            <>
              <Typography {...titleProps}>{title}</Typography>
              <Spacer basis={2} />
            </>
          )}

          {options.search === true ? (
            <>
              <SearchInput
                placeholder={options.searchPlaceholder}
                searchText={options.searchText}
                onSearch={(val) => onChange('_search', val)}
              />
              <Spacer basis={2} />
            </>
          ) : null}

          {primaryFilters.map((filter, index) => {
            switch (filter.type) {
              case 'relativeDateRange':
                const value2 = appliedFilters[filter.key];
                return (
                  <Box mr={1} key={`${uniqueKey}-date-${index}`}>
                    <CustomRelativeDateRange
                      filter={filter}
                      value={value2}
                      custom={filter.custom}
                      customOptions={filter?.customOptions || {}}
                      onChange={(value) => onChange(filter.key, value)}
                      filters={appliedFilters}
                      type="button"
                      options={filter.options}
                      disabled={filter.isDisabled}
                    />
                  </Box>
                );

              case 'customRender':
                const value1 = appliedFilters[filter.key];
                return (
                  <Box mr={1} key={`${uniqueKey}-date-${index}`}>
                    <RelativeDateRange
                      filter={filter}
                      value={value1}
                      onChange={(value) => onChange(filter.key, value)}
                      filters={appliedFilters}
                      type="button"
                    />
                  </Box>
                );

              case 'dateRange':
                const value = appliedFilters[filter.key];
                return (
                  <Box mr={1} key={`${uniqueKey}-date-${index}`}>
                    <DateRange
                      filter={filter}
                      value={value}
                      onChange={(value) => onChange(filter.key, value)}
                      type="button"
                    />
                  </Box>
                );
              case 'dropdown':
                const inputProps = {};
                if (filter.remote === true) {
                  inputProps.remoteMethod = (val) => filter.remoteMethod(val);
                } else {
                  inputProps.options = filter.options;
                }
                return (
                  <Box mr={1} key={`primary-filter-item-${index}`} mt={1} mb={1}>
                    <Dropdown
                      title={filter.title}
                      selected={appliedFilters[filter.key] ? appliedFilters[filter.key] : undefined}
                      onChange={(val) => {
                        if (!val || Object.keys(val).length === 0) {
                          onChange(filter.key, undefined);
                        } else {
                          if (filter?.cancellable === true && appliedFilters[filter.key]) {
                            onChange(filter.key, undefined);
                          } else {
                            onChange(filter.key, val);
                          }
                        }
                      }}
                      onClear={() => {
                        onChange(filter.key, undefined);
                      }}
                      optLabel={filter.optLabel}
                      optValue={filter.optValue}
                      cancellable={filter.cancellable}
                      searchable={filter.searchable}
                      multiple={filter.multiple}
                      disabled={filter.isDisabled}
                      color={color}
                      {...inputProps}
                    />
                  </Box>
                );

              default:
                return <div key={`${uniqueKey}-${index}`} />;
            }
          })}
          {drawerFilters.length ? (
            <div ref={anchorRef}>
              <MoreButton count={appliedMoreFilters.length} onClick={handleDrawerOpen} />
            </div>
          ) : null}
        </FiltersLeft>
        <FiltersRight>
          {options.renderCustomFilterActions && options.renderCustomFilterActions()}
        </FiltersRight>
      </FiltersContainer>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleDrawerClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuPaper handleClear={onClearFilters}>
          {drawerFilters.map((filter, index) => {
            return (
              <Filter
                key={`${uniqueKey}-drawer-filter-${index}`}
                filter={filter}
                onChange={onFilterChange}
                onClear={onFilterClear}
                appliedFilters={appliedFilters}
                value={appliedFilters[filter.key]}
              />
            );
          })}
        </MenuPaper>
      </Menu>
    </>
  );
}

export default GridFilter;
