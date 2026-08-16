import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { EASE } from "../config";

/**
 * A specular highlight travelling across the frame — the signature move of
 * metal-and-carbon product photography. Screen-blended so it only ever adds
 * light, never tints or flattens what is underneath.
 */
export const LightSweep: React.FC<{
  delay?: number;
  duration?: number;
  angle?: number;
  width?: number;
  intensity?: number;
  /** Adds a hard specular line at the centre of the band. */
  specular?: boolean;
}> = ({
  delay = 0,
  duration = 30,
  angle = 16,
  width = 26,
  intensity = 0.55,
  specular = false,
}) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [delay, delay + duration], [-45, 145], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.travel,
  });
  const fade = interpolate(
    frame,
    [delay, delay + duration * 0.2, delay + duration * 0.8, delay + duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  if (fade <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        mixBlendMode: "screen",
        opacity: intensity * fade,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-25%",
          left: `${x}%`,
          width: `${width}%`,
          height: "150%",
          transform: `rotate(${angle}deg)`,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(233,236,240,0.55) 42%, rgba(255,255,255,0.95) 50%, rgba(233,236,240,0.55) 58%, rgba(255,255,255,0) 100%)",
          filter: "blur(7px)",
        }}
      />
      {specular ? (
        <div
          style={{
            position: "absolute",
            top: "-25%",
            left: `${x + width / 2 - 0.35}%`,
            width: "0.7%",
            height: "150%",
            transform: `rotate(${angle}deg)`,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)",
            filter: "blur(1.5px)",
          }}
        />
      ) : null}
    </div>
  );
};

/**
 * Reveals its children only where a travelling band of light falls, leaving
 * the rest of the frame black. This is how the opening hook shows a sliver
 * of the racket surface without ever showing the whole product.
 */
export const LightRevealMask: React.FC<{
  delay?: number;
  duration: number;
  angle?: number;
  band?: number;
  from?: number;
  to?: number;
  children: React.ReactNode;
}> = ({
  delay = 0,
  duration,
  angle = 100,
  band = 26,
  from = -35,
  to = 135,
  children,
}) => {
  const frame = useCurrentFrame();
  const pos = interpolate(frame, [delay, delay + duration], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.travel,
  });

  const mask = `linear-gradient(${angle}deg,
    rgba(0,0,0,0) ${pos - band}%,
    rgba(0,0,0,0.55) ${pos - band * 0.45}%,
    rgba(0,0,0,1) ${pos}%,
    rgba(0,0,0,0.55) ${pos + band * 0.45}%,
    rgba(0,0,0,0) ${pos + band}%)`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    >
      {children}
    </div>
  );
};
