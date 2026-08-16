import { FPS } from "../config";

const sec = (s: number) => Math.round(s * FPS);

/**
 * "POV: hai appena scoperto il brand di padel che nessuno conosce."
 *
 * A native-feeling court film: two players, a racket nobody recognises, and a
 * point that earns the answer. The cut sheet below is the single source of
 * truth — scenes, captions and the audio generator all read from it.
 */
const CUTS = {
  openingHook: [0.0, 2.0],
  dialogueScene: [2.0, 5.0],
  matchSequence: [5.0, 9.0],
  slowMotionImpact: [9.0, 14.0],
  dialoguePayoff: [14.0, 17.0],
  productMontage: [17.0, 21.0],
  finalBrand: [21.0, 23.0],
  loopEnding: [23.0, 24.0],
} as const;

export type SceneName = keyof typeof CUTS;

export const POV_SCENES = Object.fromEntries(
  Object.entries(CUTS).map(([name, [from, to]]) => [
    name,
    { from: sec(from), durationInFrames: sec(to) - sec(from) },
  ]),
) as Record<SceneName, { from: number; durationInFrames: number }>;

export const POV_DURATION =
  POV_SCENES.loopEnding.from + POV_SCENES.loopEnding.durationInFrames;

/**
 * Scene 01 is the only thing that changes between cuts. Everything from the
 * racket reveal onward is shared, so all three variants come out of one shoot
 * and one composition — record the three lines in the same setup and switch
 * here.
 */
export const HOOK_VARIANTS = {
  A: {
    id: "A",
    line: "Bro… ma che racchetta è?",
    tests: "Curiosity — product-led",
    overlay: "POV: you just discovered OFF Padel.",
  },
  B: {
    id: "B",
    line: "Quanto hai pagato quella?",
    tests: "Value — price-led",
    overlay: "POV: you just discovered OFF Padel.",
  },
  C: {
    id: "C",
    line: "Ma questo brand da dove arriva?",
    tests: "Origin — brand-led",
    overlay: "POV: you just discovered OFF Padel.",
  },
} as const;

export type VariantId = keyof typeof HOOK_VARIANTS;

export type Line = {
  /** Frame the line starts, absolute on the master timeline. */
  at: number;
  /** How long it holds. */
  hold: number;
  text: string;
  /** Whose line it is — drives caption alignment. */
  who: "friend" | "player";
};

/**
 * The dialogue, timed on the master timeline. Captions render from this, and
 * when the recorded takes arrive these are the sync points to cut them to.
 * `Appunto.` sits deliberately after a beat of silence — the pause is the line.
 */
export const dialogueFor = (variant: VariantId): Line[] => [
  { at: sec(0.9), hold: sec(1.1), text: HOOK_VARIANTS[variant].line, who: "friend" },
  { at: sec(2.6), hold: sec(0.9), text: "OFF Padel.", who: "player" },
  { at: sec(3.6), hold: sec(0.8), text: "Mai sentita.", who: "friend" },
  { at: sec(4.7), hold: sec(1.0), text: "Appunto.", who: "player" },
  { at: sec(14.4), hold: sec(1.3), text: "Ok… dove l'hai presa?", who: "friend" },
  { at: sec(16.0), hold: sec(0.9), text: "OFF Padel.", who: "player" },
];

/** Sound events, in seconds, shared with scripts/generate-pov-audio.mjs. */
export const POV_BEATS = {
  ambienceIn: 0.0,
  firstBass: 4.7, // lands on "Appunto."
  musicIn: 5.0, // the match starts
  rallyStart: 5.0,
  muteBefore: 11.4, // split-second silence before contact
  impact: 11.6,
  afterImpact: 11.7,
  payoffDown: 14.0,
  montageIn: 17.0,
  signOff: 21.0,
  loopTail: 23.0,
};
