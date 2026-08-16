import { interpolate } from "remotion";

/**
 * Opacity weight (0-1) for item `index` in a beat-cut montage of `count`
 * equal-length beats, with a soft crossfade instead of a hard cut between
 * consecutive items.
 */
export const beatOpacity = (
  frame: number,
  index: number,
  beatLength: number,
  crossfade: number,
) => {
  const start = index * beatLength;
  const end = start + beatLength;
  return interpolate(
    frame,
    [start - crossfade, start, end - crossfade, end],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
};
