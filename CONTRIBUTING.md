# Contributing to Tgħallem

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React Native via **Expo SDK 54** |
| Router | **Expo Router v4** (file-based, typed routes) |
| State | **Zustand** (three stores: `useAuthStore`, `useProgressionStore`, `useLessonStore`) |
| Animations | `react-native-reanimated` v4 |
| Builds & releases | **EAS Build + EAS Submit** |
| CI | GitHub Actions (type-check on every PR, EAS build on demand) |

## Running locally

```bash
npm install --legacy-peer-deps
npx expo start          # press i for iOS sim, a for Android
```

## Project structure

```
app/                     # Expo Router screens
  _layout.tsx            # Root layout (GestureHandler, SafeArea, SplashScreen)
  index.tsx              # Redirect to onboarding or (tabs)
  (onboarding)/          # welcome → slides → auth-gate → sign-up/in → level-select → daily-goal
  (tabs)/                # Bottom-tab shell: index (Home), topics, progress, profile
  lesson/[id].tsx        # Lesson screen (phases: list → flashcard → quiz → complete)

src/
  constants/
    tokens.ts            # Design tokens (colors, spacing, radii, shadows)
  components/
    ui/                  # Button, Card, Input, ProgressBar
    layout/              # ScreenBase, AppHeader
    Falko.tsx            # Mascot SVG
  stores/                # Zustand state slices

.github/workflows/
  ci.yml                 # TypeScript check on every push/PR
  build.yml              # EAS build (manual dispatch or on push to main)
  submit.yml             # EAS submit to App Store / Play Store (manual dispatch)
```

## Deploying a build via GitHub

### First-time setup
1. Create an Expo account at [expo.dev](https://expo.dev) and install EAS CLI:
   ```bash
   npm install -g eas-cli && eas login
   ```
2. Link the project: `eas init`
3. Add your **EXPO_TOKEN** secret to GitHub → Settings → Secrets → Actions.
4. Fill in the three `REPLACE_WITH_…` placeholders in `eas.json` → `submit.production.ios`.

### Triggering builds
- **Preview build** (TestFlight / internal): push to `main` or use the "EAS Build" workflow dispatch.
- **Production + App Store submit**: use the "EAS Submit" workflow dispatch, choose `ios`.

### App Store release checklist
- [ ] Set `bundleIdentifier` in `app.json` → `expo.ios`
- [ ] Register the app in App Store Connect
- [ ] Fill in `eas.json` → `submit.production.ios` (appleId, ascAppId, appleTeamId)
- [ ] Upload screenshots (6.7", 6.1", iPad) via App Store Connect or Fastlane
- [ ] Write privacy policy URL (required for any app with accounts)
- [ ] Add Falko illustration and proper icon/splash assets

## Design tokens

All colors, spacing, radii, and shadows live in [`src/constants/tokens.ts`](src/constants/tokens.ts). Change them there — never hardcode values in screen files.

## Adding a new screen

1. Create the file under `app/` (Expo Router auto-registers it).
2. Wrap with `<SafeAreaView>` from `react-native-safe-area-context`.
3. Use `Colors`, `FontSizes`, `Spacing`, `Radii` from tokens.
4. Add any new navigation links in the relevant `_layout.tsx`.

## Lesson content

Lessons, flashcards, and quiz rows live in **Supabase** (`lessons`, `flashcards`, `quiz_questions`, `quiz_options`). The app loads them via `src/hooks/useLessons.ts`. Manage content in the Supabase dashboard or migrations — see `docs/PRODUCT_DECISIONS.md`.
