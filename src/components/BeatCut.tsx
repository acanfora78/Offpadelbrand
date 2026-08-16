import React from "react";
import { useCurrentFrame } from "remotion";

export type BeatItem = {
  key: string;
  render: (localFrame: number, length: number) => React.ReactNode;
};

/**
 * Hard-cuts through a list of shots on a fixed beat.
 *
 * Cuts are cuts — no crossfade — because a montage that dissolves reads as a
 * slideshow, while a cut on the beat reads as an edit. Each item receives its
 * own local frame so it can run a self-contained camera move that starts
 * exactly on its cut. A one-frame light bloom is laid over each transition to
 * bridge the change without softening it.
 */
export const BeatCut: React.FC<{
  items: BeatItem[];
  beatLength: number;
  flash?: number;
}> = ({ items, beatLength, flash = 0.18 }) => {
  const frame = useCurrentFrame();
  const index = Math.min(items.length - 1, Math.floor(frame / beatLength));
  const localFrame = frame - index * beatLength;
  const item = items[index];

  // Bloom only on the first frame of each beat, and never on the very first
  // frame of the sequence, where there is nothing to bridge from.
  const showFlash = index > 0 && localFrame < 1.5 && flash > 0;

  return (
    <>
      {item.render(localFrame, beatLength)}
      {showFlash ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#FFFFFF",
            opacity: flash * (1 - localFrame / 1.5),
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      ) : null}
    </>
  );
};
