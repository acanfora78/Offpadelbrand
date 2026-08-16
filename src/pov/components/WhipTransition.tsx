import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { EASE } from "../../config";
import { DirectionalBlur } from "../../components/DirectionalBlur";

/**
 * A whip pan cut.
 *
 * The trick to a whip that reads as one camera move rather than two clips is
 * that the outgoing and incoming frames travel in the *same* direction and the
 * smear peaks exactly at the swap — the eye tracks the blur across the cut and
 * never registers an edit. Blur is derived from the pan's own velocity, so
 * slowing the transition automatically softens the smear.
 */
export const WhipTransition: React.FC<{
  /** Frame the whip is centred on, local to the scene. */
  at: number;
  /** Total length of the whip. Shorter reads harder. */
  length?: number;
  direction?: "left" | "right";
  out: React.ReactNode;
  incoming: React.ReactNode;
}> = ({ at, length = 8, direction = "left", out, incoming }) => {
  const frame = useCurrentFrame();
  const half = length / 2;
  const sign = direction === "left" ? -1 : 1;

  const travelAt = (f: number) =>
    interpolate(f, [at - half, at + half], [0, 100], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE.travel,
    });

  const p = travelAt(frame);
  const velocity = travelAt(frame + 0.5) - travelAt(frame - 0.5);
  const blur = Math.min(48, Math.abs(velocity) * 1.9);

  const swapped = frame >= at;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <DirectionalBlur x={blur} y={blur * 0.06}>
        {swapped ? (
          <AbsoluteFill
            style={{ transform: `translateX(${sign * (p - 100)}%)` }}
          >
            {incoming}
          </AbsoluteFill>
        ) : (
          <AbsoluteFill style={{ transform: `translateX(${sign * p}%)` }}>
            {out}
          </AbsoluteFill>
        )}
      </DirectionalBlur>
    </AbsoluteFill>
  );
};
