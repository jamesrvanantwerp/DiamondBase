-- DiamondBase Database Schema
-- Paste this entire file into: Supabase Dashboard → SQL Editor → New Query → Run

-- ─── MEMBERS ────────────────────────────────────────────────────────────────
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  tier text not null default 'Silver', -- Silver | Gold | Platinum
  membership_type text not null default 'individual', -- individual | team
  credits_total int not null default 2,
  credits_used int not null default 0,
  member_since date not null default current_date,
  stripe_customer_id text,
  created_at timestamptz default now()
);

-- ─── BOOKINGS ────────────────────────────────────────────────────────────────
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references members(id) on delete set null,
  member_name text,
  date text not null,
  time text not null,
  cage_type text not null,
  payment_method text not null,
  pin text not null,
  status text not null default 'confirmed', -- confirmed | cancelled | no_show
  created_at timestamptz default now()
);

-- ─── EMPLOYEES ───────────────────────────────────────────────────────────────
create table if not exists employees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  phone text,
  hourly_rate numeric(6,2) not null,
  color text default 'bg-blue-500',
  created_at timestamptz default now()
);

-- ─── SHIFTS ──────────────────────────────────────────────────────────────────
create table if not exists shifts (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid references employees(id) on delete cascade,
  day text not null,         -- e.g. "Mon 3/2"
  start_time text not null,
  end_time text not null,
  hours numeric(4,1) not null,
  week_of date not null default current_date,
  created_at timestamptz default now()
);

-- ─── REVENUE ENTRIES ─────────────────────────────────────────────────────────
create table if not exists revenue_entries (
  id uuid primary key default gen_random_uuid(),
  month text not null unique,  -- e.g. "Mar"
  memberships int not null default 0,
  one_off int not null default 0,
  retail int not null default 0,
  total int generated always as (memberships + one_off + retail) stored,
  created_at timestamptz default now()
);

-- ─── EXPENSE ENTRIES ─────────────────────────────────────────────────────────
create table if not exists expense_entries (
  id uuid primary key default gen_random_uuid(),
  month text not null unique,
  labor int not null default 0,
  utilities int not null default 0,
  maintenance int not null default 0,
  software int not null default 0,
  total int generated always as (labor + utilities + maintenance + software) stored,
  created_at timestamptz default now()
);

-- ─── LEAGUE SEASONS ──────────────────────────────────────────────────────────
create table if not exists league_seasons (
  id text primary key,  -- e.g. "s3"
  label text not null,
  dates text not null,
  status text not null default 'active', -- active | completed
  current_week int not null default 1,
  created_at timestamptz default now()
);

-- ─── LEAGUE TEAMS ────────────────────────────────────────────────────────────
create table if not exists league_teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  season_id text references league_seasons(id) on delete cascade,
  wins int not null default 0,
  losses int not null default 0,
  runs_for int not null default 0,
  runs_against int not null default 0,
  members text[] not null default '{}',
  created_at timestamptz default now()
);

-- ─── SEED DATA ───────────────────────────────────────────────────────────────

-- Members
insert into members (email, name, tier, credits_total, credits_used, member_since) values
  ('jake.martinez@example.com', 'Jake Martinez', 'Gold', 4, 2, '2024-10-01'),
  ('tyler.r@example.com', 'Tyler R.', 'Silver', 2, 0, '2024-11-01'),
  ('connor.b@example.com', 'Connor B.', 'Platinum', 999, 3, '2024-09-01')
on conflict do nothing;

-- Employees
insert into employees (name, role, phone, hourly_rate, color) values
  ('Marcus Webb', 'Facility Manager', '555-0101', 22, 'bg-blue-500'),
  ('Sarah Chen', 'Cage Attendant', '555-0102', 16, 'bg-green-500'),
  ('Devon Price', 'Cage Attendant', '555-0103', 16, 'bg-purple-500'),
  ('Jasmine Torres', 'Front Desk', '555-0104', 17, 'bg-orange-500'),
  ('Ryan O''Brien', 'Cage Attendant', '555-0105', 16, 'bg-red-500')
on conflict do nothing;

-- Revenue
insert into revenue_entries (month, memberships, one_off, retail) values
  ('Sep', 4200, 1800, 620),
  ('Oct', 5100, 2100, 740),
  ('Nov', 5800, 2400, 810),
  ('Dec', 6200, 2900, 950),
  ('Jan', 7400, 3100, 1100),
  ('Feb', 8100, 3400, 1240),
  ('Mar', 8900, 3800, 1380)
on conflict do nothing;

-- Expenses
insert into expense_entries (month, labor, utilities, maintenance, software) values
  ('Sep', 3200, 800, 300, 250),
  ('Oct', 3400, 820, 150, 250),
  ('Nov', 3600, 900, 400, 250),
  ('Dec', 3800, 950, 200, 250),
  ('Jan', 4100, 880, 350, 450),
  ('Feb', 4300, 860, 180, 450),
  ('Mar', 4600, 840, 250, 450)
on conflict do nothing;

-- League seasons
insert into league_seasons (id, label, dates, status, current_week) values
  ('s1', 'Season 1', 'Nov 5 – Dec 10, 2025', 'completed', 5),
  ('s2', 'Season 2', 'Jan 7 – Feb 11, 2026', 'completed', 5),
  ('s3', 'Season 3', 'Mar 4 – Apr 8, 2026', 'active', 1)
on conflict do nothing;

-- League teams
insert into league_teams (name, season_id, wins, losses, runs_for, runs_against, members) values
  ('Iron Bats', 's3', 2, 0, 22, 12, array['Jake M.', 'Tyler R.', 'Connor B.', 'Aiden K.']),
  ('The Yard Dogs', 's3', 1, 1, 18, 17, array['Marcus T.', 'Ethan W.', 'Sam D.', 'Luis P.']),
  ('Deep Drive', 's3', 1, 1, 15, 14, array['Ryan O.', 'Chris F.', 'Noah L.', 'Mason J.']),
  ('Exit Velocity', 's3', 0, 2, 10, 22, array['Caleb S.', 'Owen R.', 'Liam T.', 'Hunter B.']),
  ('Iron Bats', 's2', 4, 1, 48, 29, array['Jake M.', 'Tyler R.', 'Connor B.', 'Aiden K.']),
  ('Deep Drive', 's2', 3, 2, 41, 33, array['Ryan O.', 'Chris F.', 'Noah L.', 'Mason J.']),
  ('The Yard Dogs', 's2', 2, 3, 35, 38, array['Marcus T.', 'Ethan W.', 'Sam D.', 'Luis P.']),
  ('Exit Velocity', 's2', 1, 4, 27, 51, array['Caleb S.', 'Owen R.', 'Liam T.', 'Hunter B.']),
  ('The Yard Dogs', 's1', 4, 1, 52, 31, array['Marcus T.', 'Ethan W.', 'Sam D.', 'Luis P.']),
  ('Iron Bats', 's1', 3, 2, 44, 38, array['Jake M.', 'Tyler R.', 'Connor B.', 'Aiden K.']),
  ('Deep Drive', 's1', 2, 3, 37, 41, array['Ryan O.', 'Chris F.', 'Noah L.', 'Mason J.']),
  ('Exit Velocity', 's1', 1, 4, 28, 51, array['Caleb S.', 'Owen R.', 'Liam T.', 'Hunter B.'])
on conflict do nothing;
