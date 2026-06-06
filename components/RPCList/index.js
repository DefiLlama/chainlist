import { useEffect, useMemo, useState } from "react";
import { notTranslation as useTranslations } from "../../utils";
import CopyUrl from "../CopyUrl";
import useRPCData from "../../hooks/useRPCData";
import useAddToNetwork from "../../hooks/useAddToNetwork";
import { useRpcStore } from "../../stores";
import { renderProviderText } from "../../utils";
import { Tooltip } from "../../components/Tooltip";
import useAccount from "../../hooks/useAccount";

export default function RPCList({ chain, lang }) {
  const [sortChains, setSorting] = useState(true);

  const urlToData = chain.rpc.reduce((all, c) => ({ ...all, [c.url]: c }), {});

  const chains = useRPCData(chain.rpc);

  const data = useMemo(() => {
    const sortedData = sortChains
      ? chains?.sort((a, b) => {
        if (a.isLoading) return 1;
        const h1 = a?.data?.height;
        const h2 = b?.data?.height;
        const l1 = a?.data?.latency;
        const l2 = b?.data?.latency;
        if (!h2) return -1;
        if (h2 - h1 > 0) return 1;
        if (h2 - h1 < 0) return -1;
        if (h1 === h2) {
          if (l1 - l2 < 0) return -1;
          return 1;
        }
      })
      : chains;

    const topRpc = sortedData[0]?.data ?? {};

    return sortedData.map(({ data, ...rest }) => {
      const { height = null, latency = null, url = "" } = data || {};

      let trust = "transparent";
      let disableConnect = false;

      if (!height || !latency || topRpc.height - height > 3 || latency - topRpc.latency > 5000) {
        trust = "red";
      } else if (topRpc.height - height < 2 && topRpc.latency - latency > -600) {
        trust = "green";
      } else {
        trust = "orange";
      }

      if (url.includes("wss://") || url.includes("API_KEY")) disableConnect = true;

      const lat = latency ? (latency / 1000).toFixed(3) + "s" : null;

      return {
        ...rest,
        data: { ...data, height, latency: lat, trust, disableConnect },
      };
    });
  }, [chains, sortChains]);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            {chain.name} RPC Endpoints
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {data.length} endpoint{data.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <button
          onClick={() => setSorting(!sortChains)}
          className={`
            inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold
            transition-all duration-200 border
            ${sortChains
              ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
              : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-750"
            }
          `}
        >
          {sortChains ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          )}
          {sortChains ? "Pause Sorting" : "Auto Sort"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#0D0D0D]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 dark:bg-[#161616] border-b border-gray-200 dark:border-[#2a2a2a]">
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Endpoint</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-center w-24">Height</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-center w-24">Latency</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-center w-28">Status</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-center w-20">Privacy</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right w-36">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-[#242424]">
            {data.map((item, index) => (
              <Row
                values={item}
                chain={chain}
                key={index}
                privacy={urlToData[item.data.url]}
                lang={lang}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const Shimmer = () => (
  <div className="h-4 w-full max-w-[200px] rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
);

const ShimmerCenter = () => (
  <div className="flex items-center justify-center py-1">
    <div className="h-4 w-12 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
  </div>
);

function PrivacyIcon({ tracking, isOpenSource = false }) {
  switch (tracking) {
    case "yes":
      return <RedIcon />;
    case "limited":
      return <OrangeIcon />;
    case "none":
      return isOpenSource ? <LightGreenIcon /> : <GreenIcon />;
    default:
      return <EmptyIcon />;
  }
}

const StatusBadge = ({ trust }) => {
  const configs = {
    green: {
      bg: "bg-emerald-50 dark:bg-emerald-900/15",
      text: "text-emerald-700 dark:text-emerald-400",
      border: "border-emerald-200 dark:border-emerald-800/50",
      dot: "bg-emerald-500",
      label: "Healthy",
    },
    orange: {
      bg: "bg-amber-50 dark:bg-amber-900/15",
      text: "text-amber-700 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800/50",
      dot: "bg-amber-500",
      label: "Slow",
    },
    red: {
      bg: "bg-red-50 dark:bg-red-900/15",
      text: "text-red-700 dark:text-red-400",
      border: "border-red-200 dark:border-red-800/50",
      dot: "bg-red-500",
      label: "Unstable",
    },
    transparent: {
      bg: "bg-gray-50 dark:bg-gray-800/50",
      text: "text-gray-500 dark:text-gray-400",
      border: "border-gray-200 dark:border-gray-700",
      dot: "bg-gray-400",
      label: "Checking",
    },
  };

  const cfg = configs[trust] || configs.transparent;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

const Row = ({ values, chain, privacy, lang }) => {
  const t = useTranslations("Common", lang);
  const { data, isLoading, refetch } = values;

  const rpcs = useRpcStore((state) => state.rpcs);
  const addRpc = useRpcStore((state) => state.addRpc);

  useEffect(() => {
    if (data && !rpcs.includes(data.url)) {
      refetch();
      addRpc(data.url);
    }
  }, [data, rpcs, addRpc, refetch]);

  const { data: accountData } = useAccount();
  const address = accountData?.address ?? null;
  const { mutate: addToNetwork } = useAddToNetwork();

  const latencyNum = data?.latency ? parseFloat(data.latency) : null;

  return (
    <tr className="group hover:bg-gray-50/60 dark:hover:bg-[#1a1a1a]/60 transition-colors">
      {/* Endpoint */}
      <td className="px-4 py-3.5 min-w-[240px]">
        {isLoading ? <Shimmer /> : data?.url ? <CopyUrl url={data.url} /> : null}
      </td>

      {/* Height */}
      <td className="px-4 py-3.5 text-center">
        {isLoading ? (
          <ShimmerCenter />
        ) : (
          <span className="text-sm font-mono font-semibold text-gray-800 dark:text-gray-200 tabular-nums">
            {data?.height?.toLocaleString() ?? "-"}
          </span>
        )}
      </td>

      {/* Latency */}
      <td className="px-4 py-3.5 text-center">
        {isLoading ? (
          <ShimmerCenter />
        ) : (
          <span
            className={`text-sm font-mono font-semibold tabular-nums ${latencyNum < 1
                ? "text-emerald-600 dark:text-emerald-400"
                : latencyNum < 3
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-red-600 dark:text-red-400"
              }`}
          >
            {data?.latency ?? "-"}
          </span>
        )}
      </td>

      {/* Status */}
      <td className="px-4 py-3.5 text-center">
        {isLoading ? <ShimmerCenter /> : <StatusBadge trust={data?.trust} />}
      </td>

      {/* Privacy */}
      <td className="px-4 py-3.5 text-center">
        {isLoading ? (
          <ShimmerCenter />
        ) : (
          <Tooltip content={privacy?.trackingDetails || t("no-privacy-info")}>
            <button className="inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-help">
              <PrivacyIcon tracking={privacy?.tracking} isOpenSource={privacy?.isOpenSource} />
            </button>
          </Tooltip>
        )}
      </td>

      {/* Action */}
      <td className="px-4 py-3.5 text-right">
        {isLoading ? (
          <ShimmerCenter />
        ) : (
          <>
            {!data?.disableConnect && (
              <button
                onClick={() => addToNetwork({ address, chain, rpc: data?.url })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
                </svg>
                {t(renderProviderText(address))}
              </button>
            )}
          </>
        )}
      </td>
    </tr>
  );
};

const EmptyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none" className="w-4 h-4">
    <circle cx="12.2844" cy="12.6242" r="11.0662" stroke="currentColor" className="text-gray-300 dark:text-gray-600" strokeWidth="1.5" strokeDasharray="2.95 2.95" />
  </svg>
);

const RedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-500">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
  </svg>
);

const OrangeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-500">
    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

const GreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-500">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
  </svg>
);

const LightGreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#43DB14]">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
  </svg>
);