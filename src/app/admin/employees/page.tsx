"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Clock, DollarSign, Users, Plus, Phone, Check, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Employee = { id: string; name: string; role: string; phone: string; hourly_rate: number; color: string };
type Shift = { id: string; employee_id: string; day: string; start_time: string; end_time: string; hours: number };

const DAYS = ["Mon 3/2", "Tue 3/3", "Wed 3/4", "Thu 3/5", "Fri 3/6", "Sat 3/7", "Sun 3/8"];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  // Add shift form state
  const [addingShift, setAddingShift] = useState(false);
  const [newShift, setNewShift] = useState({ employee_id: "", day: DAYS[0], start_time: "8:00 AM", end_time: "4:00 PM", hours: 8 });

  const fetchData = async () => {
    const [{ data: emps }, { data: sh }] = await Promise.all([
      supabase.from("employees").select("*").order("name"),
      supabase.from("shifts").select("*"),
    ]);
    if (emps) setEmployees(emps);
    if (sh) setShifts(sh);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const addShift = async () => {
    if (!newShift.employee_id) return;
    const { data } = await supabase.from("shifts").insert([{ ...newShift, week_of: "2026-03-02" }]).select().single();
    if (data) setShifts((prev) => [...prev, data]);
    setAddingShift(false);
    setNewShift({ employee_id: "", day: DAYS[0], start_time: "8:00 AM", end_time: "4:00 PM", hours: 8 });
  };

  const deleteShift = async (id: string) => {
    await supabase.from("shifts").delete().eq("id", id);
    setShifts((prev) => prev.filter((s) => s.id !== id));
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const weeklyHours = employees.map((emp) => {
    const empShifts = shifts.filter((s) => s.employee_id === emp.id);
    const hours = empShifts.reduce((t, s) => t + s.hours, 0);
    return { ...emp, weeklyHours: hours, weeklyPay: hours * emp.hourly_rate };
  });

  const totalLaborCost = weeklyHours.reduce((a, e) => a + e.weeklyPay, 0);
  const totalHours = weeklyHours.reduce((a, e) => a + e.weeklyHours, 0);

  const getEmpColor = (id: string) => employees.find((e) => e.id === id)?.color ?? "bg-blue-500";
  const getEmpName = (id: string) => employees.find((e) => e.id === id)?.name ?? "";

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-white">Employee Scheduling</h1>
        </div>
        <p className="text-gray-400 mb-8 ml-8">Week of March 2–8, 2026 · Live data</p>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <Users className="h-5 w-5 text-blue-400 mb-2" />
            <p className="text-3xl font-black text-white">{employees.length}</p>
            <p className="text-white text-sm font-medium mt-1">Staff Members</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <Clock className="h-5 w-5 text-orange-400 mb-2" />
            <p className="text-3xl font-black text-white">{totalHours}</p>
            <p className="text-white text-sm font-medium mt-1">Total Hours This Week</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <DollarSign className="h-5 w-5 text-green-400 mb-2" />
            <p className="text-3xl font-black text-white">${totalLaborCost.toLocaleString()}</p>
            <p className="text-white text-sm font-medium mt-1">Weekly Labor Cost</p>
            <p className="text-gray-500 text-xs">~${Math.round(totalLaborCost * 4.33).toLocaleString()} / month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Schedule Grid */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-white font-bold text-lg">Weekly Schedule</h2>
              <button onClick={() => setAddingShift(true)}
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors">
                <Plus className="h-4 w-4" /> Add Shift
              </button>
            </div>

            {/* Add Shift Form */}
            {addingShift && (
              <div className="p-4 border-b border-gray-700 bg-gray-800/50">
                <p className="text-white font-medium text-sm mb-3">New Shift</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  <select value={newShift.employee_id} onChange={(e) => setNewShift({ ...newShift, employee_id: e.target.value })}
                    className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 col-span-2 sm:col-span-1">
                    <option value="">Employee</option>
                    {employees.map((e) => <option key={e.id} value={e.id}>{e.name.split(" ")[0]}</option>)}
                  </select>
                  <select value={newShift.day} onChange={(e) => setNewShift({ ...newShift, day: e.target.value })}
                    className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500">
                    {DAYS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                  <input value={newShift.start_time} onChange={(e) => setNewShift({ ...newShift, start_time: e.target.value })}
                    placeholder="Start (8:00 AM)" className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
                  <input value={newShift.end_time} onChange={(e) => setNewShift({ ...newShift, end_time: e.target.value })}
                    placeholder="End (4:00 PM)" className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
                  <input type="number" value={newShift.hours} onChange={(e) => setNewShift({ ...newShift, hours: Number(e.target.value) })}
                    placeholder="Hours" className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={addShift} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
                    <Check className="h-4 w-4" /> Save
                  </button>
                  <button onClick={() => setAddingShift(false)} className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm px-3 py-1.5 rounded-lg transition-colors">
                    <X className="h-4 w-4" /> Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left px-4 py-3 text-gray-400 text-xs uppercase tracking-wide w-28">Employee</th>
                    {DAYS.map((day) => (
                      <th key={day} className="text-center px-2 py-3 text-gray-400 text-xs uppercase tracking-wide">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                      <td className="px-4 py-2.5">
                        <button onClick={() => setSelectedEmployee(selectedEmployee === emp.id ? null : emp.id)}
                          className="flex items-center gap-2 text-left hover:opacity-80 transition-opacity">
                          <div className={`w-7 h-7 ${emp.color} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                            {emp.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="text-white text-xs font-medium">{emp.name.split(" ")[0]}</span>
                        </button>
                      </td>
                      {DAYS.map((day) => {
                        const shift = shifts.find((s) => s.employee_id === emp.id && s.day === day);
                        return (
                          <td key={day} className="px-2 py-2.5 text-center">
                            {shift ? (
                              <div className="relative group">
                                <div className={`${emp.color} bg-opacity-20 border border-current/30 rounded-lg px-1.5 py-1`}>
                                  <p className={`text-xs font-semibold ${emp.color.replace("bg-", "text-")}`}>{shift.hours}h</p>
                                  <p className="text-gray-400 text-[10px]">{shift.start_time.replace(" AM", "a").replace(" PM", "p")}</p>
                                </div>
                                <button onClick={() => deleteShift(shift.id)}
                                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] items-center justify-center hidden group-hover:flex">
                                  ×
                                </button>
                              </div>
                            ) : (
                              <span className="text-gray-700 text-sm">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pay Summary */}
          <div className="flex flex-col gap-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-gray-800">
                <h2 className="text-white font-bold">Hours & Pay Summary</h2>
              </div>
              <div className="divide-y divide-gray-800">
                {weeklyHours.map((emp) => (
                  <div key={emp.id}
                    className={`p-4 cursor-pointer transition-colors ${selectedEmployee === emp.id ? "bg-gray-800/50" : "hover:bg-gray-800/20"}`}
                    onClick={() => setSelectedEmployee(selectedEmployee === emp.id ? null : emp.id)}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 ${emp.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                          {emp.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{emp.name}</p>
                          <p className="text-gray-500 text-xs">{emp.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-sm">{emp.weeklyHours}h</p>
                        <p className="text-green-400 text-xs">${emp.weeklyPay}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className={`${emp.color} h-1.5 rounded-full`} style={{ width: `${Math.min((emp.weeklyHours / 50) * 100, 100)}%` }} />
                    </div>
                    {selectedEmployee === emp.id && (
                      <div className="mt-3 pt-3 border-t border-gray-700 space-y-1.5 text-xs">
                        <div className="flex justify-between text-gray-300"><span>Hourly Rate</span><span className="text-white">${emp.hourly_rate}/hr</span></div>
                        <div className="flex justify-between text-gray-300"><span>Weekly Hours</span><span className="text-white">{emp.weeklyHours} hrs</span></div>
                        <div className="flex justify-between text-gray-300"><span>Weekly Pay</span><span className="text-green-400 font-semibold">${emp.weeklyPay}</span></div>
                        <div className="flex justify-between text-gray-300"><span>Est. Monthly</span><span className="text-green-400 font-semibold">${Math.round(emp.weeklyPay * 4.33).toLocaleString()}</span></div>
                        <div className="flex items-center gap-1 text-gray-400 pt-1"><Phone className="h-3 w-3" /><span>{emp.phone}</span></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-800 bg-gray-800/30">
                <div className="flex justify-between text-sm"><span className="text-gray-400">Total weekly</span><span className="text-green-400 font-bold">${totalLaborCost.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm mt-1"><span className="text-gray-400">Est. monthly</span><span className="text-green-400 font-bold">${Math.round(totalLaborCost * 4.33).toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
