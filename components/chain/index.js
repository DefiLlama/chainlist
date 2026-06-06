import * as React from "react";
import { useState, useCallback } from "react";
import { notTranslation as useTranslations } from "../../utils";
import useAddToNetwork from "../../hooks/useAddToNetwork";
import RPCList from "../RPCList";

// ─── Icons ─────────────────────────────────────────────────────────

const ChevronIcon = ({ open }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
  </svg>
);

const CopyIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

// ─── Helpers ───────────────────────────────────────────────────────

const formatTvl = (value) => {
  const num = Number(value);
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toLocaleString()}`;
};

// ─── Sub-components ───────────────────────────────────────────────

const Metric = ({ label, value, highlight = false }) => (
  <div className={`rounded-xl p-3.5 transition-colors ${highlight ? "bg-blue-50/60 dark:bg-blue-900/10" : "bg-gray-50/80 dark:bg-[#1a2234]"}`}>
    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
      {label}
    </div>
    <div className="font-bold text-gray-900 dark:text-gray-100 text-sm">
      {value}
    </div>
  </div>
);

const Badge = ({ children, variant }) => (
  <span className={`
    inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
    ${variant === "testnet"
      ? "bg-amber-100/80 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
      : "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
    }
  `}>
    {children}
  </span>
);

// ─── Main Component ──────────────────────────────────────────────

export default function Chain({ chain, lang, featured = false }) {
  const t = useTranslations("Common", lang);
  const { mutate: addChain, isLoading, error, reset } = useAddToNetwork();
  const [showRPCs, setShowRPCs] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const nativeCurrency = chain?.nativeCurrency;
  const explorers = chain?.explorers ?? [];
  const rpcCount = chain?.rpcCount ?? chain?.rpc?.length ?? 0;

  const isTestnet = chain?.testnet || chain?.isTestnet || /testnet/i.test(chain?.name || "");
  const chainInitial = chain?.name?.charAt(0)?.toUpperCase() ?? "?";

  const handleAdd = useCallback(() => {
    reset?.();
    addChain({ chain });
  }, [addChain, chain, reset]);

  const copyChainId = useCallback(() => {
    navigator.clipboard.writeText(String(chain.chainId)).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = String(chain.chainId);
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [chain.chainId]);

  return (
    <article className={`
      group relative overflow-hidden rounded-2xl border transition-all duration-300 ease-out
      ${featured
        ? "border-blue-300 dark:border-blue-500/40 shadow-lg shadow-blue-500/5 dark:shadow-blue-900/10"
        : "border-gray-200/80 dark:border-[#2a2a2a]"
      }
      bg-white dark:bg-[#111827] hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 
      dark:hover:shadow-blue-900/10 hover:border-blue-300/60 dark:hover:border-blue-500/30
    `}>

      {/* Featured ribbon */}
      {featured && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl uppercase tracking-wider z-10">
          Featured
        </div>
      )}

      <div className="p-5 lg:p-6">
        {/* ── Header ── */}
        <header className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Icon */}
            <div className="relative flex-shrink-0">
              {chain.icon && !imgError ? (
                <img
                  src={`https://icons.llamao.fi/icons/chains/rsz_${chain.icon}.jpg`}
                  alt={`${chain.name} logo`}
                  className="w-14 h-14 rounded-2xl object-cover border border-gray-100 dark:border-gray-700 shadow-sm group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                  {chainInitial}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-[#111827] rounded-full" title="Active" />
            </div>

            <div className="min-w-0 pt-0.5">
              <h2 className="font-bold text-lg text-gray-900 dark:text-white truncate leading-tight">
                {chain.name}
              </h2>

              <div className="flex items-center gap-2.5 mt-1.5 flex-wrap">
                <button
                  onClick={copyChainId}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/id"
                  title="Copy Chain ID"
                >
                  <span className="font-mono font-medium">ID: {chain.chainId}</span>
                  {copied ? (
                    <CheckIcon className="text-green-500 w-3.5 h-3.5" />
                  ) : (
                    <CopyIcon className="opacity-0 group-hover/id:opacity-100 transition-opacity w-3.5 h-3.5" />
                  )}
                </button>

                <Badge variant={isTestnet ? "testnet" : "mainnet"}>
                  {isTestnet ? "Testnet" : "Mainnet"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Add Chain Button */}
          <button
            onClick={handleAdd}
            disabled={isLoading}
            className={`
              flex-shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap
              transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
              ${isLoading
                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                : error
                  ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                  : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0"
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Adding...
              </span>
            ) : error ? (
              "Retry"
            ) : (
              "Add Chain"
            )}
          </button>
        </header>

        {/* Error */}
        {error && (
          <div className="mt-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 px-3 py-2 text-xs text-red-600 dark:text-red-400">
            {error.message || "Failed to add chain. Please try again."}
          </div>
        )}

        {/* ── Metrics ── */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          {nativeCurrency && (
            <Metric label="Currency" value={nativeCurrency.symbol} />
          )}
          <Metric label="RPC Endpoints" value={rpcCount} />
        </div>

        {chain.tvl && (
          <div className="mt-3">
            <Metric label="TVL" value={formatTvl(chain.tvl)} highlight />
          </div>
        )}

        {/* ── RPC Accordion ── */}
        {chain.rpc?.length > 0 && (
          <div className="mt-5">
            <button
              onClick={() => setShowRPCs((s) => !s)}
              className={`
                w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left
                transition-all duration-200 group/rpc
                ${showRPCs
                  ? "bg-gray-50 dark:bg-[#1a2234] border-gray-200 dark:border-[#2a2a2a]"
                  : "border-transparent hover:bg-gray-50 dark:hover:bg-[#1a2234]"
                }
              `}
              aria-expanded={showRPCs}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover/rpc:text-blue-700 dark:group-hover/rpc:text-blue-300 transition-colors">
                  View RPC Endpoints
                </span>
                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                  {chain.rpc.length}
                </span>
              </div>
              <ChevronIcon open={showRPCs} />
            </button>

            <div className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${showRPCs ? "max-h-[2000px] opacity-100 mt-3" : "max-h-0 opacity-0"}
            `}>
              <div className="rounded-xl border border-gray-200 dark:border-[#2a2a2a] bg-gray-50/50 dark:bg-[#0f141f] overflow-hidden">
                <RPCList chain={chain} lang={lang} />
              </div>
            </div>
          </div>
        )}

        {/* ── Explorer ── */}
        {explorers.length > 0 && (
          <a
            href={explorers[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-between rounded-xl border border-gray-200 dark:border-[#2a2a2a] px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-[#1a2234] hover:border-blue-200 dark:hover:border-blue-500/20 transition-all duration-200 group/explorer"
          >
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-0.5">
                Explorer
              </div>
              <div className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover/explorer:text-blue-600 dark:group-hover/explorer:text-blue-400 transition-colors">
                {explorers[0].name ?? "View Explorer"}
              </div>
            </div>
            <ExternalIcon />
          </a>
        )}
      </div>
    </article>
  );
}