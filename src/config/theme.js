import { createTheme } from '@mui/material/styles';

export const typography = {
  fontFamily: 'Gilroy',
  body1: {
    fontSize: '16px',
    fontWeight: 400,
  },
  body2: {
    fontSize: '14px',
    fontWeight: 400,
  },
  h1: {
    fontSize: '36px',
    lineHeight: '120%',
    fontWeight: 500,
  },
  h2: {
    fontSize: '30px',
    lineHeight: '120%',
    fontWeight: 500,
    letterSpacing: '-0.5px',
  },
  h3: {
    fontSize: '24px',
    lineHeight: '120%',
    fontWeight: 500,
    letterSpacing: '0.25px',
  },
  h4: {
    fontSize: '18px',
    color: '#000000',
  },
  h5: {
    fontSize: '14px',
    lineHeight: '133.4%',
    fontWeight: 400,
  },
  h6: {
    fontSize: '12px',
    lineHeight: '133.4%',
    fontWeight: 400,
    letterSpacing: '0.15px',
  },
};

export const palette = {
  type: 'light',
  primary: {
    main: '#fffff',
  },
  secondary: {
    main: '#1a79ff',
  },
  background: {
    default: '#F5F6FF',
  },
  text: {
    primary: 'rgba(0,0,0,0.87)',
    // primary: '#ff0000',
    secondary: 'rgba(0,0,0,0.6)',
  },
  white: '#ffffff',
  gray: '#eeeeee',
};

export const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
      },
    },
  },
};

export const overrides = {};

const theme = createTheme({
  palette,
  typography,
  components,
  overrides,
});

export default theme;

export const drawerWidth = 265;
