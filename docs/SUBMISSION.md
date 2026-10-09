# Submission draft

## One sentence

Last Baursak turns a late-night food delivery through a chaotic student dorm into a social relay, where one unique Solana collectible travels from friend to friend.

## Short description

It is the night before an exam. Your friend is hungry and you have the last baursak. Carry it through a dorm full of opening doors, scattered lecture notes and territorial cats. Momentum makes it slide across the tray, so every shortcut is a balance between speed and control.

The published V1 uses Solana wallet authentication: a player can connect an injected Solana wallet as their game identity without paying or signing a transaction. The next Devnet milestone is a unique SPL relay collectible with an on-chain handoff history.

## Solana implementation

**Live V1:** Solana wallet authentication through an injected wallet provider, used as the player's game identity. No transaction, token, or payment is requested.

**Devnet relay prototype (not deployed in V1):** a deterministic server replay verifies completion before preparing a transaction. Issuance creates a zero-decimal SPL mint, mints one unit to the player and revokes mint authority in the same transaction. The wallet signs a transfer to a friend's associated token account; an atomic Memo records the handoff.

The server attests gameplay; the token program enforces ownership. No custom program prevents transfers outside the game.

## Why this game

The challenge encourages ideas inspired by students, culture and communities. Last Baursak combines a familiar student situation, a Kazakh cultural detail, a tactile game mechanic and an asynchronous social relay that can be demonstrated in under two minutes.

## Required actual links — fill after deployment

- Public playable game: https://4nkmxdoj.idos.games/
- iDos Games game page: https://idosgames.com/app/4NKMXDOJ/
- Public GitHub repository: not published yet.
- Final demo video: not recorded yet.
- Confirmed mint transaction: not verified yet.
- Confirmed handoff transaction: not verified yet.

Do not present these pending items as completed. Check Kazakhstan eligibility and the final submission deadline in the sponsor listing before submitting.
