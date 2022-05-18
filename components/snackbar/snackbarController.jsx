import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

import Snackbar from './snackbar.jsx'

import {
  ERROR,
  TX_SUBMITTED,
} from '../../stores/constants'

import stores from "../../stores";
const emitter = stores.emitter

const styles = theme => ({
  root: {

  },
});

class SnackbarController extends Component {

  constructor(props) {
    super()

    this.state = {
      open: false,
      snackbarType: null,
      snackbarMessage: null
    }
  }

  componentDidMount() {
    emitter.on(ERROR, this.showError);
    emitter.on(TX_SUBMITTED, this.showHash);
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR, this.showError);
    emitter.removeListener(TX_SUBMITTED, this.showHash);
  };

  showError = (error) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null, open: false }
    this.setState(snackbarObj)

    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: error.toString(), snackbarType: 'Error', open: true }
      that.setState(snackbarObj)
    })
  }

  showHash = (txHash) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null, open: false }
    this.setState(snackbarObj)

    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: txHash, snackbarType: 'Hash', open: true }
      that.setState(snackbarObj)
    })
  }

  render() {
    const {
      snackbarType,
      snackbarMessage,
      open
    } = this.state

    if(open) {
      return <Snackbar type={ snackbarType } message={ snackbarMessage } open={ true } />
    } else {
      return <div></div>
    }

  };
}

export default withStyles(styles)(SnackbarController);
