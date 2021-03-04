import AccountStore from "./accountStore";

const Dispatcher = require('flux').Dispatcher;
const Emitter = require('events').EventEmitter;

const dispatcher = new Dispatcher();
const emitter = new Emitter();

const accountStore = new AccountStore(dispatcher, emitter)

export default {
  accountStore: accountStore,
  dispatcher: dispatcher,
  emitter: emitter
};
