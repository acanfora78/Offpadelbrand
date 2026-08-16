import React from "react";
import { AbsoluteFill } from "remotion";
import { ASSETS, BEATS, COLORS, FOCUS } from "../config";
import { BeatCut, type BeatItem } from "../components/BeatCut";
import { ProductReveal } from "../components/ProductReveal";
import { CopyScrim } from "../components/CopyScrim";

const BEAT = BEATS.accessoriesPerItem;

/**
 * SHOT 05 — 8.50-11.50s. Escalation.
 *
 * Five accessories at 0.6s each — noticeably quicker than the apparel block,
 * so the edit accelerates into the pattern interrupt rather than holding a
 * steady pulse. Every beat is a hard macro: the grip's perforations, the
 * bottle's engraved signature, the towel's pile, the sock's embroidery, the
 * bag's carbon panel. No copy competes with the texture; the point of the
 * block is that the brand is an entire world, not one racket.
 */
const ITEMS: BeatItem[] = [
  {
    key: "overgrip",
    render: (_f, length) => (
      <ProductReveal
        src={ASSETS.overgrip}
        focus={FOCUS.overgrip.roll}
        length={length}
        direction="left"
        fromScale={2.1}
        toScale={1.42}
        sweepDelay={2}
      />
    ),
  },
  {
    key: "bottle",
    render: (_f, length) => (
      <ProductReveal
        src={ASSETS.bottle}
        focus={FOCUS.bottle.signature}
        length={length}
        direction="up"
        fromScale={2.4}
        toScale={1.6}
        sweepDelay={2}
      />
    ),
  },
  {
    key: "towel",
    render: (_f, length) => (
      <ProductReveal
        src={ASSETS.towel}
        focus={FOCUS.towel.signature}
        length={length}
        direction="right"
        fromScale={2.0}
        toScale={1.34}
        sweepDelay={2}
      />
    ),
  },
  {
    key: "socks",
    render: (_f, length) => (
      <ProductReveal
        src={ASSETS.socks}
        focus={FOCUS.socks.mark}
        length={length}
        direction="down"
        fromScale={2.2}
        toScale={1.46}
        sweepDelay={2}
      />
    ),
  },
  {
    key: "bag",
    render: (_f, length) => (
      <ProductReveal
        src={ASSETS.bag}
        focus={FOCUS.bag.signature}
        length={length}
        direction="left"
        fromScale={1.9}
        toScale={1.28}
        panX={[1.2, -1.2]}
        sweepDelay={2}
      />
    ),
  },
];

/**
 * Deliberately carries no copy. This is the only block in the cut driven
 * purely by texture and rhythm, and a label competing with five 0.6s macros
 * would only slow the eye down — the products and the impacts say it.
 */
export const AccessoriesSequence: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
    <BeatCut items={ITEMS} beatLength={BEAT} flash={0.22} />
    <CopyScrim height={30} strength={0.5} />
  </AbsoluteFill>
);
