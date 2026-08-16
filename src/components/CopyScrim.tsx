import React from "react";

/**
 * A gradient scrim anchored under the copy.
 *
 * The montage cuts between white and black products, so no single text colour
 * stays legible across all of them — cream type vanishes into the white
 * t-shirt, black type vanishes into the shorts. Rather than switching colours
 * shot by shot (which would break the typographic system), the frame carries a
 * soft weight under the copy at all times. It reads as a lighting falloff
 * rather than a UI panel, and it guarantees contrast on every beat.
 */
export const CopyScrim: React.FC<{
  height?: number;
  strength?: number;
  from?: "bottom" | "top";
}> = ({ height = 44, strength = 0.78, from = "bottom" }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      [from]: 0,
      height: `${height}%`,
      pointerEvents: "none",
      background: `linear-gradient(${from === "bottom" ? 0 : 180}deg,
        rgba(8,8,8,${strength}) 0%,
        rgba(8,8,8,${strength * 0.72}) 26%,
        rgba(8,8,8,${strength * 0.32}) 58%,
        rgba(8,8,8,0) 100%)`,
    }}
  />
);
