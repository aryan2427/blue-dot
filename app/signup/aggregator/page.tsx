"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const orgTypeOptions = [
  { value: "ngo", label: "NGO", icon: "🤲", desc: "Non-profit organization" },
  { value: "training_institute", label: "Training Institute", icon: "🎓", desc: "Skill & vocational training" },
  { value: "placement_agency", label: "Placement Agency", icon: "💼", desc: "Job placement services" },
  { value: "industry_association", label: "Industry Association", icon: "🏭", desc: "Sector representative body" },
];

const coverageAreaOptions = [
  "Angul Town",
  "Talcher",
  "Athamallik",
  "Banarpal",
  "Chhendipada",
  "Pallahara",
  "Kaniha",
  "Entire Angul District",
];

export default function AggregatorSignup() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1 - Account Info
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [contactPerson, setContactPerson] = useState("");

  // Step 2 - Organization Details
  const [orgType, setOrgType] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [participantCount, setParticipantCount] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [description, setDescription] = useState("");

  const toggleArea = (area: string) => {
    if (area === "Entire Angul District") {
      setSelectedAreas(["Entire Angul District"]);
      return;
    }
    setSelectedAreas((prev) => {
      const filtered = prev.filter((a) => a !== "Entire Angul District");
      return filtered.includes(area)
        ? filtered.filter((a) => a !== area)
        : [...filtered, area];
    });
  };

  const validateStep1 = () => {
    if (!orgName || !email || !phone || !password || !contactPerson) {
      setError("Please fill in all fields.");
      return false;
    }
    if (phone.length !== 10) {
      setError("Enter a valid 10-digit phone number.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    setError("");
    return true;
  };

  const validateStep2 = () => {
    if (!orgType || selectedAreas.length === 0 || !participantCount) {
      setError("Please fill in all required fields.");
      return false;
    }
    setError("");
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard/aggregator");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#2563eb" strokeWidth="2" />
              <circle cx="10" cy="10" r="4" fill="#2563eb" />
              <circle cx="10" cy="10" r="2" fill="#fff" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">Blue Dot</span>
        </Link>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

          {/* Header */}
          <div className="mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
              <span className="text-xl">🤝</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Register as Aggregator
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Onboard and manage participants · Step {step} of 2
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  s <= step ? "bg-green-500" : "bg-gray-100"
                }`}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Step 1 - Account Info */}
            {step === 1 && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Angul Skill Development Centre"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Full name of representative"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@organization.org"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/, ""))
                      }
                      placeholder="9876543210"
                      maxLength={10}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Minimum 6 characters
                  </p>
                </div>
              </>
            )}

            {/* Step 2 - Organization Details */}
            {step === 2 && (
              <>
                {/* Org Type */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Organization Type <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {orgTypeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setOrgType(opt.value)}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                          orgType === opt.value
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-lg">{opt.icon}</span>
                        <div>
                          <p className={`text-xs font-semibold ${orgType === opt.value ? "text-green-600" : "text-gray-800"}`}>
                            {opt.label}
                          </p>
                          <p className="text-xs text-gray-400">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coverage Areas */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Coverage Areas <span className="text-red-400">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {coverageAreaOptions.map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => toggleArea(area)}
                        className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                          selectedAreas.includes(area)
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                  {selectedAreas.length > 0 && (
                    <p className="text-xs text-green-500 mt-2">
                      {selectedAreas.length} area{selectedAreas.length > 1 ? "s" : ""} selected
                    </p>
                  )}
                </div>

                {/* Participant Count */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Expected Participants <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={participantCount}
                    onChange={(e) => setParticipantCount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition bg-white"
                  >
                    <option value="">How many people will you onboard?</option>
                    <option value="1-50">1 - 50</option>
                    <option value="51-200">51 - 200</option>
                    <option value="201-500">201 - 500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>

                {/* Registration Number */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Registration Number{" "}
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    placeholder="NGO / Trust / Society reg. number"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Brief Description{" "}
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What does your organization do?"
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition resize-none"
                  />
                </div>
              </>
            )}

            {/* Error */}
            {error && (
              <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            {/* Buttons */}
            <div className="flex gap-3 mt-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev - 1)}
                  className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
                >
                  ← Back
                </button>
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-black text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-black text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {loading ? "Creating account..." : "Create Account →"}
                </button>
              )}
            </div>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Blue Dot · Angul District · Digital Public Infrastructure
        </p>
      </div>
    </div>
  );
}