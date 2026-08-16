#!/usr/bin/env node
// Procedural, original sound design for the OFF Padel spot.
// No samples, no copyrighted music — everything below is synthesized
// from sine oscillators and filtered noise, timed against the exact
// scene cuts defined in src/theme.ts (SCENES / FPS).
//
// Run with: npm run audio

import { writeFileSync } from "node:fs";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SR = 44100;
const DURATION = 24.0; // seconds — matches TOTAL_DURATION (720f @ 30fps)
const N = Math.round(SR * DURATION);

const OUT_PATH = fileURLToPath(
  new URL("../public/assets/audio/soundtrack.wav", import.meta.url),
);

const buf = new Float64Array(N);

// ---------- primitives ----------

const clampIdx = (i) => (i < 0 ? 0 : i >= N ? N - 1 : i);

const addSample = (i, v) => {
  const idx = clampIdx(Math.round(i));
  buf[idx] += v;
};

/** Linear envelope: attack -> sustain(1) -> release, in seconds, local to a 0-based event. */
const adsr = (tLocal, attack, release, total) => {
  if (tLocal < 0 || tLocal > total) return 0;
  if (tLocal < attack) return tLocal / attack;
  const releaseStart = total - release;
  if (tLocal > releaseStart) return Math.max(0, 1 - (tLocal - releaseStart) / release);
  return 1;
};

const smoothstep = (edge0, edge1, x) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

/** Simple one-pole lowpass, returns a filtering function over a sample array. */
const onePoleLowpass = (arr, cutoffFn) => {
  let y = 0;
  const out = new Float64Array(arr.length);
  for (let n = 0; n < arr.length; n++) {
    const cutoff = cutoffFn(n / SR);
    const alpha = 1 - Math.exp((-2 * Math.PI * cutoff) / SR);
    y += alpha * (arr[n] - y);
    out[n] = y;
  }
  return out;
};

const onePoleHighpass = (arr, cutoff) => {
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

const whiteNoise = (len) => {
  const out = new Float64Array(len);
  for (let n = 0; n < len; n++) out[n] = Math.random() * 2 - 1;
  return out;
};

// ---------- layers ----------

/** Continuous low cinematic bass bed with a slow breathing swell. */
const addBassBed = () => {
  for (let n = 0; n < N; n++) {
    const t = n / SR;
    const intro = smoothstep(0, 2.6, t); // fade in over the open
    const growth = 0.6 + 0.4 * smoothstep(0, 20.5, t); // grows toward the finale
    const breathe = 1 + 0.12 * Math.sin(2 * Math.PI * 0.12 * t);
    const fadeOut = 1 - smoothstep(23.4, 24.0, t);
    const amp = 0.16 * intro * growth * breathe * fadeOut;
    const fundamental = Math.sin(2 * Math.PI * 49 * t);
    const sub = Math.sin(2 * Math.PI * 24.5 * t) * 0.5;
    buf[n] += amp * (fundamental + sub);
  }
};

/** Faint high shimmer, present during the intro and the finale. */
const addShimmer = () => {
  const windows = [
    { start: 0.2, end: 3.0, peak: 0.02 },
    { start: 20.0, end: 23.6, peak: 0.03 },
  ];
  for (let n = 0; n < N; n++) {
    const t = n / SR;
    let env = 0;
    for (const w of windows) {
      if (t >= w.start && t <= w.end) {
        env = Math.max(
          env,
          w.peak * smoothstep(w.start, w.start + 0.6, t) *
            (1 - smoothstep(w.end - 0.6, w.end, t)),
        );
      }
    }
    if (env === 0) continue;
    const shimmer =
      Math.sin(2 * Math.PI * 1318.5 * t) * 0.5 +
      Math.sin(2 * Math.PI * 1976.5 * t) * 0.5;
    buf[n] += env * shimmer * (0.85 + 0.15 * Math.sin(2 * Math.PI * 5.3 * t));
  }
};

/** Short metallic / racket-like impact used on every major scene cut. */
const addImpact = (atSec, weight = 1) => {
  const dur = 0.22;
  const len = Math.round(dur * SR);
  const noise = whiteNoise(len);
  const filtered = onePoleHighpass(noise, 2200);
  const startSample = Math.round(atSec * SR);

  for (let n = 0; n < len; n++) {
    const tLocal = n / SR;
    const env = Math.exp(-tLocal * 26);
    addSample(startSample + n, filtered[n] * env * 0.22 * weight);
  }

  // Metallic ping
  const pingLen = Math.round(0.14 * SR);
  for (let n = 0; n < pingLen; n++) {
    const tLocal = n / SR;
    const env = Math.exp(-tLocal * 34);
    const tone =
      Math.sin(2 * Math.PI * 2400 * tLocal) * 0.6 +
      Math.sin(2 * Math.PI * 3100 * tLocal) * 0.4;
    addSample(startSample + n, tone * env * 0.12 * weight);
  }

  // Low body thump
  const thumpLen = Math.round(0.2 * SR);
  for (let n = 0; n < thumpLen; n++) {
    const tLocal = n / SR;
    const env = Math.exp(-tLocal * 18);
    const tone = Math.sin(2 * Math.PI * 108 * tLocal);
    addSample(startSample + n, tone * env * 0.28 * weight);
  }
};

/** Light rhythmic tick used for the fast apparel / accessories beat cuts. */
const addTick = (atSec, weight = 1) => {
  const len = Math.round(0.09 * SR);
  const noise = whiteNoise(len);
  const filtered = onePoleHighpass(noise, 3500);
  const startSample = Math.round(atSec * SR);
  for (let n = 0; n < len; n++) {
    const tLocal = n / SR;
    const env = Math.exp(-tLocal * 55);
    addSample(startSample + n, filtered[n] * env * 0.16 * weight);
  }
};

/** Filtered-noise whoosh used for the Obsidian -> Pearl light-sweep wipe. */
const addWhoosh = (centerSec) => {
  const dur = 0.42;
  const len = Math.round(dur * SR);
  const noise = whiteNoise(len);
  const startSample = Math.round((centerSec - dur / 2) * SR);
  const filtered = onePoleLowpass(noise, (t) => {
    const p = t / dur; // 0..1 across the event
    const sweep = Math.sin(Math.PI * p); // bell curve
    return 300 + sweep * 4200;
  });
  for (let n = 0; n < len; n++) {
    const tLocal = n / SR;
    const env = Math.sin(Math.PI * (tLocal / dur)) ** 1.4;
    addSample(startSample + n, filtered[n] * env * 0.3);
  }
};

/** Tension riser leading into the final CTA: rising pitch + rising noise + accelerating pulses. */
const addRiser = (startSec, endSec) => {
  const dur = endSec - startSec;
  const len = Math.round(dur * SR);
  const startSample = Math.round(startSec * SR);

  const noise = whiteNoise(len);
  const filtered = onePoleLowpass(noise, (t) => 200 + (t / dur) * 3800);

  for (let n = 0; n < len; n++) {
    const p = n / len;
    const env = p ** 1.6;
    const freq = 140 + p * 900;
    const tone = Math.sin(2 * Math.PI * freq * (n / SR));
    const sample = tone * 0.09 * env + filtered[n] * 0.14 * env;
    addSample(startSample + n, sample);
  }

  // Accelerating low pulses (heartbeat-style)
  let pulseT = 0;
  let interval = 0.85;
  while (pulseT < dur - 0.05) {
    addImpact(startSec + pulseT, 0.35 + 0.35 * (pulseT / dur));
    pulseT += interval;
    interval = Math.max(0.22, interval * 0.82);
  }
};

/** The final deep hit under the CTA reveal. */
const addFinalHit = (atSec) => {
  const len = Math.round(0.9 * SR);
  const startSample = Math.round(atSec * SR);
  for (let n = 0; n < len; n++) {
    const tLocal = n / SR;
    const env = Math.exp(-tLocal * 4.2);
    const tone =
      Math.sin(2 * Math.PI * 58 * tLocal) * 0.7 +
      Math.sin(2 * Math.PI * 29 * tLocal) * 0.5;
    addSample(startSample + n, tone * env * 0.5);
  }
  // A brief high metallic shimmer riding on top, like a struck chrome plate.
  const shimmerLen = Math.round(0.5 * SR);
  for (let n = 0; n < shimmerLen; n++) {
    const tLocal = n / SR;
    const env = Math.exp(-tLocal * 9);
    const tone =
      Math.sin(2 * Math.PI * 2600 * tLocal) * 0.4 +
      Math.sin(2 * Math.PI * 3300 * tLocal) * 0.3;
    addSample(startSample + n, tone * env * 0.1);
  }
};

// ---------- timeline (matches src/theme.ts SCENES @ 30fps) ----------

addBassBed();
addShimmer();

addImpact(3.0, 1.0); // heroIntro -> racketReveal (Obsidian macro)
addWhoosh(5.8667); // Obsidian -> Pearl wipe
addImpact(9.0, 1.0); // racketReveal -> apparel
addTick(10.0, 0.8);
addTick(11.0, 0.8);
addTick(12.0, 0.8);
addImpact(13.0, 0.9); // apparel -> accessories
addTick(13.75, 0.7);
addTick(14.5, 0.7);
addTick(15.25, 0.7);
addImpact(16.0, 0.6); // accessories -> hero composition (softer, camera settles)
addRiser(19.2, 22.8); // hero composition -> final CTA build
addFinalHit(22.933); // CTA reveal

// ---------- master bus: soft clip + normalize ----------

let peak = 0;
for (let n = 0; n < N; n++) peak = Math.max(peak, Math.abs(buf[n]));
const pre = peak > 0 ? 0.92 / peak : 1;

const pcm = new Int16Array(N);
for (let n = 0; n < N; n++) {
  const shaped = Math.tanh(buf[n] * pre * 1.15); // gentle soft-clip
  pcm[n] = Math.max(-32767, Math.min(32767, Math.round(shaped * 32767)));
}

// ---------- WAV writer (mono, 16-bit PCM) ----------

const header = Buffer.alloc(44);
const dataSize = pcm.length * 2;
header.write("RIFF", 0);
header.writeUInt32LE(36 + dataSize, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20); // PCM
header.writeUInt16LE(1, 22); // mono
header.writeUInt32LE(SR, 24);
header.writeUInt32LE(SR * 2, 28); // byte rate
header.writeUInt16LE(2, 32); // block align
header.writeUInt16LE(16, 34); // bits per sample
header.write("data", 36);
header.writeUInt32LE(dataSize, 40);

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, Buffer.concat([header, Buffer.from(pcm.buffer)]));

console.log(`Wrote ${OUT_PATH} (${DURATION}s, ${SR}Hz mono)`);
