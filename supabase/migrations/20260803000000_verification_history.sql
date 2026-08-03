create table if not exists public.verification_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  original_input text not null,
  input_hash text not null,
  result jsonb not null,
  verdict text not null check (verdict in ('safe', 'false', 'misleading', 'unverified')),
  confidence smallint not null check (confidence between 0 and 100),
  verification_source text not null check (verification_source in ('ai', 'mock_fallback')),
  created_at timestamptz not null default now()
);
create index if not exists verification_history_user_created_idx on public.verification_history (user_id, created_at desc);
create unique index if not exists verification_history_user_input_unique on public.verification_history (user_id, input_hash);
alter table public.verification_history enable row level security;
create policy "Users can read their verification history" on public.verification_history for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can save their verification history" on public.verification_history for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users can update their verification history" on public.verification_history for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users can delete their verification history" on public.verification_history for delete to authenticated using ((select auth.uid()) = user_id);
