import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import SnackbarController from '../components/snackbar';

import stores from '../stores/index.js';

import { CONFIGURE } from '../stores/constants';

import '../styles/globals.css';

import lightTheme from '../theme/light';
import darkTheme from '../theme/dark';

import { useRouter } from 'next/router';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  const [themeConfig, setThemeConfig] = useState(lightTheme);
  const router = useRouter();

  const changeTheme = (dark) => {
    setThemeConfig(dark ? darkTheme : lightTheme);
    localStorage.setItem('yearn.finance-dark-mode', dark ? 'dark' : 'light');
  };

  useEffect(function () {
    const localStorageDarkMode = window.localStorage.getItem('yearn.finance-dark-mode');
    changeTheme(localStorageDarkMode ? localStorageDarkMode === 'dark' : false);
  }, []);

  useEffect(function () {
    stores.dispatcher.dispatch({ type: CONFIGURE });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeConfig}>
        <CssBaseline />
        <Component {...pageProps} changeTheme={changeTheme} />
        <SnackbarController />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
