import * as React from "react";
import Head from "next/head";
import Link from "next/link";
// import { useTranslations } from "next-intl";
import { notTranslation as useTranslations } from "../../utils";
import { populateChain, fetcher } from "../../utils/fetch";
import AddNetwork from "../../components/chain";
import Layout from "../../components/Layout";
import RPCList from "../../components/RPCList";
import chainIds from "../../constants/chainIds.js";
import { overwrittenChains } from "../../constants/additionalChainRegistry/list";
import { useQuery } from "@tanstack/react-query";

export async function getStaticProps({ params }) {
  const [chains, chainTvls] = await Promise.all([
    fetcher("https://chainid.network/chains.json"),
    fetcher("https://api.llama.fi/chains"),
  ]);

  const chain =
    overwrittenChains.find(
      (c) =>
        c.chainId?.toString() === params.chain ||
        c.chainId?.toString() === Object.entries(chainIds).find(([, name]) => params.chain === name)?.[0] ||
        c.name.toLowerCase() === params.chain.toLowerCase().split("%20").join(" "),
    ) ??
    chains.find(
      (c) =>
        c.chainId?.toString() === params.chain ||
        c.chainId?.toString() === Object.entries(chainIds).find(([, name]) => params.chain === name)?.[0] ||
        c.name.toLowerCase() === params.chain.toLowerCase().split("%20").join(" "),
    );

  if (!chain) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      chain: chain ? populateChain(chain, chainTvls) : null,
      // messages: (await import(`../../translations/${locale}.json`)).default,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const chains = await fetcher("https://chainid.network/chains.json");

  const paths = chains
    .map((chain) => [
      {
        params: {
          chain: chain.chainId.toString(),
        },
      },
      {
        params: {
          chain: chain.name.toLowerCase(),
        },
      },
    ])
    .flat();

  return { paths, fallback: false };
}

function Chain({ chain }) {
  const t = useTranslations("Common", "en");

  const icon = React.useMemo(() => {
    return chain?.chainSlug ? `https://icons.llamao.fi/icons/chains/rsz_${chain.chainSlug}.jpg` : "/unknown-logo.png";
  }, [chain]);

  const { data: blockGasLimit } = useQuery({
    queryKey: ["blockGasLimit", chain?.rpc?.[0]],
    queryFn: () => fetchBlockGasLimit(chain?.rpc?.[0]?.url),
  });

  return (
    <>
      <Head>
        <title>{`${chain.name} RPC and Chain settings | ChainList`}</title>
        <meta
          name="description"
          content={`Find the best ${chain.name} RPC to connect to your wallets and Web3 middleware providers.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout lang="en">
        <div className="shadow dark:bg-[#0D0D0D] bg-white p-8 rounded-[10px] flex flex-col gap-3 overflow-hidden">
          <div className="flex items-center justify-center gap-2">
            <img
              src={icon}
              width={26}
              height={26}
              className="rounded-full flex-shrink-0 flex relative"
              alt={chain.name + " logo"}
            />
            <h1 className="text-xl font-semibold overflow-hidden text-ellipsis relative top-[1px] dark:text-[#B3B3B3]">
              {chain.name}
            </h1>
          </div>

          <table>
            <thead>
              <tr>
                <th className="font-normal text-gray-500 dark:text-[#B3B3B3]">ChainID</th>
                <th className="font-normal text-gray-500 dark:text-[#B3B3B3]">{t("currency")}</th>
                <th className="font-normal text-gray-500 dark:text-[#B3B3B3]">Block Gas Limit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center font-bold px-4 dark:text-[#B3B3B3]">{`${chain.chainId}(0x${Number(
                  chain.chainId,
                ).toString(16)})`}</td>
                <td className="text-center font-bold px-4 dark:text-[#B3B3B3]">
                  {chain.nativeCurrency ? chain.nativeCurrency.symbol : "none"}
                </td>
                <td className="text-center font-bold px-4 dark:text-[#B3B3B3]">{blockGasLimit ?? "Unknown"}</td>
              </tr>
            </tbody>
          </table>

          <AddNetwork chain={chain} buttonOnly lang="en" />
        </div>

        <div className="max-w-[calc(60vw-56px)]">
          <RPCList chain={chain} lang="en" />
        </div>
      </Layout>
    </>
  );
}

async function fetchBlockGasLimit(rpc) {
  if (!rpc) return null;
  try {
    const response = await fetch(rpc, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: ["latest", false],
        id: 1,
      }),
    });
    const data = await response.json();
    if (data.result && data.result.gasLimit) {
      return parseInt(data.result.gasLimit, 16);
    }
    return "Unknown";
  } catch (error) {
    console.error("Error fetching block gas limit:", error);
  }
}

export default Chain;
