#!/usr/bin/env node
/**
 * Original sound design for the OFF Padel spot, synthesized from scratch.
 *
 * Nothing here is sampled or licensed — every element is built from
 * oscillators and filtered noise, and every accent is placed on a cut time
 * taken from src/config/timings.ts, so picture and audio cannot drift apart.
 *
 * Run with: npm run audio
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SR = 44100;
const DURATION = 21.5; // matches TOTAL_DURATION (645 frames @ 30fps)
const N = Math.round(SR * DURATION);

// ---------------------------------------------------------------------------
// Cut sheet — mirrors config/timings.ts
// ---------------------------------------------------------------------------

const CUT = {
  hook: 0.0,
  drop: 0.8, // beat drop, Obsidian reveal
  pearl: 3.0, // metallic impact
  apparel: 5.2, // whoosh into the montage
  accessories: 8.5, // rapid impacts begin
  interrupt: 11.5, // CUT TO SILENCE
  secondDrop: 13.5,
  cta: 17.0, // bass rise
  loop: 20.0, // final impact
};

const APPAREL_BEAT = (CUT.accessories - CUT.apparel) / 4; // 0.825s
const ACCESSORY_BEAT = (CUT.interrupt - CUT.accessories) / 5; // 0.6s

const OUT_PATH = fileURLToPath(
  new URL("../public/assets/audio/soundtrack.wav", import.meta.url),
);

const buf = new Float64Array(N);

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

const addSample = (i, v) => {
  const idx = Math.round(i);
  if (idx >= 0 && idx < N) buf[idx] += v;
};

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const whiteNoise = (len) => {
  const out = new Float64Array(len);
  for (let n = 0; n < len; n++) out[n] = Math.random() * 2 - 1;
  return out;
};

const lowpass = (arr, cutoffAt) => {
  let y = 0;
  const out = new Float64Array(arr.length);
  for (let n = 0; n < arr.length; n++) {
    const alpha = 1 - Math.exp((-2 * Math.PI * cutoffAt(n / SR)) / SR);
    y += alpha * (arr[n] - y);
    out[n] = y;
  }
  return out;
};

const highpass = (arr, cutoff) => {
  const alpha = Math.exp((-2 * Math.PI * cutoff) / SR);
  let y = 0;
  let prevX = 0;
  const out = new Float64Array(arr.length);
  for (let n = 0; n < arr.length; n++) {
    y = alpha * (y + arr[n] - prevX);
    prevX = arr[n];
    out[n] = y;
  }
  return out;
};

// ---------------------------------------------------------------------------
// Gain envelope for the whole piece
// ---------------------------------------------------------------------------

/**
 * The arrangement's shape, including the hard drop-out at the pattern
 * interrupt. Silence there is a compositional choice, not an absence: after
 * nine fast cuts the ear expects the next hit, and taking it away is what
 * makes the viewer look up.
 */
const arrangementGain = (t) => {
  if (t < CUT.drop) return 0.16 * smoothstep(0, 0.35, t); // low rumble only
  if (t < CUT.interrupt) {
    // Builds steadily through the product blocks.
    return 0.72 + 0.28 * smoothstep(CUT.drop, CUT.accessories, t);
  }
  if (t < CUT.secondDrop) {
    // Cut to near-silence, with a slow swell back in under the payoff line.
    const out = 1 - smoothstep(CUT.interrupt, CUT.interrupt + 0.12, t);
    const back = smoothstep(CUT.interrupt + 0.9, CUT.secondDrop, t) * 0.42;
    return Math.max(out * 0.9, back);
  }
  if (t < CUT.loop) return 1;
  return 1 - smoothstep(CUT.loop + 0.6, DURATION, t);
};

// ---------------------------------------------------------------------------
// Layers
// ---------------------------------------------------------------------------

/** Sub-bass bed. Present throughout, but only really felt after the drop. */
const addBassBed = () => {
  for (let n = 0; n < N; n++) {
    const t = n / SR;
    const g = arrangementGain(t);
    if (g <= 0) continue;
    const breathe = 1 + 0.1 * Math.sin(2 * Math.PI * 0.14 * t);
    const fundamental = Math.sin(2 * Math.PI * 49 * t);
    const sub = Math.sin(2 * Math.PI * 24.5 * t) * 0.55;
    buf[n] += 0.17 * g * breathe * (fundamental + sub);
  }
};

/** Pre-drop rumble: filtered noise only, no pitch, so the drop lands harder. */
const addOpeningRumble = () => {
  const len = Math.round(CUT.drop * SR);
  const noise = lowpass(whiteNoise(len), () => 90);
  for (let n = 0; n < len; n++) {
    const t = n / SR;
    buf[n] += noise[n] * 0.5 * smoothstep(0, 0.3, t);
  }
};

/** Pulse running under the fast blocks, locked to the montage grid. */
const addPulse = (fromT, toT, interval, level) => {
  for (let t = fromT; t < toT; t += interval) {
    const start = Math.round(t * SR);
    const len = Math.round(0.16 * SR);
    for (let n = 0; n < len; n++) {
      const tl = n / SR;
      const env = Math.exp(-tl * 22);
      addSample(start + n, Math.sin(2 * Math.PI * 66 * tl) * env * level);
    }
  }
};

/** Metallic transient — the racket-strike character used on every hard cut. */
const addImpact = (at, weight = 1, { body = 108, bright = true } = {}) => {
  const start = Math.round(at * SR);

  if (bright) {
    const len = Math.round(0.2 * SR);
    const air = highpass(whiteNoise(len), 2400);
    for (let n = 0; n < len; n++) {
      addSample(start + n, air[n] * Math.exp((-n / SR) * 28) * 0.2 * weight);
    }
    const pingLen = Math.round(0.16 * SR);
    for (let n = 0; n < pingLen; n++) {
      const tl = n / SR;
      const env = Math.exp(-tl * 30);
      const tone =
        Math.sin(2 * Math.PI * 2350 * tl) * 0.55 +
        Math.sin(2 * Math.PI * 3140 * tl) * 0.35 +
        Math.sin(2 * Math.PI * 4700 * tl) * 0.18;
      addSample(start + n, tone * env * 0.11 * weight);
    }
  }

  const thumpLen = Math.round(0.3 * SR);
  for (let n = 0; n < thumpLen; n++) {
    const tl = n / SR;
    const env = Math.exp(-tl * 15);
    // Slight downward pitch bend gives the hit its weight.
    const f = body * (1 - 0.35 * (1 - Math.exp(-tl * 18)));
    addSample(start + n, Math.sin(2 * Math.PI * f * tl) * env * 0.3 * weight);
  }
};

/** Air movement across a transition. */
const addWhoosh = (center, dur = 0.44, level = 0.3) => {
  const len = Math.round(dur * SR);
  const start = Math.round((center - dur * 0.62) * SR);
  const filtered = lowpass(whiteNoise(len), (t) => {
    const p = t / dur;
    return 260 + Math.sin(Math.PI * p) * 4600;
  });
  for (let n = 0; n < len; n++) {
    const env = Math.sin(Math.PI * (n / len)) ** 1.35;
    addSample(start + n, filtered[n] * env * level);
  }
};

/** Tension riser into a drop. */
const addRiser = (fromT, toT, level = 1) => {
  const dur = toT - fromT;
  const len = Math.round(dur * SR);
  const start = Math.round(fromT * SR);
  const noise = lowpass(whiteNoise(len), (t) => 220 + (t / dur) * 4200);
  for (let n = 0; n < len; n++) {
    const p = n / len;
    const env = p ** 1.7;
    const tone = Math.sin(2 * Math.PI * (150 + p * 880) * (n / SR));
    addSample(start + n, (tone * 0.08 + noise[n] * 0.13) * env * level);
  }
};

/** Deep sign-off hit with a chrome shimmer riding on top. */
const addFinalHit = (at) => {
  const start = Math.round(at * SR);
  const len = Math.round(1.1 * SR);
  for (let n = 0; n < len; n++) {
    const tl = n / SR;
    const env = Math.exp(-tl * 3.6);
    const tone =
      Math.sin(2 * Math.PI * 55 * tl) * 0.75 +
      Math.sin(2 * Math.PI * 27.5 * tl) * 0.55;
    addSample(start + n, tone * env * 0.5);
  }
  const shimmerLen = Math.round(0.6 * SR);
  for (let n = 0; n < shimmerLen; n++) {
    const tl = n / SR;
    const env = Math.exp(-tl * 8);
    const tone =
      Math.sin(2 * Math.PI * 2600 * tl) * 0.4 + Math.sin(2 * Math.PI * 3300 * tl) * 0.28;
    addSample(start + n, tone * env * 0.09);
  }
};

// ---------------------------------------------------------------------------
// Arrangement
// ---------------------------------------------------------------------------

addOpeningRumble();
addBassBed();

// 0.8s — the drop.
addRiser(CUT.drop - 0.5, CUT.drop, 0.7);
addImpact(CUT.drop, 1.35, { body: 120 });

// 3.0s — metallic impact on the Pearl cut.
addImpact(CUT.pearl, 1.05);

// 5.2s — whoosh into the apparel montage, then a hit per garment.
addWhoosh(CUT.apparel, 0.5, 0.34);
for (let i = 0; i < 4; i++) {
  addImpact(CUT.apparel + i * APPAREL_BEAT, i === 0 ? 1.0 : 0.72);
}
addPulse(CUT.apparel, CUT.accessories, APPAREL_BEAT / 2, 0.1);

// 8.5s — accessories, faster and harder.
for (let i = 0; i < 5; i++) {
  addImpact(CUT.accessories + i * ACCESSORY_BEAT, i === 0 ? 1.05 : 0.8);
}
addPulse(CUT.accessories, CUT.interrupt, ACCESSORY_BEAT / 2, 0.12);
addRiser(CUT.interrupt - 0.75, CUT.interrupt, 0.85);

// 11.5s — cut to silence. Only a single soft, low swell under the payoff.
addImpact(CUT.interrupt, 0.5, { body: 74, bright: false });

// 13.5s — second drop, hero montage.
addRiser(CUT.secondDrop - 0.9, CUT.secondDrop, 1);
addImpact(CUT.secondDrop, 1.3, { body: 118 });
addPulse(CUT.secondDrop, CUT.cta, 0.5, 0.11);

// 17.0s — bass rise under the sign-off.
addRiser(CUT.cta, CUT.loop, 0.55);
addImpact(CUT.cta, 0.75);

// 20.0s — final impact, then the tail that carries into the loop.
addFinalHit(CUT.loop);
addWhoosh(CUT.loop + 0.75, 0.7, 0.16);

// ---------------------------------------------------------------------------
// Master bus
// ---------------------------------------------------------------------------

let peak = 0;
for (let n = 0; n < N; n++) peak = Math.max(peak, Math.abs(buf[n]));
const preGain = peak > 0 ? 0.9 / peak : 1;

const pcm = new Int16Array(N);
for (let n = 0; n < N; n++) {
  const shaped = Math.tanh(buf[n] * preGain * 1.2); // gentle soft-clip
  pcm[n] = Math.max(-32767, Math.min(32767, Math.round(shaped * 32767)));
}

// ---------------------------------------------------------------------------
// WAV container (mono, 16-bit PCM)
// ---------------------------------------------------------------------------

const dataSize = pcm.length * 2;
const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + dataSize, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(1, 22);
header.writeUInt32LE(SR, 24);
header.writeUInt32LE(SR * 2, 28);
header.writeUInt16LE(2, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(dataSize, 40);

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, Buffer.concat([header, Buffer.from(pcm.buffer)]));

console.log(`Wrote ${OUT_PATH} — ${DURATION}s, ${SR}Hz mono`);
