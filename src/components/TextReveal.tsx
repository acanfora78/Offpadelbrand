import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, EASE, TYPE } from "../config";
import { displayFontFamily } from "../font";
import { ramp } from "./motion";

type Variant = keyof typeof TYPE;

/**
 * Type that is uncovered rather than faded in: each line sits behind its own
 * clipping edge and rises a few pixels as it clears, which is what makes
 * typography feel set into the image instead of pasted on top.
 */
export const TextReveal: React.FC<{
  lines: string[];
  variant?: Variant;
  delay?: number;
  duration?: number;
  stagger?: number;
  color?: string;
  align?: "left" | "center" | "right";
  exitAt?: number;
  style?: React.CSSProperties;
}> = ({
  lines,
  variant = "headline",
  delay = 0,
  duration = 16,
  stagger = 5,
  color = COLORS.cream,
  align = "left",
  exitAt,
  style,
}) => {
  const frame = useCurrentFrame();
  const type = TYPE[variant];

  const exit =
    exitAt === undefined
      ? 1
      : ramp({ frame, from: 1, to: 0, delay: exitAt, duration: 7, easing: EASE.out });

  if (exit <= 0) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems:
          align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        textAlign: align,
        opacity: exit,
        ...style,
      }}
    >
      {lines.map((line, i) => {
        const p = ramp({
          frame,
          from: 0,
          to: 1,
          delay: delay + i * stagger,
          duration,
          easing: EASE.beat,
        });
        return (
          <div
            key={line + i}
            style={{
              overflow: "hidden",
              // Descenders need headroom or the clip shaves them.
              paddingBottom: "0.14em",
              marginBottom: "-0.14em",
            }}
          >
            <div
              style={{
                fontFamily: displayFontFamily,
                textTransform: "uppercase",
                color,
                whiteSpace: "pre",
                ...type,
                transform: `translateY(${(1 - p) * 108}%)`,
              }}
            >
              {line}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * One word at a time, in place — used where the copy is a list rather than a
 * sentence and each term should land on its own beat.
 */
export const WordCycle: React.FC<{
  words: string[];
  beatLength: number;
  delay?: number;
  variant?: Variant;
  color?: string;
  style?: React.CSSProperties;
}> = ({
  words,
  beatLength,
  delay = 0,
  variant = "headline",
  color = COLORS.cream,
  style,
}) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  if (local < 0) return null;

  const index = Math.min(words.length - 1, Math.floor(local / beatLength));
  const inWord = local - index * beatLength;
  const type = TYPE[variant];

  const enter = ramp({
    frame: inWord,
    from: 0,
    to: 1,
    duration: 8,
    easing: EASE.beat,
  });
  const leave = ramp({
    frame: inWord,
    from: 1,
    to: 0,
    delay: beatLength - 6,
    duration: 6,
    easing: EASE.out,
  });

  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.14em", ...style }}>
      <div
        style={{
          fontFamily: displayFontFamily,
          textTransform: "uppercase",
          color,
          whiteSpace: "pre",
          ...type,
          opacity: leave,
          transform: `translateY(${(1 - enter) * 105}%)`,
        }}
      >
        {words[index]}
      </div>
    </div>
  );
};
