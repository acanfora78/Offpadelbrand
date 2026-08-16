import React from "react";
import { Img, useCurrentFrame } from "remotion";
import type { Focus } from "../config";
import { EASE } from "../config";
import { ramp } from "./motion";

/**
 * Fakes depth-of-field parallax from a single flat photograph.
 *
 * Two copies of the same file are stacked: a heavily blurred, over-scaled
 * copy behind, and the sharp copy in front. They travel at different rates,
 * so the out-of-focus "background" drifts more slowly than the subject —
 * the cue the eye reads as three-dimensional space. Nothing about the
 * product's own geometry is altered; both layers are the same untouched
 * image under uniform scale.
 */
export const ImageParallax: React.FC<{
  src: string;
  focus: Focus;
  scale?: number;
  /** Foreground travel in % of frame across the shot. */
  travel?: [number, number];
  /** How much slower the blurred layer moves. 0 = locked, 1 = identical. */
  depth?: number;
  duration: number;
  delay?: number;
  easing?: (n: number) => number;
}> = ({
  src,
  focus,
  scale = 1.14,
  travel = [-2.5, 2.5],
  depth = 0.42,
  duration,
  delay = 0,
  easing = EASE.camera,
}) => {
  const frame = useCurrentFrame();
  const x = ramp({
    frame,
    from: travel[0],
    to: travel[1],
    delay,
    duration,
    easing,
  });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <Img
        src={src}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: `${focus.x}% ${focus.y}%`,
          transform: `translateX(${x * depth}%) scale(${scale * 1.16})`,
          filter: "blur(16px) brightness(0.62)",
        }}
      />
      <Img
        src={src}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: `${focus.x}% ${focus.y}%`,
          transform: `translateX(${x}%) scale(${scale})`,
        }}
      />
    </div>
  );
};
