import React from "react";
import { useCurrentFrame } from "remotion";

/**
 * The finishing pass laid over the whole cut: a soft corner falloff and a
 * moving grain plate. Flat digital gradients and studio cut-outs are the two
 * things that make a composited spot look rendered; a little vignette and
 * live grain is what puts it back on film.
 */
export const Grade: React.FC<{ vignette?: number; grain?: number }> = ({
  vignette = 0.19,
  grain = 0.18,
}) => {
  const frame = useCurrentFrame();
  // Prime-number strides keep the grain from visibly repeating on a cycle.
  const dx = (frame * 37) % 160;
  const dy = (frame * 53) % 160;

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse 88% 82% at 50% 48%, rgba(0,0,0,0) 66%, rgba(0,0,0,${vignette}) 100%)`,
        }}
      />
      <svg
        style={{
          position: "absolute",
          inset: -8,
          width: "calc(100% + 16px)",
          height: "calc(100% + 16px)",
          opacity: grain,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
        aria-hidden
      >
        <filter id="offpadel-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.85}
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0"
          />
        </filter>
        <rect
          x={-dx}
          y={-dy}
          width="calc(100% + 160px)"
          height="calc(100% + 160px)"
          filter="url(#offpadel-grain)"
        />
      </svg>
    </>
  );
};
