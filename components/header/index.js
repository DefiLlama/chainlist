import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  Typography,
  Switch,
  Button,
  Paper,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import {
  withStyles,
  withTheme,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import SearchIcon from "@material-ui/icons/Search";

import {
  CONNECT_WALLET,
  TRY_CONNECT_WALLET,
  ACCOUNT_CONFIGURED,
} from "../../stores/constants/constants";

import stores, { useSearch, useTestnets } from "../../stores";
import { formatAddress, getProvider, useDebounce } from "../../utils";

import classes from "./header.module.css";
import { useTranslations } from "next-intl";

const StyledSwitch = withStyles((theme) => ({
  root: {
    width: 58,
    height: 32,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(28px)",
      color: "#212529",
      "& + $track": {
        backgroundColor: "#ffffff",
        opacity: 1,
      },
    },
    "&$focusVisible $thumb": {
      color: "#ffffff",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 32 / 2,
    border: `1px solid #212529`,
    backgroundColor: "#212529",
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const searchTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#2F80ED",
    },
  },
  shape: {
    borderRadius: "10px",
  },
  typography: {
    fontFamily: [
      "Inter",
      "Arial",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    body1: {
      fontSize: "12px",
    },
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        "box-shadow": "0px 7px 7px #0000000A;",
        "-webkit-box-shadow": "0px 7px 7px #0000000A;",
        "-moz-box-shadow": "0px 7px 7px #0000000A;",
      },
    },
    MuiInputBase: {
      input: {
        fontSize: "14px",
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: "12.5px 14px",
      },
      notchedOutline: {
        borderColor: "#FFF",
      },
    },
  },
});

const TestnetSwitch = withStyles({
  switchBase: {
    "&$checked": {
      color: "#2f80ed",
    },
  },
  checked: {},
  track: {},
})(Switch);

function Header(props) {
  const t = useTranslations("Common");
  const [account, setAccount] = useState(null);
  const [darkMode, setDarkMode] = useState(
    props.theme.palette.type === "dark" ? true : false
  );

  useEffect(() => {
    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore("account");
      setAccount(accountStore);
    };
    const connectWallet = () => {
      onAddressClicked();
      stores.dispatcher.dispatch({ type: TRY_CONNECT_WALLET });
    };

    stores.emitter.on(ACCOUNT_CONFIGURED, accountConfigure);
    stores.emitter.on(CONNECT_WALLET, connectWallet);

    const accountStore = stores.accountStore.getStore("account");
    setAccount(accountStore);

    return () => {
      stores.emitter.removeListener(ACCOUNT_CONFIGURED, accountConfigure);
      stores.emitter.removeListener(CONNECT_WALLET, connectWallet);
    };
  }, []);

  const handleToggleChange = (event, val) => {
    setDarkMode(val);
    props.changeTheme(val);
  };

  const onAddressClicked = () => {
    stores.dispatcher.dispatch({ type: TRY_CONNECT_WALLET });
  };

  const renderProviderLogo = () => {
    const providerLogoList = {
      "Coinbase Wallet": "coinbase",
      "Brave Wallet": "bravewallet",
      Metamask: "metamask",
      imToken: "imtoken",
      Wallet: "metamask",
    };
    return providerLogoList[getProvider()];
  };

  useEffect(function () {
    const localStorageDarkMode = window.localStorage.getItem(
      "yearn.finance-dark-mode"
    );
    setDarkMode(localStorageDarkMode ? localStorageDarkMode === "dark" : false);
  }, []);

  const testnets = useTestnets((state) => state.testnets);
  const handleSearch = useSearch((state) => state.handleSearch);
  const toggleTestnets = useTestnets((state) => state.toggleTestnets);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm);
    } else {
      handleSearch("");
    }
  }, [debouncedSearchTerm]);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.search) {
      setSearchTerm(router.query.search);
      delete router.query.search;
    }
  }, [router.isReady]);

  return (
    <div
      className={
        props.theme.palette.type === "dark"
          ? classes.headerContainerDark
          : classes.headerContainer
      }
    >
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
                    <Typography className={classes.searchInputAdnornment}>
                      {t("search-networks")}
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Paper>
        </ThemeProvider>
      </div>

      <div className={classes.switchContainer}>
        <label className={classes.label}>
          <TestnetSwitch checked={testnets} onChange={toggleTestnets} />
          <span>Testnets</span>
        </label>
        <div className={classes.themeSelectContainer}>
          <StyledSwitch
            icon={<Brightness2Icon className={classes.switchIcon} />}
            checkedIcon={<WbSunnyOutlinedIcon className={classes.switchIcon} />}
            checked={darkMode}
            onChange={handleToggleChange}
          />
        </div>
      </div>

      <Button
        disableElevation
        className={classes.accountButton}
        variant="contained"
        color="secondary"
        onClick={onAddressClicked}
      >
        {account && account.address && (
          <div
            className={`${classes.accountIcon} ${
              classes[renderProviderLogo()]
            }`}
          ></div>
        )}
        <Typography variant="h5">
          <Typography className={classes.searchInputAdnornment}>
            {account && account.address
              ? formatAddress(account.address)
              : t("connect-wallet")}
          </Typography>
        </Typography>
      </Button>
    </div>
  );
}

export default withTheme(Header);
