// src/app/components/AuthModal.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type AuthMode = "signin" | "create";

type Props = {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onWaitlisted?: (email: string) => void;
};

type AccountType = "individual" | "private_corp" | "government";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function AuthModal({ open, mode, onClose, onWaitlisted }: Props) {
  const [authMode, setAuthMode] = useState<AuthMode>(mode);

  // Form fields (create)
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("individual");
  const [email, setEmail] = useState("");

  // Terms checkbox (MVP gate)
  const [agree, setAgree] = useState(true);

  // Honeypot (anti-bot)
  const [hp, setHp] = useState("");

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  // Sync mode when opens
  useEffect(() => {
    if (!open) return;
    setAuthMode(mode);
    setDone(false);
    setErr("");
    setSubmitting(false);
    setHp("");
    // no limpiamos campos automáticamente para que se sienta “premium”
    // (pero si quieres, lo activamos)
  }, [open, mode]);

  // Lock scroll + ESC
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAndReset();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const canSubmit = useMemo(() => {
    if (submitting) return false;
    if (!agree) return false;

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !isValidEmail(cleanEmail)) return false;
    if (!fullName.trim()) return false;
    if (!phone.trim()) return false;

    return true;
  }, [agree, email, fullName, phone, submitting]);

  const resetForm = () => {
    setFullName("");
    setCompany("");
    setPhone("");
    setAccountType("individual");
    setEmail("");
    setAgree(true);
    setHp("");
    setErr("");
    setSubmitting(false);
    setDone(false);
    setAuthMode(mode);
  };

  const closeAndReset = () => {
    resetForm();
    onClose();
  };

  async function submitWaitlist(e: React.FormEvent) {
    e.preventDefault();
    setErr("");

    const cleanEmail = email.trim().toLowerCase();

    if (!agree) {
      setErr("Please agree to the Terms & Privacy to continue.");
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setErr("Please enter a valid email.");
      return;
    }
    if (!fullName.trim()) {
      setErr("Full name is required.");
      return;
    }
    if (!phone.trim()) {
      setErr("Phone is required.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          company: company.trim() || null,
          fullName: fullName.trim(),
          phone: phone.trim(),
          accountType,
          source: "modal",
          hp,
        }),
      });

      const data = await res.json().catch(() => ({} as any));

      if (!res.ok || !data?.ok) {
        setErr(data?.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setDone(true);
      onWaitlisted?.(cleanEmail);
      setSubmitting(false);
    } catch {
      setErr("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="bv-modal__overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeAndReset();
      }}
    >
      <div className="bv-modal__panel">
        {/* Header */}
        <div className="bv-modal__header">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 12, opacity: 0.8 }}>
              BlockyVault • <span style={{ opacity: 0.9 }}>Private Preview</span>
            </div>
            <h2 className="bv-modal__title" style={{ margin: 0 }}>
              {authMode === "signin" ? "Sign in" : "Request early access"}
            </h2>
          </div>

          <button type="button" className="bv-icon-btn" onClick={closeAndReset} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 12,
            padding: 6,
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
          role="tablist"
          aria-label="Auth mode"
        >
          <button
            type="button"
            onClick={() => setAuthMode("signin")}
            aria-pressed={authMode === "signin"}
            style={{
              flex: 1,
              height: 40,
              borderRadius: 999,
              border: 0,
              cursor: "pointer",
              fontWeight: 700,
              background: authMode === "signin" ? "rgba(255,255,255,0.10)" : "transparent",
              color: "rgba(255,255,255,0.90)",
            }}
          >
            Sign in
          </button>

          <button
            type="button"
            onClick={() => setAuthMode("create")}
            aria-pressed={authMode === "create"}
            style={{
              flex: 1,
              height: 40,
              borderRadius: 999,
              border: 0,
              cursor: "pointer",
              fontWeight: 700,
              background: authMode === "create" ? "rgba(255,255,255,0.10)" : "transparent",
              color: "rgba(255,255,255,0.90)",
            }}
          >
            Request access
          </button>
        </div>

        {authMode === "signin" ? (
          <>
            <p className="bv-modal__sub" style={{ marginTop: 12 }}>
              Private Preview is limited. Sign-in will unlock after onboarding. For now, request access and we’ll invite
              you in batches.
            </p>

            <div className="bv-modal__actions" style={{ justifyContent: "space-between" }}>
              <button type="button" className="bv-btn bv-btn--ghost" onClick={() => setAuthMode("create")}>
                Request access instead
              </button>
              <button type="button" className="bv-btn" onClick={closeAndReset}>
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            {!done ? (
              <>
                <p className="bv-modal__sub" style={{ marginTop: 12 }}>
                  Private Preview is limited. Request access with your details—no password required.
                </p>

                {err ? (
                  <div className="bv-alert" role="alert" style={{ marginTop: 10 }}>
                    {err}
                  </div>
                ) : null}

                <form className="bv-modal__form" onSubmit={submitWaitlist} style={{ marginTop: 12 }}>
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="hp"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
                    aria-hidden="true"
                  />

                  {/* Grid row 1 */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                    }}
                    className="bv-modal__grid2"
                  >
                    <label className="bv-field">
                      <span>Full name *</span>
                      <input
                        type="text"
                        name="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        placeholder="Jane Doe"
                      />
                    </label>

                    <label className="bv-field">
                      <span>Company</span>
                      <input
                        type="text"
                        name="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Blocky Labs"
                      />
                    </label>
                  </div>

                  {/* Grid row 2 */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                    }}
                    className="bv-modal__grid2"
                  >
                    <label className="bv-field">
                      <span>Phone *</span>
                      <input
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="(787) 555-1234"
                      />
                    </label>

                    <label className="bv-field">
                      <span>Account type</span>
                      <select
                        name="accountType"
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value as AccountType)}
                      >
                        <option value="individual">Individual</option>
                        <option value="private_corp">Private corporation</option>
                        <option value="government">Government</option>
                      </select>
                    </label>
                  </div>

                  <label className="bv-field">
                    <span>Email *</span>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@company.com"
                    />
                  </label>

                  <label style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 4 }}>
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      style={{ width: 16, height: 16 }}
                    />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
                      I agree to the Terms and Privacy.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="bv-btn bv-btn--primary"
                    disabled={!canSubmit}
                    style={{
                      width: "100%",
                      height: 44,
                      marginTop: 10,
                      opacity: !canSubmit ? 0.6 : 1,
                      cursor: !canSubmit ? "not-allowed" : "pointer",
                    }}
                  >
                    {submitting ? "Submitting..." : "Request early access"}
                  </button>

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, gap: 12 }}>
                    <button type="button" className="bv-btn bv-btn--ghost" onClick={closeAndReset}>
                      Cancel
                    </button>

                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", alignSelf: "center" }}>
                      We won’t sell your data.
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAuthMode("signin")}
                    className="bv-linkBtn"
                    style={{
                      marginTop: 6,
                      textAlign: "left",
                      fontSize: 12,
                      color: "rgba(255,255,255,0.75)",
                      textDecoration: "underline",
                      background: "transparent",
                      border: 0,
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    Already have access? Sign in
                  </button>
                </form>
              </>
            ) : (
              <>
                <p className="bv-modal__sub" style={{ marginTop: 14 }}>
                  You’re on the list ✅ We’ll contact <strong>{email.trim().toLowerCase()}</strong> when onboarding
                  opens.
                </p>

                <div className="bv-modal__actions" style={{ marginTop: 12 }}>
                  <button type="button" className="bv-btn bv-btn--primary" onClick={closeAndReset}>
                    Done
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Small responsive helper */}
      <style jsx>{`
        @media (max-width: 720px) {
          .bv-modal__grid2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
