import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { LogoPlate } from "../components/LogoPlate";
import { Headline } from "../components/Typography";
import { cinematicIn } from "../lib/motion";

// Scene 1 — 0:00-0:03. Near-black frame, a thin light reflection crosses
// it, the OFF Padel signature settles in, then the opening line.
export const HeroIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const bgGlow = cinematicIn(frame, 0, 60);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 42%, rgba(191,192,194,0.10) 0%, rgba(8,8,8,0) 70%)",
          opacity: bgGlow,
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 64,
        }}
      >
        <LogoPlate delay={8} width={640} duration={46} />
        <Headline
          delay={46}
          duration={30}
          size={46}
          weight={300}
          style={{
            textAlign: "center",
            maxWidth: 820,
            letterSpacing: "0.06em",
          }}
        >
          Every point starts
          <br />
          with an instinct.
        </Headline>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
