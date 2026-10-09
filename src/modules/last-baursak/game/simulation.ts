/** Shared deterministic simulation. Browser records inputs; server replays at 60 Hz. */
export const VERSION = 1;
export const DT = 1 / 60;
export const LEVEL_HEIGHT = 3300;
export const LIMIT = 65;
export type Input = { x: number; y: number; grip: boolean };
export type Obstacle = { x: number; y: number; w: number; h: number; kind: 'desk' | 'books' | 'plant' | 'door' | 'cat' };
export type State = { x: number; y: number; vx: number; vy: number; bx: number; by: number; bvx: number; bvy: number; grip: number; t: number; steps: number; bumps: number; cooldown: number; status: 'playing' | 'won' | 'lost'; reason: string };
export type Replay = { version: number; frames: Array<[number, number, number, number]> };
export function initialState(): State { return { x: 380, y: 3140, vx: 0, vy: 0, bx: 0, by: 0, bvx: 0, bvy: 0, grip: 1, t: 0, steps: 0, bumps: 0, cooldown: 0, status: 'playing', reason: '' }; }
export function obstacles(t: number): Obstacle[] {
  const list: Obstacle[] = [];
  for (const y of [2820, 2310, 1790, 1260, 750]) {
    const left = (Math.round(y / 10) % 3) === 0;
    list.push({ x: left ? 220 : 415, y, w: 125, h: 68, kind: 'desk' });
    list.push({ x: left ? 514 : 235, y: y - 120, w: 32, h: 40, kind: 'plant' });
  }
  for (const y of [2570, 2040, 1510, 990, 470]) {
    const left = Math.round(y / 10) % 2 === 1;
    const open = (Math.sin(t * 1.1 + y) + 1) / 2;
    list.push({ x: left ? 214 : 546 - 105 * open, y, w: 12 + 105 * open, h: 23, kind: 'door' });
  }
  for (const y of [2690, 2190, 1640, 1120, 600]) list.push({ x: 320 + 68 * Math.sin(y), y, w: 54, h: 30, kind: 'books' });
  list.push({ x: 362 + 125 * Math.sin(t * 1.7), y: 1870 + 30 * Math.cos(t), w: 48, h: 34, kind: 'cat' });
  list.push({ x: 360 + 120 * Math.sin(t * 1.2 + 1), y: 890, w: 48, h: 34, kind: 'cat' });
  return list;
}
export function step(s: State, raw: Input): State {
  if (s.status !== 'playing') return s;
  const input = { x: Math.max(-1, Math.min(1, raw.x)), y: Math.max(-1, Math.min(1, raw.y)), grip: Boolean(raw.grip) };
  const len = Math.max(1, Math.hypot(input.x, input.y));
  const gripping = input.grip && s.grip > .025;
  const speed = gripping ? 78 : 132;
  const prevX = s.vx, prevY = s.vy;
  s.vx += (input.x / len * speed - s.vx) * .105;
  s.vy += (input.y / len * speed - s.vy) * .105;
  s.x += s.vx * DT; s.y += s.vy * DT;
  s.t += DT; s.steps++; s.cooldown = Math.max(0, s.cooldown - DT);
  s.grip = Math.max(0, Math.min(1, s.grip + (gripping ? -.14 : .085) * DT));
  const radius = 17;
  let bumpX = 0, bumpY = 0;
  if (s.x < 228) { s.x = 228; bumpX = 1; s.vx = 0; }
  if (s.x > 532) { s.x = 532; bumpX = -1; s.vx = 0; }
  s.y = Math.min(3170, Math.max(145, s.y));
  for (const o of obstacles(s.t)) {
    const nx = Math.max(o.x, Math.min(s.x, o.x + o.w));
    const ny = Math.max(o.y, Math.min(s.y, o.y + o.h));
    const dx = s.x - nx, dy = s.y - ny, distance = Math.hypot(dx, dy);
    if (distance < radius) {
      if (distance > .001) { s.x += dx / distance * (radius - distance); s.y += dy / distance * (radius - distance); bumpX = dx / distance; bumpY = dy / distance; }
      else { const side = [s.x-o.x,o.x+o.w-s.x,s.y-o.y,o.y+o.h-s.y]; const m=Math.min(...side); if(m===side[0]) {s.x=o.x-radius;bumpX=-1;} else if(m===side[1]){s.x=o.x+o.w+radius;bumpX=1;} else if(m===side[2]){s.y=o.y-radius;bumpY=-1;} else{s.y=o.y+o.h+radius;bumpY=1;} }
      s.vx *= .45; s.vy *= .45;
    }
  }
  if ((bumpX || bumpY) && s.cooldown <= 0) { s.bumps++; s.cooldown = .65; s.bvx += bumpX * 13; s.bvy += bumpY * 13; }
  const gripForce = gripping ? .25 : 1;
  s.bvx += -(s.vx - prevX) * .72 * gripForce - s.bx * .045;
  s.bvy += -(s.vy - prevY) * .72 * gripForce - s.by * .045;
  s.bvx *= gripping ? .86 : .965; s.bvy *= gripping ? .86 : .965;
  s.bx += s.bvx * DT; s.by += s.bvy * DT;
  if (Math.hypot(s.bx, s.by) > 30) { s.status = 'lost'; s.reason = 'Бауырсак упал с подноса'; }
  else if (s.t >= LIMIT) { s.status = 'lost'; s.reason = 'Экзамен начался. Попробуем ещё раз?'; }
  else if (s.y <= 170 && Math.abs(s.x - 380) < 85) { s.status = 'won'; s.reason = 'Ты донёс! Друг спасён.'; }
  return s;
}
export function encodeInput(input: Input): [number, number, number] { return [Math.round(input.x * 100), Math.round(input.y * 100), input.grip ? 1 : 0]; }
export function recordFrame(replay: Replay, input: Input) { const [x,y,g] = encodeInput(input); const last = replay.frames.at(-1); if (last && last[1] === x && last[2] === y && last[3] === g) last[0]++; else replay.frames.push([1,x,y,g]); }
export function replayRun(replay: unknown): State {
  if (!replay || typeof replay !== 'object') throw new Error('Missing replay');
  const r = replay as Replay;
  if (r.version !== VERSION || !Array.isArray(r.frames) || r.frames.length > LIMIT * 60) throw new Error('Invalid replay');
  const s = initialState();
  for (const frame of r.frames) {
    if (!Array.isArray(frame) || frame.length !== 4 || !frame.every(Number.isFinite)) throw new Error('Invalid input frame');
    const [count,x,y,g] = frame;
    if (!Number.isInteger(count) || count < 1 || count > LIMIT * 60 || Math.abs(x) > 100 || Math.abs(y) > 100 || ![0,1].includes(g) || s.steps + count > LIMIT * 60 + 1) throw new Error('Invalid input range');
    for (let i=0;i<count;i++) step(s,{x:x/100,y:y/100,grip:g===1});
  }
  return s;
}
