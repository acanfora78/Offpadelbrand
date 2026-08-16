import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, EASE, SAFE_AREA } from "../config";
import { LogoPlate } from "../components/LogoPlate";
import { TextReveal } from "../components/TextReveal";
import { ramp } from "../components/motion";

/**
 * SHOT 06 — 11.50-13.50s. The pattern interrupt, and the payoff.
 *
 * After nine hard cuts on black, everything stops: the frame flips to cream
 * and holds. The reversal is the point — on a feed, an abrupt change of
 * ground is what re-captures an eye that has started to drift, and it buys
 * the two seconds needed to land the actual claim. The signature settles
 * first, then the line arrives in two beats with a real pause between them,
 * so "a statement" reads as a verdict rather than a caption.
 */
export const PatternInterrupt: React.FC = () => {
  const frame = useCurrentFrame();

  // The cream field snaps in over two frames — a cut, not a dissolve.
  const ground = ramp({ frame, from: 0, to: 1, duration: 2, easing: EASE.beat });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <AbsoluteFill
        style={{ backgroundColor: COLORS.logoPlate, opacity: ground }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(118deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 38%, rgba(120,104,80,0.07) 100%)",
          opacity: ground,
        }}
      />

      <AbsoluteFill
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 54,
          paddingLeft: SAFE_AREA.left,
          paddingRight: SAFE_AREA.right,
        }}
      >
        <LogoPlate width={660} delay={4} duration={20} sweepDelay={8} feather={14} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <TextReveal
            lines={["Not just a racket."]}
            variant="headline"
            delay={22}
            duration={13}
            align="center"
            color={COLORS.black}
          />
          <TextReveal
            lines={["A statement."]}
            variant="statement"
            delay={42}
            duration={14}
            align="center"
            color={COLORS.black}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
