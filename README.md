# PENETIX

A single scrolling cybersecurity homepage built with React 19, Vite, Three.js, lucide-react and modern CSS. All fonts and images are served locally.

## Run

```sh
npm install
npm run dev
```

Open the local URL shown by Vite. For a production build:

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` folder to a static web host. No runtime secrets, backend or database are required.

## Included

Eight major sections, in the specified order: hero, 12 services, interactive security system, approach, sample security report, company principles, six resources, and final contact/footer. Main navigation uses homepage anchors only.

The hero uses real segmented Three.js geometry, a transparent WebGL background, an illuminated seam, procedural environment reflections and a soft contact shadow. It caps DPR at 1.5, reduces mobile geometry, pauses outside the viewport/hidden tabs, respects reduced motion and disposes GPU resources.

Contact requests open the visitor's email app with a prepared draft addressed to **penetixcybersolutions@gmail.com**. The visitor sends it from their mail app. The website does not submit or store form data, and never displays a false “sent” confirmation.

“Watch Our Story” opens a three-scene visual introduction with playback controls. The sample report is explicitly demonstration data and has a working text download. Resource cards are honestly marked “Coming resource” as specified; no article pages or fake articles were added. Footer legal information opens in accessible dialogs. There are no invented client logos, testimonials, certifications or social URLs.

## Verification

With the dev server running:

```sh
npm run verify
```

The Playwright script uses an installed Chromium, Chrome or Edge browser. It checks 1440, 1280, 1024, 768, 375 and 390px layouts, all section/card counts, same-page navigation, image loading, horizontal overflow, WebGL transparency, orbit controls, dialogs, form validation, focus return, story controls, sample downloads, reduced motion and browser errors. Evidence is saved in the ignored `artifacts/` directory.

For a different preview URL, set `PENETIX_URL`. Browser tests intentionally never send email.

Visual assets and their generation prompts are documented in [docs/assets.md](docs/assets.md). Original website files were not present in the supplied workspace; this implementation follows the supplied screenshot and detailed specification.
