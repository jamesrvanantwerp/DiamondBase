-- Run this in Supabase SQL Editor → New Query → Run

-- Add user_id to members table
alter table members add column if not exists user_id uuid references auth.users(id) on delete cascade;

-- Add user_id to bookings table
alter table bookings add column if not exists user_id uuid references auth.users(id) on delete set null;

-- Allow authenticated users to read/write their own bookings
alter table bookings enable row level security;

create policy "Users can view own bookings" on bookings
  for select using (auth.uid() = user_id or user_id is null);

create policy "Users can insert own bookings" on bookings
  for insert with check (auth.uid() = user_id);

create policy "Users can update own bookings" on bookings
  for update using (auth.uid() = user_id);

-- Allow anyone to read members (for demo)
alter table members enable row level security;

create policy "Users can view own member record" on members
  for select using (auth.uid() = user_id);

create policy "Users can insert own member record" on members
  for insert with check (auth.uid() = user_id);

create policy "Users can update own member record" on members
  for update using (auth.uid() = user_id);
