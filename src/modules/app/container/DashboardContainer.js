import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { makeStyles } from '@mui/styles';
// import { DashboardCharts } from '../../../components/shared/Charts/index';
import { Piechart } from '../../../components/shared/Charts/PieChart';
import CountUp from 'react-countup';
import Tabs from '../../../components/App/Tabs';
const useStyles = makeStyles({
  card: {
    background: '#eee6fe',
    // Adjust padding as needed
    color: '#8364da', // Optional: Text color
  },
  card2: {
    background: '#fff4de',
    // Adjust padding as needed
    color: '#f3a91a', // Optional: Text color
  },
  card3: {
    background: '#e7ffef',
    // Adjust padding as needed
    color: '#1dba52', // Optional: Text color
  },
  typography: {
    fontSize: '15px',
    fontWeight: '600',
  },
  typographyTitle: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#22243d',
  },
});
function DashboardContainer() {
  const classes = useStyles();

  return (
    <>
      <Box height={30} />
      <Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Card
                sx={{
                  width: 33 + '%',
                  height: 155,
                }}
                className={classes.card}
              >
                <CardContent>
                  <Stack
                    direction={'column'}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                    spacing={2}
                  >
                    <Typography gutterBottom variant="body2" className={classes.typographyTitle}>
                      Sales
                    </Typography>
                    <CreditCardIcon />
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: 'secondary', fontSize: '22px' }}
                    >
                      $
                      <CountUp delay={0.5} end={5000} duration={0.5} />
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card
                sx={{
                  width: 33 + '%',
                  height: 155,
                }}
                className={classes.card2}
              >
                <CardContent>
                  <Stack
                    direction={'column'}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                    spacing={2}
                  >
                    <Typography gutterBottom variant="body2" className={classes.typographyTitle}>
                      Purchases
                    </Typography>
                    <ShoppingBagIcon />
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: 'secondary', fontSize: '22px' }}
                    >
                      $
                      <CountUp delay={0.5} end={9000} duration={0.8} />
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card
                sx={{
                  width: 33 + '%',
                  height: 155,
                }}
                className={classes.card3}
              >
                <CardContent>
                  <Stack
                    direction={'column'}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                    spacing={2}
                  >
                    <Typography gutterBottom variant="body2" className={classes.typographyTitle}>
                      Payments
                    </Typography>
                    <ShoppingBagIcon />
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: 'secondary', fontSize: '22px' }}
                    >
                      $
                      <CountUp delay={0.5} end={9000} duration={0.8} />
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box height={30} />
      <Box component={'main'} sx={{ flexGrow: 1, p: 3, marginTop: '-60px' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card sx={{ height: '65.5vh' }}>
              <CardContent>
                <Piechart />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card sx={{ height: 'auto' }}>
              <CardContent>
                <Tabs />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box height={30} />
      <Box component={'main'} sx={{ flexGrow: 1, p: 3, marginTop: '-60px' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card sx={{ height: 'auto' }}>
              <CardContent>{/* <Tabs /> */}</CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card sx={{ height: 'auto' }}>
              <CardContent>{/* <Tabs /> */}</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default DashboardContainer;
