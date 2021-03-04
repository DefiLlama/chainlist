import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
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

export default function Home(props) {
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


export const getServerSideProps = async () => {

  try {
    const chainsResponse = await fetch('https://chainid.network/chains.json')
    const chainsJson = await chainsResponse.json()

    return {
      props: {
        chains: chainsJson
      }
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
