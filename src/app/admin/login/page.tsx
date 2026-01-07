"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const next = useMemo(() => sp.get("next") || "/admin/waitlist", [sp]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // ✅ API espera user/pass
        body: JSON.stringify({ user: username, pass: password }),
      });

      const data = await res.json().catch(() => ({} as any));
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Login failed");

      router.replace(next);
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div
        style={{
          width: "min(520px, 100%)",
          borderRadius: 16,
          padding: 20,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "white" }}>Admin login</h1>
        <p style={{ marginTop: 8, opacity: 0.8, color: "white" }}>Sign in to manage approvals.</p>

        <form onSubmit={onSubmit} style={{ marginTop: 14, display: "grid", gap: 12 }}>
          <label style={{ display: "grid", gap: 6, color: "white" }}>
            <span style={{ fontSize: 12, opacity: 0.75 }}>Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              placeholder="admin"
              style={{
                height: 44,
                borderRadius: 12,
                padding: "0 12px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(0,0,0,0.25)",
                color: "white",
                outline: "none",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 6, color: "white" }}>
            <span style={{ fontSize: 12, opacity: 0.75 }}>Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              placeholder="••••••••••"
              style={{
                height: 44,
                borderRadius: 12,
                padding: "0 12px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(0,0,0,0.25)",
                color: "white",
                outline: "none",
              }}
            />
          </label>

          {error ? (
            <div
              style={{
                borderRadius: 12,
                padding: 10,
                background: "rgba(255,0,0,0.12)",
                border: "1px solid rgba(255,0,0,0.25)",
                color: "white",
              }}
            >
              <b>Error:</b> {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            style={{
              height: 44,
              borderRadius: 12,
              border: 0,
              cursor: busy ? "not-allowed" : "pointer",
              fontWeight: 800,
              background: "linear-gradient(90deg, #ffb15c, #ff7a18)",
              color: "#0b0b0f",
              boxShadow: "0 10px 24px rgba(255,122,24,0.25)",
            }}
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
