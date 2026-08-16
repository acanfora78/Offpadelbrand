import React from "react";
import { Img, useCurrentFrame } from "remotion";
import type { Focus } from "../config";
import { EASE } from "../config";
import { ramp, velocityBlur, velocityOf } from "./motion";

/**
 * Full-bleed product photography under a single continuous camera move.
 *
 * The zoom's transform-origin is set from a measured focal point on the
 * actual artwork, so a push always converges on a real detail — the carbon
 * weave, the Ø, the stitched signature. Scale and pan are driven by the same
 * clock, and their combined velocity drives a blur so quick moves smear like
 * captured footage. The photo is never stretched: object-fit stays `cover`
 * and only uniform scale is applied, so proportions cannot drift.
 */
export const CinematicZoom: React.FC<{
  src: string;
  focus: Focus;
  from: number;
  to: number;
  delay?: number;
  duration: number;
  /** Optional lateral drift, in % of frame, for a dolly rather than a pure zoom. */
  panX?: [number, number];
  panY?: [number, number];
  easing?: (n: number) => number;
  blurGain?: number;
  style?: React.CSSProperties;
}> = ({
  src,
  focus,
  from,
  to,
  delay = 0,
  duration,
  panX,
  panY,
  easing = EASE.camera,
  blurGain = 34,
  style,
}) => {
  const frame = useCurrentFrame();

  const scaleAt = (f: number) =>
    ramp({ frame: f, from, to, delay, duration, easing });
  const xAt = (f: number) =>
    panX
      ? ramp({ frame: f, from: panX[0], to: panX[1], delay, duration, easing })
      : 0;
  const yAt = (f: number) =>
    panY
      ? ramp({ frame: f, from: panY[0], to: panY[1], delay, duration, easing })
      : 0;

  const scale = scaleAt(frame);
  const x = xAt(frame);
  const y = yAt(frame);

  // Zoom velocity is scaled by the current magnification: the same scale
  // delta moves far more pixels when you are already pushed in.
  const zoomSmear = Math.abs(velocityOf(scaleAt, frame)) * scale;
  const panSmear = Math.hypot(velocityOf(xAt, frame), velocityOf(yAt, frame));
  const blur = velocityBlur(zoomSmear + panSmear * 0.5, blurGain);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", ...style }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: `${focus.x}% ${focus.y}%`,
          transform: `translate(${x}%, ${y}%) scale(${scale})`,
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
          willChange: "transform",
        }}
      />
    </div>
  );
};
