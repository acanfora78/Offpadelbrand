import React from "react";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS, EASE } from "../theme";
import { VignetteCard } from "../components/VignetteCard";
import { Headline } from "../components/Typography";

const OBSIDIAN = staticFile("assets/products/rackets/obsidian.png");
const BAG = staticFile("assets/products/accessories/bag.png");
const BOTTLE = staticFile("assets/products/accessories/bottle.png");
const TOWEL = staticFile("assets/products/accessories/towel-white.png");

const Shadow: React.FC<{
  width: number;
  left: number;
  top: number;
  opacity?: number;
}> = ({ width, left, top, opacity = 0.16 }) => (
  <div
    style={{
      position: "absolute",
      left,
      top,
      width,
      height: width * 0.22,
      borderRadius: "50%",
      background: `radial-gradient(ellipse, rgba(8,8,8,${opacity}) 0%, rgba(8,8,8,0) 72%)`,
      filter: "blur(4px)",
    }}
  />
);

// Scene 6 — 0:16-0:20. Hero composition on the cream field: racket
// protagonist, apparel/accessories playing a supporting role, slow push-in.
export const HeroComposition: React.FC = () => {
  const frame = useCurrentFrame();

  const pushIn = interpolate(frame, [0, 120], [1, 1.045], {
    extrapolateRight: "clamp",
    easing: EASE.cinematic,
  });
  const racketPush = interpolate(frame, [0, 120], [1, 1.07], {
    extrapolateRight: "clamp",
    easing: EASE.cinematic,
  });
  const lightOpacity = interpolate(frame, [0, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const groupIn = interpolate(frame, [0, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.cinematic,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.cream }}>
      {/* Lateral cinematic light */}
      <AbsoluteFill
        style={{
          opacity: lightOpacity,
          background:
            "linear-gradient(112deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 62%, rgba(120,104,80,0.10) 100%)",
        }}
      />

      <AbsoluteFill style={{ transform: `scale(${pushIn})`, opacity: groupIn }}>
        <Shadow width={520} left={140} top={1360} opacity={0.18} />
        <VignetteCard
          src={OBSIDIAN}
          width={560}
          height={840}
          style={{
            position: "absolute",
            left: 100,
            top: 470,
            transform: `scale(${racketPush})`,
            transformOrigin: "50% 60%",
          }}
        />

        <Shadow width={280} left={640} top={520} opacity={0.14} />
        <VignetteCard
          src={BAG}
          width={360}
          height={240}
          style={{ position: "absolute", left: 620, top: 300 }}
        />

        <Shadow width={160} left={90} top={1660} opacity={0.14} />
        <VignetteCard
          src={BOTTLE}
          width={150}
          height={225}
          style={{ position: "absolute", left: 100, top: 1470 }}
        />

        <Shadow width={190} left={760} top={1660} opacity={0.14} />
        <VignetteCard
          src={TOWEL}
          width={190}
          height={255}
          style={{ position: "absolute", left: 780, top: 1460 }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingTop: 150,
          paddingLeft: 90,
        }}
      >
        <Headline delay={12} duration={26} size={54} weight={300} color={COLORS.black}>
          Play different.
        </Headline>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
