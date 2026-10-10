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
- The iDos Games title `4NKMXDOJ` is live at https://4nkmxdoj.idos.games/. Production V6 loaded and started a run. The platform Dev build detects the cat collision and accepts a successful route that steadies the tray. The public landing page was visually checked against the supplied screenshot and on a 390 px phone viewport.
- Public browser captures: [title screen](screenshots/live-idos-v6.jpg) and [gameplay](screenshots/live-gameplay-v6.jpg).

## Not yet verified / not delivered

- `npm run verify` still targets the unbound local scaffold and exits with `title_not_bound`; it is not a test of the live platform title.
- A confirmed mint/transfer round trip has not been executed. The public Devnet faucet returned an internal error followed by a 429 / empty-or-limited-faucet response. A funded test wallet is needed.
- The live wallet signature has not been tested with a real injected wallet; the no-wallet error path was tested locally. No server-verified session or on-chain achievement is implemented in the published build.
- The published game's mechanics are simpler than the local prototype. Do not claim that the public build has inertial tray physics, server replay, or an on-chain relay.
- The public GitHub repository and a [continuous demo of the published build](../demo/live-idos-v6.mp4) exist. The edited video adds English explanation; the raw capture is also included. Colosseum submission is still pending.
- The local gameplay recording is a separate practice run. The published-build video shows the actual platform game and identifies the Solana integration without claiming a live on-chain handoff.
- The live UI is currently Russian. Submission text and video explanation are English; an English UI candidate has passed local checks but is not published.

## Dependency audit

Installation revealed transitive dependency advisories. Compatible overrides removed shell-quote, uuid and stream-json findings. The remaining upstream audit findings stem from native bigint-buffer and packages that depend on it (including SPL token / the platform wallet stack). This Devnet MVP has not been audited for production financial use. Do not hide that state behind a “production-ready” claim.
