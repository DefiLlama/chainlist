import { useState, useEffect } from "react";
import allExtraRpcs from "../constants/extraRpcs.js";
import chainIds from "../constants/chainIds.json";
import en from "../translations/en.json";
import zh from "../translations/zh.json";

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

export function formatAddress(address, length = "short") {
  if (address && length === "short") {
    address = address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length);
    return address;
  } else if (address && length === "long") {
    address = address.substring(0, 12) + "..." + address.substring(address.length - 8, address.length);
    return address;
  } else {
    return null;
  }
}

export function getProvider() {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    if (window.ethereum.isCoinbaseWallet || window.ethereum.selectedProvider?.isCoinbaseWallet)
      return "Coinbase Wallet";
    if (window.ethereum.isBraveWallet) return "Brave Wallet";
    if (window.ethereum.isMetaMask) return "Metamask";
    if (window.ethereum.isImToken) return "imToken";
    if (window.ethereum.isTrust) return "Trust Wallet";
  }
  return "Wallet";
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
    [value, delay], // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const renderProviderText = (address) => {
  if (address) {
    const providerTextList = {
      Metamask: "add-to-metamask",
      imToken: "add-to-imToken",
      Wallet: "add-to-wallet",
      "Brave Wallet": "add-to-brave",
      "Coinbase Wallet": "add-to-coinbase",
      "Trust Wallet": "add-to-trust",
    };
    return providerTextList[getProvider()];
  } else {
    return "connect-wallet";
  }
};

function removeEndingSlashObject(rpc) {
  if (typeof rpc === "string") {
    return {
      url: removeEndingSlash(rpc),
    };
  } else {
    return {
      ...rpc,
      url: removeEndingSlash(rpc.url),
    };
  }
}

function removeEndingSlash(rpc) {
  return rpc.endsWith("/") ? rpc.substr(0, rpc.length - 1) : rpc;
}

export function populateChain(chain, chainTvls) {
  const extraRpcs = allExtraRpcs[chain.chainId]?.rpcs;

  if (extraRpcs !== undefined) {
    const rpcs = extraRpcs.map(removeEndingSlashObject);

    chain.rpc
      .filter((rpc) => !rpc.includes("${INFURA_API_KEY}"))
      .forEach((rpc) => {
        const rpcObj = removeEndingSlashObject(rpc);
        if (rpcs.find((r) => r.url === rpcObj.url) === undefined) {
          rpcs.push(rpcObj);
        }
      });

    chain.rpc = rpcs;
  } else {
    chain.rpc = chain.rpc.map(removeEndingSlashObject);
  }

  const chainSlug = chainIds[chain.chainId];

  if (chainSlug !== undefined) {
    const defiChain = chainTvls.find((c) => c.name.toLowerCase() === chainSlug);

    return defiChain === undefined
      ? chain
      : {
          ...chain,
          tvl: defiChain.tvl,
          chainSlug,
        };
  }
  return chain;
}

export function mergeDeep(target, source) {
  const newTarget = { ...target }
  const isObject = (obj) => obj && typeof obj === 'object';

  if (!isObject(newTarget) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach(key => {
    const targetValue = newTarget[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      newTarget[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      newTarget[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      newTarget[key] = sourceValue;
    }
  });

  return newTarget;
}

export function arrayMove(array, fromIndex, toIndex) {
  const newArray = [...array];
  const startIndex = fromIndex < 0 ? newArray.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < newArray.length) {
    const endIndex = toIndex < 0 ? newArray.length + toIndex : toIndex;
    const [item] = newArray.splice(fromIndex, 1);

    newArray.splice(endIndex, 0, item);
  }

  return newArray;
}

export const notTranslation =
  (ns, lang = "en") =>
  (key) => {
    switch (lang) {
      case "en":
        return en[ns][key];
      case "zh":
        return zh[ns][key];
      default:
        return en[ns][key];
    }
  };
