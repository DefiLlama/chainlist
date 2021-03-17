import { Typography, Paper, Grid, Button } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
import { useRouter } from 'next/router'
import Web3 from 'web3';

import classes from './chain.module.css'

import stores from '../../stores/index.js'

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
    if (typeof window !== "undefined") {
      if (window.ethereum.isMetaMask) return 'Add to Metamask'
      if (window.ethereum.isImToken) return 'Add to imToken'
    }
    return 'Add to Wallet'
  }

  if(!chain) {
    return <div></div>
  }

  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={ chain.chainId } >
      <Paper elevation={ 2 } className={ classes.chainContainer }>
        <Typography variant='h2' className={ classes.name }>{ chain.name }</Typography>
        <div className={ classes.dataPoint }>
          <Typography variant='subtitle1' color='textSecondary'>ChainID</Typography>
          <Typography variant='h5'>{ chain.chainId }</Typography>
        </div>
        <div>
          <Typography variant='subtitle1' color='textSecondary'>Currency</Typography>
          <Typography variant='h5'>{ chain.nativeCurrency ? chain.nativeCurrency.symbol : 'none' }</Typography>
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
