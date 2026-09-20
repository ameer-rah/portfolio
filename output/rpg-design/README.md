# RPG portfolio design

Direction: an old-school RPG save menu, with sage parchment Day and forest Night palettes. Pixel lettering is reserved for navigation, titles, and game labels; professional content stays readable in the body font. Existing routes and portfolio content remain intact. Contact has no character.

Implemented: framed navigation and panels, player profile, a forest panorama, interactive technology inventory, theme-aware Vanta atmosphere on Experience and Projects, saved Auto/Day/Night preference, and normal-color sprite artwork for Night mode. Reduced-motion preferences disable atmospheric animation.

## Assets and generation direction

- `public/assets/rpg-forest.webp`: original generated 16-bit forest-path panorama, muted sage and ivory, cozy handheld RPG atmosphere, no characters or text. PNG master retained alongside it.
- `public/assets/sprite/ameer-poses-night.webp`: edited existing four-frame sheet to replace only the background with flat #16231c, preserving character colors, poses, frame order, and registration.
- `public/assets/sprite/ameer-page-actions-night.webp`: same background-only edit for the six-frame action sheet. PNG masters retained.
- Existing daylight sprite sheets also encoded to WebP for delivery.
- Self-hosted Silkscreen: https://github.com/googlefonts/silkscreen . License included at `public/fonts/Silkscreen-OFL.txt`.

Images were generated/edited with the image-generation tool, then encoded with cwebp. Forest delivery is 900 × 273; sprite frame dimensions are preserved.

## Verification

- Production build and ESLint pass; git diff whitespace check passes.
- Browser checks covered both themes, mobile navigation, interactive inventory, route scenes, and sprite-free Contact.
- Local production Home, Lighthouse mobile: performance 95, accessibility 100; FCP 1.5 s, LCP 2.9 s, TBT 0 ms, CLS 0. Scores describe this local audit, not every route or device.
- Existing Vanta dependencies still produce large-chunk build warnings.

No deployment performed.
