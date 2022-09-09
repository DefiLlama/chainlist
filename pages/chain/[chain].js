import React, { useMemo } from "react";
import Head from "next/head";
import { Typography, Paper, Tooltip } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import { populateChain, fetcher } from "../../utils";
import AddNetwork from "../../components/chain";
import Layout from "../../components/Layout";
import RPCList from "../../components/RPCList";
import classes from "./index.module.css";
import Image from "next/image";
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
      c.name.toLowerCase() === params.chain.toLowerCase().split("%20").join(" ")
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
  const res = await fetcher("https://chainid.network/chains.json");

  const chainNameAndIds = [
    ...res.map((c) => c.chainId),
    ...Object.values(chainIds),
    ...res.map((c) => c.name.toLowerCase().split(" ").join("%20")),
  ];

  const paths = chainNameAndIds.map((chain) => ({
    params: { chain: chain.toString() ?? null },
  }));

  return { paths, fallback: "blocking" };
}

function Chain({ changeTheme, theme, chain }) {
  const icon = useMemo(() => {
    return chain?.chainSlug
      ? `https://defillama.com/chain-icons/rsz_${chain.chainSlug}.jpg`
      : "/unknown-logo.png";
  }, [chain]);

  return (
    <>
      <Head>
        <title>{`${chain.name} RPC and Chain settings | Chainlist`}</title>
        <meta
          name="description"
          content={`Find the best ${chain.name} RPC to connect to your wallets and Web3 middleware providers.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout theme={theme} changeTheme={changeTheme}>
        <Paper elevation={1} className={classes.chainDetails}>
          <div className={classes.chainNameContainer}>
            <Image
              src={icon}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/chains/unknown-logo.png";
              }}
              width={28}
              height={28}
              className={classes.avatar}
            />

            <Tooltip title={chain.name}>
              <Typography
                variant="h3"
                className={classes.name}
                noWrap
                style={{ marginLeft: "24px" }}
              >
                <a href={chain.infoURL} target="_blank" rel="noreferrer">
                  {chain.name}
                </a>
              </Typography>
            </Tooltip>
          </div>

          <div className={classes.chainInfoContainer}>
            <div className={classes.dataPoint}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                className={classes.dataPointHeader}
              >
                ChainID
              </Typography>
              <Typography variant="h5">{chain.chainId}</Typography>
            </div>
            <div className={classes.dataPoint}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                className={classes.dataPointHeader}
              >
                Currency
              </Typography>
              <Typography variant="h5">
                {chain.nativeCurrency ? chain.nativeCurrency.symbol : "none"}
              </Typography>
            </div>
          </div>

          <AddNetwork chain={chain} buttonOnly />
        </Paper>
        <RPCList chain={chain} />
      </Layout>
    </>
  );
}

export default withTheme(Chain);
