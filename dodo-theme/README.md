# Dodo Engineering — slide theme

A web theme extracted from the Dodo Engineering PowerPoint template
("Шаблон Dodo Engineering, светлая"). Drop it into a static project to
build slides as HTML pages that match the original deck.

## File layout

```
dodo-theme/
├── README.md                ← this file
├── index.html               ← working 5-slide preview (← / → / space)
├── css/
│   ├── theme.css            ← :root CSS variables (colors, fonts, sizes…)
│   └── slide.css            ← layout primitives + .t-* typography classes
├── tokens/
│   └── tokens.json          ← same theme as JSON design tokens
└── slides/
    ├── 01-cover.html
    ├── 02-section-header.html
    ├── 03-title-and-body.html
    ├── 04-two-column.html
    └── 05-palette-reference.html
```

Open `index.html` in any browser to see the deck. Each file in
`slides/` is a standalone page so you can copy one as a starting
template for a new slide.

## Slide canvas

- Aspect ratio **16:9**
- Logical size **1280 × 720 px** (matches the source deck's 10″ × 5.625″)
- Safe-area padding **5.3% top/bottom, 3% left/right**
- Slide is wrapped in `.slide-stage`, which downscales it on narrower
  screens so layouts stay pixel-true.

## Color palette

| Token                       | Hex      | Use                                |
|-----------------------------|----------|------------------------------------|
| `--color-bg`                | `#FFFFFF`| Slide background                   |
| `--color-bg-subtle`         | `#F5F5F5`| Code blocks, off-white panels      |
| `--color-text-primary`      | `#161616`| Body and headings                  |
| `--color-text-secondary`    | `#595959`| Sub-headings, captions             |
| `--color-text-muted`        | `#808080`| Footnotes, page numbers            |
| `--color-text-disabled`     | `#B8B8B8`| Disabled labels                    |
| `--color-accent-purple`     | `#694BFB`| Primary brand accent               |
| `--color-accent-orange`     | `#FF5401`| Highlights, warnings               |
| `--color-accent-mint`       | `#94E4CC`| Success, "after" states            |
| `--color-accent-yellow`     | `#FFE146`| Callouts                           |
| `--color-accent-blue`       | `#428EFF`| Links, info                        |
| `--color-accent-pink`       | `#FF81EF`| Decorative                         |
| `--color-pastel-purple`     | `#B8B8FF`| Soft fills (tags, chips)           |
| `--color-pastel-peach`      | `#FFC2A5`| Soft fills                         |
| `--color-pastel-mint`       | `#D2FCEE`| Soft fills                         |
| `--color-pastel-yellow`     | `#FFF3B5`| Soft fills                         |
| `--color-pastel-pink`       | `#FFCCF9`| Soft fills                         |

## Typography

The source deck uses **Helvetica Neue** family for everything except code
(Source Code Pro) and the occasional decorative element (Montserrat).
Helvetica Neue is available system-wide on macOS/iOS; on other systems
the stack falls back to Helvetica → Arial.

| Token                  | Family               | Default size | Used for                                  |
|------------------------|----------------------|--------------|-------------------------------------------|
| `--font-display-light` | Helvetica Neue Light | 52pt+        | Cover titles, big numbers                 |
| `--font-display`       | Helvetica Neue       | 24–32pt      | Section headers (bold)                    |
| `--font-body`          | Helvetica Neue Light | 12pt         | Body, lists, captions                     |
| `--font-body-strong`   | Helvetica Neue       | 12–14pt      | Slide titles, key labels                  |
| `--font-mono`          | Source Code Pro      | 12pt         | Code, eyebrow labels, technical text      |
| `--font-mono-semibold` | Source Code Pro SB   | 14pt         | Section labels in code style              |
| `--font-decorative`    | Montserrat Medium    | varies       | Rare decorative use only                  |

Size scale (in points to match the source deck): **80 / 60 / 52 / 40 /
32 / 24 / 20 / 18 / 16 / 14 / 13 / 12 / 10**.

Ready-to-use typography classes are in `slide.css`:

- `.t-cover-xl` `.t-cover-l` `.t-cover` — cover titles
- `.t-section` — section header
- `.t-h1` … `.t-h5` — content headings
- `.t-slide-title` — the 14pt bold slide title (top-left of every content slide)
- `.t-subtitle` `.t-body` `.t-body-strong` `.t-caption` — running text
- `.t-mono` `.t-mono-bold` — code and eyebrow labels

## Slide layout patterns

Each pattern is a `.slide` element with a modifier class:

```html
<section class="slide slide--cover">…</section>          <!-- big title -->
<section class="slide slide--section">…</section>        <!-- chapter break -->
<section class="slide slide--content">…</section>        <!-- title + body -->
<section class="slide slide--two-col">…</section>        <!-- two columns -->
<section class="slide slide--one-col">…</section>        <!-- title-on-left -->
```

Every content slide should include:

```html
<h3 class="slide__title">…</h3>     <!-- 14pt bold, top-left -->
<div class="slide__body">…</div>    <!-- 12pt light body -->
<div class="slide__page-num">07</div>
```

## Guidelines for an AI agent generating new slides

1. **Start every slide with `<section class="slide slide--{layout}">`**, where
   `{layout}` is `cover`, `section`, `content`, `two-col`, or `one-col`.
2. **Use the CSS variables (or the typography utility classes), never
   hardcoded hex codes or font names.** Example: `color: var(--color-accent-orange);`
   instead of `color: #FF5401;`.
3. **Keep body text at 12pt (`--size-body`) and slide titles at 14pt bold
   (`.slide__title` / `--size-subtitle`).** This is the deck's rule.
4. **Cover and section slides use Helvetica Neue Light at 32–52pt, with
   tight leading and slight negative letter-spacing** — apply `.t-cover` or
   `.t-section` for these.
5. **Accents should be used sparingly** — one bright accent per slide as a
   rule; pastel accents are appropriate for tags, soft fills, callout
   backgrounds.
6. **For "before/after" or comparison slides, use `slide--two-col`** and
   tint each column's eyebrow label with `var(--color-accent-orange)` and
   `var(--color-accent-purple)` respectively (this matches the source deck).
7. **For code, use `<code>` inline or `<pre class="code-block">` block** —
   both pick up the Source Code Pro font and `--color-code-bg` (#F5F5F5).
8. **For tags / pills, use `.tag` with a pastel modifier** (`.tag--mint`,
   `.tag--purple`, etc.).
9. **Page numbers go in `.slide__page-num`** in the bottom-right corner.
10. **The slide is fixed at 1280 × 720**; don't change those dimensions
    or layouts will reflow unexpectedly.

## How to consume the tokens programmatically

`tokens/tokens.json` follows a simple `category.subcategory.name`
structure. Quick example for any agent or generator:

```js
import tokens from "./tokens/tokens.json" assert { type: "json" };

const purple   = tokens.color.accent_bright.purple;          // "#694BFB"
const bodySize = tokens.typography.size_pt.body;             // 12
const slideW   = tokens.slide.size_px_base.width;            // 1280
const role     = tokens.typography.roles.cover_title;        // { family, size_pt, … }
```

## Webfonts

`theme.css` `@import`s Source Code Pro and Montserrat from Google Fonts.
Helvetica Neue is system-only; that's deliberate — the deck assumes
modern Apple devices. If you need cross-platform Helvetica Neue, host
the woff2 files yourself (the original PPTX has them embedded under
`ppt/fonts/`) and add a corresponding `@font-face`.

## Provenance

- Source file: `Шаблон Dodo Engineering (светлая).pptx`
- OOXML internal theme name: `Simple Dark` (used as both the source
  file's internal palette and the basis for the light variant)
- Slide masters analyzed: 1
- Slide layouts analyzed: 22 (CUSTOM, TITLE, SECTION_HEADER,
  TITLE_AND_BODY, TITLE_AND_TWO_COLUMNS, ONE_COLUMN_TEXT, plus
  custom section-break variants)
- 70+ content slides scanned for color and typography aggregates
