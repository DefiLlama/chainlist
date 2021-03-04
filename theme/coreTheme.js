import { createMuiTheme } from '@material-ui/core/styles';

export const colors = {
  blue: "#2F80ED",
  red: '#ed4337',
  orange: '#ffb347',
  lightBlack: 'rgba(0, 0, 0, 0.87)'
};

const coreTheme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1600,
      xl: 1920,
    },
  },
  shape: {
    borderRadius: '10px'
  },
  typography: {
    fontFamily: [
      'Inter',
      'Arial',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '3.4rem',
      fontWeight: 700,
      lineHeight: 1.167,
      letterSpacing: '1px'
    },
    h2: {
      fontSize: '1.2rem',
      fontWeight: 500,
      lineHeight: 1.5,
      ['@media (max-width:576px)']: {
        fontSize: '1rem'
      }
    },
    h3: {
      fontFamily: [
        'Druk Wide Bold',
        'Inter',
        'Arial',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'sans-serif',
      ],
      fontSize: '2rem',
      fontWeight: 800,
      lineHeight: 0,
      ['@media (max-width:576px)']: {
        fontSize: '1.2rem'
      }
    },
    h4: {   // yearn title text finance
      fontSize: '1.5rem',
      letterSpacing: '0.2rem',
      fontWeight: 300,
      lineHeight: 1.167,
      ['@media (max-width:576px)']: { // eslint-disable-line no-useless-computed-key
        fontSize: '1.2rem'
      }
    },
    h5: {   // card headers
      fontSize: '0.9rem',
      fontWeight: 300,
      lineHeight: 1.167,
      ['@media (max-width:576px)']: { // eslint-disable-line no-useless-computed-key
        fontSize: '0.7rem'
      }
    },
    h6: {   // card headers
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.167,
      letterSpacing: '2px',
      ['@media (max-width:576px)']: { // eslint-disable-line no-useless-computed-key
        fontSize: '1.2rem'
      }
    },
    subtitle1: {
      fontSize: '0.9rem',
      fontWeight: 300,
      lineHeight: 1.167,
      ['@media (max-width:576px)']: { // eslint-disable-line no-useless-computed-key
        fontSize: '0.7rem'
      }
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 300,
      lineHeight: 1.3,
      ['@media (max-width:576px)']: { // eslint-disable-line no-useless-computed-key
        fontSize: '0.8rem'
      }
    }
  },
  palette: {
    primary: {
      main: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#EFEFEF',
    },
    error: {
      main: '#dc3545'
    }
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        padding: '12px 14px'
      }
    },
    MuiTooltip: {
      tooltip: {
        maxWidth: 'none',
      }
    },
    MuiButton: {
      root: {
        minWidth: '50px'
      },
      outlinedSizeSmall: {
        fontSize: '0.7rem',
        padding: '6px 9px',
        ['@media (max-width:576px)']: { // eslint-disable-line no-useless-computed-key
          padding: '3px 0px',
        }
      },
      sizeLarge: {
        padding: '19px 24px',
        minWidth: '150px'
      },
      textSizeLarge: {
        fontSize: '2.4rem',
        ['@media (max-width:576px)']: { // eslint-disable-line no-useless-computed-key
          fontSize: '2rem'
        }
      }
    },
    MuiDialog: {
      paperWidthSm: {
        maxWidth: '800px'
      }
    },
    MuiToggleButton: {
      root: {
        flex: 1,
        padding: '9px 6px'
      }
    },
    MuiSnackbar : {
      root: {
        maxWidth: 'calc(100vw - 24px)'
      },
      anchorOriginBottomLeft: {
        bottom: '12px',
        left: '12px',
        '@media (min-width: 960px)': {
          bottom: '50px',
          left: '80px'
        }
      }
    },
    MuiInputBase: {
      root: {
        margin: '0px',
        '&:before': { //underline color when textfield is inactive
          borderBottom: 'none !important',
          height: '0px'
        },
        '&:after': { //underline color when textfield is inactive
          borderBottom: 'none !important',
          height: '0px'
        },
      }
    },
    MuiAccordion: {
      root: {
        margin: '0px',
        '&:before': { //underline color when textfield is inactive
          backgroundColor: 'none',
          height: '0px'
        },
        '&$expanded': {
          margin: '0px'
        }
      }
    },
    MuiAccordionSummary: {
      root: {
        padding: '0px 24px',
        '@media (max-width:576px)': {
          padding: '0px 6px',
        }
      },
      content: {
        margin: '0px !important'
      }
    },
    MuiAccordionDetails: {
      root: {
        padding: '0',
      }
    },
    MuiFormHelperText: {
      contained: {
        textAlign: 'end'
      }
    }
  }
}


export default coreTheme;
