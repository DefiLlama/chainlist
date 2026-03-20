import { useQuery } from "@tanstack/react-query";

async function getAccount() {
  try {
    if (window.ethereum && window.ethereum.selectedAddress) {
      const chainId = await window.ethereum.request({
        method: "net_version",
      });
      
      return {
        chainId: Number(chainId),
        address: window.ethereum.selectedAddress,
        isConnected: window.ethereum.selectedAddress ? true : false,
      };
    } else {
      throw new Error("No Ethereum Wallet");
    }
  } catch (error) {
    console.log(error);
    return { chainId: null, address: null, isConnected: false };
  }
}

export default function useAccount() {
  return useQuery(["accounts"], () => getAccount(), { retry: 0 });
}
