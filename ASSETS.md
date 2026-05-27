# Assets — status

v3.2 is shipping. All slide content is wired against assets that exist in `presentation/assets/`. The remaining open items below are non-blocking polish.

## Wired in v3 / v3.1 / v3.2

- `assets/portrait.jpg` — slide 2 (About me) AND slide 114 (closing portrait avatar)
- `assets/qr.png` — slide 114 (closing slide)
- `assets/diagrams/two-architectures-detailed.png` (slide 14)
- `assets/diagrams/ios-android-modules.png` (slide 36 and slide 50)
- `assets/diagrams/ios-android-modules-shareable.png` (slide 51)
- `assets/diagrams/bad-try-{data-and-domain,data-only,one-full-feature,android-style-on-ios,take-infra}.png` (slides 43–47)
- `assets/diagrams/pure-function-shared-domain.png` (slide 55)
- `assets/diagrams/kmp-data-only-blocked.png` (slide 63)
- `assets/diagrams/kmp-data-with-interfaces.png` (slide 66)
- `assets/diagrams/kmp-domain-data-with-providers.png` (slide 67)
- `assets/diagrams/kmp-integration.png` (slide 88)
- `assets/media/menu-{1..5}.webm` (slide 16, full-bleed five-video tile)
- `assets/media/microinteraction-2x.webm` — removed from deck in v3.3 (was slide 23 in v3.2; file stays in assets/)
- `assets/media/combo-transition.webm` (slides 17 and 53)

> Slide-number references in this file are accurate as of the v3.3 commit (final count 114).
> Slide numbers shift between iterations — when in doubt, grep
> for the asset filename in `presentation/index.html`.

## v3.1 changes

- Cover slide (1) dropped the `assets/ad.jpeg` poster inset; the file
  stays in `assets/` in case a future iteration wants to reuse it.
- Slides at the old v3 positions 46 + 47 (detailed per-platform
  architecture diagrams using `android-architecture.png` and
  `ios-architecture.png`) were dropped — slide 14 (v3.3: still 14) +
  slide 36 (v3.3; was 42 in v3.2, 46 in v3.1) carry the comparison
  instead. The PNG files stay in `assets/diagrams/` unreferenced.
- The v2-era "Pure-function pattern (placeholder for v3)" CSS card
  slide was dropped (no asset was wired to it).
- New asset `assets/diagrams/kmp-integration.png` wired into
  Part 8 (slide 88 in v3.3; was 98 in v3.1, 94 in v3.2).

## v3.2 changes

- Slide 3 (Dodo Engineering by the numbers) gains two brand app-icon
  decorations in the bottom-right: `assets/pizza.jpg` (Dodo Pizza) and
  `assets/drinkit.png` (Drinkit), rendered as 88px iOS-style rounded
  squares. (Slide 3 unchanged in v3.3.)
- Slide 23 (v3.2) absorbed the micro-interaction video from slide 24;
  `media/microinteraction-2x.webm` was in use on a single merged slide.
  In v3.3 that slide was removed — the asset is no longer referenced.
- Pacing-redundant slides dropped: 18 ("Thick client by design"), 21
  ("The price of thin"), 25 ("Will it pay off?"), 111 ("Solve the
  org first"). No assets removed.
- Slide 49 (v3.3; was 57 in v3.2) thesis-BIG-WORD replaced with a
  COMPARE that re-uses the Kotlin + Swift `pickSlotProduct` code from
  slide 26 (v3.3; was 31 in v3.2). The two slides must move in lock-step.
- Slide 102 (v3.3; was 109 in v3.2) "Shipped" bullets rewritten (3 → 5).
- Slide 112 (v3.3; was 118 in v3.2) "The advice" bullets (4 → 3); v3.3
  adds a TRANSITION lead-in (slide 111) carrying "If you take one thing…".

## v2 → v3 transitions (kept for history)

- [x] `screens/menu-hero.png` — superseded by the slide-16 five-video tile.
- [x] `mocks/bug-ticket.png` — replaced in v3 by the in-HTML Russian
      `#drinkit-feedback` chat-card mock (slide 21 in v3.3).
- [x] `diagrams/green-field.png` — wired on slide 34 (v3.3; was 44 in v3.2).
- [x] `diagrams/pure-function-pattern.png` — satisfied in v3 by
      `pure-function-shared-domain.png` on slide 55 (v3.3; was 67 in v3.2).
- [x] `diagrams/combo-module-surface.png` — superseded.
- [x] `diagrams/stateful-feature-shape.png` — superseded by
      kmp-data-only-blocked / kmp-data-with-interfaces /
      kmp-domain-data-with-providers triad (slides 63, 66, 67 in v3.3).

## Still open (non-blocking)

- [ ] `screens/combo-builder.png` — *optional* combo-builder still
      image. Slide 53 (v3.3) reuses `combo-transition.webm`.
- [ ] `mocks/kmp-getting-started.png` — *optional* screenshot of a
      KMP getting-started page (slide 33 in v3.3 uses a CSS-card
      placeholder).
- [ ] `assets/qr.png` exists, but the URL it encodes is **TBD**.
      Confirm it points to the public slides + sample-KMP repo
      before the talk.
