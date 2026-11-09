# Animation implementation and revision

Read the current modules before applying this pattern; user changes may have
extended them. Preserve the shared adapter rather than writing per-slide keyboard
handlers or event counters.

## State contract

- D3 constructs/layouts SVG; GSAP changes visual properties; reveal.js fragments
  select named stops. Do not have D3 transitions and GSAP animate the same
  property concurrently.
- The timeline is paused, with a `start` label before the first transition. The
  default initial state is `start`, not the first revealed fragment.
- Every `.fragment[data-animation-step]` lives inside its animation container.
  Its value matches a GSAP label at the **end** of the associated step. Assign
  explicit, ordered `data-fragment-index` values; coordinate indices slide-wide
  when other fragments share the slide. Group markers only intentionally.
- `createFragmentTimeline` derives the target from visible fragments, not the
  number or order of emitted events. Keep that behavior for reverse navigation,
  grouped fragments, and deep-link restoration.
- Prefer nonvisual fragment markers when the diagram already shows the change.
  Technical checkpoints do not require visible captions, numbered steps, or a
  navigation hint. Add visible text only if it independently aids comprehension
  or a deliberate spoken reveal. Keep accessible SVG descriptions meaningful;
  do not turn every internal state name into a label.
- Each stop must be understandable without seeing motion: reduced-motion users
  and deep links land directly at checkpoints.

## Minimal insertion pattern

Suppose an existing slide has `start → transferred → complete`, and the user wants
to reveal a route before the transfer. Add `route-visible` without renaming the
other labels:

```html
<!-- Inside this animation's container; these markers drive state, not copy. -->
<span class="animation-markers" aria-hidden="true">
  <span class="fragment" data-fragment-index="0"
        data-animation-step="route-visible"></span>
  <span class="fragment" data-fragment-index="1"
        data-animation-step="transferred"></span>
  <span class="fragment" data-fragment-index="2"
        data-animation-step="complete"></span>
</span>
```

Give this wrapper a scoped nonvisual treatment that removes it from layout while
leaving the fragment nodes in the DOM for reveal.js and the adapter. For example:

```css
.reveal .animation-markers {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  pointer-events: none;
}
```

```ts
// Construct stable SVG nodes once; establish seekable initial properties.
gsap.set(route, {attr: {opacity: 0}});
gsap.set(item, {attr: {cx: sourceX}});
gsap.set(destination, {attr: {fill: baseFill}});

const timeline = gsap.timeline({paused: true})
  .addLabel('start')
  .to(route, {attr: {opacity: 1}, duration: 0.3})
  .addLabel('route-visible')
  .to(item, {attr: {cx: destinationX}, duration: 0.7})
  .addLabel('transferred')
  .to(destination, {attr: {fill: activeFill}, duration: 0.3})
  .addLabel('complete');

const fragments = createFragmentTimeline(container, timeline);
```

Adapt this to existing code; it is not a new playback engine. Define SVG arrow
markers with IDs unique to the diagram. Aim arrows unambiguously at the intended
objects while leaving a little negative space at box edges; keep arrowheads and
labels clear of each other. Use actual touching endpoints when the represented
connection requires it. Keep bounds inside the SVG `viewBox` and test at actual
presentation size. An arrow's appearance should usually explain itself without
a new “arrow revealed” caption.

## Make seeking reversible

Use timeline-owned property changes on stable nodes rather than callbacks that
append/remove elements or mutate external state. Suppressed callbacks on seeks
cannot reconstruct such changes reliably. A caption change can be a timeline
`.set(node, {textContent: '...'})`; ensure its initial text is defined too.
Check backwards seeks for all changed text, opacity, geometry, and emphasis.

Kill superseded `tweenTo` transitions rather than queueing them. A rapid Next,
Back, Next must settle at the fragment-selected state, not finish stale motion.
Do not replace this with a timer or manually incremented step variable.

## Register and synchronize every animation

`src/main.ts` currently initializes one example explicitly. When adding more,
manage a collection of animation/container pairs or equivalent explicit wiring.
Call `sync` for every instance on deck lifecycle changes, including inactive
instances so they do not continue tweening after leaving a slide.

For each instance, permit animated sync only when:

- The triggering event is `fragmentshown` or `fragmenthidden`.
- The deck is ready and the instance belongs to the current slide.
- The overview is closed, the deck is not paused, and the document is visible.

On `ready`, `slidechanged`, `overviewshown`, `overviewhidden`, `paused`, `resumed`,
and document `visibilitychange`, sync immediately without animation. These
transitions should settle motion, not restart playback. Preserve fragment URLs.

Honor `prefers-reduced-motion` via the existing adapter's immediate seeks. On HMR
teardown, destroy each adapter/timeline, remove module-owned SVG content and DOM
listeners, and destroy the deck (or explicitly detach deck listeners if retaining
it). Avoid duplicate SVGs and subscriptions after edits.

## Checkpoint table

For a nontrivial animation edit, keep a short working table (in reasoning or a
temporary verification record, not mandatory slide text):

| Stop | Visible objects | Changed relationship | Next / Back |
| --- | --- | --- | --- |
| `start` | Source, destination, item | No route yet | Reveal route / previous slide |
| `route-visible` | Above + arrow | Route shown; item unmoved | Transfer / hide route |
| `transferred` | Route + received item | Item at destination | Complete / undo transfer |
| `complete` | Destination highlighted | Transfer complete | Next slide / remove highlight |

Use it to check that each label denotes a completed state and that no unrelated
element changes during a newly inserted step.
