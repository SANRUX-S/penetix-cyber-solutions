# Project visual assets

Generated with the built-in image generation tool, using the supplied PENETIX screenshot as an architectural reference for the hero. The source screenshot contained the whole homepage rather than a separate background asset. The generated photographs are illustrative scenes, not claims about a real PENETIX office.

Final project assets:

- `public/images/hero-architecture.webp` — 1536 × 1024, approximately 190 KB.
- `public/images/architecture.webp` — 1536 × 1024, approximately 283 KB.
- `public/images/mountains.webp` — 1536 × 1024, approximately 329 KB.

The generated PNG originals remain under `C:/Users/Mike/.codex/generated_images/01a0b4c4-29e2-7e20-a854-49dcf7b854b3/`. All runtime assets are copied/encoded into this project; the application does not depend on that external directory. WebP encoding only optimizes delivery and does not change composition. `scripts/prepare-assets.mjs` documents the conversion.

## Hero prompt

Use case: photorealistic-natural. Image 1 is a visual reference ONLY for the architecture in the top hero section of this PENETIX website. Generate ONE clean high-resolution architectural background photograph, landscape 3:2. Match the top hero's architecture as closely as possible: luxury minimal modern concrete and glass open interior pavilion in the Alps, pale warm cream concrete ceiling slants from upper left toward far right, tall floor-to-ceiling glass panels across middle, graphite concrete wall at far right, alpine mountains and dark evergreen trees beyond the glass. Reflective polished stone floor across bottom with soft light reflections. Camera at room level, premium architectural photography, realistic stone texture, natural warm daylight from left. Quiet bright spacious left half to support dark website copy. Right half is empty architectural space ready for a separate WebGL floating sphere; DO NOT INCLUDE ANY SPHERE OR OBJECT. Clean scene only. Remove/omit ALL text, logos, buttons, UI, numbers, website sections. Preserve architecture, mountains, material palette and lighting of the hero reference. No other sections from the reference. No furniture, no people, no watermarks. Must be a photographic environment asset, not a screenshot or website mockup.

## Architecture prompt

Use case: photorealistic-natural. Asset type: architectural photography for a premium cybersecurity company website. Generate a single high-resolution wide landscape photograph (3:2) of a minimalist glass-and-dark-bronze modern office building in an alpine mountain landscape. Building is on right third, only 3 floors, beautifully detailed curtain glass facade reflecting trees, slender metal frames, stone foundation. View from outside at slightly low angle. Evergreen trees surrounding, jagged sunlit mountains in background occupying left half, crisp soft blue sky, warm golden morning daylight. Foreground subtle foliage. Palette warm limestone, muted pine green, blue-grey mountains, dark gunmetal. Mood quiet precision, timeless architecture, trusted engineering. Realistic high-end architectural editorial photograph. No people. No text, no logos, no UI, no shields, no tech or sci-fi graphics. Match warm cinematic natural premium architecture used in PENETIX reference. This is an illustrative architecture image, not a claimed actual office.

## Mountain prompt

Photorealistic premium alpine mountain landscape photograph, wide panoramic 3:2 composition. Multiple layers of majestic light limestone mountains and deep pine forest in an alpine valley, soft morning haze, muted grey blue sky, warm natural light touching rock peaks. Tall evergreen trees on left and right sides. No buildings, no people, no vehicles. Calm confident elegant natural landscape to use across a high-end architecture inspired cybersecurity website, as a wide banner and editorial card photography. Pine green and warm grey palette. Realistic high-end nature photography, not illustration. Keep detail natural, do not oversaturate. No text, logos, icons, watermark, no graphic or UI overlays.
