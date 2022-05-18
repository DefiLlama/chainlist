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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ params, locale }) {
  const chains = await fetcher("https://chainid.network/chains.json");

  const chainTvls = await fetcher("https://api.llama.fi/chains");

  const chain = chains.find((c) => c.networkId?.toString() === params.chain);

  return {
    props: {
      chain: chain ? populateChain(chain, chainTvls) : null,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const res = await fetcher("https://chainid.network/chains.json");

  const paths = res.map((chain) => ({
    params: { chain: chain?.networkId?.toString() ?? null },
  }));

  return { paths, fallback: "blocking" };
}

function Chain({ changeTheme, theme, chain }) {
  const icon = useMemo(() => {
    return chain.chainSlug
      ? `https://defillama.com/chain-icons/rsz_${chain.chainSlug}.jpg`
      : "/unknown-logo.png";
  }, [chain]);

  return (
    <>
      <Head>
        <title>{`${chain.name} | Chainlist`}</title>
        <meta
          name="description"
          content={`Connect to add ${chain.name} to your wallet`}
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
