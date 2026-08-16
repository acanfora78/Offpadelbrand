import React from "react";
import { AbsoluteFill } from "remotion";
import { POV_SCENES } from "../config";
import { FootagePlate } from "../components";

/**
 * SCENE 08 — 23.0-24.0s. The loop join.
 *
 * One second, and the most technically demanding shot in the film: the racket's
 * rise on the serve toss has to rhyme with its position in the very first frame
 * of scene 01, so the restart is invisible. That match has to happen on set —
 * frame the toss from the same side, at the same height, with the racket
 * entering on the same diagonal. It cannot be rescued in the edit.
 */
export const LoopEnding: React.FC = () => (
  <AbsoluteFill>
    <FootagePlate
      spec={{
        scene: "SC 08",
        title: "He resets, tosses — cut on the toss",
        camera:
          "Behind him, low. Cut on the toss, never on the strike — the unresolved motion is what pulls the replay.",
        action:
          "The racket's rise must match its position in frame 1 of SC 01: same side, same height, same diagonal.",
        audio: "Everything drops to court ambience so the loop restarts clean.",
        from: POV_SCENES.loopEnding.from,
        duration: POV_SCENES.loopEnding.durationInFrames,
      }}
    />
  </AbsoluteFill>
);
