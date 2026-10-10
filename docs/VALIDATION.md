# Validation status — 2026-10-10

## Passed

- TypeScript checks include both the client and Node API.
- Production Vite build passes.
- Six automated tests cover a complete winning replay, deterministic server/client parity, invalid input ranges, excessive time, a failed run's terminal state, replay compression and one-unit collectible issuance instructions.
- Chromium smoke checks: home, gameplay, pause/resume, exit, relay, missing-wallet error handling.
- Desktop (1440 px) and mobile (390 px): no horizontal overflow; touch controls visible. Screenshots were inspected and the mobile camera was adjusted to make gameplay readable.
- A complete Chromium run through the actual input path reaches the win screen in approximately 32 seconds; a second real-time recorded run wins in approximately 34 seconds.
- Live API test: signed challenge authentication, single-use challenge protection, rejection of anonymous sessions, rejection of mint before completion, rejection of a fabricated win and impossible fast replay.
- The API replayed and confirmed a real 30.2-second winning fixture.
- Live Solana Devnet RPC: correct genesis, rent/blockhash reads, mint transaction construction and all required signatures. The fully signed transaction fits the Solana packet size (864 bytes).
- The iDos Games title `4NKMXDOJ` is live at https://4nkmxdoj.idos.games/. Production v7 has an English interface. The platform Dev build passed, then the public build was tested through a cat collision, retry, successful route using the steady control, and relay page. The v7 landing page and gameplay controls were visually checked at a 390 px phone viewport without horizontal overflow.
- Public v7 browser captures: [title screen](screenshots/live-idos-v7.jpg) and [winning gameplay](screenshots/live-gameplay-v7.jpg).

## Not yet verified / not delivered

- `npm run verify` still targets the unbound local scaffold and exits with `title_not_bound`; it is not a test of the live platform title.
- A confirmed mint/transfer round trip has not been executed. The public Devnet faucet returned an internal error followed by a 429 / empty-or-limited-faucet response. A funded test wallet is needed.
- The live wallet signature has not been tested with a real injected wallet; the no-wallet error path was tested locally. No server-verified session or on-chain achievement is implemented in the published build.
- The published game's mechanics are simpler than the local prototype. Do not claim that the public build has inertial tray physics, server replay, or an on-chain relay.
- The public GitHub repository and a [v7 walkthrough assembled from captured public-game frames](../demo/live-idos-v7.mp4) exist. The continuous [v6 browser capture](../demo/live-gameplay-raw.webm) is retained as historical footage. Colosseum submission is still pending.
- The local gameplay recording is a separate practice run. The v7 walkthrough shows the actual platform game's states and identifies the Solana integration without claiming a completed wallet signature or live on-chain handoff.

## Dependency audit

Installation revealed transitive dependency advisories. Compatible overrides removed shell-quote, uuid and stream-json findings. The remaining upstream audit findings stem from native bigint-buffer and packages that depend on it (including SPL token / the platform wallet stack). This Devnet MVP has not been audited for production financial use. Do not hide that state behind a “production-ready” claim.
