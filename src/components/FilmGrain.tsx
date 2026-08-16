import React from "react";
import { useCurrentFrame } from "remotion";

/**
 * A near-imperceptible grain layer so flat CG-style gradients and product
 * cutouts read as filmed footage rather than a UI export. Rendered as an
 * inline SVG (not a CSS background-image, which Remotion's renderer
 * doesn't reliably rasterize server-side).
 */
export const FilmGrain: React.FC = () => {
  const frame = useCurrentFrame();
  const dx = (frame * 37) % 180;
  const dy = (frame * 53) % 180;

  return (
    <svg
      style={{
        position: "absolute",
        inset: -4,
        width: "calc(100% + 8px)",
        height: "calc(100% + 8px)",
        opacity: 0.22,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
    >
      <filter id="offpadel-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={0.9}
          numOctaves={2}
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0"
        />
      </filter>
      <rect
        x={-dx}
        y={-dy}
        width="calc(100% + 180px)"
        height="calc(100% + 180px)"
        filter="url(#offpadel-grain)"
      />
    </svg>
  );
};
