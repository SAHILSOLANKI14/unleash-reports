import React, { Children, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Checkbox,
  CircularProgress,
  Typography,
  TableBody as MuiTableBody,
  Box,
  Skeleton,
  Tooltip,
} from '@mui/material';

import { useTheme } from '@mui/material';
import { createTheme, adaptV4Theme } from '@mui/material/styles';
import { ThemeProvider, StyledEngineProvider } from '@mui/system';
import MUIDataTable, { TableBody, TableBodyCell, TableBodyRow } from 'mui-datatables';

import { girdLoadingMessages } from 'src/config';
import { map, sample } from 'lodash';

import { debounceSearchRender } from './SearchInput';
import GridFooter from './GridFooter';
import GridFilter from './GridFilter';
import GridBulkActions from './GridBulkActions';
import { getOverrides } from './theme';
import { typography, palette } from 'src/config/theme';
import useMediaQuery from 'src/components/hooks/useMediaQuery';

const propTypes = {
  selectableRows: PropTypes.string,
  onFilterChange: PropTypes.func,
  appliedFilters: PropTypes.object,
  bulkActions: PropTypes.array,
  onBulkAction: PropTypes.func,
  onSort: PropTypes.func,
  onClearFilters: PropTypes.func,
  title: PropTypes.string,
  titleProps: PropTypes.any,
  pagingType: PropTypes.oneOf(['table', 'links']),
};

const defaultProps = {
  selectableRows: 'none',
  onFilterChange: () => {},
  appliedFilters: {},
  bulkActions: [],
  onBulkAction: () => {},
  onSort: () => {},
  onClearFilters: () => {},
  title: '',
  titleProps: {},
  pagingType: 'table',
};

const CustomCheckbox = ({ checked, onChange }) => (
  <Checkbox checked={checked} onChange={onChange} color="secondary" />
);

const AppGrid = ({
  columns = [],
  data = [],
  options = {},
  className = '',
  fetchData,
  hideToolBar = false,
  paperWidth = '290px',
  stickyCol = true,
  paperHeight = '236px',
  selectableRows,
  loading = false,
  skeletonLoading = false,
  filters,
  appliedFilters,
  bulkActions,
  onBulkAction,
  onFilterChange,
  onSort,
  onClearFilters,
  title,
  titleProps,
  color = undefined,
  ref = { current: null },
  ...otherProps
}) => {
  // console.log(['otherProps']);
  // console.log(otherProps);
  const theme = useTheme();
  const stickyTD = stickyCol ? 1 : 0;
  const sideBarIsOpen = useSelector((state) => state.app.sideBarIsOpen);
  const { isDesktop, isTablet, isMobile } = useMediaQuery();
  // const [Searchdata ,setSearchData] = useState([]);
  const getMuiTheme = () => {
    return createTheme(
      adaptV4Theme({
        palette: theme.palette,
        typography,
        overrides: getOverrides(
          paperWidth,
          sideBarIsOpen,
          loading ? 'auto' : paperHeight,
          stickyTD,
          stickyCol,
          hideToolBar,
          theme.palette,
          isDesktop,
          isTablet,
          isMobile,
        ),
      }),
    );
  };

  const onFilter = (filter, value) => {
    onFilterChange(filter, value);
  };

  const handleClearSort = () => {
    onSort({});
  };

  const defaultOptions = {
    selectableRows: 'multiple',
    selectableRowsHideCheckboxes: false,
    selectableRowsHeader: true,
    filterType: 'checkbox',
    responsive: 'standard',
    filter: true,
    download: false,
    print: false,
    search: false,
    pagination: true,
    viewColumns: true,
    rowsPerPage: 15,
    selectToolbarPlacement: 'none',
    fixedSelectColumn: true,
    customSearchRender: debounceSearchRender(400),
    onTableChange: (action, tableState) => {
      switch (action) {
        case 'sort':
          if (!options.serverSide) {
            return;
          }
          let sortOrder =
            Object.keys(tableState.sortOrder).length === 0 ? null : tableState.sortOrder;
          onSort(sortOrder);
          break;

        case 'changePage':
        case 'changeRowsPerPage':
        case 'search':
          // console.log('PAGING TABLE CHNAge');
          try {
            if (!options.serverSide) {
              return;
            }
            const params = {
              pageNo: tableState.page,
              perPage: tableState.rowsPerPage,
            };
            otherProps?.onTableChange(params);
          } catch (error) {
            console.log(error);
          }
          break;

        case 'viewColumnsChange':
        case 'columnOrderChange':
          const paramColumns = {
            columns: tableState.columns,
            columnsOrder: tableState.columnOrder,
          };
          otherProps?.onColumnChange && otherProps?.onColumnChange(paramColumns);
          break;
        default:
      }
    },
    draggableColumns: {
      enabled: false,
    },
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
      if (!options.pagination) {
        return <></>;
      }
      return (
        <GridFooter
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          changeRowsPerPage={changeRowsPerPage}
          changePage={changePage}
          textLabels={textLabels}
          pagingType={otherProps.pagingType}
        />
      );
    },
    customToolbar: () => {
      return (
        <GridFilter
          filters={filters}
          onChange={onFilter}
          onClearFilters={onClearFilters}
          appliedFilters={appliedFilters}
          options={options}
          handleClearSort={handleClearSort}
          title={title}
          titleProps={titleProps}
          color={color}
        />
      );
    },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
      return (
        <GridBulkActions
          selectedRows={selectedRows}
          bulkActions={bulkActions}
          onBulkAction={onBulkAction}
        />
      );
    },
  };

  const LoadingTableBody = ({ loading, options, columns, skeletonLoading, ...others }) => {
    const visibleColCnt = columns.filter((c) => c.display === 'true').length;
    const loadingMessage = useMemo(() => sample(girdLoadingMessages), [loading]);

    return loading ? (
      <MuiTableBody>
        {skeletonLoading ? (
          Children.toArray(
            map([...new Array(10)], () => {
              return (
                <TableBodyRow options={options}>
                  {Children.toArray(
                    map([...new Array(visibleColCnt)], () => {
                      return (
                        <TableBodyCell options={options} colIndex={0} rowIndex={0}>
                          <Skeleton variant="text" animation="wave" />
                        </TableBodyCell>
                      );
                    }),
                  )}
                </TableBodyRow>
              );
            }),
          )
        ) : (
          <TableBodyRow options={options}>
            <TableBodyCell
              colSpan={
                options.selectableRows !== 'none' || options.expandableRows
                  ? visibleColCnt + 1
                  : visibleColCnt
              }
              options={options}
              colIndex={0}
              rowIndex={0}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={2}
                mb={2}
                flexDirection="column"
              >
                <CircularProgress size={26} style={{ marginBottom: 10 }} color="secondary" />
                <Typography color="textSecondary">{loadingMessage}</Typography>
              </Box>
            </TableBodyCell>
          </TableBodyRow>
        )}
      </MuiTableBody>
    ) : (
      <TableBody options={options} columns={columns} {...others} />
    );
  };

  const BodyComponent = useMemo(
    () => (props) =>
      <LoadingTableBody loading={loading} skeletonLoading={skeletonLoading} {...props} />,
    [loading],
  );

  const hasFilters = (filters && filters.length > 0) || options.search === true;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          data={data}
          columns={columns}
          className={`${className}`}
          sort={true}
          options={{
            ...defaultOptions,
            ...options,
            sort: true,
            sortOrder: {
              name: options?.sortOrder?.name || 'none',
              direction: options?.sortOrder?.direction || 'none',
            },
            search: true,
            selectableRows: 'multiple',
            columnOrder: !Array(...new Set(options?.columnOrder)).length
              ? undefined
              : Array(...new Set(options?.columnOrder)),
          }}
          ref={ref}
          {...otherProps}
          components={{
            Checkbox: (props) => (
              <CustomCheckbox
                {...props}
                onChange={(event) => {
                  props.onChange(props.rowDataIndex, event.target.checked);
                }}
              />
            ),
            ...otherProps.components,
            TableBody: BodyComponent,
            ...(!hasFilters
              ? {
                  TableToolbar(props) {
                    return null;
                  },
                }
              : {}),
          }}
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

AppGrid.propTypes = propTypes;
AppGrid.defaultProps = defaultProps;

export default AppGrid;
