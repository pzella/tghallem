# Security checklist — Tgħallem

Mobile apps are **untrusted clients**. Anything shipped in the binary or loaded as `EXPO_PUBLIC_*` can be extracted. **Defense in depth** means Row Level Security (RLS), server-side secrets, and minimal sensitive data on-device.

## Secrets & configuration

| Topic | Guidance |
|--------|----------|
| **Supabase anon key** | Intended to be public in clients. Real protection is **RLS** on every table touched by the app. Never ship the **service role** key in the app, Expo config, or repo. |
| **Environment** | Use `.env` locally (gitignored) and **EAS Secrets** / CI vars for production builds. `.env.example` documents required vars without values. |
| **Anthropic / LLM keys** | When added: call **only from Supabase Edge Functions** (or another backend) using a server secret — **never** `EXPO_PUBLIC_*` or in-repo keys. |
| **Empty env at runtime** | If `EXPO_PUBLIC_SUPABASE_URL` or `EXPO_PUBLIC_SUPABASE_ANON_KEY` is missing, auth and API calls fail; avoid shipping builds without setting secrets for the target channel. |

## Authentication & sessions

| Topic | Guidance |
|--------|----------|
| **Password handling** | Passwords stay in memory for sign-in/sign-up only; never logged or persisted by our hooks. Prefer Supabase defaults + optional **leaked password protection** in Dashboard. |
| **Tokens** | JWT refresh/access handled by Supabase client + AsyncStorage (sandboxed per OS app). Mitigate device compromise risk with OS lock screen / remote wipe guidance for users (policy copy). |
| **`detectSessionInUrl`** | Left **false** for native — avoids unintended token leakage via URLs on mobile. Revisit when implementing OAuth redirect schemes. |
| **Account deletion** | Uses `DELETE /auth/v1/user` with the **current session** bearer token. Ensure **User deletion** is configured correctly in Supabase Auth settings; errors shown to users are **generic** (see code) to avoid leaking API internals. |

## Supabase database & API

| Topic | Guidance |
|--------|----------|
| **RLS** | Enable RLS on all user-owned tables (`user_settings`, `user_lesson_progress`, `xp_log`, etc.). Policies must enforce **`auth.uid()`** (or equivalent) **read/write only own rows**. Periodically audit policies when adding tables. |
| **Views** | `user_stats` and similar must respect the same access rules (underlying tables secure). |
| **Upserts / inserts** | Client sends payloads constrained by RLS — attackers cannot forge another `user_id` if policies are correct. |
| **Storage buckets** | If you add audio/assets later: **private buckets**, signed URLs, path policies scoped by user or public-read-only as intended. |

## App surface / product

| Topic | Guidance |
|--------|----------|
| **OAuth (Apple / Google)** | When wired: use PKCE, **strict redirect allowlist** in Supabase Dashboard, validate `state`, prefer minimal scopes. |
| **Deep links** | Scheme `tghallem` — validate any incoming URLs before acting (future OAuth/callback). |
| **Privacy toggles** | Today UI-only until synced server-side; when persisted, store consent with **user id** and enforce on analytics/reminders integrations. |
| **Error messages** | Prefer generic messages for auth/account failures in production; reserve detailed errors for **dev** logging only. |

## Dependencies & supply chain

- Run **`npm audit`** regularly; fix **moderate+** where practical.
- Pin critical deps in `package-lock.json`; review major upgrades.

## Incident response (lightweight)

- Rotate Supabase keys if leaked (anon less critical if RLS is solid; **rotate service role** immediately if ever exposed).
- Supabase Dashboard → logs for suspicious auth/API spikes.

## Compliance notes

- **Privacy Policy** URL for App Store / Play — aligned with data you collect (account, progress, optional Anthropic prompts later).
- **Account deletion** implemented in-app; backend must complete deletion per your retention policy (Supabase Auth user + related rows via FK/CASCADE or triggers).
