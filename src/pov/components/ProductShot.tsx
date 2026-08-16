import React from "react";
import { AbsoluteFill } from "remotion";
import type { Focus } from "../../config";
import { EASE } from "../../config";
import { CinematicZoom } from "../../components/CinematicZoom";
import { LightSweep } from "../../components/LightSweep";
import { MaskedReveal, type RevealDirection } from "../../components/MaskedReveal";

/**
 * One product beat in the closing montage.
 *
 * Unlike the brand film's version, these beats are meant to feel like they were
 * grabbed rather than composed — the push starts tighter, resolves faster, and
 * carries a slight lateral drift, so a still reads as a handheld insert cut
 * into the rally rather than a catalogue plate. The photograph itself is only
 * ever cropped and uniformly scaled.
 */
export const ProductShot: React.FC<{
  src: string;
  focus: Focus;
  length: number;
  direction?: RevealDirection;
  fromScale?: number;
  toScale?: number;
  drift?: number;
}> = ({
  src,
  focus,
  length,
  direction = "left",
  fromScale = 1.55,
  toScale = 1.14,
  drift = 1.2,
}) => (
  <AbsoluteFill>
    <MaskedReveal direction={direction} duration={5} slide={10} easing={EASE.beat}>
      <CinematicZoom
        src={src}
        focus={focus}
        from={fromScale}
        to={toScale}
        duration={length}
        panX={[drift, -drift]}
        easing={EASE.camera}
        blurGain={24}
      />
    </MaskedReveal>
    <LightSweep
      delay={2}
      duration={Math.max(12, length - 4)}
      intensity={0.26}
      width={32}
      angle={13}
    />
  </AbsoluteFill>
);
