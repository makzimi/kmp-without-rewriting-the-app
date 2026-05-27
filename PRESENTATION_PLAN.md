# KMP without rewriting the app — slide-by-slide plan

> Talk: GDG Almaty meetup
> Speaker: Max Kachinkin, Dodo Engineering
> Target length: 22 minutes (range 20–25)
> Target slide count: ~130 (range 120–150)
> Slide language: **English** (on-screen text)
> Speaker notes language: **English**
> Style: Lessig/Takahashi — very little text per slide, bullets / diagrams / code / image; ~10 sec average per slide

---

## Slide-naming convention

Each entry uses the format:

```
### Slide N | <TYPE> | <short title>
- Visual: ...
- On-screen text: ...
- Code: ... (path, lines)
- Diagram: ... (described, not drawn)
- Image: ... (described)
- Speaker (talk track): ...
```

Types: `TITLE`, `BIG-WORD`, `BULLETS`, `IMAGE`, `DIAGRAM`, `CODE`, `COMPARE`, `QUOTE`, `TRANSITION`, `OUTRO`.
"Trimmed real snippet" means: take the cited lines from the listed file and shrink to 10–25 lines that fit on a slide (drop imports, drop docstrings unless quoted, keep the interesting part).

---

# PART 0 — OPENER (slides 1–6)

### Slide 1 | TITLE | Cover
- Visual: title card. Big talk title. Speaker name below. No event-poster
  inset (was added in v3, removed in v3.1).
- On-screen text:
  - **KMP without rewriting the app**
  - Max Kachinkin · Tech & Team Lead, Drinkit Mobile
  - Bereke Android Meetup · GDG Almaty · 28 May 2026
- Speaker: "Hi everyone, thanks for having me. Today I want to share a very specific, very practical story — how we started using Kotlin Multiplatform inside two big legacy mobile apps, without rewriting anything."

### Slide 2 | IMAGE | About me — photo + bio
- Visual: portrait photo on the left; on the right a name + role + company line + bullet list.
- On-screen text:
  - **Max Kachinkin** — Tech lead & Team lead · Drinkit Mobile · `// Dodo Engineering`
  - Android Tech Lead — 15 years of experience
  - Program Director, *Podlodka Android Crew*
  - Course Lead, *Android Developer Professional* @ Otus
  - Telegram channel *Mobile Fiction* · @mobilefiction
  - Writes on Habr / Medium
- Speaker: "Quick intro: I'm Max. Tech lead and team lead for the Drinkit mobile team at Dodo Engineering — we build the Drinkit app for both iOS and Android. Outside of Dodo I run the Podlodka Android Crew program, lead the Android Developer Professional course at Otus, write on Habr and Medium, and run a Telegram channel called Mobile Fiction. 15 years in mobile."

### Slide 3 | IMAGE | Dodo Engineering — by the numbers
- Visual: title "Dodo Engineering" at top, then a "By the numbers." cover-style line in accent purple, then three big numbers in a row: 63k employees, 365 in tech, 26 countries. Each number uses display-light at 96pt with a small lower-case caption under it. Bottom-right corner shows the two brand app icons (Dodo Pizza, then Drinkit) as rounded-square iOS-style icons (88px, 22% corner radius).
- Images: `presentation/assets/pizza.jpg`, `presentation/assets/drinkit.png` (bottom-right decorative pair)
- On-screen text:
  - Dodo Engineering
  - By the numbers.
  - **63k** employees · **365** in tech · **26** countries
- Speaker: "Quick scale-setting before I get into the talk. Dodo Engineering is the IT arm of Dodo Brands. Roughly 63 thousand people across the brand, 365 of us in tech, operating in 26 countries. So when I say 'the app' — it's running at this scale. Two consumer brands shipping mobile apps: Dodo Pizza and Drinkit."

### Slide 4 | IMAGE | What Drinkit is
- Visual: Drinkit app icon (`assets/app_icon.webp`) next to the word "Drinkit." on the left; a real Android home-screen screenshot (`assets/screens/home-android.png`) on the right wrapped in a phone frame.
- On-screen text: *Drinkit — specialty coffee from Dodo Brands.* And `// When I say "the app", this is the one.`
- Speaker: "For those who don't know — Drinkit is a specialty coffee brand from Dodo Brands. The mobile app is the way customers order. So when I talk about 'the app' today, that's the one."

### Slide 5 | BULLETS | Today's promise
- Visual: short bullet list, left aligned.
- On-screen text:
  - A real story, not a sales pitch
  - 2 production apps · iOS + Android · legacy code
  - How we started using KMP **without rewriting anything**
  - Honest results — what worked, what didn't
- Speaker: "I'm not going to tell you 'KMP is amazing, go use it.' I'll show you exactly how we sneaked it into two legacy apps, what blocked us, and what the results actually look like."

---

# PART 1 — Two different apps? (slides 7–14)

> Goal: trigger recognition of the problem.

### Slide 6 | BIG-WORD | Best question wins a prize
- Visual: BIG-WORD slide. Four pastel circles arranged across the lower third (pink / mint / yellow / peach) as decorative accents — playful, evoking the "monsters" in the reference design without literal illustrations. Main text centered with the word "prize" in the accent-purple, plus a 🎁 emoji.
- On-screen text: **Best question wins a prize. 🎁**
- Speaker: "Quick housekeeping before we start: best question at the end gets a prize. So pay attention 🙂"

### Slide 7 | BIG-WORD | Section title
- On-screen text: **1 · Do you also have two different apps?**
- Speaker: "Section one. Let me start with a question that I bet many of you here will recognize."

### Slide 8 | IMAGE | Side-by-side comparison — home
- Visual: two phones side by side, identical home screens.
- On-screen text: caption at the bottom: *"Spot the difference."*
- Speaker: "First look. Two phones, two platforms. From the outside — basically the same app. Same brand, same flows, same feature set."

### Slide 9 | IMAGE | Side-by-side — menu screen
- Visual: two phones side-by-side, menu list (categories of drinks).
- Speaker: "Menu screen — same."

### Slide 10 | IMAGE | Side-by-side — product customization
- Visual: two phones side-by-side, drink customization screen with ingredient sliders.
- Speaker: "Drink customization screen — same."

### Slide 11 | IMAGE | Side-by-side — cart / checkout
- Visual: two phones side-by-side, cart screen.
- Speaker: "Cart — same."

### Slide 12 | BIG-WORD | The trap
- On-screen text: **Same outside.**
- Speaker: "Same on the outside."

### Slide 13 | BIG-WORD | The trap, part 2
- On-screen text: **Two different worlds inside.**
- Speaker: "But inside? Two completely different worlds."

### Slide 14 | DIAGRAM | Two architectures — silhouettes only
- Visual: stacked-layers diagram — Android UI/Presentation/Domain/Data
  repeated per-feature vs iOS as four horizontal bars + a Domain+Data
  box. Same product, different geometry.
- Image: `presentation/assets/diagrams/two-architectures-detailed.png`
- On-screen text: "iOS" left, "Android" right. No other labels.
- Speaker: "Just the shape, for now. Two apps. Two architectures. Nothing in common under the hood. We'll come back to this in detail later — for now I just want you to feel the asymmetry."

---

# PART 2 — Why our client got thick (slides 15–19)

> Goal: explain why shared logic became a real problem at all.

### Slide 15 | BIG-WORD | Section title
- On-screen text: **2 · Why our client got thick**
- Speaker: "To explain why this hurts so much, I need to give you a bit of context about *what* this app actually does."

### Slide 16 | IMAGE | Menu — five-video tile (full bleed)
- Visual: full-bleed slide, no title, no chrome. Five looping silent
  WEBM clips of the menu screen tiled left-to-right. Each video fills
  the slide's full height; widths preserve original ratio; the row is
  clipped at the right edge if the trailing videos overflow.
- Asset: `presentation/assets/media/menu-{1..5}.webm`
- Speaker: "Drinkit has a deliberately complex menu. Tens of drinks, dozens of food items."

### Slide 17 | IMAGE | Animated transition (video + bullets)
- Visual: two-column layout — bullets on the left, looping video of a shared-element transition (card → detail) on the right in a phone frame. File: `presentation/assets/media/combo-transition.webm`.
- On-screen text:
  - Card → detail morphs natively.
  - Physics-driven, finger-responsive.
  - Hard to do with thin / BDUI clients.
  - Part of the brand.
- Speaker: "And we care a lot about feel. Native shared-element transitions, smooth physics, animations that respond to your finger."

### Slide 18 | BIG-WORD | The choice
- On-screen text: **Thick client. On purpose.**
- Speaker: "On purpose."

### Slide 19 | TRANSITION | Setup for next section
- On-screen text: **And this is where it starts to hurt.**
- Speaker: "And that's where the pain starts."

---

# PART 3 — The main pain — writing the same thing twice (slides 20–31)

> Goal: amplify the pain.

### Slide 20 | BIG-WORD | Section title
- On-screen text: **3 · We write the same thing twice**
- Speaker: "Section three. The pain."

### Slide 21 | BIG-WORD | The divergence
- On-screen text: **Almost the same.**
- Speaker: "Almost the same."

### Slide 22 | BIG-WORD | The divergence
- On-screen text: **Not exactly the same.**
- Speaker: "Not exactly the same. And that 'almost' is where the bugs live."

### Slide 23 | IMAGE | Customer feedback (combo)
- Visual: Telegram/Slack-style chat-card mock — `#drinkit-feedback`
  channel, customer avatar circle, timestamp, single message paragraph
  in Russian.
- On-screen text:
  - `customer · #drinkit-feedback · today, 14:32`
  - «А почему у моей подруги комбо доступно, а у меня на айфоне нет?
    Что за несправедливость?!»
- Speaker: "Real example, from our internal feedback channel. A customer noticed her friend's Android has a combo that her iPhone doesn't show. Now we have a bug. Or do we?"

### Slide 24 | BIG-WORD | The question
- On-screen text: **Is this a bug?**
- Speaker: "Is iOS right? Is Android right? Who knows."

### Slide 25 | BIG-WORD | The answer
- On-screen text: **No source of truth.**
- Speaker: "There's no source of truth. The behavior *is* the code. And we have two."

### Slide 26 | COMPARE | A real combo rule — implemented twice (clean)
- Visual: vertical (top/bottom) compare. Kotlin (orange eyebrow) on top, Swift (purple eyebrow) below. Both code blocks fully visible; no annotation yet.
- Code: trimmed from `code-examples/drinkit-mobile-kmp/combo/src/commonMain/kotlin/io/dodobrands/kmp/combo/ComboResolver.kt` lines 67–104. The Swift block is intentionally drifted to omit the dedup rule in both branches.
- Speaker: "Here's the actual rule — picking a default product for a slot. Live on both platforms. Read both. They look the same."

### Slide 27 | COMPARE | A real combo rule — spot the bug
- Visual: same vertical compare, but the Kotlin dedup checks are highlighted in soft-orange (`.hl-bug`), and the corresponding missing positions in the Swift code are marked with highlighted comments `/* no dedup */`.
- Speaker: "Now look closer. The Swift version forgot the cross-slot dedup rule in both branches — so on iOS the same product can fill two slots of the same combo. The kind of bug that's invisible until it ships."

### Slide 28 | BULLETS | What we tried — docs
- On-screen text:
  - Shared product specs
  - Shared decision docs
  - "Single source of truth" doc folder
  - Updated religiously last year
- Speaker: "Of course we tried documentation. A whole folder of product specs and decisions. We got religious about keeping it updated for almost a year."

### Slide 29 | BIG-WORD | But
- On-screen text: **It didn't save us.**
- Speaker: "It didn't save us."

### Slide 30 | BULLETS | Why docs aren't enough
- On-screen text:
  - Docs drift from code
  - Edge cases live in code, not in prose
  - No CI for "the doc and the code agree"
  - Two engineers ≠ one mental model
- Speaker: "Docs drift. Edge cases hide in the code, not in the spec. Nothing fails CI when the doc and the code disagree. And no matter how careful two people are, they don't share one head."

### Slide 31 | TRANSITION | Setup for KMP
- On-screen text: **There must be a better way…**
- Speaker: "So obviously, we started looking for a better way. And one name keeps coming up at every Kotlin conference."

---

# PART 4 — KMP sounds logical. It doesn't work. (slides 32–47)

> Goal: kill the naive "just start" expectation.

### Slide 32 | BIG-WORD | Section title
- On-screen text: **4 · KMP — just start, right?**
- Style: `bg-bloom bloom--mint`
- Speaker: "Section four. KMP. Sounds logical. Should be easy. Right?"

### Slide 33 | IMAGE | Tutorial promise
- Visual: a screenshot of a typical KMP "Getting Started" tutorial page (or imitation): smiling shared-code diagram, big "Hello World" code sample, "Compile once, run anywhere"-style tagline.
- Speaker: "Every tutorial makes it look effortless. New project. Shared module. Hello world."

### Slide 34 | DIAGRAM | Greenfield KMP — the dream
- Visual: hand-drawn diagram. `androidApp` and `iosApp` boxes on the outer columns, both arrowing in to a dashed `KMP` cluster in the centre that holds `androidMain` + `iosMain` (top) over `commonMain` (bottom). `Compose` and `SwiftUI` boxes feed in from each side. Single Gradle file in the middle, single CI pipeline implied. Everything labelled, nothing tangled.
- Image: `presentation/assets/diagrams/green-field.png` (replaces the v2.0 inline SVG version).
- On-screen text: title "Greenfield · the dream"
- Speaker: "If you're starting fresh, this is the picture. One repo, one shared module, two thin platform apps. Beautiful."

### Slide 35 | BIG-WORD | But
- On-screen text: **We are not greenfield.**
- Speaker: "We are not greenfield."

### Slide 36 | DIAGRAM | Android vs iOS module graph
- Visual: side-by-side module graph — Android (left) has app → per-feature
  UI/presentation/domain-api/domain-impl/data stacks; iOS (right) has
  app → presentation → UI → domain → data(generated) as four horizontal
  bars. Same product, different geometry.
- Image: `presentation/assets/diagrams/ios-android-modules.png`
- Speaker: "Side by side. They share *zero* structural assumptions."

### Slide 37 | BIG-WORD | Detail 1
- On-screen text: **Network: auto-generated.**
- Speaker: "Look at the network layer alone."

### Slide 38 | CODE | Android network — Retrofit interface
- Code (trimmed from `code-examples/android-app-sampels/aisuggestions/domain-impl/src/main/kotlin/ru/drinkit/aisuggestions/domain/api/DrinkitLabApi.kt`, lines 13–20):
  ```kotlin
  interface DrinkitLabApi {
    @GET("api/v1/GetDrinkitLab")
    suspend fun getDrinkitLab(
      @Query("countryId") countryId: Int,
      @Query("unitId") unitId: String,
    ): DrinkitLabDto
  }
  ```
- Caption: "Android — Retrofit, generated by our codegen."
- Caption (below code): "Source of truth: generated Kotlin · committed to repo."
- Speaker: "On Android, our network is Retrofit interfaces, generated by our own codegen from the OpenAPI spec."

### Slide 39 | CODE | iOS network — OpenAPI generator call site
- Code (trimmed from `code-examples/ios-app-samples/DrinkitLab-domain/DrinkitLabService.swift`, lines 20–30):
  ```swift
  func getDrinkitLab(unitId: String) async throws -> DTO.DrinkitLab_DrinkitLabDto {
    try await makeNetworkRequest {
      try await api.authorized.getApiV1GetDrinkitLab(
        query: .init(unitId: unitId)
      )
    } mapResponse: { response in
      try response.ok.body.json
    }
  }
  ```
- Caption: "iOS — Apple's OpenAPI Generator."
- Caption (below code): "Source of truth: JSON spec · Swift regenerated on every build."
- Speaker: "On iOS, the same endpoint is called through Apple's official OpenAPI generator. Totally different types, totally different middleware chain, totally different cancellation model."

### Slide 40 | COMPARE | Different source of truth
- Visual: two-col. Orange eyebrow `// android` on the left, purple
  `// ios` on the right.
- On-screen text:
  - **Android:** Generated Kotlin *is* the contract. Committed. Diff-able. Code-reviewed.
  - **iOS:** JSON *is* the contract. Swift built fresh each time. No DTO in the repo.
- Speaker: "Worth pausing on — these look like 'just different HTTP libraries.' They're not. On Android the generated Kotlin *is* a committed source file we review; on iOS there's nothing in the repo to review — just the JSON spec and whatever the generator spits out at build time."

### Slide 41 | BIG-WORD | Detail 2
- On-screen text: **Cache & offline — different too.**
- Speaker: "And it's not just network."

### Slide 42 | BIG-WORD | The question
- On-screen text: **Where do you start?**
- Speaker: "So when someone says 'just add KMP'… where exactly do you start?"

### Slide 43 | DIAGRAM | Option 1 — data + domain together
- Visual: same module-graph backdrop, with both Android's domain-impl/data
  and iOS's domain/data outlined in dashed purple. Red ✗ in the middle.
- Image: `presentation/assets/diagrams/bad-try-data-and-domain.png`
- Speaker: "Take both layers — but our two 'data' shapes already disagree (generated and committed on Android vs. on-the-fly on iOS); the merge would be a rewrite."

### Slide 44 | DIAGRAM | Option 2 — data only
- Visual: same backdrop, only the `data` layers highlighted. Red ✗.
- Image: `presentation/assets/diagrams/bad-try-data-only.png`
- Speaker: "Just data — same problem; 'data' means different things on each side."

### Slide 45 | DIAGRAM | Option 3 — one full feature
- Visual: one Android feature column highlighted (UI/presentation/domain-api/domain-impl/data) + the matching iOS layers. Red ✗.
- Image: `presentation/assets/diagrams/bad-try-one-full-feature.png`
- Speaker: "One full feature top-to-bottom — pulls in the whole data layer again."

### Slide 46 | DIAGRAM | Option 4 — bend iOS to Android style
- Visual: backdrop with the iOS column reshaped into per-feature module stacks. Red ✗.
- Image: `presentation/assets/diagrams/bad-try-android-style-on-ios.png`
- Speaker: "Bend iOS to per-feature modules — different architecture by force, year of cleanup, zero user value."

### Slide 47 | DIAGRAM | Option 5 — take infra
- Visual: backdrop with a `common` bar highlighted underneath both stacks. Red ✗.
- Image: `presentation/assets/diagrams/bad-try-take-infra.png`
- Speaker: "Take cross-cutting infra instead — logging, analytics, etc. They're designed differently on each side. Big effort, little user-visible impact."

---

# PART 5 — Start with what's already shared. (slides 48–58)

> Goal: show the simplest shape of shared KMP code — a pure function pilot using the combo module. No bridges, no glue.

### Slide 48 | SECTION | 5 · Start with what's already shared.
- On-screen text: **5 · Start with what's already shared.**
- Speaker: "Section five. The unlock."

### Slide 49 | COMPARE | Remember this code? KMP fixes this.
- Visual: vertical compare, same `pickSlotProduct` snippets as slide 32 (the *bug-highlighted* version) — but the highlights use the purple `hl-fix` tint instead of orange `hl-bug`, reframing the divergence as the thing KMP removes.
- Code: re-uses slide 32's two blocks verbatim except `hl-bug` → `hl-fix`. Drift note: if slide 31/32's code changes, this slide must move in lock-step.
- Speaker: "Remember this code from earlier? Both apps. Same logic. Written twice — and that's where the bugs lived. This whole section is about fixing exactly this pattern with KMP."

### Slide 50 | DIAGRAM | Vertical slice — module graph
- Visual: side-by-side module graph — Android (left) has per-feature
  module stacks; iOS (right) has the four horizontal layers. Same
  product, different geometry.
- Image: `presentation/assets/diagrams/ios-android-modules.png`
- Speaker: "Here's both sides. Same product, two architectures. Now…"

### Slide 51 | DIAGRAM | Vertical slice — shareable highlighted
- Visual: same module graph with one Android feature's domain-impl and
  iOS domain highlighted as the shareable slice; green check between them.
- Image: `presentation/assets/diagrams/ios-android-modules-shareable.png`
- Speaker: "…we pick one feature's domain logic. That's the slice. Just that, in KMP. Leave everything else alone."

### Slide 52 | BIG-WORD | What hurts? Domain logic.
- On-screen text (3 lines stagger): What hurts? / **Domain logic.** / That's what we share.
- Speaker: "Which slice do we pick? The one that hurts most. Domain logic — that's what we write twice, that's what diverges, that's what we share."

### Slide 53 | IMAGE | Combo pilot intro
- Visual: looping video of the combo card → detail transition (reused from slide 20) inside a `.phone--real` frame on the left; text on the right naming the feature and its rules.
- Asset: `presentation/assets/media/combo-transition.webm` (autoplay loop muted playsinline).
- On-screen text: title "Combo builder" + four short rule reminders (pick drink, pick food, skip stop-listed, honour dedup, price correctly).
- Speaker: "Our pilot for the pure-function pattern: combo builder. Pick a drink, pick a food, skip whatever's out of stock, honour the cross-slot dedup, compute the right price. All client-side logic."

### Slide 54 | BULLETS | Why combo
- On-screen text:
  - Real client-side logic — rules, picking, pricing.
  - Identical behaviour required on both platforms.
  - Already a divergence source — we'd written it twice.
  - **Pure function** — no IO, no state, no platform deps.
- Speaker: "Why this one? Same logic required on both platforms. Already a divergence source. And critically — it's a pure function. No IO. No state. So no need to invent any bridges at all."

### Slide 55 | DIAGRAM | Pure function · shared domain in KMP
- Visual: Android (left) and iOS (right) module graphs both arrow into
  a single shared KMP `domain` box in the centre. Nothing else moves.
- Image: `presentation/assets/diagrams/pure-function-shared-domain.png`
- Speaker: "Picture-form: Android's data and impl arrows pointing in, iOS's data and domain arrows pointing in, and in the middle one shared KMP domain box. Nothing else moves."

### Slide 56 | CODE | The whole shared surface (template)
- Code: 6-line template demonstrating that the entire shared API for combo
  is one pure function with two inputs and a deterministic result.
- Caption: `combo/src/commonMain/.../ComboResolver.kt`
- Speaker: "This is the entire shared API surface for combo — one pure function, deterministic, no IO. Inputs in, result out."

### Slide 57 | CODE | Wiring — one line on each platform
- Visual: stacked vertically — Android (orange eyebrow) with the Gradle dependency + call site on top; iOS (purple eyebrow) with the `Package.swift` line + call site below (full width so the longer iOS call site isn't trimmed).
- Speaker: "On both sides it's basically one line to depend on the shared module, and one line to call it. Android: a Gradle dependency, then `resolveCombo(template, menu)`. iOS: a local Swift package, then the same call through the generated `ComboResolverKt`."

### Slide 58 | BIG-WORD | Inputs in. Result out. No platform deps.
- On-screen text (3 lines stagger): Inputs in. / Result out. / **No platform deps.**
- Speaker: "That's the whole pattern. Inputs go in. A result comes out. No platform dependencies anywhere in this module. iOS and Android both call the same Kotlin function and get the same answer."

---

# PART 6 — When the feature needs more (slides 59–67)

> Goal: introduce the stateful-feature shape using the AI feature. Three bridges, factory, sealed result type. AI is the second case study, not the headline.

### Slide 59 | SECTION | 6 · When the feature needs more.
- On-screen text: **6 · When the feature needs more.**
- Speaker: "Section six. Sometimes a feature is more than a function. So what's the shape then?"

### Slide 60 | IMAGE | DrinkitLab triptych
- Visual: three phones side by side showing prompt → generating → result.
- Images: `presentation/assets/screens/drinkit-lab-{1,2,3}.png`.
- Speaker: "DrinkitLab. AI drink builder. Tell it what you want — it generates a custom drink with prompts, tools, and a real backend round-trip."

### Slide 61 | BULLETS | What this one needs from the world
- Visual: two columns — bullets left, a phone (`assets/screens/drinkit-lab-1.png`) on the right.
- On-screen text:
  - Talks to a backend (an agent / LLM proxy).
  - Reads the menu (the AI needs to know what drinks exist).
  - Reads prompts from remote config.
  - Same logic on both platforms — but now there's *glue*.
- Speaker: "It needs the network. It needs the menu. It needs remote-config prompts. Same business logic on both platforms, but now there's glue the shared module can't own itself."

### Slide 62 | BIG-WORD | Same idea. More glue.
- On-screen text: Same idea. **More glue.**
- Speaker: "Same idea — dependency inversion. More glue — three bridges instead of zero."

### Slide 63 | DIAGRAM | We can't just lift data into KMP
- Visual: same module-graph backdrop, with arrows from both Android
  domain-impl/data and iOS domain pointing toward a shared KMP `data`
  box. Big red ✗.
- Image: `presentation/assets/diagrams/kmp-data-only-blocked.png`
- Speaker: "We already saw why the data layer alone doesn't fit — generated vs. committed on each side, different shape. So: not this."

### Slide 64 | BULLETS | Not a pure function any more
- On-screen text:
  - The network — to fetch what the feature needs.
  - The menu — what drinks exist.
  - Stop-lists — what's available right now.
  - User preferences — country, language, prompts.
  - *Same logic both platforms — but now there's glue.*
- Speaker: "We need the network. We need the menu. We need stop-lists. We need user preferences. Same shared logic on both platforms — but now there's glue the KMP module can't own itself. This isn't a pure function any more."

### Slide 65 | BIG-WORD | Dependency inversion. Baby steps.
- On-screen text: **Dependency inversion.** // baby steps.
- Speaker: "Same trick we used for combo, just one level up. Dependency inversion. Baby steps — solve one bridge at a time. Start with the network."

### Slide 66 | DIAGRAM | Network — invert it. Provide an interface.
- Visual: same backdrop. The KMP centre now exposes two `Interface`
  boxes that each app's data layer implements (arrows in from both
  Android and iOS sides).
- Image: `presentation/assets/diagrams/kmp-data-with-interfaces.png`
- Speaker: "Instead, the shared module defines a tiny HTTP-transport interface — each app's existing HTTP stack implements it. Ktor lives in KMP and talks to an engine that hands every request to the host."

### Slide 67 | DIAGRAM | Domain — same trick. Data providers.
- Visual: backdrop again. KMP centre now shows two interface rows —
  data providers (menu, stop-list, prompts) and the network data
  interfaces from the previous slide. Each app fulfils both.
- Image: `presentation/assets/diagrams/kmp-domain-data-with-providers.png`
- Speaker: "And the same trick for everything else the domain needs — the menu, the stop-list, prompts. The shared module declares 'data providers' as interfaces. Each app fulfils them with what it already has."

---

# PART 7 — The HTTP transport bridge (slides 68–84)

> Goal: show how the host plugs into a stateful feature via HttpTransport — Ktor on top, custom engine below.

### Slide 68 | SECTION | 7 · The HTTP transport bridge.
- On-screen text: **7 · The HTTP transport bridge**
- Speaker: "Section seven. About that biggest bridge — networking."

### Slide 69 | BULLETS | The constraint
- On-screen text:
  - Android — OkHttp + Retrofit + ~10 interceptors
  - iOS — OpenAPI Generator + middleware chain
  - Android commits the generated Kotlin · iOS regenerates Swift on every build
  - Both: auth, URL rewriting, captcha, metrics, logs
  - Replacing them is a year of work
- Speaker: "Both apps already have very mature, very opinionated HTTP stacks. Auth interceptors, captcha, URL routing per country, metrics, logging. And the source-of-truth is asymmetric — on Android the generated Kotlin is committed to the repo; on iOS it's regenerated on every build, nothing checked in. Either way — replacing them is a year of work. So we're not replacing them."

### Slide 70 | BIG-WORD | The idea
- On-screen text: **Ktor on top.**
- Speaker: "Idea. Inside the shared module, we use Ktor — because Koog, the agent framework we use, expects Ktor."

### Slide 71 | BIG-WORD | The idea
- On-screen text: **Custom engine underneath.**
- Speaker: "But we write our own Ktor *engine*. And that engine doesn't make HTTP calls itself. It hands every request to a tiny interface called `HttpTransport`."

### Slide 72 | CODE | HttpTransport — the interface
- Code (trimmed from `code-examples/drinkit-mobile-kmp/core/src/commonMain/kotlin/io/dodobrands/kmp/transport/HttpTransport.kt`, lines 8–46):
  ```kotlin
  interface HttpTransport {
      fun execute(
          request: TransportRequest,
          onSuccess: (TransportResponse) -> Unit,
          onFailure: (Throwable) -> Unit,
      ): Cancellable

      companion object {
          const val PLACEHOLDER_BASE_URL: String = "https://ai-proxy.drinkit.internal"
      }
  }

  fun interface Cancellable { fun cancel() }
  ```
- Speaker: "This is it. Execute a request — call onSuccess or onFailure — return something cancellable. That's the entire bridge. The shared module knows nothing else about HTTP."

### Slide 73 | CODE | TransportRequest — the data
- Code (trimmed from `code-examples/drinkit-mobile-kmp/core/src/commonMain/kotlin/io/dodobrands/kmp/transport/TransportRequest.kt`, lines 29–40):
  ```kotlin
  data class TransportRequest(
      val path: String,                       // starts with "/"
      val query: String?,                     // already percent-encoded
      val method: String,                     // "GET", "POST", ...
      val headers: Map<String, List<String>>,
      val body: ByteArray?,
  )
  ```
- Speaker: "And `TransportRequest` — the actual payload. Path, query, method, headers, body bytes. That's it. No URL — the host owns where it goes."

### Slide 74 | DIAGRAM | TransportEngine inside Ktor
- Diagram: a flow chart inside the shared box. Top: Koog agent → Ktor HttpClient → custom `TransportEngine`. The engine has an arrow labelled "execute(TransportRequest)" pointing down out of the shared box into a bridge labelled `HttpTransport`. Underneath the bridge — two platform branches: left "iOS — URLSession", right "Android — OkHttp".
- On-screen text: "Ktor on top, HttpTransport at the bottom."
- Speaker: "Visually. Koog talks Ktor. Ktor talks to our custom engine. The engine repackages the request as a plain data class and hands it to the host. Above the bridge — shared KMP code. Below the bridge — each app's existing HTTP stack."

### Slide 75 | CODE | Android implementation — OkHttpTransport
- Code (trimmed from `code-examples/drinkit-mobile-kmp/core/src/androidMain/kotlin/io/dodobrands/kmp/transport/OkHttpTransport.kt`, lines 24–54):
  ```kotlin
  class OkHttpTransport(
      private val client: OkHttpClient,
  ) : HttpTransport {
      override fun execute(
          request: TransportRequest,
          onSuccess: (TransportResponse) -> Unit,
          onFailure: (Throwable) -> Unit,
      ): Cancellable {
          val call = client.newCall(buildOkRequest(request))
          call.enqueue(object : Callback {
              override fun onFailure(call: Call, e: IOException) = onFailure(e)
              override fun onResponse(call: Call, response: Response) {
                  response.use { r ->
                      onSuccess(TransportResponse(r.code, r.headers.toMultimap(), r.body?.bytes() ?: ByteArray(0)))
                  }
              }
          })
          return Cancellable { call.cancel() }
      }
      // ...
  }
  ```
- Speaker: "Android implementation. We pass it the host's existing `OkHttpClient` — with *all* its interceptors. Auth, URL routing, metrics — everything just works, because every request goes through the real client."

### Slide 76 | CODE | Android transport · class
- Visual: same `OkHttpTransport` code, dimmed grey (`code-dim`); the class declaration `class OkHttpTransport(…) : HttpTransport {` kept bold/coloured (`hl-keep`).
- Speaker: "First — we create OkHttpTransport, and it implements the shared HttpTransport interface."

### Slide 77 | CODE | Android transport · signature
- Visual: same code dimmed; the `override fun execute(…) : Cancellable` signature highlighted.
- Speaker: "We override the one function the interface asks for — execute."

### Slide 78 | CODE | Android transport · body
- Visual: same code dimmed; the body (newCall → enqueue → return Cancellable) highlighted.
- Speaker: "And the body just hands the request to your existing OkHttp client and maps the callback back."

### Slide 79 | CODE | iOS implementation — SampleHttpTransport
- Code (trimmed from `code-examples/drinkit-mobile-kmp/sampleIos/SampleIos/Network/SampleHttpTransport.swift`, lines 7–80):
  ```swift
  final class SampleHttpTransport: HttpTransport {
      func execute(
          request: TransportRequest,
          onSuccess: @escaping (TransportResponse) -> Void,
          onFailure: @escaping (KotlinThrowable) -> Void
      ) -> any Cancellable {
          let task = Task {
              // build URLRequest from baseURL + request.path + request.query
              // forward headers, body
              let (data, response) = try await URLSession.shared.data(for: urlRequest)
              guard let http = response as? HTTPURLResponse else { onFailure(...); return }
              onSuccess(TransportResponse(
                  statusCode: Int32(http.statusCode),
                  headers: parsedHeaders,
                  body: data.toKotlinByteArray()
              ))
          }
          return SampleCancellableTask(task: task)
      }
  }
  ```
- Speaker: "iOS implementation. Same interface, but Swift. Uses URLSession underneath in this sample. In the real Drinkit app, it goes through our OpenAPI middleware chain instead. Either way — the shared module doesn't care."

### Slide 80 | CODE | iOS transport · class
- Visual: same `SampleHttpTransport` Swift code dimmed; the class declaration `final class SampleHttpTransport: HttpTransport {` highlighted.
- Speaker: "Exactly the same shape on iOS — a Swift class that conforms to the same HttpTransport interface."

### Slide 81 | CODE | iOS transport · signature
- Visual: same code dimmed; the `func execute(…) -> any Cancellable` signature highlighted.
- Speaker: "Same execute function, same parameters — just Swift types on the bridge."

### Slide 82 | CODE | iOS transport · body
- Visual: same code dimmed; the `Task { … }` URLSession body highlighted.
- Speaker: "And the body hands the request to URLSession and maps the response back. Same idea as Android."

### Slide 83 | BIG-WORD | The result
- On-screen text: **Network solved.**
- Speaker: "Network — solved. Without touching either app's network stack."

### Slide 84 | BIG-WORD | The other bridges
- On-screen text: **Same pattern for everything else.**
- Speaker: "And the same pattern works for everything else."


---

# PART 8 — How we ship it (slides 85–89)

> Goal: explain distribution — library artifacts, platform shape, CI automation.

### Slide 85 | SECTION | 8 · How we ship it
- Visual: section-title card with mint bloom; eyebrow `// part 08`; title "How we ship it."
- On-screen text: `// part 08` · **How we ship it.**
- Speaker: "Section eight. We've talked about *what* we share. Now: how does it actually reach the two apps?"

### Slide 86 | BULLETS | Three options — monorepo / copy-paste / library
- On-screen text:
  - **Monorepo** — apps and shared code in one repo
  - **Copy-paste** — drop the shared file into each app
  - **Library** — publish artifacts, depend on them
- Speaker: "Three options. Monorepo with the apps. Copy-paste the shared file. Or publish as a library and depend on it. We picked library."

### Slide 87 | BIG-WORD | Library.
- On-screen text: **Library.**
- Speaker: "Library."

### Slide 88 | DIAGRAM | KMP integration shape
- Visual: side-by-side integration diagram. Android (left) consumes
  multiple per-module Maven artifacts (`kmp:combo`, `kmp:transport`,
  etc.). iOS (right) consumes a single umbrella `xcframework` that
  re-exports the modules iOS needs.
- Image: `presentation/assets/diagrams/kmp-integration.png`
- Speaker: "Different shape on each platform. On Android, every Gradle module of our KMP project ships as its own Maven artifact — `kmp:combo`, `kmp:transport`, and so on. Each app adds only what it needs, and the JVM class loader makes the same Kotlin class equal across artifacts. On iOS, the practical reality is one umbrella framework. Each Kotlin/Native framework bundles its own copy of the Kotlin runtime, and a class shipped in two different frameworks shows up as two different Swift types — not interchangeable. JetBrains explicitly recommends shipping one umbrella framework that re-exports the modules iOS needs. Internal modularity stays clean on the Kotlin side; iOS just sees one artifact."

### Slide 89 | BIG-WORD | CI ships it.
- On-screen text: **CI** ships it.
- Speaker: "And the actual release: CI does it. New tag, new artifact set, both apps pick up the new version. Zero manual work."

# PART 9 — Getting iOS engineers writing Kotlin (slides 90–100)

> Goal: the org/tech-lead angle.

### Slide 90 | SECTION | 9 · Getting iOS engineers to write Kotlin
- Visual: section-title card with purple bloom; eyebrow `// part 09`.
- On-screen text: `// part 09` · **Getting iOS engineers to write Kotlin.**
- Speaker: "Section nine. The other half of this story — which isn't about code at all."

### Slide 91 | BIG-WORD | Reframe
- On-screen text: **"Getting iOS engineers to…"**
- Speaker: "Look at that section title."

### Slide 92 | BIG-WORD | Reframe
- On-screen text: ~~"Getting iOS engineers to…"~~ → **wrong frame**
- Visual: strikethrough on the old title, replaced with red "wrong frame".
- Speaker: "That's the wrong frame. Anytime you find yourself trying to *make* people do something, it's already broken."

### Slide 93 | BIG-WORD | Traps — resentment + unfairness
- On-screen text (2 lines stagger):
  - Forcing it = resentment.
  - It feels unfair.
- Speaker: "Two traps stacked: if you force it, you get resentment. And honestly — it *is* unfair, when it's one-directional. Why do iOS engineers learn Kotlin but not the other way around?"

### Slide 94 | BIG-WORD | Tactic before strategy
- On-screen text: **Find an ally on iOS.**
- Speaker: "Tactical advice first. If you're an Android engineer pushing KMP, find an ally on iOS. You need them morally — to back you up. And you need them technically — because the iOS side of KMP *will* have weird issues, and an experienced iOS engineer will debug them ten times faster than you can."

### Slide 95 | BIG-WORD | The bigger move
- On-screen text: **But we went bigger.**
- Speaker: "But we did something bigger than that."

### Slide 96 | BULLETS | The trend
- On-screen text:
  - Western big-tech trend
  - "Mobile Engineer" — not "iOS" or "Android"
  - One human, two platforms
  - AI makes this realistic
- Speaker: "There's a trend in western big-tech you may have seen — engineers stop being 'iOS engineers' or 'Android engineers' and become 'mobile engineers'. One person, two platforms. With modern AI tooling, this is actually feasible now in a way it wasn't five years ago."

### Slide 97 | BIG-WORD | The move
- On-screen text: **Everyone is a Mobile Engineer.**
- Speaker: "We made that move. Independent of KMP. All our mobile engineers now write Kotlin *and* Swift. iOS engineers write Android features. Android engineers write iOS features."

### Slide 98 | COMPARE | Why win-win
- On-screen text:
  - **Company:** 1 brain, 1 context → 2 platforms
  - **Engineer:** growth, range, stronger CV
- Speaker: "Win-win. Company wins because one engineer with one mental model ships to both platforms — way better than two engineers context-switching across each other. Engineer wins because their skill range doubles. They become more valuable, especially if they ever want to interview at a western big-tech."

### Slide 99 | BIG-WORD | What changed
- On-screen text: **Resistance to KMP dropped.**
- Speaker: "And here's the thing. Once everyone was already writing both languages, the resistance to KMP just… evaporated."

### Slide 100 | BIG-WORD | What changed
- On-screen text: **It became "yes, why not".**
- Speaker: "Earlier attempts I made — when there were strict 'iOS people' and 'Android people' — got pushback. Skepticism. 'Why would we?' Once everyone was already cross-platform humans, KMP became 'yeah, sure, why not'."

---

# PART 10 — Results & lessons (slides 101–114)

### Slide 101 | SECTION | 10 · Results & what's next
- Visual: section-title card with orange bloom; eyebrow `// part 10`.
- On-screen text: `// part 10` · **Results & what's next.**
- Speaker: "Section ten. So — was it worth it?"

### Slide 102 | BULLETS | Shipped
- On-screen text:
  - **2 features** running in both apps — DrinkitLab + a combo-logic feature.
  - **HTTP transport bridge** + glue pattern in production use.
  - **CI build & release pipeline** — artifacts published by tag, both apps consume.
  - **Unit-test coverage** on the shared code — meaningful, in CI.
  - iOS now has tests on this surface for the *first time* — Android already did.
- Speaker: "What we have in production today. Two features running in both apps — DrinkitLab and one more on the combo side. The HTTP transport bridge we just saw, plus the glue pattern, in production use. A CI release pipeline that publishes the KMP artifacts by tag — both apps just consume them. And a meaningful unit-test layer on the shared code — which is a real change for iOS, because iOS historically had almost no unit coverage on this surface. Android already did; now both do."

### Slide 103 | BULLETS | App size impact
- On-screen text:
  - Android: **+1 MB**
  - iOS: **+4 MB**
- Speaker: "App size cost. Android — about 1 megabyte. iOS — about 4 megabytes. We were ready for worse. This is fine."

### Slide 104 | BULLETS | Team feedback — Android
- On-screen text:
  - Android team: "great"
  - Familiar language
  - Familiar tools
- Speaker: "Android team feedback: great. It's still Kotlin, the tooling is familiar, life is good."

### Slide 105 | BULLETS | Team feedback — iOS
- On-screen text:
  - iOS team: "actually great"
  - Some pain on the bridge (expected)
  - Now **proactively** proposing more KMP
- Speaker: "iOS team feedback: actually great. There was some pain at the Swift-Kotlin bridge — that was expected. The surprise was: iOS engineers are now *proactively* coming to me and saying 'hey, this logic should be in KMP'. That was the moment I knew this was working."

### Slide 106 | BIG-WORD | The honest part
- On-screen text: **TTM hasn't dropped — yet.**
- Speaker: "Honest part. Time-to-market hasn't actually dropped yet. The team is still adapting. We expect to see the win after a couple of quarters, once enough shared code accumulates and people are fully fluent."

### Slide 107 | BULLETS | What's next
- On-screen text:
  - Move from "feature" → "whole module"
  - Pilot: a small feature with simple persistence + network
  - Baby steps
- Speaker: "What's next: take a slightly bigger bite. Not just domain — a whole vertical, with its own simple persistence and its own simple network slice. Some good candidates lined up. But baby steps — that's the whole philosophy."

### Slide 108 | BIG-WORD | % shared
- On-screen text: **~2 of ~35 features.**
- Speaker: "Percent of code shared? Two features out of roughly thirty-five. And only the domain layer of those. Honestly — still small."

### Slide 109 | BIG-WORD | The point
- On-screen text: **But the door is open.**
- Speaker: "But the door is open. The hard part was getting started. Now we just keep going."

### Slide 110 | BIG-WORD | If we could…
- On-screen text: **If we could, you can.**
- Speaker: "Our app is a heavy thick-client legacy mess. If we could find an entry point into KMP, you almost certainly can too."

### Slide 111 | TRANSITION | If you take one thing
- On-screen text: **If you take one thing from this talk…**
- Speaker: (beat) "If you take one thing away from this talk, it's this."

### Slide 112 | BULLETS | The advice
- On-screen text:
  - **Stop asking "what can we move?"** — every layer drags its dependencies; you end up rewriting everything.
  - **Ask "what do we write twice, today?"** — that's the answer.
  - For Drinkit it was **domain logic**. For you, it might be something else.
- Speaker: "If you take one thing away from this talk, it's this. I spent years trying to figure out what we could move — data layer, domain layer, common modules — and every time the answer cascaded into 'we have to rewrite everything,' because every layer pulled its dependencies. The insight that finally worked: stop asking what we can move. Ask what we write twice, right now. For us that turned out to be domain logic. For you it might be something else — but the question is always the same."

### Slide 113 | BIG-WORD | Thank you
- On-screen text: **Thank you.**
- Speaker: "That's it. Thank you."

### Slide 114 | IMAGE | Thank you. Questions? (contacts + QR)
- Visual: QR code on the left → links to the slides + sample KMP project. On the right, a small circular portrait avatar (96px) above the name + role + 4 social handles.
- Visual: same static pastel-bloom background as the cover (`bg-cover-blooms`) — bookends the talk.
- On-screen text:
  - **Max Kachinkin** — Dodo Engineering · Drinkit Mobile
  - `telegram` @maxkachinkin
  - `channel` @mobilefiction · Mobile Fiction
  - `linkedin` /maxkachinkin
  - `twitter` /makzimi
- Speaker: "Thank you. Slides and the sample KMP project are at this QR. Reach out — Telegram is fastest. Happy to take questions."

---

# Appendix — quick index of code references

| Slide | File | Lines |
|-------|------|-------|
| 53 | `code-examples/android-app-sampels/aisuggestions/domain-impl/src/main/kotlin/ru/drinkit/aisuggestions/domain/api/DrinkitLabApi.kt` | 13–20 |
| 54 | `code-examples/ios-app-samples/DrinkitLab-domain/DrinkitLabService.swift` | 20–30 |
| 69 | `code-examples/drinkit-mobile-kmp/combo/src/commonMain/kotlin/io/dodobrands/kmp/combo/model/ComboTemplate.kt` | 19–65 |
| 70 | `code-examples/drinkit-mobile-kmp/combo/src/commonMain/kotlin/io/dodobrands/kmp/combo/ComboResolver.kt` | 52–65 (resolve() signature) |
| 71 | `code-examples/drinkit-mobile-kmp/combo/src/commonMain/kotlin/io/dodobrands/kmp/combo/ComboResolver.kt` | 67–104 (pickSlots) |
| 72 | `code-examples/drinkit-mobile-kmp/combo/src/commonMain/kotlin/io/dodobrands/kmp/combo/ComboResolver.kt` | 106–118 (computeTotalPrice) |
| 79 | `code-examples/drinkit-mobile-kmp/ai/src/commonMain/kotlin/io/dodobrands/kmp/ai/api/AiService.kt` | 5–7 |
| 80 | `code-examples/drinkit-mobile-kmp/ai/src/commonMain/kotlin/io/dodobrands/kmp/ai/api/model/CreatedDrinkResult.kt` | 3–37 |
| 81 | `code-examples/drinkit-mobile-kmp/ai/src/commonMain/kotlin/io/dodobrands/kmp/ai/AiServiceFactory.kt` | 14–40 |
| 91 | `code-examples/drinkit-mobile-kmp/core/src/commonMain/kotlin/io/dodobrands/kmp/transport/HttpTransport.kt` | 8–46 |
| 92 | `code-examples/drinkit-mobile-kmp/core/src/commonMain/kotlin/io/dodobrands/kmp/transport/TransportRequest.kt` | 29–40 |
| 94 | `code-examples/drinkit-mobile-kmp/core/src/androidMain/kotlin/io/dodobrands/kmp/transport/OkHttpTransport.kt` | 24–54 |
| 96 | `code-examples/drinkit-mobile-kmp/sampleIos/SampleIos/Network/SampleHttpTransport.swift` | 7–80 |

# Appendix — diagrams

External PNG diagrams (in `presentation/assets/diagrams/`, wired in v2):

1. **Slide 47** (Greenfield KMP — the dream) — `green-field.png`
2. **Slide 49** (Android architecture) — `android-architecture.png`
3. **Slide 50** (iOS architecture) — `ios-architecture.png`
4. **Slide 51** (Android-vs-iOS compare) — composed inline from android+ios architectures
5. **Slide 63** (vertical slice — base state) — `vertical-slice-base.png`
6. **Slide 64** (vertical slice — highlighted) — `vertical-slice-highlighted.png`
7. **Slide 84** (full picture, Part 6 close) — `full-picture.png`
8. **Slide 93** (Ktor + HttpTransport flow) — `transport-flow.png`

Inline SVG diagrams (still in `index.html`):

- Slide 16 — two-architecture silhouettes teaser
- Slide 78 — shape of a stateful feature (Part 6 — retitled from v1's slide 73)
- Slide 82 — three bridges the host plugs in (Part 6 — retitled from v1's slide 79)

Diagrams still needed for v3 (PNG, in `assets/diagrams/`):

- `pure-function-pattern.png` — slide 68 / data-in → ComboResolver → data-out
- `combo-module-surface.png` — Part 5 / ComboTemplate + Resolver + Resolution boxes (could complement or replace slide 68)
- `stateful-feature-shape.png` — *optional* — would replace the still-inline SVG on slide 78

# Appendix — assets

In v2 (wired):

- Slide 2 (About me) — `assets/portrait.jpg`
- Slide 4 (What Drinkit is) — `assets/app_icon.webp` + `assets/screens/home-android.png`
- Slide 8 (Drinkit iOS) — `assets/screens/home-ios.png`
- Slide 9 (Drinkit Android) — `assets/screens/home-android.png`
- Slide 10 (side-by-side home) — reuses home-ios + home-android
- Slide 11 (side-by-side menu) — `assets/screens/menu-{ios,android}.png`
- Slide 12 (side-by-side customisation) — `assets/screens/customisation-{ios,android}.png`
- Slide 13 (side-by-side cart) — `assets/screens/cart-{ios,android}.png`
- Slide 19 (deeply customisable) — `assets/screens/customisation-zoom.png`
- Slide 20 (transition) — `assets/media/combo-transition.webm` (video)
- Slide 27 (microinteraction) — `assets/media/microinteraction.webm` (video, re-encoded to ~7.5 MB)
- Slide 66 (Combo pilot intro, Part 5) — `assets/media/combo-transition.webm` (reused)
- Slide 75 (DrinkitLab triptych, Part 6 intro) — `assets/screens/drinkit-lab-{1,2,3}.png`
- Slide 127 (contacts/QR) — `assets/qr.png`

Still needed in v3 (see also `../ASSETS.md` at repo root):

- Slide 18 — menu hero shot (`screens/menu-hero.png`)
- Slide 35 — mock bug ticket (`mocks/bug-ticket.png`)
- Slide 46 — KMP getting-started screenshot (`mocks/kmp-getting-started.png`)
- Slide 66 — combo-builder screenshot — *optional now that slide 66 wires combo-transition.webm; could still ship a real combo-builder still-image for context if available* (`screens/combo-builder.png`)

## Slide-count summary

| Part | Range | Count |
|------|-------|------:|
| 0 — Opener | 1–6 | 6 |
| 1 — Two different apps? | 7–14 | 8 |
| 2 — Why our client got thick | 15–19 | 5 |
| 3 — We write the same thing twice | 20–31 | 12 |
| 4 — KMP — just start, right? | 32–47 | 16 |
| 5 — Start with what's already shared | 48–58 | 11 |
| 6 — When the feature needs more. | 59–67 | 9 |
| 7 — The HTTP transport bridge | 68–84 | 17 |
| 8 — How we ship it | 85–89 | 5 |
| 9 — Getting iOS engineers to write Kotlin | 90–100 | 11 |
| 10 — Results & closing | 101–114 | 14 |
| **Total** |  | **114** |

> Pacing note (v3.3): 114 slides for ~22 min ≈ 11.5 sec/slide; v3.3 trimmed 12 pacing slides, merged the two wiring slides, and the transport now reveals in steps.
