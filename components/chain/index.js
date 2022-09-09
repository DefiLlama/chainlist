import React, { useEffect, useMemo } from "react";
import {
  Typography,
  Paper,
  Button,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import classes from "./chain.module.css";
import stores, { useAccount, useChain } from "../../stores/index.js";
import { ACCOUNT_CONFIGURED } from "../../stores/constants/constants";
import Image from "next/image";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RPCList from "../RPCList";
import { addToNetwork, renderProviderText } from "../../utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslations } from "next-intl";

const ExpandButton = withStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "12px",
    marginBottom: "-24px",
  },
}))(Button);

export default function Chain({ chain, buttonOnly }) {
  const t = useTranslations("Common");
  const account = useAccount((state) => state.account);
  const setAccount = useAccount((state) => state.setAccount);

  const router = useRouter();

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

  const icon = useMemo(() => {
    return chain.chainSlug
      ? `https://defillama.com/chain-icons/rsz_${chain.chainSlug}.jpg`
      : "/unknown-logo.png";
  }, [chain]);

  const chainId = useChain((state) => state.id);
  const updateChain = useChain((state) => state.updateChain);

  const handleClick = () => {
    if (chain.chainId === chainId) {
      updateChain(null);
    } else {
      updateChain(chain.chainId);
    }
  };

  const showAddlInfo = chain.chainId === chainId;

  if (!chain) {
    return <div></div>;
  }

  if (buttonOnly) {
    return (
      <Button
        variant="outlined"
        color="primary"
        onClick={() => addToNetwork(account, chain)}
      >
        {renderProviderText(account)}
      </Button>
    );
  }

  return (
    <>
      <Paper
        elevation={1}
        className={classes.chainContainer}
        key={chain.chainId}
      >
        <div className={classes.chainNameContainer}>
          <div className={classes.avatar}>
            <Image
              src={icon}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/chains/unknown-logo.png";
              }}
              width={26}
              height={26}
              alt={chain.name + " logo"}
            />
          </div>

          <Tooltip title={chain.name}>
            <span className={classes.name}>
              <Link href={`/chain/${chain.chainId}`}>{chain.name}</Link>
            </span>
          </Tooltip>
        </div>
        <div className={classes.chainInfoContainer}>
          <div className={classes.dataPoint}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.dataPointHeader}
            >
              ChainID
            </Typography>
            <Typography variant="h5">{chain.chainId}</Typography>
          </div>
          <div className={classes.dataPoint}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.dataPointHeader}
            >
              {t("currency")}
            </Typography>
            <Typography variant="h5">
              {chain.nativeCurrency ? chain.nativeCurrency.symbol : "none"}
            </Typography>
          </div>
        </div>
        <div className={classes.addButton}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => addToNetwork(account, chain)}
          >
            {t(renderProviderText(account))}
          </Button>
        </div>
        {router.pathname === "/" && (
          <ExpandButton onClick={handleClick}>
            <span className={classes.visuallyHidden}>
              Show RPC List of {chain.name}
            </span>
            <ExpandMoreIcon
              style={{
                transform: showAddlInfo ? "rotate(180deg)" : "",
                transition: "all 0.2s ease",
              }}
            />
          </ExpandButton>
        )}
      </Paper>
      {showAddlInfo && <RPCList chain={chain} />}
    </>
  );
}
