# Deck v3 — Design

> Iteration 3 of the "KMP without rewriting the app" talk. Builds on v2.4.
> Scope: visual polish (section backgrounds, hero/ad on cover), screen-by-screen
> content swaps driven by new assets, plus a structural rework of the
> "where can KMP fit" story (Part 4 end and Part 6 start) to lean on
> five rejected-architecture diagrams and three accepted-architecture diagrams
> rather than bullets and inline SVGs.
>
> Synced artifacts under v3: `PRESENTATION_PLAN.md`, `presentation/index.html`,
> `iOS-ARCHITECTURE.md`, `ASSETS.md`, plus this spec.

---

## 1. Goals

1. **Make the deck look like a deck.** Section-starter slides currently render
   on a flat off-white background. The reference samples
   (`refs/bg-sample-{1..4}.png`) introduce a radial-pastel-gradient bottom
   bloom that ties every section opener to one accent color. We adopt that
   pattern for every BIG-WORD section title.
2. **Replace placeholder visuals with real diagrams.** Eight new PNG diagrams
   are sitting in `presentation/assets/diagrams/` named after the slide they
   ship to (`16.png`, `51.png`, `63.png`, `64.png`, `78-{1,2,3}.png`,
   `after-68.png`) plus five `bad-try-*` diagrams. We wire them in and rename
   to content-based names (per AUTHORING.md §4.2).
3. **Tighten the "where can KMP fit" arc.** Slides 8–9 (single-platform hero
   shots) are dropped because slides 10–13 already make the same point with
   stronger visuals. Slides 58–59 (two "option doesn't work" bullet slides)
   become five new diagram slides — one per rejected architecture. Slides
   82–85 collapse into the new 78-1/2/3 diagram sequence. Slides 100–101 go
   away because the same insight is already on the new 78-3 diagram.
4. **Surface the "Android commits, iOS regenerates" asymmetry.** It's the
   single sharpest divergence in the codebase and we never call it out
   today. Annotate slides 53, 54, and 88 plus a new bridging slide between
   54 and 55.
5. **Cut un-loved domain code from Part 5.** Current slides 69–72 are four
   slides of Kotlin domain code. The audience cares about "how is the KMP
   library wired into each app", not the internals. Replace with one
   minimal-template snippet plus Android `build.gradle.kts` dependency and
   iOS `Package.swift` import.
6. **Speed up the brand-differentiator video** (slide 27) 2× via ffmpeg —
   keeps the slide's pacing in line with the surrounding 10-sec/slide
   target.
7. **Anchor the cover to the actual event.** Use `ad.jpeg` to make slide 1
   read as "Bereke Android Meetup · GDG Almaty · 28 May 2026" instead of
   the generic "GDG Almaty · 2026".

---

## 2. Non-goals

- **No code-example changes.** `code-examples/` stays frozen — it's only
  cited.
- **No theme.css / slide.css changes.** All gradient work lives in
  `presentation/css/deck.css` as new utility classes; we never touch the
  mirrored theme files (AUTHORING.md §1).
- **No iOS-ARCHITECTURE.md narrative rewrite.** Only the slide-pointer
  paragraph at the top changes (slide numbers shift; story is unchanged).
- **No new audio / live-coding / animation systems.** Same set of
  primitives the deck already has.

---

## 3. Open decisions I'm making (call them out if wrong)

A few items in your message were genuinely open. I'm making the
reasonable call so the plan moves; flag any I got wrong at spec review.

| # | Decision | Why |
|---|---|---|
| 3.1 | **Slides 79–81 (current AiService code triad): keep 79 + 80, drop 81.** | The new 78-3 diagram already shows host-side wiring via "data providers" + interfaces, which is what slide 81 (factory) was illustrating in code. Slide 79 (`interface AiService`) and slide 80 (sealed `CreatedDrinkResult`) still earn their keep because they're the only place the audience sees the *API shape* the diagrams point to. |
| 3.2 | **Slide 1 cover layout.** Keep the existing big-title layout. Replace the brand line `Dodo Engineering · GDG Almaty · 2026` with `Bereke Android Meetup · 28 мая 2026 · MOST IT Hub Almaty`. Place a scaled-down `ad.jpeg` (≈22% slide width) as a card in the lower-right corner, with a subtle drop-shadow. Speaker name stays where it is. | The poster encodes "what event is this" better than any text restatement. Keeping the title dominant respects Lessig/Takahashi style. |
| 3.3 | **Slide 35 mock content & language.** On-screen mock displays a Telegram-style message in `#drinkit-feedback` with the quote in Russian: *«А почему у моей подруги комбо доступно, а у меня на айфоне нет? Что за несправедливость?!»* Speaker note remains English. | Audience at Almaty is Russian-speaking; the quote reads more natively in Russian. The rest of the deck stays English per the plan header. (I fixed a small grammatical bobble in your draft: «в моей подруги» → «у моей подруги».) |
| 3.4 | **Asset renames.** Slide-numbered files (`16.png`, `51.png`, `63.png`, `64.png`, `78-1/2/3.png`, `after-68.png`) get renamed to content-based names; `51.png` and `63.png` are byte-identical so they collapse into one file. See §6. | AUTHORING.md §4.2 explicitly calls this out: slide numbers shift between iterations, content names don't. Future-us will thank us. |
| 3.5 | **Slide 18 video tile.** Five videos arranged in a single horizontal flex row, `height: 100%; width: auto`, the row clipped by `overflow: hidden`. No slide padding, no title, no page-number stamp on this slide. Videos play `autoplay loop muted playsinline`. Order: 1, 2, 3, 4, 5 left-to-right. The 4th/5th may be partially or fully off-canvas — that's expected. | Matches your spec exactly. The existing `.slide__page-num` chrome is suppressed on this one slide via a `slide--bleed` modifier (new). |
| 3.6 | **Slide 27 video speed.** Re-encode `microinteraction.webm` at 2× with `ffmpeg -i in.webm -filter:v "setpts=0.5*PTS" -an -c:v libvpx-vp9 -b:v 1.5M -crf 32 microinteraction-2x.webm`. Keep original file in place for safety; new slide references the `-2x` file. | Reversible. ffmpeg confirmed installed (`/opt/homebrew/bin/ffmpeg`, v8.0). |

---

## 4. The 18 changes — what changes, where

Authoritative list. Each entry says: which **plan** entry changes, which
**HTML** section changes, what **assets** move, and any **iOS-ARCH** /
**ASSETS** ripple. Slide numbers are *pre-renumber* (i.e., refer to the
current v2.4 deck) unless otherwise noted.

> Renumber math is summarized in §5. The implementation plan (writing-plans
> next step) will sequence the edits so we renumber once, at the end.

### 4.1 · Slide 1 — Cover anchored to Bereke Android Meetup

- **Plan:** Update brand line; speaker name unchanged.
- **HTML (slide 1):** Replace `.cover__brand` text. Add a new
  `<aside class="cover__event-card">` containing
  `<img src="assets/ad.jpeg" alt="Bereke Android Meetup poster">`.
- **CSS (deck.css):** New `.cover__event-card` — absolutely positioned
  bottom-right inside the cover, ≈22% slide width, 4:5 aspect, 12px radius,
  drop-shadow `var(--shadow-md)`. No new color tokens.
- **Assets:** `ad.jpeg` already in `presentation/assets/`. No move.

### 4.2 · Section-starter slide backgrounds — pastel radial gradients

Reference samples in `refs/bg-sample-{1..4}.png` show:
- centered-bottom radial bloom in a single accent color, fading up to
  near-white at the top
- text remains black, centered roughly mid-canvas
- subtle, not the OS-wide purple haze — distinctive per slide

We map the four sample colors to existing theme tokens (so we don't add new
hex). Match list (after eyeballing the samples against `theme.css`):

| Sample | Token | Hex (for reference) | Used on |
|---|---|---|---|
| bg-sample-1 (deep purple) | `--color-accent-purple` | `#694BFB` | KMP / shared-code sections |
| bg-sample-2 (cobalt blue) | `--color-pastel-blue-bold` (or `--color-accent-blue`) | `#3366FF` | Architecture-detail sections |
| bg-sample-3 (warm orange) | `--color-accent-orange` | `#FF5401` | Brand-feel / motivation sections |
| bg-sample-4 (sage green) | `--color-pastel-mint-bold` | `#34D399`-ish | Cross-cutting / process sections |

Concrete CSS (added to `deck.css`):

```css
.slide--section.bg-bloom { background: radial-gradient(
  ellipse 80% 60% at 50% 110%,
  var(--bloom-color) 0%,
  color-mix(in srgb, var(--bloom-color) 40%, #fff) 30%,
  #fff 70%
); }
.slide--section.bg-bloom.bloom--purple { --bloom-color: var(--color-accent-purple); }
.slide--section.bg-bloom.bloom--blue   { --bloom-color: var(--color-pastel-blue-bold); }
.slide--section.bg-bloom.bloom--orange { --bloom-color: var(--color-accent-orange); }
.slide--section.bg-bloom.bloom--mint   { --bloom-color: var(--color-pastel-mint-bold); }
```

Apply to the existing section-title BIG-WORD slides: **7, 17, 31, 45, 61,
74, 86, 102, 115** (pre-renumber). Color rotation goes
purple → orange → blue → mint → purple → orange → blue → mint → purple
(or another sequence; final mapping is in the implementation plan).

The same `.bg-bloom` class can later be applied to transition slides if we
choose, but in scope for v3 it's section-titles only.

### 4.3 · Drop slides 8 and 9 (single-platform home shots)

- **Plan:** Delete `### Slide 8 | IMAGE | Drinkit iOS — home screen` and
  `### Slide 9 | IMAGE | Drinkit Android — home screen`.
- **HTML:** Delete both `<section>` blocks and their comment markers.
- **Speaker:** The "Side by side" line on what's now slide 8 (was slide
  10) becomes the audience's *first* look at the app — rewrite its opener
  sentence from "Side by side. From the outside…" to "First look. Two
  phones, two platforms — from the outside, basically the same app."
- **Renumber cascade:** −2.

### 4.4 · Make slides 10–13 visually consistent (currently 11–13 are smaller)

- **Plan:** No content change — note in `Visual:` line that screen height
  matches slide 10.
- **HTML:** Slides 11, 12, 13 currently use a different `.phones` /
  inline-style sizing than slide 10. Lift slide 10's exact `<div
  class="slide__body">` shell (grid, max-height, gap, phone aspect) into a
  reusable class — let's call it `.phones-hero` — added to `deck.css`. Re-
  template slides 10–13 to use it. The class fills the slide body with
  `height: 82%` and gives each phone the same `aspect-ratio: 9/19.5;
  max-height: 100%`.

### 4.5 · Slide 16 — swap to the new two-architectures-detailed PNG

- **Plan:** Update `Visual:` and `Image:` lines to point to renamed file.
- **HTML:** Replace inline SVG silhouettes with `<img
  src="assets/diagrams/two-architectures-detailed.png" class="diagram-img">`
  inside a `.diagram-wrap`.
- **Asset:** Rename `presentation/assets/diagrams/16.png` →
  `two-architectures-detailed.png`.

### 4.6 · Slide 18 — full-bleed five-video tile (no title, no padding)

- **Plan:** Rewrite the entry. Visual = "five short menu-capture clips
  tiled left-to-right, no chrome." Speaker stays.
- **HTML:** New layout. The `<section class="slide slide--bleed">` opts
  out of slide-padding and title via `slide--bleed` modifier:

  ```html
  <section class="slide slide--bleed">
    <div class="video-tile">
      <video src="assets/media/menu-1.webm" autoplay loop muted playsinline></video>
      <video src="assets/media/menu-2.webm" autoplay loop muted playsinline></video>
      <video src="assets/media/menu-3.webm" autoplay loop muted playsinline></video>
      <video src="assets/media/menu-4.webm" autoplay loop muted playsinline></video>
      <video src="assets/media/menu-5.webm" autoplay loop muted playsinline></video>
    </div>
  </section>
  ```
- **CSS (deck.css):**
  ```css
  .slide.slide--bleed { padding: 0; overflow: hidden; }
  .slide.slide--bleed .slide__page-num { display: none; }
  .video-tile {
    position: absolute; inset: 0;
    display: flex; flex-direction: row;
    overflow: hidden;
  }
  .video-tile > video {
    height: 100%; width: auto;
    flex: 0 0 auto;
    object-fit: cover;
  }
  ```
- **Note:** Drops `<h3 class="slide__title">` entirely — first slide in
  the deck without one.

### 4.7 · Drop slide 19 (customization sliders shot)

- **Plan:** Delete `### Slide 19 | IMAGE | Customization — sliders / ingredients`.
- **HTML:** Delete the corresponding `<section>` + comment.
- **Renumber cascade:** −1.

### 4.8 · Slide 27 — speed up `microinteraction.webm` 2×

- **Plan:** Update `Asset:` line to point to `microinteraction-2x.webm`.
- **HTML:** Change the `<video src>` on slide 27 to the new file.
- **Build step:** From the repo root, run
  ```
  ffmpeg -i presentation/assets/media/microinteraction.webm \
         -filter:v "setpts=0.5*PTS" -an \
         -c:v libvpx-vp9 -b:v 1.5M -crf 32 \
         presentation/assets/media/microinteraction-2x.webm
  ```
  The `-an` drops audio (silent anyway); 2× speed via `setpts=0.5*PTS`.
- **Assets:** keep original `microinteraction.webm` in repo as a rollback
  — it's only 7.5 MB.

### 4.9 · Slide 35 — Russian bug quote in `#drinkit-feedback`

- **Plan:** Update `Visual:` to describe the new mock + Russian quote.
- **HTML:** Inside slide 35's mock card, change the channel name from
  `#drinkit-bugs` to `#drinkit-feedback`. Replace the English quote with:
  > «А почему у моей подруги комбо доступно, а у меня на айфоне нет? Что
  > за несправедливость?!»

  Keep all surrounding chrome (avatar circle, timestamp).
- **No font work needed** — the system fonts already cover Cyrillic.

### 4.10 · Slide 51 — swap to the iOS / Android module-graph PNG

- **Plan:** Update `Visual:` and add `Image:` line.
- **HTML:** Replace the existing two-column compare on slide 51 with a
  single `.diagram-wrap` + `<img src="assets/diagrams/ios-android-modules.png">`.
- **Asset:** Rename `presentation/assets/diagrams/51.png` →
  `ios-android-modules.png`. Note that `63.png` is byte-identical, so we
  consolidate (see §4.13).
- **iOS-ARCHITECTURE.md ripple:** the slide-pointer paragraph at the top
  references slide 51 — once renumbering happens, update those numbers.

### 4.11 · Slides 53, 54 + a new slide 55 — call out the
"Android commits / iOS regenerates" asymmetry

- **Slide 53 (Android Retrofit interface):** Add a small caption under the
  code block: *"Source of truth: generated Kotlin · committed to repo."*
- **Slide 54 (iOS OpenAPI Generator call):** Add caption: *"Source of
  truth: JSON spec · Swift regenerated on every build."*
- **NEW slide 55 (insert between current 54 and 55):**
  - Type: `COMPARE` (two-col).
  - Title: *"Different source of truth."*
  - Left col (orange eyebrow `// android`): "**Generated Kotlin is the
    contract.** Committed to the repo. Diff-able. Code-reviewed."
  - Right col (purple eyebrow `// ios`): "**JSON is the contract.** Swift
    is built fresh each time. No DTO in the repo."
  - Speaker: "Worth pausing on — these two slides look like 'just different
    HTTP libraries.' They're not. On Android the generated Kotlin *is* a
    committed source file we review; on iOS there's nothing in the repo to
    review, just the JSON spec and whatever the generator spits out at
    build time."
- **Renumber cascade:** +1.

### 4.12 · Slides 58–59 — replace bullet slides with 5 diagram slides

Current 58 ("Option A — take the network layer") and 59 ("Option B — take
data + domain") are bullet lists. Replace with five `DIAGRAM` slides
showing five rejected architectures, each with one-sentence speaker note.

| # | Title | Image (renamed) | Speaker (one line) |
|---|---|---|---|
| New 58 | Option 1 — Data + domain together | `bad-try-data-and-domain.png` | "Take both layers — but our two 'data' shapes already disagree, generated vs. committed; the merge would be a rewrite." |
| New 59 | Option 2 — Data only | `bad-try-data-only.png` | "Just data — same problem; the layer means different things on each side." |
| New 60 | Option 3 — One full feature | `bad-try-one-full-feature.png` | "One full feature top-to-bottom — pulls in the whole data layer again." |
| New 61 | Option 4 — Force Android style on iOS | `bad-try-android-style-on-ios.png` | "Bend iOS to per-feature modules — different architecture by force, year of cleanup, zero user value." |
| New 62 | Option 5 — Take infra (logs, analytics, ...) | `bad-try-take-infra.png` | "Take cross-cutting infra instead — designed differently on each side, big effort, little impact." |

- **Plan:** Delete the two existing `BULLETS` entries, insert five new
  `DIAGRAM` entries.
- **HTML:** Delete both bullet sections, insert five `<section
  class="slide slide--content">` blocks each with a title + diagram-wrap.
- **Asset renames** (consolidates the `bad-try-N-*` naming):
  - `bad-try-1-data+domain.png` → `bad-try-data-and-domain.png` (drop `+`)
  - `bad-try-2-only-data.png` → `bad-try-data-only.png`
  - `bad-try-3-one-full-feature.png` → `bad-try-one-full-feature.png`
  - `bad-try-4-do-android-style-on-ios.png` → `bad-try-android-style-on-ios.png`
  - `bad-try-5-do-other-things.png` → `bad-try-take-infra.png`
- **Renumber cascade:** +3 (2 deleted, 5 inserted).

### 4.13 · Slides 63 and 64 — swap to module-graph PNGs

- **Slide 63:** Replace `vertical-slice-base.png` with the new module-graph
  image (the one byte-identical to `51.png`).
- **Slide 64:** Replace `vertical-slice-highlighted.png` with the new
  module-graph + green-check image.
- **Plan:** Update `Visual:` and `Image:` lines on both.
- **Asset renames / consolidation:**
  - `51.png` and `63.png` are byte-identical. **Keep one file** named
    `ios-android-modules.png` and reference it from both slides 51 and 63.
  - `64.png` → `ios-android-modules-shareable.png`.
- **iOS-ARCHITECTURE.md ripple:** slide pointer paragraph mentions slides
  51, 52, 53 — re-check after renumber.

### 4.14 · Insert a new slide right after slide 68 — pure-function picture

- **NEW slide 69** (pushes existing 69+ down by 1):
  - Type: `DIAGRAM`.
  - Title: *"What lives in KMP — just the pure function."*
  - Image: `pure-function-shared-domain.png` (renamed from `after-68.png`).
  - Speaker: "Picture-form: Android's data + impl arrows pointing in,
    iOS's data + domain arrows pointing in, and in the middle one shared
    KMP `domain` box. Nothing else moves."
- **Asset rename:** `after-68.png` → `pure-function-shared-domain.png`.
- **Renumber cascade:** +1.
- **ASSETS.md ripple:** the `[ ] pure-function-pattern.png` checklist item
  is satisfied by this new asset (different name). Mark `[x]`.

### 4.15 · Slides 69–72 — replace dense domain code with 2 wiring slides + 1 template

Currently 69, 70, 71, 72 are four code slides showing
`ComboTemplate` / `ComboResolver.resolve()` / `pickSlots` /
`computeTotalPrice`. Audience-level: too much, not the point.

New (in the renumbered deck, these become slides 70, 71, 72 because the
new diagram from §4.14 is slide 69):

| New # | Type | Title | Content |
|---|---|---|---|
| 70 | `CODE` | *The whole shared surface (template)* | A 6-line "template" snippet showing a pure function in commonMain: `fun resolveCombo(template: ComboTemplate, menu: Menu): ComboResolution { /* deterministic, no IO */ }`. Speaker: "This is the entire shared API surface for combo — one pure function, deterministic, no IO. Inputs in, result out." |
| 71 | `CODE` | *Wiring on Android — one line* | `build.gradle.kts` snippet (4 lines) showing `implementation("io.dodobrands.kmp:combo:1.0.0")` plus a usage call site. Speaker: "How Android plugs in: one Gradle line, then call it like any local function." |
| 72 | `CODE` | *Wiring on iOS — one line* | `Package.swift` / SPM snippet (5 lines) showing `.package(name: "DodoKMP", path: ".../kmp")` + a Swift call site `let result = ComboResolverKt.resolve(...)`. Speaker: "How iOS plugs in: SwiftPackage dependency on the KMP module, then call it like any other Swift function." |

- **Plan:** Replace four entries with three. Update the per-part count.
- **HTML:** Delete four code sections, insert three.
- **Code-examples:** No new files needed — the wiring snippets are
  prose-style (audience never reads them line-by-line; they exist to make
  the point "trivial integration"). The pure-function "template" snippet is
  not in `code-examples/` but is conceptually a paraphrase of what's
  already there in `ComboResolver.kt`.
- **Renumber cascade:** −1.

### 4.16 · Slide 78 — replace single diagram with three new diagrams (78-1 / 78-2 / 78-3)

Current slide 78 is `DIAGRAM | Shape of a stateful feature` with the
inline-SVG "three sockets" illustration.

Replace with three sequential `DIAGRAM` slides:

| New # | Title | Image | Speaker |
|---|---|---|---|
| 78 (replaces) | *We can't just lift data into KMP* | `kmp-data-only-blocked.png` (renamed from `78-1.png`) | "We already saw why the data layer alone doesn't fit — generated vs. committed on each side, different shape. So: not this." |
| 79 (new, +1) | *Network — invert it. Provide an interface.* | `kmp-data-with-interfaces.png` (renamed from `78-2.png`) | "Instead, the shared module defines a tiny HTTP-transport interface — each app's existing HTTP stack implements it. Ktor lives in KMP and talks to an engine that hands every request to the host." |
| 80 (new, +1) | *Domain dependencies — same trick, call them data providers* | `kmp-domain-data-with-providers.png` (renamed from `78-3.png`) | "And the same trick for everything else the domain logic needs — the menu, the stop-list, prompts. The shared module declares 'data providers' as interfaces. Each app fulfils them with what it already has." |

- **Plan:** Delete current slide 78 entry, insert three new ones.
- **HTML:** Same.
- **Asset renames:** as in the table above.
- **Renumber cascade:** +2.

### 4.17 · Slide 81 — drop; slides 79 and 80 (AiService code) survive

Per decision 3.1: the new 78-3 diagram already shows host-side wiring via
data-provider interfaces, so slide 81's factory-code is redundant. The
two code slides above it (AiService interface + sealed result) are kept
because they're the only place the audience sees the API shape.

- **Plan:** Delete `### Slide 81 | CODE | Factory — the host wiring`.
- **HTML:** Delete the corresponding `<section>`.
- **Renumber cascade:** −1.

### 4.18 · Slides 82–85 — delete (story now lives in 78-1/2/3)

Current 82 ("Three sockets diagram"), 83 ("Dependency inversion. Apps glue."),
84 ("Full picture"), 85 ("NOT replace + What we DID closing") were the
beats that the new 78-1/2/3 diagrams now carry. Drop all four.

- **Renumber cascade:** −4.

### 4.19 · Slide 88 — add codegen-asymmetry bullet

- **Plan:** add bullet to the entry.
- **HTML:** in slide 88's `<ul>`, add an item between the two existing
  platform bullets and the "Both" bullet:
  > Android commits the generated Kotlin DTOs / HTTP clients. iOS regenerates Swift on every build — nothing committed.

  Phrasing tightened from the spec text; the *committed* vs *not committed*
  is the load-bearing word pair.

### 4.20 · Slides 100 and 101 — delete

Per your note, both are already covered: 100's "Other inversions" diagram
is the new 78-3 (data providers); 101's "declare / fulfil / nothing else"
big-word is implicit in the new 78-2/78-3 talk track.

- **Renumber cascade:** −2.

---

## 5. Renumber math + new slide count

| Op | Δ | Running total (current = 127) |
|---|---|---|
| Drop 8, 9 | −2 | 125 |
| Drop 19 | −1 | 124 |
| Insert "Different source of truth" (after current 54) | +1 | 125 |
| Replace 58–59 (2) with 5 diagram slides | +3 | 128 |
| Insert "pure-function shared-domain" diagram after current 68 | +1 | 129 |
| Replace 69–72 (4) with 3 wiring slides | −1 | 128 |
| Replace 78 (1) with 3 diagrams | +2 | 130 |
| Drop 81 | −1 | 129 |
| Drop 82–85 (4) | −4 | 125 |
| Drop 100, 101 (2) | −2 | 123 |

**Final v3 slide count: 123** (down from 127). Plan and deck both updated;
sanity checks per CLAUDE.md run after.

---

## 6. Asset organization

All renames happen in **one commit** prior to wiring edits, so HTML edits
reference the final names from the start. Move list:

```
presentation/assets/diagrams/
  16.png                                    → two-architectures-detailed.png
  51.png                                    → ios-android-modules.png        # 63.png deleted (byte-identical)
  63.png                                    DELETE (consolidated with 51.png)
  64.png                                    → ios-android-modules-shareable.png
  78-1.png                                  → kmp-data-only-blocked.png
  78-2.png                                  → kmp-data-with-interfaces.png
  78-3.png                                  → kmp-domain-data-with-providers.png
  after-68.png                              → pure-function-shared-domain.png
  bad-try-1-data+domain.png                 → bad-try-data-and-domain.png
  bad-try-2-only-data.png                   → bad-try-data-only.png
  bad-try-3-one-full-feature.png            → bad-try-one-full-feature.png
  bad-try-4-do-android-style-on-ios.png     → bad-try-android-style-on-ios.png
  bad-try-5-do-other-things.png             → bad-try-take-infra.png
  (vertical-slice-base.png — no longer referenced; leave in repo for v4 rollback)
  (vertical-slice-highlighted.png — no longer referenced; leave in repo)
```

New file produced (not a rename):
```
presentation/assets/media/microinteraction-2x.webm    # ffmpeg from microinteraction.webm
```

`refs/bg-sample-{1..4}.png` stay in `refs/` — they're inspiration, not deck
assets.

`ad.jpeg` stays in `presentation/assets/` (slide 1 reference). It's a
cover-page event poster, conceptually separate from the screen/diagram/
media subfolders.

---

## 7. Synced-doc updates

Per CLAUDE.md "the one rule" — every slide change touches both
`PRESENTATION_PLAN.md` and `presentation/index.html`; iOS-architecture
slides also touch `iOS-ARCHITECTURE.md`.

| File | What changes |
|---|---|
| `PRESENTATION_PLAN.md` | Every slide entry listed in §4. Slide-count summary table at bottom: update per-part counts and total to 123. Slide-numbers in cross-references update after renumber. |
| `presentation/index.html` | Sections + comment markers per §4. Section-bg-bloom classes added per §4.2. New `.slide--bleed` / `.video-tile` / `.cover__event-card` / `.phones-hero` classes used in markup. |
| `presentation/css/deck.css` | New classes from §4.2, §4.4, §4.6, §4.1. No edits to mirrored `theme.css` / `slide.css`. |
| `iOS-ARCHITECTURE.md` | Only the top-of-file slide pointer paragraph: change "currently ~51, ~52, ~53" to whatever the renumbered iOS-arch slide range becomes. Architecture content unchanged. |
| `ASSETS.md` | Mark `pure-function-pattern.png` checklist item satisfied (now named `pure-function-shared-domain.png`); add note that v3 reworked Part-6 visuals. |
| `CLAUDE.md` | No changes required — its rules don't depend on slide numbers. |

---

## 8. Validation (post-edit)

Run the three CLAUDE.md sanity checks:

```bash
grep -c '<section class="slide ' presentation/index.html        # expect 123
grep -cE '^### Slide [0-9]+ ' PRESENTATION_PLAN.md             # expect 123
grep -oE '<!-- ([0-9]+) ' presentation/index.html \
  | awk '{print $2+0}' | sort -n | uniq -c | awk '$1!=1'        # expect no output

cd presentation && python3 -m http.server 8000
# Then open http://localhost:8000 and walk every changed slide:
#   1 (cover + ad), 7 (purple bloom), 8 (was 10, side-by-side), 14 (was 16),
#   16 (was 18, video tile), 25 (was 27, 2x video), 32 (was 35, Russian quote),
#   46 (was 51, module graph), 48–49 (was 53–54, codegen captions + new bridge),
#   53–57 (was 58–59, five bad-try diagrams), 58–60 (was 63–64),
#   64 (new pure-function diagram), 65–67 (was 69–72, wiring slides),
#   73–75 (was 78, three new diagrams), 76–77 (was 79–80, kept),
#   (was 81 deleted, was 82–85 deleted),
#   84 (was 88, added codegen bullet),
#   (was 100, 101 deleted)
```

Manual checks:

- Section backgrounds: each section title actually shows a bloom (and the
  bloom doesn't bleed into the title text contrast).
- Slide-bleed slide 16 (was 18): videos autoplay, fill height, the row is
  clipped at the right edge if videos overflow.
- Slide 25 (was 27): the 2× video doesn't visibly stutter; if it does,
  bump `-b:v` to 2M and re-encode.
- Russian text on slide 32 (was 35) renders in the same body font; no
  glyph fallback boxes.
- `g 35` in nav.js still works after renumber.

---

## 9. Implementation order (for the writing-plans skill)

The implementation plan will sequence work to minimize churn:

1. **Asset move + ffmpeg encode** — all renames in one git mv'ing commit;
   ffmpeg re-encode in the same commit.
2. **CSS additions** to `deck.css` (bg-bloom, slide--bleed, video-tile,
   cover__event-card, phones-hero) — one commit.
3. **Plan + HTML edits, top-down by slide number** — one commit per
   section of the deck (Parts 0 / 1 / 2 / 3 / 4 / 5 / 6 / 7 / 8) so each
   commit stays reviewable. Renumber cascade is handled once at the end of
   each section.
4. **Sync ripples** — iOS-ARCHITECTURE.md and ASSETS.md updates in a
   final commit.
5. **Sanity-check + browser walk-through** — confirm counts match,
   browser-test every changed slide.

---

## 10. Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| `setpts` 2× makes slide 25's video look choppy at 24fps source. | Medium | Keep original webm; if choppy, fall back to original speed or re-encode at 1.5×. |
| Renumber cascade introduces a gap or duplicate comment marker. | Medium | Run the CLAUDE.md awk one-liner after every commit; fix immediately. |
| Pastel-bloom backgrounds reduce readability of black title text on darker accents (orange/purple). | Low | The radial gradient fades to white at the *top*; the title sits in the lighter half. Verify on actual displays during validation. |
| ffmpeg encode produces a file the deck's autoplay path doesn't like (encoded with audio track present even with `-an`). | Very low | `-an` strips the audio track; deck's `<video muted>` doesn't depend on audio anyway. |
| `ad.jpeg` (portrait 4:5) crops awkwardly inside the cover-card slot. | Low | Use `object-fit: contain` if `cover` crops the title; visually verify. |
| Russian quote glyphs fall back to a system font. | Very low | The deck's body font already covers Cyrillic; verify in browser. If it doesn't, ship a webfont fallback. |

---
