import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ASSETS, COLORS, EASE, FOCUS } from "../config";
import { CinematicZoom } from "../components/CinematicZoom";
import { LightRevealMask } from "../components/LightSweep";
import { ramp } from "../components/motion";

/**
 * SHOT 09 — 20.00-21.50s. The loop.
 *
 * A hard cut back to black, then the same blade of light crossing the same
 * carbon surface as the opening frame — the camera arriving at exactly the
 * scale and position the hook starts from, so the last frame and the first
 * frame are the same frame. On a platform that replays automatically, the
 * spot closes the circle instead of ending, and the second viewing starts
 * before the viewer has decided to leave.
 */
export const LoopEnding: React.FC = () => {
  const frame = useCurrentFrame();

  // Meets IntroHook's opening state precisely: scale 5.2, pan +3.
  const charge = ramp({
    frame,
    from: 1.05,
    to: 0.55,
    delay: 18,
    duration: 20,
    easing: EASE.travel,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <LightRevealMask delay={2} duration={38} angle={104} band={30} from={-30} to={128}>
        <AbsoluteFill style={{ filter: `brightness(${charge})` }}>
          <CinematicZoom
            src={ASSETS.obsidian}
            focus={FOCUS.obsidian.weave}
            from={4.4}
            to={5.2}
            delay={2}
            duration={38}
            panX={[-2, 3]}
            easing={EASE.travel}
            blurGain={20}
          />
        </AbsoluteFill>
      </LightRevealMask>

      <AbsoluteFill style={{ mixBlendMode: "screen", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: `${ramp({ frame, from: -20, to: 118, delay: 2, duration: 38, easing: EASE.travel })}%`,
            width: "2.4%",
            height: "140%",
            transform: "rotate(14deg)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(214,220,228,0.85) 35%, rgba(255,255,255,0.98) 50%, rgba(214,220,228,0.85) 65%, rgba(255,255,255,0) 100%)",
            filter: "blur(3px)",
            opacity: 0.85 * ramp({ frame, from: 1, to: 0, delay: 30, duration: 10 }),
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
