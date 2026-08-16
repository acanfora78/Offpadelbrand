import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { CinematicImage } from "../components/CinematicImage";
import { beatOpacity } from "../lib/beats";

const BEAT = 22.5;
const CROSSFADE = 6;

const ITEMS = [
  {
    src: staticFile("assets/products/accessories/overgrip.png"),
    originX: 30,
    originY: 55,
  },
  {
    src: staticFile("assets/products/accessories/towel-white.png"),
    originX: 50,
    originY: 62,
  },
  {
    src: staticFile("assets/products/accessories/socks.png"),
    originX: 42,
    originY: 30,
  },
  {
    src: staticFile("assets/products/accessories/bottle.png"),
    originX: 45,
    originY: 55,
  },
];

// Scene 5 — 0:13-0:16. Quick macro passes over materials and stitched
// logos — texture is the protagonist here, no copy needed.
export const AccessoriesSequence: React.FC = () => {
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
              duration={BEAT - 3}
              fromScale={1.7}
              toScale={1.15}
              originX={item.originX}
              originY={item.originY}
            />
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
