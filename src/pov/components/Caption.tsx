import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, EASE } from "../../config";
import { displayFontFamily } from "../../font";
import type { Line } from "../config";

/**
 * Burned-in dialogue captions, set the way the platform sets them.
 *
 * This is not a stylistic flourish — the overwhelming majority of TikTok is
 * watched muted on the first pass, so a film whose story is carried by
 * dialogue is unreadable without captions. They are deliberately plainer than
 * the brand's own typography: heavy, tightly set, high-contrast, sitting above
 * the caption and button furniture. Type that looks art-directed here would
 * read as an ad and undo the native framing the whole concept depends on.
 */
const CaptionLine: React.FC<{ line: Line }> = ({ line }) => {
  const frame = useCurrentFrame();
  const local = frame - line.at;
  if (local < -2 || local > line.hold) return null;

  const pop = interpolate(local, [0, 4], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.beat,
  });
  const fade = interpolate(
    local,
    [0, 3, line.hold - 4, line.hold],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        fontFamily: displayFontFamily,
        fontSize: 52,
        fontWeight: 700,
        letterSpacing: "-0.015em",
        lineHeight: 1.16,
        color: "#FFFFFF",
        textAlign: "center",
        maxWidth: 880,
        opacity: fade,
        transform: `scale(${pop})`,
        // A dark rim rather than a box: legible on grass, glass or kit without
        // putting a graphic slab over the picture.
        textShadow:
          "0 2px 0 rgba(8,8,8,0.9), 0 0 14px rgba(8,8,8,0.75), 0 0 36px rgba(8,8,8,0.5)",
      }}
    >
      {line.text}
    </div>
  );
};

export const Captions: React.FC<{ lines: Line[] }> = ({ lines }) => (
  <AbsoluteFill
    style={{
      alignItems: "center",
      justifyContent: "flex-end",
      paddingBottom: 470,
      paddingLeft: 80,
      paddingRight: 80,
      pointerEvents: "none",
    }}
  >
    {lines.map((line, i) => (
      <CaptionLine key={`${line.text}-${i}`} line={line} />
    ))}
  </AbsoluteFill>
);

/**
 * The platform-voice overlay that frames the whole video. Small, upper area,
 * deliberately understated — it sets the POV premise and then gets out of the
 * way.
 */
export const TextOverlay: React.FC<{
  text: string;
  at: number;
  hold: number;
  top?: number;
}> = ({ text, at, hold, top = 330 }) => {
  const frame = useCurrentFrame();
  const local = frame - at;
  if (local < 0 || local > hold) return null;

  const fade = interpolate(local, [0, 6, hold - 8, hold], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rise = interpolate(local, [0, 10], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.beat,
  });

  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: top }}
    >
      <div
        style={{
          fontFamily: displayFontFamily,
          fontSize: 34,
          fontWeight: 600,
          letterSpacing: "-0.005em",
          color: COLORS.cream,
          opacity: fade,
          transform: `translateY(${rise}px)`,
          textShadow: "0 2px 18px rgba(8,8,8,0.85)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
