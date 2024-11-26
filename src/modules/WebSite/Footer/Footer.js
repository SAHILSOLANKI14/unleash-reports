import { Box, Container, Grid, Typography, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from 'src/assets/images/unleash-white.png';
const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          backgroundColor: '#1f2326',
          color: '#fff',
          py: 5,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" sx={{ pb: 2 }}>
                <img
                  src={logo}
                  alt="Unleash POS Logo"
                  style={{ width: '80%', marginRight: '16px' }}
                />
              </Box>
              <Typography variant="h6" gutterBottom>
                UNLEASH POS LLC
              </Typography>
              <Typography variant="body2">
                We offer quality POS solutions for your business needs. Contact us to learn more.
              </Typography>
            </Grid>

            {/* Quick Links Section */}
            <Grid item xs={12} sm={4}>
              <Typography
                variant="h4"
                sx={{ color: '#fff', fontWeight: '600', fontSize: '16px', mb: 2 }}
              >
                Quick Links
              </Typography>
              <Box display="flex" flexDirection="column">
                <Link
                  href="/home"
                  color="inherit"
                  underline="none"
                  sx={{ mb: 1, fontSize: '14px' }}
                >
                  Home
                </Link>
                <Link href="/#" color="inherit" underline="none" sx={{ mb: 1, fontSize: '14px' }}>
                  Price Change
                </Link>
                <Link
                  href="/promotion"
                  color="inherit"
                  underline="none"
                  sx={{ mb: 1, fontSize: '14px' }}
                >
                  Promotion
                </Link>
                <Link
                  href="/abbreviations"
                  color="inherit"
                  underline="none"
                  sx={{ mb: 1, fontSize: '14px' }}
                >
                  Abbreviations
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography
                variant="h4"
                sx={{ color: '#fff', fontWeight: '600', fontSize: '16px', mb: 2 }}
              >
                Contact Us
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Phone: (732) 454-8888
              </Typography>
              <Typography variant="body2">Email: info@unleashpos.com</Typography>
              <Box mt={2}>
                <IconButton color="inherit" href="https://www.facebook.com" target="_blank">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="inherit" href="https://www.twitter.com" target="_blank">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="inherit" href="https://www.instagram.com" target="_blank">
                  <InstagramIcon />
                </IconButton>
                <IconButton color="inherit" href="https://www.linkedin.com" target="_blank">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        mt={0}
        sx={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          background: '#1f2326',
          borderTop: '1px solid gray',
          p: 1,
        }}
      >
        <Typography
          variant="body2"
          color="#ffffff"
          component="p"
          sx={{ fontSize: '13px', fontWeight: '600' }}
        >
          &copy; {new Date().getFullYear()} UNLEASH POS LLC. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
