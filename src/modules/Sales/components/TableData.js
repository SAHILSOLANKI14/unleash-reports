// TableData.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { makeStyles } from '@mui/styles';
import AppGrid from '../../../components/App/AppGrid';
import { fetchSalesRequest, fetchDetailRequest } from '../store/SalesAction';
import Breadcrumbs from 'src/components/shared/BreadCrumbs/Breadcrumb';
import TableHeader from '../components/TableHeader';
import PopupComponent from './PopupTableRow';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.secondary.dark,
    '&:hover': {
      color: theme.palette.primary.dark,
      background: 'transparent',
    },
  },
}));

const TableData = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { salesData, total, detailData } = useSelector((state) => state.salesData);

  const [pageNo, setPageNo] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(fetchSalesRequest(status, pageNo, perPage));
  }, [dispatch, status, pageNo, perPage]);

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setOpenPopup(true);
    dispatch(fetchDetailRequest(rowData.reference_no));
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const onTableChange = (event) => {
    setPageNo(event.pageNo);
    setPerPage(event.perPage);
  };

  const columns = [
    { name: 'customer', sortable: true },
    { name: 'date', sortable: true },
    { name: 'grand_total', selector: (row) => row.grand_total, sortable: true },
    { name: 'sale_status', selector: (row) => row.sale_status, sortable: true },
    { name: 'total_qty', selector: (row) => row.total_qty, sortable: true },
    { name: 'paid', selector: (row) => row.paid, sortable: true },
    {
      name: 'Order Details',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = salesData[dataIndex];
          return (
            <Button className={classes.button} onClick={() => handleRowClick(rowData)}>
              <VisibilityIcon />
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    pagination: true,
    serverSide: true,
    page: pageNo,
    selectableRows: 'multiple',
    rowsPerPage: perPage,
    count: total,
  };

  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
    dispatch(fetchSalesRequest(selectedStatus, pageNo, perPage));
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Breadcrumbs />
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right', alignItems: 'flex-end', display: 'flex',justifyContent:'flex-end',justifySelf:'end' }}>
          <TableHeader onSelect={handleStatusChange} />
        </Grid>
      </Grid>
      <AppGrid columns={columns} data={salesData} options={options} onTableChange={onTableChange} />
      <PopupComponent open={openPopup} handleClose={handleClosePopup} detailData={detailData} />
    </>
  );
};

export default TableData;
