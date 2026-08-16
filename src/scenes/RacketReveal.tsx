import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS, EASE } from "../theme";
import { CinematicImage } from "../components/CinematicImage";
import { Eyebrow, Headline } from "../components/Typography";

const OBSIDIAN = staticFile("assets/products/rackets/obsidian.png");
const PEARL = staticFile("assets/products/rackets/pearl.png");

const CUT = 86; // local frame the Obsidian -> Pearl swap happens on
const WIPE_HALF = 12;

// Scenes 2-3 — 0:03-0:09. Macro carbon reveal on Obsidian, then a
// light-sweep wipe hands off to Pearl with a slow orbiting push.
export const RacketReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const obsidianOpacity = interpolate(
    frame,
    [CUT - 2, CUT + 6],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const pearlOpacity = interpolate(
    frame,
    [CUT - 2, CUT + 6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Full-width light wipe that covers the swap.
  const wipeX = interpolate(
    frame,
    [CUT - WIPE_HALF, CUT + WIPE_HALF],
    [-30, 130],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.linear },
  );
  const wipeOpacity = interpolate(
    frame,
    [CUT - WIPE_HALF, CUT - 2, CUT + 2, CUT + WIPE_HALF],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const pearlLocal = frame - (CUT - 4);
  const pearlRotate = interpolate(pearlLocal, [0, 94], [-7, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.cinematic,
  });
  const pearlScale = interpolate(pearlLocal, [0, 94], [1.16, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.cinematic,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <AbsoluteFill style={{ opacity: obsidianOpacity }}>
        <CinematicImage
          src={OBSIDIAN}
          delay={0}
          duration={72}
          fromScale={2.7}
          toScale={1.08}
          originX={50}
          originY={45}
        />
        <AbsoluteFill
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-end",
            paddingLeft: 90,
            paddingBottom: 210,
          }}
        >
          <Eyebrow delay={58} duration={20}>
            Precision.
          </Eyebrow>
        </AbsoluteFill>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: pearlOpacity }}>
        <AbsoluteFill
          style={{
            perspective: 1600,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              transform: `rotateY(${pearlRotate}deg) scale(${pearlScale})`,
              transformStyle: "preserve-3d",
            }}
          >
            <Img
              src={PEARL}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingRight: 90,
            paddingBottom: 210,
          }}
        >
          <Headline delay={40} duration={26} size={44} weight={300}>
            Designed to
            <br />
            perform.
          </Headline>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Wipe transition */}
      <AbsoluteFill
        style={{ overflow: "hidden", opacity: wipeOpacity, mixBlendMode: "screen" }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: `${wipeX}%`,
            width: "26%",
            height: "120%",
            transform: "rotate(14deg)",
            background:
              "linear-gradient(90deg, rgba(191,192,194,0) 0%, rgba(255,255,255,0.95) 50%, rgba(191,192,194,0) 100%)",
            filter: "blur(4px)",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
