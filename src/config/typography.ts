import { Easing } from "remotion";

export const TYPE = {
  /** Big statement lines — the payoff moments. */
  statement: {
    fontSize: 82,
    fontWeight: 400,
    letterSpacing: "0.005em",
    lineHeight: 1.02,
  },
  /** Mid-weight headline, used over product footage. */
  headline: {
    fontSize: 54,
    fontWeight: 400,
    letterSpacing: "0.02em",
    lineHeight: 1.08,
  },
  /** Small tracked-out label — product names, section markers. */
  label: {
    fontSize: 25,
    fontWeight: 500,
    letterSpacing: "0.34em",
    lineHeight: 1.3,
  },
  /** The call to action. */
  cta: {
    fontSize: 29,
    fontWeight: 500,
    letterSpacing: "0.3em",
    lineHeight: 1.3,
  },
} as const;

/**
 * Motion curves. Everything in the spot uses one of these four — nothing
 * bounces, nothing overshoots, and fast cuts share a curve so the edit
 * reads as one hand.
 */
export const EASE = {
  /** Long, settling camera move. */
  camera: Easing.bezier(0.16, 1, 0.3, 1),
  /** Snappy entrance on a beat. */
  beat: Easing.bezier(0.2, 0.9, 0.2, 1),
  /** Even travel — light sweeps and wipes. */
  travel: Easing.bezier(0.45, 0.05, 0.55, 0.95),
  /** Quick exit. */
  out: Easing.bezier(0.6, 0, 0.9, 0.3),
};

export const SAFE_AREA = {
  /** TikTok/Reels chrome overlays the outer edges — keep copy inside this. */
  left: 92,
  right: 92,
  top: 300,
  bottom: 430,
};
