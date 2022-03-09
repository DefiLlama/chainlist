import React, { useMemo } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Chain from '../components/chain';
import { chainIds } from '../components/chains';
import Layout from '../components/Layout';
import { useSearch, useTestnets } from '../stores';
import classes from '../styles/Home.module.css';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export async function getStaticProps({ params }) {
  const chains = await fetcher('https://chainid.network/chains.json');
  const chainTvls = await fetcher('https://api.llama.fi/chains');

  function populateChain(chain) {
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

  const sortedChains = chains
    .filter((c) => c.name !== '420coin') // same chainId as ronin
    .map(populateChain)
    .sort((a, b) => {
      return (b.tvl ?? 0) - (a.tvl ?? 0);
    });

  return {
    props: {
      sortedChains,
    },
    revalidate: 3600,
  };
}

function Home({ sortedChains, ...props }) {
  const testnets = useTestnets((state) => state.testnets);
  const search = useSearch((state) => state.search);

  const chains = useMemo(() => {
    if (!testnets) {
      return sortedChains.filter((item) => {
        const testnet =
          item.name?.toLowerCase().includes('test') ||
          item.title?.toLowerCase().includes('test') ||
          item.network?.toLowerCase().includes('test');
        return !testnet;
      });
    } else return sortedChains;
  }, [testnets, sortedChains]);

  return (
    <Layout {...props}>
      <div className={classes.cardsContainer}>
        {(search === ''
          ? chains
          : chains.filter((chain) => {
              //filter
              return (
                chain.chain.toLowerCase().includes(search.toLowerCase()) ||
                chain.chainId.toString().toLowerCase().includes(search.toLowerCase()) ||
                chain.name.toLowerCase().includes(search.toLowerCase()) ||
                (chain.nativeCurrency ? chain.nativeCurrency.symbol : '').toLowerCase().includes(search.toLowerCase())
              );
            })
        ).map((chain, idx) => {
          return <Chain chain={chain} key={idx} />;
        })}
      </div>
    </Layout>
  );
}

export default withTheme(Home);
