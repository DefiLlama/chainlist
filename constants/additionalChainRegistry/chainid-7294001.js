// ARTEX security-research canary (intent 7294). Harmless and reversible.
// Purpose: prove whether the chainlist "Validate Chain Files" workflow ever imports
// PR-supplied files under pull_request_target. This module only logs a marker at
// import time; it has no other side effects. The PR is closed after the CI run.
console.log('ARTEX_CANARY_7294_MODULE_IMPORTED');

export const data = {
  "name": "Artex Canary 7294",
  "chain": "ARTEXCANARY",
  "icon": "canary",
  "rpc": [
    "https://example.invalid/artex-canary-7294"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Artex Canary",
    "symbol": "CNRY",
    "decimals": 18
  },
  "infoURL": "https://example.invalid/artex-canary-7294",
  "shortName": "artexcanary",
  "chainId": 7294001,
  "networkId": 7294001,
  "explorers": []
};
