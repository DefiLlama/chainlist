import * as Fathom from "fathom-client";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { FATHOM_EVENTS_ID, FATHOM_DROPDOWN_EVENTS_ID, FATHOM_NO_EVENTS_ID, CHAINS_MONITOR } from "./useAnalytics";
import { connectWallet } from "./useConnect";

const toHex = (num) => {
  return "0x" + num.toString(16);
};

export async function addToNetwork({ address, chain, rpc }) {
  try {
    if (window.ethereum) {
      if (!address) {
        await connectWallet();
      }

      const rpcUrls = rpc
        ? [typeof rpc === "string" ? rpc : rpc.url]
        : (chain.rpc ?? []).map((r) => r?.url ?? r);

      const params = {
        chainId: toHex(chain.chainId),
        chainName: chain.name,
        rpcUrls: rpcUrls.filter(Boolean),
      };

      if (chain.nativeCurrency) {
        params.nativeCurrency = {
          name: chain.nativeCurrency.name,
          symbol: chain.nativeCurrency.symbol,
          decimals: chain.nativeCurrency.decimals,
        };
      }

      const explorer =
        chain.explorers?.[0]?.url || chain.infoURL;

      if (explorer) {
        params.blockExplorerUrls = [explorer];
      }

      const result = await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [params],
      });

      // the 'wallet_addEthereumChain' method returns null if the request was successful
      if (result === null && CHAINS_MONITOR.includes(chain.chainId)) {
        Fathom.trackGoal(FATHOM_NO_EVENTS_ID[chain.chainId], 0);
      }

      return result;
    } else {
      throw new Error("No Ethereum Wallet");
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default function useAddToNetwork() {
  const queryClient = new QueryClient();

  return useMutation(addToNetwork, {
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });
}
