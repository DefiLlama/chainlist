import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  CircularProgress
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import {
  Web3ReactProvider,
  useWeb3React,
} from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import {
  ERROR,
  CONNECTION_DISCONNECTED,
  CONNECTION_CONNECTED,
  CONFIGURE,
} from '../../stores/constants'

import stores from '../../stores'

const styles = theme => ({
  root: {
    flex: 1,
    height: 'auto',
    display: 'flex',
    position: 'relative'
  },
  contentContainer: {
    margin: 'auto',
    textAlign: 'center',
    padding: '12px',
    display: 'flex',
    flexWrap: 'wrap'
  },
  cardContainer: {
    marginTop: '60px',
    minHeight: '260px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  unlockCard: {
    padding: '24px'
  },
  buttonText: {
    marginLeft: '12px',
    fontWeight: '700',
  },
  instruction: {
    maxWidth: '400px',
    marginBottom: '32px',
    marginTop: '32px'
  },
  actionButton: {
    padding: '12px',
    backgroundColor: 'white',
    borderRadius: '3rem',
    border: '1px solid #E1E1E1',
    fontWeight: 500,
    [theme.breakpoints.up('md')]: {
      padding: '15px',
    }
  },
  connect: {
    width: '100%'
  },
  closeIcon: {
    position: 'absolute',
    right: '-8px',
    top: '-8px',
    cursor: 'pointer'
  }
});

class Unlock extends Component {

  constructor(props) {
    super()

    this.state = {
      loading: false,
      error: null
    }
  }

  componentWillMount() {
    stores.emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    stores.emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    stores.emitter.on(ERROR, this.error);
  };

  componentWillUnmount() {
    stores.emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    stores.emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    stores.emitter.removeListener(ERROR, this.error);
  };

  error = (err) => {
    this.setState({ loading: false, error: err })
  };

  connectionConnected = () => {

    if(this.props.closeModal != null) {
      this.props.closeModal()
    }
  }

  connectionDisconnected = () => {
    if(this.props.closeModal != null) {
      this.props.closeModal()
    }
  }

  render() {
    const { classes, closeModal } = this.props;

    return (
      <div className={ classes.root }>
        <div className={ classes.closeIcon } onClick={ closeModal }><CloseIcon /></div>
        <div className={ classes.contentContainer }>
          <Web3ReactProvider getLibrary={getLibrary}>
            <MyComponent closeModal={ closeModal} />
          </Web3ReactProvider>
        </div>
      </div>
    )
  };
}

function getLibrary(provider) {

  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function onConnectionClicked(currentConnector, name, setActivatingConnector, activate) {
  const connectorsByName = stores.accountStore.getStore('connectorsByName')
  setActivatingConnector(currentConnector);
  activate(connectorsByName[name]);
}

function onDeactivateClicked(deactivate, connector) {
  if(deactivate) {
    deactivate()
  }
  if(connector && connector.close) {
    connector.close()
  }
  stores.accountStore.setStore({ account: { }, web3context: null })
  stores.emitter.emit(CONNECTION_DISCONNECTED)
}

function MyComponent(props) {

  const context = useWeb3React();
  const localContext = stores.accountStore.getStore('web3context');
  var localConnector = null;
  if (localContext) {
    localConnector = localContext.connector
  }
  const {
    connector,
    library,
    account,
    activate,
    deactivate,
    active,
    error
  } = context;
  var connectorsByName = stores.accountStore.getStore('connectorsByName')

  const { closeModal } = props

  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  React.useEffect(() => {
    if (account && active && library) {
      stores.accountStore.setStore({ account: { address: account }, web3context: context })
      stores.emitter.emit(CONNECTION_CONNECTED)
    }
  }, [account, active, closeModal, context, library]);

  const width = window.innerWidth

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: (width > 576 ? 'space-between' : 'center'), alignItems: 'center' }}>
      {Object.keys(connectorsByName).map(name => {
        const currentConnector = connectorsByName[name];
        const activating = currentConnector === activatingConnector;
        const connected = (currentConnector === connector||currentConnector === localConnector);
        const disabled =
           !!activatingConnector || !!error;

        let url;
        let display = name;
        let descriptor = ''
        if (name === 'MetaMask') {
          url = '/connectors/icn-metamask.svg'
          descriptor= 'Connect to your MetaMask wallet'
        } else if (name === 'WalletConnect') {
          url = '/connectors/walletConnectIcon.svg'
          descriptor= 'Scan with WalletConnect to connect'
        } else if (name === 'TrustWallet') {
          url = '/connectors/trustWallet.png'
          descriptor= 'Connect to your TrustWallet'
        } else if (name === 'Portis') {
          url = '/connectors/portisIcon.png'
          descriptor= 'Connect with your Portis account'
        } else if (name === 'Fortmatic') {
          url = '/connectors/fortmaticIcon.png'
          descriptor= 'Connect with your Fortmatic account'
        } else if (name === 'Ledger') {
          url = '/connectors/icn-ledger.svg'
          descriptor= 'Connect with your Ledger Device'
        } else if (name === 'Squarelink') {
          url = '/connectors/squarelink.png'
          descriptor= 'Connect with your Squarelink account'
        } else if (name === 'Trezor') {
          url = '/connectors/trezor.png'
          descriptor= 'Connect with your Trezor Device'
        } else if (name === 'Torus') {
          url = '/connectors/torus.jpg'
          descriptor= 'Connect with your Torus account'
        } else if (name === 'Authereum') {
          url = '/connectors/icn-aethereum.svg'
          descriptor= 'Connect with your Authereum account'
        } else if (name === 'WalletLink') {
          display = 'Coinbase Wallet'
          url = '/connectors/coinbaseWalletIcon.svg'
          descriptor= 'Connect to your Coinbase wallet'
        } else if (name === 'Frame') {
          return ''
        }

        return (
          <div key={name} style={{ padding: '0px', display: 'flex', margin: (width > 576 ? '12px 0px' : '0px') }}>
            <Button style={ {
                width: ( width > 576 ? '350px' : 'calc(100vw - 100px)'),
                height: '160px'
              } }
              variant='contained'
              onClick={() => {
                onConnectionClicked(currentConnector, name, setActivatingConnector, activate)
              }}
              disableElevation
              color='secondary'
              disabled={ disabled }>
              <div style={{
                height: '130px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly'
              }}>
                <img style={{
                    width: '40px',
                    height: '40px'
                  }} src={url} alt=""/>
                <Typography variant={ 'h2'}>
                  { display }
                </Typography>
                <Typography variant={ 'body2'}>
                  { descriptor }
                </Typography>
                { activating && <CircularProgress size={ 15 } style={{marginRight: '10px'}} /> }
                { (!activating && connected) && <div style={{ background: '#4caf50', borderRadius: '10px', width: '10px', height: '10px', marginRight: '10px' }}></div> }
              </div>
            </Button>
          </div>
        )
      }) }
    </div>
  )

}

export default withStyles(styles)(Unlock);
