# Deck v3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the 18 changes from the v3 design spec (`docs/superpowers/specs/2026-05-25-deck-v3-design.md`) — anchor the cover to the Bereke Android Meetup, add radial-pastel section backgrounds, swap in 13 new diagrams, rework the "where can KMP fit" arc, drop 9 slides total, add 6 new slides, and keep `PRESENTATION_PLAN.md`, `presentation/index.html`, `iOS-ARCHITECTURE.md` and `ASSETS.md` in sync. Final slide count: **123** (down from 127).

**Architecture:** Edit the deck top-down by Part. Renumbering cascade is computed once up-front (see §0 below) — each edited slide gets its **final v3 number** in one shot, no intermediate renumbers. The synced-files rule from `CLAUDE.md` is honored on every commit (plan ↔ deck ↔ iOS-arch).

**Tech stack:** Plain HTML5 + CSS (no syntax-highlighter library), `js/nav.js` runtime, ffmpeg for video re-encoding. No tests in this repo — validation is `grep` slide-count parity + a browser walk-through.

---

## 0. Source-of-truth: old → new slide-number mapping

The renumber cascade is mechanical but easy to get wrong. Compute it once
and reference it from every later task. The table below is authoritative.

| Old | New | Status | Notes |
|---:|---:|---|---|
| 1 | 1 | edit | Cover — event poster + brand-line change |
| 2 | 2 | unchanged | |
| 3 | 3 | unchanged | |
| 4 | 4 | unchanged | |
| 5 | 5 | unchanged | |
| 6 | 6 | unchanged | |
| 7 | 7 | edit (bg-bloom) | Section title Part 1 |
| 8 | — | **DROP** | Drinkit iOS home — single platform shot |
| 9 | — | **DROP** | Drinkit Android home — single platform shot |
| 10 | 8 | edit | Side-by-side home (normalize sizing) |
| 11 | 9 | edit | Side-by-side menu (normalize sizing) |
| 12 | 10 | edit | Side-by-side customization (normalize sizing) |
| 13 | 11 | edit | Side-by-side cart (normalize sizing) |
| 14 | 12 | unchanged | |
| 15 | 13 | unchanged | |
| 16 | 14 | edit | Swap to `two-architectures-detailed.png` |
| 17 | 15 | edit (bg-bloom) | Section title Part 2 |
| 18 | 16 | edit | Full-bleed five-video tile |
| 19 | — | **DROP** | Customization sliders shot |
| 20 | 17 | unchanged | |
| 21 | 18 | unchanged | |
| 22 | 19 | unchanged | |
| 23 | 20 | unchanged | |
| 24 | 21 | unchanged | |
| 25 | 22 | unchanged | |
| 26 | 23 | unchanged | |
| 27 | 24 | edit | Point to `microinteraction-2x.webm` |
| 28 | 25 | unchanged | |
| 29 | 26 | unchanged | |
| 30 | 27 | unchanged | |
| 31 | 28 | edit (bg-bloom) | Section title Part 3 |
| 32 | 29 | unchanged | |
| 33 | 30 | unchanged | |
| 34 | 31 | unchanged | |
| 35 | 32 | edit | Russian quote in `#drinkit-feedback` |
| 36 | 33 | unchanged | |
| 37 | 34 | unchanged | |
| 38 | 35 | unchanged | |
| 39 | 36 | unchanged | |
| 40 | 37 | unchanged | |
| 41 | 38 | unchanged | |
| 42 | 39 | unchanged | |
| 43 | 40 | unchanged | |
| 44 | 41 | unchanged | |
| 45 | 42 | edit (bg-bloom) | Section title Part 4 |
| 46 | 43 | unchanged | |
| 47 | 44 | unchanged | |
| 48 | 45 | unchanged | |
| 49 | 46 | unchanged | |
| 50 | 47 | unchanged | |
| 51 | 48 | edit | Swap to `ios-android-modules.png` |
| 52 | 49 | unchanged | |
| 53 | 50 | edit | Add "committed Kotlin" caption |
| 54 | 51 | edit | Add "regenerated Swift" caption |
| — | 52 | **NEW** | COMPARE "Different source of truth" |
| 55 | 53 | unchanged | |
| 56 | 54 | unchanged | |
| 57 | 55 | unchanged | |
| 58 | — | **DROP** | Old Option A bullets |
| 59 | — | **DROP** | Old Option B bullets |
| — | 56 | **NEW** | DIAGRAM bad-try data+domain |
| — | 57 | **NEW** | DIAGRAM bad-try data only |
| — | 58 | **NEW** | DIAGRAM bad-try one full feature |
| — | 59 | **NEW** | DIAGRAM bad-try android-style-on-ios |
| — | 60 | **NEW** | DIAGRAM bad-try take-infra |
| 60 | 61 | unchanged | |
| 61 | 62 | edit (bg-bloom) | Section title Part 5 |
| 62 | 63 | unchanged | |
| 63 | 64 | edit | Swap to `ios-android-modules.png` |
| 64 | 65 | edit | Swap to `ios-android-modules-shareable.png` |
| 65 | 66 | unchanged | |
| 66 | 67 | unchanged | |
| 67 | 68 | unchanged | |
| 68 | 69 | unchanged | |
| — | 70 | **NEW** | DIAGRAM `pure-function-shared-domain.png` |
| 69 | 71 | edit | Replace with pure-fn template snippet |
| 70 | 72 | edit | Replace with Android Gradle wiring |
| 71 | 73 | edit | Replace with iOS Package wiring |
| 72 | — | **DROP** | `computeTotalPrice` (4th code slide) |
| 73 | 74 | unchanged | |
| 74 | 75 | edit (bg-bloom) | Section title Part 6 |
| 75 | 76 | unchanged | |
| 76 | 77 | unchanged | |
| 77 | 78 | unchanged | |
| 78 | 79 | edit | Swap to `kmp-data-only-blocked.png` |
| — | 80 | **NEW** | DIAGRAM `kmp-data-with-interfaces.png` |
| — | 81 | **NEW** | DIAGRAM `kmp-domain-data-with-providers.png` |
| 79 | 82 | unchanged | AiService interface |
| 80 | 83 | unchanged | CreatedDrinkResult sealed |
| 81 | — | **DROP** | AiServiceFactory.create() |
| 82 | — | **DROP** | Three-sockets inline-SVG diagram |
| 83 | — | **DROP** | "Dependency inversion" BIG-WORD |
| 84 | — | **DROP** | Full picture diagram |
| 85 | — | **DROP** | "NOT replace + What we DID" BIG-WORD |
| 86 | 84 | edit (bg-bloom) | Section title Part 7 |
| 87 | 85 | unchanged | |
| 88 | 86 | edit | Add codegen-asymmetry bullet |
| 89 | 87 | unchanged | |
| 90 | 88 | unchanged | |
| 91 | 89 | unchanged | |
| 92 | 90 | unchanged | |
| 93 | 91 | unchanged | |
| 94 | 92 | unchanged | |
| 95 | 93 | unchanged | |
| 96 | 94 | unchanged | |
| 97 | 95 | unchanged | |
| 98 | 96 | unchanged | |
| 99 | 97 | unchanged | |
| 100 | — | **DROP** | Other inversions diagram |
| 101 | — | **DROP** | "declare/fulfil" BIG-WORD |
| 102 | 98 | edit (bg-bloom) | Section title Part 8 |
| 103–114 | 99–110 | unchanged | |
| 115 | 111 | edit (bg-bloom) | Section title Part 9 |
| 116–127 | 112–123 | unchanged | |

**Per-part counts (final v3):**
- Part 0: 6 (1–6)
- Part 1: 8 (7–14)
- Part 2: 13 (15–27)
- Part 3: 14 (28–41)
- Part 4: 20 (42–61)
- Part 5: 13 (62–74)
- Part 6: 9 (75–83)
- Part 7: 14 (84–97)
- Part 8: 13 (98–110)
- Part 9: 13 (111–123)
- **Total: 123**

**Section-title slides (post-renumber, get `.bg-bloom` modifier):**
7, 15, 28, 42, 62, 75, 84, 98, 111

**Bloom color rotation:**
- 7 = purple
- 15 = orange
- 28 = blue
- 42 = mint
- 62 = purple
- 75 = orange
- 84 = blue
- 98 = mint
- 111 = purple

---

## Task 1: Asset moves, consolidation, and 2× video re-encode

**Files:**
- Modify: `presentation/assets/diagrams/*.png` (renames)
- Create: `presentation/assets/media/microinteraction-2x.webm`

- [ ] **Step 1: Rename slide-numbered diagrams to content-based names**

```bash
cd /Users/maxkach/dev/dodo/kmp-presentation
git mv presentation/assets/diagrams/16.png       presentation/assets/diagrams/two-architectures-detailed.png
git mv presentation/assets/diagrams/51.png       presentation/assets/diagrams/ios-android-modules.png
git rm presentation/assets/diagrams/63.png   # byte-identical to old 51.png — consolidated
git mv presentation/assets/diagrams/64.png       presentation/assets/diagrams/ios-android-modules-shareable.png
git mv presentation/assets/diagrams/78-1.png     presentation/assets/diagrams/kmp-data-only-blocked.png
git mv presentation/assets/diagrams/78-2.png     presentation/assets/diagrams/kmp-data-with-interfaces.png
git mv presentation/assets/diagrams/78-3.png     presentation/assets/diagrams/kmp-domain-data-with-providers.png
git mv presentation/assets/diagrams/after-68.png presentation/assets/diagrams/pure-function-shared-domain.png
```

- [ ] **Step 2: Rename bad-try diagrams**

```bash
git mv 'presentation/assets/diagrams/bad-try-1-data+domain.png'              presentation/assets/diagrams/bad-try-data-and-domain.png
git mv presentation/assets/diagrams/bad-try-2-only-data.png                  presentation/assets/diagrams/bad-try-data-only.png
git mv presentation/assets/diagrams/bad-try-3-one-full-feature.png           presentation/assets/diagrams/bad-try-one-full-feature.png
git mv presentation/assets/diagrams/bad-try-4-do-android-style-on-ios.png    presentation/assets/diagrams/bad-try-android-style-on-ios.png
git mv presentation/assets/diagrams/bad-try-5-do-other-things.png            presentation/assets/diagrams/bad-try-take-infra.png
```

- [ ] **Step 3: Verify byte-identity of old 51.png and 63.png before deletion was correct**

```bash
git log --oneline --diff-filter=D -- presentation/assets/diagrams/63.png | head -3
# The deletion of 63.png is intentional; cross-check via the original files
# (prior to this commit's rm), 51.png and 63.png were 436915 bytes each.
ls -la presentation/assets/diagrams/ios-android-modules.png
# Expected: a single 436915-byte file at that name.
```

If you discover the files were NOT byte-identical, abort and re-restore
`63.png` from the previous commit: `git checkout HEAD -- presentation/assets/diagrams/63.png`, then come back to the spec.

- [ ] **Step 4: Re-encode `microinteraction.webm` at 2× speed**

```bash
ffmpeg -y \
  -i presentation/assets/media/microinteraction.webm \
  -filter:v "setpts=0.5*PTS" \
  -an \
  -c:v libvpx-vp9 -b:v 1.5M -crf 32 \
  presentation/assets/media/microinteraction-2x.webm
```

Expected: output `microinteraction-2x.webm` exists, roughly half the
duration of the original, no audio track. File size will be similar
(~7-8 MB).

- [ ] **Step 5: Verify the new video plays + has half the duration**

```bash
ffprobe -v error -show_entries format=duration \
        presentation/assets/media/microinteraction.webm
ffprobe -v error -show_entries format=duration \
        presentation/assets/media/microinteraction-2x.webm
# Expected: second value ≈ half the first.
```

- [ ] **Step 6: Commit the asset moves + new video**

```bash
git add -A presentation/assets/
git commit -m "$(cat <<'EOF'
v3 assets — rename slide-numbered diagrams + 2x micro-interaction video

Renames adopt content-based names (AUTHORING.md §4.2): slide numbers
shift between iterations, content names don't. Drops 63.png because
it was byte-identical to 51.png; both slides 51 and 63 now reference
the single ios-android-modules.png. New microinteraction-2x.webm is
the slide-27 video sped up 2x via ffmpeg setpts=0.5*PTS; original
kept in repo for rollback.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Add v3 CSS primitives to deck.css

**Files:**
- Modify: `presentation/css/deck.css` (append new sections at end)

- [ ] **Step 1: Locate the end of `presentation/css/deck.css`**

```bash
wc -l presentation/css/deck.css
tail -20 presentation/css/deck.css
```

Note the last line number — append the new section after a clearly-marked
boundary comment so future readers can find it.

- [ ] **Step 2: Append new CSS classes to deck.css**

Open `presentation/css/deck.css` and append (using the Edit tool, anchored
on the very last existing line / EOF):

```css

/* ============================================================
   v3 additions
   ============================================================ */

/* ---- Section-title radial-pastel bloom backgrounds ----
   Pair with .slide--bigword or .slide--section section-title slides.
   The radial gradient blooms up from the bottom and fades to white
   so black title text stays high-contrast in the upper half. */
.slide.bg-bloom {
  background: radial-gradient(
    ellipse 80% 60% at 50% 110%,
    var(--bloom-color, var(--color-accent-purple)) 0%,
    color-mix(in srgb, var(--bloom-color, var(--color-accent-purple)) 40%, #fff) 30%,
    #fff 70%
  );
}
.slide.bg-bloom.bloom--purple { --bloom-color: var(--color-accent-purple); }
.slide.bg-bloom.bloom--blue   { --bloom-color: var(--color-pastel-blue-bold, #3366FF); }
.slide.bg-bloom.bloom--orange { --bloom-color: var(--color-accent-orange); }
.slide.bg-bloom.bloom--mint   { --bloom-color: var(--color-pastel-mint-bold, #34D399); }

/* ---- Full-bleed slide (suppresses title chrome + padding) ---- */
.slide.slide--bleed {
  padding: 0;
  overflow: hidden;
}
.slide.slide--bleed .slide__page-num { display: none; }

/* ---- Five-video tile (slide 16 in v3) ---- */
.video-tile {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.video-tile > video {
  height: 100%;
  width: auto;
  flex: 0 0 auto;
  object-fit: cover;
}

/* ---- Cover event-card (slide 1, ad.jpeg corner inset) ---- */
.cover__event-card {
  position: absolute;
  right: var(--space-12, 48px);
  bottom: var(--space-12, 48px);
  width: 22%;
  aspect-ratio: 4 / 5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  background: #000;   /* matches the poster's dark background */
}
.cover__event-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ---- Hero side-by-side phones grid (normalizes slides 8-11 in v3) ---- */
.phones-hero {
  display: flex;
  gap: var(--space-8, 32px);
  align-items: center;
  justify-content: center;
  height: 82%;
}
.phones-hero .phone {
  flex: 0 1 auto;
  height: 100%;
}
.phones-hero .phone__screen {
  height: 100%;
  aspect-ratio: 9 / 19.5;
}

/* ---- Caption under a code block (v3 use on slides 50, 51) ---- */
.code-caption-bottom {
  margin-top: var(--space-3, 12px);
  font-size: 11pt;
  color: var(--color-text-secondary, #666);
  font-style: italic;
}
```

- [ ] **Step 3: Verify the deck still loads**

```bash
cd presentation && python3 -m http.server 8000 > /tmp/v3-server.log 2>&1 &
SERVER_PID=$!
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/
# Expected: 200
curl -s http://localhost:8000/css/deck.css | tail -5
# Expected: tail of the file shows the new caption rule.
kill $SERVER_PID
```

- [ ] **Step 4: Commit**

```bash
git add presentation/css/deck.css
git commit -m "$(cat <<'EOF'
v3 css primitives — bg-bloom, slide--bleed, video-tile, event-card, phones-hero

New deck.css utility classes for v3 slide work. No edits to the
mirrored theme.css / slide.css. The bg-bloom class drives the
radial-pastel section-title backgrounds (refs/bg-sample-{1..4}.png);
slide--bleed + video-tile drive the full-bleed five-video slide;
cover__event-card slots ad.jpeg into the cover; phones-hero
normalizes the side-by-side phone-pair layouts.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Slide 1 — anchor cover to Bereke Android Meetup

**Files:**
- Modify: `presentation/index.html` (slide 1)
- Modify: `PRESENTATION_PLAN.md` (Slide 1 entry)

- [ ] **Step 1: Edit slide 1 in `presentation/index.html`**

Replace the current slide 1 block with:

```html
      <!-- 1 · TITLE · Cover -->
      <section class="slide slide--cover">
        <div class="cover__brand">Bereke Android Meetup &middot; GDG Almaty &middot; 28 мая 2026</div>
        <h1 class="slide__big-title">KMP without<br/><em>rewriting</em> the app.</h1>
        <p class="slide__big-subtitle">Max Kachinkin · Tech &amp; Team Lead, Drinkit Mobile</p>
        <aside class="cover__event-card" aria-hidden="true">
          <img src="assets/ad.jpeg" alt="Bereke Android Meetup poster">
        </aside>
      </section>
```

- [ ] **Step 2: Edit the matching `### Slide 1` entry in `PRESENTATION_PLAN.md`**

Replace the `Slide 1` block (lines around 34-40 in the v2.4 file) with:

```markdown
### Slide 1 | TITLE | Cover
- Visual: title card. Big talk title. Speaker name below. Event-poster
  card (Bereke Android Meetup) inset in the lower-right corner using
  `assets/ad.jpeg`.
- On-screen text:
  - **KMP without rewriting the app**
  - Max Kachinkin · Tech & Team Lead, Drinkit Mobile
  - Bereke Android Meetup · GDG Almaty · 28 мая 2026
- Image: `presentation/assets/ad.jpeg` (event poster, lower-right inset)
- Speaker: "Hi everyone, thanks for having me. Today I want to share a very specific, very practical story — how we started using Kotlin Multiplatform inside two big legacy mobile apps, without rewriting anything."
```

- [ ] **Step 3: Visual-check slide 1**

```bash
cd presentation && python3 -m http.server 8000 > /tmp/v3-server.log 2>&1 &
SERVER_PID=$!
sleep 1
# Open in browser: http://localhost:8000/#1
# Check: poster card visible bottom-right, doesn't overlap title, drop-shadow visible.
# If the poster crops awkwardly, change `object-fit: cover` to `object-fit: contain`
# in `.cover__event-card img` and reload.
kill $SERVER_PID
```

- [ ] **Step 4: Commit**

```bash
git add presentation/index.html PRESENTATION_PLAN.md
git commit -m "$(cat <<'EOF'
v3 slide 1 — anchor cover to Bereke Android Meetup

Replaces the generic "GDG Almaty · 2026" brand line with the actual
event (Bereke Android Meetup · GDG Almaty · 28 мая 2026) and adds
ad.jpeg as a small event-card inset in the lower-right corner. The
big title and speaker name are unchanged.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Part 1 edits (slides 7–14 in v3)

This task drops old slides 8 and 9, normalizes 10–13, swaps the slide 16
diagram, and adds the purple bloom to the Part 1 section title.

**Files:**
- Modify: `presentation/index.html`
- Modify: `PRESENTATION_PLAN.md`

- [ ] **Step 1: Add bloom modifier to Part 1 section title (old slide 7 = new 7)**

Find `<!-- 7 · BIG-WORD · Section title -->` in `presentation/index.html`.
Change the `<section>` class to add `bg-bloom bloom--purple`:

```html
      <!-- 7 · BIG-WORD · Section title -->
      <section class="slide slide--section bg-bloom bloom--purple">
```

(Keep the inner content of the slide as-is — `.bg-bloom` only adds the
background.)

If the existing class is `slide--bigword`, change to
`slide--section bg-bloom bloom--purple` per AUTHORING.md §2 — section-title
BIG-WORDs use `slide--section`. Verify in your local copy first which class
it currently uses; do not blindly replace.

- [ ] **Step 2: Delete old slides 8 and 9 from index.html**

Locate `<!-- 8 · IMAGE · Drinkit iOS — home screen -->` and
`<!-- 9 · IMAGE · Drinkit Android — home screen -->`. Delete both
`<section>` blocks and their comment markers. After this edit, the next
slide's comment marker `<!-- 10 ·` is the slide that follows slide 7.

- [ ] **Step 3: Renumber old comment markers 10→8, 11→9, 12→10, 13→11, 14→12, 15→13, 16→14**

For each, change the leading number in the HTML comment AND any plan-side
heading. Use seven separate Edit tool calls, one per slide, anchored on
the full comment string so they're unique:

| Old comment | New comment |
|---|---|
| `<!-- 10 · IMAGE · Side-by-side comparison — home -->` | `<!-- 8 · IMAGE · Side-by-side comparison — home -->` |
| `<!-- 11 · IMAGE · Side-by-side — menu screen -->` | `<!-- 9 · IMAGE · Side-by-side — menu screen -->` |
| `<!-- 12 · IMAGE · Side-by-side — product customization -->` | `<!-- 10 · IMAGE · Side-by-side — product customization -->` |
| `<!-- 13 · IMAGE · Side-by-side — cart / checkout -->` | `<!-- 11 · IMAGE · Side-by-side — cart / checkout -->` |
| `<!-- 14 · BIG-WORD · The trap -->` | `<!-- 12 · BIG-WORD · The trap -->` |
| `<!-- 15 · BIG-WORD · The trap, part 2 -->` | `<!-- 13 · BIG-WORD · The trap, part 2 -->` |
| `<!-- 16 · DIAGRAM · Two architectures — silhouettes only -->` | `<!-- 14 · DIAGRAM · Two architectures — silhouettes only -->` |

(If the existing comment text differs from the exact string above, use the
existing comment text verbatim and just change the leading number.)

- [ ] **Step 4: Normalize sizing on new slides 8–11 (was 10–13)**

For each of new 8, 9, 10, 11 (the four side-by-side comparison slides):
inside `<section class="slide slide--content">`, replace the `<div
class="slide__body" style="...">` line with `<div class="slide__body
phones-hero">` and remove the inline `style` attribute. Keep the inner
phone markup as-is.

If a slide has both a body grid and an additional bottom caption (slide
8 — was 10 — has `"Spot the difference."`), wrap the phones in
`<div class="phones-hero">` inside the body, then put the caption below
it as a separate sibling. Example for new slide 8:

```html
      <!-- 8 · IMAGE · Side-by-side comparison — home -->
      <section class="slide slide--content">
        <h3 class="slide__title">Same on the outside</h3>
        <div class="slide__body">
          <div class="phones-hero">
            <!-- existing two .phone elements -->
          </div>
          <p class="t-caption" style="text-align:center; margin-top: var(--space-4);">"Spot the difference."</p>
        </div>
      </section>
```

(Use the slide's existing title; the snippet above shows shape only.)

- [ ] **Step 5: Swap slide 14 (was 16) to use `two-architectures-detailed.png`**

Replace the inline-SVG body of the slide with:

```html
      <!-- 14 · DIAGRAM · Two architectures — silhouettes only -->
      <section class="slide slide--content">
        <h3 class="slide__title">Two different worlds inside</h3>
        <div class="slide__body diagram-wrap">
          <img src="assets/diagrams/two-architectures-detailed.png"
               alt="Android per-feature module stack vs iOS layered architecture"
               class="diagram-img">
        </div>
      </section>
```

(Reuse the slide's existing title if it's different — the snippet shows
the structural shape.)

- [ ] **Step 6: Update `PRESENTATION_PLAN.md` — delete entries 8 and 9, renumber 10→8 through 16→14**

In `PRESENTATION_PLAN.md`:

1. Delete the entire `### Slide 8 | ...` and `### Slide 9 | ...` blocks
   (the entries + all their bullet lines, up to the next `### Slide` line
   or `---` separator).
2. For each of old slides 10 through 16, change `### Slide N | ...` to
   `### Slide (N-2) | ...`. Use seven Edit tool calls anchored on the
   full heading line.
3. For new slide 14 (was 16), update the `Visual:` and add an `Image:`
   line:
   ```
   - Visual: stacked-layers diagram — Android UI/Presentation/Domain/Data
     repeated per-feature vs iOS as four horizontal bars + a Domain+Data
     box. Same product, different geometry.
   - Image: `presentation/assets/diagrams/two-architectures-detailed.png`
   ```

- [ ] **Step 7: Adjust speaker note on new slide 8 (was 10)**

In `PRESENTATION_PLAN.md`, change the `Speaker:` line for new slide 8
from "Side by side. From the outside…" to:

```
- Speaker: "First look. Two phones, two platforms. From the outside — basically the same app. Same brand, same flows, same feature set."
```

(Reason: slides 8 and 9 used to set the scene before this; now this slide
*is* the first audience look.)

- [ ] **Step 8: Sanity-check counts and comment markers**

```bash
grep -c '<section class="slide ' presentation/index.html
grep -cE '^### Slide [0-9]+ ' PRESENTATION_PLAN.md
# Expected both: 125 (127 − 2)

grep -oE '<!-- ([0-9]+) ' presentation/index.html \
  | awk '{print $2+0}' | sort -n | uniq -c | awk '$1!=1'
# Expected: no output
```

If counts disagree or the awk one-liner prints anything, fix before
committing.

- [ ] **Step 9: Commit**

```bash
git add presentation/index.html PRESENTATION_PLAN.md
git commit -m "$(cat <<'EOF'
v3 part 1 — drop solo-platform shots, normalize comparisons, swap arch diagram

- Drops old slides 8 + 9 (single-platform iOS / Android home shots) —
  the side-by-side row that follows already makes the same point with
  stronger visuals.
- Normalizes new slides 8-11 (was 10-13) to the .phones-hero layout
  so all four side-by-side comparison slides match slide 8's larger
  phone sizing.
- Swaps new slide 14 (was 16) from inline-SVG silhouettes to
  two-architectures-detailed.png.
- Adds purple bloom to Part 1 section title (new slide 7).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Part 2 edits (slides 15–27 in v3)

This task adds the orange bloom to Part 2's section title, replaces slide
18 with a full-bleed five-video tile (becomes new slide 16), drops slide
19, and swaps slide 27 to the 2× video (becomes new slide 24).

**Files:**
- Modify: `presentation/index.html`
- Modify: `PRESENTATION_PLAN.md`

- [ ] **Step 1: Add bloom to Part 2 section title (old 17 → new 15)**

Renumber the comment marker from 17 to 15 AND change the class on the
`<section>`:

```html
      <!-- 15 · BIG-WORD · Section title -->
      <section class="slide slide--section bg-bloom bloom--orange">
```

(Keep the existing inner BIG-WORD content `**2 · Why our client got fat**`.)

Update the matching plan heading: `### Slide 17 | BIG-WORD | Section title` → `### Slide 15 | BIG-WORD | Section title`.

- [ ] **Step 2: Replace slide 18's content with the full-bleed video tile, renumber to 16**

Delete the entire current `<section>` for old slide 18 and the
`<h3 class="slide__title">A deliberately big menu</h3>` etc., and replace with:

```html
      <!-- 16 · IMAGE · Menu — five-video tile (full bleed) -->
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

Update the `### Slide 18` entry in `PRESENTATION_PLAN.md` and renumber to 16:

```markdown
### Slide 16 | IMAGE | Menu — five-video tile (full bleed)
- Visual: full-bleed slide, no title, no chrome. Five looping silent
  WEBM clips of the menu screen tiled left-to-right. Each video fills
  the slide's full height; widths preserve original ratio; the row is
  clipped at the right edge if the trailing videos overflow.
- Asset: `presentation/assets/media/menu-{1..5}.webm`
- Speaker: "Drinkit has a deliberately complex menu. Tens of drinks, dozens of food items."
```

- [ ] **Step 3: Delete old slide 19 from index.html and plan**

In `presentation/index.html`, locate `<!-- 19 · IMAGE · Customization — sliders / ingredients -->` and delete the entire `<section>` block + comment.

In `PRESENTATION_PLAN.md`, delete the `### Slide 19 | IMAGE | Customization — sliders / ingredients` entry block.

- [ ] **Step 4: Renumber old comment markers 20→17 through 30→27 in index.html**

Eleven separate Edit calls, anchored on each comment-marker line. Mapping:

| Old | New |
|---:|---:|
| 20 | 17 |
| 21 | 18 |
| 22 | 19 |
| 23 | 20 |
| 24 | 21 |
| 25 | 22 |
| 26 | 23 |
| 27 | 24 |
| 28 | 25 |
| 29 | 26 |
| 30 | 27 |

Mirror in `PRESENTATION_PLAN.md` — same 11 heading renames.

- [ ] **Step 5: Swap slide 24 (was 27) to the 2× video**

In `presentation/index.html`, on the new slide 24 (was 27), change:

```html
<video src="assets/media/microinteraction.webm"
```
to:
```html
<video src="assets/media/microinteraction-2x.webm"
```

(Single replacement inside that one `<section>`.)

In `PRESENTATION_PLAN.md`, on the new slide 24 entry, change the
`File:`/`Asset:` line to:

```
- Asset: `presentation/assets/media/microinteraction-2x.webm` (2× the
  original — re-encoded with `ffmpeg setpts=0.5*PTS -an`)
```

- [ ] **Step 6: Sanity-check counts and comment markers**

```bash
grep -c '<section class="slide ' presentation/index.html
grep -cE '^### Slide [0-9]+ ' PRESENTATION_PLAN.md
# Expected: 124 (127 − 2 [Part 1] − 1 [Part 2 drop 19])

grep -oE '<!-- ([0-9]+) ' presentation/index.html \
  | awk '{print $2+0}' | sort -n | uniq -c | awk '$1!=1'
# Expected: no output
```

- [ ] **Step 7: Browser walk-through**

```bash
cd presentation && python3 -m http.server 8000 > /tmp/v3-server.log 2>&1 &
SERVER_PID=$!
sleep 1
# Visit http://localhost:8000/#15, #16, #17, #24 manually.
# Check: bloom visible on 15; five videos auto-playing on 16, no title bar,
# no page-num overlay, row clipped at right; 17 transitions cleanly from
# the bleed slide back to a normal-padded slide; #24's microinteraction
# is visibly faster than v2.4.
kill $SERVER_PID
```

- [ ] **Step 8: Commit**

```bash
git add presentation/index.html PRESENTATION_PLAN.md
git commit -m "$(cat <<'EOF'
v3 part 2 — full-bleed menu video tile, faster brand-feel video, orange bloom

- Replaces slide 18 (was a CSS-card menu placeholder) with a
  full-bleed five-video tile (slide--bleed + video-tile), no chrome.
- Drops slide 19 (customization sliders shot) — redundant with the
  micro-interaction video that follows.
- Slide 27 (now 24) points to microinteraction-2x.webm so the brand
  beat lands at the 10-sec/slide pacing.
- Adds orange bloom to Part 2 section title (new slide 15).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Part 3 edits (slides 28–41 in v3) — Russian bug quote + blue bloom

**Files:**
- Modify: `presentation/index.html`
- Modify: `PRESENTATION_PLAN.md`

- [ ] **Step 1: Renumber Part 3 comment markers in index.html**

| Old | New |
|---:|---:|
| 31 | 28 |
| 32 | 29 |
| 33 | 30 |
| 34 | 31 |
| 35 | 32 |
| 36 | 33 |
| 37 | 34 |
| 38 | 35 |
| 39 | 36 |
| 40 | 37 |
| 41 | 38 |
| 42 | 39 |
| 43 | 40 |
| 44 | 41 |

Mirror in `PRESENTATION_PLAN.md`.

- [ ] **Step 2: Add blue bloom to new slide 28 (was 31, Part 3 section title)**

Change the `<section>` class on `<!-- 28 · BIG-WORD · Section title -->`
to `slide slide--section bg-bloom bloom--blue`.

- [ ] **Step 3: Replace slide 32's bug-quote content with the Russian feedback message**

Locate `<!-- 32 · IMAGE · Bug report mock -->` (after the renumber).

Inside the `<section>`, the existing structure is a chat-card with a
header (`customer · #drinkit-bugs`, timestamp) and a `t-h3` paragraph
holding the English quote.

Change:
- channel name `#drinkit-bugs` → `#drinkit-feedback`
- timestamp text — keep as-is (`today, 14:32`) since the speaker doesn't
  cite it
- the English quote `<p class="t-h3">…</p>` paragraph: replace its
  contents with:

```html
            <p class="t-h3" style="margin:0; font-weight: var(--weight-light); line-height: 1.3;">
              «А почему у моей подруги комбо доступно,<br/>
              а у меня на айфоне нет? Что за несправедливость?!»
            </p>
```

Also update the slide title `<h3 class="slide__title">Bug report</h3>` →
`<h3 class="slide__title">Customer feedback</h3>` (the new tone is
"feedback channel quote", not "bug ticket").

- [ ] **Step 4: Update the matching plan entry for new slide 32**

```markdown
### Slide 32 | IMAGE | Customer feedback (combo)
- Visual: Telegram/Slack-style chat-card mock — `#drinkit-feedback`
  channel, customer avatar circle, timestamp, single message paragraph
  in Russian.
- On-screen text:
  - `customer · #drinkit-feedback · today, 14:32`
  - «А почему у моей подруги комбо доступно, а у меня на айфоне нет?
    Что за несправедливость?!»
- Speaker: "Real example, from our internal feedback channel. A customer noticed her friend's Android has a combo that her iPhone doesn't show. Now we have a bug. Or do we?"
```

- [ ] **Step 5: Sanity-check counts and Cyrillic rendering**

```bash
grep -c '<section class="slide ' presentation/index.html
grep -cE '^### Slide [0-9]+ ' PRESENTATION_PLAN.md
# Expected both: 124 (unchanged from end of Part 2)

cd presentation && python3 -m http.server 8000 > /tmp/v3-server.log 2>&1 &
SERVER_PID=$!
sleep 1
# Open http://localhost:8000/#32 — check Russian renders in the same
# body font (no glyph-fallback boxes), card layout intact, bloom on
# slide 28 visible.
kill $SERVER_PID
```

- [ ] **Step 6: Commit**

```bash
git add presentation/index.html PRESENTATION_PLAN.md
git commit -m "$(cat <<'EOF'
v3 part 3 — Russian feedback quote + blue bloom

- Slide 32 (was 35) — replaces the English "bug ticket" mock with a
  Russian quote from the #drinkit-feedback channel. The customer-vs-
  customer comparison frames the issue better than a synthetic bug
  report and reads natively for the Almaty audience.
- Adds blue bloom to Part 3 section title (new slide 28).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Part 4 edits (slides 42–61 in v3) — codegen asymmetry + 5 bad-try diagrams

This is the largest content delta. Part 4 in v3:
- Gains a new COMPARE slide between old 54 and old 55.
- Replaces old 58 + 59 (bullets) with five new DIAGRAM slides.
- Picks up mint bloom on the section title.
- Adds source-of-truth captions on old 53 + 54.
- Swaps old 51 to the new module-graph PNG.

**Files:**
- Modify: `presentation/index.html`
- Modify: `PRESENTATION_PLAN.md`

- [ ] **Step 1: Renumber old comment markers 45–57 → 42–55 in index.html**

| Old | New |
|---:|---:|
| 45 | 42 |
| 46 | 43 |
| 47 | 44 |
| 48 | 45 |
| 49 | 46 |
| 50 | 47 |
| 51 | 48 |
| 52 | 49 |
| 53 | 50 |
| 54 | 51 |
| 55 | 53 | ← note: skips 52 (reserved for new COMPARE)
| 56 | 54 |
| 57 | 55 |

For slides 55, 56, 57 (becoming 53, 54, 55), the renumber jumps by 2
instead of 3 because we insert a new slide 52 between old 54 and old 55.

Mirror in `PRESENTATION_PLAN.md`.

- [ ] **Step 2: Add mint bloom to new slide 42 (was 45, Part 4 section title)**

Change `<section>` class for `<!-- 42 · BIG-WORD · Section title -->` to
`slide slide--section bg-bloom bloom--mint`.

- [ ] **Step 3: Swap new slide 48 (was 51) to the module-graph PNG**

Inside `<!-- 48 · COMPARE · Android vs iOS side-by-side -->`, replace
the entire `<div class="slide__columns">…</div>` body with:

```html
        <div class="slide__body diagram-wrap">
          <img src="assets/diagrams/ios-android-modules.png"
               alt="Android per-feature modules vs iOS layered architecture"
               class="diagram-img">
        </div>
```

Change the slide's class from `slide slide--two-col` to
`slide slide--content` since it now uses a diagram body, not columns. Keep
the title `<h3>` line and add the caption:

```html
      <!-- 48 · DIAGRAM · Android vs iOS module graph -->
      <section class="slide slide--content">
        <h3 class="slide__title">Same product. Different geometry.</h3>
        …
      </section>
```

Update the matching plan entry. Change the `TYPE` in the heading from
`COMPARE` to `DIAGRAM`:

```markdown
### Slide 48 | DIAGRAM | Android vs iOS module graph
- Visual: side-by-side module graph — Android (left) has app → per-feature
  UI/presentation/domain-api/domain-impl/data stacks; iOS (right) has
  app → presentation → UI → domain → data(generated) as four horizontal
  bars. Same product, different geometry.
- Image: `presentation/assets/diagrams/ios-android-modules.png`
- Speaker: "Side by side. They share *zero* structural assumptions."
```

- [ ] **Step 4: Add source-of-truth caption to slides 50 and 51 (was 53, 54)**

For new slide 50 (was 53 — Android Retrofit code), find the existing
`<p class="code-caption">Android — Retrofit, generated by our codegen.</p>`
line. Replace its body and add a second caption beneath the code block:

```html
        <p class="code-caption">Android — Retrofit, generated by our codegen.</p>
        <pre class="code-block">…existing code…</pre>
        <p class="code-caption-bottom">Source of truth: generated Kotlin · committed to repo.</p>
```

For new slide 51 (was 54 — iOS OpenAPI):

```html
        <p class="code-caption">iOS — Apple's OpenAPI Generator.</p>
        <pre class="code-block">…existing code…</pre>
        <p class="code-caption-bottom">Source of truth: JSON spec · Swift regenerated on every build.</p>
```

Update both matching plan entries — add a `Caption:` (or extend the
existing one) so the plan reflects the new line on each slide.

- [ ] **Step 5: Insert new slide 52 — "Different source of truth" COMPARE**

In `presentation/index.html`, insert this `<section>` immediately after
new slide 51 (the iOS OpenAPI code slide):

```html
      <!-- 52 · COMPARE · Different source of truth -->
      <section class="slide slide--two-col">
        <h3 class="slide__title">Different source of truth</h3>
        <div class="slide__columns">
          <div class="slide__col anim-from-left">
            <p class="t-mono-bold" style="color: var(--color-accent-orange);">// android</p>
            <h4 class="t-h4">Generated Kotlin <em>is</em> the contract.</h4>
            <ul class="list">
              <li>Committed to the repo.</li>
              <li>Diff-able.</li>
              <li>Code-reviewed.</li>
            </ul>
          </div>
          <div class="slide__col anim-from-right">
            <p class="t-mono-bold" style="color: var(--color-accent-purple);">// ios</p>
            <h4 class="t-h4">JSON <em>is</em> the contract.</h4>
            <ul class="list">
              <li>Swift built fresh each time.</li>
              <li>No DTO in the repo.</li>
              <li>Generator output is ephemeral.</li>
            </ul>
          </div>
        </div>
      </section>
```

Insert the matching plan entry:

```markdown
### Slide 52 | COMPARE | Different source of truth
- Visual: two-col. Orange eyebrow `// android` on the left, purple
  `// ios` on the right.
- On-screen text:
  - **Android:** Generated Kotlin *is* the contract. Committed. Diff-able. Code-reviewed.
  - **iOS:** JSON *is* the contract. Swift built fresh each time. No DTO in the repo.
- Speaker: "Worth pausing on — these look like 'just different HTTP libraries.' They're not. On Android the generated Kotlin *is* a committed source file we review; on iOS there's nothing in the repo to review — just the JSON spec and whatever the generator spits out at build time."
```

- [ ] **Step 6: Replace slides 58 + 59 (old) with 5 new DIAGRAM slides**

After the Step 1 renumber, old slides 58 and 59 are now at positions
*following* new slide 55 in the file. Delete those two `<section>` blocks
and insert these five in their place:

```html
      <!-- 56 · DIAGRAM · Option 1 — data + domain together -->
      <section class="slide slide--content">
        <h3 class="slide__title">Option 1 — data + domain together</h3>
        <div class="slide__body diagram-wrap">
          <img src="assets/diagrams/bad-try-data-and-domain.png"
               alt="Highlighted Android domain-impl/data and iOS domain/data — different shapes, can't merge"
               class="diagram-img">
        </div>
      </section>

      <!-- 57 · DIAGRAM · Option 2 — data only -->
      <section class="slide slide--content">
        <h3 class="slide__title">Option 2 — data only</h3>
        <div class="slide__body diagram-wrap">
          <img src="assets/diagrams/bad-try-data-only.png"
               alt="Highlighted Android data per feature and iOS generated data — still different shapes"
               class="diagram-img">
        </div>
      </section>

      <!-- 58 · DIAGRAM · Option 3 — one full feature -->
      <section class="slide slide--content">
        <h3 class="slide__title">Option 3 — one full feature</h3>
        <div class="slide__body diagram-wrap">
          <img src="assets/diagrams/bad-try-one-full-feature.png"
               alt="One full Android feature stack lifted into KMP — pulls the data layer with it"
               class="diagram-img">
        </div>
      </section>

      <!-- 59 · DIAGRAM · Option 4 — Android style on iOS -->
      <section class="slide slide--content">
        <h3 class="slide__title">Option 4 — bend iOS to Android style</h3>
        <div class="slide__body diagram-wrap">
          <img src="assets/diagrams/bad-try-android-style-on-ios.png"
               alt="iOS architecture replaced with per-feature modules — year of churn, no user value"
               class="diagram-img">
        </div>
      </section>

      <!-- 60 · DIAGRAM · Option 5 — take infra -->
      <section class="slide slide--content">
        <h3 class="slide__title">Option 5 — take infra (logs, analytics, …)</h3>
        <div class="slide__body diagram-wrap">
          <img src="assets/diagrams/bad-try-take-infra.png"
               alt="Highlighted cross-cutting infra (logs, analytics, etc.) — designed differently on each platform"
               class="diagram-img">
        </div>
      </section>
```

In `PRESENTATION_PLAN.md`, delete the existing `### Slide 58 | BULLETS |
Option A — take the network layer` and `### Slide 59 | BULLETS | Option
B — take data + domain` entries, and insert five new entries:

```markdown
### Slide 56 | DIAGRAM | Option 1 — data + domain together
- Visual: same module-graph backdrop, with both Android's domain-impl/data
  and iOS's domain/data outlined in dashed purple. Red ✗ in the middle.
- Image: `presentation/assets/diagrams/bad-try-data-and-domain.png`
- Speaker: "Take both layers — but our two 'data' shapes already disagree (generated and committed on Android vs. on-the-fly on iOS); the merge would be a rewrite."

### Slide 57 | DIAGRAM | Option 2 — data only
- Visual: same backdrop, only the `data` layers highlighted. Red ✗.
- Image: `presentation/assets/diagrams/bad-try-data-only.png`
- Speaker: "Just data — same problem; 'data' means different things on each side."

### Slide 58 | DIAGRAM | Option 3 — one full feature
- Visual: one Android feature column highlighted (UI/presentation/domain-api/domain-impl/data) + the matching iOS layers. Red ✗.
- Image: `presentation/assets/diagrams/bad-try-one-full-feature.png`
- Speaker: "One full feature top-to-bottom — pulls in the whole data layer again."

### Slide 59 | DIAGRAM | Option 4 — bend iOS to Android style
- Visual: backdrop with the iOS column reshaped into per-feature module stacks. Red ✗.
- Image: `presentation/assets/diagrams/bad-try-android-style-on-ios.png`
- Speaker: "Bend iOS to per-feature modules — different architecture by force, year of cleanup, zero user value."

### Slide 60 | DIAGRAM | Option 5 — take infra
- Visual: backdrop with a `common` bar highlighted underneath both stacks. Red ✗.
- Image: `presentation/assets/diagrams/bad-try-take-infra.png`
- Speaker: "Take cross-cutting infra instead — logging, analytics, etc. They're designed differently on each side. Big effort, little user-visible impact."
```

- [ ] **Step 7: Renumber old slide 60 → new slide 61**

After Step 6, the slide that follows new slide 60 in the file is the
old slide 60 ("Stuck — everything pulls on everything"). Renumber its
comment to `<!-- 61 · BIG-WORD · Stuck -->` (verify the exact text in the
file) and update the plan heading.

- [ ] **Step 8: Sanity-check counts**

```bash
grep -c '<section class="slide ' presentation/index.html
grep -cE '^### Slide [0-9]+ ' PRESENTATION_PLAN.md
# Expected both: 127 (124 + 1 [new 52] + 5 [new 56-60] − 2 [old 58+59])

grep -oE '<!-- ([0-9]+) ' presentation/index.html \
  | awk '{print $2+0}' | sort -n | uniq -c | awk '$1!=1'
# Expected: no output
```

- [ ] **Step 9: Browser walk-through**

```bash
cd presentation && python3 -m http.server 8000 > /tmp/v3-server.log 2>&1 &
SERVER_PID=$!
sleep 1
# Visit: #42 (mint bloom), #48 (module graph), #50, #51 (captions),
# #52 (new COMPARE), #56..#60 (five bad-try diagrams), #61 (Stuck).
# Verify diagrams scale properly, captions readable, COMPARE
# eyebrows are correct colors.
kill $SERVER_PID
```

- [ ] **Step 10: Commit**

```bash
git add presentation/index.html PRESENTATION_PLAN.md
git commit -m "$(cat <<'EOF'
v3 part 4 — codegen asymmetry + five bad-try diagrams + mint bloom

- Slide 48 (was 51) swaps to ios-android-modules.png (single PNG
  consolidating old 51.png/63.png).
- Slides 50, 51 (was 53, 54) gain source-of-truth captions:
  "committed Kotlin" vs "regenerated Swift".
- NEW slide 52 — COMPARE "Different source of truth" — bridges the
  two code slides and makes the commit-vs-on-the-fly point explicit.
- Replaces slides 58+59 (two bullet slides) with five DIAGRAM slides
  (new 56-60) — one rejected KMP architecture per slide, each backed
  by a bad-try-*.png diagram.
- Adds mint bloom to Part 4 section title (new slide 42).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Part 5 edits (slides 62–74 in v3) — module-graph swaps + wiring rewrite

Part 5 in v3:
- Picks up purple bloom on the section title.
- Swaps old 63 + 64 to the new module-graph PNGs.
- Inserts a new diagram (`pure-function-shared-domain.png`) right after
  old slide 68 (becomes new slide 70).
- Replaces old 69–72 (four dense-domain-code slides) with three wiring
  slides (becomes new 71, 72, 73).

**Files:**
- Modify: `presentation/index.html`
- Modify: `PRESENTATION_PLAN.md`

- [ ] **Step 1: Renumber Part 5 comment markers in index.html**

After Task 7, old slide 60 is now new slide 61. The Part 5 section title
(old 61) becomes new 62, etc. Mapping (old → new):

| Old | New | Note |
|---:|---:|---|
| 61 | 62 | Section title (gains bloom) |
| 62 | 63 | |
| 63 | 64 | Image swap (this task) |
| 64 | 65 | Image swap (this task) |
| 65 | 66 | |
| 66 | 67 | |
| 67 | 68 | |
| 68 | 69 | |
| — | 70 | NEW (this task) |
| 69 | 71 | Content replaced (this task) |
| 70 | 72 | Content replaced (this task) |
| 71 | 73 | Content replaced (this task) |
| 72 | — | DROP (this task) |
| 73 | 74 | |

- [ ] **Step 2: Apply renumbers**

Edit each old-numbered comment marker in `presentation/index.html` to its
new number (12 edits including the deletion in Step 7). Mirror in
`PRESENTATION_PLAN.md`.

- [ ] **Step 3: Add purple bloom to new slide 62 (was 61, Part 5 section title)**

Change the `<section>` class on `<!-- 62 · SECTION · 5 · One feature. Domain only. -->`
to `slide slide--section bg-bloom bloom--purple`.

(If the existing class is `slide--bigword`, change to `slide--section` per
AUTHORING.md §2 first.)

- [ ] **Step 4: Swap new slide 64 (was 63) to `ios-android-modules.png`**

Locate `<!-- 64 · DIAGRAM · Vertical slice — base state -->`. The current
body references `assets/diagrams/vertical-slice-base.png`. Change to
`assets/diagrams/ios-android-modules.png`. Also update the comment marker
title to reflect the new content:

```html
      <!-- 64 · DIAGRAM · Vertical slice — module graph -->
      <section class="slide slide--content">
        <h3 class="slide__title">Two architectures. One pick.</h3>
        <div class="slide__body diagram-wrap">
          <img src="assets/diagrams/ios-android-modules.png"
               alt="Android per-feature modules vs iOS layered architecture"
               class="diagram-img">
        </div>
      </section>
```

Update the matching plan entry. Same `Image:` and rename the heading to
`### Slide 64 | DIAGRAM | Vertical slice — module graph`.

- [ ] **Step 5: Swap new slide 65 (was 64) to `ios-android-modules-shareable.png`**

Locate `<!-- 65 · DIAGRAM · Vertical slice — slice highlighted -->`.
Change image src from `vertical-slice-highlighted.png` to
`ios-android-modules-shareable.png`. Same structure as Step 4 — update
the `alt` text to describe the green-check highlight.

```html
      <!-- 65 · DIAGRAM · Vertical slice — shareable highlighted -->
      <section class="slide slide--content">
        <h3 class="slide__title">The one slice we can lift</h3>
        <div class="slide__body diagram-wrap">
          <img src="assets/diagrams/ios-android-modules-shareable.png"
               alt="Same module graph with one Android feature's domain-impl and iOS domain highlighted as shareable — green check between them"
               class="diagram-img">
        </div>
      </section>
```

Update plan entry similarly.

- [ ] **Step 6: Insert new slide 70 — pure-function-shared-domain diagram**

After new slide 69 (was 68 — the placeholder pure-function-pattern
slide), insert this new `<section>`:

```html
      <!-- 70 · DIAGRAM · Pure function · shared domain in KMP -->
      <section class="slide slide--content">
        <h3 class="slide__title">What lives in KMP — just the pure function</h3>
        <div class="slide__body diagram-wrap">
          <img src="assets/diagrams/pure-function-shared-domain.png"
               alt="Android and iOS module graphs both arrowing into a single shared KMP domain box"
               class="diagram-img">
        </div>
      </section>
```

Insert the matching plan entry:

```markdown
### Slide 70 | DIAGRAM | Pure function · shared domain in KMP
- Visual: Android (left) and iOS (right) module graphs both arrow into
  a single shared KMP `domain` box in the centre. Nothing else moves.
- Image: `presentation/assets/diagrams/pure-function-shared-domain.png`
- Speaker: "Picture-form: Android's data and impl arrows pointing in, iOS's data and domain arrows pointing in, and in the middle one shared KMP domain box. Nothing else moves."
```

- [ ] **Step 7: Replace new slides 71, 72, 73 (was 69, 70, 71) with wiring slides + delete old slide 72**

Old slides 69, 70, 71, 72 are four code slides about combo internals
(`ComboTemplate`, `ComboResolver.resolve()`, `pickSlots`,
`computeTotalPrice`). Delete all four. In their place insert three new
slides:

```html
      <!-- 71 · CODE · The whole shared surface (template) -->
      <section class="slide slide--content">
        <h3 class="slide__title">The whole shared surface</h3>
        <div class="slide__body">
          <p class="code-caption">combo/src/commonMain/.../ComboResolver.kt</p>
<pre class="code-block"><span class="tok-c">// Inputs in. Result out. No platform deps.</span>
<span class="tok-k">fun</span> <span class="tok-n">resolveCombo</span>(
    template: <span class="tok-t">ComboTemplate</span>,
    menu: <span class="tok-t">Menu</span>,
): <span class="tok-t">ComboResolution</span></pre>
          <p class="code-caption-bottom">One pure function. Deterministic. No IO.</p>
        </div>
      </section>

      <!-- 72 · CODE · Wiring on Android — one line -->
      <section class="slide slide--content">
        <h3 class="slide__title">Wiring on Android — one line</h3>
        <div class="slide__body">
          <p class="code-caption">drinkit-android/feature/combo/build.gradle.kts</p>
<pre class="code-block"><span class="tok-k">dependencies</span> {
    <span class="tok-n">implementation</span>(<span class="tok-s">"io.dodobrands.kmp:combo:1.0.0"</span>)
}</pre>
          <p class="code-caption">…call site</p>
<pre class="code-block"><span class="tok-k">val</span> result = <span class="tok-n">resolveCombo</span>(template, menu)</pre>
        </div>
      </section>

      <!-- 73 · CODE · Wiring on iOS — one line -->
      <section class="slide slide--content">
        <h3 class="slide__title">Wiring on iOS — one line</h3>
        <div class="slide__body">
          <p class="code-caption">drinkit-ios/Package.swift</p>
<pre class="code-block">.<span class="tok-n">package</span>(name: <span class="tok-s">"DodoKMP"</span>, path: <span class="tok-s">"../kmp"</span>)</pre>
          <p class="code-caption">…call site</p>
<pre class="code-block"><span class="tok-k">let</span> result = <span class="tok-t">ComboResolverKt</span>.<span class="tok-n">resolveCombo</span>(template: template, menu: menu)</pre>
        </div>
      </section>
```

Insert the matching plan entries:

```markdown
### Slide 71 | CODE | The whole shared surface (template)
- Code: 6-line template demonstrating that the entire shared API for combo
  is one pure function with two inputs and a deterministic result.
- Caption: `combo/src/commonMain/.../ComboResolver.kt`
- Speaker: "This is the entire shared API surface for combo — one pure function, deterministic, no IO. Inputs in, result out."

### Slide 72 | CODE | Wiring on Android — one line
- Code: `build.gradle.kts` dependency declaration + a one-line call site.
- Speaker: "How Android plugs in: one Gradle line, then call it like any local function."

### Slide 73 | CODE | Wiring on iOS — one line
- Code: `Package.swift` snippet declaring a `path:` dependency on the KMP
  module + a Swift call site using the `Kt` suffix.
- Speaker: "How iOS plugs in: SwiftPackage dependency on the KMP module, then call it like any other Swift function."
```

- [ ] **Step 8: Verify the "Inputs in. Result out." slide stays at new 74 (was 73)**

Old slide 73 is `BIG-WORD | Inputs in. Result out. No platform deps.`
After all the inserts/deletes above, it should now be new slide 74.
Verify its comment marker is `<!-- 74 ·` (renumber if not).

- [ ] **Step 9: Sanity-check counts**

```bash
grep -c '<section class="slide ' presentation/index.html
grep -cE '^### Slide [0-9]+ ' PRESENTATION_PLAN.md
# Expected both: 127 (127 + 1 [new 70] − 1 [4→3 replacement of old 69-72])

grep -oE '<!-- ([0-9]+) ' presentation/index.html \
  | awk '{print $2+0}' | sort -n | uniq -c | awk '$1!=1'
# Expected: no output
```

- [ ] **Step 10: Commit**

```bash
git add presentation/index.html PRESENTATION_PLAN.md
git commit -m "$(cat <<'EOF'
v3 part 5 — module-graph swaps, pure-function picture, wiring slides

- Slides 64, 65 (was 63, 64) — swap to ios-android-modules{,-shareable}.png.
- NEW slide 70 — pure-function-shared-domain.png lands the "what
  lives in KMP" picture right after the conceptual pattern slide.
- Replaces old 69-72 (four dense ComboTemplate/Resolver code slides)
  with three wiring slides: pure-function template (71), Android
  Gradle (72), iOS SwiftPackage (73). Audience now sees how the KMP
  library plugs into each app, not its internals.
- Adds purple bloom to Part 5 section title (new slide 62).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Part 6 edits (slides 75–83 in v3) — three diagrams replace slide 78, drop 81–85

**Files:**
- Modify: `presentation/index.html`
- Modify: `PRESENTATION_PLAN.md`

- [ ] **Step 1: Renumber Part 6 comment markers in index.html**

| Old | New | Note |
|---:|---:|---|
| 74 | 75 | Section title (gains bloom) |
| 75 | 76 | |
| 76 | 77 | |
| 77 | 78 | |
| 78 | 79 | Content replaced (this task) |
| — | 80 | NEW (this task) |
| — | 81 | NEW (this task) |
| 79 | 82 | unchanged content |
| 80 | 83 | unchanged content |
| 81 | — | DROP |
| 82 | — | DROP |
| 83 | — | DROP |
| 84 | — | DROP |
| 85 | — | DROP |

Apply the renumbers + deletes in `presentation/index.html` AND
`PRESENTATION_PLAN.md`. Use 9 Edit calls per file (5 renumbers + 5
deletions = 10 actions total; some can be combined when adjacent).

- [ ] **Step 2: Add orange bloom to new slide 75 (was 74, Part 6 section title)**

Change `<section>` class for `<!-- 75 · SECTION · 6 · When the feature needs more. -->`
to `slide slide--section bg-bloom bloom--orange`.

- [ ] **Step 3: Replace content of new slide 79 (was 78) with first new diagram**

```html
      <!-- 79 · DIAGRAM · We can't just lift data into KMP -->
      <section class="slide slide--content">
        <h3 class="slide__title">We can't just lift data into KMP</h3>
        <div class="slide__body diagram-wrap">
          <img src="assets/diagrams/kmp-data-only-blocked.png"
               alt="Android and iOS data layers arrowed at a shared KMP data box, blocked by a red X"
               class="diagram-img">
        </div>
      </section>
```

Update the matching plan entry. Replace the `Slide 78 | DIAGRAM | Shape of
a stateful feature` entry with:

```markdown
### Slide 79 | DIAGRAM | We can't just lift data into KMP
- Visual: same module-graph backdrop, with arrows from both Android
  domain-impl/data and iOS domain pointing toward a shared KMP `data`
  box. Big red ✗.
- Image: `presentation/assets/diagrams/kmp-data-only-blocked.png`
- Speaker: "We already saw why the data layer alone doesn't fit — generated vs. committed on each side, different shape. So: not this."
```

- [ ] **Step 4: Insert new slide 80 — `kmp-data-with-interfaces.png`**

After new slide 79, insert:

```html
      <!-- 80 · DIAGRAM · Network — invert it. Provide an interface. -->
      <section class="slide slide--content">
        <h3 class="slide__title">Network — invert it. Provide an interface.</h3>
        <div class="slide__body diagram-wrap">
          <img src="assets/diagrams/kmp-data-with-interfaces.png"
               alt="Shared KMP module exposes interface boxes; each app's data layer implements them"
               class="diagram-img">
        </div>
      </section>
```

Insert the matching plan entry:

```markdown
### Slide 80 | DIAGRAM | Network — invert it. Provide an interface.
- Visual: same backdrop. The KMP centre now exposes two `Interface`
  boxes that each app's data layer implements (arrows in from both
  Android and iOS sides).
- Image: `presentation/assets/diagrams/kmp-data-with-interfaces.png`
- Speaker: "Instead, the shared module defines a tiny HTTP-transport interface — each app's existing HTTP stack implements it. Ktor lives in KMP and talks to an engine that hands every request to the host."
```

- [ ] **Step 5: Insert new slide 81 — `kmp-domain-data-with-providers.png`**

After new slide 80, insert:

```html
      <!-- 81 · DIAGRAM · Domain — same trick. Data providers. -->
      <section class="slide slide--content">
        <h3 class="slide__title">Domain — same trick. Data providers.</h3>
        <div class="slide__body diagram-wrap">
          <img src="assets/diagrams/kmp-domain-data-with-providers.png"
               alt="KMP centre exposes two interface rows: data providers (menu/stop-list) and data (HTTP); each app fulfils both"
               class="diagram-img">
        </div>
      </section>
```

Insert the matching plan entry:

```markdown
### Slide 81 | DIAGRAM | Domain — same trick. Data providers.
- Visual: backdrop again. KMP centre now shows two interface rows —
  data providers (menu, stop-list, prompts) and the network data
  interfaces from the previous slide. Each app fulfils both.
- Image: `presentation/assets/diagrams/kmp-domain-data-with-providers.png`
- Speaker: "And the same trick for everything else the domain needs — the menu, the stop-list, prompts. The shared module declares 'data providers' as interfaces. Each app fulfils them with what it already has."
```

- [ ] **Step 6: Verify new slides 82 + 83 (was 79 + 80, the AiService code) are intact**

These slides should have moved unchanged. Their renumber was already done
in Step 1. Open `presentation/index.html`, find
`<!-- 82 · CODE · One entry point — the interface -->` and
`<!-- 83 · CODE · Sealed result — exhaustive on both platforms -->`.
Verify the code blocks (AiService interface; CreatedDrinkResult sealed
type) are unchanged.

- [ ] **Step 7: Confirm slides 81–85 (old) are deleted**

```bash
grep -n '<!-- 8[12345] ·' presentation/index.html
# Expected: no output (those comment markers no longer exist;
# the new comments at 81, 82, 83 are different titles, but the OLD
# titles we want gone are "Factory — the host wiring", "Three sockets",
# "Dependency inversion. Apps glue", "Full picture", "NOT replace + What
# we DID". Verify those strings don't appear in the file:)
grep -n 'Factory — the host wiring\|Three sockets the host plugs in\|Apps glue. They don.t change\|Full picture\|NOT replace' presentation/index.html
# Expected: no output
```

- [ ] **Step 8: Sanity-check counts**

```bash
grep -c '<section class="slide ' presentation/index.html
grep -cE '^### Slide [0-9]+ ' PRESENTATION_PLAN.md
# Expected both: 125 (127 + 2 [new 80, 81] − 1 [old 78 swapped not added]
# − 5 [drops 81-85])
# Wait: 127 + 2 − 0 swap − 5 drops = 124. Let me recount:
#   Start of task: 127
#   Replace old 78 (1) with new 79 (1) = 0 net
#   Insert new 80 = +1
#   Insert new 81 = +1
#   Drop old 81 = -1
#   Drop old 82 = -1
#   Drop old 83 = -1
#   Drop old 84 = -1
#   Drop old 85 = -1
#   Net = -3, new total = 124.

grep -oE '<!-- ([0-9]+) ' presentation/index.html \
  | awk '{print $2+0}' | sort -n | uniq -c | awk '$1!=1'
# Expected: no output
```

Actual expected count after this task: **124**. If your local count
shows otherwise, find the mismatch before committing.

- [ ] **Step 9: Browser walk-through**

```bash
cd presentation && python3 -m http.server 8000 > /tmp/v3-server.log 2>&1 &
SERVER_PID=$!
sleep 1
# Visit #75 (orange bloom), #79, #80, #81 (three new diagrams),
# #82, #83 (kept AiService code). Verify diagrams scale, diagrams 79-81
# tell the rejection→inversion→providers progression on their own
# without any of the deleted closing slides.
kill $SERVER_PID
```

- [ ] **Step 10: Commit**

```bash
git add presentation/index.html PRESENTATION_PLAN.md
git commit -m "$(cat <<'EOF'
v3 part 6 — three new diagrams replace slide 78, drop 81-85, orange bloom

- Slide 79 (was 78) — replaces inline-SVG "three sockets" with
  kmp-data-only-blocked.png (sets up the rejection beat).
- NEW slides 80, 81 — kmp-data-with-interfaces.png and
  kmp-domain-data-with-providers.png — carry the
  rejection → invert-network → invert-domain progression.
- Keeps the AiService interface + sealed result code (now 82, 83) as
  the only place the audience sees the actual API shape.
- Drops old 81 (factory code, redundant with new diagrams) and old
  82-85 (three-sockets SVG / dep-inversion big word / full-picture
  diagram / NOT replace closing) — same beats now carried by the new
  diagram triad.
- Adds orange bloom to Part 6 section title (new slide 75).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Part 7 edits (slides 84–97 in v3) — codegen bullet on slide 86 + drop 100/101

**Files:**
- Modify: `presentation/index.html`
- Modify: `PRESENTATION_PLAN.md`

- [ ] **Step 1: Renumber Part 7 comment markers in index.html**

| Old | New | Note |
|---:|---:|---|
| 86 | 84 | Section title (gains bloom) |
| 87 | 85 | |
| 88 | 86 | Add codegen bullet (this task) |
| 89 | 87 | |
| 90 | 88 | |
| 91 | 89 | |
| 92 | 90 | |
| 93 | 91 | |
| 94 | 92 | |
| 95 | 93 | |
| 96 | 94 | |
| 97 | 95 | |
| 98 | 96 | |
| 99 | 97 | |
| 100 | — | DROP |
| 101 | — | DROP |

Apply renumbers + the two deletes.

- [ ] **Step 2: Add blue bloom to new slide 84 (was 86, Part 7 section title)**

Change `<section>` class on `<!-- 84 · SECTION · 7 · The HTTP transport socket. -->`
to `slide slide--section bg-bloom bloom--blue`.

- [ ] **Step 3: Add codegen bullet to new slide 86 (was 88)**

Locate `<!-- 86 · BULLETS · Constraint -->`. The existing list has four
`<li>` items:

```
- Android — OkHttp + Retrofit + ~10 interceptors
- iOS — OpenAPI Generator + middleware chain
- Both: auth, URL rewriting, captcha, metrics, logs
- Replacing them is a year of work
```

Insert a new `<li>` between the iOS and "Both" lines, so the new list is:

```html
          <ul class="list list--lg stagger">
            <li><strong>Android</strong> — OkHttp + Retrofit + ~10 interceptors.</li>
            <li><strong>iOS</strong> — OpenAPI Generator + middleware chain.</li>
            <li>Android commits the generated Kotlin DTOs / HTTP clients. iOS regenerates Swift on every build — nothing in the repo.</li>
            <li>Both: auth, URL rewriting, captcha, metrics, logs.</li>
            <li>Replacing them is a <em>year</em> of work.</li>
          </ul>
```

Update the matching plan entry — insert the new bullet between the iOS
and the "Both" bullet:

```markdown
- On-screen text:
  - Android — OkHttp + Retrofit + ~10 interceptors
  - iOS — OpenAPI Generator + middleware chain
  - Android commits the generated Kotlin · iOS regenerates Swift on every build
  - Both: auth, URL rewriting, captcha, metrics, logs
  - Replacing them is a year of work
```

Update the `Speaker:` line:

```
- Speaker: "Both apps already have very mature, very opinionated HTTP stacks. Auth interceptors, captcha, URL routing per country, metrics, logging. And the source-of-truth is asymmetric — on Android the generated Kotlin is committed to the repo; on iOS it's regenerated on every build, nothing checked in. Either way — replacing them is a year of work. So we're not replacing them."
```

- [ ] **Step 4: Verify old slides 100 and 101 are gone**

```bash
grep -n '<!-- 10[01] ·' presentation/index.html
# Expected: no output. Also verify the old titles are gone:
grep -n 'Other inversions\|declare / fulfil' presentation/index.html
# Expected: no output
```

- [ ] **Step 5: Sanity-check counts**

```bash
grep -c '<section class="slide ' presentation/index.html
grep -cE '^### Slide [0-9]+ ' PRESENTATION_PLAN.md
# Expected both: 122 (124 − 2 drops)

grep -oE '<!-- ([0-9]+) ' presentation/index.html \
  | awk '{print $2+0}' | sort -n | uniq -c | awk '$1!=1'
# Expected: no output
```

- [ ] **Step 6: Commit**

```bash
git add presentation/index.html PRESENTATION_PLAN.md
git commit -m "$(cat <<'EOF'
v3 part 7 — codegen-asymmetry bullet + drop redundant closers, blue bloom

- Slide 86 (was 88) — adds the source-of-truth bullet
  ("Android commits generated Kotlin / iOS regenerates Swift on every
  build, nothing in the repo") to the constraint list.
- Drops old slides 100 (Other inversions diagram) and 101 (declare/
  fulfil BIG-WORD) — both beats now carried by the new Part 6 diagrams
  (kmp-data-with-interfaces / kmp-domain-data-with-providers).
- Adds blue bloom to Part 7 section title (new slide 84).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Part 8 + Part 9 blooms (slides 98 and 111)

**Files:**
- Modify: `presentation/index.html`
- Modify: `PRESENTATION_PLAN.md`

- [ ] **Step 1: Renumber Part 8 and Part 9 comment markers in index.html**

| Old | New |
|---:|---:|
| 102 | 98 |
| 103 | 99 |
| … | … |
| 114 | 110 |
| 115 | 111 |
| 116 | 112 |
| … | … |
| 127 | 123 |

All renumbers are uniform `-4`. Use 26 Edit calls (one per slide
102→98 … 127→123).

Mirror in `PRESENTATION_PLAN.md` (same 26 heading renames).

- [ ] **Step 2: Add mint bloom to new slide 98 (was 102, Part 8 section title)**

Change `<section>` class on `<!-- 98 · BIG-WORD · Section title -->`
(or `slide--section` — verify) to `slide slide--section bg-bloom bloom--mint`.

- [ ] **Step 3: Add purple bloom to new slide 111 (was 115, Part 9 section title)**

Change `<section>` class on `<!-- 111 · BIG-WORD · Section title -->` to
`slide slide--section bg-bloom bloom--purple`.

- [ ] **Step 4: Final sanity-check counts and comment markers**

```bash
grep -c '<section class="slide ' presentation/index.html
grep -cE '^### Slide [0-9]+ ' PRESENTATION_PLAN.md
# Expected both: 123

grep -oE '<!-- ([0-9]+) ' presentation/index.html \
  | awk '{print $2+0}' | sort -n | uniq -c | awk '$1!=1'
# Expected: no output

# Verify the comment markers cover 1..123 with no gaps:
grep -oE '<!-- ([0-9]+) ' presentation/index.html \
  | awk '{print $2+0}' | sort -n | tail -5
# Expected last value: 123

grep -oE '^### Slide ([0-9]+) ' PRESENTATION_PLAN.md \
  | awk '{print $3}' | sort -n | tail -5
# Expected last value: 123
```

- [ ] **Step 5: Browser walk-through of Parts 8 + 9**

```bash
cd presentation && python3 -m http.server 8000 > /tmp/v3-server.log 2>&1 &
SERVER_PID=$!
sleep 1
# Visit #98 (mint bloom), #111 (purple bloom), then click through
# 110 → 111 → 112 → 123 — verify no broken layouts, no missing
# assets, page numbers stamp 110/123 etc.
kill $SERVER_PID
```

- [ ] **Step 6: Commit**

```bash
git add presentation/index.html PRESENTATION_PLAN.md
git commit -m "$(cat <<'EOF'
v3 parts 8 + 9 — mint and purple section blooms; final renumber

- Adds mint bloom to Part 8 section title (new slide 98) and
  purple bloom to Part 9 section title (new slide 111).
- Final renumber pass for Parts 8 + 9 (uniform -4 shift).
- Final v3 deck count: 123 slides.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: Synced-doc updates — iOS-ARCHITECTURE.md and ASSETS.md

**Files:**
- Modify: `iOS-ARCHITECTURE.md`
- Modify: `ASSETS.md`
- Modify: `PRESENTATION_PLAN.md` (slide-count summary table at the bottom)

- [ ] **Step 1: Update `iOS-ARCHITECTURE.md` slide pointer paragraph**

Open `iOS-ARCHITECTURE.md`. Near the top (around lines 1–10), there's a
sentence:

> The deck's iOS-architecture slides (currently ~51, ~52, ~53) show a
> higher-level view of the same structure …

Per the v3 mapping, the iOS-arch slides are now **47** (iOS architecture),
**48** (Android-vs-iOS module graph), and **50** + **51** (Android Retrofit
+ iOS OpenAPI code). Replace the parenthetical with:

> (currently ~47, ~48, ~50, ~51)

Also confirm there are no other slide-number references in the doc
(search for `slide` case-insensitively); if any others exist, update them.

- [ ] **Step 2: Update `ASSETS.md`**

Mark satisfied items, append a v3 note. The full diff:

```markdown
# Assets needed for v3

When all of these are in `presentation/assets/`, v3 = wire them in. No
structural changes required.

## Missing screenshots

- [x] `screens/menu-hero.png` — replaced in v3 by the five-video tile
      (`media/menu-{1..5}.webm`) on slide 16
- [ ] `screens/combo-builder.png` — *optional* combo-builder still image
      — slide 66 now reuses `combo-transition.webm` so this is no longer
      strictly needed.

## Missing designed mockups

- [x] `mocks/bug-ticket.png` — replaced in v3 by the in-HTML Russian
      `#drinkit-feedback` chat-card mock on slide 32
- [ ] `mocks/kmp-getting-started.png` — screenshot of a KMP getting-
      started page (slide 43, was 46)

## Missing diagrams (PNG, content-based names)

- [x] `diagrams/green-field.png` — wired on slide 44 in v3
- [x] `diagrams/pure-function-pattern.png` — satisfied in v3 by
      `pure-function-shared-domain.png` on slide 70
- [x] `diagrams/combo-module-surface.png` — superseded; the
      pure-function shape is told by slide 70's diagram + slide 71's
      template snippet
- [x] `diagrams/stateful-feature-shape.png` — superseded by the
      kmp-data-only-blocked / kmp-data-with-interfaces /
      kmp-domain-data-with-providers triad on slides 79–81

## QR code

- [ ] `assets/qr.png` already exists, but the URL it encodes is **TBD**.
      Confirm the URL points to the public slides + sample-KMP repo
      before the talk.

## Other

- [x] Slide 121 (was 125) social handles — updated in v2.1.

## v3 status

v3 is shipping. Remaining open items above are non-blocking. The deck
renders 123 slides, all assets resolved.
```

(Slide numbers in the "wired on slide N" notes use v3 numbering. Verify
each by `grep -n '<!-- N ·' presentation/index.html` if uncertain.)

- [ ] **Step 3: Update the slide-count summary table at the bottom of `PRESENTATION_PLAN.md`**

Scroll to the bottom of `PRESENTATION_PLAN.md`. There's a per-part count
table. Replace it with the v3 counts:

```markdown
## Slide-count summary

| Part | Range | Count |
|---|---|---:|
| 0 — Opener | 1–6 | 6 |
| 1 — Two different apps? | 7–14 | 8 |
| 2 — Why our client got fat | 15–27 | 13 |
| 3 — We write the same thing twice | 28–41 | 14 |
| 4 — KMP — just start, right? | 42–61 | 20 |
| 5 — One feature. Domain only. | 62–74 | 13 |
| 6 — When the feature needs more. | 75–83 | 9 |
| 7 — The HTTP transport socket. | 84–97 | 14 |
| 8 — Getting iOS engineers to write Kotlin | 98–110 | 13 |
| 9 — Results & closing | 111–123 | 13 |
| **Total** |   | **123** |
```

(If the existing table headers/rows differ, replace the whole block — keep
the per-part Range and Count columns aligned with the table above.)

- [ ] **Step 4: Final full sanity check**

```bash
cd /Users/maxkach/dev/dodo/kmp-presentation
grep -c '<section class="slide ' presentation/index.html
grep -cE '^### Slide [0-9]+ ' PRESENTATION_PLAN.md
# Expected: 123 and 123

grep -oE '<!-- ([0-9]+) ' presentation/index.html \
  | awk '{print $2+0}' | sort -n | uniq -c | awk '$1!=1'
# Expected: no output

# Check that the asset references in HTML all resolve:
grep -oE 'assets/[a-z0-9/_.+-]+\.(png|jpg|jpeg|webm|webp)' presentation/index.html \
  | sort -u \
  | while read path; do
      [ -f "presentation/$path" ] || echo "MISSING: $path"
    done
# Expected: no output. Any "MISSING: …" lines indicate a broken reference.
```

- [ ] **Step 5: Browser walk-through — top to bottom**

```bash
cd presentation && python3 -m http.server 8000 > /tmp/v3-server.log 2>&1 &
SERVER_PID=$!
sleep 1
# Open http://localhost:8000/ and use arrow keys (or `g` + slide number)
# to walk every slide. Pay particular attention to:
#   #1   — cover + ad poster card
#   #7   — purple bloom
#   #14  — two-architectures-detailed.png
#   #15  — orange bloom
#   #16  — five-video bleed slide (no title, no chrome)
#   #24  — micro-interaction 2x
#   #28  — blue bloom
#   #32  — Russian quote in #drinkit-feedback
#   #42  — mint bloom
#   #48  — module-graph PNG
#   #50, #51 — code-caption-bottom on each
#   #52  — new COMPARE
#   #56-#60 — five bad-try diagrams
#   #62  — purple bloom
#   #64, #65 — module-graph swaps
#   #70  — pure-function-shared-domain
#   #71-#73 — wiring slides
#   #75  — orange bloom
#   #79-#81 — three new Part 6 diagrams
#   #82, #83 — AiService + sealed
#   #84  — blue bloom
#   #86  — codegen bullet inserted
#   #98  — mint bloom
#   #111 — purple bloom
#   #123 — final slide reachable
kill $SERVER_PID
```

- [ ] **Step 6: Commit and tag v3**

```bash
git add iOS-ARCHITECTURE.md ASSETS.md PRESENTATION_PLAN.md
git commit -m "$(cat <<'EOF'
v3 sync — iOS-arch pointers, ASSETS checklist, slide-count summary

- iOS-ARCHITECTURE.md: slide pointer paragraph updated to v3 numbers
  (~47, 48, 50, 51).
- ASSETS.md: marks the v2-deferred items satisfied (or noted as
  superseded) by v3 work. Remaining open items (QR URL, optional
  KMP getting-started screenshot, optional combo-builder still) are
  non-blocking.
- PRESENTATION_PLAN.md: slide-count summary updated to 123.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"

git tag v3
```

---

## Self-review summary

- **Spec coverage:** Each of the 18 changes from spec §4 maps to a task:
  4.1 → Task 3; 4.2 → Tasks 4–11 (bg-bloom per part); 4.3, 4.4, 4.5 →
  Task 4; 4.6, 4.7, 4.8 → Task 5; 4.9 → Task 6; 4.10, 4.11, 4.12 →
  Task 7; 4.13, 4.14, 4.15 → Task 8; 4.16, 4.17, 4.18 → Task 9;
  4.19, 4.20 → Task 10. Asset moves (§6) → Task 1. CSS (§7) → Task 2.
  Synced docs (§7) → Task 12.
- **Placeholders:** None. Every code/HTML/CSS step shows the exact
  content; every verify step shows the exact grep/curl command and
  expected output.
- **Renumber consistency:** §0 has the full old→new mapping. Every
  per-part task references the same numbers. Each task's expected
  slide-count value is computed and stated.
- **Asset name consistency:** Same names used in the asset-move task
  (Task 1), the HTML wiring tasks, and the plan entries.
