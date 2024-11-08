import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPurchaseDataRequest, fetchDetailDataRequest } from '../Store/PurchaseAction';
import AppGrid from 'src/components/App/AppGrid';
import PopupAction from 'src/modules/Sales/components/PopupAction';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Breadcrumbs, Box, CircularProgress, Typography } from '@mui/material';
import PopupComponent from '../Component/PurchaseDialog';

const ListPurchase = () => {
  const dispatch = useDispatch();
  const { purchaseData, total, detailData, addressData, loading } = useSelector(
    (state) => state.purchase,
  );

  const [pageNo, setPageNo] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    dispatch(fetchPurchaseDataRequest(pageNo, rowsPerPage));
  }, [dispatch, pageNo, rowsPerPage]);

  const handleRowClick = (rowData) => {
    dispatch(fetchDetailDataRequest(rowData.reference_no));
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const columns = [
    { name: 'Date', sortable: true },
    { name: 'Invoice No', selector: (row) => row.reference_no, sortable: true },
    { name: 'Supplier', selector: (row) => row.Supplier, sortable: true },
    { name: 'Purchase Status', selector: (row) => row['Purchase Status'], sortable: true },
    { name: 'Grand Total', selector: (row) => row['Grand Total'], sortable: true },
    { name: 'Paid', selector: (row) => row.Paid, sortable: true },
    { name: 'Balance', selector: (row) => row.Balance, sortable: true },
    { name: 'Payment Status', selector: (row) => row['Payment Status'], sortable: true },
    {
      name: 'Order Details',
      options: {
        customBodyRenderLite: (dataIndex) => (
          <Button onClick={() => handleRowClick(purchaseData[dataIndex])}>
            <VisibilityIcon />
          </Button>
        ),
      },
    },
    { name: 'Action', options: { customBodyRenderLite: () => <PopupAction /> } },
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
    setPageNo(event.pageNo);
    setRowsPerPage(event.perPage);
  };

  return (
    <>
      <Breadcrumbs />
      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center" height="300px">
          <CircularProgress />
          <Typography variant="h6" marginLeft={2}>
            Loading data, please wait...
          </Typography>
        </Box>
      ) : (
        <AppGrid columns={columns} data={Data} options={options} onTableChange={onTableChange} />
      )}
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
