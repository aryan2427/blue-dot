"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "details" | "verify" | "done";

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("details");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordStrength = (() => {
    if (password.length === 0) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#3b82f6", "#16a34a"][passwordStrength];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "12px",
    border: "1.5px solid #dde1ea",
    fontSize: "14px",
    outline: "none",
    background: "white",
    boxSizing: "border-box",
    color: "#0f172a",
    boxShadow: "0 1px 4px rgba(60,80,120,0.08)",
    transition: "border-color 0.15s, box-shadow 0.15s",
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#3b82f6";
    e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)";
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#dde1ea";
    e.target.style.boxShadow = "0 1px 4px rgba(60,80,120,0.08)";
  };

  const cardStyle: React.CSSProperties = {
    background: "white",
    border: "1.5px solid #dde1ea",
    borderRadius: "20px",
    padding: "36px 32px",
    boxShadow: "0 4px 24px rgba(60,80,140,0.10), 0 1px 4px rgba(60,80,140,0.06)",
    width: "100%",
    maxWidth: "440px",
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName.trim()) { setError("Full name is required."); return; }
    if (!email.trim()) { setError("Email address is required."); return; }
    if (!phone.trim()) { setError("Phone number is required."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    if (!agreed) { setError("Please accept the terms to continue."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("verify"); }, 1000);
  };

  const handleSendOtp = () => {
    setOtpLoading(true);
    setTimeout(() => { setOtpLoading(false); setOtpSent(true); }, 1200);
  };

  const handleVerify = () => {
    if (!otp || otp.length < 6) { setError("Please enter the 6-digit OTP."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("done"); }, 1200);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'DM Sans', sans-serif", background: "linear-gradient(135deg, #dbeafe 0%, #ede9fe 50%, #dbeafe 100%)" }}>

      {/* Left panel */}
      <div className="left-panel" style={{ width: "420px", flexShrink: 0, padding: "40px", background: "#0f172a", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" />
              <circle cx="10" cy="10" r="3.5" fill="white" />
              <circle cx="10" cy="10" r="1.5" fill="#3b82f6" />
            </svg>
          </div>
          <span style={{ color: "white", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.2px" }}>Blue Dot</span>
        </div>

        {/* Features list */}
        <div>
          <p style={{ fontSize: "28px", fontWeight: 700, color: "white", lineHeight: 1.35, marginBottom: "32px" }}>
            Your opportunity<br />starts here.
          </p>
          {[
            { icon: "👤", title: "Build your profile", desc: "Create a verified digital identity for jobs and schemes." },
            { icon: "💼", title: "Discover local jobs", desc: "Browse openings from employers across Angul District." },
            { icon: "📋", title: "Apply with one tap", desc: "Submit applications and track them in real time." },
            { icon: "🎓", title: "Access training", desc: "Connect with NGOs and institutes for skill programs." },
          ].map((f) => (
            <div key={f.title} style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(59,130,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "16px" }}>
                {f.icon}
              </div>
              <div>
                <p style={{ color: "white", fontWeight: 600, fontSize: "14px", margin: "0 0 2px" }}>{f.title}</p>
                <p style={{ color: "#94a3b8", fontSize: "12px", margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ color: "#475569", fontSize: "12px" }}>Blue Dot · Angul District · Digital Public Infrastructure</div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>

        {/* ── STEP 1: Account details ── */}
        {step === "details" && (
          <div style={cardStyle}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" />
                  <circle cx="10" cy="10" r="3.5" fill="white" />
                  <circle cx="10" cy="10" r="1.5" fill="#3b82f6" />
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: "16px", color: "#0f172a" }}>Blue Dot</span>
            </div>

            {/* Progress */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              {[1, 2].map((n) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    width: "26px", height: "26px", borderRadius: "50%",
                    background: n === 1 ? "#0f172a" : "#eef1f7",
                    color: n === 1 ? "white" : "#a0aab8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 600,
                  }}>{n}</div>
                  <span style={{ fontSize: "12px", fontWeight: n === 1 ? 600 : 400, color: n === 1 ? "#0f172a" : "#a0aab8" }}>
                    {n === 1 ? "Your details" : "Verify"}
                  </span>
                  {n < 2 && <div style={{ width: "32px", height: "1px", background: "#dde1ea", marginLeft: "4px" }} />}
                </div>
              ))}
            </div>

            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", marginBottom: "4px", letterSpacing: "-0.3px" }}>Create your account</h1>
            <p style={{ fontSize: "13px", color: "#8492a6", marginBottom: "24px" }}>Fill in your details to get started on Blue Dot.</p>

            <form onSubmit={handleSubmitDetails} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* Full name */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Full name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Rahul Kumar" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>

              {/* Email */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>

              {/* Phone */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Phone number</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <div style={{ padding: "11px 14px", borderRadius: "12px", border: "1.5px solid #dde1ea", background: "#f5f7fb", fontSize: "14px", color: "#6b7280", whiteSpace: "nowrap", boxShadow: "0 1px 4px rgba(60,80,120,0.08)" }}>+91</div>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" style={{ ...inputStyle, flex: 1, width: "auto" }} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 8 characters" style={{ ...inputStyle, paddingRight: "44px" }} onFocus={focusStyle} onBlur={blurStyle} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility"
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#8492a6", padding: 0, display: "flex", alignItems: "center" }}>
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
                {/* Strength bar */}
                {password.length > 0 && (
                  <div style={{ marginTop: "8px" }}>
                    <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                      {[1, 2, 3, 4].map((n) => (
                        <div key={n} style={{ flex: 1, height: "3px", borderRadius: "99px", background: n <= passwordStrength ? strengthColor : "#e9ecf2", transition: "background 0.2s" }} />
                      ))}
                    </div>
                    <p style={{ fontSize: "11px", color: strengthColor, fontWeight: 500 }}>{strengthLabel}</p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Confirm password</label>
                <div style={{ position: "relative" }}>
                  <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password"
                    style={{ ...inputStyle, paddingRight: "44px", borderColor: confirmPassword && confirmPassword !== password ? "#fca5a5" : "#dde1ea" }}
                    onFocus={focusStyle} onBlur={blurStyle} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} aria-label="Toggle"
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#8492a6", padding: 0, display: "flex", alignItems: "center" }}>
                    <EyeIcon open={showConfirm} />
                  </button>
                </div>
                {confirmPassword && confirmPassword === password && (
                  <p style={{ fontSize: "11px", color: "#16a34a", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px", fontWeight: 500 }}>
                    <CheckIcon /> Passwords match
                  </p>
                )}
              </div>

              {/* Terms */}
              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", marginTop: "2px" }}>
                <div
                  onClick={() => setAgreed(!agreed)}
                  style={{
                    width: "18px", height: "18px", borderRadius: "5px", flexShrink: 0, marginTop: "1px",
                    border: `1.5px solid ${agreed ? "#3b82f6" : "#dde1ea"}`,
                    background: agreed ? "#3b82f6" : "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {agreed && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                </div>
                <span style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.6 }}>
                  I agree to the{" "}
                  <span style={{ color: "#3b82f6", fontWeight: 500, cursor: "pointer" }}>Terms of Service</span>
                  {" "}and{" "}
                  <span style={{ color: "#3b82f6", fontWeight: 500, cursor: "pointer" }}>Privacy Policy</span>
                </span>
              </label>

              {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#dc2626" }}>{error}</div>}

              <button type="submit" disabled={loading}
                style={{ width: "100%", padding: "12px", borderRadius: "12px", background: loading ? "#374151" : "#0f172a", color: "white", fontWeight: 600, fontSize: "14px", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: "4px", boxShadow: "0 2px 8px rgba(15,23,42,0.18)", transition: "background 0.2s" }}>
                {loading ? "Creating account..." : "Continue"}
              </button>
            </form>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
              <div style={{ flex: 1, height: "1px", background: "#e9ecf2" }} />
              <span style={{ fontSize: "12px", color: "#a0aab8" }}>or</span>
              <div style={{ flex: 1, height: "1px", background: "#e9ecf2" }} />
            </div>

            <p style={{ textAlign: "center", fontSize: "13px", color: "#6b7280" }}>
              Already have an account?{" "}
              <button onClick={() => router.push("/login")} style={{ color: "#3b82f6", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                Sign in
              </button>
            </p>
          </div>
        )}

        {/* ── STEP 2: Verify OTP ── */}
        {step === "verify" && (
          <div style={cardStyle}>
            {/* Progress */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
              {[1, 2].map((n) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    width: "26px", height: "26px", borderRadius: "50%",
                    background: n === 1 ? "#16a34a" : "#0f172a",
                    color: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 600,
                  }}>
                    {n === 1 ? <CheckIcon /> : "2"}
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: n === 2 ? 600 : 400, color: n === 2 ? "#0f172a" : "#16a34a" }}>
                    {n === 1 ? "Your details" : "Verify"}
                  </span>
                  {n < 2 && <div style={{ width: "32px", height: "1px", background: "#dde1ea", marginLeft: "4px" }} />}
                </div>
              ))}
            </div>

            <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#f0fdf4", border: "1.5px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.64 3.45 2 2 0 0 1 3.62 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
              </svg>
            </div>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>Verify your number</h2>
            <p style={{ fontSize: "13px", color: "#8492a6", marginBottom: "4px", lineHeight: 1.6 }}>We'll send a 6-digit OTP to</p>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "24px" }}>+91 {phone}</p>

            {!otpSent ? (
              <button onClick={handleSendOtp} disabled={otpLoading}
                style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "#0f172a", color: "white", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(15,23,42,0.18)", opacity: otpLoading ? 0.7 : 1, marginBottom: "20px" }}>
                {otpLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <>
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Enter OTP</label>
                  <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="------" maxLength={6}
                    style={{ ...inputStyle, letterSpacing: "0.25em", textAlign: "center", fontSize: "22px", fontWeight: 700 }}
                    onFocus={focusStyle} onBlur={blurStyle} />
                </div>

                <p style={{ fontSize: "12px", color: "#8492a6", marginBottom: "16px" }}>
                  Didn&apos;t receive it?{" "}
                  <button onClick={handleSendOtp} style={{ color: "#3b82f6", background: "none", border: "none", cursor: "pointer", fontWeight: 500, fontSize: "12px", padding: 0 }}>Resend OTP</button>
                </p>
              </>
            )}

            {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#dc2626", marginBottom: "14px" }}>{error}</div>}

            {otpSent && (
              <button onClick={handleVerify} disabled={loading}
                style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "#0f172a", color: "white", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(15,23,42,0.18)", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Verifying..." : "Verify & create account"}
              </button>
            )}

            <button onClick={() => { setStep("details"); setError(""); }} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", color: "#8492a6", fontSize: "13px", fontWeight: 500, padding: 0, margin: "16px auto 0", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              Back to details
            </button>
          </div>
        )}

        {/* ── STEP 3: Done ── */}
        {step === "done" && (
          <div style={{ ...cardStyle, textAlign: "center", maxWidth: "380px" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#f0fdf4", border: "2px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>Welcome to Blue Dot!</h2>
            <p style={{ fontSize: "13px", color: "#8492a6", lineHeight: 1.7, marginBottom: "8px" }}>
              Your account has been created successfully.
            </p>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "28px" }}>{fullName || "User"}</p>

            {/* Feature highlights */}
            <div style={{ background: "#f8faff", border: "1.5px solid #dde1ea", borderRadius: "14px", padding: "16px", marginBottom: "24px", textAlign: "left" }}>
              {[
                "Complete your profile to stand out",
                "Browse jobs in Angul District",
                "Get matched with training programs",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#3b82f6" }}>
                    <CheckIcon />
                  </div>
                  <span style={{ fontSize: "13px", color: "#374151" }}>{item}</span>
                </div>
              ))}
            </div>

            <button onClick={() => router.push("/dashboard")}
              style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "#0f172a", color: "white", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(15,23,42,0.18)", marginBottom: "12px" }}>
              Go to my dashboard
            </button>

            <button onClick={() => router.push("/login")} style={{ background: "none", border: "none", cursor: "pointer", color: "#8492a6", fontSize: "13px" }}>
              Sign in to a different account
            </button>
          </div>
        )}

      </div>

      <style>{`
        .left-panel { display: none; }
        @media (min-width: 1024px) { .left-panel { display: flex !important; } }
      `}</style>
    </div>
  );
}