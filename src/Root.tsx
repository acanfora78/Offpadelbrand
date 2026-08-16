import "./index.css";
import { Composition } from "remotion";
import { FPS, HEIGHT, TOTAL_DURATION, WIDTH } from "./config";
import { OffPadelAd } from "./OffPadelAd";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="OFFPADEL-AD"
      component={OffPadelAd}
      width={WIDTH}
      height={HEIGHT}
      fps={FPS}
      durationInFrames={TOTAL_DURATION}
    />
  );
};
