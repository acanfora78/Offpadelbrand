import { interpolate } from "remotion";

export type Keyframes = {
  frame: number;
  from: number;
  to: number;
  delay?: number;
  duration: number;
  easing?: (n: number) => number;
};

export const ramp = ({
  frame,
  from,
  to,
  delay = 0,
  duration,
  easing,
}: Keyframes) =>
  interpolate(frame, [delay, delay + duration], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

/**
 * Rate of change of an animated value, in units per frame, by sampling the
 * same curve one frame either side. Feeding this into a blur radius is what
 * turns a scale/translate animation into something that reads as captured
 * motion rather than a CSS transition — fast moves smear, settled ones are
 * razor sharp.
 */
export const velocityOf = (
  valueAt: (frame: number) => number,
  frame: number,
) => (valueAt(frame + 0.5) - valueAt(frame - 0.5));

/** Maps a velocity to a blur radius in px, with a dead zone so still frames stay crisp. */
export const velocityBlur = (
  velocity: number,
  gain: number,
  max = 26,
  deadZone = 0.25,
) => {
  const raw = Math.abs(velocity) * gain;
  if (raw < deadZone) return 0;
  return Math.min(max, raw - deadZone);
};
