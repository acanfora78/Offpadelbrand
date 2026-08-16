import React from "react";
import { Img } from "remotion";

/**
 * Product photography ships on a near-black studio backdrop. Rather than
 * attempting any cutout/segmentation of the source photo (which would risk
 * altering the product itself), we present it as-is and feather the card's
 * own edges with a radial mask so the black backdrop dissolves into
 * whatever sits behind it — a soft-box plinth effect used throughout
 * premium catalog photography.
 */
export const VignetteCard: React.FC<{
  src: string;
  width: number;
  height: number;
  feather?: number; // 0-1, where the fade starts
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}> = ({ src, width, height, feather = 0.55, style, imgStyle }) => {
  const maskImage = `radial-gradient(ellipse 62% 62% at 50% 50%, black ${
    feather * 100
  }%, transparent 100%)`;
  return (
    <div
      style={{
        width,
        height,
        WebkitMaskImage: maskImage,
        maskImage,
        ...style,
      }}
    >
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          ...imgStyle,
        }}
      />
    </div>
  );
};
