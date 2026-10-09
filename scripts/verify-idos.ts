import {createIDosGamesClient} from '@idosgames/core';
import {IDOS_TITLE_ID} from '../src/idos.title';
if(!IDOS_TITLE_ID){console.error(JSON.stringify({ok:false,reason:'title_not_bound',action:'Create a Title in iDos Games and use its generated src/idos.title.ts. Platform integration is unverified until a real DEV login passes.'}));process.exit(1);}
const client=createIDosGamesClient({titleID:`${IDOS_TITLE_ID}-DEV`,throttleMs:0});
const login=await client.auth.loginWithDeviceID();
if(!login.ok){console.error(JSON.stringify({ok:false,reason:'dev_login_failed',error:login.error}));process.exit(1);}
console.log(JSON.stringify({ok:true,title:`${IDOS_TITLE_ID}-DEV`,scenario:'real-sdk-dev-login'}));
