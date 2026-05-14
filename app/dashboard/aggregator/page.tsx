"use client";

import { useState, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ParticipantStatus = "New" | "Active" | "At Risk" | "Inactive";
type OnboardMethod = "csv" | "qr" | "link";
type TabId = "onboard" | "participants" | "completion" | "followup" | "reports";

interface Participant {
  id: number;
  name: string;
  phone: string;
  location: string;
  skills: string[];
  status: ParticipantStatus;
  profileCompletion: number;
  joinedDate: string;
  lastActive: string;
  jobsApplied: number;
  flagged: boolean;
}

interface FollowUpPrompt {
  id: number;
  participantName: string;
  reason: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  done: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PARTICIPANTS: Participant[] = [
  { id: 1, name: "Priya Mohanty", phone: "9437012345", location: "Angul Town", skills: ["Data Entry", "MS Office"], status: "Active", profileCompletion: 85, joinedDate: "2025-03-10", lastActive: "2025-05-13", jobsApplied: 4, flagged: false },
  { id: 2, name: "Ramesh Sahu", phone: "9861023456", location: "Talcher", skills: ["Welding", "Fitter"], status: "At Risk", profileCompletion: 42, joinedDate: "2025-02-18", lastActive: "2025-04-02", jobsApplied: 1, flagged: true },
  { id: 3, name: "Sunita Behera", phone: "7894561230", location: "Nalco Nagar", skills: ["Nursing", "First Aid"], status: "Active", profileCompletion: 91, joinedDate: "2025-01-05", lastActive: "2025-05-12", jobsApplied: 6, flagged: false },
  { id: 4, name: "Bikash Pradhan", phone: "9438765432", location: "Banarpal", skills: ["Driving", "Logistics"], status: "New", profileCompletion: 20, joinedDate: "2025-05-08", lastActive: "2025-05-09", jobsApplied: 0, flagged: false },
  { id: 5, name: "Anita Nayak", phone: "9040123987", location: "Angul Town", skills: ["Tailoring", "Embroidery"], status: "Inactive", profileCompletion: 55, joinedDate: "2024-12-01", lastActive: "2025-02-10", jobsApplied: 2, flagged: true },
  { id: 6, name: "Deepak Jena", phone: "7978456123", location: "Kishorenagar", skills: ["Electrician", "Wireman"], status: "Active", profileCompletion: 78, joinedDate: "2025-02-25", lastActive: "2025-05-11", jobsApplied: 3, flagged: false },
  { id: 7, name: "Mamata Das", phone: "9437890456", location: "Chhendipada", skills: ["Teaching", "Hindi"], status: "New", profileCompletion: 30, joinedDate: "2025-05-10", lastActive: "2025-05-10", jobsApplied: 0, flagged: false },
  { id: 8, name: "Sanjib Mallick", phone: "8895674321", location: "Talcher", skills: ["Plumbing", "Mason"], status: "At Risk", profileCompletion: 38, joinedDate: "2025-01-20", lastActive: "2025-03-15", jobsApplied: 1, flagged: true },
];

const FOLLOW_UPS: FollowUpPrompt[] = [
  { id: 1, participantName: "Ramesh Sahu", reason: "No activity in 40+ days — needs re-engagement", priority: "High", dueDate: "2025-05-16", done: false },
  { id: 2, participantName: "Anita Nayak", reason: "Profile incomplete (55%) — missing skills & experience", priority: "High", dueDate: "2025-05-15", done: false },
  { id: 3, participantName: "Sanjib Mallick", reason: "Applied to only 1 job despite 3 months on platform", priority: "Medium", dueDate: "2025-05-18", done: false },
  { id: 4, participantName: "Bikash Pradhan", reason: "New user — profile completion at 20%, needs guidance", priority: "Medium", dueDate: "2025-05-17", done: false },
  { id: 5, participantName: "Mamata Das", reason: "New user — hasn't applied to any jobs yet", priority: "Low", dueDate: "2025-05-20", done: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<ParticipantStatus, string> = {
  New: "bg-blue-100 text-blue-700",
  Active: "bg-green-100 text-green-700",
  "At Risk": "bg-orange-100 text-orange-700",
  Inactive: "bg-gray-100 text-gray-500",
};

const PRIORITY_STYLES = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-blue-100 text-blue-600",
};

const completionColor = (pct: number) => {
  if (pct >= 80) return "bg-green-500";
  if (pct >= 50) return "bg-yellow-400";
  return "bg-red-400";
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub: string; accent?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-1 shadow-sm">
      <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">{label}</span>
      <span className={`text-3xl font-bold ${accent ?? "text-gray-900"}`}>{value}</span>
      <span className="text-xs text-gray-500">{sub}</span>
    </div>
  );
}

// ─── Tab: Onboard ─────────────────────────────────────────────────────────────

function OnboardTab() {
  const [method, setMethod] = useState<OnboardMethod>("csv");
  const [csvDone, setCsvDone] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setCsvDone(true);
  };

  const copyLink = () => {
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const methods: { id: OnboardMethod; label: string; icon: string }[] = [
    { id: "csv", label: "CSV Upload", icon: "📄" },
    { id: "qr", label: "QR Code", icon: "⬛" },
    { id: "link", label: "Invite Link", icon: "🔗" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
              method === m.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
            }`}
          >
            <span>{m.icon}</span> {m.label}
          </button>
        ))}
      </div>

      {method === "csv" && (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-bold mb-1">Upload Participant CSV</h3>
          <p className="text-sm text-gray-500 mb-6">Upload a spreadsheet with Name, Phone, Location, Skills columns.</p>

          {!csvDone ? (
            <div
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-blue-200 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
            >
              <div className="text-4xl mb-3">📤</div>
              <p className="text-gray-600 font-medium">Drag & drop your CSV here</p>
              <p className="text-sm text-gray-400 mt-1">or click to browse files</p>
              <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={() => setCsvDone(true)} />
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">✅</div>
              <p className="font-bold text-green-700">CSV uploaded successfully!</p>
              <p className="text-sm text-green-600 mt-1">24 participants queued for onboarding</p>
              <button onClick={() => setCsvDone(false)} className="mt-4 text-sm text-blue-600 underline">Upload another</button>
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Expected CSV format</p>
            <code className="text-xs text-gray-700 block">Name, Phone, Location, Skills, Education, Experience</code>
            <code className="text-xs text-gray-400 block mt-1">Priya Mohanty, 9437012345, Angul, Data Entry, 12th Pass, 2 years</code>
          </div>
        </div>
      )}

      {method === "qr" && (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
          <h3 className="text-lg font-bold mb-1">QR Code Onboarding</h3>
          <p className="text-sm text-gray-500 mb-6">Participants scan this QR to self-register under your organisation.</p>
          <div className="inline-block p-4 border-4 border-gray-900 rounded-2xl mb-4">
            {/* Fake QR grid */}
            <div className="grid grid-cols-10 gap-0.5">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className={`w-4 h-4 rounded-sm ${Math.random() > 0.5 ? "bg-gray-900" : "bg-white"}`} />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4">Blue Dot · Angul Employment Network · Expires: 31 May 2025</p>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
            Download QR
          </button>
        </div>
      )}

      {method === "link" && (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-bold mb-1">Shareable Invite Link</h3>
          <p className="text-sm text-gray-500 mb-6">Share this link via WhatsApp, SMS, or any channel. New signups are auto-linked to your organisation.</p>
          <div className="flex gap-3">
            <input
              readOnly
              value="https://bluedot.in/join?org=angul-ngo-01&ref=agg"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-gray-50"
            />
            <button
              onClick={copyLink}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition ${
                linkCopied ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {linkCopied ? "✓ Copied" : "Copy"}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {["WhatsApp", "SMS", "Email"].map((c) => (
              <button key={c} className="border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-600 hover:border-blue-300 hover:bg-blue-50 transition">
                Share via {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Participants ────────────────────────────────────────────────────────

function ParticipantsTab() {
  const [filter, setFilter] = useState<"All" | ParticipantStatus>("All");
  const [search, setSearch] = useState("");

  const statuses: ("All" | ParticipantStatus)[] = ["All", "New", "Active", "At Risk", "Inactive"];

  const filtered = PARTICIPANTS.filter((p) => {
    const matchStatus = filter === "All" || p.status === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or location…"
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                filter === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <div key={p.id} className={`bg-white border rounded-2xl p-5 shadow-sm flex flex-col gap-3 ${p.flagged ? "border-orange-200" : "border-gray-200"}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900">{p.name}</h4>
                  {p.flagged && <span className="text-orange-500 text-xs font-semibold">⚠ Flagged</span>}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">📍 {p.location} · 📞 {p.phone}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[p.status]}`}>{p.status}</span>
            </div>

            <div className="flex gap-1.5 flex-wrap">
              {p.skills.map((s) => (
                <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{s}</span>
              ))}
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Profile completion</span>
                <span className="font-semibold">{p.profileCompletion}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className={`h-1.5 rounded-full ${completionColor(p.profileCompletion)}`} style={{ width: `${p.profileCompletion}%` }} />
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-400 pt-1 border-t border-gray-100">
              <span>Joined {p.joinedDate}</span>
              <span>Last active {p.lastActive}</span>
              <span>{p.jobsApplied} jobs applied</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">No participants found.</div>
      )}
    </div>
  );
}

// ─── Tab: Completion Tracker ──────────────────────────────────────────────────

function CompletionTab() {
  const sorted = [...PARTICIPANTS].sort((a, b) => a.profileCompletion - b.profileCompletion);
  const avg = Math.round(PARTICIPANTS.reduce((s, p) => s + p.profileCompletion, 0) / PARTICIPANTS.length);

  const buckets = [
    { label: "< 40%", count: PARTICIPANTS.filter((p) => p.profileCompletion < 40).length, color: "bg-red-400" },
    { label: "40–70%", count: PARTICIPANTS.filter((p) => p.profileCompletion >= 40 && p.profileCompletion < 70).length, color: "bg-yellow-400" },
    { label: "≥ 70%", count: PARTICIPANTS.filter((p) => p.profileCompletion >= 70).length, color: "bg-green-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Avg Completion" value={`${avg}%`} sub="across all participants" accent="text-blue-600" />
        {buckets.map((b) => (
          <StatCard key={b.label} label={b.label} value={b.count} sub="participants" />
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-5">Individual Completion Progress</h3>
        <div className="space-y-4">
          {sorted.map((p) => (
            <div key={p.id} className="flex items-center gap-4">
              <div className="w-36 shrink-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
                <p className="text-xs text-gray-400">{p.location}</p>
              </div>
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${completionColor(p.profileCompletion)} transition-all`}
                  style={{ width: `${p.profileCompletion}%` }}
                />
              </div>
              <span className="text-sm font-bold text-gray-700 w-10 text-right">{p.profileCompletion}%</span>
              {p.profileCompletion < 50 && (
                <button className="text-xs text-blue-600 font-semibold hover:underline whitespace-nowrap">Nudge</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Follow-Up Prompts ───────────────────────────────────────────────────

function FollowUpTab() {
  const [prompts, setPrompts] = useState(FOLLOW_UPS);

  const markDone = (id: number) =>
    setPrompts((prev) => prev.map((p) => (p.id === id ? { ...p, done: true } : p)));

  const pending = prompts.filter((p) => !p.done);
  const done = prompts.filter((p) => p.done);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Pending Follow-Ups <span className="text-blue-600 ml-1">({pending.length})</span></h3>
      </div>

      <div className="space-y-3">
        {pending.map((fp) => (
          <div key={fp.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900">{fp.participantName}</span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${PRIORITY_STYLES[fp.priority]}`}>{fp.priority}</span>
              </div>
              <p className="text-sm text-gray-500">{fp.reason}</p>
              <p className="text-xs text-gray-400 mt-1">Due: {fp.dueDate}</p>
            </div>
            <div className="flex gap-2">
              <button className="text-sm border border-gray-200 px-4 py-2 rounded-xl text-gray-600 hover:border-blue-300 hover:bg-blue-50 transition">
                Call
              </button>
              <button
                onClick={() => markDone(fp.id)}
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Mark Done
              </button>
            </div>
          </div>
        ))}
      </div>

      {done.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-400 mb-3">Completed ({done.length})</h3>
          <div className="space-y-2">
            {done.map((fp) => (
              <div key={fp.id} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3 opacity-60">
                <span className="text-green-500 text-lg">✓</span>
                <div>
                  <span className="font-semibold text-gray-700 text-sm">{fp.participantName}</span>
                  <p className="text-xs text-gray-400">{fp.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Reports ─────────────────────────────────────────────────────────────

function ReportsTab() {
  const [exported, setExported] = useState(false);

  const reports = [
    { label: "Participant Summary", desc: "Full list with status, completion, and activity", icon: "👥", rows: 8 },
    { label: "At-Risk Report", desc: "Participants with low engagement or incomplete profiles", icon: "⚠️", rows: 3 },
    { label: "Placement Report", desc: "Jobs applied, shortlisted, and placed by participant", icon: "📋", rows: 8 },
    { label: "Monthly Activity Log", desc: "Logins, applications, and updates for May 2025", icon: "📅", rows: 24 },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reports.map((r) => (
          <div key={r.label} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <span className="text-3xl">{r.icon}</span>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">{r.label}</h4>
              <p className="text-sm text-gray-500 mt-0.5">{r.desc}</p>
              <p className="text-xs text-gray-400 mt-1">{r.rows} records</p>
            </div>
            <button
              onClick={() => setExported(true)}
              className="text-sm bg-gray-900 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-700 transition whitespace-nowrap"
            >
              Export CSV
            </button>
          </div>
        ))}
      </div>

      {exported && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center text-green-700 text-sm font-semibold">
          ✅ Report exported! Check your downloads folder.
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold mb-4">Platform Summary — May 2025</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Total Participants" value={8} sub="in your network" />
          <StatCard label="Active This Month" value={4} sub="logged in recently" accent="text-green-600" />
          <StatCard label="At Risk" value={2} sub="need follow-up" accent="text-orange-500" />
          <StatCard label="Placements" value={1} sub="confirmed this month" accent="text-blue-600" />
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string }[] = [
  { id: "onboard", label: "Bulk Onboard" },
  { id: "participants", label: "Participants" },
  { id: "completion", label: "Completion Tracker" },
  { id: "followup", label: "Follow-Up Prompts" },
  { id: "reports", label: "Export Reports" },
];

export default function AggregatorDashboard() {
  const [tab, setTab] = useState<TabId>("onboard");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <span className="text-xl font-black text-gray-900 tracking-tight">
          Blue<span className="text-blue-600">Dot</span>
        </span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-medium">Angul NGO Network</span>
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">A</div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Aggregator</span>
            <span className="text-xs text-gray-400">Last sync: Today, 10:42 AM</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900">Aggregator Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your participant network, track progress, and export reports.</p>
        </div>

        {/* Summary stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Participants" value={8} sub="+2 this week" />
          <StatCard label="Active" value={4} sub="logged in recently" accent="text-green-600" />
          <StatCard label="At Risk" value={2} sub="need attention" accent="text-orange-500" />
          <StatCard label="Avg Completion" value="57%" sub="profile completeness" accent="text-blue-600" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl mb-6 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 min-w-max px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                tab === t.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "onboard" && <OnboardTab />}
        {tab === "participants" && <ParticipantsTab />}
        {tab === "completion" && <CompletionTab />}
        {tab === "followup" && <FollowUpTab />}
        {tab === "reports" && <ReportsTab />}
      </div>
    </div>
  );
}
