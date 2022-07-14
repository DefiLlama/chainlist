import { Button, Paper } from "@material-ui/core";
import { useEffect, useMemo } from "react";
import useRPCData from "../../hooks/useRPCData";
import { useAccount, useRpcStore } from "../../stores";
import { addToNetwork, renderProviderText } from "../../utils";
import classes from "./index.module.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useTranslations } from "next-intl";

export default function RPCList({ chain }) {
  const chains = useRPCData(chain.rpc);

  const data = useMemo(() => {
    const sortedData = chains?.sort((a, b) => {
      if (a.isLoading) {
        return 1;
      }

      const h1 = a?.data?.height;
      const h2 = b?.data?.height;
      const l1 = a?.data?.latency;
      const l2 = b?.data?.latency;

      if (!h2) {
        return -1;
      }

      if (h2 - h1 > 0) {
        return 1;
      }
      if (h2 - h1 < 0) {
        return -1;
      }
      if (h1 === h2) {
        if (l1 - l2 < 0) {
          return -1;
        } else {
          return 1;
        }
      }
    });

    const topRpc = sortedData[0]?.data ?? {};

    return sortedData.map(({ data, ...rest }) => {
      const { height = null, latency = null, url = "" } = data || {};

      let trust = "transparent";
      let disableConnect = false;

      if (
        !height ||
        !latency ||
        topRpc.height - height > 3 ||
        topRpc.latency - latency > 5000
      ) {
        trust = "red";
      } else if (
        topRpc.height - height < 2 &&
        topRpc.latency - latency > -600
      ) {
        trust = "green";
      } else {
        trust = "orange";
      }

      if (url.includes("wss://") || url.includes("API_KEY"))
        disableConnect = true;

      const lat = latency ? (latency / 1000).toFixed(3) + "s" : null;

      return {
        ...rest,
        data: { ...data, height, latency: lat, trust, disableConnect },
      };
    });
  }, [chains]);

  const darkMode =
    typeof document !== "undefined" &&
    window.localStorage.getItem("yearn.finance-dark-mode") === "dark";

  const isEthMainnet = chain?.name === "Ethereum Mainnet";

  return (
    <Paper elevation={1} className={classes.disclosure}>
      <table
        className={classes.table}
        style={{
          "--border-color": darkMode
            ? "hsl(0deg 0% 39% / 33%)"
            : "hsl(0deg 0% 17% / 4%)",
        }}
      >
        <caption>{`${chain.name} RPC URL List`}</caption>
        <thead>
          <tr>
            <th>RPC Server Address</th>
            <th>Height</th>
            <th>Latency</th>
            <th>Score</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <Row
              values={item}
              chain={chain}
              isEthMainnet={isEthMainnet}
              key={index}
            />
          ))}
        </tbody>
      </table>
      {isEthMainnet && (
        <p className={classes.helperText}>
          Follow{" "}
          <a
            href="https://docs.llama.fi/chainlist/how-to-change-ethereums-rpc"
            target="_blank"
            rel="noopener noreferrer"
          >
            this
          </a>{" "}
          guide to change RPC endpoint's of Ethereum Mainnet
        </p>
      )}
    </Paper>
  );
}

const Shimmer = () => {
  const darkMode =
    typeof document !== "undefined" &&
    window.localStorage.getItem("yearn.finance-dark-mode") === "dark";
  const linearGradient = darkMode
    ? "linear-gradient(90deg, rgb(255 247 247 / 7%) 0px, rgb(85 85 85 / 80%) 40px, rgb(255 247 247 / 7%) 80px)"
    : "linear-gradient(90deg, #f4f4f4 0px, rgba(229, 229, 229, 0.8) 40px, #f4f4f4 80px)";
  return (
    <div
      className={classes.shimmer}
      style={{ "--linear-gradient": linearGradient }}
    ></div>
  );
};

const Row = ({ values, chain, isEthMainnet }) => {
  const t = useTranslations("Common");
  const { data, isLoading, refetch } = values;

  const rpcs = useRpcStore((state) => state.rpcs);
  const addRpc = useRpcStore((state) => state.addRpc);
  const account = useAccount((state) => state.account);

  useEffect(() => {
    // ignore first request to a url and refetch to calculate latency which doesn't include DNS lookup
    if (data && !rpcs.includes(data.url)) {
      refetch();
      addRpc(data.url);
    }
  }, [data, rpcs, addRpc, refetch]);

  return (
    <tr>
      <td>{isLoading ? <Shimmer /> : data?.url}</td>
      <td>{isLoading ? <Shimmer /> : data?.height}</td>
      <td>{isLoading ? <Shimmer /> : data?.latency}</td>
      <td
        className={classes.trustScore}
        style={{ "--trust-color": data?.trust ?? "transparent" }}
      >
        {isLoading ? <Shimmer /> : <FiberManualRecordIcon />}
      </td>
      <td>
        {isLoading ? (
          <Shimmer />
        ) : (
          <>
            {isEthMainnet ? (
              <CopyUrl url={data?.url} />
            ) : (
              !data.disableConnect && (
                <Button
                  style={{ padding: "0 8px" }}
                  onClick={() => addToNetwork(account, chain, data?.url)}
                >
                  {t(renderProviderText(account))}
                </Button>
              )
            )}
          </>
        )}
      </td>
    </tr>
  );
};

const CopyUrl = ({ url = "" }) => {
  return (
    <Button
      style={{ padding: "0 8px" }}
      onClick={() => navigator.clipboard.writeText(url)}
    >
      Copy URL
    </Button>
  );
};
