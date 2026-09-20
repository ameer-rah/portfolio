# Sprite integration

Asset: `public/assets/sprite/ameer-poses.png`, generated with the built-in image tool from the approved character concept.

Four poses: idle, wave outward, wave inward, blink. CSS registers the frames and sequences an arrival wave, click-to-wave, blinking and subtle idle motion. Home uses the large character; the shared layout displays a small companion when the hero is out of view and on the other routes. Pause is shared between instances. Hidden browser tabs and reduced motion stop animation. Hide dismisses the small companion for the current mounted session.

The generator returned opaque checkerboards despite requesting transparency. A subsequent image-tool edit replaced the checkerboard with the site's cream background. This asset is opaque, not a transparent PNG; the hero uses multiply blending and the dock uses a matching cream surface.

## Original production prompt

Create a production transparent PNG sprite sheet from the supplied approved character. EXACTLY FOUR frames in ONE horizontal row of FOUR equally sized cells. Canvas wide 3:1 aspect ratio. Each cell contains same full-body man same size, same head position, same feet baseline, centered within cell, generous transparent padding between frames, no overlap. Character matches approved reference: brown skin, black slicked-back hair, black rectangular glasses, subtle mustache goatee, grey short sleeve t-shirt, black pants, silver white ASICS shoes. Crisp detailed 16-bit pixel art. Frame 1: relaxed idle with both arms down. Frame 2: right hand raised with palm tilted outward, greeting. Frame 3: same raised right hand tilted inward in wave. Frame 4: relaxed idle same as frame 1 but eyes closed for blink. Keep body, clothes, head proportions, shoes and pixel scale completely consistent across frames. Only arm pose and eyelids change. Real transparent alpha background, no checkerboard painted in, no background, no labels, no text, no shadows, no ground, no outlines around cells. Character fills 85 percent of each cell height. This will be displayed using four equal width background-position steps so EXACT equal cell alignment is critical.

## Final background edit

Change ONLY the checkerboard background to perfectly flat solid warm ivory RGB(255,253,247), hex #fffdf7. No checkerboard anywhere, no texture, no gradient. Preserve four characters exactly and exact placement. Keep 2172x724 image four equally spaced animation frames. Background between legs and under arms must also be solid #fffdf7. This is an opaque game sprite sheet on cream.

The journal, workbench and letter prop animations from the initial brainstorm are not part of this implementation; page-specific greetings accompany the shared wave and idle animations.
