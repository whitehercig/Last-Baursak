import { defineModule } from '@idosgames/module-sdk';
import {createElement} from 'react';
import { App } from './components/App';
import {gameAgent} from './game/agent';
export const lastBaursakModule = defineModule({
  id:'last-baursak',meta:{name:'Last Baursak',type:'game',genre:'casual',engine:'dom'},
  setup(ctx) {
    ctx.registerRoute({id:'last-baursak',label:'Last Baursak',icon:'🥯'});
    ctx.registerPanel({id:'game',slot:'overlay',component:()=>createElement('div',{style:{position:'absolute',inset:0,overflowY:'auto',pointerEvents:'auto',background:'#f8f5eb'}},createElement(App))});
    ctx.exposeToAgent(gameAgent);
  }
});
