/**
 * The POV film's component library (brief §18).
 *
 * Several of these already existed for the brand film and are re-exported here
 * under the names the brief asks for rather than duplicated — one
 * implementation, two films, so a fix to the camera maths benefits both.
 */

// Purpose-built for this film.
export { CameraMove } from "./CameraMove";
export { WhipTransition } from "./WhipTransition";
export { SlowMotion, videoPlaybackRate } from "./SlowMotion";
export { ProductShot } from "./ProductShot";
export { FootagePlate, type PlateSpec } from "./FootagePlate";
export { Captions, TextOverlay } from "./Caption";

// Shared with the brand film.
export { CinematicZoom as ZoomIn } from "../../components/CinematicZoom";
export { ImageParallax as Parallax } from "../../components/ImageParallax";
export { DirectionalBlur as MotionBlur } from "../../components/DirectionalBlur";
export { LightSweep } from "../../components/LightSweep";
export { BeatCut, type BeatItem } from "../../components/BeatCut";
export { MaskedReveal } from "../../components/MaskedReveal";
export { Grade } from "../../components/Grade";
export { CopyScrim } from "../../components/CopyScrim";
