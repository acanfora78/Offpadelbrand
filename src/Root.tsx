import "./index.css";
import { AbsoluteFill, Audio, Composition, Sequence, staticFile } from "remotion";
import { COLORS, HEIGHT, SCENES, TOTAL_DURATION, WIDTH, FPS } from "./theme";
import { HeroIntro } from "./scenes/HeroIntro";
import { RacketReveal } from "./scenes/RacketReveal";
import { ApparelSequence } from "./scenes/ApparelSequence";
import { AccessoriesSequence } from "./scenes/AccessoriesSequence";
import { HeroComposition } from "./scenes/HeroComposition";
import { FinalCta } from "./scenes/FinalCta";
import { FilmGrain } from "./components/FilmGrain";

const OffpadelAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <Sequence from={SCENES.heroIntro.start} durationInFrames={SCENES.heroIntro.duration}>
        <HeroIntro />
      </Sequence>
      <Sequence from={SCENES.racketReveal.start} durationInFrames={SCENES.racketReveal.duration}>
        <RacketReveal />
      </Sequence>
      <Sequence from={SCENES.apparel.start} durationInFrames={SCENES.apparel.duration}>
        <ApparelSequence />
      </Sequence>
      <Sequence from={SCENES.accessories.start} durationInFrames={SCENES.accessories.duration}>
        <AccessoriesSequence />
      </Sequence>
      <Sequence from={SCENES.heroComposition.start} durationInFrames={SCENES.heroComposition.duration}>
        <HeroComposition />
      </Sequence>
      <Sequence from={SCENES.finalCta.start} durationInFrames={SCENES.finalCta.duration}>
        <FinalCta />
      </Sequence>

      {/* Global cinematic finish, applied once above every scene */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.38) 100%)",
        }}
      />
      <FilmGrain />

      <Audio src={staticFile("assets/audio/soundtrack.wav")} />
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="OFFPADEL-AD"
      component={OffpadelAd}
      width={WIDTH}
      height={HEIGHT}
      fps={FPS}
      durationInFrames={TOTAL_DURATION}
    />
  );
};
