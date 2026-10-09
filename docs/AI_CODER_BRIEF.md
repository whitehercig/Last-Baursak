# AI Coder brief — Last Baursak

Create an iDos Games project called “Last Baursak”, using Solana as its blockchain integration. It is a short 2D game about delivering the last piece of baursak to a hungry friend in a Kazakh university dorm the night before an exam.

The player moves upward toward room 201, dodging desks, books, opening doors and moving cats. A baursak slides on a tray according to acceleration and collisions. WASD/arrows move, Space steadies the tray at the cost of speed and stamina. Include touch joystick and hold-to-steady controls, pause, failure and instant restart, a clear timer, and a win screen.

Use a warm cream / forest-green / ochre visual theme with original illustrated visuals. Prioritize smooth input, clear obstacle silhouettes and a comprehensible first run. Practice should be playable before wallet connection.

The working source module already exists as `src/modules/last-baursak/`, and is designed for the official module contract. Keep the official host, generated Title identity and module registry. Install this module into the actual project using the editor's supported source-edit workflow. Do not replace a real Title ID with a placeholder and do not claim a live integration before it works.

The intended Solana relay uses a unique SPL token on Devnet (supply 1, decimals 0, mint authority revoked). A separate authenticated Node API verifies deterministic input replays and prepares issuance / transfer transactions. Connect only to a deployed real API, display actual RPC errors, and show confirmation and Explorer links only after success. The API endpoint must be configured through VITE_RELAY_API_URL. Do not imitate blockchain success with localStorage or a generated fake signature.

The first platform milestone is a playable run inside AI Coder's preview, followed by a real SDK login in the paired DEV Title. Then verify issuance and handoff between two funded Devnet wallets. Explain any platform build dependency restrictions rather than hiding them.
