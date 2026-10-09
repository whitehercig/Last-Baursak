# Relay

Issuance is server-cosigned and uses an SPL mint with supply one, decimals zero and revoked mint authority. The collectible has no Metaplex metadata. Memo history is checked against actual token instructions and recipient associated token accounts; arbitrary memo text alone is insufficient.

The token remains transferable outside the game. Those external transfers change the owner but do not appear as game-verified handoffs. There is no custom on-chain enforcement of completion. The issuer trusts deterministic replays and elapsed time, not the client's status/score.

The UI/API form two deployments: static iDos Games client and HTTPS Node API. The same issuer key must persist. Auth challenges are single-use. Prepared transaction messages are hashed and matched on submit. Devnet genesis must match before any submission.

The MVP reads the newest signatures, up to 1000 references for a mint, and displays genesis plus approximately 30 recent handoffs. Very long histories need proper indexed pagination before wider use. Sessions and runs are in memory. API restart requires players to sign in and run again.
