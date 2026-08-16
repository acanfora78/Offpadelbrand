export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

const sec = (s: number) => Math.round(s * FPS);

/**
 * The full 21.5s cut, expressed in seconds and converted once. Every shot
 * reads its own length from here, so re-timing the edit means editing this
 * table and nothing else.
 */
const CUTS = {
  introHook: [0.0, 0.8],
  racketObsidian: [0.8, 3.0],
  racketPearl: [3.0, 5.2],
  apparel: [5.2, 8.5],
  accessories: [8.5, 11.5],
  patternInterrupt: [11.5, 13.5],
  heroComposition: [13.5, 17.0],
  finalCta: [17.0, 20.0],
  loopEnding: [20.0, 21.5],
} as const;

export type ShotName = keyof typeof CUTS;

export const SHOTS = Object.fromEntries(
  Object.entries(CUTS).map(([name, [from, to]]) => [
    name,
    { from: sec(from), durationInFrames: sec(to) - sec(from) },
  ]),
) as Record<ShotName, { from: number; durationInFrames: number }>;

export const TOTAL_DURATION =
  SHOTS.loopEnding.from + SHOTS.loopEnding.durationInFrames;

/** Beat grid used by the fast montage sections and the audio generator. */
export const BEATS = {
  /** Shot 04 — four garments across 3.3s. */
  apparelPerItem: SHOTS.apparel.durationInFrames / 4,
  /** Shot 05 — five accessories across 3.0s, deliberately quicker. */
  accessoriesPerItem: SHOTS.accessories.durationInFrames / 5,
};

/** Title overlay that deliberately spans the 0.8s hook cut into the drop. */
export const HOOK_TITLE = { from: sec(0.27), durationInFrames: sec(1.13) };
