# OFF PADEL — Ad Spot

A 21.5s vertical brand film for OFF Padel, built entirely in
[Remotion](https://remotion.dev). Output is 1080×1920, 9:16, 30fps, H.264 —
cut for TikTok, Reels and Meta Ads, and designed to loop.

## Running it

```bash
npm i
npm run dev      # Remotion Studio
npm run render   # out/offpadel-ad.mp4
npm run audio    # regenerate the soundtrack
npm run lint     # eslint + tsc
```

## The cut

Nine shots, timed to a beat map shared by picture and sound.

| # | Shot | In–Out | Beat |
|---|------|--------|------|
| 01 | `IntroHook` | 0.0–0.8 | rumble |
| 02 | `RacketObsidian` | 0.8–3.0 | **drop** |
| 03 | `RacketPearl` | 3.0–5.2 | metallic hit |
| 04 | `ApparelSequence` | 5.2–8.5 | whoosh + 4 beats |
| 05 | `AccessoriesSequence` | 8.5–11.5 | 5 faster beats |
| 06 | `PatternInterrupt` | 11.5–13.5 | **cut to silence** |
| 07 | `HeroComposition` | 13.5–17.0 | **second drop** |
| 08 | `FinalCta` | 17.0–20.0 | bass rise |
| 09 | `LoopEnding` | 20.0–21.5 | final impact |

Shot 09 returns the camera to the exact scale and position shot 01 opens on,
so the last frame and the first frame match (measured seam: 0.13/255) and the
replay is invisible.

## Editing it

Everything tunable lives in `src/config/`:

- `timings.ts` — the cut sheet. Re-time the edit here and every shot, the
  montage grids and the audio generator follow.
- `colors.ts` — brand palette.
- `typography.ts` — type scale, motion curves, platform safe area.
- `assets.ts` — the asset registry, plus measured focal points on each
  photograph that drive where the macro pushes converge.

Shots are in `src/shots/`, composed from reusable primitives in
`src/components/` (`CinematicZoom`, `ImageParallax`, `MaskedReveal`,
`LightSweep`, `BeatCut`, `ProductReveal`, `TextReveal`, `DirectionalBlur`).

## Product and logo integrity

The photography in `public/assets/` is the source of truth. Every shot only
ever crops, scales, masks and lights those files — no product is redrawn,
recoloured, reshaped or substituted, and all scaling is uniform so proportions
cannot drift. The signature is used exactly as delivered; the only treatment is
a crop of the empty cream margin around the mark so it can be placed as a
tight plate (`LOGO_CROP` in `config/assets.ts`).

## Sound

`scripts/generate-audio.mjs` synthesizes the whole track from oscillators and
filtered noise — no samples, nothing licensed. Its cut sheet mirrors
`config/timings.ts`, so accents land on picture cuts by construction.

## Fonts

Inter is self-hosted in `public/fonts/` and declared in `src/index.css`, rather
than fetched from Google Fonts at render time — the renderer runs behind a
TLS-intercepting proxy that headless Chrome does not trust.

---

# POV Court Film (offline cut)

A second composition — the native-feeling TikTok concept, *"POV: hai appena
scoperto il brand di padel che nessuno conosce."* 24s, same format.

```bash
npm run audio:pov                            # regenerate its soundtrack
npm run render:pov                           # variant A
npx remotion render src/index.ts OFFPADEL-POV-B out/pov-b.mp4
```

## Status: awaiting footage

The concept is live action — two performers, a court, spoken dialogue, a ball
strike. The project holds no footage, location plates, performers or voice
recordings, so **five of the eight scenes are production slates**, not picture.

| Scene | 00:00 | State |
|---|---|---|
| `OpeningHook` | 0.0–2.0 | slate |
| `RacketReveal` | 2.0–5.0 | **carbon insert is real**, two-shot slated |
| `MatchSequence` | 5.0–9.0 | slate |
| `SlowMotionImpact` | 9.0–14.0 | slate |
| `DialoguePayoff` | 14.0–17.0 | slate |
| `ProductMontage` | 17.0–21.0 | **finished** |
| `FinalBrand` | 21.0–23.0 | **finished** |
| `LoopEnding` | 23.0–24.0 | slate |

The slates carry the shot's own paperwork — slate, timecode, camera, action —
so the cut plays at the right length and rhythm. To finish a scene, swap its
`FootagePlate` for an `OffthreadVideo` inside the same component: timings,
captions and audio are already built around these durations, so the edit does
not move.

See `docs/storyboard-court-film.html` for the shot list.

## Variants

Scene 01 is the only variable, so A/B/C render from one composition and one
shoot. Lines live in `HOOK_VARIANTS` (`src/pov/config.ts`).

## Captions

Dialogue captions are burned in by design — most of the platform is watched
muted on the first pass, and this story is carried by its dialogue. Sync points
are in `dialogueFor()`; they are the frames to cut the recorded takes to.

## Sound

`scripts/generate-pov-audio.mjs` is a temp track in the proper sense: it fixes
the arrangement, the ducks and every hit position, including the 200ms of true
silence before the strike. Location sound, dialogue and licensed music lay
against the same grid.
