#!/usr/bin/env node
/**
 * Sound bed for the POV court film — synthesized, nothing sampled or licensed.
 *
 * This is a temp track in the proper sense: it establishes the arrangement,
 * the ducks and the exact position of every hit, so the picture can be cut
 * against it now and the recorded location sound, dialogue and licensed music
 * can be laid against the same grid later.
 *
 * Cut times mirror POV_BEATS in src/pov/config.ts.
 *
 * Run with: npm run audio:pov
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SR = 44100;
const DURATION = 24.0;
const N = Math.round(SR * DURATION);

const B = {
  firstBass: 4.7, // "Appunto."
  musicIn: 5.0,
  muteBefore: 11.4,
  impact: 11.6,
  payoffDown: 14.0,
  montageIn: 17.0,
  signOff: 21.0,
  loopTail: 23.0,
};

const OUT = fileURLToPath(
new URL("../public/assets/audio/pov-soundtrack.wav", import.meta.url),
);

const buf = new Float64Array(N);

const add = (i, v) => {
  const k = Math.round(i);
  if (k >= 0 && k < N) buf[k] += v;
};

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const noise = (len) => {
  const o = new Float64Array(len);
  for (let n = 0; n < len; n++) o[n] = Math.random() * 2 - 1;
  return o;
};

const lowpass = (arr, cutoffAt) => {
  let y = 0;
  const o = new Float64Array(arr.length);
  for (let n = 0; n < arr.length; n++) {
    const a = 1 - Math.exp((-2 * Math.PI * cutoffAt(n / SR)) / SR);
    y += a * (arr[n] - y);
    o[n] = y;
  }
  return o;
};

const highpass = (arr, cutoff) => {
  const a = Math.exp((-2 * Math.PI * cutoff) / SR);
  let y = 0;
  let px = 0;
  const o = new Float64Array(arr.length);
  for (let n = 0; n < arr.length; n++) {
    y = a * (y + arr[n] - px);
    px = arr[n];
    o[n] = y;
  }
  return o;
};

/**
 * The master gate. The split-second of true silence before contact is the
 * whole retention device — the ear notices absence faster than it notices
 * volume, so 0.2s of nothing is what makes the strike land.
 */
const gate = (t) => {
  if (t >= B.muteBefore && t < B.impact) return 0;
  return 1;
};

/** Arrangement level, before the gate. */
const level = (t) => {
  if (t < B.firstBass) return 0.22 * smooth(0, 0.5, t); // ambience only, under dialogue
  if (t < B.musicIn) return 0.22 + 0.3 * smooth(B.firstBass, B.musicIn, t);
  if (t < B.impact) return 0.62 + 0.38 * smooth(B.musicIn, B.impact, t); // the build
  if (t < B.payoffDown) return 1;
  if (t < B.montageIn) return 0.5; // drops back so the line lands
  if (t < B.signOff) return 1;
  return 1 - 0.75 * smooth(B.signOff, B.loopTail + 0.6, t);
};

// --------------------------------------------------------------------------
// Court ambience — the bed the whole first act sits on
// --------------------------------------------------------------------------

const addAmbience = () => {
  const air = lowpass(noise(N), () => 900);
  const hiss = highpass(noise(N), 4000);
  for (let n = 0; n < N; n++) {
    const t = n / SR;
    const g = level(t) * gate(t);
    // Outdoor air, plus a faint high band that reads as open space.
    buf[n] += (air[n] * 0.055 + hiss[n] * 0.012) * Math.min(1, g * 1.6);
  }
};

/** Distant strikes from the next court — sparse, irregular, never on the beat. */
const addDistantPlay = () => {
  let t = 0.35;
  while (t < B.muteBefore) {
    const start = Math.round(t * SR);
    const len = Math.round(0.07 * SR);
    const hit = highpass(noise(len), 1800);
    const far = 0.035 + Math.random() * 0.02;
    for (let n = 0; n < len; n++) {
      add(start + n, hit[n] * Math.exp((-n / SR) * 46) * far);
    }
    t += 0.7 + Math.random() * 1.5;
  }
};

// --------------------------------------------------------------------------
// Music bed — enters on the match, builds to the strike
// --------------------------------------------------------------------------

const addBass = () => {
  for (let n = 0; n < N; n++) {
    const t = n / SR;
    if (t < B.firstBass) continue;
    const g = level(t) * gate(t);
    const breathe = 1 + 0.09 * Math.sin(2 * Math.PI * 0.15 * t);
    buf[n] +=
      0.19 *
      g *
      breathe *
      (Math.sin(2 * Math.PI * 47 * t) + 0.55 * Math.sin(2 * Math.PI * 23.5 * t));
  }
};

/** Pulse under the rally. 120bpm — a half-second grid the cuts sit on. */
const addPulse = (from, to, interval, amp) => {
  for (let t = from; t < to; t += interval) {
    if (t >= B.muteBefore && t < B.impact) continue;
    const start = Math.round(t * SR);
    const len = Math.round(0.15 * SR);
    for (let n = 0; n < len; n++) {
      const tl = n / SR;
      add(start + n, Math.sin(2 * Math.PI * 64 * tl) * Math.exp(-tl * 23) * amp);
    }
  }
};

const addImpact = (at, weight = 1, { body = 105, bright = true } = {}) => {
  const start = Math.round(at * SR);
  if (bright) {
    const len = Math.round(0.19 * SR);
    const air = highpass(noise(len), 2300);
    for (let n = 0; n < len; n++) {
      add(start + n, air[n] * Math.exp((-n / SR) * 27) * 0.19 * weight);
    }
    const pl = Math.round(0.15 * SR);
    for (let n = 0; n < pl; n++) {
      const tl = n / SR;
      const e = Math.exp(-tl * 31);
      add(
        start + n,
        (Math.sin(2 * Math.PI * 2300 * tl) * 0.55 +
          Math.sin(2 * Math.PI * 3100 * tl) * 0.32) *
          e *
          0.1 *
          weight,
      );
    }
  }
  const tl2 = Math.round(0.3 * SR);
  for (let n = 0; n < tl2; n++) {
    const tl = n / SR;
    const f = body * (1 - 0.34 * (1 - Math.exp(-tl * 17)));
    add(start + n, Math.sin(2 * Math.PI * f * tl) * Math.exp(-tl * 14) * 0.3 * weight);
  }
};

const addRiser = (from, to, amp = 1) => {
  const dur = to - from;
  const len = Math.round(dur * SR);
  const start = Math.round(from * SR);
  const n2 = lowpass(noise(len), (t) => 230 + (t / dur) * 4300);
  for (let n = 0; n < len; n++) {
    const p = n / len;
    const e = p ** 1.7;
    add(
      start + n,
      (Math.sin(2 * Math.PI * (150 + p * 900) * (n / SR)) * 0.075 + n2[n] * 0.12) * e * amp,
    );
  }
};

const addWhoosh = (center, dur = 0.42, amp = 0.3) => {
  const len = Math.round(dur * SR);
  const start = Math.round((center - dur * 0.6) * SR);
  const f = lowpass(noise(len), (t) => 260 + Math.sin(Math.PI * (t / dur)) * 4400);
  for (let n = 0; n < len; n++) {
    add(start + n, f[n] * Math.sin(Math.PI * (n / len)) ** 1.35 * amp);
  }
};

/** The ball strike itself — sharp, woody, unmistakably a racket. */
const addBallStrike = (at) => {
  const start = Math.round(at * SR);
  const len = Math.round(0.13 * SR);
  const crack = highpass(noise(len), 1300);
  for (let n = 0; n < len; n++) {
    add(start + n, crack[n] * Math.exp((-n / SR) * 62) * 0.42);
  }
  const tl = Math.round(0.1 * SR);
  for (let n = 0; n < tl; n++) {
    const t = n / SR;
    add(start + n, Math.sin(2 * Math.PI * 620 * t) * Math.exp(-t * 58) * 0.16);
  }
};

// --------------------------------------------------------------------------
// Arrangement
// --------------------------------------------------------------------------

addAmbience();
addDistantPlay();
addBass();

addImpact(B.firstBass, 0.62, { body: 72, bright: false }); // under "Appunto."
addWhoosh(B.musicIn, 0.5, 0.3);
addPulse(B.musicIn, B.muteBefore, 0.5, 0.11);
addRiser(B.impact - 1.5, B.muteBefore, 0.9); // build cut off by the silence

addBallStrike(B.impact);
addImpact(B.impact, 1.4, { body: 116 });
addWhoosh(B.impact + 0.12, 0.7, 0.24); // the room rushing back
addPulse(B.impact + 0.5, B.payoffDown, 0.5, 0.1);

addWhoosh(B.montageIn, 0.4, 0.26);
for (let i = 0; i < 8; i++) {
  addImpact(B.montageIn + i * 0.5, i === 0 ? 1.05 : 0.72);
}
addRiser(B.signOff - 1.0, B.signOff, 0.7);
addImpact(B.signOff, 1.15, { body: 60 });

// --------------------------------------------------------------------------
// Master
// --------------------------------------------------------------------------

let peak = 0;
for (let n = 0; n < N; n++) peak = Math.max(peak, Math.abs(buf[n]));
const pre = peak > 0 ? 0.9 / peak : 1;

const pcm = new Int16Array(N);
for (let n = 0; n < N; n++) {
  const t = n / SR;
  const shaped = Math.tanh(buf[n] * pre * 1.2) * gate(t);
  pcm[n] = Math.max(-32767, Math.min(32767, Math.round(shaped * 32767)));
}

const dataSize = pcm.length * 2;
const h = Buffer.alloc(44);
h.write("RIFF", 0);
h.writeUInt32LE(36 + dataSize, 4);
h.write("WAVE", 8);
h.write("fmt ", 12);
h.writeUInt32LE(16, 16);
h.writeUInt16LE(1, 20);
h.writeUInt16LE(1, 22);
h.writeUInt32LE(SR, 24);
h.writeUInt32LE(SR * 2, 28);
h.writeUInt16LE(2, 32);
h.writeUInt16LE(16, 34);
h.write("data", 36);
h.writeUInt32LE(dataSize, 40);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, Buffer.concat([h, Buffer.from(pcm.buffer)]));

console.log(`Wrote ${OUT} — ${DURATION}s, ${SR}Hz mono`);
