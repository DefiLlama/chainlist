import * as React from "react";
import { useRouter } from "next/router";
import { notTranslation as useTranslations } from "../../utils";
import { formatAddress, getProvider } from "../../utils";
import { walletIcons } from "../../constants/walletIcons";
import useConnect from "../../hooks/useConnect";
import useAccount from "../../hooks/useAccount";

function Header({ lang, chainName, setChainName }) {
  const t = useTranslations("Common", lang);
  const router = useRouter();

  const { testnets, testnet, search } = router.query;

  const includeTestnets =
    (typeof testnets === "string" && testnets === "true") ||
    (typeof testnet === "string" && testnet === "true");

  const { mutate: connectWallet } = useConnect();
  const { data: accountData } = useAccount();

  const address = accountData?.address ?? null;

  const timeout = React.useRef(null);

  const handleSearch = (value) => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      router.push(
        {
          pathname: router.pathname.includes("/chain/")
            ? "/"
            : router.pathname,
          query: {
            ...router.query,
            search: value,
          },
        },
        undefined,
        { shallow: true }
      );
    }, 300);
  };

  const toggleTestnets = () => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          testnets: !includeTestnets,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#0D1117]/80 border-b border-gray-200 dark:border-[#21262d] rounded-[10px]">
      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* Top Row */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">

          {/* Search */}
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.35-5.15a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
              />
            </svg>

            <input
              placeholder="Search chains..."
              value={chainName ?? search ?? ""}
              onChange={(e) => {
                setChainName?.(e.target.value);
                handleSearch(e.target.value);
              }}
              className="
              w-full
              h-11
              pl-11
              pr-4
              rounded-xl
              border
              border-gray-200
              dark:border-[#30363d]
              bg-white
              dark:bg-[#161b22]
              text-sm
              outline-none
              transition
              focus:border-blue-500
            "
            />
          </div>

          {/* Wallet */}
          <button
            onClick={connectWallet}
            className="
            h-11
            px-5
            rounded-xl
            border
            border-gray-200
            dark:border-[#30363d]
            bg-white
            dark:bg-[#161b22]
            hover:bg-gray-50
            dark:hover:bg-[#1f2937]
            transition
            flex
            items-center
            justify-center
            gap-2
            text-sm
            font-medium
            whitespace-nowrap
          "
          >
            {address ? (
              <>
                <img
                  src={walletIcons[getProvider()]}
                  width={18}
                  height={18}
                  alt=""
                  className="rounded-full"
                />
                {formatAddress(address)}
              </>
            ) : (
              t("connect-wallet")
            )}
          </button>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-3">

          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              checked={includeTestnets}
              onChange={toggleTestnets}
              className="
              w-4
              h-4
              rounded
              border-gray-300
              text-blue-600
              focus:ring-blue-500
            "
            />

            <span>Include Testnets</span>
          </label>

          {chainName && (
            <div className="hidden md:flex items-center text-sm text-gray-500">
              {finalChains?.length || ""} results
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Header;