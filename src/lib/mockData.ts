export const membershipTiers = {
  individual: [
    {
      name: "Silver",
      price: 50,
      credits: 2,
      duration: "30-min cage rentals",
      color: "from-gray-400 to-gray-500",
      features: ["2 × 30-min cage rentals/mo", "Member booking rates", "Access PIN generation", "HitTrax stat tracking"],
    },
    {
      name: "Gold",
      price: 90,
      credits: 4,
      duration: "30-min cage rentals",
      color: "from-yellow-400 to-yellow-600",
      features: ["4 × 30-min cage rentals/mo", "Member booking rates", "Access PIN generation", "HitTrax stat tracking"],
    },
    {
      name: "Platinum",
      price: 150,
      credits: null,
      duration: "Unlimited 30-min cage rentals",
      color: "from-blue-400 to-purple-600",
      features: ["Unlimited cage rentals/mo", "Best member rates", "Priority booking", "Full HitTrax dashboard"],
    },
  ],
  team: [
    {
      name: "Silver",
      price: 125,
      sessions: 1,
      color: "from-gray-400 to-gray-500",
      features: ["1 session/mo (45-min turf + 2 cages)", "Team access PINs", "Coach dashboard"],
    },
    {
      name: "Gold",
      price: 240,
      sessions: 2,
      color: "from-yellow-400 to-yellow-600",
      features: ["2 sessions/mo", "Team access PINs", "Coach dashboard", "Team HitTrax leaderboard"],
    },
    {
      name: "Platinum",
      price: 450,
      sessions: 4,
      color: "from-blue-400 to-purple-600",
      features: ["4 sessions/mo", "Team access PINs", "Priority scheduling", "Full team analytics"],
    },
  ],
};

export const bookingSlots = [
  { time: "6:00 AM", available: true },
  { time: "6:30 AM", available: true },
  { time: "7:00 AM", available: false },
  { time: "7:30 AM", available: false },
  { time: "8:00 AM", available: true },
  { time: "8:30 AM", available: true },
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: false },
  { time: "12:00 PM", available: true },
  { time: "12:30 PM", available: true },
  { time: "1:00 PM", available: false },
  { time: "1:30 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: true },
  { time: "3:00 PM", available: false },
  { time: "3:30 PM", available: false },
  { time: "4:00 PM", available: false },
  { time: "4:30 PM", available: false },
  { time: "5:00 PM", available: false },
  { time: "5:30 PM", available: false },
  { time: "6:00 PM", available: true },
  { time: "6:30 PM", available: true },
  { time: "7:00 PM", available: true },
  { time: "7:30 PM", available: true },
  { time: "8:00 PM", available: true },
  { time: "8:30 PM", available: true },
];

export const upcomingBookings = [
  { id: 1, date: "Mar 5, 2026", time: "7:00 AM", type: "30-min Cage #2", pin: "4829", status: "confirmed" },
  { id: 2, date: "Mar 7, 2026", time: "9:00 AM", type: "60-min HitTrax Cage", pin: "7341", status: "confirmed" },
  { id: 3, date: "Mar 9, 2026", time: "11:00 AM", type: "30-min Cage #1", pin: "2956", status: "confirmed" },
];

export const hittraxStats = [
  { name: "Jake M.", avgEV: 94.2, maxEV: 108.1, avgLA: 12.4, hardHitPct: 52, sessions: 14, avatar: "JM" },
  { name: "Tyler R.", avgEV: 91.7, maxEV: 104.3, avgLA: 14.1, hardHitPct: 48, sessions: 21, avatar: "TR" },
  { name: "Connor B.", avgEV: 89.4, maxEV: 102.8, avgLA: 10.9, hardHitPct: 44, sessions: 9, avatar: "CB" },
  { name: "Aiden K.", avgEV: 87.1, maxEV: 99.5, avgLA: 16.2, hardHitPct: 41, sessions: 17, avatar: "AK" },
  { name: "Marcus T.", avgEV: 85.8, maxEV: 97.2, avgLA: 8.7, hardHitPct: 38, sessions: 11, avatar: "MT" },
  { name: "Ethan W.", avgEV: 83.3, maxEV: 95.0, avgLA: 11.3, hardHitPct: 35, sessions: 6, avatar: "EW" },
];

export const sessionTrend = [
  { week: "Jan W1", ev: 86.2, sessions: 8 },
  { week: "Jan W2", ev: 87.5, sessions: 11 },
  { week: "Jan W3", ev: 88.1, sessions: 9 },
  { week: "Jan W4", ev: 89.0, sessions: 14 },
  { week: "Feb W1", ev: 90.3, sessions: 12 },
  { week: "Feb W2", ev: 91.8, sessions: 16 },
  { week: "Feb W3", ev: 92.4, sessions: 18 },
  { week: "Feb W4", ev: 94.2, sessions: 21 },
];

export const employees = [
  { id: 1, name: "Marcus Webb", role: "Facility Manager", phone: "555-0101", hourlyRate: 22, color: "bg-blue-500" },
  { id: 2, name: "Sarah Chen", role: "Cage Attendant", phone: "555-0102", hourlyRate: 16, color: "bg-green-500" },
  { id: 3, name: "Devon Price", role: "Cage Attendant", phone: "555-0103", hourlyRate: 16, color: "bg-purple-500" },
  { id: 4, name: "Jasmine Torres", role: "Front Desk", phone: "555-0104", hourlyRate: 17, color: "bg-orange-500" },
  { id: 5, name: "Ryan O'Brien", role: "Cage Attendant", phone: "555-0105", hourlyRate: 16, color: "bg-red-500" },
];

export const weekSchedule = [
  { day: "Mon 3/2", shifts: [
    { employeeId: 1, start: "8:00 AM", end: "4:00 PM", hours: 8 },
    { employeeId: 2, start: "10:00 AM", end: "6:00 PM", hours: 8 },
    { employeeId: 4, start: "12:00 PM", end: "8:00 PM", hours: 8 },
  ]},
  { day: "Tue 3/3", shifts: [
    { employeeId: 1, start: "8:00 AM", end: "4:00 PM", hours: 8 },
    { employeeId: 3, start: "2:00 PM", end: "10:00 PM", hours: 8 },
    { employeeId: 4, start: "8:00 AM", end: "2:00 PM", hours: 6 },
  ]},
  { day: "Wed 3/4", shifts: [
    { employeeId: 1, start: "8:00 AM", end: "4:00 PM", hours: 8 },
    { employeeId: 2, start: "2:00 PM", end: "10:00 PM", hours: 8 },
    { employeeId: 5, start: "10:00 AM", end: "6:00 PM", hours: 8 },
  ]},
  { day: "Thu 3/5", shifts: [
    { employeeId: 1, start: "8:00 AM", end: "4:00 PM", hours: 8 },
    { employeeId: 3, start: "10:00 AM", end: "6:00 PM", hours: 8 },
    { employeeId: 4, start: "2:00 PM", end: "10:00 PM", hours: 8 },
  ]},
  { day: "Fri 3/6", shifts: [
    { employeeId: 2, start: "12:00 PM", end: "10:00 PM", hours: 10 },
    { employeeId: 5, start: "12:00 PM", end: "10:00 PM", hours: 10 },
    { employeeId: 4, start: "10:00 AM", end: "6:00 PM", hours: 8 },
  ]},
  { day: "Sat 3/7", shifts: [
    { employeeId: 1, start: "8:00 AM", end: "6:00 PM", hours: 10 },
    { employeeId: 2, start: "8:00 AM", end: "6:00 PM", hours: 10 },
    { employeeId: 3, start: "8:00 AM", end: "6:00 PM", hours: 10 },
    { employeeId: 5, start: "10:00 AM", end: "8:00 PM", hours: 10 },
  ]},
  { day: "Sun 3/8", shifts: [
    { employeeId: 1, start: "10:00 AM", end: "6:00 PM", hours: 8 },
    { employeeId: 4, start: "10:00 AM", end: "6:00 PM", hours: 8 },
    { employeeId: 5, start: "12:00 PM", end: "8:00 PM", hours: 8 },
  ]},
];

export const revenueData = [
  { month: "Sep", memberships: 4200, oneOff: 1800, retail: 620, total: 6620 },
  { month: "Oct", memberships: 5100, oneOff: 2100, retail: 740, total: 7940 },
  { month: "Nov", memberships: 5800, oneOff: 2400, retail: 810, total: 9010 },
  { month: "Dec", memberships: 6200, oneOff: 2900, retail: 950, total: 10050 },
  { month: "Jan", memberships: 7400, oneOff: 3100, retail: 1100, total: 11600 },
  { month: "Feb", memberships: 8100, oneOff: 3400, retail: 1240, total: 12740 },
  { month: "Mar", memberships: 8900, oneOff: 3800, retail: 1380, total: 14080 },
];

export const expenseData = [
  { month: "Sep", labor: 3200, utilities: 800, maintenance: 300, software: 250, total: 4550 },
  { month: "Oct", labor: 3400, utilities: 820, maintenance: 150, software: 250, total: 4620 },
  { month: "Nov", labor: 3600, utilities: 900, maintenance: 400, software: 250, total: 5150 },
  { month: "Dec", labor: 3800, utilities: 950, maintenance: 200, software: 250, total: 5200 },
  { month: "Jan", labor: 4100, utilities: 880, maintenance: 350, software: 450, total: 5780 },
  { month: "Feb", labor: 4300, utilities: 860, maintenance: 180, software: 450, total: 5790 },
  { month: "Mar", labor: 4600, utilities: 840, maintenance: 250, software: 450, total: 6140 },
];

// ── LEAGUES ──────────────────────────────────────────────────────────────────

export const leagueSeasons = [
  { id: "s3", label: "Season 3", dates: "Mar 4 – Apr 8, 2026", status: "active", week: 1 },
  { id: "s2", label: "Season 2", dates: "Jan 7 – Feb 11, 2026", status: "completed", week: 5 },
  { id: "s1", label: "Season 1", dates: "Nov 5 – Dec 10, 2025", status: "completed", week: 5 },
];

export const leagueTeams = [
  // Season 3 (active)
  { id: 1, name: "Iron Bats", season: "s3", wins: 2, losses: 0, runsFor: 22, runsAgainst: 12, streak: "W2", members: ["Jake M.", "Tyler R.", "Connor B.", "Aiden K."] },
  { id: 2, name: "The Yard Dogs", season: "s3", wins: 1, losses: 1, runsFor: 18, runsAgainst: 17, streak: "L1", members: ["Marcus T.", "Ethan W.", "Sam D.", "Luis P."] },
  { id: 3, name: "Deep Drive", season: "s3", wins: 1, losses: 1, runsFor: 15, runsAgainst: 14, streak: "W1", members: ["Ryan O.", "Chris F.", "Noah L.", "Mason J."] },
  { id: 4, name: "Exit Velocity", season: "s3", wins: 0, losses: 2, runsFor: 10, runsAgainst: 22, streak: "L2", members: ["Caleb S.", "Owen R.", "Liam T.", "Hunter B."] },
  // Season 2 (completed)
  { id: 5, name: "Iron Bats", season: "s2", wins: 4, losses: 1, runsFor: 48, runsAgainst: 29, streak: "—", members: ["Jake M.", "Tyler R.", "Connor B.", "Aiden K."] },
  { id: 6, name: "Deep Drive", season: "s2", wins: 3, losses: 2, runsFor: 41, runsAgainst: 33, streak: "—", members: ["Ryan O.", "Chris F.", "Noah L.", "Mason J."] },
  { id: 7, name: "The Yard Dogs", season: "s2", wins: 2, losses: 3, runsFor: 35, runsAgainst: 38, streak: "—", members: ["Marcus T.", "Ethan W.", "Sam D.", "Luis P."] },
  { id: 8, name: "Exit Velocity", season: "s2", wins: 1, losses: 4, runsFor: 27, runsAgainst: 51, streak: "—", members: ["Caleb S.", "Owen R.", "Liam T.", "Hunter B."] },
  // Season 1 (completed)
  { id: 9, name: "The Yard Dogs", season: "s1", wins: 4, losses: 1, runsFor: 52, runsAgainst: 31, streak: "—", members: ["Marcus T.", "Ethan W.", "Sam D.", "Luis P."] },
  { id: 10, name: "Iron Bats", season: "s1", wins: 3, losses: 2, runsFor: 44, runsAgainst: 38, streak: "—", members: ["Jake M.", "Tyler R.", "Connor B.", "Aiden K."] },
  { id: 11, name: "Deep Drive", season: "s1", wins: 2, losses: 3, runsFor: 37, runsAgainst: 41, streak: "—", members: ["Ryan O.", "Chris F.", "Noah L.", "Mason J."] },
  { id: 12, name: "Exit Velocity", season: "s1", wins: 1, losses: 4, runsFor: 28, runsAgainst: 51, streak: "—", members: ["Caleb S.", "Owen R.", "Liam T.", "Hunter B."] },
];

export const leagueSchedule = [
  // Season 3
  { season: "s3", week: 1, home: "Iron Bats", away: "The Yard Dogs", homeScore: 12, awayScore: 8, status: "final" },
  { season: "s3", week: 1, home: "Deep Drive", away: "Exit Velocity", homeScore: 9, awayScore: 5, status: "final" },
  { season: "s3", week: 2, home: "Iron Bats", away: "Exit Velocity", homeScore: 10, awayScore: 5, status: "final" },
  { season: "s3", week: 2, home: "The Yard Dogs", away: "Deep Drive", homeScore: 10, awayScore: 6, status: "final" },
  { season: "s3", week: 3, home: "Iron Bats", away: "Deep Drive", homeScore: null, awayScore: null, status: "upcoming", date: "Mar 11, 2026" },
  { season: "s3", week: 3, home: "The Yard Dogs", away: "Exit Velocity", homeScore: null, awayScore: null, status: "upcoming", date: "Mar 11, 2026" },
  { season: "s3", week: 4, home: "Iron Bats", away: "The Yard Dogs", homeScore: null, awayScore: null, status: "upcoming", date: "Mar 18, 2026" },
  { season: "s3", week: 4, home: "Deep Drive", away: "Exit Velocity", homeScore: null, awayScore: null, status: "upcoming", date: "Mar 18, 2026" },
  { season: "s3", week: 5, home: "The Yard Dogs", away: "Deep Drive", homeScore: null, awayScore: null, status: "upcoming", date: "Mar 25, 2026" },
  { season: "s3", week: 5, home: "Iron Bats", away: "Exit Velocity", homeScore: null, awayScore: null, status: "upcoming", date: "Mar 25, 2026" },
];

export const leaguePlayerStats = [
  // All-time (across seasons)
  { name: "Jake M.", team: "Iron Bats", gamesPlayed: 12, avgEV: 94.2, maxEV: 108.1, runsScored: 18, hardHitPct: 52, seasons: 3, championships: 0, avatar: "JM" },
  { name: "Tyler R.", team: "Iron Bats", gamesPlayed: 12, avgEV: 91.7, maxEV: 104.3, runsScored: 15, hardHitPct: 48, seasons: 3, championships: 0, avatar: "TR" },
  { name: "Marcus T.", team: "The Yard Dogs", gamesPlayed: 12, avgEV: 85.8, maxEV: 97.2, runsScored: 21, hardHitPct: 38, seasons: 3, championships: 1, avatar: "MT" },
  { name: "Connor B.", team: "Iron Bats", gamesPlayed: 10, avgEV: 89.4, maxEV: 102.8, runsScored: 12, hardHitPct: 44, seasons: 3, championships: 0, avatar: "CB" },
  { name: "Aiden K.", team: "Iron Bats", gamesPlayed: 10, avgEV: 87.1, maxEV: 99.5, runsScored: 14, hardHitPct: 41, seasons: 3, championships: 0, avatar: "AK" },
  { name: "Ethan W.", team: "The Yard Dogs", gamesPlayed: 11, avgEV: 83.3, maxEV: 95.0, runsScored: 17, hardHitPct: 35, seasons: 3, championships: 1, avatar: "EW" },
  { name: "Ryan O.", team: "Deep Drive", gamesPlayed: 10, avgEV: 86.5, maxEV: 98.1, runsScored: 13, hardHitPct: 40, seasons: 2, championships: 0, avatar: "RO" },
  { name: "Noah L.", team: "Deep Drive", gamesPlayed: 9, avgEV: 84.2, maxEV: 96.4, runsScored: 11, hardHitPct: 37, seasons: 2, championships: 0, avatar: "NL" },
];

export const teamHistoricalStats = [
  { name: "Iron Bats", seasons: 3, championships: 0, runnerUps: 2, totalWins: 9, totalLosses: 3, avgRunsPerGame: 12.8, bestFinish: "2nd" },
  { name: "The Yard Dogs", seasons: 3, championships: 1, runnerUps: 0, totalWins: 7, totalLosses: 5, avgRunsPerGame: 11.7, bestFinish: "1st (S1)" },
  { name: "Deep Drive", seasons: 3, championships: 0, runnerUps: 1, totalWins: 6, totalLosses: 6, avgRunsPerGame: 10.3, bestFinish: "2nd (S2)" },
  { name: "Exit Velocity", seasons: 3, championships: 0, runnerUps: 0, totalWins: 2, totalLosses: 10, avgRunsPerGame: 7.5, bestFinish: "3rd" },
];

export const freeAgents = [
  { name: "Devon P.", position: "OF", avgEV: 88.1, member: true },
  { name: "Sam K.", position: "IF", avgEV: 85.3, member: false },
  { name: "Jordan M.", position: "C", avgEV: 82.7, member: true },
];

// ── MEMBER BREAKDOWN ─────────────────────────────────────────────────────────

export const memberBreakdown = [
  { tier: "Individual Silver", count: 34, revenue: 1700 },
  { tier: "Individual Gold", count: 28, revenue: 2520 },
  { tier: "Individual Platinum", count: 12, revenue: 1800 },
  { tier: "Team Silver", count: 8, revenue: 1000 },
  { tier: "Team Gold", count: 6, revenue: 1440 },
  { tier: "Team Platinum", count: 3, revenue: 1350 },
];
