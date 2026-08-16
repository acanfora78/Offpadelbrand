import React from "react";
import { Img, useCurrentFrame } from "remotion";
import { interpolate } from "remotion";
import { EASE } from "../theme";

/**
 * Full-bleed product photo with a scale animation anchored to a chosen
 * transform-origin — the core "macro reveal" / "push-in" move used across
 * every scene. Because the origin sets where the zoom converges, a single
 * scale animation reads as a deliberate camera move toward product detail
 * (holes, texture, logo stitching) rather than a generic Ken Burns pan.
 */
export const CinematicImage: React.FC<{
  src: string;
  delay?: number;
  duration?: number;
  fromScale?: number;
  toScale?: number;
  originX?: number; // 0-100
  originY?: number; // 0-100
  easing?: (n: number) => number;
  opacity?: number;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}> = ({
  src,
  delay = 0,
  duration = 90,
  fromScale = 1,
  toScale = 1,
  originX = 50,
  originY = 50,
  easing = EASE.cinematic,
  opacity = 1,
  style,
  imgStyle,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [delay, delay + duration], [fromScale, toScale], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        opacity,
        ...style,
      }}
    >
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: `${originX}% ${originY}%`,
          transform: `scale(${scale})`,
          ...imgStyle,
        }}
      />
    </div>
  );
};
