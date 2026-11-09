---
name: academic-presentation
description: Author and revise visual-first academic HTML presentations in this repository's Nix flake template, using reveal.js, D3/SVG, GSAP, and local KaTeX. Use for drafting slides from outlines, paper drafts, or conversation, and for follow-up requests about individual slides, diagrams, charts, animation stages, arrows, layout, or math—even small edits such as “on slide 10, insert a step.” Deliver changes to the runnable deck and verify them in a browser. Not for PowerPoint, unrelated web apps, or editing the template's development tooling alone.
compatibility: This academic-presentation repository or an initialized copy; Nix with flakes, npm dependencies, and browser automation for full verification.
---

# Academic presentation authoring

Build a visual aid for a live explanation, not a document projected onto a wall.
The audience should be able to see the mechanism, contrast, or evidence while
listening to the speaker. Keep the source easy to revise conversationally.

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

- Give each slide a clear explanatory purpose. Prefer one dominant visual:
  a worked example, spatial relationship, comparison, data plot, or mechanism.
  Multiple panels are useful when their relationship is the point.
- Make the visual do the explanatory work. Replacing bullets with boxes of prose
  is still a text-heavy slide. Use short direct titles and labels attached to the
  things they describe; keep necessary qualifications readable.
- Establish a concrete case before adding abstraction. Maintain consistent
  positions, colors, and identities across stages so the audience can follow
  what changed. Explain legends and encodings instead of relying on color alone.
- Use empty space, alignment, contrast, and projection-scale type. Do not shrink
  text to fit a paper excerpt or make every slide a dashboard of cards.
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
   identify its purpose, proposed visual, and any meaningful reveal states. This
   is an authoring aid, not a mandatory report or extra deliverable. Share a
   compact plan if the narrative needs agreement; do not block a clear request
   with a long design interview.
2. Shape the material into an explanation rather than mechanically copying paper
   sections. Respect a requested outline and duration; suggest a departure when
   it materially improves comprehension. Do not add generic agenda, conclusion,
   or “questions?” slides solely to complete a template.
3. Implement the deck in this project. Give sections semantic, unique, stable IDs
   such as `queue-overflow`. Keep visual data and animation steps named and easy
   to locate. Scope CSS and SVG IDs to avoid cross-slide collisions.
4. Initialize every new animation explicitly in `src/main.ts`. Adapt the existing
   registration/lifecycle to all animation instances; ensure removed starter
   diagrams no longer have dangling imports, queries, or initializers.
5. Verify the runnable result, fix issues, then hand off with a short description
   and preview URL. Invite slide-specific feedback without generating notes or
   ancillary documents the user did not request.

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
   over global CSS changes.
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
