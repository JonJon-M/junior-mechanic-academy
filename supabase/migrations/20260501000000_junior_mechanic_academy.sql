-- Junior Mechanic Academy schema
-- Leaderboard: shared global scores (no auth required, anon key writes allowed)

create table if not exists public.leaderboard (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  avatar      text not null default '👨‍🔧',
  xp          integer not null default 0,
  badges      integer not null default 0,
  modules_done integer not null default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Upsert by name so one player doesn't spam the board
create unique index if not exists leaderboard_name_idx on public.leaderboard (lower(name));

-- Order helper
create index if not exists leaderboard_xp_idx on public.leaderboard (xp desc);

-- Enable RLS
alter table public.leaderboard enable row level security;

-- Anyone can read the leaderboard
create policy "public read leaderboard"
  on public.leaderboard for select
  using (true);

-- Anyone can insert / upsert their own score (anon key)
create policy "public upsert leaderboard"
  on public.leaderboard for insert
  with check (true);

create policy "public update leaderboard"
  on public.leaderboard for update
  using (true)
  with check (true);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leaderboard_updated_at
  before update on public.leaderboard
  for each row execute procedure public.set_updated_at();
