import React from "react";
import { useCurrentFrame } from "remotion";
import { interpolate } from "remotion";
import { EASE } from "../theme";

/**
 * A single soft diagonal light reflection sweeping across the frame.
 * Pure CSS gradient, screen-blended — no image assets involved.
 */
export const LightSweep: React.FC<{
  delay: number;
  duration?: number;
  angle?: number;
  opacity?: number;
  width?: number;
}> = ({ delay, duration = 34, angle = 18, opacity = 0.5, width = 22 }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + duration], [-40, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.cinematic,
  });
  const fade = interpolate(
    frame,
    [delay, delay + duration * 0.25, delay + duration * 0.75, delay + duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        mixBlendMode: "screen",
        opacity: opacity * fade,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: `${progress}%`,
          width: `${width}%`,
          height: "140%",
          transform: `rotate(${angle}deg)`,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%)",
          filter: "blur(6px)",
        }}
      />
    </div>
  );
};
