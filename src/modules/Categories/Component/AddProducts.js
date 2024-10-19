import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Input from '@mui/material/Input';
import AppGrid from 'src/components/App/AppGrid';
import SyncIcon from '@mui/icons-material/Sync';
function ProductForm() {
  const [activeTab, setActiveTab] = useState(1);
  const [productName, setProductName] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState({ productName: false, slug: false });
  const tabTitles = [
    '',
    'Basic Product Details',
    'Pricing & Taxes',
    'Product Units & Code',
    'Setup Your Delivery Location',
    'Product Quantity & Location',
    'Product Suppliers',
    'Promotions',
    'Additional Settings',
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
  };
  const handleslug = () => {
    if (productName) {
      setSlug(generateSlug(productName));
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

  return (
    <Grid container spacing={0}>
      <Grid item xs={3}>
        <Paper sx={{ height: '80vh' }}>
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
              }}
            />
          </Tabs>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Paper sx={{ height: '80vh' }}>
          <TabPanel value={activeTab} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <InputLabel sx={{ mb: 1 }}>Product Name</InputLabel>
                <TextField
                  label=""
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  sx={{ mb: 1 }}
                  value={productName}
                  autoFocus
                  error={error.productName}
                  onChange={handleProductNameChange}
                  helperText={error.productName && 'Product Name is required'}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel sx={{ mb: 1 }}>Slug</InputLabel>
                <TextField
                  label=""
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  sx={{ mb: 1 }}
                  defaultValue={slug}
                  error={error.slug}
                  helperText={error.slug && 'Slug is required'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleslug}>
                          <AutorenewIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel sx={{ mb: 1 }}>Weight</InputLabel>
                <TextField label="(kg)" variant="outlined" fullWidth size="small" sx={{ mb: 1 }} />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel sx={{ mb: 1 }}>Barcode Symbology</InputLabel>
                <TextField label="" variant="outlined" fullWidth size="small" sx={{ mb: 1 }} />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel sx={{ mb: 1 }}>Brand</InputLabel>
                <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
                  <Select>
                    <MenuItem value="Brand 1">Brand 1</MenuItem>
                    <MenuItem value="Brand 2">Brand 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel sx={{ mb: 1 }}>Category</InputLabel>
                <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
                  <Select>
                    <MenuItem value="Category 1">Category 1</MenuItem>
                    <MenuItem value="Category 2">Category 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  fullWidth
                  //   disabled={!productName || !slug}
                  sx={{
                    color: 'white',
                    background: '#2277f5',
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  Next Step
                </Button>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <InputLabel sx={{ mb: 1 }}>Product Cost *</InputLabel>
                <TextField label="Units" variant="outlined" fullWidth size="small" />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputLabel sx={{ mb: 1 }}>Tax Method</InputLabel>
                <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
                  <Select>
                    <MenuItem value="Brand 1">Exclusive</MenuItem>
                    <MenuItem value="Brand 2">Inclusive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <InputLabel sx={{ mb: 1 }}>Taxable unit of a product</InputLabel>
                <TextField label="Code" variant="outlined" fullWidth size="small" />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputLabel sx={{ mb: 1 }}>State Tax Rate *</InputLabel>
                <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
                  <Select>
                    <MenuItem value="Brand 1">Exclusive</MenuItem>
                    <MenuItem value="Brand 2">Inclusive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <InputLabel sx={{ mb: 1 }}>County Tax Rate *</InputLabel>
                <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
                  <Select>
                    <MenuItem value="Brand 1">Exclusive</MenuItem>
                    <MenuItem value="Brand 2">Inclusive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <InputLabel sx={{ mb: 1 }}>City Tax Rate *</InputLabel>
                <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
                  <Select>
                    <MenuItem value="Brand 1">Exclusive</MenuItem>
                    <MenuItem value="Brand 2">Inclusive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: '700', color: '#273238', fontSize: '15px' }}
                >
                  * The first row corresponds to the default state for the warehouse. Please ensure
                  you add the price to the first row to set the default state price for the product.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <AppGrid
                  data={Data}
                  columns={columns}
                  options={{
                    selectableRows: false,
                    selectableRowsHideCheckboxes: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={{ mb: 1 }}>Taxable Sale Quantity</InputLabel>
                <TextField label="" variant="outlined" fullWidth size="small" defaultValue={0} />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={{ mb: 1 }}>Shipping Cost</InputLabel>
                <TextField label="" variant="outlined" fullWidth size="small" defaultValue={0} />
              </Grid>
              <Grid item xs={12} md={2} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    color: 'white',
                    background: '#2277f5',
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                  fullWidth
                  onClick={handlePrev}
                >
                  Previous
                </Button>
              </Grid>
              <Grid item xs={12} md={8} sx={{ mt: 3 }}></Grid>
              <Grid item xs={2} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  fullWidth
                  sx={{
                    color: 'white',
                    background: '#2277f5',
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  Next Step
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={activeTab} index={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputLabel sx={{ mb: 1 }}>Default Sale Unit *</InputLabel>
                <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
                  <Select>
                    <MenuItem value="Brand 1">Each (1)</MenuItem>
                    <MenuItem value="Brand 2">Inner Pack (2)</MenuItem>
                    <MenuItem value="Brand 3">Case (3)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={{ mb: 1 }}>Default Purchase Unit *</InputLabel>
                <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
                  <Select>
                    <MenuItem value="Brand 1">Each (1)</MenuItem>
                    <MenuItem value="Brand 2">Inner Pack (2)</MenuItem>
                    <MenuItem value="Brand 3">Case (3)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Unit</TableCell>
                        <TableCell>Base Unit</TableCell>
                        <TableCell>Operation QTY</TableCell>
                        <TableCell>Product Code</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Row 1 */}
                      <TableRow>
                        <TableCell>Each</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>
                          <TextField variant="outlined" size="small" defaultValue={1} fullWidth />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <TextField variant="outlined" size="small" fullWidth />
                            <IconButton>
                              <SyncIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                      {/* Row 2 */}
                      <TableRow>
                        <TableCell>Inner Pack</TableCell>
                        <TableCell>
                          <Select fullWidth size="small" defaultValue="Each">
                            <MenuItem value="Each">Each</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <TextField variant="outlined" size="small" fullWidth />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <TextField variant="outlined" size="small" fullWidth />
                            <IconButton>
                              <SyncIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                      {/* Row 3 */}
                      <TableRow>
                        <TableCell>Case</TableCell>
                        <TableCell>
                          <Select fullWidth size="small" defaultValue="Inner Pack">
                            <MenuItem value="Inner Pack">Inner Pack</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <TextField variant="outlined" size="small" fullWidth />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <TextField variant="outlined" size="small" fullWidth />
                            <IconButton>
                              <SyncIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </TabPanel>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ProductForm;
