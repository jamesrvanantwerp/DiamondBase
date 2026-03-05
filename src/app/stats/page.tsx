"use client";
import { hittraxStats, sessionTrend } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Trophy, Zap, TrendingUp, Target } from "lucide-react";

export default function StatsPage() {
  const topPlayer = hittraxStats[0];

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="h-8 w-8 text-yellow-400" />
          <h1 className="text-3xl font-bold text-white">HitTrax Leaderboard</h1>
        </div>
        <p className="text-gray-400 mb-10">Live performance data synced from HitTrax sessions at DiamondBase.</p>

        {/* Top stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Facility Leader EV", value: `${topPlayer.avgEV} mph`, sub: topPlayer.name, color: "text-yellow-400", icon: Trophy },
            { label: "Max Exit Velocity", value: `${topPlayer.maxEV} mph`, sub: "All-time facility record", color: "text-blue-400", icon: Zap },
            { label: "Avg Launch Angle", value: `${topPlayer.avgLA}°`, sub: "Facility average", color: "text-green-400", icon: Target },
            { label: "Total Sessions", value: "96", sub: "This month", color: "text-purple-400", icon: TrendingUp },
          ].map((s) => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <s.icon className={`h-5 w-5 ${s.color} mb-2`} />
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-white text-sm font-medium mt-1">{s.label}</p>
              <p className="text-gray-500 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* EV Trend Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-bold text-lg mb-1">Exit Velocity Trend – Jake M.</h2>
          <p className="text-gray-400 text-sm mb-6">Average exit velocity over 8 weeks of sessions</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={sessionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="week" tick={{ fill: "#6b7280", fontSize: 11 }} />
              <YAxis domain={[84, 96]} tick={{ fill: "#6b7280", fontSize: 11 }} unit=" mph" />
              <Tooltip
                contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }}
                labelStyle={{ color: "#9ca3af" }}
              />
              <Line type="monotone" dataKey="ev" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: "#3b82f6", r: 4 }} name="Avg EV" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Leaderboard */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-white font-bold text-lg">Member Leaderboard</h2>
            <p className="text-gray-400 text-sm">Ranked by average exit velocity</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wide">
                  <th className="text-left px-6 py-3">Rank</th>
                  <th className="text-left px-6 py-3">Player</th>
                  <th className="text-right px-6 py-3">Avg EV</th>
                  <th className="text-right px-6 py-3">Max EV</th>
                  <th className="text-right px-6 py-3">Avg LA</th>
                  <th className="text-right px-6 py-3">Hard Hit%</th>
                  <th className="text-right px-6 py-3">Sessions</th>
                </tr>
              </thead>
              <tbody>
                {hittraxStats.map((player, i) => (
                  <tr key={player.name} className={`border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors ${i === 0 ? "bg-yellow-950/10" : ""}`}>
                    <td className="px-6 py-4">
                      {i === 0 ? (
                        <span className="text-yellow-400 font-bold flex items-center gap-1">
                          <Trophy className="h-4 w-4" /> 1
                        </span>
                      ) : (
                        <span className="text-gray-400 font-medium">{i + 1}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {player.avatar}
                        </div>
                        <span className="text-white font-medium">{player.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-blue-400 font-bold">{player.avgEV}</span>
                      <span className="text-gray-500 text-xs"> mph</span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-300">{player.maxEV} mph</td>
                    <td className="px-6 py-4 text-right text-gray-300">{player.avgLA}°</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-semibold ${player.hardHitPct >= 48 ? "text-green-400" : player.hardHitPct >= 40 ? "text-yellow-400" : "text-gray-300"}`}>
                        {player.hardHitPct}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-400">{player.sessions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-xs">Data synced via HitTrax Commercial API · Updated in real-time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
