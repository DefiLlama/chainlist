import allExtraRpcs from "../constants/extraRpcs.js";
import chainIds from "../constants/chainIds.js";
import fetch from "node-fetch";
import { overwrittenChains } from "../constants/additionalChainRegistry/list.js";
import { isTestnet } from "./index.js";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

const cache = {};
export const fetchWithCache = async (url) => {
  if (cache[url]) {
    return cache[url];
  }
  const data = await fetch(url).then((res) => res.json());
  cache[url] = data;
  return data;
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
  let rpcs = (allExtraRpcs[chain.chainId]?.rpcs ?? []).map(removeEndingSlashObject);

  for (const rpcUrl of chain.rpc) {
    const rpc = removeEndingSlashObject(rpcUrl);

    if (!rpc.url.includes("${INFURA_API_KEY}") && !rpcs.find((r) => r.url === rpc.url)) {
      rpcs = [...rpcs, rpc];
    }
  }

  chain.rpc = rpcs;

  const chainSlug = chainIds[chain.chainId];

  if (chainSlug !== undefined) {
    const defiChain = chainTvls.find((c) => c.name.toLowerCase() === chainSlug);

    return {
      ...chain,
      ...(defiChain !== undefined && { tvl: defiChain.tvl }),
      chainSlug,
    };
  }

  return chain;
}

export function mergeDeep(target, source) {
  const newTarget = { ...target };
  const isObject = (obj) => obj && typeof obj === "object";

  if (!isObject(newTarget) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach((key) => {
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

function getBaseName(name) {
  if (!name) return "";

  return name
    .replace(/\s+(Sepolia|Goerli|Testnet|Mumbai|Fuji|Amoy|Hoodi)(\s+.*)?$/i, "")
    .replace(/\s+Test\s+Network$/i, "")
    .replace(/\s+Mainnet$/i, "")
    .replace(/\s+(One|C-Chain)$/i, "")
    .trim();
}

function handleTestnets(activeChains) {
  const parentChainTvls = {};
  
  // map testnets to their parent's TVL
  activeChains.forEach((chain) => {
    if (chain.tvl && !isTestnet(chain)) {
      const baseName = getBaseName(chain.name);
      if (!parentChainTvls[baseName] || parentChainTvls[baseName] < chain.tvl) {
        parentChainTvls[baseName] = chain.tvl;
      }
    }
  });

  return activeChains.map((chain) => {
    const isTestnetChain = isTestnet(chain);

    if (isTestnetChain && !chain.tvl) {
      const baseName = getBaseName(chain.name);
      const parentTvl = parentChainTvls[baseName] || 0;

      return {
        ...chain,
        isTestnet: true,
        tvl: parentTvl,
      };
    }

    return {
      ...chain,
      isTestnet: isTestnetChain,
    };
  });
}

export async function generateChainData() {
  const [chains, chainTvls] = await Promise.all([
    fetchWithCache("https://chainid.network/chains.json"),
    fetchWithCache("https://api.llama.fi/chains"),
  ]);

  const overwrittenIds = overwrittenChains.reduce((acc, curr) => {
    acc[curr.chainId] = true;
    return acc;
  }, {});

  const activeChains = chains
    .filter((c) => c.status !== "deprecated" && !overwrittenIds[c.chainId])
    .concat(overwrittenChains)
    .map((chain) => populateChain(chain, chainTvls));

  const chainsWithTestnetTvls = handleTestnets(activeChains);

  const sortedChains = chainsWithTestnetTvls.sort((a, b) => {
    // First: separate mainnets and testnets (mainnets first)
    if (!a.isTestnet && b.isTestnet) return -1;
    if (a.isTestnet && !b.isTestnet) return 1;

    // Second: within same type (mainnet or testnet), sort by TVL (descending)
    const aTvl = a.tvl ?? 0;
    const bTvl = b.tvl ?? 0;
    return bTvl - aTvl;
  });

  return sortedChains;
}
