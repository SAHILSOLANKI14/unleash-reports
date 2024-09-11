import PrintIcon from '@mui/icons-material/Print';
import SettingsIcon from '@mui/icons-material/Settings';
import { Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import DenseTable from '../Component/ProductDetailTableGrid';
import logo from '../images/no_image.png';
const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: 0,
    borderRadius: 0,
  },
  content: {
    padding: theme.spacing(2),
    overflowX: 'auto',
    background: 'transparent',
    border: 'none',
  },
  typography_biller: {
    color: 'royalblue',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  typography: {
    color: 'gray',
  },
  popup_biller: {
    color: 'royalblue',
    fontSize: '13px',
    fontWeight: '600',
  },
  popup_span: {
    color: '#010101',
    fontSize: '13px',
  },
  typography_footer: {
    fontWeight: 'bold',
    marginTop: '10px',
    marginBottom: '10px',
  },
  typography_footerC1: {
    fontWeight: '500',
    margin: '10px',
  },
  typography_tools: {
    color: 'gray',
    background: 'lightgray',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: '6px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontWeight: '400',
    fontSize: '15px',
    // width: '50px',
    maxWidth: '55%',
  },
  typography_Button: {
    color: 'gray',
    background: 'lightgray',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: '6px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontWeight: '400',
    fontSize: '15px',
    // width: '50px',
    width: '30%',
    float: 'right',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
    marginTop: '20px',
    // marginLeft: '10px',
    color: '#404251',
  },
  producttitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginTop: '10px',
    color: '#404251',
    alignItems: 'center',
    display: 'flex',
    justifyContent: '',
  },
  productInfo: {
    fontSize: '13px',
    fontWeight: '400',
    marginTop: '5px',
    color: 'gray',
    alignItems: 'center',
    display: 'flex',
    justifyContent: '',
  },
  productInfoDetail: {
    fontSize: '13px',
    fontFamily: 'sans-serif',
    fontWeight: '600',
    marginTop: '7px',
    marginBottom: '1rem',
    color: '#3f424a',
    alignItems: 'center',
    display: 'flex',
    justifyContent: '',
  },
  tableHeader: {
    backgroundColor: '#F4F4F4',
    borderRadius: '10px',
  },
}));

export default function Productdetailpopup({ open, handleClose, detailData }) {
  const classes = useStyles();
  // console.log('detaildata', detailData);
  const unitData = detailData[0] || {};
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [saleunit, setSaleunit] = React.useState('');

  const productName = unitData?.name || 'N/A';
  const saleUnit = unitData?.sale_unit || 'N/A';
  const purchaseUnit = unitData?.purchase_unit || 'N/A';
  const category = unitData?.category || 'N/A';
  const price = unitData?.price || 'N/A';
  const cost = unitData?.cost || 'N/A';
  const stateTax = unitData?.state_tax_rate || 'N/A';
  const countyTax = unitData?.county_tax_rate || 'N/A';
  const cityTax = unitData?.city_tax_rate || 'N/A';
  const margin = unitData?.margin || 'N/A';
  const visibility = unitData?.make_private || 'N/A';
  const taxMethod = unitData?.tax_method || 'N/A';
  const oldtax = unitData?.old_cost || 'N/A';
  const image = unitData?.image || logo;
  const Quantity = unitData?.quantity;
  const supplier1unit = unitData?.supplier1_unit;
  const supplier1Cost = unitData?.supplier1price;
  const supplier1part_no = unitData?.supplier1_part_no;
  const Operator = unitData?.operator;

  const jsonData = unitData?.code || '{}';
  const parsedData = JSON.parse(jsonData);
  const innercode = parsedData[10];
  const eachcode = parsedData[9];
  // console.log('parsedData', parsedData[9]);

  React.useEffect(() => {
    const unitData = detailData[0] || {};
    const saleUnit = unitData?.sale_unit || 'N/A';

    let saleUnitString = 'Invalid Sale Unit';
    if (saleUnit === '9') {
      saleUnitString = 'Each';
    } else if (saleUnit === '10') {
      saleUnitString = 'Inner Pack';
    } else if (saleUnit === '11') {
      saleUnitString = 'Case';
    }

    setSaleunit(saleUnitString);
  }, [detailData]);
  const columns1 = [
    { id: 'Name', label: 'Supplier' },
    { id: 'Quantity', label: 'Quantity' },
    { id: 'AvgCost', label: 'Avg Cost' },
  ];

  const columns2 = [
    { id: 'Unit', label: 'Unit' },
    { id: 'Code', label: 'Code' },
    { id: 'Cost', label: 'Cost' },
    { id: 'Supplier', label: 'Supplier' },
  ];

  const columns3 = [
    { id: 'Unit', label: 'Unit' },
    { id: 'Operator', label: 'Operator' },
    { id: 'Value', label: 'Value' },
    { id: 'BaseUnit', label: 'Base Unit' },
  ];
  const rows1 = [{ Name: 'UNLEASH POS LLC (UNLEASHPOS)', Quantity: Quantity, AvgCost: '0' }];
  const rows2 = [
    { Unit: 'Inner Pack', Cost: supplier1Cost, Code: supplier1part_no, Supplier: supplier1unit },
  ];
  const rows3 = [{ Unit: 'Inner Pack', Operator: Operator, Value: '10', BaseUnit: 'Each' }];

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'mouse-over-popover' : undefined;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="popup-dialog-title"
      className={classes.dialog}
      maxWidth={'md'}
      fullWidth={true}
      PaperProps={{
        sx: {
          position: 'absolute',
          top: 0,
          borderRadius: 0,
        },
      }}
    >
      <DialogContent className={classes.content}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h3" className={classes.producttitle}>
              {productName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4" className={classes.typography_tools}>
              <PrintIcon sx={{ color: 'gray' }} />
              Print
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h3" className={classes.typography_Button}>
              <SettingsIcon sx={{ color: 'royalblue' }} />
            </Typography>
          </Grid>
        </Grid>
        <hr></hr>
        <Typography variant="h4" className={classes.title}>
          Product Information
        </Typography>
        <hr></hr>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={5}>
            <Stack direction={'column'}>
              <Typography variant="h5" className={classes.productInfo}>
                Sale Unit:
              </Typography>
              <Typography variant="h5" className={classes.productInfoDetail}>
                {saleunit}
              </Typography>
              <Typography variant="h5" className={classes.productInfo}>
                Purchase Unit:
              </Typography>
              <Typography variant="h5" className={classes.productInfoDetail}>
                {saleUnit}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction={'column'}>
              <Typography variant="h5" className={classes.productInfo}>
                Inner Pack :
              </Typography>
              <Typography variant="h5" className={classes.productInfoDetail}>
                {innercode}
              </Typography>
              <Typography variant="h5" className={classes.productInfo}>
                Each :
              </Typography>
              <Typography variant="h5" className={classes.productInfoDetail}>
                {eachcode}
              </Typography>
              <Typography variant="h5" className={classes.productInfo}>
                Visibility:
              </Typography>
              <Typography variant="h5" className={classes.productInfoDetail}>
                {/* {visibility} */}
                Make Private
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack>
              <img src={logo} style={{ width: '70%' }} />
            </Stack>
          </Grid>
        </Grid>
        <Stack direction={'column'}>
          <Typography variant="h5" className={classes.productInfo}>
            Category:
          </Typography>
          <Typography variant="h5" className={classes.productInfoDetail}>
            Premier Tobacco
          </Typography>
        </Stack>
        <Typography variant="h4" className={classes.title}>
          Pricing & Tax
        </Typography>
        <hr></hr>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <Stack direction={'column'}>
              <Typography variant="h5" className={classes.productInfo}>
                Price:
              </Typography>
              <Typography variant="h5" className={classes.productInfoDetail}>
                {price}
              </Typography>
              <Typography variant="h5" className={classes.productInfo}>
                State Tax:
              </Typography>
              <Typography variant="h5" className={classes.productInfoDetail}>
                {stateTax}
              </Typography>
              <Typography variant="h5" className={classes.productInfo}>
                Tax method:
              </Typography>
              <Typography variant="h5" className={classes.productInfoDetail}>
                {taxMethod}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction={'column'}>
              <Typography variant="h5" className={classes.productInfo}>
                Cost:
              </Typography>
              <Typography variant="h5" className={classes.productInfoDetail}>
                {cost}
              </Typography>
              <Typography variant="h5" className={classes.productInfo}>
                County Tax:
              </Typography>
              <Typography variant="h5" className={classes.productInfoDetail}>
                {countyTax}
              </Typography>
              <Typography variant="h5" className={classes.productInfo}>
                Margin:
              </Typography>
              <Typography variant="h5" className={classes.productInfoDetail}>
                {margin}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack>
              <Typography variant="h5" className={classes.productInfo}>
                Old Cost:
              </Typography>
              <Typography variant="h5" className={classes.productInfoDetail}>
                {oldtax}
              </Typography>
              <Typography variant="h5" className={classes.productInfo}>
                City Tax:
              </Typography>
              <Typography variant="h5" className={classes.productInfoDetail}>
                {cityTax}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Typography variant="h4" className={classes.title}>
          Warehouse Inventory
        </Typography>
        <hr></hr>
        <DenseTable rows={rows1} columns={columns1} />
        <Typography variant="h4" className={classes.title}>
          Suppliers
        </Typography>
        <hr />
        <DenseTable rows={rows2} columns={columns2} />
        <Typography variant="h4" className={classes.title}>
          Units
        </Typography>
        <hr />
        <DenseTable rows={rows3} columns={columns3} />
      </DialogContent>
    </Dialog>
  );
}
