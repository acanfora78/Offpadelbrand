import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { z } from "zod";
import { COLORS } from "../config";
import { Grade, Captions, TextOverlay } from "./components";
import { dialogueFor, HOOK_VARIANTS, POV_SCENES, type VariantId } from "./config";
import {
  OpeningHook,
  MatchSequence,
  SlowMotionImpact,
  DialoguePayoff,
} from "./scenes/ToShoot";
import { RacketReveal } from "./scenes/RacketReveal";
import { ProductMontage } from "./scenes/ProductMontage";
import { FinalBrand } from "./scenes/FinalBrand";
import { LoopEnding } from "./scenes/LoopEnding";

export const povSchema = z.object({
  variant: z.enum(["A", "B", "C"]),
});

/**
 * The POV court film, currently an offline cut.
 *
 * Scenes 06 and 07 and the carbon insert in scene 02 are finished picture,
 * built from the real assets. The remaining five scenes hold their slots with
 * production slates until the shoot happens — the timings, captions and audio
 * are already cut around their exact durations, so dropping the clips in does
 * not move the edit.
 *
 * Captions sit above every scene rather than inside them: they are the film's
 * spine, they need to survive the cuts, and on a muted first watch they are
 * the only thing carrying the story.
 */
export const PovFilm: React.FC<z.infer<typeof povSchema>> = ({ variant }) => {
  const v = (variant ?? "A") as VariantId;
  const lines = dialogueFor(v);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <Sequence {...POV_SCENES.openingHook}>
        <OpeningHook />
      </Sequence>
      <Sequence {...POV_SCENES.dialogueScene}>
        <RacketReveal />
      </Sequence>
      <Sequence {...POV_SCENES.matchSequence}>
        <MatchSequence />
      </Sequence>
      <Sequence {...POV_SCENES.slowMotionImpact}>
        <SlowMotionImpact />
      </Sequence>
      <Sequence {...POV_SCENES.dialoguePayoff}>
        <DialoguePayoff />
      </Sequence>
      <Sequence {...POV_SCENES.productMontage}>
        <ProductMontage />
      </Sequence>
      <Sequence {...POV_SCENES.finalBrand}>
        <FinalBrand />
      </Sequence>
      <Sequence {...POV_SCENES.loopEnding}>
        <LoopEnding />
      </Sequence>

      {/* The POV premise, set once and then out of the way. */}
      <TextOverlay text={HOOK_VARIANTS[v].overlay} at={8} hold={54} />

      <Captions lines={lines} />

      <Grade vignette={0.22} grain={0.2} />

      <Audio src={staticFile("assets/audio/pov-soundtrack.wav")} />
    </AbsoluteFill>
  );
};
