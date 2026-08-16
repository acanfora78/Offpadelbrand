import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { cinematicIn } from "../lib/motion";
import { LightSweep } from "./LightSweep";

const LOGO_SRC = staticFile("assets/logo/off-padel-logo-metallic-cream.png");
const LOGO_ASPECT = 1774 / 887;

/**
 * The official OFF Padel signature ships on its own cream field. We never
 * redraw or re-cut it — instead the whole plate is treated as one object:
 * feathered at the edges so it reads as a soft glow emerging from black,
 * with a light reflection animated on top (a separate gradient layer,
 * the logo pixels themselves are untouched).
 */
export const LogoPlate: React.FC<{
  delay: number;
  width?: number;
  duration?: number;
  sweepDelay?: number;
}> = ({ delay, width = 620, duration = 40, sweepDelay }) => {
  const frame = useCurrentFrame();
  const progress = cinematicIn(frame, delay, duration);
  const scale = 0.92 + progress * 0.08;
  const height = width / LOGO_ASPECT;

  const maskImage =
    "radial-gradient(ellipse 58% 58% at 50% 50%, black 35%, transparent 92%)";

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        opacity: progress,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          WebkitMaskImage: maskImage,
          maskImage,
        }}
      >
        <Img
          src={LOGO_SRC}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      <LightSweep
        delay={sweepDelay ?? delay + 10}
        duration={38}
        angle={22}
        opacity={0.6}
        width={30}
      />
    </div>
  );
};
