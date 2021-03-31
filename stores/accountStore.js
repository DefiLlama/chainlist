import {
  ERROR,
  STORE_UPDATED,
  CONFIGURE,
  ACCOUNT_CONFIGURED,
  ACCOUNT_CHANGED,
  TRY_CONNECT_WALLET,
} from './constants';

import stores from './'

import Web3 from 'web3';

class Store {
  constructor(dispatcher, emitter) {

    this.dispatcher = dispatcher
    this.emitter = emitter

    this.store = {
      account: null,
      web3: null,
    }

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case CONFIGURE:
            this.configure(payload);
            break;
          case TRY_CONNECT_WALLET:
            this.tryConnectWallet(payload)
            break;
          default: {
          }
        }
      }.bind(this)
    );
  }

  getStore(index) {
    return(this.store[index]);
  };

  setStore(obj) {
    this.store = {...this.store, ...obj}
    return this.emitter.emit(STORE_UPDATED);
  };

  configure = async () => {
    // if (window.ethereum) {
    //   window.web3 = new Web3(ethereum);
    //   try {
    //     await ethereum.enable();
    //     var accounts= await web3.eth.getAccounts();
    //     this.setStore({ account: { address: accounts[0] }, web3: window.web3 })
    //     this.emitter.emit(ACCOUNT_CONFIGURED)
    //   } catch (error) {
    //     // User denied account access...
    //   }
    //
    //   this.updateAccount()
    //
    // } else if (window.web3) {
    //   window.web3 = new Web3(web3.currentProvider);
    //   // Acccounts always exposed
    //   web3.eth.sendTransaction({/* ... */});
    // }
    // // Non-dapp browsers...
    // else {
    //   console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    // }
  };

  updateAccount = () => {
    const that = this
    const res = window.ethereum.on('accountsChanged', function (accounts) {
      that.setStore({ account: { address: accounts[0] } })
      that.emitter.emit(ACCOUNT_CHANGED)
      that.emitter.emit(ACCOUNT_CONFIGURED)
    })
  }

  getWeb3Provider = async () => {
    let web3context = this.getStore('web3context')
    let provider = null

    if(!web3context) {
      provider = network.providers['1']
    } else {
      provider = web3context.library.provider
    }

    if(!provider) {
      return null
    }
    return new Web3(provider);

  }

  tryConnectWallet = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        await ethereum.enable();
        var accounts= await web3.eth.getAccounts();
        this.setStore({ account: { address: accounts[0] }, web3: window.web3 })
        this.emitter.emit(ACCOUNT_CONFIGURED)
      } catch (error) {
          // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      var accounts= await web3.eth.getAccounts();
      this.setStore({ account: { address: accounts[0] }, web3: window.web3 })
      this.emitter.emit(ACCOUNT_CONFIGURED)
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }
}

export default Store;
