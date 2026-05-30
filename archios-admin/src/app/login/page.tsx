"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  const [mode, setMode] = useState<"password" | "magic">("password");

  const supabase = createClient();

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    window.location.href = "/";
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/api/auth/callback` },
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setMagicSent(true); setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ background: "var(--accent-dim)", border: "1px solid var(--border-focus)" }}>
            <span className="font-mono font-bold text-lg" style={{ color: "var(--accent)" }}>A</span>
          </div>
          <h1 className="text-xl font-bold mb-1" style={{ color: "var(--text)" }}>ArchiOS Admin</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Private control panel</p>
        </div>

        {magicSent ? (
          <div className="panel p-6 text-center">
            <div className="text-2xl mb-3">📬</div>
            <h2 className="font-semibold mb-2" style={{ color: "var(--text)" }}>Check your email</h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              We sent a login link to <strong style={{ color: "var(--text)" }}>{email}</strong>.
              Click it to access the admin panel.
            </p>
          </div>
        ) : (
          <div className="panel p-6">
            {/* Mode tabs */}
            <div className="flex gap-1 p-1 rounded-lg mb-5" style={{ background: "var(--bg)" }}>
              {(["password", "magic"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className="flex-1 py-1.5 rounded-md text-xs font-medium transition-all"
                  style={{
                    background: mode === m ? "var(--bg-panel)" : "transparent",
                    color: mode === m ? "var(--text)" : "var(--text-muted)",
                    border: mode === m ? "1px solid var(--border)" : "1px solid transparent",
                  }}
                >
                  {m === "password" ? "Password" : "Magic Link"}
                </button>
              ))}
            </div>

            <form onSubmit={mode === "password" ? handlePasswordLogin : handleMagicLink} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-base"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>

              {mode === "password" && (
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-base"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                </div>
              )}

              {error && (
                <div className="text-xs px-3 py-2 rounded-md" style={{ background: "var(--danger-dim)", color: "var(--danger)" }}>
                  {error}
                </div>
              )}

              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? "Loading..." : mode === "password" ? "Sign In" : "Send Magic Link"}
              </button>
            </form>
          </div>
        )}

        <p className="text-center text-xs mt-4" style={{ color: "var(--text-dim)" }}>
          Private admin panel · Not indexed by search engines
        </p>
      </div>
    </div>
  );
}
