import React, { useEffect, useState } from 'react';
import { TableFooter, TableRow, TableCell } from '@mui/material';
import MuiTablePagination from '@mui/material/TablePagination';
import { makeStyles } from '@mui/styles';
import { fetchSalesData } from 'src/modules/Sales/api/SalesApi';
import { setSalesData } from 'src/modules/Sales/store/SalesAction';
import Paging from '../../App/Paging';
import { useSelector, useDispatch } from 'react-redux';
// style for the footer
const defaultFooterStyles = makeStyles(() => ({
  footerStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0px !important',
    borderBottom: 'none',
  },
  paginationClasses: {
    '& [class*="MuiToolbar-root"]': {
      paddingBottom: '0px !important',
    },
  },
}));

// GridFooter to add custom css and to add custom and key feature
const GridFooter = (props) => {
  const { rowsPerPage, changeRowsPerPage, changePage, count, textLabels, page, pagingType } = props;
  const classes = defaultFooterStyles();

  // row change event
  const handleRowChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    changeRowsPerPage(newRowsPerPage);
  };
  // page change event
  const handlePageChange = (_, page) => {
    props.changePage(page);
    // console.log('Page', page);
  };
  // pageLink change event
  const handlePageLink = (page) => {
    props.changePage(page);
  };

  // const { count, textLabels, page, pagingType } = props;
  return (
    <TableFooter>
      <TableRow sx={{ padding: 0 }}>
        {pagingType === 'links' ? (
          <Paging count={count} perPage={rowsPerPage} page={page} onChange={handlePageLink} />
        ) : (
          <TableCell className={classes.footerStyle}>
            <MuiTablePagination
              component="div"
              count={count}
              rowsPerPage={rowsPerPage || 10}
              page={page}
              className={classes.paginationClasses}
              labelRowsPerPage={textLabels.rowsPerPage}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${textLabels.displayRows} ${count}`
              }
              backIconButtonProps={{
                'aria-label': textLabels.previous,
              }}
              nextIconButtonProps={{
                'aria-label': textLabels.next,
              }}
              rowsPerPageOptions={[10, 25, 50, 100]}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowChange}
            />
          </TableCell>
        )}
      </TableRow>
    </TableFooter>
  );
};

export default GridFooter;
