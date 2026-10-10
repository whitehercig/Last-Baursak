# Submission copy — Last Baursak

Use this copy for a compliant Colosseum entry and the separate [Superteam Kazakhstan × iDos Games side track](https://superteam.fun/earn/listing/superteam-kazakhstan-x-idos-games-side-track/). The side track requires the project to be submitted to the Colosseum hackathon as well. Do not submit it from a second account belonging to someone already on another Colosseum team: the [official rules](https://colosseum.com/legal/Crypto%20World%27s%20Fair%20Hackathon%20Rules.pdf) allow each entrant to belong to one team and each team to submit one project at a time.

## Project name

Last Baursak

## One sentence

Last Baursak turns a late-night food delivery through a student dorm into a tiny arcade challenge inspired by Kazakh food and campus friendship.

## Short description — copy into the form

It is the night before an exam. Your friend is hungry and you have the last baursak. Reach room 201 before time runs out. Move through the dorm, avoid the cat and steady the tray when the baursak starts to wobble. The published iDos Games edition plays in about 45 seconds. The project is inspired by Kazakh food and a small act of care between students.

The published edition lets a player connect an injected Solana wallet and sign a unique login message as their game identity, without paying or signing a transaction. A separate local prototype explores a unique SPL collectible and an on-chain handoff; that prototype is not in the published build.

## Solana implementation

**Live build:** optional connection to an injected Solana wallet and a nonce-based message signature. The public address is shown only after the provider returns a signature. This is client-side wallet sign-in, not a server-verified session or on-chain achievement. No transaction, token, or payment is requested.

**Devnet relay prototype (not deployed in the live build):** a deterministic server replay verifies completion before preparing a transaction. Issuance creates a zero-decimal SPL mint, mints one unit to the player and revokes mint authority in the same transaction. The wallet signs a transfer to a friend's associated token account; an atomic Memo records the handoff.

The server attests gameplay; the token program enforces ownership. No custom program prevents transfers outside the game.

## Why this game

The challenge encourages ideas inspired by students, culture and communities. Last Baursak combines a familiar student situation, a Kazakh cultural detail, a tactile game mechanic and an asynchronous social relay that can be demonstrated in under two minutes.

## Links

- Public playable game: https://4nkmxdoj.idos.games/
- iDos Games game page: https://idosgames.com/app/4NKMXDOJ/
- Public GitHub repository: https://github.com/whitehercig/Last-Baursak
- Demo video of the published build, with English explanatory panel: https://github.com/whitehercig/Last-Baursak/blob/main/demo/live-idos-v6.mp4
- Confirmed mint transaction: not verified yet.
- Confirmed handoff transaction: not verified yet.

Do not present pending items as completed. The published game's UI is currently in Russian. The demo has English explanation and an English UI candidate is prepared in `docs/idos-english-candidate.tsx`, but it is not yet published. The Colosseum rules say submitted content must be in English; publish and recheck the English UI before submission.
