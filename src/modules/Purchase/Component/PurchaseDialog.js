import PrintIcon from '@mui/icons-material/Print';
import SettingsIcon from '@mui/icons-material/Settings';
import { Stack, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import TableGrid from '../Component/TableGrid';
import * as React from 'react';
import Popover from '@mui/material/Popover';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

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
  },
}));

export default function PopupComponent({ open, handleClose, detailData, address }) {
  const [addressData, setAddressData] = useState([]);

  const classes = useStyles();
  const detaildata = detailData?.data?.[0] || '';
  const purchaseDetails = detaildata.items || [];
  const CreatedBy = detaildata.created_by || {};
  const [anchorEl, setAnchorEl] = React.useState(null);
  const grandTotal = parseFloat(detaildata.grand_total) || 0;
  const paid = parseFloat(detaildata.paid) || 0;
  const balance = grandTotal - paid;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const totalQuantity = purchaseDetails.reduce((total, item) => {
    return total + (parseFloat(item.quantity) || 0); // Ensure that quantity is a number
  }, 0);
  //   return purchase;
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
      maxWidth="lg"
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
        <Box sx={{ width: '100%', p: 1 }}>
          <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Stack direction={'row'}>
              <Typography variant="h3">Purchase Details</Typography>
            </Stack>
            <Stack
              direction={'row'}
              sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}
              spacing={1}
            >
              <Typography variant="h4" className={classes.typography_tools}>
                <PrintIcon sx={{ color: 'gray' }} />
                Print
              </Typography>
              <Typography variant="h3" className={classes.typography_tools}>
                <SettingsIcon sx={{ color: 'royalblue' }} />
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <hr></hr>
        <Box sx={{ width: '100%', p: 1, marginTop: '20px' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={7}>
              <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Stack
                  direction={'column'}
                  aria-owns={id}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  <Typography variant="h5" className={classes.typography_biller}>
                    {detaildata.supplier || 'N/A'}
                  </Typography>
                  <Popover
                    id={id}
                    sx={{
                      pointerEvents: 'none',
                      marginLeft: '80px',
                      top: 0,
                      left: 5,
                      marginTop: '20px',
                    }}
                    open={openPopover}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Stack direction={'column'} sx={{ p: 3 }}>
                      <Stack direction={'row'}>
                        <Typography className={classes.popup_biller}>Name:</Typography>
                        <Typography className={classes.popup_span}>
                          {detaildata.supplier}
                        </Typography>
                      </Stack>
                      <Stack direction={'row'}>
                        <Typography className={classes.popup_biller}>Customer Group:</Typography>
                        <Typography className={classes.popup_span}>00</Typography>
                      </Stack>
                      <Stack direction={'row'}>
                        <Typography className={classes.popup_biller}>
                          State Tax Registration:
                        </Typography>
                        <Typography className={classes.popup_span}>00</Typography>
                      </Stack>
                      <Stack direction={'row'}>
                        <Typography className={classes.popup_biller}>
                          Tobbaco Licence Number:
                        </Typography>
                        <Typography className={classes.popup_span}>00</Typography>
                      </Stack>
                    </Stack>
                  </Popover>

                  <Typography
                    variant="h5"
                    className={classes.typography}
                    sx={{ marginBottom: '10px' }}
                  >
                    {address?.line1 || 'N/A'}
                  </Typography>

                  <Typography variant="h5" className={classes.typography}>
                    Tel : {address?.phone || 'N/A'}
                  </Typography>
                  <Typography variant="h5" className={classes.typography}>
                    Email: {CreatedBy.email || 'N/A'}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                Invoice Details
              </Typography>
              <Stack direction={'column'}>
                <Typography variant="h5" className={classes.typography}>
                  Date: {detaildata.date}
                </Typography>
                <Typography variant="h5" className={classes.typography}>
                  Invoice No:
                  {detaildata.reference_no}
                </Typography>
                <Typography variant="h5" className={classes.typography}>
                  Sale Status:
                  {detaildata.status}
                </Typography>
                <Typography variant="h5" className={classes.typography}>
                  Payment Status:
                  {detaildata.payment_status}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <TableGrid Row={purchaseDetails} />
        <Box sx={{ flexGrow: 1, marginTop: '40px' }}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Typography variant="h5" className={classes.typography_footerC1}>
                Total items:
                {purchaseDetails.length}
              </Typography>
              <Typography variant="h5" className={classes.typography_footerC1}>
                Total items Quantity:
                {totalQuantity}
              </Typography>
              <Stack direction={'column'} className={classes.typography_footerC1}>
                <Typography variant="h5">
                  Created By: {CreatedBy.first_name} {CreatedBy.last_name}
                </Typography>
                <Typography variant="h5">
                  Date:
                  {detaildata.date}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs>
              <Stack
                direction={'row'}
                spacing={3}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography variant="h5" className={classes.typography_footer}>
                  Total Amount (USD):
                </Typography>
                <Typography variant="h5" className={classes.typography_footer}>
                  {detaildata.grand_total}
                </Typography>
              </Stack>
              <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" className={classes.typography_footer}>
                  Total Tax (USD):
                </Typography>
                <Typography variant="h5" className={classes.typography_footer}>
                  {detaildata.total_tax}
                </Typography>
              </Stack>
              <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" className={classes.typography_footer}>
                  Paid:
                </Typography>
                <Typography variant="h5" className={classes.typography_footer}>
                  {detaildata.paid}
                </Typography>
              </Stack>
              <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" className={classes.typography_footer}>
                  Balance (USD):
                </Typography>
                <Typography variant="h5" className={classes.typography_footer}>
                  {balance}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
