import React from "react";
import { useCurrentFrame } from "remotion";
import { displayFontFamily } from "../font";
import { COLORS } from "../theme";
import { cinematicIn } from "../lib/motion";

const revealStyle = (
  progress: number,
  translateY: number = 22,
): React.CSSProperties => ({
  opacity: progress,
  transform: `translateY(${(1 - progress) * translateY}px)`,
  clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
});

export const Eyebrow: React.FC<{
  delay: number;
  duration?: number;
  color?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay, duration = 20, color = COLORS.silver, children, style }) => {
  const frame = useCurrentFrame();
  const progress = cinematicIn(frame, delay, duration);
  return (
    <div
      style={{
        fontFamily: displayFontFamily,
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color,
        ...revealStyle(progress, 14),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Headline: React.FC<{
  delay: number;
  duration?: number;
  size?: number;
  color?: string;
  weight?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  delay,
  duration = 26,
  size = 68,
  color = COLORS.cream,
  weight = 300,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const progress = cinematicIn(frame, delay, duration);
  return (
    <div
      style={{
        fontFamily: displayFontFamily,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.12,
        letterSpacing: "0.01em",
        textTransform: "uppercase",
        color,
        ...revealStyle(progress, 26),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const CtaLabel: React.FC<{
  delay: number;
  duration?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay, duration = 22, children, style }) => {
  const frame = useCurrentFrame();
  const progress = cinematicIn(frame, delay, duration);
  const lineWidth = cinematicIn(frame, delay + 6, duration);
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        opacity: progress,
        transform: `translateY(${(1 - progress) * 14}px)`,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: displayFontFamily,
          fontWeight: 600,
          fontSize: 30,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: COLORS.terracotta,
        }}
      >
        {children}
      </div>
      <div
        style={{
          width: 64 * lineWidth,
          height: 2,
          backgroundColor: COLORS.terracotta,
        }}
      />
    </div>
  );
};
