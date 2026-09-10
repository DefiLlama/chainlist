import { useEffect, useState } from "react";
import { EIP6963_ANNOUNCE_EVENT, EIP6963_REQUEST_EVENT } from "../utils/eip6963";

/**
 * Discover injected wallets via EIP-6963.
 *
 * Listens for `eip6963:announceProvider` events, then asks every wallet to
 * announce itself with `eip6963:requestProvider`. Announcements are de-duped by
 * their `info.uuid`. Returns the list of announced provider details.
 *
 * SSR-safe: does nothing until mounted in the browser.
 *
 * https://eips.ethereum.org/EIPS/eip-6963
 */
export default function useEip6963Providers() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const seen = new Map();

    const onAnnounce = (event) => {
      const detail = event?.detail;
      const uuid = detail?.info?.uuid;
      if (!uuid || !detail?.provider) return;
      if (seen.has(uuid)) return;
      seen.set(uuid, detail);
      setProviders(Array.from(seen.values()));
    };

    window.addEventListener(EIP6963_ANNOUNCE_EVENT, onAnnounce);
    window.dispatchEvent(new Event(EIP6963_REQUEST_EVENT));

    return () => window.removeEventListener(EIP6963_ANNOUNCE_EVENT, onAnnounce);
  }, []);

  return providers;
}
