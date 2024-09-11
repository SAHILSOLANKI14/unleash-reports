import { useEffect } from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AuthLayout from 'src/layout/AuthLayout';
import AppLayout from 'src/layout/AppLayout';
import AppLoader from 'src/layout/AppLoader';
import AppRouter from './router';
import 'src/assets/css/fonts.css';
import 'src/assets/css/app.css';
import { SnackbarProvider } from 'notistack';
import theme from 'src/config/theme';
import { authPages } from 'src/config';
import { restoreSession } from 'src/modules/auth/store/authActions';
import { useLocation } from 'react-router-dom';
// import { SalesSession } from './modules/Sales/store/SalesAction';

function App({ ...props }) {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(restoreSession());
    // dispatch(SalesSession());
  }, []);

  const loading = useSelector((state) => state.app.appLoading);

  if (loading) return <AppLoader />;

  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        {authPages.includes(location.pathname) ? (
          <AuthLayout>
            <AppRouter />
          </AuthLayout>
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
