# Validation status — 2026-10-05

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

## Not yet verified / not delivered

- A genuine iDos Games Title and AI Coder preview are not available: the user has no platform account yet. `npm run verify` exits with title_not_bound until identity is supplied.
- A confirmed mint/transfer round trip has not been executed. The public Devnet faucet returned an internal error followed by a 429 / empty-or-limited-faucet response. A funded test wallet is needed.
- The platform host is build/type checked, but its actual sign-in, iframe wallet behavior and dependency allowlist must be checked inside the real project.
- No public playable deployment, public GitHub repository or final hackathon submission has been created.
- The local gameplay recording shows practice. The final submission video must include the real platform game and confirmed Solana actions.
- The UI is currently Russian. Submission text and storyboard are English.

## Dependency audit

Installation revealed transitive dependency advisories. Compatible overrides removed shell-quote, uuid and stream-json findings. The remaining upstream audit findings stem from native bigint-buffer and packages that depend on it (including SPL token / the platform wallet stack). This Devnet MVP has not been audited for production financial use. Do not hide that state behind a “production-ready” claim.
