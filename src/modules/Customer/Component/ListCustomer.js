// src/components/Listsupplier.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppGrid from 'src/components/App/AppGrid';
import {
  fetchcustomerFailure,
  fetchcustomerSuccess,
  fetchcustomerRequest,
} from '../Store/CustomerAction';
import { fetchCustomerData } from '../api/CustomerApi';
import SupplierSearch from './supplierSearch';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Typography, Button, Grid, Stack } from '@mui/material';
import CustomerDialog from './CustomerDialog';
import { fetchCustomerDetailData } from '../api/CustomerDetail';
import Breadcrumbs from 'src/components/shared/BreadCrumbs/Breadcrumb';

const ListCustomer = () => {
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchparam, setSearchparam] = useState('');
  const [total, setTotal] = useState('');
  const [detailData, setDetailData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null); // Initialize as null

  const fetchCustomer = async (pageNo, perPage, search = '') => {
    console.log('Fetching customer for:', { pageNo, perPage, search });
    try {
      const data = {
        start: pageNo * perPage + 1,
        limit: perPage,
        search,
        data: 'customer',
      };
      const response = await fetchCustomerData(data);

      const fetchedData = response.data;
      setCustomer(fetchedData);
      setTotal(response.total);
      dispatch(fetchcustomerSuccess(fetchedData));
    } catch (error) {
      console.error('Error fetching products data:', error);
      dispatch(fetchcustomerFailure(error));
    }
  };
  const handleRowClick = async (rowData) => {
    setSelectedRowData(rowData);
    setOpenPopup(true);
    try {
      const data = {
        company_id: '844',
      };
      const detailresponse = await fetchCustomerDetailData(data);
      setDetailData(detailresponse);
      console.log('fsdffs', detailData);
    } catch (error) {
      console.error('Error fetching additional data:', error);
    }
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  const columns = [
    {
      name: 'Company',
      selector: (row) => row.Company,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Name',
      selector: (row) => row.Name,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Email_Address',
      selector: (row) => row.Email_Address,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Phone',
      selector: (row) => row.Phone || 'N/A',
      sortable: true,
      reorder: true,
    },
    {
      name: 'City',
      selector: (row) => row.City || 'N/A',
      sortable: true,
      reorder: true,
    },
    {
      name: 'County',
      selector: (row) => row.County || 'N/A',
      sortable: true,
      reorder: true,
    },
    {
      name: 'Order Details',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = customer[dataIndex];
          return (
            <Button onClick={() => handleRowClick(rowData)}>
              <VisibilityIcon />
            </Button>
          );
        },
      },
    },
  ];
  useEffect(() => {
    fetchCustomer(pageNo, perPage, searchparam);
  }, [pageNo, perPage, searchparam]);

  const onTableChange = ({ pageNo, perPage }) => {
    fetchCustomer(pageNo, perPage, searchparam);
    setPageNo(pageNo);
    setPerPage(perPage);
  };
  const handleSearch = (search) => {
    fetchCustomer(pageNo, perPage, search);
    setSearchparam(search);
  };
  // Prepare data for the grid
  const Data = customer.map((sale) => ({
    id: sale.id,
    Company: sale.company,
    Name: sale.person,
    Email_Address: sale.email,
    Phone: sale.phone || 'N/A',
    City: sale.city || 'N/A',
    County: sale.county || 'N/A',
  }));
  const options = {
    pagination: true,
    serverSide: true,
    page: pageNo,
    rowsPerPage: perPage,
    count: total,
    selectableRows: 'multiple',
    selectableRowsHeader: true,
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Breadcrumbs />
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <SupplierSearch onSearch={handleSearch} />
        </Grid>
      </Grid>
      <CustomerDialog open={openPopup} handleClose={handleClosePopup} detailData={detailData} />
      <AppGrid data={Data} columns={columns} options={options} onTableChange={onTableChange} />
    </>
  );
};

export default ListCustomer;
