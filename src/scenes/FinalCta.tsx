import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { LogoPlate } from "../components/LogoPlate";
import { Eyebrow, CtaLabel } from "../components/Typography";
import { cinematicIn } from "../lib/motion";

// Scene 7 — 0:20-0:24. Black out, signature settles, tagline, a beat of
// silence, then the terracotta call to action.
export const FinalCta: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = cinematicIn(frame, 0, 70);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <AbsoluteFill
        style={{
          opacity: glow,
          background:
            "radial-gradient(ellipse 60% 45% at 50% 40%, rgba(191,192,194,0.09) 0%, rgba(8,8,8,0) 70%)",
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <LogoPlate delay={0} width={520} duration={44} />
        <Eyebrow delay={44} duration={26} style={{ fontSize: 24 }}>
          Unleash your instinct.
        </Eyebrow>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 210,
        }}
      >
        <CtaLabel delay={88} duration={24}>
          Scopri la collezione
        </CtaLabel>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
