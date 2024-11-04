import { Box, Grid, Paper, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Tabs1 from './Tabs/Tab1';
import Tab2 from './Tabs/Tab2';
import Tab4 from './Tabs/Tab4';
import Tab5 from './Tabs/Tab5';
import Tab6 from './Tabs/Tab6';
import Tab7 from './Tabs/Tab7';
import Tab8 from './Tabs/Tab8';
import Tab3 from './Tabs/Tabs3';
import Breadcrumbs from '../../../components/shared/BreadCrumbs/Breadcrumb';

function ProductForm() {
  const [activeTab, setActiveTab] = useState(1);
  const [productName, setProductName] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState({ productName: false, slug: false });
  const [innerPackCode, setInnerPackCode] = useState('');
  const [caseCode, setCaseCode] = useState('');
  const [EachCode, setEachCode] = useState('');
  const [checked, setChecked] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [supplier, setSupplier] = useState([]);
  const [isLoadingOption, setIsLoadingOption] = useState(false);
  const [formState, setFormState] = useState(() => {
    const savedData = localStorage.getItem('AddProduct-Data');
    return savedData
      ? JSON.parse(savedData)
      : {
          product_name: '',
          slug: '',
          Supplier_id: '',
          weight: '',
          barcode: '',
          brand: '',
          category_id: '',
          unit_cost: '',
          tax_method: '',
          state_tax: '',
          county_tax: '',
          city_tax: '',
          sale_quantity: '',
          shipping: '',
          unit: [
            {
              unit_id: '',
              unit_code: '',
              unit_quantity: '',
              purchase_unit_id: '',
              purchase_unit_code: '',
              purchase_unit_quantity: '',
            },
          ],
          product_detail: '',
          alert_quantity: '',
          thersold_quantity: '',
          racks: '',
          supplier: [
            {
              supplier1_id: '',
              supplier1_name: '',
              supplier1_price: '',
              supplier1_unit_id: '',
            },
            {
              supplier2_id: '',
              supplier2_name: '',
              supplier2_price: '',
              supplier2_unit_id: '',
            },
            {
              supplier3_id: '',
              supplier3_name: '',
              supplier3_price: '',
              supplier3_unit_id: '',
            },
            {
              supplier4_id: '',
              supplier4_name: '',
              supplier4_price: '',
              supplier4_unit_id: '',
            },
            {
              supplier5_id: '',
              supplier5_name: '',
              supplier5_price: '',
              supplier5_unit_id: '',
            },
          ],
        };
  });
  const tabTitles = [
    '',
    'Basic Product Details',
    'Pricing & Taxes',
    'Product Units & Code',
    'Images & Description',
    'Setup Your Delivery Location',
    'Product Suppliers Details',
    'Promotional Price Details',
    'Review your Details and Submit',
  ];
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ mt: 3, mb: 3, fontWeight: '600', color: '#273238' }}
            >
              {tabTitles[index]}
            </Typography>
            {children}
          </Box>
        )}
      </div>
    );
  }
  const updateFormState = (field, value) => {
    setFormState((prevState) => {
      const newState = { ...prevState, [field]: value };
      localStorage.setItem('AddProduct-Data', JSON.stringify(newState));
      return newState;
    });
  };
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
  };
  const handleProductNameChange = (e) => {
    const name = e.target.value;
    setProductName(name);
    updateFormState('product_name', name);
  };
  const handleslug = () => {
    if (productName) {
      const newSlug = generateSlug(productName);
      setSlug(newSlug);
      updateFormState('slug', newSlug);
    }
  };
  const handleNext = () => {
    if (!productName || !slug) {
      setError({
        productName: !productName,
        slug: !slug,
      });
      // setActiveTab(newValue);
    } else {
      console.log('Next step');
      setError({ productName: false, slug: false });
      setActiveTab((prevActiveTab) => prevActiveTab + 1);
    }
  };
  const handlePrev = () => {
    setActiveTab((prevActiveTab) => prevActiveTab - 1);
  };

  const handleChangeTab = (event, newValue) => {
    if (newValue === 1 || (productName && slug)) {
      setActiveTab(newValue);
      setError({ productName: false, slug: false });
    } else {
      setError({
        productName: !productName,
        slug: !slug,
      });
    }
  };
  const columns = [
    {
      name: 'State',
      sortable: true,
      reorder: true,
    },
    {
      name: 'Tax',
      sortable: true,
      reorder: true,
    },
    {
      name: 'Our Price',
      sortable: true,
      reorder: true,
    },
    {
      name: 'Price',
      selector: (row) => row.supplier,
      sortable: true,
      reorder: true,
      options: {
        customBodyRenderLite: (dataIndex) => {
          <TextField type="text"></TextField>;
        },
      },
    },
    {
      name: 'Margin',
      selector: (row) => row.status,
      sortable: true,
      reorder: true,
      options: {
        customBodyRenderLite: (dataIndex) => {
          <TextField type="text"></TextField>;
        },
      },
    },
  ];
  const Data = [].map((item) => ({
    State: '0',
    Tax: '0',
    'Our Price': item.id || '0',
    Price: item.customer || '0',
    Margin: item.sale_status || '0',
  }));

  const generateinnerCode = () => {
    const math = Math.floor(100000 + Math.random() * 900000);
    setInnerPackCode(math);
  };
  const generateCaseCode = () => {
    const math = Math.floor(100000 + Math.random() * 900000);
    setCaseCode(math);
  };
  const generateEachCode = () => {
    const math = Math.floor(100000 + Math.random() * 900000);
    setEachCode(math);
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // const handleAutocompleteChanges = (name) => (event, newValue) => {
  //   if (newValue) {
  //     // Update formState with new supplier ID
  //     setFormState((prevState) => ({
  //       ...prevState,
  //       [name]: newValue ? newValue.id : '',
  //       [name]: newValue ? newValue.title : '',
  //     }));
  //     if (name === 'supplier1_id') {
  //       updateFormState('supplier1_id', newValue.id);
  //       updateFormState('supplier1_name', newValue.title);
  //     }
  //     if (name === 'supplier2_id') {
  //       updateFormState('supplier2_id', newValue.id);
  //       updateFormState('supplier2_name', newValue.title);
  //     }
  //     if (name === 'supplier3_id') {
  //       updateFormState('supplier3_id', newValue.id);
  //       updateFormState('supplier3_name', newValue.title);
  //     }
  //     if (name === 'supplier4_id') {
  //       updateFormState('supplier4_id', newValue.id);
  //       updateFormState('supplier4_name', newValue.title);
  //     }
  //     if (name === 'supplier5_id') {
  //       updateFormState('supplier5_id', newValue.id);
  //       updateFormState('supplier5_name', newValue.title);
  //     }
  //   }
  // };
  const handleAutocompleteChanges = (index) => (event, newValue) => {
    if (newValue) {
      setFormState((prevState) => {
        const supplierKeyId = `supplier${index + 1}_id`;
        const supplierKeyName = `supplier${index + 1}_name`;

        const updatedSuppliers = prevState.supplier.map((supplier, i) =>
          i === index
            ? { ...supplier, [supplierKeyId]: newValue.id, [supplierKeyName]: newValue.title }
            : supplier,
        );

        const newState = { ...prevState, supplier: updatedSuppliers };

        localStorage.setItem('AddProduct-Data', JSON.stringify(newState));
        return newState;
      });
    }
  };

  React.useEffect(() => {
    localStorage.setItem('AddProduct-Data', JSON.stringify(formState));
  }, []);
  return (
    <>
      <Breadcrumbs/>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <Paper sx={{ height: '86vh' }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={activeTab}
              onChange={handleChangeTab}
              aria-label="Sidebar Tabs"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Stack sx={{ marginTop: '40px' }}></Stack>
              <Tab
                label={
                  <Box
                    sx={{
                      textAlign: 'left',
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: '600', color: '#273238' }}>
                      Basic Product Details
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Name, Type, Barcode & Category
                    </Typography>
                  </Box>
                }
                sx={{
                  alignItems: 'flex-start',
                  marginLeft: '30px',
                  backgroundColor: activeTab === 1 ? '#f9f9f9' : 'inherit',
                  borderRight: activeTab === 1 ? '2px solid #2277f5' : '',
                }}
              />
              <Tab
                label={
                  <Box
                    sx={{
                      textAlign: 'left',
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: '600', color: '#273238' }}>
                      Product Pricing & Tax
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Cost, Tax, Margin & Price
                    </Typography>
                  </Box>
                }
                sx={{
                  alignItems: 'flex-start',
                  marginLeft: '30px',
                  backgroundColor: activeTab === 2 ? '#f9f9f9' : 'inherit',
                  borderRight: activeTab === 2 ? '2px solid #2277f5' : '',
                }}
              />
              <Tab
                label={
                  <Box
                    sx={{
                      textAlign: 'left',
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: '600', color: '#273238' }}>
                      Product Units & Code
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Sale & Purchase Unit, Relations
                    </Typography>
                  </Box>
                }
                sx={{
                  alignItems: 'flex-start',
                  marginLeft: '30px',
                  backgroundColor: activeTab === 3 ? '#f9f9f9' : 'inherit',
                  borderRight: activeTab === 3 ? '2px solid #2277f5' : '',
                }}
              />
              <Tab
                label={
                  <Box
                    sx={{
                      textAlign: 'left',
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: '600', color: '#273238' }}>
                      Product Images & Description
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Images & Short/Long Descriptions
                    </Typography>
                  </Box>
                }
                sx={{
                  alignItems: 'flex-start',
                  marginLeft: '30px',
                  backgroundColor: activeTab === 4 ? '#f9f9f9' : 'inherit',
                  borderRight: activeTab === 4 ? '2px solid #2277f5' : '',
                }}
              />
              <Tab
                label={
                  <Box
                    sx={{
                      textAlign: 'left',
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: '600', color: '#273238' }}>
                      Product Quantity & Location
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Alert Qty., Warehouse Stock & Location
                    </Typography>
                  </Box>
                }
                sx={{
                  alignItems: 'flex-start',
                  marginLeft: '30px',
                  backgroundColor: activeTab === 5 ? '#f9f9f9' : 'inherit',
                  borderRight: activeTab === 5 ? '2px solid #2277f5' : '',
                }}
              />
              <Tab
                label={
                  <Box
                    sx={{
                      textAlign: 'left',
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: '600', color: '#273238' }}>
                      Product Suppliers
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Suppliers' Price, Unit & Cost
                    </Typography>
                  </Box>
                }
                sx={{
                  alignItems: 'flex-start',
                  marginLeft: '30px',
                  backgroundColor: activeTab === 6 ? '#f9f9f9' : 'inherit',
                  borderRight: activeTab === 6 ? '2px solid #2277f5' : '',
                }}
              />
              <Tab
                label={
                  <Box
                    sx={{
                      textAlign: 'left',
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: '600', color: '#273238' }}>
                      Promotions
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Selling Unit & Promotion Code
                    </Typography>
                  </Box>
                }
                sx={{
                  alignItems: 'flex-start',
                  marginLeft: '30px',
                  backgroundColor: activeTab === 7 ? '#f9f9f9' : 'inherit',
                  borderRight: activeTab === 7 ? '2px solid #2277f5' : '',
                }}
              />
              <Tab
                label={
                  <Box
                    sx={{
                      textAlign: 'left',
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: '600', color: '#273238' }}>
                      Additional Settings
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Product Status & Custom Fields
                    </Typography>
                  </Box>
                }
                sx={{
                  alignItems: 'flex-start',
                  marginLeft: '30px',
                  backgroundColor: activeTab === 8 ? '#f9f9f9' : 'inherit',
                  borderRight: activeTab === 8 ? '2px solid #2277f5' : '',
                }}
              />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper sx={{ height: '86vh' }}>
            <TabPanel value={activeTab} index={1}>
              <Tabs1
                handleProductNameChange={handleProductNameChange}
                handleslug={handleslug}
                productName={productName}
                error={error}
                handleNext={handleNext}
                slug={slug}
              />
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <Tab2 handlePrev={handlePrev} handleNext={handleNext} columns={columns} Data={Data} />
            </TabPanel>

            <TabPanel value={activeTab} index={3}>
              <Tab3
                generateinnerCode={generateinnerCode}
                generateCaseCode={generateCaseCode}
                generateEachCode={generateEachCode}
                handlePrev={handlePrev}
                handleNext={handleNext}
                EachCode={EachCode}
                caseCode={caseCode}
                innerPackCode={innerPackCode}
              />
            </TabPanel>
            <TabPanel value={activeTab} index={4}>
              <Tab4 handlePrev={handlePrev} handleNext={handleNext} />
            </TabPanel>
            <TabPanel value={activeTab} index={5}>
              <Tab5
                handlePrev={handlePrev}
                handleNext={handleNext}
                checked={checked}
                handleChange={handleChange}
              />
            </TabPanel>
            <TabPanel value={activeTab} index={6}>
              <Tab6
                handlePrev={handlePrev}
                handleNext={handleNext}
                formState={formState}
                handleAutocompleteChanges={handleAutocompleteChanges}
              />
            </TabPanel>
            <TabPanel value={activeTab} index={7}>
              <Tab7 handlePrev={handlePrev} handleNext={handleNext} />
            </TabPanel>
            <TabPanel value={activeTab} index={8}>
              <Tab8 handlePrev={handlePrev} handleNext={handleNext} />
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default ProductForm;
