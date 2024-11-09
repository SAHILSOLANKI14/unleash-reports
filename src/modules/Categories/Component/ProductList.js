import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AppGrid from '../../../components/App/AppGrid';
import { Typography, Button, Grid, Stack } from '@mui/material';
import { fetchproductData } from '../API/ProductsApi';
import { fetchproductDetailData } from '../API/ProductDetail';
import { makeStyles } from '@mui/styles';
import TableHeader from '../../Sales/components/TableHeader';
import { fetchproductsDataFailure, setproductsData } from '../Store/productsAction';
import SettingpopupAction from './PopUpAction';
import Productdetailpopup from './Productdetailspopup';
import logo from '../images/no_image.png';
import logo2 from '../images/prod_default.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ProductSearch from './ProductSearch';
import { initLightboxJS } from 'lightbox.js-react';
import { SlideshowLightbox } from 'lightbox.js-react';
import Breadcrumbs from 'src/components/shared/BreadCrumbs/Breadcrumb';
import 'lightbox.js-react/dist/index.css';
const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.secondary.dark,
    '&:hover': {
      color: theme.palette.primary.dark,
      background: 'transparent',
    },
  },
}));
const ProductList = () => {
  const classes = useStyles();
  const [products, setProductsState] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchparam, setSearchparam] = useState('');
  const dispatch = useDispatch();
  const [productdetail, setProductdetail] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const fetchProduct = async (pageNo, perPage, search = '', DATA) => {
    // console.log('Fetching products for:', { pageNo, perPage, search });
    try {
      const start = pageNo * perPage + 1;
      const limit = perPage;
      const DATA = {
        start: start,
        limit: limit,
        name: search,
      };
      const response = await fetchproductData(DATA);
      if (response.status === true) {
        const fetchedData = response.data;
        setProductsState(fetchedData);
        setTotal(response.total);
        dispatch(setproductsData(fetchedData));
      } else {
        setProductsState([]);
        setTotal(0);
        console.error('Error fetching sales data:');
      }
    } catch (error) {
      console.error('Error fetching products data:', error);
      dispatch(fetchproductsDataFailure(error));
    }
  };

  useEffect(() => {
    fetchProduct(pageNo, perPage, searchparam);
  }, [pageNo, perPage, searchparam]);

  // Define columns for AppGrid
  const columns = [
    {
      name: 'Image',
      sortable: true,
      reorder: true,
      options: {
        customBodyRender: (value) => (
          <SlideshowLightbox className="container grid grid-cols-3 gap-2 mx-auto">
            <img
              className="w-150px"
              src={value || logo}
              alt="Product"
              style={{ width: 40, height: 40, objectFit: 'cover' }}
              //      onError={(e) => {
              //     e.target.src = logo;
              //  }}
            />
          </SlideshowLightbox>
        ),
      },
    },
    {
      name: 'Name',
      sortable: true,
      reorder: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Cost',
      selector: (row) => row.cost,
      sortable: true,
      reorder: true,
    },
    {
      name: 'In_Stock',
      selector: (row) => row.in_stock,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Alert_Quantity',
      selector: (row) => row.alert_quantity,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Updated_At',
      selector: (row) => row.updated_at,
      sortable: true,
      reorder: true,
    },
    {
      name: 'product Details',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = products[dataIndex];
          // console.log('rowData2', rowData);
          return (
            <Button className={classes.button} onClick={() => handleRowClick(rowData)}>
              <VisibilityIcon />
            </Button>
          );
        },
      },
    },
    {
      name: 'Actions',
      options: {
        customBodyRenderLite: () => <SettingpopupAction />,
      },
    },
  ];

  // Map products data for AppGrid
  const data = products.map((product) => ({
    image: product.image,
    Name: product.name,
    Price: product.price,
    Cost: product.cost,
    In_Stock: product.quantity,
    Alert_Quantity: product.alert_quantity,
    Updated_At: product.updated_at,
  }));

  // Define options for AppGrid
  const options = {
    pagination: true,
    serverSide: true,
    page: pageNo,
    selectableRows: true,
    rowsPerPage: perPage,
    count: total,
  };

  // Handle table change
  const onTableChange = ({ pageNo, perPage }) => {
    fetchProduct(pageNo, perPage, searchparam);
    setPageNo(pageNo);
    setPerPage(perPage);
  };

  // Handle search
  const handleSearch = (search) => {
    fetchProduct(pageNo, perPage, search);
    setSearchparam(search); // Update search param for next fetch
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  const handleRowClick = async (rowData) => {
    setSelectedRowData(rowData);

    const units = rowData?.unit || [];
    const productIds = units.map((detail) => detail.product_id);

    // console.log('Product IDs:', productIds);

    try {
      // Fetch product details for each product_id
      const fetchDetailsPromises = productIds.map((id) => fetchproductDetailData(id));
      const detailsResponses = await Promise.all(fetchDetailsPromises);
      const combinedDetails = detailsResponses.reduce((acc, response) => {
        if (response && response) {
          acc.push(response);
        }
        return acc;
      }, []);

      setProductdetail(combinedDetails); // Set combined details
      setOpenPopup(true);
    } catch (error) {
      console.error('Error fetching additional data:', error);
    }
  };

  return (
    <>
      {/* <TableHeader onSearch={handleSearch} /> */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Breadcrumbs />
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <ProductSearch onSearch={handleSearch} />
        </Grid>
      </Grid>
      <AppGrid columns={columns} data={data} options={options} onTableChange={onTableChange} />
      <Productdetailpopup
        open={openPopup}
        handleClose={handleClosePopup}
        detailData={productdetail}
      />
    </>
  );
};

export default ProductList;
