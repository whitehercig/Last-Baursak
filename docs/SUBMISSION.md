# Submission draft

## One sentence

Last Baursak turns a late-night food delivery through a student dorm into a tiny arcade challenge inspired by Kazakh food and campus friendship.

## Short description

It is the night before an exam. Your friend is hungry and you have the last baursak. Reach room 201 before time runs out. Move through the dorm, avoid the cat and steady the tray when the baursak starts to wobble. The published iDos Games edition plays in about 45 seconds; a more detailed local prototype explores continuous tray physics and a Devnet collectible relay.

The published edition lets a player connect an injected Solana wallet and sign a unique login message as their game identity, without paying or signing a transaction. The next Devnet milestone is a unique SPL relay collectible with an on-chain handoff history.

## Solana implementation

**Live build:** optional connection to an injected Solana wallet and a nonce-based message signature. The public address is shown only after the provider returns a signature. This is client-side wallet sign-in, not a server-verified session or on-chain achievement. No transaction, token, or payment is requested.

**Devnet relay prototype (not deployed in the live build):** a deterministic server replay verifies completion before preparing a transaction. Issuance creates a zero-decimal SPL mint, mints one unit to the player and revokes mint authority in the same transaction. The wallet signs a transfer to a friend's associated token account; an atomic Memo records the handoff.

The server attests gameplay; the token program enforces ownership. No custom program prevents transfers outside the game.

## Why this game

The challenge encourages ideas inspired by students, culture and communities. Last Baursak combines a familiar student situation, a Kazakh cultural detail, a tactile game mechanic and an asynchronous social relay that can be demonstrated in under two minutes.

## Required actual links — fill after deployment

- Public playable game: https://4nkmxdoj.idos.games/
- iDos Games game page: https://idosgames.com/app/4NKMXDOJ/
- Public GitHub repository: https://github.com/whitehercig/Last-Baursak
- Final demo video of the published build: not recorded yet.
- Confirmed mint transaction: not verified yet.
- Confirmed handoff transaction: not verified yet.

Do not present these pending items as completed. Check Kazakhstan eligibility and the final submission deadline in the sponsor listing before submitting.
