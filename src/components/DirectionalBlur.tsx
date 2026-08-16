import React, { useId } from "react";

/**
 * Directional (lateral) blur via an SVG filter, so horizontal whips smear
 * along the axis of travel instead of getting a uniform soft-focus halo.
 * The filter is only mounted when there is actually motion to smear —
 * below the threshold the children render untouched, which keeps every
 * settled frame perfectly sharp and avoids paying for the filter at all.
 */
export const DirectionalBlur: React.FC<{
  x: number;
  y?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ x, y = 0, children, style }) => {
  const id = useId().replace(/:/g, "");

  if (x < 0.4 && y < 0.4) {
    return <div style={{ position: "absolute", inset: 0, ...style }}>{children}</div>;
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        filter: `url(#blur-${id})`,
        ...style,
      }}
    >
      <svg
        style={{ position: "absolute", width: 0, height: 0 }}
        aria-hidden
      >
        <defs>
          <filter id={`blur-${id}`} x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation={`${x} ${y}`} edgeMode="duplicate" />
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
};
