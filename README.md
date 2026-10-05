# Visual Interaction Design Learning

Visual Interaction Atlas is a static Vite app for exploring 36 mini scenes across 12 visual styles and 16 interaction families. Each scene carries the approved taxonomy path, visible shape language, product context, and a structured prompt.

## Run locally

```sh
npm install
npm run dev
```

Create a production bundle with `npm run build`, then serve it with `npm run preview`. The app is same-origin and static; it does not require an API server or any live CDN.

## Architecture

- `src/data/scenes.js` defines the style, interaction family, variant, shape, mini scene, and prompt records and validates the 36 approved paths.
- `src/render.js` renders each scene into its own semantic card.
- `src/interactions.js` provides CSS, Web Animations API, and Pointer Events baselines for all 16 families, plus visibility and pause/resume lifecycle handling.
- `src/enhancements.js` dynamically loads bundled GSAP and Motion enhancements and a Three.js depth layer for Spatial scenes. `?native=1` skips those enhancements to inspect the baseline.
- `src/styles.css` defines the 12 style grammars, shape geometry, responsive reflow, and reduced-motion behavior.

The project serves all dependencies from the local bundle. There are no external runtime font, script, or asset requests.
