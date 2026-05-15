"use client";

import { useState } from "react";
import Link from "next/link";

// --- Types ---
interface StatCard {
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  icon: string;
  color: string;
}

interface Aggregator {
  id: number;
  name: string;
  type: string;
  area: string;
  participants: number;
  active: number;
  status: "healthy" | "at_risk" | "inactive";
}

interface RecentActivity {
  id: number;
  text: string;
  time: string;
  type: "candidate" | "employer" | "aggregator" | "job";
}

// --- Mock Data ---
const stats: StatCard[] = [
  { label: "Total Candidates", value: "1,361", change: "+128 this week", changeType: "up", icon: "👤", color: "blue" },
  { label: "Total Employers", value: "142", change: "+12 this week", changeType: "up", icon: "🏢", color: "amber" },
  { label: "Open Positions", value: "260", change: "+34 today", changeType: "up", icon: "💼", color: "violet" },
  { label: "Aggregators", value: "18", change: "+2 this month", changeType: "up", icon: "🤝", color: "green" },
  { label: "Placements Made", value: "432", change: "+56 this month", changeType: "up", icon: "✅", color: "green" },
  { label: "Match Rate", value: "78%", change: "+4.2% vs last month", changeType: "up", icon: "📈", color: "blue" },
  { label: "Scheme Utilization", value: "64%", change: "-2% vs last month", changeType: "down", icon: "🏛️", color: "amber" },
  { label: "Active This Week", value: "892", change: "65% of total", changeType: "neutral", icon: "⚡", color: "violet" },
];

const aggregators: Aggregator[] = [
  { id: 1, name: "Angul Skill Dev. Centre", type: "Training Institute", area: "Angul Town", participants: 245, active: 198, status: "healthy" },
  { id: 2, name: "Talcher Youth NGO", type: "NGO", area: "Talcher", participants: 180, active: 120, status: "healthy" },
  { id: 3, name: "Odisha Placement Hub", type: "Placement Agency", area: "Entire District", participants: 310, active: 189, status: "healthy" },
  { id: 4, name: "Banarpal Vocational", type: "Training Institute", area: "Banarpal", participants: 95, active: 42, status: "at_risk" },
  { id: 5, name: "Kaniha Women NGO", type: "NGO", area: "Kaniha", participants: 78, active: 21, status: "at_risk" },
  { id: 6, name: "Pallahara Dev Trust", type: "NGO", area: "Pallahara", participants: 45, active: 8, status: "inactive" },
];

const recentActivity: RecentActivity[] = [
  { id: 1, text: "New candidate registered — Priya Nayak, Talcher", time: "2 min ago", type: "candidate" },
  { id: 2, text: "New job posted — Electrician at Talcher Coal Ltd", time: "8 min ago", type: "job" },
  { id: 3, text: "Employer registered — Angul Steel Works", time: "15 min ago", type: "employer" },
  { id: 4, text: "Aggregator onboarded 12 new candidates", time: "1 hr ago", type: "aggregator" },
  { id: 5, text: "Placement confirmed — Rahul Das → Kaniha Industries", time: "2 hr ago", type: "candidate" },
  { id: 6, text: "New job posted — Accountant at Banarpal Traders", time: "3 hr ago", type: "job" },
];

const pendingApprovals = [
  { id: 1, type: "Job Post", title: "Welder — Talcher Steel", company: "Talcher Steel Ltd", time: "10 min ago" },
  { id: 2, type: "Employer", title: "Angul Mining Co.", company: "New registration", time: "25 min ago" },
  { id: 3, type: "Job Post", title: "Driver — Banarpal Logistics", company: "Banarpal Logistics", time: "1 hr ago" },
  { id: 4, type: "Aggregator", title: "Chhendipada Youth Club", company: "New registration", time: "2 hr ago" },
];

// --- Color Helpers ---
const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  amber: "bg-amber-100 text-amber-600",
  green: "bg-green-100 text-green-600",
  violet: "bg-violet-100 text-violet-600",
};

const statusMap: Record<string, string> = {
  healthy: "bg-green-100 text-green-600",
  at_risk: "bg-amber-100 text-amber-600",
  inactive: "bg-red-100 text-red-500",
};

const activityColor: Record<string, string> = {
  candidate: "bg-blue-500",
  employer: "bg-amber-500",
  aggregator: "bg-green-500",
  job: "bg-violet-500",
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "aggregators", label: "Aggregators", icon: "🤝" },
    { id: "approvals", label: "Approvals", icon: "✅" },
    { id: "activity", label: "Activity", icon: "⚡" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f4]">

      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#2563eb" strokeWidth="2" />
                  <circle cx="10" cy="10" r="4" fill="#2563eb" />
                  <circle cx="10" cy="10" r="2" fill="#fff" />
                </svg>
              </div>
              <span className="font-bold text-gray-900">Blue Dot</span>
            </Link>
            <span className="text-gray-300">|</span>
            <span className="text-sm font-medium text-gray-500">
              Admin Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition">
              <span className="text-base">🔔</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Admin avatar */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">A</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">
            Ecosystem Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Angul District · Live data updated every 2 minutes
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white border border-gray-200 rounded-2xl p-1.5 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      {stat.label}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${colorMap[stat.color]}`}>
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-3xl font-black text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className={`text-xs font-medium ${
                    stat.changeType === "up" ? "text-green-500" :
                    stat.changeType === "down" ? "text-red-500" :
                    "text-gray-400"
                  }`}>
                    {stat.changeType === "up" ? "↑" : stat.changeType === "down" ? "↓" : "→"} {stat.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-2 gap-6">

              {/* Demand Supply Gap */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">
                  Demand-Supply Gap by Area
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    { area: "Angul Town", candidates: 420, jobs: 85 },
                    { area: "Talcher", candidates: 310, jobs: 72 },
                    { area: "Banarpal", candidates: 140, jobs: 35 },
                    { area: "Kaniha", candidates: 96, jobs: 44 },
                    { area: "Pallahara", candidates: 120, jobs: 22 },
                  ].map((row) => (
                    <div key={row.area}>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span className="font-medium text-gray-700">{row.area}</span>
                        <span>{row.candidates} candidates · {row.jobs} jobs</span>
                      </div>
                      <div className="flex gap-1 h-2">
                        <div
                          className="bg-blue-400 rounded-full"
                          style={{ width: `${(row.candidates / 500) * 100}%` }}
                        />
                        <div
                          className="bg-amber-400 rounded-full"
                          style={{ width: `${(row.jobs / 500) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span className="w-3 h-3 rounded-full bg-blue-400 inline-block" />
                      Candidates
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                      Jobs
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">
                  Recent Activity
                </h3>
                <div className="flex flex-col gap-3">
                  {recentActivity.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activityColor[item.type]}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 leading-snug">
                          {item.text}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AGGREGATORS TAB */}
        {activeTab === "aggregators" && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">All Aggregators</h3>
              <span className="text-sm text-gray-400">{aggregators.length} total</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">
                      Organization
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">
                      Type
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">
                      Coverage
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">
                      Participants
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">
                      Status
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {aggregators.map((agg) => (
                    <tr
                      key={agg.id}
                      className="border-t border-gray-50 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-sm text-gray-900">
                          {agg.name}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">{agg.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">{agg.area}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {agg.participants}
                          </p>
                          <p className="text-xs text-gray-400">
                            {agg.active} active
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusMap[agg.status]}`}>
                          {agg.status === "healthy" ? "Healthy" :
                           agg.status === "at_risk" ? "At Risk" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-xs text-blue-500 font-semibold hover:underline">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* APPROVALS TAB */}
        {activeTab === "approvals" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">
                Pending Approvals
              </h3>
              <span className="bg-red-100 text-red-500 text-xs font-semibold px-2.5 py-1 rounded-lg">
                {pendingApprovals.length} pending
              </span>
            </div>
            {pendingApprovals.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    item.type === "Job Post"
                      ? "bg-violet-100 text-violet-600"
                      : item.type === "Employer"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-green-100 text-green-600"
                  }`}>
                    {item.type}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.company} · {item.time}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-xl hover:bg-gray-800 transition">
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-red-50 text-red-500 text-xs font-semibold rounded-xl hover:bg-red-100 transition">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ACTIVITY TAB */}
        {activeTab === "activity" && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">All Activity</h3>
            </div>
            <div className="flex flex-col divide-y divide-gray-50">
              {[...recentActivity, ...recentActivity].map((item, i) => (
                <div key={i} className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${activityColor[item.type]}`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{item.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-lg capitalize ${
                    item.type === "candidate" ? "bg-blue-50 text-blue-500" :
                    item.type === "employer" ? "bg-amber-50 text-amber-500" :
                    item.type === "aggregator" ? "bg-green-50 text-green-500" :
                    "bg-violet-50 text-violet-500"
                  }`}>
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}