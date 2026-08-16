import "./index.css";
import { Composition } from "remotion";
import { FPS, HEIGHT, TOTAL_DURATION, WIDTH } from "./config";
import { OffPadelAd } from "./OffPadelAd";
import { PovFilm, povSchema } from "./pov/PovFilm";
import { POV_DURATION } from "./pov/config";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* The brand film — finished. */}
      <Composition
        id="OFFPADEL-AD"
        component={OffPadelAd}
        width={WIDTH}
        height={HEIGHT}
        fps={FPS}
        durationInFrames={TOTAL_DURATION}
      />

      {/*
        The POV court film. One composition, three cuts — the variant only
        changes scene 01's line, so A/B/C render from the same edit.
      */}
      {(["A", "B", "C"] as const).map((variant) => (
        <Composition
          key={variant}
          id={`OFFPADEL-POV-${variant}`}
          component={PovFilm}
          schema={povSchema}
          defaultProps={{ variant }}
          width={WIDTH}
          height={HEIGHT}
          fps={FPS}
          durationInFrames={POV_DURATION}
        />
      ))}
    </>
  );
};
