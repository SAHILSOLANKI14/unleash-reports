import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Button, Grid, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { makeStyles } from '@mui/styles';
import debounce from 'lodash.debounce';
import AppGrid from '../../../components/App/AppGrid';
import { fetchDetailData } from '../api/DetailsApi';
import { fetchSalesData } from '../api/SalesApi';
import FilterStatus from '../components/FilterData';
import PopupAction from '../components/PopupAction';
import TableHeader from '../components/TableHeader';
import { fetchSalesDataFailure, setSalesData } from '../store/SalesAction';
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

  // State management
  const [SALEDATA, setSaleDatas] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0); // Initialize as number
  const [selectedRowData, setSelectedRowData] = useState(null); // Initialize as null
  const [openPopup, setOpenPopup] = useState(false);
  const [status, setStatus] = useState('');
  const [detailData, setDetailData] = useState([]);

  // Fetch sales data
  const fetchSales = async (status, pageNo, perPage, data) => {
    try {
      const start = pageNo * perPage + 1;
      const limit = perPage;
      data = {
        start: start,
        limit: limit,
        status: status || '',
      };
      const response = await fetchSalesData(data);
      if (response.status === true) {
        const fetchedData = response.data;
        setSaleDatas(fetchedData);
        setTotal(response.total);
        // console.log('Dispatching sales data:', fetchedData);
        dispatch(setSalesData(fetchedData));
      } else {
        setSaleDatas([]);
        setTotal(0);
        console.error('Error fetching sales data:');
      }
    } catch (error) {
      console.error('Error fetching sales data:', error);
      dispatch(fetchSalesDataFailure(error));
    }
  };

  // Handle row click
  const handleRowClick = async (rowData) => {
    setSelectedRowData(rowData);
    setOpenPopup(true);
    try {
      const reference = rowData.reference_no;
      const data = {
        reference: reference,
        include: 'items',
      };
      const detailresponse = await fetchDetailData(data);
      setDetailData(detailresponse);
    } catch (error) {
      console.error('Error fetching additional data:', error);
    }
  };

  // Effect to fetch sales data on change
  useEffect(() => {
    fetchSales(status, pageNo, perPage);
  }, []);

  // Handle popup close
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  // Column definitions
  const columns = [
    {
      name: 'customer',
      sortable: true,
      reorder: true,
      options: {
        customBodyRender: (value) => <Typography>{value}</Typography>,
      },
    },
    {
      name: 'date',
      sortable: true,
      reorder: true,
    },
    {
      name: 'grand_total',
      selector: (row) => row.grand_total,
      sortable: true,
      reorder: true,
    },
    {
      name: 'sale_status',
      selector: (row) => row.sale_status, // Fixed typo
      sortable: true,
      reorder: true,
    },
    {
      name: 'total_qty',
      selector: (row) => row.total_qty,
      sortable: true,
      reorder: true,
    },
    {
      name: 'paid',
      selector: (row) => row.paid,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Order Details',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = SALEDATA[dataIndex];
          return (
            <Button className={classes.button} onClick={() => handleRowClick(rowData)}>
              <VisibilityIcon />
            </Button>
          );
        },
      },
    },
    {
      name: 'action',
      options: {
        customBodyRenderLite: () => <PopupAction />,
      },
    },
  ];

  // Data preparation
  const Data = SALEDATA.map((sale) => ({
    id: sale.id,
    customer: sale.customer,
    date: sale.date,
    grand_total: sale.grand_total,
    sale_status: sale.sale_status,
    total_qty: sale.total_qty,
    paid: sale.paid,
  }));

  // Table options
  const options = {
    pagination: true,
    serverSide: true,
    page: pageNo,
    selectableRows: 'multiple',
    rowsPerPage: perPage,
    count: total,
  };

  // Handle table change
  const onTableChange = ({ pageNo, perPage, status }) => {
    setPageNo(pageNo);
    setPerPage(perPage);
    fetchSales(status, pageNo, perPage);
  };

  // Handle status change
  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
    fetchSales(selectedStatus, pageNo, perPage);
  };

  return (
    <>
      <TableHeader onSelect={handleStatusChange} />
      <AppGrid columns={columns} data={Data} options={options} onTableChange={onTableChange} />
      <PopupComponent open={openPopup} handleClose={handleClosePopup} detailData={detailData} />
    </>
  );
};

export default TableData;
