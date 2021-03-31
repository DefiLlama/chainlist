import { Typography, Paper, Grid, Button } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
import { useRouter } from 'next/router'
import Web3 from 'web3';

import classes from './chain.module.css'

import stores from '../../stores/index.js'
import { getProvider } from '../../utils'

import {
  ERROR,
} from '../../stores/constants'

export default function Chain({ chain }) {
  const router = useRouter()

  const toHex = (num) => {
    return '0x'+num.toString(16)
  }

  const addToNetwork = () => {

    const params = {
      chainId: toHex(chain.chainId), // A 0x-prefixed hexadecimal string
      chainName: chain.name,
      nativeCurrency: {
        name: chain.nativeCurrency.name,
        symbol: chain.nativeCurrency.symbol, // 2-6 characters long
        decimals: chain.nativeCurrency.decimals,
      },
      rpcUrls: chain.rpc
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
    const providerTextList = {
      Metamask: 'Add to Metamask',
      imToken: 'Add to imToken',
      Wallet: 'Add to Wallet'
    }
    return providerTextList[getProvider()]
  }

  if(!chain) {
    return <div></div>
  }

  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={4} key={ chain.chainId } >
      <Paper elevation={ 1 } className={ classes.chainContainer }>
        <div className={ classes.chainNameContainer }>
          <img src='/connectors/icn-imtoken.svg' width={ 28 } height={ 28 } className={ classes.avatar } />
          <Typography variant='h3' className={ classes.name } noWrap>{ chain.name }</Typography>
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
    </Grid>
  )
}
