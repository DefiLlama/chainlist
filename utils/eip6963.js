/**
 * EIP-6963 (Multi Injected Provider Discovery) helpers.
 *
 * The connected-wallet name and icon used to come from a hardcoded allowlist of
 * legacy `window.ethereum.is*` flags (see `getProvider` / `walletIcons`). Any
 * wallet not on that list fell back to a generic name and the MetaMask icon.
 *
 * EIP-6963 lets every injected wallet announce itself with a standard
 * `{ info: { uuid, name, icon, rdns }, provider }` detail, so we can show the
 * real name/icon of whatever the user actually connected, and keep the legacy
 * allowlist only as a fallback for wallets that don't announce yet.
 *
 * https://eips.ethereum.org/EIPS/eip-6963
 *
 * Kept as a plain CommonJS module with no React/DOM imports so the pure
 * matching logic can be unit-tested with `node --test` (see
 * tests/eip6963.test.js) and still be named-imported from the ESM app source.
 */

const EIP6963_ANNOUNCE_EVENT = "eip6963:announceProvider";
const EIP6963_REQUEST_EVENT = "eip6963:requestProvider";

/**
 * Find the announced EIP-6963 provider that matches the currently connected
 * injected provider, and return its display name + icon.
 *
 * Matching is by provider object identity: a spec-compliant wallet announces
 * the very same object it injects as `window.ethereum`. We also check
 * `selectedProvider`, which some multiplexing wallets (e.g. Coinbase) expose.
 *
 * @param {Array<{ info?: { name?: string, icon?: string }, provider?: unknown }>} providers
 *   The list of announced EIP-6963 provider details.
 * @param {unknown} connectedProvider The injected provider (`window.ethereum`).
 * @returns {{ name: string, icon: string | null } | null}
 *   The matched wallet's name/icon, or `null` when there is no match.
 */
function resolveConnectedWalletInfo(providers, connectedProvider) {
  if (!Array.isArray(providers) || providers.length === 0 || !connectedProvider) {
    return null;
  }

  const candidates = [connectedProvider, connectedProvider.selectedProvider].filter(Boolean);

  for (const detail of providers) {
    if (!detail || !detail.provider || !detail.info) continue;
    if (!candidates.includes(detail.provider)) continue;

    const { name, icon } = detail.info;
    if (typeof name === "string" && name.length > 0) {
      return { name, icon: typeof icon === "string" && icon.length > 0 ? icon : null };
    }
  }

  return null;
}

module.exports = {
  EIP6963_ANNOUNCE_EVENT,
  EIP6963_REQUEST_EVENT,
  resolveConnectedWalletInfo,
};
