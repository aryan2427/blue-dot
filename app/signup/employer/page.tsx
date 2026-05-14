"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const industryOptions = [
  "Mining & Coal",
  "Manufacturing",
  "Construction",
  "Healthcare",
  "Education",
  "Retail & Trade",
  "Food & Catering",
  "Transport & Logistics",
  "Agriculture",
  "IT & Technology",
  "Finance & Accounting",
  "Other",
];

const employeeCountOptions = [
  "1 - 5",
  "6 - 20",
  "21 - 50",
  "51 - 200",
  "200+",
];

export default function EmployerSignup() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1 - Account Info
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Step 2 - Company Details
  const [industry, setIndustry] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [website, setWebsite] = useState("");

  const validateStep1 = () => {
    if (!companyName || !email || !phone || !password) {
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
    if (!industry || !address || !location || !employeeCount) {
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
      router.push("/dashboard/employer");
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
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
              <span className="text-xl">🏢</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Register as Employer
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Post jobs and discover local talent · Step {step} of 2
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  s <= step ? "bg-amber-500" : "bg-gray-100"
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
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Talcher Coal Industries"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
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
                    placeholder="hr@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
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
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Minimum 6 characters
                  </p>
                </div>
              </>
            )}

            {/* Step 2 - Company Details */}
            {step === 2 && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Industry Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition bg-white"
                  >
                    <option value="">Select industry</option>
                    {industryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Company Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street address"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Location in Angul <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Talcher, Banarpal, Angul Town"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Number of Employees <span className="text-red-400">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {employeeCountOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setEmployeeCount(opt)}
                        className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                          employeeCount === opt
                            ? "bg-amber-500 text-white border-amber-500"
                            : "bg-white text-gray-600 border-gray-200 hover:border-amber-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    GST Number{" "}
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    placeholder="22AAAAA0000A1Z5"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Website{" "}
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourcompany.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
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
            <Link
              href="/login"
              className="text-blue-500 font-semibold hover:underline"
            >
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