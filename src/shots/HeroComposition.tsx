import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, EASE, SAFE_AREA } from "../config";
import { TextReveal } from "../components/TextReveal";
import { LightSweep } from "../components/LightSweep";
import { ramp } from "../components/motion";
import { HERO_CARDS, RevealingCard } from "./heroCards";

/**
 * SHOT 07 — 13.50-17.00s. Second drop, hero montage.
 *
 * The whole range assembled on cream as a campaign spread, with the Obsidian
 * holding the composition and everything else in support. The camera does one
 * slow push across the full three and a half seconds — after the fastest block
 * in the edit, the payoff is allowed to breathe.
 */
export const HeroComposition: React.FC = () => {
  const frame = useCurrentFrame();

  const push = ramp({ frame, from: 1, to: 1.055, duration: 105, easing: EASE.camera });
  const drift = ramp({ frame, from: 6, to: -6, duration: 105, easing: EASE.camera });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.logoPlate }}>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(116deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 34%, rgba(255,255,255,0) 60%, rgba(122,106,84,0.10) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          transform: `scale(${push}) translateY(${drift}px)`,
          transformOrigin: "48% 56%",
        }}
      >
        {HERO_CARDS.map((spec) => (
          <RevealingCard key={spec.key} spec={spec} />
        ))}
      </AbsoluteFill>

      <LightSweep delay={2} duration={40} intensity={0.3} width={40} angle={12} />

      <AbsoluteFill
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingLeft: SAFE_AREA.left,
          paddingTop: 236,
        }}
      >
        <TextReveal
          lines={["Play different."]}
          variant="statement"
          delay={6}
          duration={15}
          color={COLORS.black}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
