import { Opacity } from '@mui/icons-material';

export const getOverrides = (
  paperWidth,
  sideBarIsOpen,
  paperHeight,
  stickyTD,
  stickyCol,
  hideToolBar,
  palette,
  isDesktop,
  isTablet,
  isMobile,
) => {
  // console.log('palette : 101 : ', palette);
  const bg = palette.mode === 'light' ? '#ffffff' : '#0C1721';
  return {
    MUIDataTable: {
      paper: {
        ...(!isMobile && !isTablet
          ? {
              maxWidth: `calc(100vw - ${
                paperWidth.substr(0, paperWidth.length - 2) - (sideBarIsOpen ? 0 : 175)
              }px)`,
            }
          : {}),
        transition: 'max-width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
        boxShadow: 'none',
        background: 'transparent',
      },
      responsiveBase: {
        maxHeight: `calc(100vh - ${paperHeight}) !important`,
        backgroundColor: bg,
        borderRadius: 0,
        // padding: palette.mode === 'light' ? '0px' : '0px',
        ...(palette.mode === 'dark'
          ? {
              border: '1px solid #203244',
              borderRadius: '8px',
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '0px',
            }
          : {
              borderRadius: '4px',
            }),

        '&::-webkit-scrollbar': {
          width: 3,
          backgroundColor: '#1a79ff',
          Opacity: 0.3,
        },
        '&::-webkit-scrollbar-track': {
          borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: palette.mode === 'light' ? '#dddddd' : '#1a79ff',
          Opacity: 0.3,
          borderRadius: 6,
        },
      },
    },
    MuiTableRow: {
      hover: {},
      root: {},
    },
    MuiTableRowHover: {
      hover: {},
    },
    MuiSelected: {},
    MuiTablePagination: {
      actions: {
        minWidth: 100,
      },
    },
    MuiTableHead: {
      root: {
        ...(palette.mode === 'dark'
          ? {
              ...(palette.mode === 'dark' ? { borderBottom: '1px solid #203244' } : {}),
              '& .MuiTableRow-root .MuiTableCell-head:first-child': {
                borderTopLeftRadius: '8px',
              },
              '& .MuiTableRow-root .MuiTableCell-head:last-child': {
                borderTopRightRadius: '8px',
              },
            }
          : {}),

        [`& th:nth-of-type(${stickyTD})`]: stickyCol
          ? {
              whiteSpace: 'nowrap',
              position: 'sticky',
              left: stickyTD === 1 ? 0 : 42,
              zIndex: 101,
              borderRadius: '20px 0 0 0',
            }
          : {},
        '& th:last-child': {
          borderRadius: '0 20px 0 0',
        },
        '& th': {
          textAlign: 'center',
          // p: 4,
        },
        '& th span': {
          display: 'block',
          p: 0,
        },
        '& th span button': {
          marginRight: 0,
        },
        '& th span button div, & th span button svg': {
          color: '#2b3033 !important',
          // color: palette.secondary.main,
        },
      },
    },
    MuiTableBody: {
      root: {
        [`& td:nth-of-type(${stickyTD})`]: stickyCol
          ? {
              whiteSpace: 'nowrap',
              position: 'sticky',
              left: stickyTD === 1 ? 0 : 42,
              zIndex: 100,
            }
          : {},
        '& .mui-row-selected': {
          // background: '#ffffff !important',
          [`& td:nth-of-type(${stickyTD})`]: stickyCol
            ? {
                background: '#ffffff',
              }
            : {},
        },
        '& tr': {
          height: 40,
        },
      },
    },
    MuiTableCell: {
      root: {
        padding: '7px 20px !important',
        color: palette.text.primary,
        borderColor: palette.mode === 'light' ? 'rgba(224, 224, 224, 1)' : '#1B3C59',
        textAlign: 'center',
        fontWeight: 400,
        fontSize: 14,
      },
    },
    '& .MUIDataTableHeadCell-sortAction': {
      sortAction: {
        // color: 'rgba(0, 0, 0, 0.38) !important',
      },
    },
    MUIDataTableSelectCell: {
      headerCell: {
        // backgroundColor: 'blue',
      },
    },
    MUIDataTableToolbar: {
      left: { display: 'none' },
      root: hideToolBar
        ? { display: 'none' }
        : {
            padding: 0,
            '& .MUIDataTableSearch-searchBox': {
              // backgroundColor: '#ffffff',
            },
          },
    },
    MUIDataTableToolbarSelect: {
      root: {
        boxShadow: 'none',
        borderRadius: 0,
        border: `none`,
        borderBottom: 'none',
        justifyContent: 'start',
        backgroundColor: 'transparent',
        '& :nth-of-type(1)': {
          '& h6': {
            display: 'none',
          },
        },
      },
    },
    MUIDataTableSelectCell: {},
    MuiTableFooter: {
      root: {
        backgroundColor: palette.mode === 'dark' ? '#090D11' : 'transparent',
        '& .MuiTableRow-root': {
          ...(palette.mode === 'dark' && {
            padding: '10px',
            display: 'block',
            border: '1px solid #1B3C59',
            borderTopWidth: 0,
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
          }),
        },
      },
    },
    MUIDataTableHeadCell: {
      root: {
        backgroundColor: palette.mode === 'dark' ? '#090D11' : '#ffffff',
        padding: palette.mode === 'dark' ? '16px 4px !important' : '4px 20px !important',
        borderRadius: 0,
        ...(palette.mode === 'dark' ? { borderBottom: '1px solid #203244' } : {}),
        color: palette.white,
        ...(palette.mode === 'dark' && {
          border: 'none',
          '&::before': {
            content: '""',
            display: 'block',
            backgroundColor: bg,
            width: '100%',
            height: '20px',
            position: 'absolute',
            top: '-20px',
            left: 0,
          },
        }),
      },
    },
  };
};
