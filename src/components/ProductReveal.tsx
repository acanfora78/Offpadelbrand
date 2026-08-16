import React from "react";
import { AbsoluteFill } from "remotion";
import type { Focus } from "../config";
import { EASE } from "../config";
import { CinematicZoom } from "./CinematicZoom";
import { LightSweep } from "./LightSweep";
import { MaskedReveal, type RevealDirection } from "./MaskedReveal";

/**
 * One montage beat: a garment or accessory uncovered by a wipe, under its own
 * camera push, finished with a specular sweep. Composed from the primitives so
 * every beat in the edit shares the same physics and the sequence reads as one
 * continuous piece of photography rather than a set of separate clips.
 */
export const ProductReveal: React.FC<{
  src: string;
  focus: Focus;
  length: number;
  direction?: RevealDirection;
  fromScale?: number;
  toScale?: number;
  panX?: [number, number];
  sweep?: boolean;
  sweepDelay?: number;
}> = ({
  src,
  focus,
  length,
  direction = "left",
  fromScale = 1.3,
  toScale = 1.06,
  panX,
  sweep = true,
  sweepDelay = 3,
}) => (
  <AbsoluteFill>
    <MaskedReveal direction={direction} duration={7} slide={12} easing={EASE.beat}>
      <CinematicZoom
        src={src}
        focus={focus}
        from={fromScale}
        to={toScale}
        duration={length}
        panX={panX}
        easing={EASE.camera}
        blurGain={28}
      />
    </MaskedReveal>
    {sweep ? (
      <LightSweep
        delay={sweepDelay}
        duration={Math.max(14, length - sweepDelay - 2)}
        intensity={0.3}
        width={30}
        angle={14}
      />
    ) : null}
  </AbsoluteFill>
);
