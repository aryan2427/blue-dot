"use client";

import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = "jobs" | "applications" | "map" | "schemes";
type AppStatus = "shortlisted" | "pending" | "rejected";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  distance: string;
  salary: string;
  tags: string[];
  match: number;
  posted: string;
}

interface Application {
  id: number;
  title: string;
  company: string;
  appliedOn: string;
  status: AppStatus;
}

interface Scheme {
  id: number;
  title: string;
  tag: string;
  desc: string;
  deadline: string;
}



// ─── Mock Data ────────────────────────────────────────────────────────────────

const JOBS: Job[] = [
  {
    id: 1,
    title: "Electrician – Industrial",
    company: "Nalco Plant Unit 3",
    location: "Angul",
    distance: "2.1 km",
    salary: "₹18,000–22,000/mo",
    tags: ["Full Time", "ITI Required"],
    match: 96,
    posted: "Today",
  },
  {
    id: 2,
    title: "Wireman",
    company: "Jindal Power Ltd.",
    location: "Talcher",
    distance: "4.8 km",
    salary: "₹15,000–18,000/mo",
    tags: ["Contract", "Diploma OK"],
    match: 88,
    posted: "2 days ago",
  },
  {
    id: 3,
    title: "Electrical Supervisor",
    company: "OPGC Thermal Plant",
    location: "Banharpali",
    distance: "12 km",
    salary: "₹25,000–30,000/mo",
    tags: ["Full Time", "3 yrs exp"],
    match: 74,
    posted: "5 days ago",
  },
  {
    id: 4,
    title: "Maintenance Technician",
    company: "Hindalco Industries",
    location: "Hirakud",
    distance: "18 km",
    salary: "₹20,000–24,000/mo",
    tags: ["Full Time", "Night Shift"],
    match: 70,
    posted: "1 week ago",
  },
];

const APPLICATIONS: Application[] = [
  { id: 1, title: "Lineman", company: "CESU Odisha", appliedOn: "May 10", status: "shortlisted" },
  { id: 2, title: "Electrician", company: "Rungta Mines", appliedOn: "May 7", status: "pending" },
  { id: 3, title: "Electrical Fitter", company: "IOCL Angul", appliedOn: "Apr 28", status: "rejected" },
  { id: 4, title: "Wireman Helper", company: "L&T Construction", appliedOn: "Apr 22", status: "shortlisted" },
];

const SCHEMES: Scheme[] = [
  {
    id: 1,
    title: "Mukhyamantri Karma Tatpara Abhiyan",
    tag: "Employment",
    desc: "Wage employment for skilled workers in Odisha districts.",
    deadline: "Jun 30, 2026",
  },
  {
    id: 2,
    title: "Skill Development Scholarship",
    tag: "Skilling",
    desc: "₹10,000 stipend for ITI-certified candidates in priority trades.",
    deadline: "Ongoing",
  },
  {
    id: 3,
    title: "PM Vishwakarma Yojana",
    tag: "Central",
    desc: "Toolkits and credit support for traditional trade workers.",
    deadline: "Aug 15, 2026",
  },
];



const STATS = [
  { label: "Applications", value: "8", trend: "+3 this week" },
  { label: "Profile Views", value: "34", trend: "+12 this week" },
  { label: "Shortlisted", value: "2", trend: "Active" },
  { label: "Match Score", value: "84%", trend: "+6% vs last week" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function matchBadgeClass(match: number): string {
  if (match >= 90) return "bg-green-100 text-green-700";
  if (match >= 75) return "bg-blue-100 text-blue-700";
  return "bg-gray-100 text-gray-500";
}

const STATUS_STYLES: Record<AppStatus, string> = {
  shortlisted: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-600",
};

const STATUS_LABELS: Record<AppStatus, string> = {
  shortlisted: "Shortlisted",
  pending: "Pending",
  rejected: "Rejected",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function JobCard({ job, applied, onApply }: { job: Job; applied: boolean; onApply: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-bold text-gray-900 text-[15px]">{job.title}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${matchBadgeClass(job.match)}`}>
            {job.match}% match
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-3">
          {job.company} · {job.location} · {job.distance}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {job.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
          <span className="text-[10px] font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
            {job.salary}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className="text-[10px] text-gray-400">Posted {job.posted}</span>
        <button
          onClick={onApply}
          disabled={applied}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            applied
              ? "bg-green-50 text-green-700 border border-green-200 cursor-default"
              : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
          }`}
        >
          {applied ? "✓ Applied" : "Apply Now"}
        </button>
      </div>
    </div>
  );
}

function ApplicationCard({ app }: { app: Application }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-center justify-between flex-wrap gap-3">
      <div>
        <p className="font-bold text-gray-900 text-sm">{app.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          {app.company} · Applied {app.appliedOn}
        </p>
      </div>
      <span className={`text-xs font-bold px-3 py-1 rounded-full ${STATUS_STYLES[app.status]}`}>
        {STATUS_LABELS[app.status]}
      </span>
    </div>
  );
}

function SchemeCard({ scheme }: { scheme: Scheme }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="font-bold text-gray-900 text-sm">{scheme.title}</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 uppercase tracking-wide">
            {scheme.tag}
          </span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">{scheme.desc}</p>
        <p className="text-xs text-gray-400 mt-2">
          Deadline: <span className="text-gray-700 font-medium">{scheme.deadline}</span>
        </p>
      </div>
      <button className="shrink-0 text-sm font-semibold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
        Check Eligibility →
      </button>
    </div>
  );
}

// ─── Map View (Leaflet) ───────────────────────────────────────────────────────
// LeafletMap is loaded dynamically to avoid SSR window errors.
// Make sure "leaflet/dist/leaflet.css" is imported in your app/globals.css

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

function MapView() {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">District Heatmap</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Bubble size shows volume. Click a hotspot for details.
          </p>
        </div>
        <span className="text-[10px] font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
          ● Live
        </span>
      </div>
      <LeafletMap />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "jobs", label: "Browse Jobs", icon: "💼" },
  { key: "applications", label: "My Applications", icon: "📋" },
  { key: "map", label: "Map View", icon: "📍" },
  { key: "schemes", label: "Schemes", icon: "🏛" },
];

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("jobs");
  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set());

  const handleApply = (id: number) => {
    setAppliedJobs((prev) => new Set([...prev, id]));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
          <span className="font-bold text-[17px] tracking-tight text-gray-900">Blue Dot</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Candidate</span>
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
            RK
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base shrink-0">
              RK
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg tracking-tight">Ravi Kumar Sahoo</p>
              <p className="text-sm text-gray-400 mt-0.5">ITI Graduate · Electrician · Talcher Block, Angul</p>
            </div>
          </div>

          <div className="flex-1 max-w-sm">
            <div className="flex justify-between mb-1.5">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                Profile Completion
              </span>
              <span className="text-[11px] font-bold text-blue-600">72%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-[72%] bg-blue-600 rounded-full" />
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5">
              Missing: Resume, Work Experience —{" "}
              <span className="text-blue-600 font-medium cursor-pointer">Complete now →</span>
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
                {s.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 tracking-tight">{s.value}</p>
              <p className="text-xs text-green-600 font-medium mt-1">{s.trend}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 w-fit mb-5 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === t.key
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        {activeTab === "jobs" && (
          <div className="flex flex-col gap-3">
            {JOBS.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                applied={appliedJobs.has(job.id)}
                onApply={() => handleApply(job.id)}
              />
            ))}
          </div>
        )}

        {activeTab === "applications" && (
          <div className="flex flex-col gap-2.5">
            {APPLICATIONS.map((app) => (
              <ApplicationCard key={app.id} app={app} />
            ))}
          </div>
        )}

        {activeTab === "map" && <MapView />}

        {activeTab === "schemes" && (
          <div className="flex flex-col gap-3">
            {SCHEMES.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
