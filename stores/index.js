import AccountStore from './accountStore';
import create from 'zustand';

const Dispatcher = require('flux').Dispatcher;
const Emitter = require('events').EventEmitter;

const dispatcher = new Dispatcher();
const emitter = new Emitter();

const accountStore = new AccountStore(dispatcher, emitter);

export default {
  accountStore: accountStore,
  dispatcher: dispatcher,
  emitter: emitter,
};

export const useTestnets = create((set) => ({
  testnets: false,
  toggleTestnets: () => set((state) => ({ testnets: !state.testnets })),
}));

export const useSearch = create((set) => ({
  search: '',
  handleSearch: (text) => set(() => ({ search: text })),
}));

export const useChain = create((set) => ({
  id: null,
  updateChain: (id) => set(() => ({ id })),
}));

export const useRpcStore = create((set) => ({
  rpcs: [],
  addRpc: (value) => set((state) => ({ rpcs: [...state.rpcs, value] })),
}));

export const useAccount = create((set) => ({
  account: null,
  setAccount: (account) => set(() => ({ account })),
}));
