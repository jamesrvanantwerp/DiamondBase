# DiamondBase — Hackathon Submission

**Team:** Ted Van Antwerp (Sales) · James (Project Manager)
**Live Demo:** https://diamondbase.vercel.app
**Demo Login:** demo@diamondbase.com / demo1234

---

## Problem Statement

Indoor baseball facilities run on a patchwork of tools — group chats for scheduling, spreadsheets for memberships, manual door codes sent via text, and no visibility into revenue or staff costs. Coaches and players have no central place to track performance over time, and facility owners have no dashboard to run the business.

**DiamondBase** is the all-in-one management platform built specifically for indoor baseball facilities. It handles everything a modern facility needs: cage booking, membership tiers, smart door access, HitTrax performance tracking, competitive leagues, employee scheduling, and financial reporting — in one polished, real-time platform.

---

## What We Built

A full-stack web application with a real database (Supabase/PostgreSQL), user authentication, and live data across all modules.

### Core Modules

| Module | What it does |
|--------|-------------|
| **Cage Booking** | 3-step booking flow for individuals and teams. Supports membership credits and pay-per-use. Confirms with a real-time door access PIN. |
| **Smart Access Control** | Auto-generates a 4-digit time-sensitive PIN per booking. Activates 15 minutes before the session, expires at end. Sent via email/SMS. |
| **Member Dashboard** | Shows upcoming bookings (pulled live from DB), credits remaining, booking cap status, and HitTrax stat alerts. |
| **HitTrax Stats** | Facility leaderboard with exit velocity, launch angle, hard-hit %, and an 8-week EV trend chart per player. |
| **HitTrax League** | 5-week competitive seasons with standings, weekly schedules, all-time player stats, and team history. Register a full team or join as a free agent. |
| **Admin Dashboard** | Today's bookings, membership mix, system alerts (no-shows, door status, HitTrax sync). |
| **Employee Scheduling** | Weekly shift grid with add/delete shift capability. Live labor cost and pay calculations per employee. |
| **Financial Dashboard** | Revenue vs. expenses vs. profit charts, pie breakdowns by source and category, monthly detail table — all from live DB data. |
| **Login / Signup** | Full Supabase Auth — email/password sign up and sign in. Member record auto-created on first login. Session persists across page refreshes. |

---

## How It Works

### Architecture

```
Frontend (Next.js 14 + Tailwind CSS + Framer Motion)
        ↕
Supabase (PostgreSQL database + Auth)
```

- **Frontend:** Next.js App Router with React client components. Tailwind CSS for styling, Framer Motion for animations, Recharts for data visualization, Lucide for icons.
- **Database:** Supabase (hosted PostgreSQL) with 8 tables: `members`, `bookings`, `employees`, `shifts`, `revenue_entries`, `expense_entries`, `league_seasons`, `league_teams`.
- **Auth:** Supabase Auth (email/password). Row-level security ensures users only see their own bookings. Member record auto-provisioned on first sign-up.
- **Real-time:** Booking changes sync across browser tabs instantly via Supabase's real-time Postgres subscription.
- **Deployment:** Vercel (production), auto-deploys on push.

### Key User Flows

1. **Book a cage** → Select session type → Pick time slot → Confirm payment → Receive access PIN → Booking appears on dashboard instantly
2. **Admin workflow** → View today's bookings → Check financials → Manage staff schedule (add/remove shifts live)
3. **League** → Browse standings → Register a team (writes to DB) → Track player stats across seasons

---

## What's Working

- ✅ Full booking flow with real DB persistence
- ✅ Access PIN generation (time-sensitive, 15 min before session)
- ✅ Member login / signup / logout
- ✅ Dashboard shows real bookings, live credit tracking
- ✅ Cancel booking (soft-delete in DB)
- ✅ Financial dashboard with 7 months of revenue/expense data
- ✅ League standings, schedule, player stats, and team registration
- ✅ Employee schedule — add/delete shifts, live pay calculations
- ✅ Real-time sync across browser tabs
- ✅ Deployed and publicly accessible

---

## What's Next

- **Stripe integration** — real subscription billing and pay-per-use card charges
- **Real HitTrax API** — live stat sync from HitTrax Commercial API
- **Physical smart lock** — connect Kisi or Openpath API to actually trigger the door
- **Mobile app** — React Native version for players on the go
- **No-show enforcement** — automated $15 charge trigger via Stripe when PIN not used within 15 min
- **Team portal** — coach-facing view to manage team bookings and rosters

---

## How to Run Locally

### Prerequisites
- Node.js v18+ (install via `nvm install node`)
- A Supabase project (free at supabase.com)

### Setup

```bash
# 1. Clone or download the project
cd diamondbase

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local
# Fill in your Supabase URL and anon key

# 4. Set up the database
# Paste supabase-schema.sql into Supabase SQL Editor and run it
# Then paste supabase-auth-migration.sql and run it

# 5. Start the development server
npm run dev

# 6. Open http://localhost:3000
# Create an account or use: demo@diamondbase.com / demo1234
```

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Deployment | Vercel |

---

## Build Log

| Time | Milestone |
|------|-----------|
| Kickoff | Token received: `I_PROMISE_I_DIDNT_PRE_CODE_THIS` |
| Hour 1 | Project scaffolded, all pages built with mock data |
| Hour 2 | HitTrax leagues feature added |
| Hour 3 | Visual polish + Framer Motion animations |
| Hour 4 | Supabase database schema designed and seeded |
| Hour 5 | All pages wired to live DB (bookings, financials, leagues, employees) |
| Hour 6 | Supabase Auth — login/signup system, member records |
| Hour 7 | Build errors fixed, deployed to Vercel |
| Hour 8 | Submission docs written |

---

*Built with Claude Code at the T1A Hackathon — March 4–5, 2026*
