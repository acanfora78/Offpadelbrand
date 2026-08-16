import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, EASE, LOGO_CROP, TYPE, WIDTH } from "../config";
import { displayFontFamily } from "../font";
import { LogoPlate } from "../components/LogoPlate";
import { TextReveal } from "../components/TextReveal";
import { ramp } from "../components/motion";
import { HERO_CARDS, StaticCard } from "./heroCards";

// Where the cream field comes to rest — exactly the signature plate's box.
const PLATE_WIDTH = 560;
const PLATE_HEIGHT = PLATE_WIDTH / LOGO_CROP.aspect;
const PLATE_LEFT = (WIDTH - PLATE_WIDTH) / 2;
const PLATE_TOP = 660;

/**
 * SHOT 08 — 17.00-20.00s. Everything resolves to the signature.
 *
 * The spread carries over from the previous shot and dissolves in place, then
 * the cream ground itself contracts — a rectangle closing inward until the only
 * light left in frame is the plate the signature is printed on. Because the
 * field and the artwork's own backdrop are the same colour, the contraction
 * lands on the mark with no seam: the brand is literally what remains when
 * everything else is taken away.
 *
 * The call to action is set as a tracked-out line over a hairline rule, not a
 * filled button — a fashion end card, not storefront furniture. Terracotta
 * appears here and nowhere else in the cut.
 */
export const FinalCta: React.FC = () => {
  const frame = useCurrentFrame();

  const cardsOut = ramp({ frame, from: 1, to: 0, duration: 12, easing: EASE.out });
  const cardsDrift = ramp({ frame, from: 0, to: -22, duration: 22, easing: EASE.out });

  // The cream field closes in on the plate.
  const close = ramp({ frame, from: 0, to: 1, delay: 6, duration: 24, easing: EASE.camera });
  const inset = {
    top: PLATE_TOP * close,
    right: PLATE_LEFT * close,
    bottom: (1920 - (PLATE_TOP + PLATE_HEIGHT)) * close,
    left: PLATE_LEFT * close,
  };

  const ruleWidth = ramp({ frame, from: 0, to: 54, delay: 62, duration: 16, easing: EASE.camera });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* The cream ground, contracting to the plate. */}
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.logoPlate,
          clipPath: `inset(${inset.top}px ${inset.right}px ${inset.bottom}px ${inset.left}px)`,
        }}
      />

      {cardsOut > 0 ? (
        <AbsoluteFill style={{ transform: `translateY(${cardsDrift}px)` }}>
          {HERO_CARDS.map((spec) => (
            <StaticCard key={spec.key} spec={spec} opacity={cardsOut} />
          ))}
        </AbsoluteFill>
      ) : null}

      <div
        style={{
          position: "absolute",
          left: PLATE_LEFT,
          top: PLATE_TOP,
        }}
      >
        <LogoPlate width={PLATE_WIDTH} delay={14} duration={16} sweepDelay={26} />
      </div>

      <AbsoluteFill
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: PLATE_TOP + PLATE_HEIGHT + 64,
        }}
      >
        <TextReveal
          lines={["Unleash your instinct."]}
          variant="label"
          delay={42}
          duration={16}
          align="center"
          color={COLORS.silver}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 348,
          gap: 18,
        }}
      >
        <div
          style={{
            width: ruleWidth,
            height: 1,
            backgroundColor: COLORS.terracotta,
          }}
        />
        <TextReveal
          lines={["Scopri la collezione"]}
          variant="cta"
          delay={66}
          duration={16}
          align="center"
          color={COLORS.terracotta}
        />
        <div
          style={{
            fontFamily: displayFontFamily,
            fontSize: 19,
            letterSpacing: TYPE.label.letterSpacing,
            color: "rgba(191,192,194,0.5)",
            textTransform: "uppercase",
            opacity: ramp({ frame, from: 0, to: 1, delay: 74, duration: 14 }),
          }}
        >
          Off Padel
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
