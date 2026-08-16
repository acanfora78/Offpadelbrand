import React from "react";
import { useCurrentFrame } from "remotion";
import { EASE } from "../config";
import { ramp } from "./motion";

export type RevealDirection = "left" | "right" | "up" | "down";

const insetFor = (dir: RevealDirection, hidden: number) => {
  const v = `${hidden * 100}%`;
  switch (dir) {
    case "left":
      return `0 0 0 ${v}`;
    case "right":
      return `0 ${v} 0 0`;
    case "up":
      return `${v} 0 0 0`;
    case "down":
      return `0 0 ${v} 0`;
  }
};

/**
 * Wipes children into frame behind a hard edge. Paired with a counter-move
 * on the content itself (see `slide`), the subject appears to be uncovered
 * by the edge rather than sliding underneath it — the difference between a
 * considered edit and a stock transition.
 */
export const MaskedReveal: React.FC<{
  direction?: RevealDirection;
  delay?: number;
  duration: number;
  /** Counter-slide of the content, in % of frame. */
  slide?: number;
  easing?: (n: number) => number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  direction = "left",
  delay = 0,
  duration,
  slide = 0,
  easing = EASE.beat,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const hidden = ramp({ frame, from: 1, to: 0, delay, duration, easing });

  const axis = direction === "left" || direction === "right" ? "X" : "Y";
  const sign = direction === "left" || direction === "up" ? 1 : -1;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        clipPath: `inset(${insetFor(direction, hidden)})`,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: slide
            ? `translate${axis}(${hidden * slide * sign}%)`
            : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
};
