-- Run this in your Supabase project: SQL Editor → New query → paste → Run
-- ─────────────────────────────────────────────────────────────────────────────

create table bookings (
  id         uuid primary key default gen_random_uuid(),
  host       text not null,          -- 'ryan' or 'max'
  date       date not null,          -- e.g. '2026-03-23'
  slot       text not null,          -- e.g. '3–4 pm'
  name       text not null,
  email      text not null,
  created_at timestamptz default now(),

  -- one booking per person per host per date
  constraint unique_booking unique (email, host, date)
);

-- Enable Row Level Security
alter table bookings enable row level security;

-- Anyone can insert a booking (public form)
create policy "allow_insert"
  on bookings for insert
  with check (true);

-- Anyone can read booking counts (needed to show spots remaining)
-- Personal data (name/email) is not exposed in the UI queries — only counts
create policy "allow_select"
  on bookings for select
  using (true);
