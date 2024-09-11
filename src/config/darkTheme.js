import { createTheme, adaptV4Theme } from '@mui/material/styles';
import styled, { css } from 'styled-components';

export const typography = {
  custom: {
    colorCode: {
      textPrimary: 'rgba(0,0,0,0.87)',
      textSecondary: 'rgba(0,0,0,0.60)',
    },
  },
  fontFamily: ['Inter', 'sans-serif'].join(','),
  body1: {
    fontSize: '16px',
    fontWeight: 400,
  },
  body2: {
    fontSize: '14px',
    fontWeight: 400,
  },
  h1: {
    fontSize: '20px',
    lineHeight: '120%',
    fontWeight: 500,
  },
  h2: {
    fontSize: '18px',
    lineHeight: '120%',
    fontWeight: 500,
    letterSpacing: '-0.5px',
  },
  h3: {
    fontSize: '16px',
    lineHeight: '123.5%',
    fontWeight: 400,
    letterSpacing: '0.25px',
  },
  h4: {
    fontSize: '16px',
    color: '#000000',
  },
  h5: {
    fontSize: '12px',
    lineHeight: '133.4%',
    fontWeight: 400,
  },
  h6: {
    fontSize: '12px',
    lineHeight: '133.4%',
    fontWeight: 400,
    letterSpacing: '0.15px',
  },
  faded: {
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.6)',
    letterSpacing: '0.15px',
    lineHeight: '150%',
    fontWeight: 400,
  },
};

export const palette = {
  type: 'dark',
  mode: 'dark',
  primary: {
    // main: '#203244',
    main: '#A0BED9',
  },
  secondary: {
    main: '#FFD47E',
  },
  success: {
    main: 'rgba(46, 125, 50, 1)',
  },
  text: {
    primary: '#ffffff',
    secondary: '#B1B1B1',
    grey1: 'rgba(256,256,256,0.54)',
    grey2: 'rgba(256,256,256,0.30)',
  },
  background: {
    // default: '#021424',
    paper: '#0C1721',
    default: '#090D11',
    bg1: '#193247',
  },
};

export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
          height: '9px',
          width: '9px',
        },
        '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
          borderRadius: '6px',
          backgroundColor: '#0D1822',
        },

        '&::-webkit-scrollbar-track:hover, & *::-webkit-scrollbar-track:hover': {
          backgroundColor: '#0D1822',
        },
        '&::-webkit-scrollbar-track:active, & *::-webkit-scrollbar-track:active': {
          backgroundColor: '#0D1822',
        },
        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
          borderRadius: '6px',
          backgroundColor: '#1B3C59',
        },

        '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#1B3C59',
        },
        '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
          backgroundColor: '#1B3C59',
        },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: '#25435D',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        // backgroundColor: '#021424',
        '& fieldset': {
          // borderColor: '#1B3C59',
          borderColor: 'rgba(255, 255, 255, 0.23)',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#5983A8 !important',
          boxShadow: '0px 0px 6px 0px rgba(69, 113, 151, 0.50);',
        },
        '& input, & select': {
          '-webkit-background-clip': 'text !important',
        },
      },
    },
  },

  MuiTextField: {
    root: {
      marginTop: '8px',
      '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: '#1976D2',
          borderWidth: '2px',
        },
        // '&.Mui-focused fieldset': {
        //   borderColor: '#3E68A8',
        // },
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        backgroundColor: '#021424',
      },
      list: {
        '& li': {
          fontSize: '14px',
          color: '#BFBFBF',
          '& svg': {
            width: '24px',
            height: '24px',
            color: '#BFBFBF',
            marginRight: '8px',
          },
          '&:hover': {
            color: palette.secondary.main,
            backgroundColor: '#172736',
            '& svg': {
              color: palette.secondary.main,
            },
          },
        },
      },
    },
  },
  // MuiPagination: {
  //   styleOverrides: {
  //     root: {
  //       backgroundColor: '#ff0000 !important',
  //       '& button.Mui-selected': {
  //         backgroundColor: '#ff0000 !important',
  //       },
  //     },
  //   },
  // },
};

export const overrides = {
  overrides: {
    MuiListItem: {
      root: {},
    },
    MuiPaper: {},
    MuiCard: {
      root: {},
    },
    MuiDivider: {
      root: {
        borderColor: '#FFFFFF1F',
      },
    },
  },
};

const darkTheme = createTheme({
  palette,
  typography,
  components,
  overrides,
});

export default darkTheme;

export const drawerWidth = 220;
export const drawerCollapseWidth = 55;
