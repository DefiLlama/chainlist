/**
 * Unit tests for the pure EIP-6963 matching helper.
 * Run with: node --test tests/eip6963.test.js
 */

const { test } = require("node:test");
const assert = require("node:assert/strict");

const { resolveConnectedWalletInfo } = require("../utils/eip6963");

// A tiny factory for the EIP-6963 provider-detail shape.
const detail = (name, provider, icon = "data:image/svg+xml;base64,AAAA", uuid = name) => ({
  info: { uuid, name, icon, rdns: `com.${name.toLowerCase()}` },
  provider,
});

test("returns the name/icon of the announced provider matching window.ethereum", () => {
  const rabby = {};
  const metamask = {};
  const providers = [detail("MetaMask", metamask), detail("Rabby", rabby)];

  assert.deepEqual(resolveConnectedWalletInfo(providers, rabby), {
    name: "Rabby",
    icon: "data:image/svg+xml;base64,AAAA",
  });
});

test("matches via selectedProvider when the wallet multiplexes", () => {
  const inner = {};
  const connected = { selectedProvider: inner };
  const providers = [detail("Coinbase Wallet", inner)];

  assert.deepEqual(resolveConnectedWalletInfo(providers, connected), {
    name: "Coinbase Wallet",
    icon: "data:image/svg+xml;base64,AAAA",
  });
});

test("returns null when no announced provider matches the connected one", () => {
  const providers = [detail("MetaMask", {}), detail("Rabby", {})];
  assert.equal(resolveConnectedWalletInfo(providers, {}), null);
});

test("returns null for empty / missing inputs", () => {
  assert.equal(resolveConnectedWalletInfo([], {}), null);
  assert.equal(resolveConnectedWalletInfo([detail("MetaMask", {})], null), null);
  assert.equal(resolveConnectedWalletInfo(null, {}), null);
  assert.equal(resolveConnectedWalletInfo(undefined, {}), null);
});

test("icon is null when the announcement omits a usable icon", () => {
  const p = {};
  const noIcon = { info: { uuid: "x", name: "Weird Wallet" }, provider: p };
  assert.deepEqual(resolveConnectedWalletInfo([noIcon], p), {
    name: "Weird Wallet",
    icon: null,
  });
});

test("skips a matching provider that announced no usable name", () => {
  const p = {};
  const nameless = { info: { uuid: "x", name: "" }, provider: p };
  assert.equal(resolveConnectedWalletInfo([nameless], p), null);
});

test("ignores malformed detail entries without throwing", () => {
  const p = {};
  const providers = [null, {}, { info: {} }, { provider: p }, detail("Rabby", p)];
  assert.deepEqual(resolveConnectedWalletInfo(providers, p), {
    name: "Rabby",
    icon: "data:image/svg+xml;base64,AAAA",
  });
});
