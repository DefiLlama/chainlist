import React, { useState, useEffect, useMemo } from "react";
import { Typography, Paper, Button, Tooltip } from "@material-ui/core";
import classes from "./chain.module.css";
import stores from "../../stores/index.js";
import { getProvider, toK } from "../../utils";
import { ERROR, TRY_CONNECT_WALLET, ACCOUNT_CONFIGURED } from "../../stores/constants";
import Image from "next/image";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Popover from "@material-ui/core/Popover";

export default function Chain({ chain }) {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore("account");
      setAccount(accountStore);
    };

    stores.emitter.on(ACCOUNT_CONFIGURED, accountConfigure);

    const accountStore = stores.accountStore.getStore("account");
    setAccount(accountStore);

    return () => {
      stores.emitter.removeListener(ACCOUNT_CONFIGURED, accountConfigure);
    };
  }, []);

  const toHex = (num) => {
    return "0x" + num.toString(16);
  };

  const addToNetwork = () => {
    if (!(account && account.address)) {
      stores.dispatcher.dispatch({ type: TRY_CONNECT_WALLET });
      return;
    }

    const params = {
      chainId: toHex(chain.chainId), // A 0x-prefixed hexadecimal string
      chainName: chain.name,
      nativeCurrency: {
        name: chain.nativeCurrency.name,
        symbol: chain.nativeCurrency.symbol, // 2-6 characters long
        decimals: chain.nativeCurrency.decimals,
      },
      rpcUrls: chain.rpc,
      blockExplorerUrls: [
        chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url
          ? chain.explorers[0].url
          : chain.infoURL,
      ],
    };

    window.web3.eth.getAccounts((error, accounts) => {
      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [params, accounts[0]],
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          stores.emitter.emit(ERROR, error.message ? error.message : error);
          console.log(error);
        });
    });
  };

  const renderProviderText = () => {
    if (account && account.address) {
      const providerTextList = {
        Metamask: "Add to Metamask",
        imToken: "Add to imToken",
        Wallet: "Add to Wallet",
      };
      return providerTextList[getProvider()];
    } else {
      return "Connect wallet";
    }
  };

  const icon = useMemo(() => {
    return chain.chainSlug ? `https://defillama.com/chain-icons/rsz_${chain.chainSlug}.jpg` : "/unknown-logo.png";
  }, [chain]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  if (!chain) {
    return <div></div>;
  }

  return (
    <Paper elevation={1} className={classes.chainContainer} key={chain.chainId}>
      <div className={classes.chainNameContainer}>
        <Image
          src={icon}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/chains/unknown-logo.png";
          }}
          width={28}
          height={28}
          className={classes.avatar}
        />

        <Tooltip title={chain.name}>
          <Typography variant="h3" className={classes.name} noWrap style={{ marginLeft: "24px" }}>
            <a href={chain.infoURL} target="_blank" rel="noreferrer">
              {chain.name}
            </a>
          </Typography>
        </Tooltip>
      </div>
      <div className={classes.chainInfoContainer}>
        <div className={classes.dataPoint}>
          <Typography variant="subtitle1" color="textSecondary" className={classes.dataPointHeader}>
            ChainID
          </Typography>
          <Typography variant="h5">{chain.chainId}</Typography>
        </div>
        <div className={classes.dataPoint}>
          <Typography variant="subtitle1" color="textSecondary" className={classes.dataPointHeader}>
            Currency
          </Typography>
          <Typography variant="h5">{chain.nativeCurrency ? chain.nativeCurrency.symbol : "none"}</Typography>
        </div>
      </div>
      <div className={classes.addButton}>
        <Button variant="outlined" color="primary" onClick={addToNetwork}>
          {renderProviderText()}
        </Button>
        {chain.tvl && (
          <>
            <Button aria-label="Show chain info" aria-describedby={id} onClick={handleClick}>
              <MoreHorizIcon />
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography className={classes.popover}>{`TVL : $${toK(chain.tvl)}`}</Typography>
            </Popover>
          </>
        )}
      </div>
    </Paper>
  );
}
