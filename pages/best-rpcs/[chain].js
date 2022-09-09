import React from "react";
import Head from "next/head";
import { populateChain, fetcher } from "../../utils";
import chainIds from "../../constants/chainIds";

export async function getStaticProps({ params, locale }) {
  const chains = await fetcher("https://chainid.network/chains.json");

  const chainTvls = await fetcher("https://api.llama.fi/chains");

  const chain = chains.find(
    (c) =>
      c.chainId?.toString() === params.chain ||
      c.chainId?.toString() ===
        Object.entries(chainIds).find(
          ([, name]) => params.chain === name
        )?.[0] ||
      c.name === params.chain.split("%20").join(" ")
  );

  if (!chain) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      chain: chain ? populateChain(chain, chainTvls) : null,
      messages: (await import(`../../translations/${locale}.json`)).default,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const chainNameAndIds = [...Object.values(chainIds)];

  const paths = chainNameAndIds.map((chain) => ({
    params: { chain: chain.toString() ?? null },
  }));

  return { paths, fallback: "blocking" };
}

export default function Chain({ chain }) {
  return (
    <>
      <Head>
        <title>{`Best ${chain.name} RPCs | Chainlist`}</title>
        <meta
          name="description"
          content={`Chainlist is a list of RPCs for EVM(Ethereum Virtual Machine) networks. Use the information to connect your wallets and Web3 middleware providers to ${chain.name}. Find the best RPC to connect to ${chain.name}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
