# Build and browser verification

## Environment

The template supplies Node.js 22/npm through Nix, not installed JavaScript
dependencies. If dependencies are absent, run:

```sh
nix develop --command npm ci
```

Use the project's lockfile. Do not upgrade dependencies, regenerate the flake,
or change the nixpkgs input merely to author slides.

```sh
nix develop --command npm run build
nix develop --command npm run dev
```

Run long-lived servers using the harness's background/server facility. Development
serves `http://127.0.0.1:5173/`; production preview uses
`nix develop --command npm run preview` at `http://127.0.0.1:4173/`.
Both ports are strict. If occupied, identify/reuse the matching project server or
ask before stopping someone else's process; do not silently change ports.

`npm run build` checks `src/` TypeScript and bundles with Vite. It does not
check `vite.config.js`. No automated test suite is configured. Do not claim a
test suite passed because the build succeeded.

## Inspect in a browser

Use available browser automation and load its skill/instructions if required by
the harness. Inspect the rendered page, not just source HTML. For a full draft,
check all slides and meaningful reveal states; for a local revision, check the
changed slide, neighboring slides, and any shared-code dependents.

1. **Appearance:** inspect screenshots at the deck's 1280×720 target and a smaller
   viewport. Check clipping, overlaps, font size, label contrast, SVG bounds,
   arrow endpoints, and legibility. A DOM bounds check supplements but does not
   replace visual inspection.
2. **Runtime:** inspect console/runtime errors and failed network requests. Check
   KaTeX if used, including signs, subscripts, delimiters, and line overflow.
3. **Forward/backward:** use native Next until each stage finishes, then leave the
   slide. Back must reverse checkpoints before leaving. Verify captions, arrows,
   object positions, and emphasis at every stop.
4. **Interruptions:** rapidly alternate Next/Back during motion. Enter overview
   during a tween and return. Pause/resume the deck, switch away and return to
   the tab, and jump to another slide mid-tween. No background/stale transition
   should overwrite the fragment-selected state.
5. **Checkpoint restoration:** reload the edited slide at its initial state and
   each changed fragment URL. For the stock example, check
   `#/animation-slide/0` and `#/animation-slide/1`; for other slides use their
   stable ID and actual indices. Direct loads must match states reached through
   navigation.
6. **Reduced motion:** emulate `prefers-reduced-motion: reduce`, navigate through
   the checkpoints, and confirm immediate, meaningful states without lingering
   tweens. Restore the browser preference afterward.
7. **Edit lifecycle:** when changing initialization/cleanup, trigger an HMR update
   and confirm no duplicate diagrams/listeners, then verify a clean reload.

For a static-only change, note which animation checks are unaffected instead of
pretending they were rerun. For an inserted animation stage, these checks are
central, not optional polish.

## Production and offline/subdirectory hosting

Preserve `base: './'` and local KaTeX JS/CSS/fonts. Serve the entire built `dist/`
over HTTP; `file://` is not a supported deployment. Check the production build,
not just the development server.

For a full draft, asset change, or runtime/wiring change, host the built files
under a non-root prefix such as `/talk/` using a temporary local static server
and verify a slide and an animation checkpoint there. Do not simulate this by
merely adding a path to a preview URL whose server does not mount that path.
Use a narrowly scoped temporary mount/server rather than modifying deployment
configuration to run the check. Inspect asset requests for wrong root-relative
paths. Confirm there are no CDN dependencies; if the browser supports it, block
external origins while keeping the local server reachable and reload.

## Handoff

Keep the final response short: identify the deck or slide change, give the
running preview URL (or exact command if no server remains), and summarize build
and browser results. Identify unperformed/blocked checks honestly. A record of
tested slide IDs/checkpoints and screenshots can be kept in the run's outputs
when evaluating the skill; do not clutter the user's repository with verification
reports by default.
