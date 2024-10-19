import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import PrintIcon from '@mui/icons-material/Print';
import SettingsIcon from '@mui/icons-material/Settings';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import ReportIcon from '@mui/icons-material/Report';

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
    color: '#273238',
    fontWeight: '500',
    fontSize: '14px',
  },
  typography1: {
    color: '#818587',
    fontWeight: '500',
    fontSize: '14px',
  },
  boxstate: {
    borderBottom: '1px solid lightgray',
  },
  state: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '7px',
  },
}));
const Item = styled(Paper)(() => ({
  backgroundColor: '#e0f0ff',
  textAlign: 'center',
  fontWeight: '600',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  fontSize: '21px',
  color: '#2277f5',
}));
const CustomerDialog = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="popup-dialog-title"
      className={classes.dialog}
      maxWidth="sm"
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
        <Box sx={{ width: 1 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
            <Box sx={{ gridColumn: 'span 3' }}>
              <Item sx={{ height: '120px' }}>843</Item>
            </Box>
            <Box sx={{ gridColumn: 'span 9' }}>
              <Stack direction={'column'} spacing={1} sx={{ mt: 2 }}>
                <Typography variant="h4" sx={{ color: '#273238', fontWeight: '600' }}>
                  24X7 developers
                </Typography>
                <Typography variant="h4" sx={{ color: '#818587', fontWeight: '600' }}>
                  Demo Testing
                </Typography>
                <Stack direction={'row'} spacing={2}>
                  <Button
                    sx={{
                      color: '#ec2951',
                      fontWeight: '600',
                      fontSize: '14px',
                      padding: '5px',
                      paddingLeft: '20px',
                      paddingRight: '20px',
                      background: '#ffebf2',
                      textAlign: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <EditIcon sx={{ fontSize: '20px', marginRight: '3px' }} />
                    Edit
                  </Button>
                  <Button
                    sx={{
                      color: '#f3a91a',
                      fontWeight: '600',
                      fontSize: '14px',
                      padding: '5px',
                      paddingLeft: '20px',
                      paddingRight: '20px',
                      background: '#fff4de',
                      textAlign: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ReportIcon sx={{ fontSize: '25px', marginRight: '5px' }} />
                    Report
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: 1, mt: 5 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
            <Box sx={{ gridColumn: 'span 12' }}>
              <Stack
                direction={'row'}
                spacing={1}
                className={classes.state}
                // sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography variant="h4" className={classes.typography}>
                  Customer Group:
                </Typography>
                <Typography variant="h4" className={classes.typography1}>
                  Testing
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ gridColumn: 'span 12' }} className={classes.boxstate}>
              <Stack direction={'row'} spacing={1} className={classes.state}>
                <Typography variant="h4" className={classes.typography}>
                  Doing Business As:
                </Typography>
                <Typography variant="h4" className={classes.typography1}>
                  Testing
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ gridColumn: 'span 12' }} className={classes.boxstate}>
              <Stack
                direction={'row'}
                spacing={0}
                className={classes.state}
                //className={classes.state}
              >
                <Typography variant="h4" className={classes.typography}>
                  Email:
                </Typography>
                <Typography variant="h4" className={classes.typography1}>
                  Testing
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ gridColumn: 'span 12' }} className={classes.boxstate}>
              <Stack direction={'row'} spacing={1} className={classes.state}>
                <Typography variant="h4" className={classes.typography}>
                  Phone:
                </Typography>
                <Typography variant="h4" className={classes.typography1}>
                  Testing
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ gridColumn: 'span 12' }} className={classes.boxstate}>
              <Stack direction={'row'} spacing={1} className={classes.state}>
                <Typography variant="h4" className={classes.typography}>
                  Cell Phone:
                </Typography>
                <Typography variant="h4" className={classes.typography1}>
                  Testing
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ gridColumn: 'span 12' }} className={classes.boxstate}>
              <Stack direction={'row'} spacing={1} className={classes.state}>
                <Typography variant="h4" className={classes.typography}>
                  Address:
                </Typography>
                <Typography variant="h4" className={classes.typography1}>
                  Testing
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ gridColumn: 'span 12' }} className={classes.boxstate}>
              <Stack direction={'row'} spacing={1} className={classes.state}>
                <Typography variant="h4" className={classes.typography}>
                  City:
                </Typography>
                <Typography variant="h4" className={classes.typography1}>
                  Testing
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ gridColumn: 'span 12' }} className={classes.boxstate}>
              <Stack direction={'row'} spacing={1} className={classes.state}>
                <Typography variant="h4" className={classes.typography}>
                  County:
                </Typography>
                <Typography variant="h4" className={classes.typography1}>
                  Testing
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ gridColumn: 'span 12' }} className={classes.boxstate}>
              <Stack direction={'row'} spacing={1} className={classes.state}>
                <Typography variant="h4" className={classes.typography}>
                  State:
                </Typography>
                <Typography variant="h4" className={classes.typography1}>
                  Testing
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ gridColumn: 'span 12' }} className={classes.boxstate}>
              <Stack direction={'row'} spacing={1} className={classes.state}>
                <Typography variant="h4" className={classes.typography}>
                  State Tax Registration:
                </Typography>
                <Typography variant="h4" className={classes.typography1}>
                  Testing
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ gridColumn: 'span 12' }} className={classes.boxstate}>
              <Stack direction={'row'} spacing={1} className={classes.state}>
                <Typography variant="h4" className={classes.typography}>
                  Tobacco Licence Number:
                </Typography>
                <Typography variant="h4" className={classes.typography1}>
                  Testing
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ gridColumn: 'span 12' }} className={classes.boxstate}>
              <Stack direction={'row'} spacing={1} className={classes.state}>
                <Typography variant="h4" className={classes.typography}>
                  Driver Licence Number:
                </Typography>
                <Typography variant="h4" className={classes.typography1}>
                  Testing
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ gridColumn: 'span 12' }} className={classes.boxstate}>
              <Stack direction={'row'} spacing={1} className={classes.state}>
                <Typography variant="h4" className={classes.typography}>
                  Tobacco License Expiry:
                </Typography>
                <Typography variant="h4" className={classes.typography1}>
                  Testing
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ gridColumn: 'span 12' }} className={classes.boxstate}>
              <Stack direction={'row'} spacing={1} className={classes.state}>
                <Typography variant="h4" className={classes.typography}>
                  Child Companies:
                </Typography>
                <Typography variant="h4" className={classes.typography1}>
                  Testing
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ gridColumn: 'span 12' }}>
              <Stack direction={'row'} spacing={1} className={classes.state}>
                <Typography variant="h4" className={classes.typography}>
                  Attachments:
                </Typography>
                <Typography variant="h4" className={classes.typography1}>
                  Testing
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        {/* <Button autoFocus onClick={handleClose}>
          Disagree
        </Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default CustomerDialog;
