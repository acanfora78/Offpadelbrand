import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { CinematicImage } from "../components/CinematicImage";
import { Headline } from "../components/Typography";
import { beatOpacity } from "../lib/beats";

const BEAT = 30;
const CROSSFADE = 8;

const ITEMS = [
  {
    src: staticFile("assets/products/apparel/tshirt-white.png"),
    originX: 42,
    originY: 30,
  },
  {
    src: staticFile("assets/products/apparel/tshirt-black.png"),
    originX: 46,
    originY: 28,
  },
  {
    src: staticFile("assets/products/apparel/shorts-white.png"),
    originX: 66,
    originY: 74,
  },
  {
    src: staticFile("assets/products/apparel/shorts-black.png"),
    originX: 66,
    originY: 74,
  },
];

// Scene 4 — 0:09-0:13. Rapid, elegant reveals of the apparel line —
// one garment on screen at a time, crossfaded rather than hard-cut.
export const ApparelSequence: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {ITEMS.map((item, index) => {
        const opacity = beatOpacity(frame, index, BEAT, CROSSFADE);
        if (opacity <= 0) return null;
        const localDelay = index * BEAT;
        return (
          <AbsoluteFill key={item.src} style={{ opacity }}>
            <CinematicImage
              src={item.src}
              delay={localDelay}
              duration={BEAT - 4}
              fromScale={1.28}
              toScale={1.0}
              originX={item.originX}
              originY={item.originY}
            />
          </AbsoluteFill>
        );
      })}

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 190,
        }}
      >
        <Headline
          delay={10}
          duration={26}
          size={40}
          weight={400}
          style={{ textAlign: "center", letterSpacing: "0.14em" }}
        >
          Performance. Design. Identity.
        </Headline>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
