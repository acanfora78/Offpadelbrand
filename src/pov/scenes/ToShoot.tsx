import React from "react";
import { POV_SCENES } from "../config";
import { FootagePlate, type PlateSpec } from "../components";

/**
 * The five scenes that need a court, two performers and a half-day.
 *
 * Each is a real scene component with its own slot in the edit — they are not
 * stubs. When the clips arrive, swap the `FootagePlate` for an
 * `OffthreadVideo` inside the same component and nothing else in the cut has
 * to move: the timings, captions and audio are already built around these
 * durations.
 */

const plate = (
  scene: string,
  key: keyof typeof POV_SCENES,
  spec: Omit<PlateSpec, "scene" | "from" | "duration">,
): PlateSpec => ({
  scene,
  from: POV_SCENES[key].from,
  duration: POV_SCENES[key].durationInFrames,
  ...spec,
});

export const OpeningHook: React.FC = () => (
  <FootagePlate
    spec={plate("SC 01", "openingHook", {
      title: "He walks on, racket at his hip",
      camera:
        "Handheld, 35mm, chest height, following through the court door. Let the pan lag — a friend filming, not an operator.",
      action:
        "Protagonist enters with the Obsidian low by his side. The friend, off court, clocks it and speaks.",
      audio: "Location only. Footsteps, distant strikes, fence rattle. No music.",
    })}
  />
);

export const DialogueScene: React.FC = () => (
  <FootagePlate
    spec={plate("SC 02", "dialogueScene", {
      title: "“OFF Padel.” / “Mai sentita.” / “Appunto.”",
      camera:
        "Two-shot, loose. Cut to the macro insert on the carbon between lines, then back.",
      action:
        "He holds the racket up for a second, no longer. Beat of silence before “Appunto” — the pause is the line.",
      audio: "Ambience ducks under the dialogue. First sub-bass note on “Appunto”.",
    })}
  />
);

export const MatchSequence: React.FC = () => (
  <FootagePlate
    spec={plate("SC 03", "matchSequence", {
      title: "The rally — six to eight inserts",
      camera:
        "0.4–0.7s each, cut on the beat: shoes pivoting, grip tightening, overgrip, ball leaving the hand, shirt moving with the shoulder, low tracking on the stance.",
      action:
        "Product is worn, never presented. If a shot looks like catalogue, it is the wrong shot.",
      audio: "Music enters and builds. Court sound stays underneath.",
    })}
  />
);

export const SlowMotionImpact: React.FC = () => (
  <FootagePlate
    spec={plate("SC 04", "slowMotionImpact", {
      title: "The strike",
      camera:
        "120fps minimum. Two angles — low front, and over-the-shoulder from behind the glass. The Obsidian face must be legible at contact.",
      action:
        "Ramp into slow motion on the backswing, hold through contact, ramp out as the ball leaves frame.",
      audio:
        "Full mute two frames before contact, impact at full level, then bass and ambience rush back. This is the pattern interrupt.",
    })}
  />
);

export const DialoguePayoff: React.FC = () => (
  <FootagePlate
    spec={plate("SC 05", "dialoguePayoff", {
      title: "“Ok… dove l'hai presa?”",
      camera:
        "Loose handheld two-shot, then push to the protagonist as he turns to lens. Hold the look one beat longer than comfortable.",
      action:
        "Half-smile, then the answer. Breaking the fourth wall here is what keeps it native rather than scripted.",
      audio: "Music drops back to let the line land.",
    })}
  />
);
