# Last Baursak — project guide

Last Baursak is a short 2D student delivery game with inertial tray physics, keyboard/touch controls and a Solana Devnet social relay. Original illustration and gameplay live in one iDos Games module.

## Current identity and status

The source is scaffolded from the official @idosgames/mcp 0.1.27 registry. The real iDos Games title is `4NKMXDOJ` (DEV identity `4NKMXDOJ-DEV`), published at https://4nkmxdoj.idos.games/. The platform editor owns the published source; `src/idos.title.ts` remains the unbound local template. The published single-file adaptation is tracked in `docs/idos-live.tsx`. Do not claim that the separate local Devnet relay API is deployed.

## Installed modules

- `last-baursak` (0.1.0) — `src/modules/last-baursak/`.

## Layout

- `src/main.tsx`: chooses local practice when unbound; otherwise loads the official platform bootstrap.
- `src/platform.tsx`, `src/base/`: official iDos Games client / host / login / lobby.
- `src/modules.ts`: imports and module array only.
- `src/modules/last-baursak/game/`: deterministic simulation, original renderer, agent observation and real-input actions.
- `src/modules/last-baursak/components/`: UI, gameplay loop, wallet/API bridge.
- `server/`: separate Node API that validates signatures and input replays, prepares Solana transactions and reads chain history. Static client hosting does not host this API.
- `scripts/verify-idos.ts`: real DEV Title login; fails explicitly when no Title exists.

## Rules

Keep simulation deterministic and share the exact code between browser and server. Quantize inputs before simulation and recording. Never accept a client-supplied outcome as proof of a win. Never label a pending/failed transaction as confirmed.

Solana supply/ownership is enforced by the SPL token program; gameplay is attested by our server. There is no custom program preventing external transfers. Do not claim stronger guarantees. This is a unique SPL collectible without Metaplex metadata.

Do not put private keys in client files. `.server-data/` is ignored by Git and contains the server issuer key. Persist it when hosting. Active verified runs are in memory and are lost on API restart. Use test SOL only; mainnet submissions are explicitly rejected.

Module code imports its own files and npm packages, never another module or host config. Client instances and platform login belong to the host. Styling for official host components belongs in `src/ui.config.ts`. Consult official iDos Games SDK skills before adding services; do not invent method names.

## Run

`npm ci`, then `npm start` (client port 5187, API 8787). Check with `npm test` and `npm run build`. `npm run verify` is a platform check, not a local mock.

Keep feature constraints in `docs/feature-history/`. Current release gaps and evidence are in `docs/VALIDATION.md`.
