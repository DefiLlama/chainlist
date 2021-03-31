import React, { useState } from 'react';
import { Typography, Paper, Grid, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Web3 from 'web3';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';

import classes from './multichain.module.css'

import stores from '../../stores/index.js'
import { getProvider } from '../../utils'

export default function Multichain({ closeMultichain }) {

  const [ checked, setChecked ] = useState(false)

  const navigateToMultichain = () => {
    window.open("https://multichain.xyz", "_blank")
  }

  const handleChange = () => {
    setChecked(!checked)
  }

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      secondary: {
        main: '#fff'
      }
    },
    typography: {
      fontFamily: [
        'Inter',
        'Arial',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      body1: {
        fontSize: '12px'
      }
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: '32px',
          padding: '9px 16px'
        },
        containedPrimary: {
          backgroundColor: '#fff',
          color: '#000'
        }
      },
      MuiFormControlLabel: {
        root: {
          color: '#fff'
        }
      }
    },
  });

  return (
    <Paper elevation={ 1 } className={ classes.chainContainer } key={ 'multichain' } >
      <ThemeProvider theme={theme}>
        <div className={ classes.topInfo }>
          <img src='/multichain-logo.png' width={ 126 } height={ 126 } className={ classes.avatar } />
          <Typography variant='subtitle1' className={ classes.descriptionText} align='center' >Manage over 120 tokens and multi-chain assets with fully supported cross chain transactions.</Typography>
          <Button
            className={ classes.tryButton }
            variant='contained'
            disableElevation
            onClick={ navigateToMultichain }
            color='secondary'
            endIcon={<ArrowForwardIcon />}
          >
            <Typography className={ classes.buttonLabel }>Try out <b>multichain.xyz</b></Typography>
          </Button>
        </div>
        <div className={ classes.bottomActions }>
          <FormControlLabel
            control={<Checkbox checked={ checked } onChange={handleChange} name="checked" />}
            label="Don't show again"
          />
          <Button
            size='small'
            onClick={ () => { closeMultichain(checked) } }
            endIcon={<CloseIcon />}
          >
            <Typography className={ classes.buttonLabel }>Close</Typography>
          </Button>
        </div>
      </ThemeProvider>
    </Paper>
  )
}
