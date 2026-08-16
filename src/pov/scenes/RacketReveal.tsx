import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ASSETS, COLORS, EASE, FOCUS } from "../../config";
import { POV_SCENES } from "../config";
import { CameraMove, ZoomIn, LightSweep, WhipTransition } from "../components";
import { DialogueScene } from "./ToShoot";

const LENGTH = POV_SCENES.dialogueScene.durationInFrames;

/**
 * SCENE 02 — 2.0-5.0s. Partially real.
 *
 * The two-shot needs performers, but the insert the scene turns on — the macro
 * across the carbon to the engraved signature — is exactly what the studio
 * photograph already holds, so it is built here for real rather than slated.
 *
 * The insert is handled with a simulated handheld move rather than a locked
 * push: cutting a perfectly stable frame into handheld coverage is the single
 * clearest tell that an insert was added in post, and this one has to sit
 * inside a scene shot from the hip.
 */
const CarbonInsert: React.FC<{ length: number }> = ({ length }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
    <CameraMove intensity={0.55}>
      <ZoomIn
        src={ASSETS.obsidian}
        focus={FOCUS.obsidian.signature}
        from={3.1}
        to={1.9}
        duration={length}
        panX={[1.4, -1.2]}
        easing={EASE.camera}
        blurGain={26}
      />
    </CameraMove>
    <LightSweep delay={3} duration={26} intensity={0.42} width={30} angle={15} specular />
  </AbsoluteFill>
);

export const RacketReveal: React.FC = () => {
  const frame = useCurrentFrame();

  // He lifts it on "OFF Padel", we stay on the carbon while the friend answers,
  // and we are back on his face for "Appunto".
  const IN_AT = 20;
  const OUT_AT = 62;

  if (frame < IN_AT + 5) {
    return (
      <WhipTransition
        at={IN_AT}
        length={9}
        direction="left"
        out={<DialogueScene />}
        incoming={<CarbonInsert length={LENGTH} />}
      />
    );
  }

  if (frame < OUT_AT + 5) {
    return (
      <WhipTransition
        at={OUT_AT}
        length={9}
        direction="right"
        out={<CarbonInsert length={LENGTH} />}
        incoming={<DialogueScene />}
      />
    );
  }

  return <DialogueScene />;
};
