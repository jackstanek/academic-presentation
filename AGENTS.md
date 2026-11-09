# Repository guidance

## Commands and verification

- `nix develop` supplies Node.js 22/npm from nixpkgs 26.05. Install JavaScript dependencies separately with `npm ci`; entering the shell does not install them.
- `nix develop --command npm run build` runs the TypeScript check, then Vite. `npm run check` checks only `src/`; it does not check `vite.config.js`.
- `npm run dev` serves `127.0.0.1:5173`; `npm run preview` serves the existing build at `127.0.0.1:4173`. Both use strict ports and fail rather than choose another port.
- For flake edits: `nix flake check --all-systems` and `nix fmt -- --check flake.nix`. Keep the nixpkgs input on `nixos-26.05`.
- No automated test suite, JS linter, or JS formatter is configured. Animation changes need browser verification, not just a successful build.

## Presentation and animation contracts

- Slides are HTML in `index.html`; `src/main.ts` explicitly initializes diagrams and wires reveal.js events. New animation modules are not auto-discovered.
- Animations must use the deck's native Next/Back navigation, not separate playback buttons or custom keyboard navigation.
- Inside an animation container, `.fragment[data-animation-step]` values must match GSAP labels at the **end** of each step. Timelines are paused and begin at the `start` label by default.
- `src/animations/fragments.ts` derives the target from visible fragments, not an event counter. Preserve reverse navigation, fragment URL restoration, reduced-motion handling, and cancellation of superseded tweens.
- Only `fragmentshown`/`fragmenthidden` animate. Slide changes, overview, deck pause, and tab visibility changes seek immediately to the fragment state. Dispose GSAP tweens and event listeners on HMR teardown.
- KaTeX JS, CSS, and fonts are bundled locally; the stock reveal.js math plugin defaults to a CDN. Configured delimiters are `\(...\)`, `\[...\]`, and `$$...$$`, not `$...$`.
- Preserve Vite's `base: './'` and local assets for offline/subdirectory hosting. Serve the entire `dist/` over HTTP, not `file://`.

## Browser checks

- On the animation slide, Next should substitute, then compute, then leave; Back should reverse those steps. Check rapid direction changes and overview during a tween.
- Reload `#/animation-slide/0` and `#/animation-slide/1` to verify checkpoint restoration; also check reduced-motion mode and a production build hosted under a URL subdirectory.
