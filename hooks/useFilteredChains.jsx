import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

const TESTNET_KEYWORDS = ['test', 'devnet'];

const createSearchMatcher = (searchTerm) => {
  const normalized = searchTerm.toLowerCase();
  return (value) => value?.toLowerCase().includes(normalized);
};

const isTestnet = (chain) => {
  const lowercaseValues = [
    chain.name,
    chain.title,
    chain.network
  ].map((val) => val?.toLowerCase());

  return TESTNET_KEYWORDS.some((keyword) => 
    lowercaseValues.some((val) => val?.includes(keyword))
  );
};

const matchesSearchTerm = (chain, matcher) => {
  return (
    matcher(chain.chain) ||
    matcher(chain.chainId.toString()) ||
    matcher(chain.name) ||
    matcher(chain.nativeCurrency?.symbol || '')
  );
};

export const useFilteredChains = (chains) => {
  const [chainName, setChainName] = React.useState("");
  const router = useRouter();
  const { testnets, testnet, search } = router.query;

  const chainToFilter = useMemo(() => {
    if (search?.length > 0 && chainName.length === 0) {
      return typeof search === "string" ? search : search[0];
    }
    return chainName;
  }, [search, chainName]);

  const includeTestnets = useMemo(() => {
    return (testnets === "true" || testnet === "true");
  }, [testnets, testnet]);

  const finalChains = useMemo(() => {
    if (!chains?.length) return [];
    
    const matcher = chainToFilter.length > 0 ? createSearchMatcher(chainToFilter) : null;

    return chains.filter((chain) => {
      if (!includeTestnets && isTestnet(chain)) {
        return false;
      }

      if (matcher && !matchesSearchTerm(chain, matcher)) {
        return false;
      }

      return true;
    });
  }, [includeTestnets, chainToFilter, chains]);

  return {
    chainName,
    setChainName,
    finalChains
  };
};