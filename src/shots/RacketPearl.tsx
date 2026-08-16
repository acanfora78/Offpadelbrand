import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ASSETS, COLORS, EASE, FOCUS, SAFE_AREA } from "../config";
import { ImageParallax } from "../components/ImageParallax";
import { LightSweep } from "../components/LightSweep";
import { TextReveal } from "../components/TextReveal";
import { DirectionalBlur } from "../components/DirectionalBlur";
import { CopyScrim } from "../components/CopyScrim";
import { ramp, velocityBlur, velocityOf } from "../components/motion";

/**
 * SHOT 03 — 3.00-5.20s. Obsidian hands off to Pearl.
 *
 * Rather than dissolving between the two rackets, the Pearl is whipped in
 * laterally under heavy directional blur while a light sweep crosses the
 * frame on the same beat — the eye tracks the movement and the light, and
 * the swap happens inside it. The move decelerates into a slow parallax
 * drift, so the cut resolves into stillness on the product instead of
 * arriving already static.
 */
export const RacketPearl: React.FC = () => {
  const frame = useCurrentFrame();

  const whipAt = (f: number) =>
    ramp({ frame: f, from: 62, to: 0, duration: 9, easing: EASE.beat });
  const whip = whipAt(frame);
  const whipBlur = velocityBlur(velocityOf(whipAt, frame), 1.5, 30, 0.4);

  const settle = interpolate(frame, [0, 9], [1.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.beat,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <DirectionalBlur x={whipBlur} y={whipBlur * 0.08}>
        <AbsoluteFill
          style={{ transform: `translateX(${whip}%) scale(${settle})` }}
        >
          <ImageParallax
            src={ASSETS.pearl}
            focus={FOCUS.pearl.full}
            scale={1.1}
            travel={[2.2, -2.6]}
            depth={0.4}
            duration={66}
          />
        </AbsoluteFill>
      </DirectionalBlur>

      <LightSweep delay={0} duration={20} intensity={0.68} width={34} angle={14} specular />
      <LightSweep delay={34} duration={30} intensity={0.28} width={20} angle={-10} />
      <CopyScrim height={38} strength={0.72} />

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          paddingRight: SAFE_AREA.right,
          paddingBottom: SAFE_AREA.bottom,
        }}
      >
        <TextReveal
          lines={["Designed", "to perform."]}
          variant="headline"
          delay={26}
          duration={13}
          stagger={5}
          align="right"
          color={COLORS.cream}
        />
        <TextReveal
          lines={["Carbon 12K — Pearl"]}
          variant="label"
          delay={38}
          duration={12}
          align="right"
          color={COLORS.silver}
          style={{ marginTop: 18 }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
