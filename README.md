# KMP without rewriting the app

> A conference talk on adopting **Kotlin Multiplatform** in a mature,
> production iOS + Android app — *without* a rewrite, and without forcing
> one platform's architecture onto the other.

**Max Kachinkin** · Tech & Team Lead, Drinkit Mobile · Dodo Engineering
Bereke Android Meetup · GDG Almaty · 28 May 2026

### ▶︎ [View the slides →](https://makzimi.github.io/kmp-without-rewriting-the-app/)

The deck is a self-contained static site — open the link above, then use
`→` / `Space` to advance, `O` for the overview grid, `F` for fullscreen.

---

## What the talk is about

Drinkit ships a thick, design-heavy app on both iOS and Android. The two
codebases evolved their own architectures. This talk is the honest story
of introducing KMP into that reality:

- Why a full rewrite was never on the table.
- The wrong ways to share code (and why each one breaks).
- A pattern that shares the **domain** without dictating either platform's
  UI or data layer — *thick* native shells, a *glue* layer, a KMP *bridge*.
- What actually shipped, and the advice that generalizes.

The deck has **114 slides**, with real trimmed code from the Drinkit
codebase and hand-drawn architecture diagrams.

## Repository layout

```
.
├── presentation/          ← the deployed deck (this is the published site)
│   ├── index.html         ← all 114 slides, fixed 1280×720, in plan order
│   ├── css/               ← theme + slide primitives + deck runtime/animations
│   ├── js/nav.js          ← keyboard / touch nav, scaling, overview, fullscreen
│   ├── assets/            ← screenshots, diagrams, short videos
│   ├── README.md          ← how to run the deck locally
│   └── AUTHORING.md       ← how the deck is built and how to edit it
├── PRESENTATION_PLAN.md   ← the talk script — slide-by-slide intent + notes
├── iOS-ARCHITECTURE.md    ← the Drinkit iOS module/layer story (kept in sync)
├── ASSETS.md              ← asset checklist
└── dodo-theme/            ← reference design theme (palette, typography)
```

The three artifacts `PRESENTATION_PLAN.md`, `presentation/index.html`, and
`iOS-ARCHITECTURE.md` are kept **in sync** — see `presentation/AUTHORING.md`
for the rule.

## Run it locally

It's a plain static site; any file server works:

```bash
cd presentation
python3 -m http.server 8000
# → open http://localhost:8000
```

Best viewed in **Chrome** (the deck uses inline autoplay/loop `<video>`).

## How it's published

Every push to `main` triggers `.github/workflows/pages.yml`, which uploads
`presentation/` as the GitHub Pages artifact and deploys it to the site
root. No build step.

## Credits

Built with the **Dodo Engineering** theme. Slides, code samples, and
diagrams © Dodo Brands / Max Kachinkin, shared for the talk.
