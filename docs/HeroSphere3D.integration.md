# PENETIX security core — single-file integration

## 1. Install

In an existing React + Vite JavaScript project:

```sh
npm install three
```

## 2. Complete component

Copy `src/components/HeroSphere3D.jsx`. It is self-contained, including geometry,
shaders, procedural lighting, styles, timing, resize handling and cleanup.
There are no model, texture, HDR, CDN or CSS-file dependencies. RoomEnvironment
is included with the installed Three.js package; it does not fetch an asset.

## 3. Render inside your existing Hero

```jsx
import HeroSphere3D from './HeroSphere3D.jsx';

export function HeroSecurityVisual() {
  return (
    <div style={{ width: 'min(100%, 530px)', aspectRatio: '1' }}>
      <HeroSphere3D fit="container" />
    </div>
  );
}
```

Place `<HeroSecurityVisual />` in the visual column of the existing hero. Keep
the existing background, copy, buttons and surrounding layout. The current
PENETIX project is already integrated; its existing `<HeroSphere3D />` usage
keeps its approved desktop/mobile placement via the `auto` layout mode.

## 4. CSS

No additional CSS is required. The component fills its container; give that
container dimensions, as in the example. It accepts `className`, `style` and
`fit` props. Use `fit="container"` to bypass the existing PENETIX hero placement.

## 5. Animation and accessibility

- 0–10 seconds: emerald-green protected state.
- 10–20 seconds: yellow-green to amber warning buildup.
- 20–24 seconds: amber to red, faster protective shell rotation.
- 24–29 seconds: red through soft teal back to emerald green.
- 29–30 seconds: secure green, then a seamless restart.

Reduced motion displays the secure green state. Animation pauses off-screen
and in hidden tabs. Pixel ratio is capped at 1.5. WebGL loss shows a text
fallback and recovers on context restoration. All graphics resources and
event listeners are disposed on unmount.

The result is a procedural real-time interpretation of the supplied reference,
not a pixel-identical recreation of its photorealistic render.

Run `npm run build` to verify integration. In this workspace,
`node scripts/verify-hero.mjs` checks the real-time loop and responsive layouts;
`node scripts/verify-hero.mjs --numeric` runs the timing checks without a browser.
