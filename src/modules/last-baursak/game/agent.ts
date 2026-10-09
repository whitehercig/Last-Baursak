import type { ModuleAgentApi } from '@idosgames/module-sdk';
import type { Input, State } from './simulation';
let generation=0;let current:State|null=null;let setter:((input:Input)=>void)|null=null;
export function publishState(state:State|null){current=state?{...state}:null;}
export function bindInput(fn:((input:Input)=>void)|null){setter=fn;}
export const gameAgent:ModuleAgentApi={
 state:()=>({mounted:!!setter,playing:!!setter&&current?.status==='playing'&&current?.reason!=='paused',player:current?{...current}:null}),
 actions:{move:async args=>{if(!setter)throw new Error('Start a run first');const x=Number(args?.x??0),y=Number(args?.y??0),ms=Number(args?.ms??250);if(!Number.isFinite(x)||!Number.isFinite(y)||Math.abs(x)>1||Math.abs(y)>1||!Number.isFinite(ms)||ms<0||ms>2000)throw new Error('x/y must be -1..1; ms must be 0..2000');const set=setter,seq=++generation;set({x,y,grip:Boolean(args?.grip)});await new Promise(r=>setTimeout(r,ms));if(setter===set&&generation===seq)set({x:0,y:0,grip:false});}},
 describeActions:{move:'Move through the real input path: {x: -1..1, y: -1..1, grip?: boolean, ms?: 0..2000}.'}
};
