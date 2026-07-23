# WASM Engine Vendor Assets

These browser-runtime dependencies are pinned locally so the isolated game frame does not execute
third-party CDN JavaScript.

| Asset | Upstream source | License | SHA-256 |
| --- | --- | --- | --- |
| `jquery-3.3.1.min.js` | `https://code.jquery.com/jquery-3.3.1.min.js` | MIT | `160a426ff2894252cd7cebbdd6d6b7da8fcd319c65b70468f10b6690c45d02ef` |
| `rivets-0.9.6.bundled.min.js` | `https://cdnjs.cloudflare.com/ajax/libs/rivets/0.9.6/rivets.bundled.min.js` | MIT | `5bbf6dbcc1e5968462c6440dac68dfdaacfe9e48ecba146d57437a76e24e627c` |

When updating either file, fetch the exact versioned upstream URL, recalculate its SHA-256 digest,
and keep both WASM CSP owners restricted to local script sources.
