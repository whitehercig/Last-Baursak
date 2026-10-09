# Gameplay

Browser and server use the same 60 Hz simulation. Both quantize each axis to hundredths before applying input. Changes to constants or obstacle timing require regenerating the winning replay fixture and verifying parity, or older recorded runs may fail.

The agent's move action uses the actual input path and is bounded to two seconds. It can automate valid play; replay verification is not a defense against bots. The browser debug global exists only in the development build; the official ctx.exposeToAgent surface remains available in a Title-bound host.

Only practice preference/result UI is transient client state. Verified runs are authenticated API state. Local practice does not mint or award an on-chain collectible.
