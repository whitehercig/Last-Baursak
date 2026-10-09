import { useEffect, useRef, useState } from 'react';
import { DT, LIMIT, VERSION, initialState, recordFrame, step, type Input, type Replay, type State } from '../game/simulation';
import { draw } from '../game/render';
import {bindInput,publishState,gameAgent} from '../game/agent';
export type RunResult = { state: State; replay: Replay };
export function Game({onFinish,onExit,sound}:{onFinish:(r:RunResult)=>void;onExit:()=>void;sound:boolean}) {
 const canvas=useRef<HTMLCanvasElement>(null), input=useRef<Input>({x:0,y:0,grip:false}), keys=useRef(new Set<string>());
 const [hud,setHud]=useState(initialState()),[paused,setPaused]=useState(false),pausedRef=useRef(false);
 const [countdown,setCountdown]=useState(3);
 const soundRef=useRef(sound);soundRef.current=sound;
 useEffect(()=>{let n=3;const timer=setInterval(()=>{n--;setCountdown(n);if(n===0)clearInterval(timer);},650);return()=>clearInterval(timer);},[]);
 useEffect(()=>{
  bindInput(next=>{input.current=next;});if(import.meta.env.DEV)(window as unknown as Record<string,unknown>).lastBaursakAgent=gameAgent;
  const c=canvas.current!,ctx=c.getContext('2d')!; const s=initialState();const replay:Replay={version:VERSION,frames:[]};let frame=0,last=0,acc=0,started=performance.now()+1950,done=false,oldBumps=0;
  let audio:AudioContext|undefined;
  function tone(freq:number){if(!soundRef.current)return;try{audio??=new AudioContext();void audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(.055,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.12);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+.13);}catch{ /* Audio optional. */ }}
  const resize=new ResizeObserver(()=>{const box=c.getBoundingClientRect();const dpr=Math.min(2,window.devicePixelRatio||1);c.width=Math.floor(box.width*dpr);c.height=Math.floor(box.height*dpr);});resize.observe(c);
  function loop(now:number){const delta=last?Math.min(.1,(now-last)/1000):0;last=now;
   if(now>=started&&!pausedRef.current&&!done){acc+=delta;while(acc>=DT&&!done){const k=keys.current;const controls=k.size?{x:(k.has('arrowright')||k.has('d')?1:0)-(k.has('arrowleft')||k.has('a')?1:0),y:(k.has('arrowdown')||k.has('s')?1:0)-(k.has('arrowup')||k.has('w')?1:0),grip:k.has(' ')}:input.current;
    const normalized={...controls,x:Math.round(controls.x*100)/100,y:Math.round(controls.y*100)/100};recordFrame(replay,normalized);step(s,normalized);acc-=DT;if(s.bumps>oldBumps){tone(140);oldBumps=s.bumps;}if(s.status!=='playing'){done=true;tone(s.status==='won'?660:110);onFinish({state:{...s},replay});}}
    if(s.steps%4===0)setHud({...s});
   }
   publishState(pausedRef.current?{...s,reason:'paused'}:s);draw(ctx,s,c.width,c.height);frame=requestAnimationFrame(loop);
  }
  frame=requestAnimationFrame(loop);
  const down=(e:KeyboardEvent)=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','w','a','s','d','W','A','S','D'].includes(e.key)){e.preventDefault();keys.current.add(e.key.toLowerCase());}};
  const up=(e:KeyboardEvent)=>keys.current.delete(e.key.toLowerCase());
  const blur=()=>{keys.current.clear();input.current={x:0,y:0,grip:false};pausedRef.current=true;setPaused(true);};
  window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('blur',blur);
  return()=>{bindInput(null);publishState(null);delete (window as unknown as Record<string,unknown>).lastBaursakAgent;cancelAnimationFrame(frame);resize.disconnect();window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('blur',blur);void audio?.close();};
 },[onFinish]);
 const balance=Math.min(100,Math.hypot(hud.bx,hud.by)/30*100),progress=Math.max(0,Math.min(100,(3140-hud.y)/2970*100));
 function pad(e:React.PointerEvent<HTMLDivElement>){e.currentTarget.setPointerCapture(e.pointerId);const r=e.currentTarget.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)/(r.width*.34),y=(e.clientY-r.top-r.height/2)/(r.height*.34);input.current.x=Math.max(-1,Math.min(1,x));input.current.y=Math.max(-1,Math.min(1,y));}
 return <div className="play-layout" data-game-status={hud.status}>
  <div className="game-stage"><canvas ref={canvas} aria-label="Коридор общежития. Управляй стрелками или WASD, удерживай пробел для равновесия."/>
   <div className="game-top"><button className="round-button" onClick={onExit} aria-label="Выйти из забега">←</button><span className="location-label">ОБЩЕЖИТИЕ № 3 <b>02:47</b></span><button className="round-button" onClick={()=>{pausedRef.current=!pausedRef.current;setPaused(pausedRef.current);}} aria-label="Пауза">Ⅱ</button></div>
   {countdown>0&&<div className="countdown"><strong>{countdown}</strong><span>Донеси до комнаты 201</span></div>}
   {paused&&<div className="countdown"><strong>Пауза</strong><button className="primary" onClick={()=>{pausedRef.current=false;setPaused(false);}}>Продолжить →</button></div>}
   <div className="touch-controls"><div className="joystick" role="button" aria-label="Джойстик движения" onPointerDown={pad} onPointerMove={e=>{if(e.buttons)pad(e);}} onPointerUp={()=>{input.current.x=0;input.current.y=0;}} onPointerCancel={()=>{input.current.x=0;input.current.y=0;}}><span>↑<br/>← · →<br/>↓</span></div><button className="grip-button" onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);input.current.grip=true;}} onPointerUp={()=>{input.current.grip=false;}} onPointerCancel={()=>{input.current.grip=false;}}>Придержать</button></div>
  </div>
  <aside className="game-sidebar"><p className="eyebrow">ОПЕРАЦИЯ «ДОНЕСТИ»</p><h2>Друг ждёт.<br/>Бауырсак тоже.</h2><div className="timer">{Math.max(0,LIMIT-hud.t).toFixed(1)}<span>секунд осталось</span></div><div className="meter-label"><span>До друга</span><b>{Math.round(progress)}%</b></div><div className="meter"><i style={{width:`${progress}%`}}/></div><div className="meter-label"><span>На краю подноса</span><b>{balance>70?'Осторожно!':'Всё хорошо'}</b></div><div className="meter balance"><i style={{width:`${balance}%`,background:balance>70?'#cc6750':'#e8b545'}}/></div><div className="meter-label"><span>Сила рук</span><b>{Math.round(hud.grip*100)}%</b></div><div className="meter"><i style={{width:`${hud.grip*100}%`}}/></div><div className="tip">Резкие движения раскачивают поднос. <kbd>Space</kbd> помогает удержать бауырсак.</div><div className="controls-note"><kbd>W</kbd><br/><kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd><span>или стрелки для движения</span></div><p className="small muted">Коты имеют преимущество на дороге.</p></aside>
 </div>;
}
