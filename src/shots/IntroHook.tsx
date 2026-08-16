import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ASSETS, COLORS, EASE, FOCUS } from "../config";
import { CinematicZoom } from "../components/CinematicZoom";
import { LightRevealMask } from "../components/LightSweep";
import { ramp } from "../components/motion";

/**
 * SHOT 01 — 0.00-0.80s. The stop-the-scroll frame.
 *
 * Black. A single blade of light crawls across the frame and, only where it
 * falls, a sliver of the Obsidian's carbon weave is briefly lit — close
 * enough that it reads as texture, not as a racket. Nothing is named, nothing
 * is centred, and the product is deliberately withheld: the viewer should be
 * asking what they are looking at when the drop lands.
 */
export const IntroHook: React.FC = () => {
  const frame = useCurrentFrame();

  // Anticipation: the surface brightens fractionally just before the drop.
  const charge = ramp({
    frame,
    from: 0.55,
    to: 1.15,
    delay: 12,
    duration: 12,
    easing: EASE.beat,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <LightRevealMask duration={26} angle={104} band={30} from={-30} to={128}>
        <AbsoluteFill style={{ filter: `brightness(${charge})` }}>
          <CinematicZoom
            src={ASSETS.obsidian}
            focus={FOCUS.obsidian.weave}
            from={5.2}
            to={4.1}
            duration={26}
            panX={[3, -2]}
            easing={EASE.travel}
            blurGain={22}
          />
        </AbsoluteFill>
      </LightRevealMask>

      {/* The specular edge of the blade itself. */}
      <AbsoluteFill style={{ mixBlendMode: "screen", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: `${ramp({ frame, from: -20, to: 118, duration: 26, easing: EASE.travel })}%`,
            width: "2.4%",
            height: "140%",
            transform: "rotate(14deg)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(214,220,228,0.85) 35%, rgba(255,255,255,0.98) 50%, rgba(214,220,228,0.85) 65%, rgba(255,255,255,0) 100%)",
            filter: "blur(3px)",
            opacity: 0.9,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
