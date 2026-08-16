import { interpolate } from "remotion";
import { EASE } from "../theme";

/**
 * 0 -> 1 progress for a cinematic ease-out over `duration` frames,
 * starting `delay` frames into the scene. Used for pushes, reveals,
 * light sweeps — anything that should feel like a deliberate camera
 * move rather than a UI transition.
 */
export const cinematicIn = (
  frame: number,
  delay: number,
  duration: number,
  easing: (n: number) => number = EASE.cinematic,
) =>
  interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
