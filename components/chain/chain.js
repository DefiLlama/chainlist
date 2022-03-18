import React, { useEffect, useMemo } from 'react';
import { Typography, Paper, Button, Tooltip, withStyles } from '@material-ui/core';
import classes from './chain.module.css';
import stores, { useAccount, useChain } from '../../stores/index.js';
import { ACCOUNT_CONFIGURED } from '../../stores/constants';
import Image from 'next/image';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RPCList from '../RPCList';
import { addToNetwork, renderProviderText } from '../../utils';

const ExpandButton = withStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '12px',
    marginBottom: '-24px',
  },
}))(Button);

export default function Chain({ chain }) {
  const account = useAccount((state) => state.account);
  const setAccount = useAccount((state) => state.setAccount);

  useEffect(() => {
    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore('account');
      setAccount(accountStore);
    };

    stores.emitter.on(ACCOUNT_CONFIGURED, accountConfigure);

    const accountStore = stores.accountStore.getStore('account');
    setAccount(accountStore);

    return () => {
      stores.emitter.removeListener(ACCOUNT_CONFIGURED, accountConfigure);
    };
  }, []);

  const icon = useMemo(() => {
    return chain.chainSlug ? `https://defillama.com/chain-icons/rsz_${chain.chainSlug}.jpg` : '/unknown-logo.png';
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

  return (
    <>
      <Paper elevation={1} className={classes.chainContainer} key={chain.chainId}>
        <div className={classes.chainNameContainer}>
          <Image
            src={icon}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/chains/unknown-logo.png';
            }}
            width={28}
            height={28}
            className={classes.avatar}
          />

          <Tooltip title={chain.name}>
            <Typography variant="h3" className={classes.name} noWrap style={{ marginLeft: '24px' }}>
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
            <Typography variant="h5">{chain.nativeCurrency ? chain.nativeCurrency.symbol : 'none'}</Typography>
          </div>
        </div>
        <div className={classes.addButton}>
          <Button variant="outlined" color="primary" onClick={() => addToNetwork(account, chain)}>
            {renderProviderText(account)}
          </Button>
        </div>
        <ExpandButton onClick={handleClick}>
          <ExpandMoreIcon style={{ transform: showAddlInfo ? 'rotate(180deg)' : '', transition: 'all 0.2s ease' }} />
        </ExpandButton>
      </Paper>
      {showAddlInfo && <RPCList chain={chain} />}
    </>
  );
}
