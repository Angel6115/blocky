"use client";

import React, { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

type JoinAs = "individual" | "team" | "investor" | "hiring";

export default function AuthModal({ open, onClose }: Props) {
  const [joinAs, setJoinAs] = useState<JoinAs>("team");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Limpia mensajes cuando abres/cierra
  useEffect(() => {
    if (!open) return;
    setErr(null);
    setOk(null);
  }, [open]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setOk(null);

    if (!email.trim()) {
      setErr("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      // ✅ Ajusta esta ruta si tu API es diferente
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          company: company.trim() || null,
          joinAs, // ✅ Lead segmentation
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setOk("Thanks — you’re on the list. We’ll reach out soon.");
      // Opcional: limpiar campos
      // setEmail("");
      // setCompany("");
    } catch (e: any) {
      setErr(e?.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="bv-modal__overlay"
      onMouseDown={(e) => {
        // click fuera para cerrar
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bv-modal__panel">
        <div className="bv-modal__header">
          <h2 className="bv-modal__title">Request early access</h2>
          <button type="button" className="bv-icon-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <p className="bv-modal__sub">Leave your email and we’ll invite you when onboarding opens.</p>

        <form className="bv-modal__form" onSubmit={submit}>
          {/* ✅ Lead Segmentation (minimal UI) */}
          <div className="bv-field">
            <span>I’m joining as (optional)</span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
              <button
                type="button"
                className={joinAs === "individual" ? "bv-btn bv-btn--ghost" : "bv-btn bv-btn--ghost"}
                aria-pressed={joinAs === "individual"}
                onClick={() => setJoinAs("individual")}
              >
                Individual
              </button>

              <button
                type="button"
                className={joinAs === "team" ? "bv-btn bv-btn--ghost" : "bv-btn bv-btn--ghost"}
                aria-pressed={joinAs === "team"}
                onClick={() => setJoinAs("team")}
              >
                Team
              </button>

              <button
                type="button"
                className={joinAs === "investor" ? "bv-btn bv-btn--ghost" : "bv-btn bv-btn--ghost"}
                aria-pressed={joinAs === "investor"}
                onClick={() => setJoinAs("investor")}
              >
                Investor
              </button>

              <button
                type="button"
                className={joinAs === "hiring" ? "bv-btn bv-btn--ghost" : "bv-btn bv-btn--ghost"}
                aria-pressed={joinAs === "hiring"}
                onClick={() => setJoinAs("hiring")}
              >
                Hiring
              </button>
            </div>
          </div>

          <label className="bv-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </label>

          <label className="bv-field">
            <span>Company (optional)</span>
            <input
              type="text"
              name="company"
              placeholder="BlockyVault Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={loading}
            />
          </label>

          {err ? (
            <div style={{ marginTop: 6 }} className="bv-modal__sub">
              <strong style={{ color: "var(--bv-danger, #ff4d4f)" }}>{err}</strong>
            </div>
          ) : null}

          {ok ? (
            <div style={{ marginTop: 6 }} className="bv-modal__sub">
              <strong>{ok}</strong>
            </div>
          ) : null}

          <div className="bv-modal__actions">
            <button type="button" className="bv-btn bv-btn--ghost" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="bv-btn" disabled={loading}>
              {loading ? "Submitting…" : "Request access"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
