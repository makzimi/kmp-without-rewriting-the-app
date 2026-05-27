# KMP without rewriting the app — slides

HTML/CSS/JS presentation for the talk **"KMP without rewriting the app"**
by Max Kachinkin · Dodo Engineering · GDG Almaty 2026.

All 114 slides from [`../PRESENTATION_PLAN.md`](../PRESENTATION_PLAN.md) are
rendered as one self-contained static page. Styling reuses the
**Dodo Engineering** theme (`../dodo-theme`) — palette, typography, and
slide layout primitives.

## Run it

It's a static site — anything that serves files will do. Pick whichever
is easiest:

```bash
# 1) Python (no install needed if you have python3)
cd presentation
python3 -m http.server 8000
# → open http://localhost:8000

# 2) Node
cd presentation
npx --yes http-server -p 8000 -c-1
# → open http://localhost:8000

# 3) Just double-click index.html
# (also works — no server needed; fonts load over HTTPS from Google Fonts)
```

Tested in Chrome, Safari, and Firefox. Recommended: present in **Chrome
fullscreen** on macOS with a dark menubar — the deck assumes Helvetica
Neue, which Apple devices have natively.

To enter fullscreen: click the fullscreen button in the bottom-center
nav (icon with four corner brackets), or press `F`. While presenting,
the cursor auto-hides after a couple seconds of inactivity.

> **Editing the deck?** See [`AUTHORING.md`](AUTHORING.md) — it's the
> guide for changing slides, adding images, tweaking padding, or
> doing anything else to the deck. It explains the **plan ↔ deck
> sync rule** that the next editor must follow.

## Controls

| Key                       | Action                          |
|---------------------------|---------------------------------|
| `→` `Space` `PageDown` `l`| Next slide                      |
| `←` `PageUp` `h`          | Previous slide                  |
| `Home` / `End`            | Jump to first / last            |
| `O` / `Esc`               | Toggle overview grid            |
| `F`                       | Toggle fullscreen               |
| `G`                       | Go to slide # (prompts)         |
| swipe ←/→ on touchscreen  | Prev / Next                     |
| URL `#42`                 | Deep-link to slide 42           |

The current slide is always reflected in the URL hash so you can share
a link to any slide.

## Export to PDF

```
1. Open the deck in Chrome.
2. ⌘P (Print).
3. Destination: "Save as PDF".
4. Layout: Landscape.
5. Margins: None.
6. Paper size: any 16:9 (e.g. 1280×720) or A4 landscape.
7. Background graphics: ON.
```

`@media print` in `css/deck.css` already flattens all 114 slides into
sequential pages with page-break-after, hides the nav chrome, and keeps
colors and shadows. One slide per page.

## File layout

```
presentation/
├── README.md              ← this file
├── index.html             ← all 114 slides, in plan order
├── css/
│   ├── theme.css          ← copy of dodo-theme tokens (palette, fonts)
│   ├── slide.css          ← copy of dodo-theme slide primitives
│   └── deck.css           ← deck runtime: scaling, animations, slide types
└── js/
    └── nav.js             ← keyboard / touch / overview / hash sync
```

The first two CSS files are copied verbatim from `../dodo-theme/css/`
to keep the deck self-contained — if you tweak the theme there, just
re-copy them. `deck.css` is presentation-specific (animation classes,
big-word slide type, phone mocks, code-block tints, etc.).

## How the deck is built

- **One slide per `<section class="slide slide--TYPE">`**, where `TYPE`
  is one of `cover` · `section` · `content` · `two-col` · `bigword` ·
  `transition`. Types come straight from the plan's slide-naming
  convention.
- Each slide is **fixed at 1280 × 720** logical pixels (16:9, matches
  the source PowerPoint). `js/nav.js` computes a uniform scale to fit
  the viewport.
- Page numbers (`01` … `114`) are stamped automatically by `nav.js`,
  so you don't have to keep them in sync when you reorder slides.
- The talk's **screenshots, photos, videos, and architecture diagrams**
  live in `assets/` and are wired in via `<img>`/`<video>` tags. Slides
  without a real asset yet still use styled CSS placeholders (phone
  frames, drink-card grids, ingredient sliders) — see
  [`../ASSETS.md`](../ASSETS.md) for the v3 checklist.
- A few **schematic diagrams** (slides 14 silhouette teaser, 49
  greenfield tree, 75 stateful-feature shape, 80 three-sockets) are
  inline SVG. The load-bearing architecture diagrams (Android/iOS
  architecture, vertical slice, full picture, transport flow) are
  hand-drawn PNGs in `assets/diagrams/`.
- **Animations** are intentionally restrained: `pop-in` for BIG-WORD,
  per-line stagger for compacted multi-line BIG-WORDs, `rise-in` for
  bullets/staggers, `slide-from-left/right` for compare slides,
  `draw-rule` for section headers. Honors `prefers-reduced-motion`.

## Assets

Real assets live in `assets/` with these subfolders:

- `screens/` — app screenshots (PNG)
- `diagrams/` — hand-drawn architecture diagrams (PNG)
- `media/` — short videos (WEBM/VP9; play inline via `<video autoplay loop muted playsinline>`)
- `mocks/` — designed mockups (reserved for v3 — bug-ticket, KMP-getting-started screenshot)

The deck is best viewed in **Chrome** because it relies on `<video>`
autoplay + loop + muted + playsinline, which all current browsers
support but Chrome handles most predictably for a long-running deck.

See [`../ASSETS.md`](../ASSETS.md) for the list of assets still
needed before v3.

## Tweaking content

To edit a slide, find its comment marker (e.g. `<!-- 77 · CODE ... -->`)
in `index.html` and edit in place. Page numbers and counts update
automatically. Re-ordering is fine — just move whole `<section>` blocks
around.

To add a new slide, copy any existing `<section class="slide …">` and
drop it where you want it. The runtime picks it up on reload.

## Provenance

- Plan: [`../PRESENTATION_PLAN.md`](../PRESENTATION_PLAN.md) — every
  slide here matches one entry in the plan, in the same order.
- Theme: [`../dodo-theme/`](../dodo-theme) — palette, typography,
  layout primitives, written guidance for slide construction.
- Code samples: cited paths inside `../code-examples/`. Snippets in the
  deck are trimmed to fit a slide (imports/docstrings stripped per the
  plan's "trimmed real snippet" convention).
