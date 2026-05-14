"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Role } from "@/types";

const roles: { value: Role; label: string; icon: string; desc: string }[] = [
  {
    value: "candidate",
    label: "Candidate",
    icon: "👤",
    desc: "Looking for jobs",
  },
  {
    value: "employer",
    label: "Employer",
    icon: "🏢",
    desc: "Hiring talent",
  },
  {
    value: "aggregator",
    label: "Aggregator",
    icon: "🤝",
    desc: "NGO / Training institute",
  },
  {
    value: "admin",
    label: "Admin",
    icon: "⚙️",
    desc: "Platform management",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>("candidate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Redirect based on role
      router.push(`/dashboard/${selectedRole}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#2563eb" strokeWidth="2" />
              <circle cx="10" cy="10" r="4" fill="#2563eb" />
              <circle cx="10" cy="10" r="2" fill="#fff" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">Blue Dot</span>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Sign in to your account to continue
          </p>

          {/* Role Selector */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                  selectedRole === role.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <span className="text-lg">{role.icon}</span>
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      selectedRole === role.value
                        ? "text-blue-600"
                        : "text-gray-800"
                    }`}
                  >
                    {role.label}
                  </p>
                  <p className="text-xs text-gray-400">{role.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-blue-500 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
              {loading ? "Signing in..." : `Sign in as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Signup link */}
          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push(`/signup/${selectedRole}`)}
              className="text-blue-500 font-semibold hover:underline"
            >
              Sign up as {selectedRole}
            </button>
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