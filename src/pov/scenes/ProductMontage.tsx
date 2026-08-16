import React from "react";
import { AbsoluteFill } from "remotion";
import { ASSETS, COLORS, FOCUS } from "../../config";
import { POV_SCENES } from "../config";
import { BeatCut, type BeatItem, ProductShot } from "../components";

const LENGTH = POV_SCENES.productMontage.durationInFrames;
const BEAT = LENGTH / 8;

/**
 * SCENE 06 — 17.0-21.0s. Eight beats, half a second each.
 *
 * This is the one block in the film built entirely from real assets, and it is
 * finished, not previs. It earns its place by arriving *after* the answer — the
 * viewer has already asked what the brand is, so the montage reads as the reply
 * rather than as a product parade. Order runs hero first, then the kit, so the
 * racket anchors it before the world opens out.
 */
const ITEMS: BeatItem[] = [
  {
    key: "obsidian",
    render: (_f, length) => (
      <ProductShot
        src={ASSETS.obsidian}
        focus={FOCUS.obsidian.signature}
        length={length}
        direction="left"
        fromScale={2.0}
        toScale={1.3}
      />
    ),
  },
  {
    key: "pearl",
    render: (_f, length) => (
      <ProductShot
        src={ASSETS.pearl}
        focus={FOCUS.pearl.symbol}
        length={length}
        direction="right"
        fromScale={1.9}
        toScale={1.24}
      />
    ),
  },
  {
    key: "tshirt",
    render: (_f, length) => (
      <ProductShot
        src={ASSETS.tshirtWhite}
        focus={FOCUS.tshirtWhite.chest}
        length={length}
        direction="up"
        fromScale={1.7}
        toScale={1.12}
      />
    ),
  },
  {
    key: "shorts",
    render: (_f, length) => (
      <ProductShot
        src={ASSETS.shortsBlack}
        focus={FOCUS.shortsBlack.mark}
        length={length}
        direction="down"
        fromScale={1.8}
        toScale={1.2}
      />
    ),
  },
  {
    key: "overgrip",
    render: (_f, length) => (
      <ProductShot
        src={ASSETS.overgrip}
        focus={FOCUS.overgrip.roll}
        length={length}
        direction="left"
        fromScale={2.0}
        toScale={1.38}
      />
    ),
  },
  {
    key: "bag",
    render: (_f, length) => (
      <ProductShot
        src={ASSETS.bag}
        focus={FOCUS.bag.signature}
        length={length}
        direction="right"
        fromScale={1.8}
        toScale={1.22}
      />
    ),
  },
  {
    key: "bottle",
    render: (_f, length) => (
      <ProductShot
        src={ASSETS.bottle}
        focus={FOCUS.bottle.signature}
        length={length}
        direction="up"
        fromScale={2.2}
        toScale={1.5}
      />
    ),
  },
  {
    key: "cap",
    render: (_f, length) => (
      <ProductShot
        src={ASSETS.cap}
        focus={{ x: 45, y: 45 }}
        length={length}
        direction="down"
        fromScale={1.85}
        toScale={1.24}
      />
    ),
  },
];

export const ProductMontage: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
    <BeatCut items={ITEMS} beatLength={BEAT} flash={0.2} />
  </AbsoluteFill>
);
