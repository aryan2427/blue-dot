"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginMethod = "email" | "phone";
type View = "login" | "forgot" | "forgot-otp" | "forgot-reset" | "forgot-done";

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

export default function LoginPage() {
  const router = useRouter();
  const [view, setView] = useState<View>("login");
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState("");

  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");

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

  const cardStyle: React.CSSProperties = {
    background: "white",
    border: "1.5px solid #dde1ea",
    borderRadius: "20px",
    padding: "36px 32px",
    boxShadow: "0 4px 24px rgba(60,80,140,0.10), 0 1px 4px rgba(60,80,140,0.06)",
    width: "100%",
    maxWidth: "400px",
  };

  const handleSendOtp = () => {
    setOtpLoading(true);
    setTimeout(() => { setOtpLoading(false); setOtpSent(true); }, 1200);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const identifier = loginMethod === "email" ? email : phone;
    if (!identifier || !password || !otp) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/dashboard"); }, 1500);
  };

  const handleForgotSendOtp = () => {
    if (!forgotEmail) { setForgotError("Please enter your email or phone."); return; }
    setForgotError("");
    setForgotLoading(true);
    setTimeout(() => { setForgotLoading(false); setView("forgot-otp"); }, 1200);
  };

  const handleVerifyOtp = () => {
    if (!forgotOtp) { setForgotError("Please enter the OTP."); return; }
    setForgotError("");
    setView("forgot-reset");
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) { setForgotError("Please fill in both fields."); return; }
    if (newPassword !== confirmPassword) { setForgotError("Passwords do not match."); return; }
    setForgotError("");
    setForgotLoading(true);
    setTimeout(() => { setForgotLoading(false); setView("forgot-done"); }, 1200);
  };

  const resetForgot = () => {
    setForgotEmail(""); setForgotOtp(""); setNewPassword(""); setConfirmPassword("");
    setForgotError(""); setView("login");
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#3b82f6";
    e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)";
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#dde1ea";
    e.target.style.boxShadow = "0 1px 4px rgba(60,80,120,0.08)";
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'DM Sans', sans-serif", background: "linear-gradient(135deg, #dbeafe 0%, #ede9fe 50%, #dbeafe 100%)" }}>

      {/* Left decorative panel — desktop only via media query class */}
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
        <div>
          <p style={{ fontSize: "30px", fontWeight: 700, color: "white", lineHeight: 1.35, marginBottom: "16px" }}>
            Connecting talent<br />with opportunity<br /><span style={{ color: "#3b82f6" }}>across Angul.</span>
          </p>
          <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.7 }}>
            Digital Public Infrastructure for Angul District — bridging job seekers, employers, and training institutes.
          </p>
        </div>
        <div style={{ color: "#475569", fontSize: "12px" }}>Blue Dot · Angul District · Digital Public Infrastructure</div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>

        {/* ── LOGIN ── */}
        {view === "login" && (
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" />
                  <circle cx="10" cy="10" r="3.5" fill="white" />
                  <circle cx="10" cy="10" r="1.5" fill="#3b82f6" />
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: "16px", color: "#0f172a" }}>Blue Dot</span>
            </div>

            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", marginBottom: "4px", letterSpacing: "-0.3px" }}>Sign in</h1>
            <p style={{ fontSize: "13px", color: "#8492a6", marginBottom: "24px" }}>Welcome back. Enter your details to continue.</p>

            <div style={{ display: "flex", background: "#eef1f7", borderRadius: "12px", padding: "4px", gap: "4px", marginBottom: "22px" }}>
              {(["email", "phone"] as LoginMethod[]).map((m) => (
                <button key={m} onClick={() => { setLoginMethod(m); setError(""); setOtpSent(false); }}
                  style={{
                    flex: 1, padding: "8px", fontSize: "13px", fontWeight: 500, borderRadius: "9px",
                    border: "none", cursor: "pointer", transition: "all 0.15s",
                    background: loginMethod === m ? "white" : "transparent",
                    color: loginMethod === m ? "#0f172a" : "#8492a6",
                    boxShadow: loginMethod === m ? "0 1px 4px rgba(60,80,140,0.10)" : "none",
                  }}>
                  {m === "email" ? "Email" : "Phone"}
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {loginMethod === "email" ? (
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Email address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
              ) : (
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Phone number</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ padding: "11px 14px", borderRadius: "12px", border: "1.5px solid #dde1ea", background: "#f5f7fb", fontSize: "14px", color: "#6b7280", whiteSpace: "nowrap", boxShadow: "0 1px 4px rgba(60,80,120,0.08)" }}>+91</div>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" style={{ ...inputStyle, flex: 1, width: "auto" }} onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                </div>
              )}

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}>Password</label>
                  <button type="button" onClick={() => setView("forgot")} style={{ fontSize: "12px", color: "#3b82f6", background: "none", border: "none", cursor: "pointer", fontWeight: 500, padding: 0 }}>
                    Forgot password?
                  </button>
                </div>
                <div style={{ position: "relative" }}>
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ ...inputStyle, paddingRight: "44px" }} onFocus={focusStyle} onBlur={blurStyle} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility"
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#8492a6", padding: 0, display: "flex", alignItems: "center" }}>
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>One-time password (OTP)</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" maxLength={6}
                    style={{ ...inputStyle, flex: 1, width: "auto", letterSpacing: "0.12em" }} onFocus={focusStyle} onBlur={blurStyle} />
                  <button type="button" onClick={handleSendOtp} disabled={otpLoading || otpSent}
                    style={{
                      padding: "11px 16px", borderRadius: "12px",
                      border: `1.5px solid ${otpSent ? "#bbf7d0" : "#dde1ea"}`,
                      background: otpSent ? "#f0fdf4" : "white",
                      color: otpSent ? "#16a34a" : "#3b82f6",
                      fontSize: "13px", fontWeight: 500,
                      cursor: otpSent ? "default" : "pointer",
                      whiteSpace: "nowrap",
                      boxShadow: "0 1px 4px rgba(60,80,120,0.08)",
                    }}>
                    {otpLoading ? "Sending..." : otpSent ? "✓ Sent" : "Send OTP"}
                  </button>
                </div>
                {otpSent && <p style={{ fontSize: "12px", color: "#16a34a", marginTop: "6px" }}>OTP sent. Please check your {loginMethod === "email" ? "email" : "phone"}.</p>}
              </div>

              {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#dc2626" }}>{error}</div>}

              <button type="submit" disabled={loading}
                style={{ width: "100%", padding: "12px", borderRadius: "12px", background: loading ? "#374151" : "#0f172a", color: "white", fontWeight: 600, fontSize: "14px", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: "4px", boxShadow: "0 2px 8px rgba(15,23,42,0.18)", transition: "background 0.2s" }}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "22px 0" }}>
              <div style={{ flex: 1, height: "1px", background: "#e9ecf2" }} />
              <span style={{ fontSize: "12px", color: "#a0aab8" }}>or</span>
              <div style={{ flex: 1, height: "1px", background: "#e9ecf2" }} />
            </div>

            <p style={{ textAlign: "center", fontSize: "13px", color: "#6b7280" }}>
              Don&apos;t have an account?{" "}
              <button onClick={() => router.push("/signup")} style={{ color: "#3b82f6", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                Create one
              </button>
            </p>
          </div>
        )}

        {/* ── FORGOT STEP 1: Enter email/phone ── */}
        {view === "forgot" && (
          <div style={cardStyle}>
            <button onClick={resetForgot} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", color: "#8492a6", fontSize: "13px", fontWeight: 500, padding: 0, marginBottom: "24px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              Back to sign in
            </button>
            <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#eff6ff", border: "1.5px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>Forgot your password?</h2>
            <p style={{ fontSize: "13px", color: "#8492a6", marginBottom: "24px", lineHeight: 1.6 }}>Enter your registered email or phone number. We&apos;ll send you an OTP to reset your password.</p>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Email or phone number</label>
              <input type="text" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="you@example.com or 98765 43210" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            {forgotError && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#dc2626", marginBottom: "14px" }}>{forgotError}</div>}
            <button onClick={handleForgotSendOtp} disabled={forgotLoading}
              style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "#0f172a", color: "white", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(15,23,42,0.18)", opacity: forgotLoading ? 0.7 : 1 }}>
              {forgotLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* ── FORGOT STEP 2: Verify OTP ── */}
        {view === "forgot-otp" && (
          <div style={cardStyle}>
            <button onClick={() => setView("forgot")} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", color: "#8492a6", fontSize: "13px", fontWeight: 500, padding: 0, marginBottom: "24px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              Back
            </button>
            <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#f0fdf4", border: "1.5px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.64 3.45 2 2 0 0 1 3.62 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
              </svg>
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>Check your inbox</h2>
            <p style={{ fontSize: "13px", color: "#8492a6", marginBottom: "4px", lineHeight: 1.6 }}>We sent a 6-digit OTP to</p>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "24px" }}>{forgotEmail}</p>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Enter OTP</label>
              <input type="text" value={forgotOtp} onChange={(e) => setForgotOtp(e.target.value)} placeholder="------" maxLength={6}
                style={{ ...inputStyle, letterSpacing: "0.25em", textAlign: "center", fontSize: "20px", fontWeight: 600 }} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <p style={{ fontSize: "12px", color: "#8492a6", marginBottom: "16px" }}>
              Didn&apos;t receive it?{" "}
              <button onClick={() => setView("forgot")} style={{ color: "#3b82f6", background: "none", border: "none", cursor: "pointer", fontWeight: 500, fontSize: "12px", padding: 0 }}>Resend OTP</button>
            </p>
            {forgotError && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#dc2626", marginBottom: "14px" }}>{forgotError}</div>}
            <button onClick={handleVerifyOtp}
              style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "#0f172a", color: "white", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(15,23,42,0.18)" }}>
              Verify OTP
            </button>
          </div>
        )}

        {/* ── FORGOT STEP 3: Reset password ── */}
        {view === "forgot-reset" && (
          <div style={cardStyle}>
            <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#eff6ff", border: "1.5px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>Set new password</h2>
            <p style={{ fontSize: "13px", color: "#8492a6", marginBottom: "24px" }}>Choose a strong password for your account.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>New password</label>
                <div style={{ position: "relative" }}>
                  <input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Minimum 8 characters" style={{ ...inputStyle, paddingRight: "44px" }} onFocus={focusStyle} onBlur={blurStyle} />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} aria-label="Toggle" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#8492a6", padding: 0, display: "flex" }}>
                    <EyeIcon open={showNewPassword} />
                  </button>
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Confirm password</label>
                <div style={{ position: "relative" }}>
                  <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" style={{ ...inputStyle, paddingRight: "44px" }} onFocus={focusStyle} onBlur={blurStyle} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label="Toggle" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#8492a6", padding: 0, display: "flex" }}>
                    <EyeIcon open={showConfirmPassword} />
                  </button>
                </div>
              </div>
              {forgotError && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#dc2626" }}>{forgotError}</div>}
              <button onClick={handleResetPassword} disabled={forgotLoading}
                style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "#0f172a", color: "white", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(15,23,42,0.18)", opacity: forgotLoading ? 0.7 : 1, marginTop: "4px" }}>
                {forgotLoading ? "Saving..." : "Reset password"}
              </button>
            </div>
          </div>
        )}

        {/* ── FORGOT STEP 4: Done ── */}
        {view === "forgot-done" && (
          <div style={{ ...cardStyle, textAlign: "center" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#f0fdf4", border: "2px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>Password reset!</h2>
            <p style={{ fontSize: "13px", color: "#8492a6", lineHeight: 1.6, marginBottom: "28px" }}>Your password has been reset successfully. You can now sign in with your new password.</p>
            <button onClick={resetForgot}
              style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "#0f172a", color: "white", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(15,23,42,0.18)" }}>
              Back to sign in
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