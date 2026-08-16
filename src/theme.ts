import { Easing } from "remotion";

export const COLORS = {
  cream: "#F5F5F0",
  black: "#080808",
  silver: "#BFC0C2",
  terracotta: "#B94F22",
} as const;

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Scene timeline (frames @ 30fps). Kept in one place so every cut stays
// easy to re-time without hunting through components.
export const SCENES = {
  heroIntro: { start: 0, duration: 90 }, // 0:00 - 0:03
  racketReveal: { start: 90, duration: 180 }, // 0:03 - 0:09
  racketRevealObsidian: { start: 90, duration: 90 }, // 0:03 - 0:06
  racketRevealPearl: { start: 180, duration: 90 }, // 0:06 - 0:09
  apparel: { start: 270, duration: 120 }, // 0:09 - 0:13
  accessories: { start: 390, duration: 90 }, // 0:13 - 0:16
  heroComposition: { start: 480, duration: 120 }, // 0:16 - 0:20
  finalCta: { start: 600, duration: 120 }, // 0:20 - 0:24
} as const;

export const TOTAL_DURATION =
  SCENES.finalCta.start + SCENES.finalCta.duration;

// Cinematic easings — no bouncy/glitch curves, everything reads as
// deliberate camera & light movement.
export const EASE = {
  cinematic: Easing.bezier(0.16, 1, 0.3, 1), // slow-settle push-in
  soft: Easing.bezier(0.22, 0.61, 0.36, 1),
  linear: Easing.bezier(0.65, 0, 0.35, 1),
};

export const FONT_FAMILY_DISPLAY = "OffPadelDisplay";
