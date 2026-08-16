import { continueRender, delayRender } from "remotion";

/**
 * The face itself is declared in index.css and served from public/fonts, so
 * the browser owns the loading. All this does is hold the frame until the
 * weights actually used in the spot have been rasterized — without it, early
 * frames can render in a fallback face and the typography jumps mid-shot.
 */
export const displayFontFamily = "OffPadelDisplay";

const WEIGHTS = [300, 400, 500, 600];

let started = false;

export const waitForDisplayFont = async (): Promise<void> => {
  if (started || typeof document === "undefined") return;
  started = true;

  const handle = delayRender("Loading Inter (self-hosted)", {
    timeoutInMilliseconds: 45000,
    retries: 3,
  });

  try {
    // Only the faces this spot actually sets. Awaiting document.fonts.ready
    // instead would block on every face the page knows about, which can stall
    // a frame indefinitely under parallel rendering.
    await Promise.all(
      WEIGHTS.map((w) => document.fonts.load(`${w} 64px ${displayFontFamily}`)),
    );
  } finally {
    continueRender(handle);
  }
};

void waitForDisplayFont();
