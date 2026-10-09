import { LEVEL_HEIGHT, obstacles, type State } from './simulation';
const colors = {ink:'#153f38',floor:'#eadfb9',wall:'#659284',cream:'#fff8e7',gold:'#f2b947'};
function rect(c:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,color:string,r=0){c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();}
function text(c:CanvasRenderingContext2D,t:string,x:number,y:number,size=16,color=colors.ink){c.fillStyle=color;c.font=`700 ${size}px system-ui`;c.fillText(t,x,y);}
export function baursak(c:CanvasRenderingContext2D,x:number,y:number,size=20){
 c.save();c.translate(x,y);c.rotate(-.13);c.shadowColor='#88562055';c.shadowBlur=8;c.shadowOffsetY=4;
 const gr=c.createRadialGradient(-size*.3,-size*.4,2,0,0,size);gr.addColorStop(0,'#ffdf84');gr.addColorStop(.7,'#e8a93c');gr.addColorStop(1,'#bd7625');
 rect(c,-size,-size*.8,size*2,size*1.6,gr as unknown as string,size*.6);c.shadowBlur=0;c.shadowOffsetY=0;
 c.strokeStyle='#ffe8a3';c.lineWidth=2;c.beginPath();c.moveTo(-size*.4,-size*.4);c.quadraticCurveTo(0,-size*.7,size*.4,-size*.4);c.stroke();
 c.fillStyle='#8a5628';for(const [dx,dy] of [[-.4,.1],[.3,.3],[.1,-.2]]){c.beginPath();c.arc(dx!*size,dy!*size,1.4,0,Math.PI*2);c.fill();}c.restore();
}
export function draw(c:CanvasRenderingContext2D,s:State,w:number,h:number){
 const scale=w/(w/h<.9?440:760); const vh=h/scale; const camera=Math.max(0,Math.min(LEVEL_HEIGHT-vh,s.y-vh*.62));
 c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,w,h);c.setTransform(scale,0,0,scale,(w-760*scale)/2,0);
 rect(c,0,0,760,vh,'#71978a');c.save();c.translate(0,-camera);
 // Quiet rooms frame a busy corridor.
 for(let y=240;y<LEVEL_HEIGHT;y+=310){
  for(const x of [20,568]){
   rect(c,x,y,172,270,'#547e72',10);rect(c,x+12,y+12,148,245,'#cad4b9',5);
   rect(c,x+20,y+35,64,118,'#f6edd5',5);rect(c,x+24,y+40,55,30,'#a3c3ae',4);rect(c,x+24,y+83,55,61,'#e5b57b',4);
   rect(c,x+105,y+120,40,76,'#9d7953',5);rect(c,x+100,y+118,50,14,'#bb9669',4);
   rect(c,x+101,y+48,38,52,'#f6eacd',5);text(c,'Z z',x+103,y+82,13,'#739284');
  }
 }
 rect(c,195,100,370,3130,'#365f54',7);rect(c,208,110,344,3110,colors.floor,4);
 for(let y=110;y<3230;y+=64){c.strokeStyle='#d8c99e';c.lineWidth=1;c.beginPath();c.moveTo(211,y);c.lineTo(550,y);c.stroke();for(let x=210+(Math.round(y)%128===0?0:40);x<550;x+=80){c.beginPath();c.moveTo(x,y);c.lineTo(x,y+64);c.stroke();}}
 // Woven runner, with an ornament inspired by Kazakh textiles.
 rect(c,329,210,102,2840,'#bc795b');rect(c,337,214,86,2832,'#d69670');
 c.strokeStyle='#f5d3a5';c.lineWidth=2;for(let y=240;y<3010;y+=96){c.beginPath();c.moveTo(380,y-13);c.lineTo(395,y);c.lineTo(380,y+13);c.lineTo(365,y);c.closePath();c.stroke();c.beginPath();c.moveTo(345,y-25);c.lineTo(345,y+25);c.moveTo(415,y-25);c.lineTo(415,y+25);c.stroke();}
 for(let y=320;y<3200;y+=310){for(const x of [187,552])rect(c,x,y,20,90,'#b18159',3);text(c,String(200+Math.floor(y/310)),155,y+30,14,'#f3edd8');}
 for(const [label,y] of [['КУХНЯ · 03',2770],['КОШАЧЬЯ ТЕРРИТОРИЯ',1735],['ТИШЕ, ИДЁТ СЕССИЯ',710]] as const) {rect(c,243,y,275,36,'#f6edcf',5);text(c,label,258,y+24,13,'#846544');}
 rect(c,292,80,175,98,'#2c6c5a',9);rect(c,305,90,149,77,'#79b492',4);text(c,'КОМНАТА 201',322,113,13);text(c,'ДРУГ ЖДЁТ ↑',322,146,16);rect(c,365,165,30,30,'#ffe7a4',5);
 rect(c,283,3090,193,110,'#d2bd88',8);text(c,'СТАРТ',351,3186,16,'#8b7650');
 for(const o of obstacles(s.t)){
  c.save();c.shadowColor='#26453925';c.shadowBlur=5;c.shadowOffsetY=5;
  if(o.kind==='desk'){rect(c,o.x+8,o.y+5,o.w-16,o.h+9,'#785942',5);rect(c,o.x,o.y,o.w,o.h,'#bc9467',5);rect(c,o.x+13,o.y+10,30,26,'#f9eecf',2);rect(c,o.x+60,o.y+8,44,36,'#40685d',3);rect(c,o.x+64,o.y+11,36,27,'#a4c2ad',2);}
  if(o.kind==='plant'){rect(c,o.x+7,o.y+16,23,24,'#a56c52',3);c.fillStyle='#3f7050';for(let i=0;i<5;i++){c.beginPath();c.ellipse(o.x+18+Math.cos(i*1.3)*10,o.y+12+Math.sin(i*1.3)*9,8,13,i,0,Math.PI*2);c.fill();}}
  if(o.kind==='books'){rect(c,o.x,o.y,48,24,'#496c86',3);rect(c,o.x+5,o.y-5,42,23,'#efe4ca',2);rect(c,o.x+13,o.y-10,39,21,'#b76954',3);}
  if(o.kind==='door'){rect(c,o.x,o.y,o.w,o.h,'#a87650',3);rect(c,o.x+4,o.y+4,o.w-8,3,'#d9b18a');c.fillStyle='#eac278';c.beginPath();c.arc(o.x+o.w-8,o.y+14,3,0,Math.PI*2);c.fill();}
  if(o.kind==='cat'){c.translate(o.x+24,o.y+17);c.fillStyle='#e6ad70';c.beginPath();c.ellipse(0,0,22,13,0,0,Math.PI*2);c.fill();c.beginPath();c.arc(-15,-8,10,0,Math.PI*2);c.fill();c.beginPath();c.moveTo(-24,-12);c.lineTo(-24,-24);c.lineTo(-15,-16);c.lineTo(-8,-25);c.lineTo(-6,-10);c.fill();c.strokeStyle='#bc824e';c.lineWidth=5;c.beginPath();c.moveTo(16,2);c.quadraticCurveTo(32,-6,28,-19);c.stroke();c.fillStyle=colors.ink;c.fillRect(-22,-10,2,3);c.fillRect(-12,-10,2,3);}
  c.restore();
 }
 // Student + tray. The collectible moves independently inside the tray.
 c.save();c.translate(s.x,s.y);c.fillStyle='#2645392a';c.beginPath();c.ellipse(0,12,25,16,0,0,Math.PI*2);c.fill();
 rect(c,-13,4,10,26,'#284d4d',5);rect(c,4,4,10,26,'#284d4d',5);rect(c,-17,-10,34,31,'#de7859',12);
 c.fillStyle='#f4cc9d';c.beginPath();c.arc(0,-12,13,0,Math.PI*2);c.fill();c.fillStyle='#373b32';c.beginPath();c.ellipse(0,-18,13,7,0,0,Math.PI*2);c.fill();
 rect(c,-28,-49,56,43,'#9d9f89',10);rect(c,-25,-46,50,36,'#f7efdb',8);c.strokeStyle='#c9bc93';c.lineWidth=2;c.strokeRect(-18,-39,36,23);
 baursak(c,s.bx*.65,-28+s.by*.5,10);
 if(s.cooldown>.4){text(c,'ОЙ!',28,-20,17,'#9e493c');}c.restore();
 c.restore();
 const fade=c.createLinearGradient(0,0,0,70);fade.addColorStop(0,'#164b4025');fade.addColorStop(1,'#164b4000');rect(c,0,0,760,70,fade as unknown as string);
}
