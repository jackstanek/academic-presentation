---
name: academic-presentation
description: Author and revise visual-first academic HTML presentations in this repository's Nix flake template, using reveal.js, D3/SVG, GSAP, and local KaTeX. Use for drafting slides from outlines, paper drafts, or conversation, and for follow-up requests about individual slides, diagrams, charts, animation stages, arrows, layout, or math—even small edits such as “on slide 10, insert a step.” Deliver changes to the runnable deck and verify them in a browser. Not for PowerPoint, unrelated web apps, or editing the template's development tooling alone.
compatibility: This academic-presentation repository or an initialized copy; Nix with flakes, npm dependencies, and browser automation for full verification.
---

# Academic presentation authoring

Build a visual aid for a live explanation, not a document projected onto a wall.
The audience should be able to see the mechanism, contrast, or evidence while
listening to the speaker. Keep the source easy to revise conversationally.

Start with the visual alone. Add visible text only when it helps the audience
understand what they are seeing or supports a deliberate rhetorical build by the
speaker. A polished title/subtitle/diagram/caption/footer layout can still be far
too textual. Most explanation should happen through the speaker and the visual,
not through parallel prose on screen.

## Start from the working deck

1. Read repository guidance (`AGENTS.md`), inspect the working tree, and read the
   relevant slides and modules. Preserve unrelated changes and user-authored
   material. Resolve project files from the repository root, not this skill's
   directory.
2. Identify whether the request is an initial draft or a targeted revision. A
   request about one slide is not permission to redesign the deck.
3. Use the outline, paper, or conversation already provided. Ask only for missing
   information that materially changes the explanation: intended audience,
   duration, or an ambiguous scientific claim. Otherwise state a modest
   assumption and proceed. Never invent empirical results or claims to fill a
   slide.
4. Read [references/animation.md](references/animation.md) before changing
   animation structure, fragments, or lifecycle wiring. Read
   [references/visual-design.md](references/visual-design.md) before drafting a
   deck or redesigning its diagrams. Read
   [references/verification.md](references/verification.md) before verification.

### Repository map

| Root-relative path | Responsibility |
| --- | --- |
| `index.html` | HTML slides, stable section IDs, fragments, existing notes |
| `src/styles.css` | Theme, slide layouts, diagram typography |
| `src/main.ts` | reveal.js setup, local KaTeX, explicit animation registration and lifecycle |
| `src/animations/reduction.ts` | Example D3/SVG construction and paused GSAP timeline |
| `src/animations/fragments.ts` | Shared visible-fragment → timeline-label adapter |
| `vite.config.js` | Relative assets, loopback servers, strict ports |

Keep this stack. Use HTML/CSS and TypeScript/JavaScript, reveal.js for the deck,
SVG for diagrams and charts, D3 for data/layout, GSAP for motion, and bundled
KaTeX when needed. A static SVG does not need a gratuitous timeline or D3 join.
Do not introduce React, another presentation framework, remote fonts, or CDN
scripts merely to author slides.

## Design for visual understanding

- Make a deliberate visual system rather than retaining reveal.js's black theme
  by inertia. For new decks, prefer a warm light canvas, dark ink, and restrained
  blue/teal and ochre/rust accents with soft related fills. The user's preferred
  examples combine these qualities with the sparse layout described below.
  Follow an explicit user palette or established deck instead when revising it.
- Sparse text is not a substitute for visual design. Give diagram objects a
  coherent treatment of shape, scale, fill, stroke, and spacing; use these to
  distinguish roles and guide attention. See the visual-design reference for a
  starting palette and how to use it without adding slide furniture.
- Give each slide a clear explanatory purpose. Prefer one dominant visual:
  a worked example, spatial relationship, comparison, data plot, or mechanism.
  Multiple panels are useful when their relationship is the point.
- Make the visual do the explanatory work. Replacing bullets with boxes of prose
  is still a text-heavy slide. Titles are optional; subtitles, captions, takeaways,
  footers, and visible stage instructions are not default slide furniture. Do not
  narrate a visible change both above and below the diagram.
- Keep mostly the indispensable diagram labels: identities, essential quantities,
  axes/units, or a relationship the drawing cannot disambiguate. Even these are
  candidates for removal when position, geometry, or an already-established
  encoding makes them redundant. Do not label every object and intermediate
  state just because the model has a name for it.
- A short question or a timed phrase can be useful for the speaker's rhetorical
  build. Give it a specific job and reveal it at the right moment; do not use
  that exception to decorate every slide with a slogan or conclusion sentence.
- Establish a concrete case before adding abstraction. Maintain consistent
  positions, colors, and identities across stages so the audience can follow
  what changed. Make encodings legible without relying on color alone; a shared
  legend need not be repeated once the audience knows it.
- Use negative space deliberately: separate meaningful groups, leave breathing
  room around labels, and make the relationship between objects readable. Prefer
  a small clear gap between an arrow and each box when the connection remains
  unambiguous; avoid arrowheads jammed into borders or labels. Touching endpoints
  are appropriate when the represented topology requires them. Empty space is
  useful structure, not a hole to fill with prose, borders, or extra panels.
- Use alignment, contrast, and projection-scale type. Do not shrink text to fit a
  paper excerpt or make every slide a dashboard of cards. Minimal text does not
  require a bland diagram: make shape, proportion, emphasis, and motion carry
  the explanation.
- Distinguish semantic containers from decorative cards. A worker enclosing its
  keys or a queue enclosing its slots is useful visual structure; soft fills,
  modest corner radii, and fine outlines are appropriate for such objects. The
  prohibition is on generic UI panels and badges used as slide decoration, not
  on drawing meaningful boundaries around related things.
- Avoid chips/badges/pills, decorative eyebrow labels, quippy taglines, slogan
  titles, rhetorical tricolons, and forced “three things” layouts. An actual
  three-stage process is fine; ornamental three-part rhetoric is not. Rounded
  shapes are fine when they represent meaningful objects, not decorative UI.
- The starter's toolkit pills, slogans, and file-list slides demonstrate plumbing,
  not the desired presentation aesthetic. Replace those in an initial draft;
  do not reproduce them as a design system. Do not restyle unrelated slides
  during a local revision.
- Use motion to show causality, correspondence, movement, accumulation, or a
  changing state. Each reveal should answer a question or isolate a change.
  Avoid continuous ambient motion, gratuitous entrance effects, and automatic
  playback that forces the speaker to keep pace.

### Subtract text before delivery

Inspect the rendered slide at each checkpoint, including text drawn inside SVG.
For every visible text element ask: **What becomes harder to understand, or what
specific spoken reveal stops working, if this disappears?** If there is no clear
answer, remove it. If a shorter label does the job, shorten it. Test deletion,
not merely rewriting the same prose more tersely.

Look especially for repeated claims across titles, subtitles, stage captions,
diagram labels, counters, and footers. A diagram should not need a running
commentary printed beside it. Check for rhetorical tricolons in subtitles and
footnotes as well as titles; technical-looking wording is not an exemption.
Keep necessary scientific qualifications and user citations, but state a shared
example assumption once where it matters rather than on every slide. Do not hide
clutter with tiny type or move it wholesale into unsolicited speaker notes.

### Math has to earn its place

Ask what the audience understands better because a formula is visible. Use math
when it clarifies a relationship, makes a worked calculation inspectable, or
communicates essential precision more clearly than a diagram or words. Its
presence in a source paper is not sufficient reason to include it.

If a formula is useful, introduce its quantities visually, show only the relevant
part, and connect symbols to labeled objects. Avoid unexplained notation and
walls of derivation. Preserve technical meaning when simplifying; identify
schematic examples and distinguish analogy from a claim about the method.

Use the existing local KaTeX setup: `\(...\)`, `\[...\]`, or `$$...$$`, not
single-dollar delimiters. It renders slide DOM during deck initialization;
dynamically inserted math needs explicit rendering. Plain SVG text does not
automatically receive KaTeX layout. Prefer adjacent HTML math when SVG placement
would require fragile rendering machinery.

### Scientific fidelity and authorship

Keep observed results, hypotheses, and explanatory examples distinct. Use supplied
data accurately; preserve axes, units, relevant uncertainty, and fair comparison
scales. For conceptual diagrams, use clearly schematic marks rather than invented
measurements. Do not silently turn correlations into causal arrows.

Speaker notes and citations belong primarily to the user. Preserve existing ones
and do not generate a speaker script, literature review, bibliography, or citation
placeholders by default. Add or edit these only when requested. When a scientific
claim is unsupported or a sourced graphic needs attribution, flag the issue
briefly rather than inventing a reference or hiding the uncertainty. Removing
citations to make a slide cleaner is not an acceptable simplification.

## Draft a presentation

1. Form a lightweight slide plan from the supplied material. For each slide,
   identify its purpose, proposed visual, and any meaningful reveal states. Start
   without prose and justify any text that needs to accompany the visual. This
   is an authoring aid, not a mandatory report or extra deliverable. Share a
   compact plan if the narrative needs agreement; do not block a clear request
   with a long design interview.
2. Shape the material into an explanation rather than mechanically copying paper
   sections. Respect a requested outline and duration; suggest a departure when
   it materially improves comprehension. Do not add generic agenda, conclusion,
   or “questions?” slides solely to complete a template.
3. Choose the diagram palette and object treatments, then implement the deck in
   this project. Keep the sparse composition; don't buy visual richness with
   extra headings, captions, cards, or footers. Give sections semantic, unique, stable IDs
   such as `queue-overflow`. Keep visual data and animation steps named and easy
   to locate. Scope CSS and SVG IDs to avoid cross-slide collisions.
4. Initialize every new animation explicitly in `src/main.ts`. Adapt the existing
   registration/lifecycle to all animation instances; ensure removed starter
   diagrams no longer have dangling imports, queries, or initializers.
5. Run the text-subtraction pass on actual rendered checkpoints, then verify the
   runnable result and fix issues. Hand off with a short description and preview
   URL. Invite slide-specific feedback without generating notes or ancillary
   documents the user did not request.

## Revise a particular slide

1. Resolve the user's slide number/title against the current deck before editing.
   Use reveal.js slide order, including a title slide; fragments are stages, not
   separate slides. With vertical stacks, use the displayed number and current
   coordinates. Do not identify a slide by counting every `<section>` tag. Ask
   only if the reference is genuinely ambiguous.
2. Locate its stable section ID, SVG objects, fragment markers, timeline, and any
   shared styles. Inspect the current browser state if the request refers to
   “this element” and the identity is unclear.
3. Make the smallest coherent change. Preserve unrelated slide order, user notes,
   citations, IDs, styling, and animation states. Prefer local layout adjustments
   over global CSS changes. Do not add explanatory copy to describe the edit.
   On the edited slide, remove redundant starter scaffolding such as navigation
   hints or duplicate stage labels instead of inheriting it as a design rule.
   Preserve substantive user text; ask before deleting material whose role is
   unclear. This is not permission for a deck-wide cleanup or palette change.
4. For an inserted animation stage, write the intended state sequence first.
   Add the geometry/arrow and its initial state, add a timeline segment with an
   end label, and add a matching HTML fragment at the correct index. Update later
   indices without changing existing named labels unnecessarily. Recheck the
   whole sequence in both directions, not just the new arrow's final appearance.
5. Keep named slide URLs stable. Inserting a fragment changes later numeric
   fragment URLs on that slide; report the updated checkpoints when relevant
   rather than promising old numeric URLs still denote the same state.
6. Verify the edited slide, its neighbors, and any slides affected by shared code.
   Return a concise description identifying the slide and what changed.

## Verify and deliver

Use the build and browser checklist in
[references/verification.md](references/verification.md). A successful TypeScript
check or screenshot of the final state is not animation verification. Inspect
every new slide and every meaningful new/changed checkpoint, including reversal
and interrupted motion. Preserve offline/subdirectory hosting.

Report the preview URL, build result, and what browser behaviors were actually
checked. If browser automation is unavailable, say that verification is blocked
or partial, list the remaining checks, and do not call the deck browser-verified.
Do not substitute an exported PDF, video, or mock screenshot for the runnable
deck.

Work in one authoring agent by default. If the user requests delegation, give
workers disjoint slide/module ownership and shared design/state conventions;
have one integrator own `index.html`, shared CSS, and `src/main.ts`. An independent
reviewer can inspect scientific fidelity and navigation, but the integrator still
verifies the assembled deck.
