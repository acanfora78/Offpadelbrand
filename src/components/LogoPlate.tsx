import React from "react";
import { Img, useCurrentFrame } from "remotion";
import { ASSETS, COLORS, EASE, LOGO_CROP } from "../config";
import { ramp } from "./motion";
import { LightSweep } from "./LightSweep";

/**
 * The official OFF Padel signature.
 *
 * The artwork is engraved metal on a cream field, and it is used exactly as
 * delivered — never recoloured, re-cut, re-typed or substituted. The only
 * treatment applied is a crop of the empty cream margin around the mark
 * (see LOGO_CROP), so it can be placed as a tight plate; the plate is filled
 * with the artwork's own backdrop colour so its edge is seamless wherever a
 * cream field sits behind it.
 */
export const LogoPlate: React.FC<{
  width: number;
  delay?: number;
  duration?: number;
  sweep?: boolean;
  sweepDelay?: number;
  /**
   * Softens the plate's outer edge. The artwork's cream ground carries a faint
   * radial falloff of its own, so against a flat cream field the plate would
   * otherwise show as a slightly brighter rectangle. Feathering dissolves that
   * boundary. Left off where the plate sits on black and its edge is meant to
   * read as a deliberate printed border.
   */
  feather?: number;
  style?: React.CSSProperties;
}> = ({
  width,
  delay = 0,
  duration = 26,
  sweep = true,
  sweepDelay,
  feather = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const height = width / LOGO_CROP.aspect;

  const reveal = ramp({
    frame,
    from: 0,
    to: 1,
    delay,
    duration,
    easing: EASE.camera,
  });

  // The artwork is scaled so the cropped window exactly fills the plate.
  const imgWidth = width / LOGO_CROP.width;
  const imgHeight = imgWidth * (887 / 1774);

  const featherMask = feather
    ? `linear-gradient(to right, transparent 0%, black ${feather}%, black ${100 - feather}%, transparent 100%),
       linear-gradient(to bottom, transparent 0%, black ${feather * 1.6}%, black ${100 - feather * 1.6}%, transparent 100%)`
    : undefined;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
        backgroundColor: COLORS.logoPlate,
        opacity: reveal,
        WebkitMaskImage: featherMask,
        maskImage: featherMask,
        WebkitMaskComposite: feather ? "source-in" : undefined,
        maskComposite: feather ? "intersect" : undefined,
        ...style,
      }}
    >
      <Img
        src={ASSETS.logo}
        style={{
          position: "absolute",
          width: imgWidth,
          height: imgHeight,
          left: -LOGO_CROP.left * imgWidth,
          top: -LOGO_CROP.top * imgHeight,
          maxWidth: "none",
        }}
      />
      {sweep ? (
        <LightSweep
          delay={sweepDelay ?? delay + 4}
          duration={34}
          intensity={0.5}
          width={26}
          angle={12}
          specular
        />
      ) : null}
    </div>
  );
};
