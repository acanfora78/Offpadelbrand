import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, EASE, LOGO_CROP, WIDTH } from "../../config";
import { ramp } from "../../components/motion";
import { LogoPlate } from "../../components/LogoPlate";
import { displayFontFamily } from "../../font";

const PLATE_WIDTH = 470;
const PLATE_HEIGHT = PLATE_WIDTH / LOGO_CROP.aspect;

/**
 * SCENE 07 — 21.0-23.0s. The sign-off.
 *
 * Deliberately small and late. The brand has already been named twice in
 * dialogue by this point, so the signature is confirmation rather than
 * announcement — a big centred logo here would convert the film back into an
 * advert in its final two seconds. The official artwork is used exactly as
 * delivered.
 */
export const FinalBrand: React.FC = () => {
  const frame = useCurrentFrame();

  const ground = ramp({ frame, from: 0, to: 1, duration: 8, easing: EASE.camera });
  const taglineRise = ramp({ frame, from: 12, to: 0, delay: 22, duration: 14, easing: EASE.beat });
  const taglineFade = ramp({ frame, from: 0, to: 1, delay: 22, duration: 14 });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <AbsoluteFill
        style={{
          opacity: ground,
          background:
            "radial-gradient(ellipse 62% 44% at 50% 46%, rgba(191,192,194,0.08) 0%, rgba(8,8,8,0) 72%)",
        }}
      />

      <AbsoluteFill
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 34,
        }}
      >
        <div style={{ width: PLATE_WIDTH, height: PLATE_HEIGHT }}>
          <LogoPlate width={PLATE_WIDTH} delay={2} duration={18} sweepDelay={10} />
        </div>

        <div
          style={{
            fontFamily: displayFontFamily,
            fontSize: 23,
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: COLORS.silver,
            opacity: taglineFade,
            transform: `translateY(${taglineRise}px)`,
          }}
        >
          Unleash your instinct
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 420 }}
      >
        <div
          style={{
            width: ramp({ frame, from: 0, to: 44, delay: 40, duration: 14, easing: EASE.camera }),
            height: 1,
            backgroundColor: COLORS.terracotta,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Kept alongside the plate geometry so the end card stays centred if resized. */
export const PLATE_LEFT = (WIDTH - PLATE_WIDTH) / 2;
