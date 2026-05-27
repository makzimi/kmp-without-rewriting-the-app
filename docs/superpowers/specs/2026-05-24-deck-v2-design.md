# Deck v2 — design spec

| Field | Value |
|---|---|
| Authored | 2026-05-24 |
| Author | Claude (with Max Kachinkin) |
| Status | Approved — ready for implementation plan |
| Scope | Single iteration covering content changes + asset wiring + doc sync |
| Implements | The conversation summarised in §0 |

---

## 0. What this spec covers

The KMP-talk deck is going from v1 (its current Initial-commit state) to v2: a
restructured, shorter, more polished version that is also better-grounded in the
KMP project's actual module layout (which was refactored after v1 was written).

**v2 ships:**

- BIG-WORD slide compaction (134 → ~115 slides)
- A new, realistic slide 34 (replace the toy "5th coffee free" example with a
  combo-domain-logic divergence)
- Restructure of Part 5 + Part 6 to make `combo` (pure-function pattern) the
  primary pilot, with the AI feature as a secondary "scales up to stateful"
  example
- Wiring of 13 image slides using assets the user has already provided
- Code-path captions updated to the new KMP module layout (`core/` + `ai/` +
  `combo/` instead of the old single `shared/`)
- Doc sync: `CLAUDE.md`, `AUTHORING.md`, `README.md`, `iOS-ARCHITECTURE.md` all
  reflect v2's reality
- A `ASSETS.md` checklist at repo root documenting what v3 still needs

**v2 explicitly does NOT ship:**

- Wiring of 4 image slides + 2 new combo diagrams the user hasn't provided yet
  (slides 16, 37, 48, 70-v2; `pure-function-pattern.png`; `combo-module-surface.png`)
- Changes to anything under `code-examples/` — those are real source files, not
  presentation artifacts; the user is iterating on them separately
- Build/CI setup, automated tests, or any tooling beyond what's already there

Those defer to **v3**, which is a separate small iteration unblocked whenever
the missing assets land.

---

## 1. Goals & non-goals

### Goals

1. **Shorter, punchier talk** — collapse the 6 most redundant BIG-WORD chains so
   the talk averages closer to the 22-minute target without losing any beat.
2. **More credible domain example** — replace the toy "5th coffee free"
   illustration with a combo-resolver divergence that audiences will immediately
   recognise as the kind of complex client-side logic that gets reimplemented
   incorrectly across platforms.
3. **Generalise the KMP integration story** — present *two patterns* (pure
   function with no platform deps; stateful feature with three sockets) so the
   audience leaves with a portable mental model rather than "you can use KMP
   for AI features".
4. **Land what we can land now** — wire in every asset the user has provided so
   v2 is a presentable deck even if v3 never happens.
5. **Stay maintainable** — every change propagates to all the docs that
   describe the deck, and the deck's structure makes future iterations easier
   (e.g., assets organised by content not by slide number, diagrams as
   replaceable image files where they're hand-drawn).

### Non-goals

- Re-theming the deck or changing the canvas size.
- Adding any build step (it stays a static HTML/CSS/JS deck).
- Adding syntax-highlighter library, framework, or bundler.
- Changing the runtime navigation (`js/nav.js`) — it works fine as-is.
- Generalising into a multi-talk template engine — this is a one-talk repo.

---

## 2. Content changes

### 2.1 BIG-WORD compaction — the six chains

Six same-idea BIG-WORD chains collapse into one slide each, staggering the lines
in via the existing `.stagger` animation. The current `pop-in` BIG-WORD effect
is preserved per-line by combining `.bw` with `.stagger`.

| Slides collapsing | New single slide says (lines stagger in) |
|---|---|
| 30, 31, 32, 33 | Same logic. / Two languages. / Two implementations. / Two sets of **bugs**. |
| 43, 44, 45 | Every feature × 2. / Every change × 2. / Every fix × 2. |
| 64, 65, 66 | Don't replace a layer. / Replace **nothing**. / **Add.** One feature. |
| 85, 86, 87 | We did **not** replace network. / data layer. / DI. *(then slide 88 "What we DID" remains as its own beat)* |
| 104, 105, 106 | Shared declares need. / Host fulfils it. / Nothing else changes. |
| 110, 111 | Forcing it = resentment. / It feels unfair. |

**Net slide count:** 134 → 124 from this step alone. Further reductions come
from the Part 5+6 restructure (§2.3), landing the final total at ~115.

**Animation:** add `class="stagger"` to the new BIG-WORD container; wrap each
line in a `<span>` or `<div>`. The existing `.stagger > *:nth-child(n)` rules
in `deck.css` already give the right delays (0.05s, 0.15s, 0.25s, …). The
existing `.slide--bigword .bw { animation: pop-in }` rule fires once on the
container — that's fine; the children get the staggered rise-in. If the
container `pop-in` competes with the per-line rise-in visually, override the
container animation to a plain `fade-in` for these slides.

**Slides that DO NOT collapse, by deliberate design:**

- Slide 50 "We are not greenfield." — single beat that punches a reset
- Slide 75 "One method." + 76 "One result type carries the contract." —
  separates the two reveals (interface vs the sealed type)
- Slides 38/39 "Is this a bug? / No source of truth." — different ideas; the
  question/answer rhythm is intentional
- Slides 12/13 "Same outside. / Two different worlds inside." — load-bearing
  setup of the talk's central tension
- Slides 92/93 "Ktor on top. / Custom engine underneath." — different sentences
  giving the technique its two halves
- All section-header slides — those are chapter markers, not BIG-WORDs

### 2.2 Slide 34 — combo-domain divergence

**Current slide 34** is a side-by-side Kotlin/Swift implementation of "every
5th coffee is free", with a contrived `discountPercent`/`discountPct` field
name divergence (the divergence isn't even shown in the rendered code).

**New slide 34** keeps the same `slide--two-col` layout but replaces the bodies
with two parallel implementations of a combo-slot picker — modelled on the real
`ComboResolver.pickSlots()` in `code-examples/drinkit-mobile-kmp/combo/`, but
trimmed to fit a slide.

**The divergence chosen:** Kotlin (Android) dedups across slots — step 2 of the
picking algorithm skips products already picked by an earlier slot. Swift (iOS)
does not dedup. The audience can read both side by side and probably won't spot
the difference for 5 seconds; that's the whole point.

**Slide title:** `A real combo rule — implemented twice.`

**Layout details:** existing `slide--two-col`. Left column: orange eyebrow
`// android — Kotlin (live)`. Right column: purple eyebrow `// ios — Swift
(also live)`. We deliberately do **not** label which is wrong on the slide;
that's the speaker's reveal.

**Kotlin block (~14 lines, hand-trimmed from real `ComboResolver.pickSlots`):**

```kotlin
fun pickSlotProduct(
    slot: Slot,
    alreadyPicked: Set<String>,
): String {
    val default = slot.products.firstOrNull { it.id == slot.defaultProductId }
    if (default != null && !default.isInStop && default.id !in alreadyPicked) {
        return default.id
    }
    val fresh = slot.products.firstOrNull {
        !it.isInStop && it.id !in alreadyPicked      // <- dedups
    }
    if (fresh != null) return fresh.id

    return slot.products.firstOrNull { !it.isInStop }?.id
        ?: slot.products.first().id
}
```

**Swift block (~14 lines, intentionally drifted):**

```swift
func pickSlotProduct(
    slot: Slot,
    alreadyPicked: Set<String>
) -> String {
    if let d = slot.products.first(where: { $0.id == slot.defaultProductId }),
       !d.isInStop {                                  // <- no dedup check
        return d.id
    }
    if let fresh = slot.products.first(where: { !$0.isInStop }) {
        return fresh.id                               // <- no dedup check
    }
    return slot.products.first!.id
}
```

**Speaker note (in the plan only):** "Both compile, both ship, both look right.
The Swift version forgot the dedup rule — so on iOS, the same product can fill
two slots of the same combo. Real bug we caught in QA. Not a 'find the typo'
slide. The point is: this kind of thing is invisible until it ships."

### 2.3 Part 5 + Part 6 restructure — combo first, AI second

**Current arc (v1):**
- Part 5 (slides 63–88, 26 slides): "How we actually started" → walkthrough of
  the **AI feature** as the pilot
- Part 6 (slides 89–106, 18 slides): HttpTransport workaround
- The audience implicitly learns "KMP is for AI features"

**New arc (v2):**

| Part | Slides (approx) | Focus |
|---|---|---|
| 5 — One feature, domain only | ~12 | The **combo** module as the primary pilot. Pure function. No platform deps. ComboTemplate → ComboResolver.resolve() → ComboResolution. Two diagrams: pure-function-pattern + combo-module-surface (deferred to v3). Code excerpts: ComboTemplate, resolve() signature, one of the picking branches, one of the price branches. |
| 6 — When the feature needs more | ~12 | The **AI feature** as the "stateful, has platform-specific deps" case. Three sockets: HttpTransport, ToolsProvider, PromptsProvider. Drop Koog-specific naming (`Koog agent` → `agent framework`; don't show `KoogAiServiceImpl`). Keep AiService, AiServiceFactory (renamed mentally to "shape your factory after this"), CreatedDrinkResult as illustrative. DrinkitLab triptych as the "what this feature actually does" intro. |
| 7 — The HTTP transport socket | ~12 | Was Part 6 in v1. Stays largely as-is. Caption tweaks to match new framing ("the socket your stateful feature plugs into"). |

**The detailed v2 slide list for Parts 5–7** is enumerated below. Slide numbers
are post-renumber (post §2.1 compaction). They will need confirmation against
the actual deck during implementation.

#### Part 5 — One feature, domain only (~12 slides)

| # | Type | Content |
|---|---|---|
| P5-1 | SECTION | "5 · One feature. Domain only." (chapter break) |
| P5-2 | BIG-WORD | "Don't replace a layer. / Replace nothing. / Add. One feature." (the collapsed 64–66) |
| P5-3 | DIAGRAM | Vertical slice (uses `assets/diagrams/vertical-slice-base.png` then on click `vertical-slice-highlighted.png` — two states on one slide using `.is-active` toggle on the image OR two sequential slides; pick the cleaner option in implementation) |
| P5-4 | BIG-WORD | "What hurts? / Domain logic — that's what we share." (the existing 68+69 collapsed by overlap; keep if punchy enough, otherwise drop one) |
| P5-5 | IMAGE | Combo pilot intro — uses placeholder phone OR `combo-builder.png` (deferred) |
| P5-6 | BULLETS | "Why combo: rules + pricing + slot picking + cross-slot dedup. Complex. Same on iOS/Android. Pure function — no IO, no state." |
| P5-7 | DIAGRAM | Pure-function pattern (deferred to v3 — placeholder for now) |
| P5-8 | CODE | `ComboTemplate` model — trimmed to ~16 lines |
| P5-9 | CODE | `ComboResolver.resolve()` signature + 4-line body showing it's a pure orchestrator |
| P5-10 | CODE | The 4-step picking rule — trimmed `pickSlots()` |
| P5-11 | CODE | Price computation excerpt — `computeTotalPrice` |
| P5-12 | BIG-WORD | "Inputs in. Result out. No platform deps." |

#### Part 6 — When the feature needs more (~12 slides)

| # | Type | Content |
|---|---|---|
| P6-1 | SECTION | "6 · When the feature needs more." |
| P6-2 | IMAGE | DrinkitLab triptych — `drinkit-lab-1/-2/-3.png` side-by-side in `.phones` grid |
| P6-3 | BULLETS | "AI drink builder. Stateful. Talks to a backend. Reads the menu. Reads remote config. Same logic on both platforms — but now there's plumbing." |
| P6-4 | BIG-WORD | "Same idea. More plumbing." |
| P6-5 | DIAGRAM | Stateful feature shape — sockets (still uses the current inline SVG from slide 73 with relabeled title; we don't have a new diagram for this) |
| P6-6 | CODE | `AiService` interface (one method, illustrative of "your stateful feature exposes one or two entry points") |
| P6-7 | CODE | `CreatedDrinkResult` sealed type — illustrative of "use sealed result types so failure modes are exhaustive on both platforms" |
| P6-8 | CODE | `AiServiceFactory` — illustrative of "host gives you the sockets, you give back the feature" |
| P6-9 | DIAGRAM | The three sockets (current slide 79 SVG, retained) |
| P6-10 | BIG-WORD | "Dependency inversion. Apps glue. They don't change." (the existing 81+82+83 collapsed) |
| P6-11 | DIAGRAM | Full picture — `assets/diagrams/full-picture.png` |
| P6-12 | BIG-WORD | "We did NOT replace network / data / DI." + "What we DID: one feature, domain only, sockets out." (existing 85–88 collapsed) |

#### Part 7 — The HTTP transport socket (~12 slides)

Largely the existing Part 6 (89–106). Use the user-provided
`assets/diagrams/transport-flow.png` to replace the inline SVG on what was
slide 96.

### 2.4 Slide ordering after restructure

Approximate final part boundaries (will be confirmed during implementation):

| Part | Old slides | New slides | Δ |
|---|---|---|---|
| 0 — Opener | 1–4 | 1–4 | 0 |
| 1 — Two different apps | 5–14 | 5–14 | 0 |
| 2 — Why client got fat | 15–28 | 15–28 | 0 |
| 3 — Same thing twice | 29–46 | 29–40 (-6) | −6 (chain collapses 30–33, 43–45) |
| 4 — KMP doesn't just work | 47–62 | 41–56 | 0 (relative) |
| 5 — One feature, domain only | 63–88 (was AI) | 57–68 (combo) | −14 (combo arc is leaner) |
| 6 — When feature needs more | (new) | 69–80 (AI repurposed) | new |
| 7 — HTTP transport | 89–106 | 81–92 (-6) | −6 (chain collapse 104–106) |
| 8 — Org / Mobile Engineer | 107–120 | 93–105 (-1) | −1 (110–111 collapse) |
| 9 — Results | 121–130 | 106–115 | 0 |
| 10 — Closing | 131–134 | 116–119 | 0 |

**Total: 134 → ~119 slides** (give or take a few during implementation).

---

## 3. Asset wiring (13 slides)

**Folder structure under `presentation/assets/`** (moved from repo root
`./assets/`):

```
presentation/assets/
├── portrait.jpg
├── qr.png
├── screens/
│   ├── home-{ios,android}.png
│   ├── menu-{ios,android}.png
│   ├── customisation-{ios,android}.png
│   ├── cart-{ios,android}.png
│   ├── customisation-zoom.png
│   └── drinkit-lab-{1,2,3}.png
├── diagrams/
│   ├── android-architecture.png         (renamed from mocks/51.png)
│   ├── ios-architecture.png             (renamed from mocks/52.png)
│   ├── vertical-slice-base.png          (renamed from mocks/67-1.png)
│   ├── vertical-slice-highlighted.png   (renamed from mocks/67-2.png)
│   ├── full-picture.png                 (renamed from mocks/84.png)
│   └── transport-flow.png               (renamed from mocks/96.png)
├── media/
│   ├── combo-transition.webm
│   └── microinteraction.webm            (re-encoded to ~10 MB)
└── mocks/                               (reserved for v3 — designed mockups)
```

**Slide-by-slide wiring:**

| Slide (post-renumber) | Asset | Markup |
|---|---|---|
| 2 (About me) | `assets/portrait.jpg` | `<img src="assets/portrait.jpg" alt="Max Kachinkin" style="aspect-ratio:1/1; border-radius:24px; object-fit:cover; box-shadow:var(--shadow-md);">` replacing the gradient placeholder div |
| 6 (Drinkit · iOS) | `assets/screens/home-ios.png` | `<img>` inside the phone frame, replacing the CSS placeholder `.phone__screen` interior |
| 7 (Drinkit · Android) | `assets/screens/home-android.png` | same |
| 8 (side-by-side home) | `home-ios.png` + `home-android.png` | reuse 6 + 7 in `.phones` grid |
| 9 (side-by-side menu) | `menu-{ios,android}.png` | wired into `.phones` grid |
| 10 (side-by-side customisation) | `customisation-{ios,android}.png` | wired into `.phones` grid |
| 11 (side-by-side cart) | `cart-{ios,android}.png` | wired into `.phones` grid |
| 17 (deeply customisable) | `assets/screens/customisation-zoom.png` | replaces the gradient `.phone__hero` placeholder; sized to fit the slide layout |
| 18 (shared element transition) | `assets/media/combo-transition.webm` | `<video src="..." autoplay loop muted playsinline>` inside a phone frame |
| 25 (micro-interaction) | `assets/media/microinteraction.webm` | same `<video>` element pattern |
| Part 6 intro (DrinkitLab triptych) | `drinkit-lab-{1,2,3}.png` | three phones in `.phones` grid, each phone is an `<img>` instead of CSS placeholder |
| 51 (Android arch) | `assets/diagrams/android-architecture.png` | `<img>` replacing the inline `<svg>` block inside `.diagram-wrap` |
| 52 (iOS arch) | `assets/diagrams/ios-architecture.png` | same |
| 53 (side-by-side compare) | both above | two `<img>` in the existing two-column grid |
| 67 (vertical slice) | `vertical-slice-base.png` then `vertical-slice-highlighted.png` | **Two-state slide**: the "base" image shows first, then on next-key advance the "highlighted" image replaces it. Implementation options: (a) one slide with two stacked images and a CSS `.is-revealed` class toggled by an event; (b) split into two consecutive slides. Recommend (b) — simpler and gives the speaker the "click to reveal the slice" beat as a real navigation event. Adds 1 slide. |
| 84 (full picture) | `assets/diagrams/full-picture.png` | `<img>` replacing inline SVG |
| 96 (transport flow) | `assets/diagrams/transport-flow.png` | `<img>` replacing inline SVG |
| 133 (contacts/QR) | `assets/qr.png` | `<img>` replacing the CSS-only `.qr` |

**Phone-frame wiring pattern** (for all screenshot slides):

```html
<!-- before -->
<div class="phone">
  <div class="phone__screen">
    <div class="phone__hero"></div>
    <div class="phone__card"></div>
    ...
  </div>
</div>

<!-- after -->
<div class="phone phone--real">
  <img src="assets/screens/home-ios.png"
       alt="Drinkit iOS home screen"
       class="phone__shot">
</div>
```

Add `.phone--real` and `.phone__shot` rules to `deck.css`:

```css
.phone--real { background: var(--color-text-primary); }
.phone--real::before { display: none; }   /* hide the notch decoration */
.phone__shot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 22px;
}
```

**Video wiring pattern** (for slides 18 + 25):

```html
<div class="phone phone--real">
  <video src="assets/media/combo-transition.webm"
         autoplay loop muted playsinline
         class="phone__shot"></video>
</div>
```

**Diagram wiring pattern** (for slides 51, 52, 67, 84, 96):

```html
<div class="slide__body diagram-wrap">
  <img src="assets/diagrams/android-architecture.png"
       alt="Android architecture: feature modules, per-feature domain layers, core/network at the bottom"
       class="diagram-img">
</div>
```

```css
.diagram-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
```

The existing inline `<svg>` blocks are deleted from `index.html` for the
replaced slides.

**Video compression:** `microinteraction.webm` 49 MB → ~10 MB via:

```bash
ffmpeg -i microinteraction.webm \
  -c:v libvpx-vp9 -b:v 1500k -pass 1 -an -f null /dev/null && \
ffmpeg -i microinteraction.webm \
  -c:v libvpx-vp9 -b:v 1500k -pass 2 -an \
  presentation/assets/media/microinteraction.webm
```

Two-pass VP9 at 1.5 Mbit/s target. If the result is still > 12 MB, drop to
1.2 Mbit/s and re-run. If quality suffers visibly, accept 12–15 MB.

---

## 4. Code-path captions — KMP module split

The KMP project was restructured from a single `shared/` module into
`core/` + `ai/` + `combo/` + `framework/`. Every `<p class="code-caption">` in
the deck that points at a `shared/...` path is stale.

**Updates to make in `index.html` AND `PRESENTATION_PLAN.md`:**

| Old caption path | New caption path |
|---|---|
| `shared/src/commonMain/.../api/AiService.kt` | `ai/src/commonMain/.../api/AiService.kt` |
| `shared/src/commonMain/.../api/model/CreatedDrinkResult.kt` | `ai/src/commonMain/.../api/model/CreatedDrinkResult.kt` |
| `shared/src/commonMain/.../AiServiceFactory.kt` | `ai/src/commonMain/.../AiServiceFactory.kt` |
| `shared/src/commonMain/.../transport/HttpTransport.kt` | `core/src/commonMain/.../transport/HttpTransport.kt` |
| `shared/src/commonMain/.../transport/TransportRequest.kt` | `core/src/commonMain/.../transport/TransportRequest.kt` |
| `shared/src/androidMain/.../transport/OkHttpTransport.kt` | `core/src/androidMain/.../transport/OkHttpTransport.kt` |
| `sampleIos/SampleIos/Network/SampleHttpTransport.swift` | (verify still exists — likely unchanged) |

**New caption paths for the new combo code slides (Part 5):**

| Slide content | Caption path |
|---|---|
| `ComboTemplate` | `combo/src/commonMain/.../combo/model/ComboTemplate.kt` |
| `ComboResolver.resolve()` | `combo/src/commonMain/.../combo/ComboResolver.kt` |
| `pickSlots()` step excerpt | `combo/src/commonMain/.../combo/ComboResolver.kt` |
| `computeTotalPrice()` excerpt | `combo/src/commonMain/.../combo/ComboResolver.kt` |

**`PRESENTATION_PLAN.md` Appendix — code references table** updates to match.

---

## 5. Doc sync

### 5.1 The new golden rule (close the iOS-ARCH gap)

Update `CLAUDE.md` and `presentation/AUTHORING.md` to list three synced
artifacts instead of two:

| Artifact | Role |
|---|---|
| `PRESENTATION_PLAN.md` | What the talk *says* |
| `presentation/index.html` | What the audience *sees* |
| `iOS-ARCHITECTURE.md` | The Drinkit iOS module/layer story — must agree with what slides 51/52/53 portray |

Concretely:

- In `CLAUDE.md`, replace the current "two-artifact" table with a three-artifact
  table; expand the "one rule you must not break" paragraph to mention that
  iOS-architecture changes propagate to `iOS-ARCHITECTURE.md` as well.
- In `AUTHORING.md §0`, mirror the same change.

### 5.2 AUTHORING.md updates

- **§4.2 (Images and photos)** — update the example file paths to reflect the
  new `presentation/assets/{screens,diagrams,media}/` structure. Update the
  "naming" guidance from `s006-ios-home.png` (slide-numbered) to content-based
  names (`screens/home-ios.png`).
- **New §4.3a (External diagrams)** — added between current §4.3 (Diagrams) and
  §4.4 (Phone mockups). Documents that some diagrams are external PNG/SVG
  files; some stay inline SVG. Convention:
    - Hand-drawn / load-bearing diagrams → external PNG in `assets/diagrams/`
      (slides 51, 52, 53, 67, 84, 96 — and 73, pure-function-pattern,
      combo-module-surface when they land in v3)
    - Small / schematic diagrams stay inline SVG (slides 14, 49)
- **§4.4 (Phone mockups)** — note that screenshots now replace the CSS-only
  mockups when assets are wired in. Show the `.phone--real` / `.phone__shot`
  pattern.
- **§7 / §8** — no changes (runtime didn't change).
- **§10 (read these files in order)** — add `iOS-ARCHITECTURE.md` to the list.

### 5.3 README updates

- **`presentation/README.md`** — add a paragraph after the "How the deck is
  built" section explaining the `assets/` folder structure. Note that video
  files require modern browsers; recommend Chrome for presenting.

- **`dodo-theme/README.md`** — no changes.

- **`code-examples/drinkit-mobile-kmp/README.md`** — out of scope (user
  iterating on it separately).

### 5.4 iOS-ARCHITECTURE.md updates

The user's slide-52 hand-drawn diagram is more abstract than the current
`iOS-ARCHITECTURE.md` — it shows `app → presentation → UI → domain`
top-to-bottom with the four cluster labels (features / UI / domain / common)
floating to the left. `iOS-ARCHITECTURE.md` has the full SwiftUI package graph
(DrinkitAPI, DrinkitUI, DrinkitUIKit, DrinkitNetwork, etc.).

**Decision:** they're at different zoom levels — the slide is the "30,000 ft"
view, the doc is the "ground level" view. They don't contradict each other.
Add a one-line preamble to `iOS-ARCHITECTURE.md` noting "the talk's slide 52
shows a higher-level view of this same structure". No graph changes needed.

### 5.5 CLAUDE.md changes besides §5.1

- Refresh the "Project layout" tree to include `docs/` and the v2-shaped
  `presentation/assets/` subtree.
- No other changes.

---

## 6. ASSETS.md — v3 checklist

A new file `ASSETS.md` at the repo root, structured as a single checklist the
user can tick off as assets land. v3 wiring becomes purely mechanical once each
file is in place.

**Format:**

```markdown
# Assets needed for v3

When all of these are in `presentation/assets/`, v3 = wire them in. No
structural changes required.

## Missing screenshots

- [ ] `screens/menu-hero.png` — zoomed-in menu, either platform (slide 16)
- [ ] `screens/combo-builder.png` — combo selection UI (slide 70 / new Part 5)

## Missing designed mockups

- [ ] `mocks/bug-ticket.png` — Slack/Jira ticket mock (slide 37)
- [ ] `mocks/kmp-getting-started.png` — screenshot of kotlinlang.org getting-started (slide 48)

## Missing diagrams (PNG, content-based names)

- [ ] `diagrams/pure-function-pattern.png` — data-in → ComboResolver → data-out (Part 5)
- [ ] `diagrams/combo-module-surface.png` — Template + Resolver + Resolution boxes (Part 5)
- [ ] `diagrams/stateful-feature-shape.png` — *optional* — would replace slide 73's inline SVG

## QR code

- [ ] The `assets/qr.png` already exists, but the URL it encodes is TBD. Confirm
      the URL points to the public slides + sample-KMP repo before the talk.

## Other

- [ ] Slide 133 social handles — currently placeholders (`/maxkach`, `@maxkach`).
      Confirm real handles before the talk.
```

---

## 7. Git workflow

1. **Before starting v2:** `git tag v1` at the current commit (`9a34d00`).
   Push tag if remote exists.
2. **During v2:** work on `main`. No branch ceremony. Make incremental edits.
3. **Implementation plan execution** uses TaskCreate to track per-section
   progress; commits stay on `main`.
4. **At end of v2:**
   - Run the CLAUDE.md sanity checks (slide count match, comment-marker gaps,
     plan/deck slide count).
   - Manually verify the deck in a browser (open `http://localhost:8000`,
     click through every slide).
   - One commit:
     `git commit -m "v2 · compact BIG-WORD chains, combo pilot, real assets, doc sync"`
   - Tag: `git tag v2`.

**No squashing of intermediate commits** if multiple commits accrue during
implementation — the implementation plan may produce 3-5 commits naturally
(e.g. one per major change-thread). That's fine; keep them and tag the final
commit as `v2`.

---

## 8. Acceptance criteria for v2

v2 is "done" when **all** of the following hold:

1. `grep -c '<section class="slide ' presentation/index.html` ≈ 115–120.
2. `grep -cE '^### Slide [0-9]+ ' PRESENTATION_PLAN.md` equals the above.
3. Comment-marker gap check from CLAUDE.md prints nothing.
4. Every collapsed chain in §2.1 is one slide with stagger animation, visually
   correct in browser.
5. Slide 34 shows the combo divergence — Kotlin with dedup, Swift without.
6. Parts 5 + 6 follow the new arc (combo first, AI second).
7. All 13 image slides in §3 render real assets, no CSS placeholders remain on
   those slides.
8. Two-state slide-67 reveals correctly (either as one slide with click-to-toggle
   or as two consecutive slides — implementer's choice, see §3).
9. `microinteraction.webm` is ≤ ~12 MB and still looks fine.
10. Every `<p class="code-caption">` path matches its `code-examples/...` real
    file path.
11. `CLAUDE.md` and `AUTHORING.md` list `iOS-ARCHITECTURE.md` as a synced
    artifact.
12. `ASSETS.md` at repo root lists every missing asset for v3 with checkboxes.
13. `git tag --list` shows both `v1` and `v2`.
14. Open the deck in Chrome at `http://localhost:8000`, click through all
    ~119 slides — none broken, all assets load, no console errors.

---

## 9. Out of scope (explicitly)

- Changes to anything in `code-examples/` — the user iterates on those
  separately and v2 only reads from them.
- Renaming or moving `code-examples/android-app-sampels/` despite its
  typo (`sampels` vs `samples`) — the user has more important things to do
  than fix a directory name during a talk-polish iteration.
- Wiring of the 4 missing image slides + 2 new combo diagrams — that's v3.
- Re-encoding `combo-transition.webm` (6.6 MB is fine).
- Theme changes, font changes, palette changes.
- Build pipeline, automated tests, CI.

---

## 10. Risks and how we'll handle them

| Risk | Mitigation |
|---|---|
| The stagger animation on the new compact BIG-WORDs feels worse than four separate slides with `pop-in` each | If the result is visually weaker than the original, fall back to two slides per chain instead of one (e.g. 30+31 collapse to one, 32+33 to another). Implementer decides during the visual-check step. |
| The combo divergence on slide 34 is too subtle for the audience to spot | The speaker notes the divergence explicitly, and the slide title hints ("implemented twice — spot the difference?"). If still too subtle, swap to a more visible difference: e.g., the Kotlin version checks `isInStop` before returning the default; the Swift version doesn't. |
| Two-state slide 67 as one slide with click-toggle gets too clever for `nav.js` | Default to two consecutive slides. Simpler, no runtime changes. |
| `microinteraction.webm` doesn't compress well to ~10 MB while keeping quality | Accept the larger file. The deck is presented locally; load time isn't a hard constraint. Document in `presentation/README.md` that the deck includes a ~15 MB video. |
| The drinkit-lab triptych is overwhelming visually (three phones at once) | Scale them to 80% size compared to the standard `.phone`, or place vertically in a column if horizontal doesn't fit. Visual judgement during implementation. |
| Renaming diagram files from `mocks/51.png` → `diagrams/android-architecture.png` breaks something the user already references | The files only exist locally; no external references. Safe to rename. |

---

## 11. Implementation hand-off

After this spec is reviewed and approved, the next step is to invoke the
`writing-plans` skill to produce a step-by-step implementation plan. The plan
should:

- Be broken into tasks roughly matching this spec's sections (§2.1, §2.2, §2.3,
  §3, §4, §5, §6, §7).
- Use TaskCreate to track progress through implementation.
- After each major task, run the CLAUDE.md sanity checks.
- At the end, manually verify the deck in a browser as described in §8.

The implementation plan will live at
`docs/superpowers/plans/2026-05-24-deck-v2-plan.md` (or similar — that's the
writing-plans skill's call).
