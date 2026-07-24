# Retro Engine Third-Party Notices

The isolated browser runtime is distributed separately from the portfolio application code. These
notices document the exact inherited artifacts; they do not relicense third-party software or game
data.

## DosWasmX and DOSBox-X

- Runtime distribution: [DosWasmX v0.3](https://github.com/nbarkhina/DosWasmX/tree/v0.3)
- Emulator core: [DOSBox-X revision `59744fe`](https://github.com/joncampbell123/dosbox-x/tree/59744fe)
- Build toolchain recorded by upstream: Emscripten 3.1.49 with the documented custom Binaryen build
  required for Wasm exceptions plus Asyncify.
- Local `main.wasm` SHA-256:
  `8c10572678e46fd1fd97d0b23eca8589c8b55aa82e4e9df9fb58160c2bd4631a`
- Verification: the local binary digest matches `dist/main.wasm` from the DosWasmX `v0.3` tag.
- License: the DOSBox-X core is GNU GPL version 2. A copy is included at
  `licenses/GPL-2.0.txt`; the corresponding source is linked above.

The glue JavaScript and WASM binary are a matched build pair. Do not replace one without the other.
A rebuild is a separate migration that must preserve source, toolchain, license, and browser-test
evidence.

## Browser Wrapper

The portfolio wrapper no longer ships the inherited jQuery or Rivets dependencies. Its remaining
loader and DOM code is local first-party integration code around the pinned engine pair.

## DOOM Shareware Data

The `roms/doom` directory contains the original DOOM shareware distribution files used by the demo.
They remain copyright id Software and are not covered by the portfolio application's source-code
terms. The original `README.TXT` and `ORDER.FRM` are retained with the distribution.
