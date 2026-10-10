# iDos Games deployment status

The title **Last Baursak** is already created in iDos Games under ID `4NKMXDOJ`; its DEV identity is `4NKMXDOJ-DEV`.

- Published game: https://4nkmxdoj.idos.games/
- Public title page: https://idosgames.com/app/4NKMXDOJ/
- Platform editor: https://platform.idosgames.com/4NKMXDOJ/ai-coding
- Published source adaptation: [idos-live.tsx](idos-live.tsx)

The current build was edited and compiled in iDos Games AI Coding. The platform reported a successful build, and the public game was checked in a browser. The local `src/idos.title.ts` is an unbound scaffold file and is not the canonical identity of the live title. `npm run verify` checks that local scaffold, so its `title_not_bound` result does not describe the published game.

The more elaborate local game and Solana Devnet relay API in `src/modules/last-baursak/` and `server/` are separate prototypes. Deploying them would require an HTTPS API, persistent issuer data, allowed origins, and test SOL for Devnet transactions. None of those on-chain relay steps are part of the current public build. The live game uses an optional, no-fee Solana message signature for player identity.

For the hackathon, the remaining tasks are to record a demo of the **published** build and submit it through an eligible Colosseum project. The Colosseum account currently has a separate team project, so do not modify that project without an explicit decision from its owner and team.
