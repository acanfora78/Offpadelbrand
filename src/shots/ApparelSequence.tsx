import React from "react";
import { AbsoluteFill } from "remotion";
import { ASSETS, BEATS, COLORS, FOCUS, SAFE_AREA, SHOTS } from "../config";
import { BeatCut, type BeatItem } from "../components/BeatCut";
import { ProductReveal } from "../components/ProductReveal";
import { WordCycle } from "../components/TextReveal";
import { CopyScrim } from "../components/CopyScrim";

const BEAT = BEATS.apparelPerItem;

/**
 * SHOT 04 — 5.20-8.50s. The line, on the beat.
 *
 * Four garments, one per beat, each uncovered by a wipe running the opposite
 * way to the one before it so the sequence alternates rather than pulses in
 * one direction. Every beat opens on a detail — the chest signature, the
 * embroidered mark — and pulls out to the garment, so the cut delivers a
 * close-up first and the product second. Copy runs one word per beat
 * underneath, locked to the same grid.
 */
const ITEMS: BeatItem[] = [
  {
    key: "tshirt-white",
    render: (_f, length) => (
      <ProductReveal
        src={ASSETS.tshirtWhite}
        focus={FOCUS.tshirtWhite.chest}
        length={length}
        direction="left"
        fromScale={1.72}
        toScale={1.12}
        panX={[1.5, -1]}
      />
    ),
  },
  {
    key: "tshirt-black",
    render: (_f, length) => (
      <ProductReveal
        src={ASSETS.tshirtBlack}
        focus={FOCUS.tshirtBlack.chest}
        length={length}
        direction="right"
        fromScale={1.66}
        toScale={1.1}
        panX={[-1.5, 1]}
      />
    ),
  },
  {
    key: "shorts-white",
    render: (_f, length) => (
      <ProductReveal
        src={ASSETS.shortsWhite}
        focus={FOCUS.shortsWhite.mark}
        length={length}
        direction="up"
        fromScale={1.9}
        toScale={1.24}
      />
    ),
  },
  {
    key: "shorts-black",
    render: (_f, length) => (
      <ProductReveal
        src={ASSETS.shortsBlack}
        focus={FOCUS.shortsBlack.mark}
        length={length}
        direction="down"
        fromScale={1.86}
        toScale={1.22}
      />
    ),
  },
];

export const ApparelSequence: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
    <BeatCut items={ITEMS} beatLength={BEAT} />
    <CopyScrim />

    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "flex-start",
        paddingLeft: SAFE_AREA.left,
        paddingBottom: SAFE_AREA.bottom,
      }}
    >
      <WordCycle
        words={["Performance.", "Design.", "Identity."]}
        beatLength={SHOTS.apparel.durationInFrames / 3}
        variant="headline"
        color={COLORS.cream}
      />
    </AbsoluteFill>
  </AbsoluteFill>
);
