import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, FPS } from "../../config";
import { displayFontFamily } from "../../font";

const mono = `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace`;

const tc = (frames: number) => {
  const total = frames / FPS;
  const s = Math.floor(total);
  const f = Math.round((total - s) * FPS);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
};

export type PlateSpec = {
  scene: string;
  title: string;
  camera: string;
  action: string;
  audio?: string;
  /** Absolute frame the scene starts on the master timeline. */
  from: number;
  duration: number;
};

/**
 * Holds a slot in the edit for a shot that has not been filmed.
 *
 * This is an offline slate, not a placeholder graphic. It deliberately shows
 * no product and no stand-in imagery: inventing a frame here would make the
 * cut look finished when it is not, and the whole point of the brief is that
 * every product on screen is the real one. What it does instead is carry the
 * shot's own paperwork — slate, timecode, camera and action — so the animatic
 * plays at the right length and rhythm, and the recorded clip drops into this
 * slot without the edit moving.
 *
 * A running frame counter is included so the plate reads as live footage
 * duration rather than a still card.
 */
export const FootagePlate: React.FC<{ spec: PlateSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0E0E10" }}>
      {/* Frame edge, like a camera-report card. */}
      <AbsoluteFill
        style={{
          margin: 56,
          border: `1px solid rgba(191,192,194,0.22)`,
        }}
      />

      <AbsoluteFill
        style={{
          padding: "0 108px",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: 21,
            letterSpacing: "0.2em",
            color: COLORS.terracotta,
            textTransform: "uppercase",
          }}
        >
          {spec.scene} · to be shot
        </div>

        <div
          style={{
            fontFamily: displayFontFamily,
            fontSize: 58,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.06,
            color: COLORS.cream,
          }}
        >
          {spec.title}
        </div>

        <div style={{ display: "grid", gap: 22, maxWidth: 780 }}>
          <Field label="Camera" value={spec.camera} />
          <Field label="Action" value={spec.action} />
          {spec.audio ? <Field label="Audio" value={spec.audio} /> : null}
        </div>
      </AbsoluteFill>

      {/* Running timecode — bottom rail. */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          padding: "0 108px 128px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: mono,
            fontSize: 19,
            letterSpacing: "0.1em",
            color: "rgba(191,192,194,0.6)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span>{tc(spec.from + frame)}</span>
          <span>
            {String(frame + 1).padStart(3, "0")} / {spec.duration}f
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Field: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 20 }}>
    <div
      style={{
        fontFamily: mono,
        fontSize: 15,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "rgba(191,192,194,0.55)",
        paddingTop: 5,
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: displayFontFamily,
        fontSize: 27,
        lineHeight: 1.42,
        color: "rgba(245,245,240,0.92)",
      }}
    >
      {value}
    </div>
  </div>
);
