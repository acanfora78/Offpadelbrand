import { continueRender, delayRender, staticFile } from "remotion";

export const displayFontFamily = "OffPadelDisplay";

let loaded = false;

export const waitForDisplayFont = async (): Promise<void> => {
  if (loaded) return;
  loaded = true;

  const handle = delayRender("Loading Inter (self-hosted variable font)", {
    timeoutInMilliseconds: 60000,
    retries: 4,
  });

  const font = new FontFace(
    displayFontFamily,
    `url('${staticFile("fonts/Inter-Variable.woff2")}') format('woff2')`,
    { weight: "100 900" },
  );

  await font.load();
  document.fonts.add(font);

  continueRender(handle);
};

// Kick off loading as soon as this module is imported.
void waitForDisplayFont();
