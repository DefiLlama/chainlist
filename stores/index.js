import create from "zustand";

export const useChain = create((set) => ({
  id: null,
  blockGasLimit: 'Unknown',
  updateChain: (id, blockGasLimit = 'Unknown') => set(() => ({ id, blockGasLimit })),
}));

export const useRpcStore = create((set) => ({
  rpcs: [],
  addRpc: (value) => set((state) => ({ rpcs: [...state.rpcs, value] })),
}));
