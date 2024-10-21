import React, { useState, useRef } from 'react';
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
  Autocomplete,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Input from '@mui/material/Input';
import AppGrid from 'src/components/App/AppGrid';
import SyncIcon from '@mui/icons-material/Sync';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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
  function sleep(duration) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }
  const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
  ];
  const handleOpen = () => {
    setOpen(true);
    (async () => {
      setLoading(true);
      await sleep(1e3); // For demo purposes.
      setLoading(false);

      setOptions([...topFilms]);
    })();
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };
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
                  <Select defaultValue="Each (1)">
                    <MenuItem value="Each (1)">Each (1)</MenuItem>
                    <MenuItem value="Inner Pack (2)">Inner Pack (2)</MenuItem>
                    <MenuItem value="Case (3)">Case (3)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={{ mb: 1 }}>Default Purchase Unit *</InputLabel>
                <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
                  <Select defaultValue="Each (1)">
                    <MenuItem value="Each (1)">Each (1)</MenuItem>
                    <MenuItem value="Inner Pack (2)">Inner Pack (2)</MenuItem>
                    <MenuItem value="Case (3)">Case (3)</MenuItem>
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
                          <TextField
                            variant="outlined"
                            size="small"
                            value={1}
                            fullWidth
                            aria-readonly
                          />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <TextField variant="outlined" size="small" fullWidth value={EachCode} />
                            <IconButton onClick={() => generateEachCode()}>
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
                            <TextField
                              variant="outlined"
                              size="small"
                              fullWidth
                              value={innerPackCode}
                            />
                            <IconButton onClick={() => generateinnerCode()}>
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
                            <MenuItem value="Each">Each</MenuItem>
                            <MenuItem value="Inner Pack">Inner Pack</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <TextField variant="outlined" size="small" fullWidth />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <TextField variant="outlined" size="small" fullWidth value={caseCode} />
                            <IconButton onClick={() => generateCaseCode()}>
                              <SyncIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
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
          <TabPanel value={activeTab} index={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Stack direction={'row'}>
                  <TextField
                    label="Product Image"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={'Product Image'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                          >
                            Upload files
                            <VisuallyHiddenInput
                              type="file"
                              onChange={(event) => console.log(event.target.files)}
                              multiple
                            />
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Product Image Gallery"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={'Product Image Gallery'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload files
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                            multiple
                          />
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel>Product Details</InputLabel>
                <TextField id="outlined-multiline-static" multiline rows={7} fullWidth />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel>Product details for invoice</InputLabel>
                <TextField id="outlined-multiline-static" multiline fullWidth rows={7} />
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
          <TabPanel value={activeTab} index={5}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <InputLabel>Alert Quantity</InputLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="number"
                  // value={}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Checkbox
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel>Reorder Threshold Quantity</InputLabel>
                <TextField variant="outlined" size="small" fullWidth />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel>Maximum Quantity per Sale</InputLabel>
                <TextField variant="outlined" size="small" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel>Location (Rack)</InputLabel>
                <TextField variant="outlined" size="small" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <InputLabel>Location (Rack)</InputLabel>
                <TextField variant="outlined" size="small" fullWidth /> */}
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
          <TabPanel value={activeTab} index={6}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  open={open}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  isOptionEqualToValue={(option, value) => option.title === value.title}
                  getOptionLabel={(option) => option.title}
                  options={options}
                  loading={loading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Supplier1"
                      size="small"
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField variant="outlined" size="small" fullWidth label="Supplier1 Part No " />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField variant="outlined" size="small" fullWidth label="Supplier1 Price " />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mb: 1 }}
                  label="Supplier1 Price "
                >
                  <Select defaultValue="Each (1)">
                    <MenuItem value="Each (1)">Each (1)</MenuItem>
                    <MenuItem value="Inner Pack (2)">Inner Pack (2)</MenuItem>
                    <MenuItem value="Case (3)">Case (3)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={1}>
                <IconButton>
                  <SyncIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  open={open}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  isOptionEqualToValue={(option, value) => option.title === value.title}
                  getOptionLabel={(option) => option.title}
                  options={options}
                  loading={loading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Supplier2"
                      size="small"
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField variant="outlined" size="small" fullWidth label="Supplier2 Part No " />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField variant="outlined" size="small" fullWidth label="Supplier2 Price " />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mb: 1 }}
                  label="Supplier2 Price "
                >
                  <Select defaultValue="Each (1)">
                    <MenuItem value="Each (1)">Each (1)</MenuItem>
                    <MenuItem value="Inner Pack (2)">Inner Pack (2)</MenuItem>
                    <MenuItem value="Case (3)">Case (3)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={1}>
                <IconButton>
                  <SyncIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  open={open}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  isOptionEqualToValue={(option, value) => option.title === value.title}
                  getOptionLabel={(option) => option.title}
                  options={options}
                  loading={loading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Supplier3"
                      size="small"
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField variant="outlined" size="small" fullWidth label="Supplier3 Part No " />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField variant="outlined" size="small" fullWidth label="Supplier3 Price " />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mb: 1 }}
                  label="Supplier3 Price "
                >
                  <Select defaultValue="Each (1)">
                    <MenuItem value="Each (1)">Each (1)</MenuItem>
                    <MenuItem value="Inner Pack (2)">Inner Pack (2)</MenuItem>
                    <MenuItem value="Case (3)">Case (3)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={1}>
                <IconButton>
                  <SyncIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  open={open}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  isOptionEqualToValue={(option, value) => option.title === value.title}
                  getOptionLabel={(option) => option.title}
                  options={options}
                  loading={loading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Supplier4"
                      size="small"
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField variant="outlined" size="small" fullWidth label="Supplier4 Part No " />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField variant="outlined" size="small" fullWidth label="Supplier4 Price " />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mb: 1 }}
                  label="Supplier4 Price "
                >
                  <Select defaultValue="Each (1)">
                    <MenuItem value="Each (1)">Each (1)</MenuItem>
                    <MenuItem value="Inner Pack (2)">Inner Pack (2)</MenuItem>
                    <MenuItem value="Case (3)">Case (3)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={1}>
                <IconButton>
                  <SyncIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  open={open}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  isOptionEqualToValue={(option, value) => option.title === value.title}
                  getOptionLabel={(option) => option.title}
                  options={options}
                  loading={loading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Supplier5"
                      size="small"
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField variant="outlined" size="small" fullWidth label="Supplier5 Part No " />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField variant="outlined" size="small" fullWidth label="Supplier5 Price " />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mb: 1 }}
                  label="Supplier5 Price "
                >
                  <Select defaultValue="Each (1)">
                    <MenuItem value="Each (1)">Each (1)</MenuItem>
                    <MenuItem value="Inner Pack (2)">Inner Pack (2)</MenuItem>
                    <MenuItem value="Case (3)">Case (3)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={1}>
                <IconButton>
                  <SyncIcon />
                </IconButton>
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
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ProductForm;
