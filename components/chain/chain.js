import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid, Button, Tooltip } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
import { useRouter } from 'next/router'
import Web3 from 'web3';

import classes from './chain.module.css'

import stores from '../../stores/index.js'
import { getProvider } from '../../utils'

import {
  ERROR,
  CONNECT_WALLET,
  TRY_CONNECT_WALLET,
  ACCOUNT_CONFIGURED
} from '../../stores/constants'

export default function Chain({ chain }) {
  const router = useRouter()

  const [ account, setAccount ] = useState(null)

  useEffect(() => {
    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore('account')
      setAccount(accountStore)
    }

    stores.emitter.on(ACCOUNT_CONFIGURED, accountConfigure)

    const accountStore = stores.accountStore.getStore('account')
    setAccount(accountStore)

    return () => {
      stores.emitter.removeListener(ACCOUNT_CONFIGURED, accountConfigure)
    }
  }, [])

  const toHex = (num) => {
    return '0x'+num.toString(16)
  }

  const addToNetwork = () => {
    if(!(account && account.address)) {
      stores.dispatcher.dispatch({ type: TRY_CONNECT_WALLET })
      return
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
      blockExplorerUrls: [ ((chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url) ? chain.explorers[0].url : chain.infoURL) ]
    }

    window.web3.eth.getAccounts((error, accounts) => {
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [params, accounts[0]],
      })
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        stores.emitter.emit(ERROR, error.message ? error.message : error)
        console.log(error)
      });
    })
  }

  const renderProviderText = () => {

    if(account && account.address) {
      const providerTextList = {
        Metamask: 'Add to Metamask',
        imToken: 'Add to imToken',
        Wallet: 'Add to Wallet'
      }
      return providerTextList[getProvider()]
    } else {
      return 'Connect wallet'
    }

  }

  if(!chain) {
    return <div></div>
  }

  return (
    <Paper elevation={ 1 } className={ classes.chainContainer } key={ chain.chainId }>
      <div className={ classes.chainNameContainer }>
        <img
          src='/connectors/icn-asd.svg'
          onError={e => {
            e.target.onerror = null;
            e.target.src = "/chains/unknown-logo.png";
          }}
          width={ 28 }
          height={ 28 }
          className={ classes.avatar }
        />
        <Tooltip title={ chain.name }>
          <Typography variant='h3' className={ classes.name } noWrap>
            <a href={ chain.infoURL } target="_blank" rel="noreferrer">
              { chain.name }
            </a>
          </Typography>
        </Tooltip>
      </div>
      <div className={ classes.chainInfoContainer }>
        <div className={ classes.dataPoint }>
          <Typography variant='subtitle1' color='textSecondary' className={ classes.dataPointHeader} >ChainID</Typography>
          <Typography variant='h5'>{ chain.chainId }</Typography>
        </div>
        <div className={ classes.dataPoint }>
          <Typography variant='subtitle1' color='textSecondary' className={ classes.dataPointHeader}>Currency</Typography>
          <Typography variant='h5'>{ chain.nativeCurrency ? chain.nativeCurrency.symbol : 'none' }</Typography>
        </div>
      </div>
      <div className={ classes.addButton }>
        <Button
          variant='outlined'
          color='primary'
          onClick={ addToNetwork }
        >
          { renderProviderText() }
        </Button>
      </div>
    </Paper>
  )
}
