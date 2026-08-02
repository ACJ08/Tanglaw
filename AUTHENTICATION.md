# Authentication architecture

Tanglaw uses Supabase Auth as the sole authority for sessions and identity. The client derives the active profile only from the current Supabase user and its metadata; it never restores a separately cached user. This prevents account A's name, role, or email from appearing after account B signs in.

## Required Supabase setup

1. Apply `supabase/migrations/20260802000000_auth_profiles.sql` through the Supabase CLI or SQL editor.
2. In **Authentication → Providers → Email**, enable email confirmations and password sign-in.
3. In **Authentication → URL Configuration**, add `<app-origin>/auth/callback` for every deployed environment and the local development URL. The client redirects confirmation and reset flows to that callback, which waits for Supabase to establish the session before opening the dashboard.
4. Do not expose a service-role key in Vite variables; only the publishable/anon key belongs in `.env`.

## Lifecycle

Registration writes identity metadata to `auth.users`. The database trigger creates the profile with the same UUID. The verification screen is shown when Supabase returns no session, which is the email-confirmation path. Authentication events then replace the in-memory session and profile atomically. On logout, the local Supabase session and in-memory profile are cleared.

## Manual acceptance checks

- Register a new address: the verification screen shows that address and resend works.
- Try signing in before confirming: Supabase blocks it and the UI explains why.
- Confirm, then sign in: dashboard, navbar, and profile show the confirmed user's metadata/email.
- Sign out and sign in as a different account: no prior account identity remains.
- Refresh while signed in: Supabase restores the correct session.
- Try opening `/dashboard` or `/profile` signed out: the route returns to the public page.

## Local demo accounts

Demo accounts are defined in `src/app/auth/demoAuth.ts`, with one account for every Tanglaw role. They never call Supabase, never create database records, and persist only in browser local storage. They are enabled during local development or by explicitly setting `VITE_DEMO_AUTH_ENABLED=true` for a controlled presentation environment. Set it to `false` in production deployments.
