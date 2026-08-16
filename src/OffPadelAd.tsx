import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { COLORS, HOOK_TITLE, SAFE_AREA, SHOTS } from "./config";
import { Grade } from "./components/Grade";
import { TextReveal } from "./components/TextReveal";
import { IntroHook } from "./shots/IntroHook";
import { RacketObsidian } from "./shots/RacketObsidian";
import { RacketPearl } from "./shots/RacketPearl";
import { ApparelSequence } from "./shots/ApparelSequence";
import { AccessoriesSequence } from "./shots/AccessoriesSequence";
import { PatternInterrupt } from "./shots/PatternInterrupt";
import { HeroComposition } from "./shots/HeroComposition";
import { FinalCta } from "./shots/FinalCta";
import { LoopEnding } from "./shots/LoopEnding";

/**
 * The cut. Nine shots, 21.5s, built to be watched twice.
 *
 * Shot boundaries and lengths all come from config/timings.ts, so the edit
 * can be re-timed from one table. The opening title is mounted here rather
 * than inside the hook because it deliberately straddles the 0.8s cut —
 * it needs to survive the drop to stay readable.
 */
export const OffPadelAd: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
    <Sequence {...SHOTS.introHook}>
      <IntroHook />
    </Sequence>
    <Sequence {...SHOTS.racketObsidian}>
      <RacketObsidian />
    </Sequence>
    <Sequence {...SHOTS.racketPearl}>
      <RacketPearl />
    </Sequence>
    <Sequence {...SHOTS.apparel}>
      <ApparelSequence />
    </Sequence>
    <Sequence {...SHOTS.accessories}>
      <AccessoriesSequence />
    </Sequence>
    <Sequence {...SHOTS.patternInterrupt}>
      <PatternInterrupt />
    </Sequence>
    <Sequence {...SHOTS.heroComposition}>
      <HeroComposition />
    </Sequence>
    <Sequence {...SHOTS.finalCta}>
      <FinalCta />
    </Sequence>
    <Sequence {...SHOTS.loopEnding}>
      <LoopEnding />
    </Sequence>

    {/* Hook title — spans the opening cut into the drop. */}
    <Sequence {...HOOK_TITLE}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          paddingLeft: SAFE_AREA.left,
          paddingRight: SAFE_AREA.right,
        }}
      >
        <TextReveal
          lines={["You've never seen", "padel like this."]}
          variant="headline"
          delay={0}
          duration={7}
          stagger={3}
          color={COLORS.cream}
          exitAt={26}
        />
      </AbsoluteFill>
    </Sequence>

    <Grade />

    <Audio src={staticFile("assets/audio/soundtrack.wav")} />
  </AbsoluteFill>
);
