# Diagram-led visual design

The desired combination is a sparse composition with carefully designed visual
objects—not a rich editorial slide with all its prose, and not an unstyled diagram
on the starter's dark canvas. Keep the text-subtraction pass in `SKILL.md`.

## Default direction for a new deck

Prefer warm light backgrounds, dark ink, and a few muted semantic colors. The
reviewed examples favored this treatment over the starter-derived dark navy,
mint, and amber treatment. This is a starting direction, not a requirement to
copy the same layout or use these exact colors in every talk. Preserve an
established deck's palette during a targeted edit unless asked to change it.
Use a dark palette when requested or when the visual material genuinely benefits
from it, not just because reveal.js imports `black.css`.

One local CSS token set:

```css
:root {
  color-scheme: light;
  --r-background-color: #f6f3eb;
  --r-main-color: #182b36;
  --r-heading-color: #182b36;
  --r-link-color: #28657d;
  --diagram-surface: #fffdf7;
  --diagram-ink: #182b36;
  --diagram-muted: #53636a;
  --diagram-line: #bdc9c9;
  --diagram-stable: #28657d;
  --diagram-stable-fill: #e3edf2;
  --diagram-change: #a44b1c;
  --diagram-change-fill: #fff0d8;
}
```

Use the tokens in both CSS and SVG. Set text fills deliberately; the stock dark
theme may otherwise leave white labels on pale shapes. Check contrast in the
rendered scene, including softened/inactive states. A successful palette should
survive the actual presentation viewport, not just look attractive as swatches.

## Design the objects, not extra slide furniture

- **Establish figure and ground.** A slightly lighter surface or a fine outline
  can distinguish a meaningful container from the canvas. Avoid enclosing the
  entire diagram in a panel when it adds nothing.
- **Give roles distinct treatments.** Related objects share geometry and styling;
  different roles can use different scale, silhouettes, or fill/outline treatment.
  A large owner boundary around small key tiles says something; identical boxes
  for owners, keys, captions, and headings erase that distinction.
- **Use restrained color relationships.** Pair a dark outline with a soft related
  fill. Reserve the stronger accent for the relevant object or changing state,
  rather than painting every label, arrow, and container at full intensity.
- **Keep semantic colors stable.** For example, cool color can denote unchanged
  assignments and warm color reassigned ones. Combine it with motion, position,
  outline, or pattern so color is not the sole signal. Don't add a status word
  to every tile when a single established encoding already does the work.
- **Compose through spacing and proportion.** Align related items, keep consistent
  internal padding, make boundaries generous enough for their contents, and use
  empty space between groups. Leave small clear gaps around arrowheads and boxes
  unless a touching connection has semantic meaning.
- **Make linework intentional.** Use a consistent visual weight for boundaries,
  a quieter weight for context, and readable directional marks for movement.
  A dashed removed container or a soft highlight can be more legible than a giant
  cross or a thick high-saturation outline. Choose for the concept, not novelty.
- **Use typography as part of the diagram.** Differentiate object identities from
  essential quantities with size/weight and alignment. Use the existing local
  font stack; don't fetch a font or add decorative microtype to make it feel
  designed. Keep the type large enough for projection.

Rounded rectangles are appropriate for records, tokens, or owned collections;
they are not an invitation to introduce chips or dashboard panels. Color, shape,
and linework can enrich a diagram without adding a single text element.

## What to borrow from a visually preferred example

Separate its useful visual vocabulary from its presentation scaffolding. Borrow
the palette relationships, object proportions, subtle fills, boundary treatment,
and arrow spacing. Do **not** bring back its eyebrow, subtitle, status prose on
every object, running captions, footer rules, stage navigation row, or takeaway
panel just because they appeared in the same example.

For an ownership-change explanation, the visual may need only owner identities
and key names, with muted owner surfaces, softly filled tiles, and a changed
outline/color as the affected keys move. It does not automatically need an
“ONLINE” label per owner, “stays here” per survivor, and “moved from B” per mover.
This is an example of choosing encodings, not a mandatory slide template.

## Inspect the result

After text subtraction, ask whether the diagram still has hierarchy, clear
grouping, deliberate color use, and enough visual weight to carry the slide.
If it feels thin or generic, improve its geometry, palette relationships, or
linework—not its word count. Conversely, remove attractive design elements if
they do not serve the explanation. Finish with the browser checklist in
`verification.md`.
