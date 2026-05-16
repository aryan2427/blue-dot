"use client";

import Link from "next/link";

// ─── Shared Design Token ──────────────────────────────────────────────────────

const CARD =
  "bg-white border border-blue-100/80 rounded-2xl shadow-[0_2px_16px_rgba(37,99,235,0.08)] hover:shadow-[0_4px_24px_rgba(37,99,235,0.14)] transition-shadow duration-200";

// ─── Platform Stats Data ──────────────────────────────────────────────────────

const PLATFORM_STATS = [
  { label: "Total Candidates", value: "1,361", delta: "+128 this week", accentBg: "bg-blue-50", dot: "bg-blue-400" },
  { label: "Employers", value: "142", delta: "+12 this week", accentBg: "bg-amber-50", dot: "bg-amber-400" },
  { label: "Open Positions", value: "260", delta: "+34 today", accentBg: "bg-violet-50", dot: "bg-violet-400" },
  { label: "Placements Made", value: "432", delta: "+56 this month", accentBg: "bg-emerald-50", dot: "bg-emerald-400" },
  { label: "Aggregators", value: "18", delta: "+2 this month", accentBg: "bg-sky-50", dot: "bg-sky-400" },
  { label: "Match Rate", value: "78%", delta: "+4.2% vs last month", accentBg: "bg-indigo-50", dot: "bg-indigo-400" },
  { label: "Scheme Utilization", value: "64%", delta: "-2% vs last month", accentBg: "bg-rose-50", dot: "bg-rose-400" },
  { label: "Active This Week", value: "892", delta: "65% of total", accentBg: "bg-teal-50", dot: "bg-teal-400" },
];

// ─── Role Portals Data ────────────────────────────────────────────────────────

const PORTALS = [
  {
    label: "Candidate Portal",
    sub: "Browse hyperlocal jobs, track your applications, view skill-matched recommendations, and discover government welfare schemes near you.",
    href: "/dashboard/candidate",
    bg: "from-blue-500 to-blue-700",
    icon: "👤",
    stats: [
      { label: "Open Jobs", value: "260" },
      { label: "Schemes Available", value: "3" },
      { label: "Avg Match Score", value: "84%" },
    ],
  },
  {
    label: "Employer Portal",
    sub: "Post job listings, browse skill-filtered candidates, manage your hiring pipeline, and track views, applications, and placement rates.",
    href: "/dashboard/employer",
    bg: "from-amber-400 to-amber-600",
    icon: "🏢",
    stats: [
      { label: "Active Listings", value: "3" },
      { label: "Applications", value: "76" },
      { label: "Hired This Month", value: "3" },
    ],
  },
  {
    label: "Aggregator Portal",
    sub: "Bulk-onboard participants via CSV, QR, or invite links, monitor profile completion, and manage follow-up prompts for at-risk candidates.",
    href: "/dashboard/aggregator",
    bg: "from-violet-500 to-violet-700",
    icon: "🤝",
    stats: [
      { label: "Participants", value: "9" },
      { label: "Active", value: "4" },
      { label: "Avg Completion", value: "57%" },
    ],
  },
  {
    label: "Admin Portal",
    sub: "Full ecosystem control — approve job posts, monitor aggregator health, trigger district-level interventions, and export platform reports.",
    href: "/dashboard/admin",
    bg: "from-gray-700 to-gray-900",
    icon: "⚙️",
    stats: [
      { label: "Pending Approvals", value: "4" },
      { label: "Aggregators", value: "18" },
      { label: "Placements", value: "432" },
    ],
  },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────

function PlatformStatCard({
  label, value, delta, accentBg, dot,
}: {
  label: string; value: string; delta: string; accentBg: string; dot: string;
}) {
  const isDown = delta.startsWith("-");
  return (
    <div className={`${CARD} p-5 flex flex-col gap-1`}>
      <div className={`w-8 h-8 rounded-xl ${accentBg} flex items-center justify-center mb-2`}>
        <div className={`w-3 h-3 rounded-full ${dot}`} />
      </div>
      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">{label}</span>
      <span className="text-3xl font-black text-gray-900">{value}</span>
      <span className={`text-[11px] font-semibold ${isDown ? "text-red-500" : "text-emerald-600"}`}>
        {isDown ? "↓" : "↑"} {delta}
      </span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CommandCentre() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50">

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 px-6 h-14 flex items-center sticky top-0 z-50 shadow-sm shadow-blue-100/50">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>
            <span className="font-bold text-[17px] tracking-tight text-gray-900">Blue Dot</span>
            <span className="text-gray-300 mx-1">|</span>
            <span className="text-sm font-semibold text-blue-600">Command Centre</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 px-2.5 py-1 rounded-full">
              ● Live
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-100 ring-2 ring-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs">
              BD
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-10">

        {/* Page header */}
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Command Centre</h1>
          <p className="text-gray-500 mt-1">
            Angul District · Unified ecosystem view across all roles and functions
          </p>
        </div>

        {/* ── Role Portal Cards ── */}
        <section>
          <h2 className="text-lg font-black text-gray-900 mb-1">Role Portals</h2>
          <p className="text-sm text-gray-500 mb-5">Jump directly into any role&apos;s dashboard</p>

          <div className="grid grid-cols-2 gap-5">
            {PORTALS.map((p) => (
              <Link
                key={p.label}
                href={p.href}
                className={`bg-gradient-to-br ${p.bg} rounded-2xl p-7 flex flex-col gap-4 hover:scale-[1.015] transition-transform shadow-lg group`}
              >
                {/* Icon + title */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{p.icon}</span>
                  <div>
                    <p className="font-black text-white text-lg leading-tight">{p.label}</p>
                    <span className="text-[11px] font-semibold text-white/60 group-hover:text-white/80 transition">
                      Open dashboard →
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-white/75 leading-relaxed">{p.sub}</p>

                {/* Mini stats row */}
                <div className="flex gap-3 pt-3 border-t border-white/10">
                  {p.stats.map((s) => (
                    <div key={s.label} className="flex-1 bg-white/10 rounded-xl px-3 py-2.5">
                      <p className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">{s.label}</p>
                      <p className="text-xl font-black text-white mt-0.5">{s.value}</p>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Platform Overview Stats ── */}
        <section>
          <h2 className="text-lg font-black text-gray-900 mb-1">Platform Overview</h2>
          <p className="text-sm text-gray-500 mb-5">
            Live numbers across the entire Angul district ecosystem
          </p>
          <div className="grid grid-cols-4 gap-4">
            {PLATFORM_STATS.map((s) => (
              <PlatformStatCard key={s.label} {...s} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
