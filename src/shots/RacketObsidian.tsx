import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { ASSETS, COLORS, EASE, FOCUS, SAFE_AREA } from "../config";
import { LightSweep } from "../components/LightSweep";
import { TextReveal } from "../components/TextReveal";
import { CopyScrim } from "../components/CopyScrim";
import { velocityBlur, velocityOf } from "../components/motion";

const STOPS = [0, 14, 32, 66];
const SCALES = [4.1, 2.9, 2.0, 1.04];
const ORIGIN_X = [
  FOCUS.obsidian.weave.x,
  FOCUS.obsidian.symbol.x,
  FOCUS.obsidian.signature.x,
  FOCUS.obsidian.full.x,
];
const ORIGIN_Y = [
  FOCUS.obsidian.weave.y,
  FOCUS.obsidian.symbol.y,
  FOCUS.obsidian.signature.y,
  FOCUS.obsidian.full.y,
];

const track = (frame: number, values: number[]) =>
  interpolate(frame, STOPS, values, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.camera,
  });

/**
 * SHOT 02 — 0.80-3.00s. The drop, and the reveal.
 *
 * A single unbroken camera move that starts exactly where the hook ended —
 * buried in the carbon weave — and travels the surface of the real product
 * photograph: weave, then the Ø, then the engraved signature, then all the
 * way out to the whole racket. Because the transform-origin migrates between
 * measured points on the artwork while the scale unwinds, the frame reads as
 * a macro lens physically pulling back off the paddle, not as an image being
 * resized. Uniform scale only, so the racket's geometry is exactly the
 * geometry in the photograph.
 */
export const RacketObsidian: React.FC = () => {
  const frame = useCurrentFrame();

  const scaleAt = (f: number) => track(f, SCALES);
  const oxAt = (f: number) => track(f, ORIGIN_X);
  const oyAt = (f: number) => track(f, ORIGIN_Y);

  const scale = scaleAt(frame);
  const ox = oxAt(frame);
  const oy = oyAt(frame);

  const smear =
    Math.abs(velocityOf(scaleAt, frame)) * scale +
    Math.hypot(velocityOf(oxAt, frame), velocityOf(oyAt, frame)) * 0.08;
  const blur = velocityBlur(smear, 30, 22);

  // Impact bloom on the drop itself.
  const bloom = interpolate(frame, [0, 4], [0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={ASSETS.obsidian}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transformOrigin: `${ox}% ${oy}%`,
            transform: `scale(${scale})`,
            filter: blur > 0 ? `blur(${blur}px)` : undefined,
            willChange: "transform",
          }}
        />
      </AbsoluteFill>

      <LightSweep delay={2} duration={30} intensity={0.5} width={30} angle={16} specular />
      <LightSweep delay={38} duration={26} intensity={0.3} width={22} angle={-12} />
      <CopyScrim height={38} strength={0.7} />

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-start",
          paddingLeft: SAFE_AREA.left,
          paddingBottom: SAFE_AREA.bottom,
        }}
      >
        <TextReveal
          lines={["Precision."]}
          variant="headline"
          delay={42}
          duration={13}
          color={COLORS.cream}
        />
        <TextReveal
          lines={["Carbon 12K — Obsidian"]}
          variant="label"
          delay={50}
          duration={12}
          color={COLORS.silver}
          style={{ marginTop: 18 }}
        />
      </AbsoluteFill>

      {bloom > 0 ? (
        <AbsoluteFill
          style={{
            backgroundColor: "#FFFFFF",
            opacity: bloom,
            mixBlendMode: "screen",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
