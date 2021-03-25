import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { withTheme } from '@material-ui/core/styles';
import path from 'path'
import {
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment
} from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Chain from '../components/chain'

import SearchIcon from '@material-ui/icons/Search';
import AppsIcon from '@material-ui/icons/Apps';
import ListIcon from '@material-ui/icons/List';

import classes from './index.module.css'

function Home(props) {
  const [ layout, setLayout ] = useState('grid')
  const [ search, setSearch ] = useState('')

  const onSearchChanged = (event) => {
    setSearch(event.target.value)
  }

  const handleLayoutChanged = (event, newVal) => {
    if(newVal !== null) {
      setLayout(newVal)
      localStorage.setItem('yearn.finance-invest-layout', newVal ? newVal : '')
    }
  }

  const addNetwork = () => {
    window.open('https://github.com/ethereum-lists/chains', '_blank')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Chainlist</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <div className={ classes.container }>
          <div className={ classes.copyContainer }>
            <Typography variant='h1' className={ classes.chainListSpacing }>Chainlist</Typography>
            <Typography variant='h4' className={ classes.helpignParagraph }><span className={ classes.helpingUnderline }>Helping users</span> connect to EVM powered networks</Typography>
            <Typography variant='h5'>Chainlist is a list of EVM networks. Users can use the information to connect their wallets and Web3 middleware providers to the appropriate Chain ID and Network ID to connect to the correct chain.</Typography>
            <Button
              color='primary'
              variant='contained'
              className={ classes.addNetworkButton }
              onClick={ addNetwork }
            >
              Add Your Network
            </Button>
            <div className={ classes.socials }>
              <a className={ `${classes.socialButton}` } href='https://github.com/antonnell/networklist-org.git' target='_blank' rel="noopener noreferrer" >
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                  <path fill={ '#2F80ED' } d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                </svg>
                <Typography variant='subtitle1' className={ classes.sourceCode }>View Source Code</Typography>
              </a>
              <Typography variant='subtitle1' className={ classes.version }>Version 1.0.2</Typography>
            </div>
          </div>
          <Grid container spacing={4} className={ classes.listContainer }>
            <div className={ classes.filterRow }>
              <TextField
                className={ classes.searchContainer }
                variant="outlined"
                placeholder="ETH, Fantom, ..."
                value={ search }
                onChange={ onSearchChanged }
                InputProps={{
                  startAdornment: <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>,
                }}
              />
              {/*<ToggleButtonGroup className={ classes.layoutToggleButtons } value={ layout } onChange={ handleLayoutChanged } exclusive >
                <ToggleButton className={ classes.layoutToggleButton } value={ 'grid' }>
                  <AppsIcon />
                </ToggleButton>
                <ToggleButton className={ classes.layoutToggleButton } value={ 'list' }>
                  <ListIcon />
                </ToggleButton>
            </ToggleButtonGroup>*/}
            </div>
            {
              props.chains.filter((chain) => {
                if(search === '') {
                  return true
                } else {
                  //filter
                  return (chain.chain.toLowerCase().includes(search.toLowerCase()) ||
                  chain.chainId.toString().toLowerCase().includes(search.toLowerCase()) ||
                  chain.name.toLowerCase().includes(search.toLowerCase()) ||
                  (chain.nativeCurrency ? chain.nativeCurrency.symbol : '').toLowerCase().includes(search.toLowerCase()))
                }
              }).map((chain) => {
                return <Chain chain={ chain } />
              })
            }
          </Grid>
        </div>
      </main>
    </div>
  )
}

export default withTheme(Home)

export const getStaticProps  = async () => {

  try {
    const chainsResponse = await fetch('https://chainid.network/chains.json')
    const chainsJson = await chainsResponse.json()

    return {
      props: {
        chains: chainsJson
      },
      revalidate: 60,
    }
  } catch (ex) {
    return {
      props: {
        chains: []
      }
    }
  }

}
//
// export const getStaticProps = async () => {
//
//   try {
//
//
//     const chainsDirectory = path.join(process.cwd(), '/public/chains')
//     const filenames = await fs.readdir(chainsDirectory)
//
//     const chains = filenames.map(async (filename) => {
//       try {
//         const filePath = path.join(chainsDirectory, filename)
//         const fileContents = await fs.readFile(filePath, 'utf8')
//         const fileContentsJson = JSON.parse(fileContents)
//         return {
//           filename,
//           content: fileContentsJson,
//         }
//       } catch(ex) {
//         return null
//       }
//
//     })
//
//     return {
//       props: {
//         chains: await Promise.all(chains),
//       },
//     }
//   } catch (ex) {
//     console.log(ex)
//     return {
//       props: {
//         chains: []
//       }
//     }
//   }
//
// }
