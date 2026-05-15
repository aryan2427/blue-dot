"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Reuse the exact same LeafletMap already built for the candidate page
const CandidateLeafletMap = dynamic(
  () => import("../candidate/LeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[520px] rounded-2xl bg-blue-50 animate-pulse flex items-center justify-center text-sm text-blue-400">
        Loading map…
      </div>
    ),
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "post-job" | "my-listings" | "browse-candidates" | "candidate-map" | "applications" | "analytics";

interface JobListing {
  id: number;
  title: string;
  type: string;
  location: string;
  salary: string;
  openings: number;
  applications: number;
  views: number;
  status: "active" | "closed" | "pending";
  postedDate: string;
  skills: string[];
}

interface Candidate {
  id: number;
  name: string;
  age: number;
  education: string;
  skills: string[];
  experience: string;
  location: string;
  matchScore: number;
  availability: "immediate" | "1-month" | "2-weeks";
}

interface Application {
  id: number;
  candidateName: string;
  jobTitle: string;
  appliedDate: string;
  status: "pending" | "shortlisted" | "rejected" | "hired";
  matchScore: number;
  education: string;
  experience: string;
  skills: string[];
}

type JobStatus = "active" | "closed" | "pending";
type AppStatus = "pending" | "shortlisted" | "rejected" | "hired";
type Availability = "immediate" | "1-month" | "2-weeks";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const LISTINGS: JobListing[] = [
  { id: 1, title: "Electrician", type: "Full Time", location: "Angul Town", salary: "₹18,000 – ₹22,000/mo", openings: 3, applications: 14, views: 102, status: "active", postedDate: "12 Jul 2025", skills: ["Wiring", "Panel Installation", "Safety"] },
  { id: 2, title: "Data Entry Operator", type: "Part Time", location: "Angul Town", salary: "₹10,000 – ₹13,000/mo", openings: 2, applications: 28, views: 213, status: "active", postedDate: "8 Jul 2025", skills: ["MS Excel", "Typing", "Data Entry"] },
  { id: 3, title: "Welder (MIG/TIG)", type: "Full Time", location: "Talcher", salary: "₹20,000 – ₹26,000/mo", openings: 5, applications: 9, views: 88, status: "active", postedDate: "5 Jul 2025", skills: ["MIG Welding", "TIG Welding", "Blueprint Reading"] },
  { id: 4, title: "Accounts Assistant", type: "Full Time", location: "Angul Town", salary: "₹15,000 – ₹18,000/mo", openings: 1, applications: 19, views: 156, status: "closed", postedDate: "20 Jun 2025", skills: ["Tally", "GST", "MS Excel"] },
  { id: 5, title: "Security Guard", type: "Full Time", location: "Nalco Nagar", salary: "₹12,000 – ₹15,000/mo", openings: 4, applications: 6, views: 47, status: "pending", postedDate: "14 Jul 2025", skills: ["Surveillance", "Communication"] },
];

const CANDIDATES: Candidate[] = [
  { id: 1, name: "Ravi Kumar Sahu", age: 24, education: "ITI (Electrician Trade)", skills: ["Wiring", "Panel Installation", "Motor Repair"], experience: "2 years", location: "Angul Town", matchScore: 96, availability: "immediate" },
  { id: 2, name: "Priya Mohanty", age: 22, education: "B.Com", skills: ["Tally", "MS Excel", "Data Entry", "GST"], experience: "1 year", location: "Angul Town", matchScore: 88, availability: "2-weeks" },
  { id: 3, name: "Suresh Pradhan", age: 28, education: "ITI (Welder Trade)", skills: ["MIG Welding", "TIG Welding", "Gas Cutting"], experience: "4 years", location: "Talcher", matchScore: 92, availability: "1-month" },
  { id: 4, name: "Anita Biswal", age: 26, education: "B.Sc", skills: ["MS Office", "Data Entry", "Typing"], experience: "3 years", location: "Chhendipada", matchScore: 74, availability: "immediate" },
  { id: 5, name: "Manoj Nayak", age: 30, education: "10th Pass", skills: ["Surveillance", "Physical Security", "Communication"], experience: "5 years", location: "Nalco Nagar", matchScore: 84, availability: "immediate" },
  { id: 6, name: "Deepika Patel", age: 21, education: "B.Com (pursuing)", skills: ["Tally", "GST", "MS Excel"], experience: "Fresher", location: "Angul Town", matchScore: 69, availability: "2-weeks" },
];

const APPLICATIONS: Application[] = [
  { id: 1, candidateName: "Ravi Kumar Sahu", jobTitle: "Electrician", appliedDate: "13 Jul 2025", status: "shortlisted", matchScore: 96, education: "ITI (Electrician Trade)", experience: "2 years", skills: ["Wiring", "Panel Installation", "Motor Repair"] },
  { id: 2, candidateName: "Suman Behera", jobTitle: "Electrician", appliedDate: "13 Jul 2025", status: "pending", matchScore: 71, education: "10th Pass", experience: "1 year", skills: ["Basic Wiring", "Safety"] },
  { id: 3, candidateName: "Priya Mohanty", jobTitle: "Data Entry Operator", appliedDate: "10 Jul 2025", status: "shortlisted", matchScore: 88, education: "B.Com", experience: "1 year", skills: ["MS Excel", "Data Entry", "Typing"] },
  { id: 4, candidateName: "Anita Biswal", jobTitle: "Data Entry Operator", appliedDate: "9 Jul 2025", status: "rejected", matchScore: 55, education: "B.Sc", experience: "Fresher", skills: ["MS Office"] },
  { id: 5, candidateName: "Suresh Pradhan", jobTitle: "Welder (MIG/TIG)", appliedDate: "6 Jul 2025", status: "hired", matchScore: 92, education: "ITI (Welder Trade)", experience: "4 years", skills: ["MIG Welding", "TIG Welding", "Gas Cutting"] },
  { id: 6, candidateName: "Deepika Patel", jobTitle: "Accounts Assistant", appliedDate: "22 Jun 2025", status: "rejected", matchScore: 63, education: "B.Com (pursuing)", experience: "Fresher", skills: ["Tally", "GST"] },
];

// ─── Style Helpers ─────────────────────────────────────────────────────────────

const JOB_STATUS_STYLES: Record<JobStatus, string> = {
  active: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  closed: "bg-gray-100 text-gray-500 ring-1 ring-gray-200",
  pending: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
};

const APP_STATUS_STYLES: Record<AppStatus, string> = {
  pending: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
  shortlisted: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
  rejected: "bg-red-100 text-red-600 ring-1 ring-red-200",
  hired: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
};

const AVAILABILITY_LABELS: Record<Availability, string> = {
  immediate: "Immediate",
  "2-weeks": "2 Weeks",
  "1-month": "1 Month",
};

function matchBadge(score: number): string {
  if (score >= 90) return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
  if (score >= 75) return "bg-blue-100 text-blue-700 ring-1 ring-blue-200";
  return "bg-gray-100 text-gray-500 ring-1 ring-gray-200";
}

// Shared card — blue-tinted shadow that makes boxes pop
const CARD = "bg-white border border-blue-100/80 rounded-2xl shadow-[0_2px_16px_rgba(37,99,235,0.08)] hover:shadow-[0_4px_24px_rgba(37,99,235,0.14)] transition-shadow duration-200";

// ─── Area breakdown data (used by CandidateMapTab table only) ─────────────────

const CANDIDATE_HOTSPOTS = [
  { area: "Angul Town", candidates: 312, openToWork: 87, topSkills: ["Data Entry", "Electrician", "Accountant"] },
  { area: "Talcher", candidates: 198, openToWork: 54, topSkills: ["Welder", "Fitter", "Operator"] },
  { area: "Nalco Nagar", candidates: 145, openToWork: 41, topSkills: ["Security", "Driver", "Helper"] },
  { area: "Chhendipada", candidates: 89, openToWork: 26, topSkills: ["Agriculture", "Mason", "Plumber"] },
  { area: "Banarpal", candidates: 67, openToWork: 19, topSkills: ["Tailor", "Cook", "Carpenter"] },
  { area: "Kaniha", candidates: 112, openToWork: 33, topSkills: ["Electrician", "Technician", "Helper"] },
];

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, delta, accentBg = "bg-blue-50" }: {
  label: string; value: string | number; delta?: string; accentBg?: string;
}) {
  return (
    <div className={`${CARD} p-5 flex flex-col gap-1`}>
      <div className={`w-8 h-8 rounded-xl ${accentBg} flex items-center justify-center mb-2`}>
        <div className="w-3 h-3 rounded-full bg-blue-400" />
      </div>
      <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">{label}</span>
      <span className="text-3xl font-bold text-gray-900">{value}</span>
      {delta && <span className="text-xs text-emerald-600 font-semibold">{delta}</span>}
    </div>
  );
}

// ─── Shared input / select style ──────────────────────────────────────────────
const INPUT = "border border-blue-100 bg-blue-50/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition-colors w-full";

// ─── Tab: Post a Job ──────────────────────────────────────────────────────────

function PostJobTab() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl shadow-lg shadow-emerald-100">✓</div>
        <h2 className="text-2xl font-bold text-gray-900">Job Posted!</h2>
        <p className="text-gray-500 text-sm">Your listing is under review and will go live shortly.</p>
        <button onClick={() => { setSubmitted(false); setStep(1); }}
          className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
          Post Another Job
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        {([1, 2, 3] as const).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-white border border-gray-200 text-gray-400"}`}>{s}</div>
            <span className={`text-sm font-medium ${step >= s ? "text-gray-800" : "text-gray-400"}`}>
              {s === 1 ? "Role Details" : s === 2 ? "Requirements" : "Preview"}
            </span>
            {s < 3 && <div className="w-8 h-px bg-gray-200 mx-1" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className={`${CARD} p-6 flex flex-col gap-5`}>
          <h3 className="text-lg font-bold text-gray-900">Job Details</h3>
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-medium">Job Title *</label>
            <input type="text" placeholder="e.g. Electrician, Data Entry Operator" className={INPUT} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-medium">Employment Type *</label>
              <select className={INPUT}><option>Full Time</option><option>Part Time</option><option>Contract</option><option>Daily Wage</option></select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-medium">Openings *</label>
              <input type="number" min={1} placeholder="e.g. 3" className={INPUT} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-medium">Min Salary (₹/mo)</label>
              <input type="number" placeholder="e.g. 15000" className={INPUT} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-medium">Max Salary (₹/mo)</label>
              <input type="number" placeholder="e.g. 20000" className={INPUT} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-medium">Work Location *</label>
            <select className={INPUT}><option>Angul Town</option><option>Talcher</option><option>Nalco Nagar</option><option>Chhendipada</option><option>Banarpal</option><option>Kaniha</option></select>
          </div>
          <button onClick={() => setStep(2)} className="self-end px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">Next →</button>
        </div>
      )}

      {step === 2 && (
        <div className={`${CARD} p-6 flex flex-col gap-5`}>
          <h3 className="text-lg font-bold text-gray-900">Requirements</h3>
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-medium">Required Skills *</label>
            <input type="text" placeholder="e.g. Wiring, Safety, Panel Installation" className={INPUT} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-medium">Min Education</label>
              <select className={INPUT}><option>Any</option><option>8th Pass</option><option>10th Pass</option><option>12th Pass</option><option>ITI</option><option>Diploma</option><option>Graduate</option></select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-medium">Min Experience</label>
              <select className={INPUT}><option>Fresher OK</option><option>6 months</option><option>1 year</option><option>2+ years</option><option>5+ years</option></select>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-medium">Job Description</label>
            <textarea rows={4} placeholder="Describe the role, responsibilities…" className={`${INPUT} resize-none`} />
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">← Back</button>
            <button onClick={() => setStep(3)} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">Preview →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4">
          <div className={`${CARD} p-6`}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Preview Your Listing</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Electrician</h4>
                  <p className="text-sm text-gray-500 mt-0.5">Angul Industries Pvt. Ltd. · Angul Town</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 rounded-full text-xs font-semibold">Full Time</span>
              </div>
              <div className="flex gap-3 text-sm text-gray-600">
                <span>₹18,000 – ₹22,000/mo</span><span>·</span><span>3 openings</span><span>·</span><span>ITI required</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {["Wiring", "Panel Installation", "Safety"].map((s) => (
                  <span key={s} className="px-3 py-1 bg-blue-50 text-blue-600 ring-1 ring-blue-100 rounded-full text-xs font-medium">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-700 shadow-sm">
            Your listing will be reviewed by the Blue Dot admin before going live. This usually takes less than 24 hours.
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">← Edit</button>
            <button onClick={() => setSubmitted(true)} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">Submit for Review</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: My Listings ─────────────────────────────────────────────────────────

function MyListingsTab() {
  const [filter, setFilter] = useState<"all" | JobStatus>("all");
  const filtered = filter === "all" ? LISTINGS : LISTINGS.filter((j) => j.status === filter);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 flex-wrap">
        {(["all", "active", "closed", "pending"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all capitalize ${
              filter === f ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-white border border-blue-100 text-gray-500 hover:border-blue-300 hover:text-blue-600"
            }`}>
            {f === "all" ? `All (${LISTINGS.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${LISTINGS.filter((l) => l.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((job) => (
          <div key={job.id} className={`${CARD} p-5`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-gray-900">{job.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${JOB_STATUS_STYLES[job.status]}`}>{job.status}</span>
                </div>
                <p className="text-sm text-gray-500">{job.type} · {job.location} · Posted {job.postedDate}</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {job.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-blue-50 text-blue-500 ring-1 ring-blue-100 rounded-full text-xs">{s}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-sm font-semibold text-gray-900">{job.salary}</span>
                <span className="text-xs text-gray-400">{job.openings} opening{job.openings > 1 ? "s" : ""}</span>
              </div>
            </div>
            <div className="flex gap-5 mt-4 pt-4 border-t border-blue-50">
              {[{ label: "Views", value: job.views }, { label: "Applications", value: job.applications }, { label: "Match Rate", value: `${Math.round((job.applications / job.views) * 100)}%` }].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-xs uppercase tracking-widest text-gray-400">{label}</span>
                  <span className="text-lg font-bold text-gray-900">{value}</span>
                </div>
              ))}
              <div className="ml-auto flex items-end gap-2">
                {job.status === "active" && (
                  <button className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">Close</button>
                )}
                <button className="px-3 py-1.5 bg-blue-50 text-blue-600 ring-1 ring-blue-100 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors">View Applicants</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Browse Candidates ───────────────────────────────────────────────────

function BrowseCandidatesTab() {
  const [skillFilter, setSkillFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [contacted, setContacted] = useState<Set<number>>(new Set());

  const filtered = CANDIDATES.filter((c) => {
    const skillMatch = skillFilter === "All" || c.skills.includes(skillFilter);
    const locMatch = locationFilter === "All" || c.location === locationFilter;
    return skillMatch && locMatch;
  });

  return (
    <div className="flex flex-col gap-5">
      <div className={`${CARD} p-4 flex flex-wrap gap-4 items-end`}>
        {[
          { label: "Skill", value: skillFilter, setter: setSkillFilter, opts: ["All", "Wiring", "Tally", "MIG Welding", "Data Entry", "Surveillance"] },
          { label: "Location", value: locationFilter, setter: setLocationFilter, opts: ["All", "Angul Town", "Talcher", "Nalco Nagar", "Chhendipada"] },
        ].map(({ label, value, setter, opts }) => (
          <div key={label} className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-medium">{label}</label>
            <select value={value} onChange={(e) => setter(e.target.value)} className="border border-blue-100 bg-blue-50/40 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition-colors">
              {opts.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
        <span className="text-sm text-gray-400 ml-auto self-center">{filtered.length} candidate{filtered.length !== 1 ? "s" : ""} found</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((c) => (
          <div key={c.id} className={`${CARD} p-5 flex flex-col gap-3`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-gray-900">{c.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{c.education} · {c.experience}</p>
                <p className="text-xs text-gray-400 mt-0.5">📍 {c.location}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${matchBadge(c.matchScore)}`}>{c.matchScore}% match</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {c.skills.map((s) => <span key={s} className="px-2 py-0.5 bg-blue-50 text-blue-500 ring-1 ring-blue-100 rounded-full text-xs">{s}</span>)}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-blue-50">
              <span className="text-xs text-gray-400">Available: <span className="font-semibold text-gray-600">{AVAILABILITY_LABELS[c.availability]}</span></span>
              <button onClick={() => setContacted((prev) => new Set(prev).add(c.id))} disabled={contacted.has(c.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${contacted.has(c.id) ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 cursor-default" : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200"}`}>
                {contacted.has(c.id) ? "✓ Request Sent" : "Contact"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Candidate Map ───────────────────────────────────────────────────────

function CandidateMapTab() {
  return (
    <div className="flex flex-col gap-5">
      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Candidates", value: "923", sub: "registered in Angul district" },
          { label: "Open to Work", value: "260", sub: "actively looking right now" },
          { label: "Skill Categories", value: "18+", sub: "trades & sectors covered" },
        ].map(({ label, value, sub }) => (
          <div key={label} className={`${CARD} p-4 flex flex-col gap-0.5`}>
            <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">{label}</span>
            <span className="text-2xl font-bold text-blue-600">{value}</span>
            <span className="text-xs text-gray-400">{sub}</span>
          </div>
        ))}
      </div>

      {/* Leaflet map */}
      <div className={`${CARD} p-5`}>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">Candidate Heatmap — Angul District</h2>
          <p className="text-sm text-gray-500 mt-1">Click a pin to see open-to-work candidates in that area.</p>
        </div>
        <CandidateLeafletMap />
      </div>

      {/* Area breakdown */}
      <div className={`${CARD} p-5`}>
        <h3 className="text-sm font-bold text-gray-900 mb-4">Open-to-Work by Area</h3>
        <div className="flex flex-col gap-2">
          {CANDIDATE_HOTSPOTS.map((h) => (
            <div key={h.area} className="flex items-center gap-4 py-2 border-b border-blue-50 last:border-0">
              <span className="text-sm font-semibold text-gray-800 w-28 shrink-0">{h.area}</span>
              <div className="flex-1 h-1.5 bg-blue-50 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(h.openToWork / 90) * 100}%` }} />
              </div>
              <span className="text-sm font-bold text-blue-600 w-8 text-right shrink-0">{h.openToWork}</span>
              <span className="text-xs text-gray-400 w-32 shrink-0">of {h.candidates} registered</span>
              <div className="hidden md:flex flex-wrap gap-1">
                {h.topSkills.map((sk) => (
                  <span key={sk} className="px-2 py-0.5 bg-blue-50 text-blue-400 ring-1 ring-blue-100 rounded-full text-xs">{sk}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Applications Received ───────────────────────────────────────────────

function ApplicationsTab() {
  const [statusFilter, setStatusFilter] = useState<"all" | AppStatus>("all");
  const [appStatuses, setAppStatuses] = useState<Record<number, AppStatus>>(
    Object.fromEntries(APPLICATIONS.map((a) => [a.id, a.status]))
  );
  const filtered = statusFilter === "all" ? APPLICATIONS : APPLICATIONS.filter((a) => appStatuses[a.id] === statusFilter);
  const updateStatus = (id: number, status: AppStatus) => setAppStatuses((prev) => ({ ...prev, [id]: status }));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 flex-wrap">
        {(["all", "pending", "shortlisted", "hired", "rejected"] as const).map((f) => (
          <button key={f} onClick={() => setStatusFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all capitalize ${
              statusFilter === f ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-white border border-blue-100 text-gray-500 hover:border-blue-300 hover:text-blue-600"
            }`}>
            {f === "all" ? `All (${APPLICATIONS.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${APPLICATIONS.filter((a) => appStatuses[a.id] === f).length})`}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((app) => {
          const cur = appStatuses[app.id];
          return (
            <div key={app.id} className={`${CARD} p-5`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900">{app.candidateName}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${APP_STATUS_STYLES[cur]}`}>{cur}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${matchBadge(app.matchScore)}`}>{app.matchScore}% match</span>
                  </div>
                  <p className="text-sm text-gray-500">Applied for: <span className="font-medium text-gray-700">{app.jobTitle}</span> · {app.appliedDate}</p>
                  <p className="text-xs text-gray-400">{app.education} · {app.experience}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {app.skills.map((s) => <span key={s} className="px-2 py-0.5 bg-blue-50 text-blue-500 ring-1 ring-blue-100 rounded-full text-xs">{s}</span>)}
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {cur === "pending" && (
                    <>
                      <button onClick={() => updateStatus(app.id, "shortlisted")} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">Shortlist</button>
                      <button onClick={() => updateStatus(app.id, "rejected")} className="px-3 py-1.5 border border-gray-200 text-gray-500 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">Reject</button>
                    </>
                  )}
                  {cur === "shortlisted" && (
                    <button onClick={() => updateStatus(app.id, "hired")} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200">Mark Hired</button>
                  )}
                  {(cur === "hired" || cur === "rejected") && <span className="text-xs text-gray-400 italic">No actions</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tab: Analytics ───────────────────────────────────────────────────────────

function AnalyticsTab() {
  const weeklyData = [
    { day: "Mon", views: 32, apps: 4 }, { day: "Tue", views: 48, apps: 7 },
    { day: "Wed", views: 29, apps: 3 }, { day: "Thu", views: 61, apps: 9 },
    { day: "Fri", views: 54, apps: 8 }, { day: "Sat", views: 38, apps: 5 },
    { day: "Sun", views: 21, apps: 2 },
  ];
  const maxViews = Math.max(...weeklyData.map((d) => d.views));
  const topJobs = LISTINGS.slice().sort((a, b) => b.applications - a.applications).slice(0, 3);
  const maxApps = Math.max(...LISTINGS.map((l) => l.applications));

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Views" value="606" delta="+42 this week" accentBg="bg-blue-50" />
        <StatCard label="Total Applications" value="76" delta="+12 this week" accentBg="bg-indigo-50" />
        <StatCard label="Shortlisted" value="14" delta="+3 this week" accentBg="bg-sky-50" />
        <StatCard label="Hired" value="3" delta="+1 this week" accentBg="bg-emerald-50" />
      </div>

      <div className={`${CARD} p-5`}>
        <h3 className="text-sm font-bold text-gray-900 mb-1">This Week's Activity</h3>
        <p className="text-xs text-gray-400 mb-5">Views vs Applications per day</p>
        <div className="flex items-end gap-3 h-36">
          {weeklyData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-1 items-end">
                <div className="flex-1 bg-blue-100 rounded-t-md" style={{ height: `${(d.views / maxViews) * 120}px` }} />
                <div className="flex-1 bg-blue-600 rounded-t-md" style={{ height: `${(d.apps / maxViews) * 120}px` }} />
              </div>
              <span className="text-xs text-gray-400">{d.day}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-2 text-xs text-gray-500"><div className="w-3 h-3 bg-blue-100 rounded-sm" /> Views</div>
          <div className="flex items-center gap-2 text-xs text-gray-500"><div className="w-3 h-3 bg-blue-600 rounded-sm" /> Applications</div>
        </div>
      </div>

      <div className={`${CARD} p-5`}>
        <h3 className="text-sm font-bold text-gray-900 mb-4">Top Performing Listings</h3>
        <div className="flex flex-col gap-3">
          {topJobs.map((job, i) => (
            <div key={job.id} className="flex items-center gap-4">
              <span className="text-2xl font-black text-blue-100 w-6 shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-800 truncate">{job.title}</span>
                  <span className="text-xs text-gray-400 shrink-0">{job.location}</span>
                </div>
                <div className="mt-1.5 h-1.5 bg-blue-50 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(job.applications / maxApps) * 100}%` }} />
                </div>
              </div>
              <span className="text-sm font-bold text-gray-900 shrink-0">{job.applications} apps</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${CARD} p-5`}>
        <h3 className="text-sm font-bold text-gray-900 mb-1">View-to-Application Rate</h3>
        <p className="text-xs text-gray-400 mb-4">Per active listing</p>
        <div className="flex flex-col gap-3">
          {LISTINGS.filter((j) => j.status === "active").map((job) => {
            const rate = Math.round((job.applications / job.views) * 100);
            return (
              <div key={job.id} className="flex items-center gap-3">
                <span className="text-sm text-gray-700 w-44 truncate shrink-0">{job.title}</span>
                <div className="flex-1 h-1.5 bg-blue-50 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${rate}%` }} />
                </div>
                <span className="text-sm font-bold text-gray-900 w-10 text-right shrink-0">{rate}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("my-listings");

  const TABS: { id: Tab; label: string }[] = [
    { id: "post-job", label: "Post a Job" },
    { id: "my-listings", label: "My Listings" },
    { id: "browse-candidates", label: "Browse Candidates" },
    { id: "candidate-map", label: "Candidate Map" },
    { id: "applications", label: "Applications" },
    { id: "analytics", label: "Analytics" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 px-6 py-4 sticky top-0 z-50 shadow-sm shadow-blue-100/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
    <div className="w-2.5 h-2.5 rounded-full bg-white" />
  </div>
  <span className="font-bold text-[17px] tracking-tight text-gray-900">
    Blue Dot
  </span>
</div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">Angul Industries Pvt. Ltd.</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 ring-2 ring-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm">A</div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-gray-900">Employer Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Angul Industries Pvt. Ltd. · Angul Town</p>
        </div>

      <div className="grid grid-cols-4 gap-4 mb-40">
          <StatCard label="Active Listings" value="3" delta="+1 this week" accentBg="bg-blue-50" />
          <StatCard label="Total Applications" value="76" delta="+12 this week" accentBg="bg-indigo-50" />
          <StatCard label="Shortlisted" value="14" accentBg="bg-sky-50" />
          <StatCard label="Positions Filled" value="3" delta="+1 this month" accentBg="bg-emerald-50" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/70 border border-blue-100 rounded-2xl p-1 mb-6 overflow-x-auto shadow-sm">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-max px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "post-job" && <PostJobTab />}
        {activeTab === "my-listings" && <MyListingsTab />}
        {activeTab === "browse-candidates" && <BrowseCandidatesTab />}
        {activeTab === "candidate-map" && <CandidateMapTab />}
        {activeTab === "applications" && <ApplicationsTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </main>
    </div>
  );
}
