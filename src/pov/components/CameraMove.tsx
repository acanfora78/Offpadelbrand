import React from "react";
import { useCurrentFrame } from "remotion";
import { FPS } from "../../config";

/**
 * Simulated handheld.
 *
 * Real handheld is not random jitter — it is a slow postural drift with a
 * faster breathing tremor on top, and the rotation lags the translation
 * because a wrist pivots before an arm corrects. Layering three sine
 * components at incommensurate frequencies reproduces that without ever
 * repeating on a visible cycle, and keeps the motion smooth enough that it
 * reads as a person rather than a shake filter.
 *
 * `intensity` 0 is locked-off; 1 is a operator walking backwards.
 */
export const CameraMove: React.FC<{
  intensity?: number;
  /** Slow directional push across the shot, in % of frame. */
  driftX?: [number, number];
  driftY?: [number, number];
  duration?: number;
  scale?: number;
  children: React.ReactNode;
}> = ({
  intensity = 0.5,
  driftX,
  driftY,
  duration,
  scale = 1,
  children,
}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const k = intensity;

  // Postural sway, breathing tremor, and a slow wander that never loops.
  const x =
    Math.sin(t * 1.7) * 0.55 * k +
    Math.sin(t * 4.3 + 1.1) * 0.18 * k +
    Math.sin(t * 0.61 + 2.4) * 0.9 * k;
  const y =
    Math.cos(t * 1.9 + 0.6) * 0.48 * k +
    Math.sin(t * 5.1) * 0.14 * k +
    Math.cos(t * 0.53) * 0.7 * k;

  // Rotation lags translation slightly — the wrist leads, the arm corrects.
  const rot = Math.sin(t * 1.7 - 0.45) * 0.42 * k;

  const p = duration ? Math.min(1, Math.max(0, frame / duration)) : 0;
  const dx = driftX ? driftX[0] + (driftX[1] - driftX[0]) * p : 0;
  const dy = driftY ? driftY[0] + (driftY[1] - driftY[0]) * p : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `translate(${x + dx}%, ${y + dy}%) rotate(${rot}deg) scale(${scale * 1.06})`,
        transformOrigin: "50% 50%",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};
