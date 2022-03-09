import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { withTheme, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Typography, Button, TextField, InputAdornment, Paper } from '@material-ui/core';
import Header from '../header';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import classes from './index.module.css';
import { useSearch, useTestnets } from '../../stores';
import { useDebounce } from '../../utils';
import { useRouter } from 'next/router';

const searchTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2F80ED',
    },
  },
  shape: {
    borderRadius: '10px',
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
    body1: {
      fontSize: '12px',
    },
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        'box-shadow': '0px 7px 7px #0000000A;',
        '-webkit-box-shadow': '0px 7px 7px #0000000A;',
        '-moz-box-shadow': '0px 7px 7px #0000000A;',
      },
    },
    MuiInputBase: {
      input: {
        fontSize: '14px',
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: '12.5px 14px',
      },
      notchedOutline: {
        borderColor: '#FFF',
      },
    },
  },
});

function Layout({ changeTheme, theme, children }) {
  const addNetwork = () => {
    window.open('https://github.com/ethereum-lists/chains', '_blank');
  };
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const handleSearch = useSearch((state) => state.handleSearch);
  const testnets = useTestnets((state) => state.testnets);
  const toggleTestnets = useTestnets((state) => state.toggleTestnets);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm);
    } else {
      handleSearch('');
    }
  }, [debouncedSearchTerm]);

  return (
    <div className={classes.layoutContainer}>
      <Head>
        <title>Chainlist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.main}>
        <div className={theme.palette.type === 'dark' ? classes.containerDark : classes.container}>
          <div className={classes.copyContainer}>
            <div className={classes.copyCentered}>
              <Typography variant="h1" className={classes.chainListSpacing}>
                <span className={classes.helpingUnderline}>Chainlist</span>
              </Typography>
              <Typography variant="h2" className={classes.helpingParagraph}>
                Helping users connect to EVM powered networks
              </Typography>
              <Typography className={classes.subTitle}>
                Chainlist is a list of EVM networks. Users can use the information to connect their wallets and Web3
                middleware providers to the appropriate Chain ID and Network ID to connect to the correct chain.
              </Typography>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className={classes.addNetworkButton}
                onClick={addNetwork}
                endIcon={<AddIcon />}
              >
                <Typography className={classes.buttonLabel}>Add Your Network</Typography>
              </Button>
              <div className={classes.socials}>
                <a
                  className={`${classes.socialButton}`}
                  href="https://github.com/DefiLlama/chainlist"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill={'#2F80ED'}
                      d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                    />
                  </svg>
                  <Typography variant="body1" className={classes.sourceCode}>
                    View Source Code
                  </Typography>
                </a>
                <Typography variant="subtitle1" className={classes.version}>
                  Version 1.0.7
                </Typography>
              </div>
            </div>
          </div>
          <div className={theme.palette.type === 'dark' ? classes.listContainerDark : classes.listContainer}>
            <div className={theme.palette.type === 'dark' ? classes.headerContainerDark : classes.headerContainer}>
              <div className={classes.filterRow}>
                <ThemeProvider theme={searchTheme}>
                  <Paper className={classes.searchPaper}>
                    <TextField
                      fullWidth
                      className={classes.searchContainer}
                      variant="outlined"
                      placeholder="ETH, Fantom, ..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon fontSize="small" />
                          </InputAdornment>
                        ),
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography className={classes.searchInputAdnornment}>Search Networks</Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Paper>
                </ThemeProvider>
              </div>
              <Header changeTheme={changeTheme} testnets={testnets} toggleTestnets={toggleTestnets} />
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default withTheme(Layout);
