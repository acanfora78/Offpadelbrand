import { staticFile } from "remotion";

/**
 * Every image below is real OFF Padel product photography shipped with the
 * project. Nothing here is generated, redrawn or recoloured — the shots only
 * ever crop, scale, mask and light these files.
 */
export const ASSETS = {
  logo: staticFile("assets/logo/off-padel-logo-metallic-cream.png"),
  obsidian: staticFile("assets/products/rackets/obsidian.png"),
  pearl: staticFile("assets/products/rackets/pearl.png"),
  tshirtWhite: staticFile("assets/products/apparel/tshirt-white.png"),
  tshirtBlack: staticFile("assets/products/apparel/tshirt-black.png"),
  shortsWhite: staticFile("assets/products/apparel/shorts-white.png"),
  shortsBlack: staticFile("assets/products/apparel/shorts-black.png"),
  overgrip: staticFile("assets/products/accessories/overgrip.png"),
  bottle: staticFile("assets/products/accessories/bottle.png"),
  towel: staticFile("assets/products/accessories/towel-white.png"),
  socks: staticFile("assets/products/accessories/socks.png"),
  bag: staticFile("assets/products/accessories/bag.png"),
  cap: staticFile("assets/products/accessories/cap.png"),
} as const;

/** Native pixel dimensions, so crops can be reasoned about in real space. */
export const ASSET_SIZE = {
  logo: { w: 1774, h: 887 },
  obsidian: { w: 1024, h: 1536 },
  pearl: { w: 1024, h: 1536 },
  tshirtWhite: { w: 1086, h: 1448 },
  tshirtBlack: { w: 1086, h: 1448 },
  shortsWhite: { w: 1254, h: 1254 },
  shortsBlack: { w: 1254, h: 1254 },
  overgrip: { w: 1402, h: 1122 },
  bottle: { w: 1024, h: 1536 },
  towel: { w: 1024, h: 1536 },
  socks: { w: 1254, h: 1254 },
  bag: { w: 1536, h: 1024 },
} as const;

export type Focus = { x: number; y: number };

/**
 * Focal points as percentages of each image, measured from the actual pixel
 * content. These drive every zoom's transform-origin, so a macro push always
 * converges on a real detail (the weave, the Ø, the stitched signature)
 * rather than drifting to an arbitrary point.
 */
export const FOCUS = {
  obsidian: {
    weave: { x: 27, y: 20 },
    symbol: { x: 50, y: 30 },
    signature: { x: 50, y: 49 },
    throat: { x: 50, y: 65 },
    full: { x: 49, y: 51 },
  },
  pearl: {
    weave: { x: 30, y: 22 },
    symbol: { x: 50, y: 32 },
    signature: { x: 47, y: 50 },
    full: { x: 51, y: 52 },
  },
  tshirtWhite: { chest: { x: 57, y: 31 }, full: { x: 52, y: 51 } },
  tshirtBlack: { chest: { x: 62, y: 29 }, full: { x: 52, y: 50 } },
  shortsWhite: { mark: { x: 78, y: 76 }, full: { x: 50, y: 50 } },
  shortsBlack: { mark: { x: 76, y: 75 }, full: { x: 50, y: 50 } },
  overgrip: { box: { x: 30, y: 45 }, roll: { x: 63, y: 58 }, full: { x: 50, y: 54 } },
  bottle: { signature: { x: 50, y: 52 }, cap: { x: 50, y: 18 }, full: { x: 50, y: 53 } },
  towel: { signature: { x: 48, y: 60 }, full: { x: 50, y: 50 } },
  socks: { mark: { x: 37, y: 26 }, full: { x: 49, y: 51 } },
  bag: { signature: { x: 60, y: 50 }, zip: { x: 58, y: 28 }, full: { x: 50, y: 48 } },
} as const;

/**
 * The signature artwork sits on a large empty cream field. These numbers
 * crop away that surrounding margin — the mark itself is untouched — so the
 * logo can be placed as a tight, deliberate plate.
 */
export const LOGO_CROP = {
  left: 0.1,
  top: 0.17,
  width: 0.82,
  height: 0.63,
  /** Aspect ratio of the cropped plate. */
  aspect: (0.82 * 1774) / (0.63 * 887),
};
