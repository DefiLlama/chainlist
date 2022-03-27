import BigNumber from 'bignumber.js';
import { useState, useEffect } from 'react';
import stores from '../stores';
import { ERROR, TRY_CONNECT_WALLET } from '../stores/constants';
import { useTranslation } from 'next-i18next';

// todo: get navigator declared somehow? probably an issue with using nextjs
// function getLang() {
//  if (window.navigator.languages != undefined)
//   return window.navigator.languages[0];
//  else
//   return window.navigator.language;
// }

export function formatCurrency(amount, decimals = 2) {
  if (!isNaN(amount)) {
    const formatter = new Intl.NumberFormat(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return formatter.format(amount);
  } else {
    return 0;
  }
}

export function formatAddress(address, length = 'short') {
  if (address && length === 'short') {
    address = address.substring(0, 6) + '...' + address.substring(address.length - 4, address.length);
    return address;
  } else if (address && length === 'long') {
    address = address.substring(0, 12) + '...' + address.substring(address.length - 8, address.length);
    return address;
  } else {
    return null;
  }
}

export function bnDec(decimals) {
  return new BigNumber(10).pow(parseInt(decimals));
}

export function getProvider() {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    if (window.ethereum.isMetaMask) return 'Metamask';
    if (window.ethereum.isImToken) return 'imToken';
  }
  return 'Wallet';
}

export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const renderProviderText = (account) => {
  const { t } = useTranslation('common');
  if (account && account.address) {
    const providerTextList = {
      Metamask: 'Add to Metamask',
      imToken: 'Add to imToken',
      Wallet: 'Add to Wallet',
    };
    return providerTextList[getProvider()];
  } else {
    return t('connect-wallet');
  }
};

const toHex = (num) => {
  return '0x' + num.toString(16);
};

export const addToNetwork = (account, chain, rpc) => {
  if (!(account && account.address)) {
    stores.dispatcher.dispatch({ type: TRY_CONNECT_WALLET });
    return;
  }

  const params = {
    chainId: toHex(chain.chainId), // A 0x-prefixed hexadecimal string
    chainName: chain.name,
    nativeCurrency: {
      name: chain.nativeCurrency.name,
      symbol: chain.nativeCurrency.symbol, // 2-6 characters long
      decimals: chain.nativeCurrency.decimals,
    },
    rpcUrls: rpc ? [rpc] : chain.rpc,
    blockExplorerUrls: [
      chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url ? chain.explorers[0].url : chain.infoURL,
    ],
  };

  window.web3.eth.getAccounts((error, accounts) => {
    window.ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: [params, accounts[0]],
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        stores.emitter.emit(ERROR, error.message ? error.message : error);
        console.log(error);
      });
  });
};
