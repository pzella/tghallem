# Handoff: Tgħallem — Maltese Language Learning App

## Overview

**Tgħallem** (Maltese for "learn") is a mobile language-learning app that teaches Maltese to non-speakers. The design covers the full product surface: onboarding, daily learning loops, three difficulty tracks (Beġinner / Medju / Avvanzat), specialized topic packs, EN→MT translation practice, level progression mechanics, social/sharing features, and account screens.

The brand is rooted in Maltese identity: a saturated red drawn from the national flag, sandstone-cream backgrounds inspired by limestone architecture, and Maltese-language UI strings throughout.

## About the Design Files

The files in this bundle are **design references created in HTML/JSX prototypes** — they show intended look, layout, copy, and behavior. They are **not production code to copy directly**.

Your task is to **recreate these designs in the target codebase**:
- If the project is **React Native / Expo**, port each `<Screen>` component to RN equivalents (`View`, `Text`, `Pressable`, `ScrollView`, `LinearGradient`).
- If **SwiftUI / Kotlin Compose**, treat each screen JSX as a layout spec — translate flex/grid into `VStack`/`HStack`/`LazyVGrid` etc.
- If **web (Next.js/Vite + React)**, the JSX is closer to copy-pasteable but you should still re-author with your component library, design tokens, and routing.
- If **no codebase exists yet**, React Native (Expo) is the recommended target — this is a mobile-first product.

## Fidelity

**High-fidelity.** The mocks have final colors, typography, spacing, copy, iconography, and interaction surfaces. Recreate them pixel-near using your codebase's component primitives. Numeric values (sizes, paddings, radii) below are authoritative.

---

## Design Tokens

### Color palette (oklch + hex fallbacks)

| Token | OKLCH | Hex (approx) | Usage |
|---|---|---|---|
| `--red` | `oklch(0.545 0.21 24)` | `#cf142b` | Primary CTA, brand, focus states, active progress |
| `--red-tint` | `oklch(0.94 0.04 24)` | `#fbe6e8` | Soft red surfaces, advanced-tier badges |
| `--cream` | `oklch(0.97 0.015 70)` | `#f7f3ec` | Default screen background |
| `--cream-2` | `oklch(0.93 0.025 70)` | `#ede5d6` | Card backgrounds, inset surfaces |
| `--ochre` | `oklch(0.67 0.13 65)` | `#c8924a` | Intermediate-tier accent, warnings |
| `--ochre-tint` | `oklch(0.94 0.05 65)` | `#f5ead6` | Soft ochre surfaces |
| `--sage` | `oklch(0.88 0.05 145)` | `#cfe0d0` | Success/beginner soft surface |
| `--sage-deep` | `oklch(0.55 0.09 145)` | `#6e8c72` | Success accent, beginner deep |
| `--ink` | `oklch(0.25 0.02 50)` | `#2a1f1a` | Primary text |
| `--ink-2` | `oklch(0.45 0.02 50)` | `#5e504a` | Secondary text |
| `--ink-3` | `oklch(0.65 0.015 50)` | `#9b8d86` | Tertiary text, captions |

**Note**: The user has tuned `--red` via the in-page Tweaks panel to: hue 24, chroma 0.21, lightness 0.545. Treat those as canonical.

### Typography

- **Display / Headings**: `"Bricolage Grotesque", serif` — used for h1/h2, Maltese vocabulary words, numbers, CTAs (semi-bold, 600/700)
- **Body / UI**: `"Inter", system-ui, sans-serif` — used for paragraphs, labels, microcopy

Sizes used (px):
- Hero: 38 (rank-up), 28 (screen titles)
- H1: 24–26
- H2: 20–22
- Body large: 17–19 (Maltese sample sentences)
- Body: 14–15
- Small: 12–13
- Microcopy / labels: 10–11 (uppercase, letter-spacing 1–1.5)

### Spacing & radii

- Screen horizontal padding: 20–24px
- Card padding: 14–18px
- Card radius: 14, 16, 18, 20, 22 (smaller for inline chips, larger for hero cards)
- Pill / chip radius: 10–14
- Button radius: 28 (full pill on 56px-tall primary buttons)
- Avatar / round buttons: half of size

### Shadows & elevation

- Primary CTA: `0 6px 18px rgba(207, 20, 43, 0.30)`
- Floating cards: `0 4px 18px rgba(0, 0, 0, 0.04)`
- Popovers / share sheets: `0 8px 24px rgba(0, 0, 0, 0.20)`

### Mobile frame

All screens are designed at **390 × 844** (iPhone 14/15 Pro logical viewport). Status bar 54px; nav header 56px; bottom CTAs anchored 32–40px from bottom.

---

## Information Architecture

The design is organized into eight sections, each surfaced as a row in the design canvas (`Tgħallem.html`). Implement these as feature folders/modules.

### 1. Brand & Welcome
- **01 · Welcome** — first-launch hero with logo, tagline, CTA "Get started"
- **02 · Onboarding carousel** — 3 slides introducing pillars (learn / speak / belong)

### 2. Onboarding & Sign-up
- **03 · Auth gate** — sign up / sign in / Apple / Google
- **04 · Sign up** — email + password + terms checkbox
- **05 · Sign in** — email + password + forgot link
- **06 · Level select** — Beġinner / Medju / Avvanzat with sample phrases + "take placement test" link
- **07 · Daily goal** — pick 5 / 10 / 15 / 20 min/day
- **F1 · Onboarding flow diagram** — visual map of new-user vs returning-user paths

### 3. Learning Flow
- **08 · Lesson list** — vertical map of unlocked/locked lessons with XP and stars
- **09 · Flashcard** — front-back card with audio, swipe-to-rate (again / good / easy)
- **10 · Quiz** — multiple-choice with progress bar, lives, and check button

### 4. Intermediate & Advanced
- **A1 · Track select** — three-track picker; chips show what unlocks per level
- **A2 · Grammar lesson** — concept + rule + 3 examples + "your turn" interactive
- **A3 · Reading** — short Maltese story, tap-to-translate words, popover with save/examples
- **A4 · Sentence builder** — Duolingo-style word tiles + word bank + check button
- **A5 · Writing practice** — lined writing canvas, live spell-check, Maltese letters (Ċ Ġ Ħ Ż Għ Ie) row
- **A6 · Composition** — open prompt 60–100 words, Falko AI feedback with star rubric

### 5. Translation (Advanced)
- **T1 · Translation hub** — 4 tiers (Warm-up / Standard / Hard / Expert) with stars
- **T2 · Compose translation** — EN source + idiom flags + your MT answer + hint/word/skip toolbar
- **T3 · Graded feedback** — scored 0–100, inline diff (green/ochre/red), accepted answer + alts, breakdown by Grammar/Vocab/Register
- **T4 · Parallel reader** — paragraph-by-paragraph translation of folk tales with glossary + reveal-literary-version

### 6. Specialised Topics & Progress
- **X1 · Intermediate topics** — 5 themed packs (Fis-suq, Ix-xogħol, Il-familja, Vjaġġ, Ikel u xorb) + "What's included" feature card
- **X2 · Advanced topics** — 6 packs (Storja Maltija, Letteratura, Aħbarijiet, Negozju, Idjomi u qwiel, Lingwistika) + red "Everything in Intermediate, plus" feature card
- **X3 · Progress & stats** — 3-stat row (words, streak, XP) + skills breakdown bars + 8-week activity heat-strip + rank-up bar

### 7. Level Progression
- **P1 · Readiness dashboard** — measurable criteria (words mastered, lessons, quiz accuracy, reading, writing) with current/target progress bars
- **P2 · Placement test** — adaptive multiple-choice with difficulty meter
- **P3 · Rank-up celebration** — full-bleed red, shield badge, share CTA

### 8. Sharing & Virality
- **S1 · Share badge sheet** — bottom-sheet with preview card, customize chips, 8 share targets (IG Story, FB, X, WhatsApp, TikTok, Messages, Save, More) + copy link, +50 XP reward
- **S2 · Invite friends** — referral hero ("you both get 7 days Pro"), invite code, share targets, friends list with joined/streak/pending states

### 9. Account & Privacy
- **Privacy** — granular toggles (personalization, analytics, leaderboards, reminders, marketing) + download/delete data
- **Sign-out confirmation** — bottom-sheet with reassurance copy

---

## Interactions & Behavior

### Navigation
- Back button (top-left, 40×40 circle) on every secondary screen
- Bottom-anchored primary CTA (full-width pill, 56px tall) on flow screens
- Modal/sheet pattern for Share, Sign-out confirmation, Tap-to-translate popovers

### Animations & transitions
- Cursor blink in writing/composition fields: `animation: blink 1s infinite`
- Card press: subtle scale 0.98 (apply via your codebase's pressable feedback)
- Screen transitions: standard platform push (right-to-left on iOS)
- Rank-up celebration: confetti rects + radial glow (see SVG in `screens-social.jsx`)

### Form validation
- Email: standard regex; show inline error below field
- Password sign-up: minimum 8 chars (UI shows checklist)
- Terms checkbox: required to enable Sign up CTA

### Adaptive logic
- **Placement test (P2)**: difficulty bar grows with correct answers; final placement uses thresholds (8/10 → Advanced, 5–7 → Intermediate, <5 → Beginner)
- **Readiness gating (P1)**: rank-up unlocks when ALL criteria are met OR placement test is passed at the higher tier
- **Streak protection**: handle timezone-aware day boundaries; show streak freeze logic if implementing

### State management (recommended)
- `auth` — user, session token, onboarding step
- `progression` — current track, XP, streak, mastered words array, lesson completions, quiz scores
- `lesson` — active lesson id, card index, lives, current answer state
- `topics` — per-pack progress
- `social` — invite code, friends list, badge collection
- `tweaks` (dev/admin only) — for live theme tuning

### Data fetching
- Lesson content: paginated by track + topic
- Falko AI grading (composition, translation, conversation): server-side LLM call; stream feedback
- Audio: cached MP3/WebM per word/phrase
- Speech recognition (Advanced "native voice match"): use platform Speech APIs

---

## Maltese-specific considerations

- **Special characters**: Ċ ċ Ġ ġ Ħ ħ Ż ż plus digraphs Għ għ and Ie ie. The writing/translation screens render a quick-access row; on web, ensure your text inputs accept these (no extra config needed for Unicode); on mobile, ship a custom keyboard accessory row.
- **Sun letters** (assimilation rule): ċ d n r s t x ż z. The grammar lesson (A2) covers this.
- **Spell-check / grading**: for proper grading, integrate a Maltese morphological analyzer or LLM-based grader. Spelling alone won't catch register and idiom issues.
- **Strings**: every screen mixes Maltese UI labels with English glosses. Plan i18n with at minimum `mt` and `en` locales; treat Maltese as the canonical product language.

---

## Assets

- **No bitmap assets** — everything is rendered with inline SVG and CSS.
- **Icons**: hand-drawn inline SVG paths (search, back chevron, audio play, clock, etc.). Replace with your icon library (Lucide, SF Symbols, Material) at implementation.
- **Badge artwork**: shield SVG inline in `screens-social.jsx` (`RankUpScreen` and `ShareBadgeScreen`). For production, commission proper badge artwork per level — keep the shield silhouette as a starting reference.
- **Illustrations / character (Falko)**: a friendly Maltese-falcon mascot is mentioned in copy ("Falko's notes") but not yet drawn. Brief an illustrator before launch.

---

## Files in this bundle

| File | Contents |
|---|---|
| `Tgħallem.html` | Master file — design canvas hosting all sections; load this first |
| `design-canvas.jsx` | Pan/zoom canvas component (DCSection / DCArtboard) |
| `ios-frame.jsx` | iPhone bezel + status bar wrapper |
| `tweaks-panel.jsx` | Live theme tuning panel (dev only — not for production) |
| `screens.jsx` | Brand, Welcome, Lesson list, Flashcard, Quiz |
| `screens-flow.jsx` | Auth gate, Sign up, Sign in, Level select, Daily goal, Privacy, Sign-out, Flow diagram |
| `screens-advanced.jsx` | Track select, Grammar, Reading, Sentence builder, Writing, Composition |
| `screens-translate.jsx` | Translation hub, Compose, Feedback, Parallel reader |
| `screens-topics.jsx` | Intermediate / Advanced topic packs, Progress & stats |
| `screens-social.jsx` | Readiness dashboard, Placement test, Rank-up, Share badge, Invite friends |

To run the prototype locally: open `Tgħallem.html` in a browser (no build step — it uses Babel standalone).

---

## Implementation order (suggested)

1. **Foundations**: design tokens, typography, button/card/input primitives, screen scaffold (status bar + header + bottom CTA)
2. **Auth + onboarding** (sections 1–2) — get a real user into the app
3. **Beginner learning loop** (section 3) — lesson list → flashcard → quiz; this is the daily-engagement core
4. **Progression + streaks + XP** (section 7) — drives retention before adding more content
5. **Intermediate features** (section 4 + Intermediate half of section 6) — unlocks reading/writing
6. **Social** (section 8) — virality once retention is proven
7. **Advanced features** (section 5 + Advanced half of section 6) — translation, composition, cultural depth

---

## Open questions for product

- Falko AI tutor: model choice, latency targets, content moderation
- Offline support scope: do flashcards and reading work offline?
- Subscription tiers: free vs Pro feature split (referral copy assumes Pro exists)
- Localization beyond MT/EN (Italian? French? — common for diaspora learners)
- Accessibility: dynamic type, VoiceOver labels for Maltese pronunciation, reduced-motion alternatives for the rank-up celebration
