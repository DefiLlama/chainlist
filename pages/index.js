import * as React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Chain from "../components/chain";
import { AdBanner } from "../components/AdBanner";
import { generateChainData } from "../utils/fetch";
import { useFilteredChains } from "../hooks/useFilteredChains";

export async function getStaticProps() {
  const sortedChains = await generateChainData();

  const homepageChains = sortedChains.map((chain) => ({
    chainId: chain.chainId,
    name: chain.name,
    chainSlug: chain.chainSlug ?? null,
    tvl: chain.tvl ?? null,
    nativeCurrency: chain.nativeCurrency ?? null,
    explorers: chain.explorers?.slice(0, 1) ?? [],
    testnet: chain.testnet ?? false,
    rpcCount: chain.rpc?.length ?? 0,
    rpc: chain.rpc ?? [],
  }));

  return {
    props: {
      chains: JSON.parse(JSON.stringify(homepageChains)),
    },
  };
}

function Home({ chains }) {
  const { chainName, setChainName, finalChains } =
    useFilteredChains(chains);

  const [visibleCount, setVisibleCount] = React.useState(18);

  const featuredChains = finalChains.slice(0, 3);
  const remainingChains = finalChains.slice(3, visibleCount);

  return (
    <>
      <Head>
        <title>ChainList - EVM Network Directory</title>
        <meta
          name="description"
          content="Browse EVM networks, RPC endpoints, explorers and add chains directly to your wallet."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        chainName={chainName}
        setChainName={setChainName}
      >
        <div className="max-w-[1600px] mx-auto">

          {/* Main Grid */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              All Networks
            </h2>
          </div>

          <React.Suspense
            fallback={<div className="h-screen" />}
          >
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 pb-10">

              {remainingChains.slice(0, 2).map((chain) => (
                <Chain
                  key={chain.chainId}
                  chain={chain}
                  lang="en"
                />
              ))}

              <AdBanner />

              {remainingChains.slice(2).map((chain) => (
                <Chain
                  key={chain.chainId}
                  chain={chain}
                  lang="en"
                />
              ))}
            </div>
          </React.Suspense>

          {visibleCount < finalChains.length && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount(finalChains.length)}
                className="
                  px-10
                  py-3
                  rounded-full
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-semibold
                  transition-all
                  duration-200
                  shadow-lg
                  hover:scale-[1.02]
                "
              >
                Show All Networks
              </button>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default Home;