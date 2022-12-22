import { useMutation, QueryClient } from "@tanstack/react-query";
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

      const params = {
        chainId: toHex(chain.chainId), // A 0x-prefixed hexadecimal string
        chainName: chain.name,
        nativeCurrency: {
          name: chain.nativeCurrency.name,
          symbol: chain.nativeCurrency.symbol, // 2-6 characters long
          decimals: chain.nativeCurrency.decimals,
        },
        rpcUrls: rpc ? [rpc] : chain.rpc.map((r) => r?.url ?? r),
        blockExplorerUrls: [
          chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url
            ? chain.explorers[0].url
            : chain.infoURL,
        ],
      };

      const result = window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [params, address],
      });

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
