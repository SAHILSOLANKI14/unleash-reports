import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from 'src/layout/AuthLayout';
import AppLayout from 'src/layout/AppLayout';
import WebsiteLayout from 'src/layout/WebsiteLayout'; // Import the new WebsiteLayout
import AppLoader from 'src/layout/AppLoader';
import AppRouter from './router';
import 'src/assets/css/fonts.css';
import 'src/assets/css/app.css';
import { SnackbarProvider } from 'notistack';
import theme from 'src/config/theme';
import { authPages } from 'src/config';
import { restoreSession } from 'src/modules/auth/store/authActions';
import { useLocation } from 'react-router-dom';

// Define your website routes
const websiteRoutes = ['/home', '/about'];
// Add your website routes here
function App({ ...props }) {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  const loading = useSelector((state) => state.app.appLoading);

  if (loading) return <AppLoader />;

  // Determine layout to use based on the current route
  const isAuthPage = authPages.includes(location.pathname);
  const isWebsitePage = websiteRoutes.includes(location.pathname);

  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        {isAuthPage ? (
          <AuthLayout>
            <AppRouter />
          </AuthLayout>
        ) : isWebsitePage ? (
          <WebsiteLayout>
            <AppRouter />
          </WebsiteLayout>
        ) : (
          <AppLayout>
            <AppRouter />
          </AppLayout>
        )}
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
