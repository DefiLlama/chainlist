import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import useRPCData from "../../hooks/useRPCData";
import useAddToNetwork from "../../hooks/useAddToNetwork";
import { useAccount, useRpcStore } from "../../stores";
import { renderProviderText } from "../../utils";

export default function RPCList({ chain }) {
  const [sortChains, setSorting] = useState(true);

  const urlToData = chain.rpc.reduce((all, c) => ({ ...all, [c.url]: c }), {});

  const chains = useRPCData(chain.rpc);

  const data = useMemo(() => {
    const sortedData = sortChains
      ? chains?.sort((a, b) => {
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
        })
      : chains;

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

  const isEthMainnet = chain?.name === "Ethereum Mainnet";

  return (
    <div className="shadow bg-white p-8 rounded-[10px] flex flex-col gap-3 overflow-hidden col-span-full relative overflow-x-auto">
      {isEthMainnet && (
        <p className="text-center">
          Follow{" "}
          <a
            href="https://docs.llama.fi/chainlist/how-to-change-ethereums-rpc"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            this guide
          </a>{" "}
          to change RPC endpoint's of Ethereum Mainnet
        </p>
      )}

      <table className="whitespace-nowrap border-collapse m-0">
        <caption className="px-3 py-1 border text-base font-medium border-b-0 w-full relative">
          <span className="mr-4">{`${chain.name} RPC URL List`}</span>
          <button
            className="text-sm font-normal flex items-center gap-1 absolute right-4 top-[2px] bottom-[2px] hover:bg-[#EAEAEA] px-2 rounded-[10px]"
            onClick={() => setSorting(!sortChains)}
          >
            {sortChains ? (
              <span>
                <span className="sr-only">Pause</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
                </svg>
              </span>
            ) : (
              <span>
                <span className="sr-only">Resume</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </span>
            )}
            <span>Sorting</span>
          </button>
        </caption>
        <thead>
          <tr>
            <th className="border font-medium px-3 py-1">RPC Server Address</th>
            <th className="border font-medium px-3 py-1">Height</th>
            <th className="border font-medium px-3 py-1">Latency</th>
            <th className="border font-medium px-3 py-1">Score</th>
            <th className="border font-medium px-3 py-1">Privacy</th>
            <th className="border font-medium px-3 py-1"></th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <Row
              values={item}
              chain={chain}
              isEthMainnet={isEthMainnet}
              key={index}
              privacy={urlToData[item.data.url]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Shimmer = () => {
  return (
    <div className="rounded h-5 w-full min-w-[40px] animate-pulse bg-[#EAEAEA]"></div>
  );
};

function PrivacyIcon({ tracking }) {
  switch (tracking) {
    case "yes":
      return <RedIcon />;
    case "limited":
      return <OrangeIcon />;
    case "none":
      return <GreenIcon />;
  }

  return null;
}

const Row = ({ values, chain, isEthMainnet, privacy }) => {
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

  const { data: accountData } = useAccount();

  const address = accountData?.address ?? null;

  const { mutate: addToNetwork } = useAddToNetwork();

  return (
    <tr>
      <td className="border px-3 text-sm py-1 max-w-[40ch] overflow-hidden whitespace-nowrap text-ellipsis">
        {isLoading ? <Shimmer /> : data?.url}
      </td>
      <td className="border px-3 text-sm py-1">
        {isLoading ? <Shimmer /> : data?.height}
      </td>
      <td className="border px-3 text-sm py-1">
        {isLoading ? <Shimmer /> : data?.latency}
      </td>
      <td className="border px-3 text-sm py-1">
        {isLoading ? (
          <Shimmer />
        ) : (
          <>
            {data.trust === "green" ? (
              <GreenIcon />
            ) : data.trust === "red" ? (
              <RedIcon />
            ) : data.trust === "orange" ? (
              <OrangeIcon />
            ) : null}
          </>
        )}
      </td>
      <td className="border px-3 text-sm py-1" title={privacy?.trackingDetails}>
        {isLoading ? <Shimmer /> : <PrivacyIcon tracking={privacy?.tracking} />}
      </td>
      <td className="border px-3 text-sm py-1">
        {isLoading ? (
          <Shimmer />
        ) : (
          <>
            {isEthMainnet ? (
              <CopyUrl url={data?.url} />
            ) : (
              !data.disableConnect && (
                <button
                  className="px-2 py-[2px] -my-[2px] text-sm hover:bg-[#EAEAEA] rounded-[50px]"
                  onClick={() =>
                    addToNetwork({ address, chain, rpc: data?.url })
                  }
                >
                  {t(renderProviderText(account))}
                </button>
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
    <button
      className="px-2 py-[2px] -my-[2px] text-sm hover:bg-[#EAEAEA] rounded-[50px]"
      onClick={() => navigator.clipboard.writeText(url)}
    >
      Copy URL
    </button>
  );
};

const RedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="red"
    className="w-5 h-5 mx-auto"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
      clipRule="evenodd"
    />
  </svg>
);

const OrangeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="orange"
    className="w-5 h-5 mx-auto"
  >
    <path
      fillRule="evenodd"
      d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

const GreenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="green"
    className="w-5 h-5 mx-auto"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
      clipRule="evenodd"
    />
  </svg>
);
