import React from "react";
import { Img } from "remotion";
import { ASSETS, EASE, FOCUS, type Focus } from "../config";
import { MaskedReveal, type RevealDirection } from "../components/MaskedReveal";

export type CardSpec = {
  key: string;
  src: string;
  focus: Focus;
  left: number;
  top: number;
  width: number;
  height: number;
  delay: number;
  direction: RevealDirection;
};

/**
 * The hero spread's layout, shared by the montage and by the sign-off that
 * dissolves it, so the two shots agree to the pixel and the transition
 * between them is continuous rather than a cut.
 *
 * The layout is a lookbook spread, not a collage: the hero holds the left
 * column at full height while the supporting pieces step down the right in
 * decreasing size, all above the platform's caption zone. Card aspect ratios
 * match their source files exactly, so `cover` has nothing to crop and no
 * product can be squeezed.
 */
export const HERO_CARDS: CardSpec[] = [
  {
    key: "obsidian",
    src: ASSETS.obsidian,
    focus: FOCUS.obsidian.full,
    left: 92,
    top: 440,
    width: 480,
    height: 720,
    delay: 0,
    direction: "up",
  },
  {
    key: "pearl",
    src: ASSETS.pearl,
    focus: FOCUS.pearl.full,
    left: 620,
    top: 560,
    width: 270,
    height: 405,
    delay: 5,
    direction: "left",
  },
  {
    key: "bag",
    src: ASSETS.bag,
    focus: FOCUS.bag.full,
    left: 620,
    top: 1005,
    width: 270,
    height: 180,
    delay: 9,
    direction: "left",
  },
  {
    key: "tshirt",
    src: ASSETS.tshirtWhite,
    focus: FOCUS.tshirtWhite.full,
    left: 92,
    top: 1225,
    width: 225,
    height: 300,
    delay: 13,
    direction: "down",
  },
  {
    key: "shorts",
    src: ASSETS.shortsBlack,
    focus: FOCUS.shortsBlack.full,
    left: 350,
    top: 1265,
    width: 225,
    height: 225,
    delay: 16,
    direction: "down",
  },
  {
    key: "bottle",
    src: ASSETS.bottle,
    focus: FOCUS.bottle.full,
    left: 620,
    top: 1255,
    width: 165,
    height: 248,
    delay: 19,
    direction: "down",
  },
];

const CardFrame: React.FC<{
  spec: CardSpec;
  children: React.ReactNode;
  opacity?: number;
}> = ({ spec, children, opacity = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: spec.left,
      top: spec.top,
      width: spec.width,
      height: spec.height,
      overflow: "hidden",
      borderRadius: 5,
      opacity,
      boxShadow: `0 26px 60px rgba(20,16,10,${0.2 * opacity}), 0 4px 12px rgba(20,16,10,${0.14 * opacity})`,
    }}
  >
    {children}
  </div>
);

const CardImage: React.FC<{ spec: CardSpec }> = ({ spec }) => (
  <Img
    src={spec.src}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: `${spec.focus.x}% ${spec.focus.y}%`,
    }}
  />
);

/** Card as it assembles on the second drop. */
export const RevealingCard: React.FC<{ spec: CardSpec }> = ({ spec }) => (
  <CardFrame spec={spec}>
    <MaskedReveal
      direction={spec.direction}
      delay={spec.delay}
      duration={11}
      slide={14}
      easing={EASE.beat}
    >
      <CardImage spec={spec} />
    </MaskedReveal>
  </CardFrame>
);

/** Card already on screen — used while the spread is being taken apart. */
export const StaticCard: React.FC<{ spec: CardSpec; opacity: number }> = ({
  spec,
  opacity,
}) => (
  <CardFrame spec={spec} opacity={opacity}>
    <CardImage spec={spec} />
  </CardFrame>
);
