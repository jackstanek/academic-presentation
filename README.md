# Small steps: a presentation starter

## Create a new presentation

From an empty directory, initialize the default Nix template:

```sh
mkdir my-presentation
cd my-presentation
nix flake init -t github:jackstanek/academic-presentation
git init
git add .
```

This copies the framework, example slides, and dependency lock files into your
new project. The files are independent copies, ready to customize.

### Author slides with an agent

The template includes a repository-local `academic-presentation` skill in
`.agents/skills/academic-presentation/`, discoverable by coding agents that use
that convention. Ask your agent to use it with an outline, a paper draft, or a
conversational brief:

> Use the academic-presentation skill to draft six visual slides explaining
> cache coherence to systems graduate students. Show a worked example of two
> cores reading and writing the same cache line. I'll write notes and references.

After reviewing the deck, request changes by slide number or title:

> On slide 4, insert an animation stage before invalidation. Reveal an arrow from
> core A to core B, then wait for the next advance before changing the cache state.

The skill favors visual intuition over dense text, uses math only when it helps
explain the idea, and preserves user-written notes and citations. Delivery is a
runnable deck with build and browser checks; an agent without browser access
should report that verification is incomplete. The included starter illustrates
the runtime, not the visual style expected of an authored talk.

## Run locally

```sh
nix develop
npm ci
npm run dev
```

Open **http://127.0.0.1:5173/** for the four-slide example. It includes fragments,
speaker notes, inline/display KaTeX, and an SVG diagram drawn with D3 and animated
with GSAP.
Use arrow keys to navigate, `Esc` for the overview, and `S` for speaker notes.
Animations use the **same Next/Back controls as the slides**, including arrow
keys, Space, and reveal.js navigation buttons. On slide three:

1. Advance once to animate substitution.
2. Advance again to animate the result.
3. Advance again to move to the next slide.

Back reverses each step before moving to the previous slide. There are no separate
playback controls. Each step stops at its end until you advance again. Reduced
motion shows each step immediately. Slide jumps, overview, and tab visibility
changes settle the diagram at its current fragment state without background
playback. Fragment URLs also preserve the animation step on reload.

## Edit the example

| File | Purpose |
| --- | --- |
| `index.html` | Slide content, fragments, and speaker notes |
| `src/main.ts` | reveal.js, local KaTeX, and animation lifecycle |
| `src/styles.css` | Presentation styling |
| `src/animations/reduction.ts` | D3 data/layout and GSAP timeline |
| `src/animations/fragments.ts` | Reusable reveal.js fragment → timeline adapter |
| `vite.config.js` | Vite server and relative deployment URLs |

Write math inside `\(...\)` for inline formulas or `\[...\]` / `$$...$$` for
display formulas. KaTeX JavaScript, CSS, and fonts are bundled from npm, not a CDN.

To change the diagram, edit the `steps` data and D3 selections in
`src/animations/reduction.ts`. Edit the GSAP timeline there to change the motion,
timing, and captions. The SVG scales using its `viewBox`; no separate editor,
canvas renderer, video export, or animation build step is needed.

### Add an animation step

Add a normal reveal.js fragment inside the animation container in `index.html`:

```html
<span class="fragment" data-fragment-index="0" data-animation-step="substitute">
  Substitute 2 for x
</span>
```

Give the **end** of that step the same GSAP timeline label:

```ts
const timeline = gsap.timeline({paused: true})
  .addLabel('start')
  .to(marker, {attr: {cx: 640}, duration: 0.9})
  .addLabel('substitute');
```

`createFragmentTimeline` maps visible fragments to these labels. The event wiring
in `src/main.ts` animates forward/backward on `fragmentshown`/`fragmenthidden` and
seeks immediately on slide/visibility changes. Rapid advances replace an ongoing
tween instead of queuing animations. For example, `#/animation-slide/0` opens the
substitution step and `#/animation-slide/1` opens the result.

## Check, build, and share

```sh
npm run check
npm run build
npm run preview
```

Preview the production site at **http://127.0.0.1:4173/**. Deploy the **whole
`dist/` directory** to any static web host, including at a subdirectory. The build
includes `index.html`, bundled JavaScript/CSS, and local fonts; it needs no
external assets. Use an HTTP server rather than opening `index.html` as a
`file://` URL.

## Environment

The flake pins **nixpkgs 26.05** and supplies Node.js 22 (including npm).
`flake.lock` pins Nix inputs; `package-lock.json` pins
JavaScript dependencies. npm installation does not run automatically when
entering the shell.

Installed JavaScript packages:

- **reveal.js** for slides, including its built-in math plugin.
- **KaTeX** for local math rendering, without relying on a CDN.
- **D3** for data-driven SVG diagrams and layouts.
- **GSAP** for timelines and animation playback.
- **TypeScript**, type definitions, and **Vite 8** for development and bundling.

## Development-server security

The development and preview servers bind to `127.0.0.1`. Keep development tools
local and serve a production build for sharing.
