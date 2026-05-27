# Working on this repo

This is the source for a single conference talk:

> **"KMP without rewriting the app"** — Max Kachinkin · Dodo Engineering · GDG Almaty 2026.

The talk exists in two tightly coupled artifacts. **You must keep them in sync.**

| File | Role |
|---|---|
| [`PRESENTATION_PLAN.md`](PRESENTATION_PLAN.md) | The talk script — slide intent, speaker notes, code citations, image needs. Source of truth for what the talk *says*. |
| [`presentation/index.html`](presentation/index.html) | The deck rendered to the audience. Source of truth for what the audience *sees*. |

## The one rule you must not break

**Every slide change touches `PRESENTATION_PLAN.md` AND `presentation/index.html`.**
They are joined by slide number — each `<section>` in `index.html` has an HTML
comment `<!-- N · TYPE · short title -->` that mirrors the plan's
`### Slide N | TYPE | short title` heading verbatim.

If a user asks you to "edit slide 77", "add a slide after 88",
"remove slide 100", or "reorder these slides", you **must** apply the
change to both `PRESENTATION_PLAN.md` and `presentation/index.html`
in the same response. Renumbering cascades — handle it.

The exception: if the user is asking about *speaker notes only*
(the `Speaker:` line in a plan entry), only the plan changes.

## Before you make slide changes, read this

[`presentation/AUTHORING.md`](presentation/AUTHORING.md) is the
authoring guide. It covers:

- The sync rule (in detail) + shell sanity-checks to verify a renumber.
- The 6 slide layout types and which plan `TYPE` maps to which.
- Recipes for: edit text, change layout, add slide, remove slide, reorder.
- Code blocks (with the hand-rolled `tok-*` token classes — no syntax-highlighter library).
- Diagrams (inline SVG conventions + theme colors).
- Phone-mock placeholders → how to swap in real screenshots later.
- BIG-WORD slide variants and the "one accent per slide" rule.
- Two-column compare convention (orange eyebrow left, purple eyebrow right).
- Animations and the "one slide = one event" rule.
- Spacing/padding via CSS variables (never magic numbers, never raw hex).
- Runtime (`presentation/js/nav.js`) — how to add a shortcut or nav button.
- Fullscreen mode.

**Read AUTHORING.md before touching slides.** It will save you from
common mistakes (editing the mirrored `theme.css` / `slide.css` files
in `presentation/css/`, hardcoding colors, breaking the canvas size,
etc.).

## Sanity checks after any slide change

```bash
# 1) Slide count in deck matches plan:
grep -c '<section class="slide ' presentation/index.html
grep -cE '^### Slide [0-9]+ ' PRESENTATION_PLAN.md
# These two numbers must be equal.

# 2) Comment markers in the deck are 1..N with no gaps or dupes:
grep -oE '<!-- ([0-9]+) ' presentation/index.html \
  | awk '{print $2+0}' | sort -n | uniq -c | awk '$1!=1'
# This prints nothing if the deck is clean.

# 3) Plan and deck still serve over HTTP without errors:
cd presentation && python3 -m http.server 8000
# → open http://localhost:8000 and click through the changed slides.
```

## Project layout

```
.
├── CLAUDE.md                  ← this file (auto-loaded)
├── PRESENTATION_PLAN.md       ← talk script, slide-by-slide
├── ASSETS.md                  ← v3 asset checklist (what's still missing)
├── docs/superpowers/          ← specs + plans for iteration cycles
│   ├── specs/
│   └── plans/
├── code-examples/             ← real source files cited in code slides
│   ├── android-app-sampels/
│   ├── ios-app-samples/
│   └── drinkit-mobile-kmp/    ← multi-module: combo · ai · core · framework
├── dodo-theme/                ← reference theme (palette, typography, primitives)
│   ├── README.md              ← read this for theme rules
│   ├── css/theme.css          ← canonical theme (copied into presentation/)
│   ├── css/slide.css          ← canonical slide primitives (copied into presentation/)
│   └── slides/*.html          ← reference slides per layout type
└── presentation/              ← the actual deliverable
    ├── README.md              ← how to run
    ├── AUTHORING.md           ← how to edit (read this!)
    ├── index.html             ← 114 slides, in plan order
    ├── css/{theme,slide}.css  ← mirrors of dodo-theme; DO NOT EDIT HERE
    ├── css/deck.css           ← deck-specific styles + animations
    ├── js/nav.js              ← runtime: nav, scaling, fullscreen, overview
    └── assets/                ← portrait, qr, screens/, diagrams/, media/, mocks/
```

## Conventions worth remembering

- `presentation/css/theme.css` and `presentation/css/slide.css` are
  **mirrors** of `dodo-theme/css/`. If a theme change is needed, edit
  the dodo-theme originals and `cp` them over — never edit the
  mirrors directly.
- Use **CSS variables** from `theme.css` (`var(--color-accent-purple)`,
  `var(--space-4)`, etc.) — never hardcoded hex codes or px values.
- Use **typography utility classes** (`t-h2`, `t-body`, `t-mono`,
  `t-cover-l`, etc.) — never raw `font-family` / `font-size` in inline
  styles.
- Slide canvas is **fixed at 1280×720**. Don't change it. The runtime
  scales the canvas to the viewport.
- Code in code slides is **trimmed real code** — pull from
  `code-examples/`, strip imports/docstrings, keep the interesting part
  in 10–25 lines.

## When the user asks you to edit slides

A good prompt format: *"Edit slide N — change X to Y. Update the plan
too."* — number lets you find the slide unambiguously.

If you get a vague prompt ("make the architecture slide nicer"), ask
**which slide number** before changing anything. Multiple slides
share similar topics (the talk has 11 diagrams across 7 sections).

## Synced artifacts

The synced-files set is two files: `PRESENTATION_PLAN.md` +
`presentation/index.html`. (A third, `iOS-ARCHITECTURE.md`, existed from
v2 until v3.3 and was then removed; some dated `docs/superpowers/` design
records still mention it as history.) Tags: `v1` = Initial commit, `v2` =
post-restructure deck.
