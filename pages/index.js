import React, { useMemo } from "react";
import Head from "next/head";
import { withTheme } from "@material-ui/core/styles";
import Chain from "../components/chain";
import { fetcher, populateChain } from "../utils";
import { useSearch, useTestnets } from "../stores";
import Layout from "../components/Layout";
import classes from "../components/Layout/index.module.css";

export async function getStaticProps() {
  const chains = await fetcher("https://chainid.network/chains.json");
  const chainTvls = await fetcher("https://api.llama.fi/chains");

  const sortedChains = chains
    .filter((c) => c.name !== "420coin") // same chainId as ronin
    .map((chain) => populateChain(chain, chainTvls))
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

function Home({ changeTheme, theme, sortedChains }) {
  const testnets = useTestnets((state) => state.testnets);
  const search = useSearch((state) => state.search);

  const chains = useMemo(() => {
    if (!testnets) {
      return sortedChains.filter((item) => {
        const testnet =
          item.name?.toLowerCase().includes("test") ||
          item.title?.toLowerCase().includes("test") ||
          item.network?.toLowerCase().includes("test");
        return !testnet;
      });
    } else return sortedChains;
  }, [testnets, sortedChains]);

  return (
    <>
      <Head>
        <title>Chainlist</title>
        <meta
          name="description"
          content="Connect to Add a Network to you Wallet. Checkout Latency of multiple RPC Providers of a Network"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout changeTheme={changeTheme} theme={theme}>
        <div className={classes.cardsContainer}>
          {(search === ""
            ? chains
            : chains.filter((chain) => {
                //filter
                return (
                  chain.chain.toLowerCase().includes(search.toLowerCase()) ||
                  chain.chainId
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  chain.name.toLowerCase().includes(search.toLowerCase()) ||
                  (chain.nativeCurrency ? chain.nativeCurrency.symbol : "")
                    .toLowerCase()
                    .includes(search.toLowerCase())
                );
              })
          ).map((chain, idx) => {
            return <Chain chain={chain} key={idx} />;
          })}
        </div>
      </Layout>
    </>
  );
}

export default withTheme(Home);
