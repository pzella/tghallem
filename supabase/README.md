# Supabase

Database migrations and Edge Functions can live here when you use the [Supabase CLI](https://supabase.com/docs/guides/cli).

- Link the project: `supabase link`
- Pull schema: `supabase db pull`
- Regenerate TypeScript types into `src/lib/database.types.ts`: `supabase gen types typescript --linked > src/lib/database.types.ts` (adjust exports if needed)

This repo ships with a hand-maintained `database.types.ts`; keep it in sync when the remote schema changes.
