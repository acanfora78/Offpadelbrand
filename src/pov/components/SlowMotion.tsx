import React from "react";
import { useCurrentFrame } from "remotion";

/**
 * Time remapping for the strike.
 *
 * Children receive a slowed frame through a render prop rather than having
 * Remotion's own clock overridden, so a shot can ramp in and out of slow motion
 * inside a single scene without being split into separate sequences.
 *
 * `ramp` eases the rate change instead of switching it on a frame, which is
 * what makes a speed ramp look shot rather than applied.
 *
 * When the 120fps plates arrive, the same `factor` is what goes on the clip's
 * `playbackRate` — see `videoPlaybackRate` below, so picture and footage stay
 * in agreement.
 */
export const SlowMotion: React.FC<{
  /** 1 = real time, 0.25 = quarter speed. */
  factor: number;
  /** Frame the ramp into slow motion starts, local to the scene. */
  from?: number;
  /** How long the rate change takes. 0 snaps. */
  ramp?: number;
  children: (slowedFrame: number, rate: number) => React.ReactNode;
}> = ({ factor, from = 0, ramp = 6, children }) => {
  const frame = useCurrentFrame();

  // Integrate the rate curve so time stays continuous across the ramp — a
  // discontinuity here shows up as a visible jump in the subject's motion.
  let elapsed = 0;
  let rate = 1;
  for (let f = 0; f < frame; f++) {
    const p = ramp <= 0 ? (f >= from ? 1 : 0) : Math.min(1, Math.max(0, (f - from) / ramp));
    const eased = p * p * (3 - 2 * p);
    rate = 1 + (factor - 1) * eased;
    elapsed += rate;
  }

  return <>{children(elapsed, rate)}</>;
};

/** The playback rate to set on a clip so footage matches the picture above. */
export const videoPlaybackRate = (factor: number) => factor;
