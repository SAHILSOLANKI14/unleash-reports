import { useEffect, useState } from 'react';
import React from 'react';
import { fetchpurchaseDetailData } from '../api/LatestPurchaseApi';
import { fetchDetailData } from '../api/purchaseDetail';
import AppGrid from 'src/components/App/AppGrid';
import PopupAction from 'src/modules/Sales/components/PopupAction';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Typography, Button, Grid, Stack } from '@mui/material';
import PopupComponent from '../Component/PurchaseDialog';
import axios from 'axios';
import { fetchpurchasedataFailure, setpurchasedata } from '../Store/PurchaseAction';
import { useDispatch } from 'react-redux';
import Breadcrumbs from 'src/components/shared/BreadCrumbs/Breadcrumb';
const ListPurchase = () => {
  const dispatch = useDispatch();
  const [purchaseData, setPurchaseData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRowData, setSelectedRowData] = useState(null); // Initialize as null
  const [openPopup, setOpenPopup] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [addressData, setAddressData] = useState({});

  const fetchPurchase = async (pageNo, rowsPerPage) => {
    const data = {
      start: pageNo * rowsPerPage + 1,
      limit: rowsPerPage,
    };

    try {
      const res = await fetchpurchaseDetailData(data);
      setPurchaseData(res.data);
      setTotal(res.total);
      dispatch(setpurchasedata(res));
    } catch (error) {
      console.error('Error fetching purchase data:', error);
      setPurchaseData([]);
      setTotal(0);
      dispatch(fetchpurchasedataFailure(error));
    }
  };

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
      const detaildata = detailresponse?.data?.[0] || '';
      const supplier_id = detaildata.supplier_id;

      const responses = await axios.post(`https://dev.unleashpos.com/api/v1/companies`, {
        'api-key': 'kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos',
        company_id: supplier_id,
      });

      const companyAddressData = responses?.data?.data?.[0] || {};
      setAddressData(companyAddressData);
    } catch (error) {
      console.error('Error fetching additional data:', error);
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  useEffect(() => {
    fetchPurchase(pageNo, rowsPerPage);
  }, [pageNo, rowsPerPage]);

  const columns = [
    {
      name: 'Date',
      sortable: true,
      reorder: true,
    },
    {
      name: 'Invoice No',
      selector: (row) => row.reference_no,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Supplier',
      selector: (row) => row.Supplier,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Purchase Status',
      selector: (row) => row['Purchase Status'],
      sortable: true,
      reorder: true,
    },
    {
      name: 'Grand Total',
      selector: (row) => row['Grand Total'],
      sortable: true,
      reorder: true,
    },
    {
      name: 'Paid',
      selector: (row) => row.Paid,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Balance',
      selector: (row) => row.Balance,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Payment Status',
      selector: (row) => row['Payment Status'],
      sortable: true,
      reorder: true,
    },
    {
      name: 'Order Details',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = purchaseData[dataIndex];
          return (
            <Button onClick={() => handleRowClick(rowData)}>
              <VisibilityIcon />
            </Button>
          );
        },
      },
    },
    {
      name: 'Action',
      options: {
        customBodyRenderLite: () => <PopupAction />,
      },
    },
  ];

  const Data = purchaseData.map((item) => ({
    Date: item.date,
    invoiceNo: item.reference_no,
    Supplier: item.supplier,
    'Purchase Status': item.status,
    'Grand Total': item.grand_total,
    Paid: item.paid,
    Balance: item.balance || '',
    'Payment Status': item.payment_status,
  }));

  const options = {
    pagination: true,
    serverSide: true,
    page: pageNo,
    selectableRows: 'multiple',
    rowsPerPage: rowsPerPage,
    count: total,
  };

  const onTableChange = (event) => {
    console.log('Table change event:', event);
    setPageNo(event.pageNo);
    setRowsPerPage(event.perPage);
    fetchPurchase(event.pageNo, event.perPage);
  };

  return (
    <>
      {/* <TableHeader onSelect={handleStatusChange} /> */}
      <Breadcrumbs />
      <AppGrid columns={columns} data={Data} options={options} onTableChange={onTableChange} />
      <PopupComponent
        open={openPopup}
        handleClose={handleClosePopup}
        detailData={detailData}
        address={addressData}
      />
    </>
  );
};

export default ListPurchase;
