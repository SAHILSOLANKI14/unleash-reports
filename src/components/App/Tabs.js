import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import * as React from 'react';
import AppGrid from './AppGrid';
import { fetchlatestsalesData } from 'src/modules/Sales/api/LatestSalesapi';
import { fetchpurchaseDetailData } from 'src/modules/Purchase/api/LatestPurchaseApi';
import { format } from 'date-fns';
import { Height } from '@mui/icons-material';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const columns = [
  {
    name: 'No',
    sortable: true,
    reorder: true,
  },
  {
    name: 'DATE',
    sortable: true,
    reorder: true,
  },
  {
    name: 'INVOICE_NO',
    sortable: true,
    reorder: true,
  },
  {
    name: 'CUSTOMER',
    selector: (row) => row.customer,
    sortable: true,
    reorder: true,
  },
  {
    name: 'SALE_STATUS',
    selector: (row) => row.sale_status,
    sortable: true,
    reorder: true,
  },
  {
    name: 'TOTAL',
    selector: (row) => row.total,
    sortable: true,
    reorder: true,
  },
];

const columns1 = [
  {
    name: 'No',
    sortable: true,
    reorder: true,
  },
  {
    name: 'DATE',
    sortable: true,
    reorder: true,
  },
  {
    name: 'INVOICE_NO',
    sortable: true,
    reorder: true,
  },
  {
    name: 'SUPPLIER',
    selector: (row) => row.supplier,
    sortable: true,
    reorder: true,
  },
  {
    name: 'STATUS',
    selector: (row) => row.status,
    sortable: true,
    reorder: true,
  },
  {
    name: 'AMOUNT',
    selector: (row) => row.amount,
    sortable: true,
    reorder: true,
  },
];

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [salesData, setSalesData] = React.useState([]);
  const [purchaseData, setPurchaseData] = React.useState([]);

  const fetchData = async (data) => {
    try {
      data = {
        order_by: 'date,desc',
        start: 1,
        limit: 8,
      };
      const Salesdata = await fetchlatestsalesData(data);
      // console.log('API Response:', Salesdata.data);
      setSalesData(Salesdata.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };
  const fetchProductData = async (data) => {
    try {
      data = {
        order_by: 'date,desc',
        start: 1,
        limit: 8,
      };
      const purchasedata = await fetchpurchaseDetailData(data);
      // console.log('API Response purchase:', purchasedata.data);
      setPurchaseData(purchasedata.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };
  const formatData = (data) => {
    return data.map((item, index) => ({
      No: index + 1,
      DATE: format(new Date(item.date), 'MM/dd/yyyy HH:mm'),
      INVOICE_NO: item.id || '',
      CUSTOMER: item.customer || '',
      SALE_STATUS: item.sale_status || '',
      STATUS: item.status || '',
      TOTAL: item.total || '',
      SUPPLIER: item.supplier || '',
      AMOUNT: item.total || '',
    }));
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onClick = () => {
    fetchData();
  };
  const onhandleClick = () => {
    fetchProductData();
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box>
          <Stack
            direction={'row'}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              textAlign: 'center',
              alignItems: 'center',
              marginBottom: '-15px',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: '500', fontSize: '18px', color: '#181C32' }}>
              Latest Sales/Purchases
            </Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                '& .MuiTabs-flexContainer': {
                  margin: '5px',
                },
                '& .MuiTab-root': {
                  minHeight: '30px',
                  padding: '5 16px',
                  fontSize: '14px',
                },
              }}
            >
              <Tab
                label="Sales"
                {...a11yProps(0)}
                onClick={onClick}
                sx={{
                  backgroundColor: value === 0 ? '#1a79ff' : 'transparent',
                  color: value === 0 ? '#ffffff' : '#000000',
                  borderRadius: '5px',
                  minHeight: '30px',
                  fontSize: '14px',
                  '&.Mui-selected': {
                    backgroundColor: '#1a79ff',
                    color: '#ffffff',
                  },
                }}
              />
              <Tab
                label="Purchase"
                {...a11yProps(1)}
                onClick={onhandleClick}
                sx={{
                  backgroundColor: value === 1 ? '#1a79ff' : 'transparent',
                  color: value === 1 ? '#ffffff' : '#000000',
                  borderRadius: '5px',
                  minHeight: '30px',
                  fontSize: '14px',
                  '&.Mui-selected': {
                    backgroundColor: '#1a79ff',
                    color: '#ffffff',
                  },
                }}
              />
            </Tabs>
          </Stack>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AppGrid
            columns={columns}
            data={formatData(salesData)}
            options={{
              selectableRows: false,
              selectableRowsHideCheckboxes: true,
            }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AppGrid
            columns={columns1}
            data={formatData(purchaseData)}
            options={{
              selectableRows: false,
              selectableRowsHideCheckboxes: true,
            }}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
}
