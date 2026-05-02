# Product decisions — Tgħallem

Authoritative scope and trade-offs for implementation. **Build order follows `docs/design-handoff/README.md` → Implementation order.**

## Scope & timeline

- **Phasing:** Follow the handoff README order (foundations → auth/onboarding → beginner loop → progression → intermediate → social → advanced).
- **Timeline:** ASAP — prioritize vertical slices that match each phase.

## Content & backend

- **Lessons:** **100% Supabase** for shipped builds (no local `lessonData` as source of truth). CMS/schema drives lesson list, flashcards, quiz, XP.
- **Tracks:** **Gated per design** — beginner first; intermediate/advanced unlock via readiness / placement (not free-for-all selection long-term).

## Assessment & progression

- **Placement test:** Ship **real adaptive logic first** (difficulty adjusts with performance; final bucket maps to track).
- **Readiness / rank-up:** Implement when progressing past beginner core (per README phase).

## AI (Anthropic)

- Use **Anthropic** for Falko-style feedback (composition, translation grading, etc.) when those screens ship.
- **Account:** Pro plan acceptable; upgrade only if usage/latency requires it.

## Monetization copy

- **“7 days Pro” / referrals:** **Marketing copy only** until subscriptions exist — no real entitlement logic required for v1.

## Media

- **Recorded flashcard audio:** **Phase 2** — ship UI without mandatory audio first.

## Data portability

- **Account deletion:** **Required** — user can delete their account (Auth + app flow). The client calls GoTrue `DELETE /auth/v1/user`; enable user deletion in **Supabase Dashboard → Authentication** if your project restricts it. Ensure DB FKs / triggers cascade or cleanup user rows.
- **Account export:** **Not in scope** — no GDPR “download my data” flow; **do not** promise export in UI or docs.

## Offline

- **Offline mode:** **Later** — not required for initial App Store release.

## Design reference

- **`docs/design-handoff/`** remains the UI/UX source of truth; Product decisions here override only **scope/engineering**, not visual intent.
