"use client";

import React, { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

type LeadType = "customer" | "investor" | "career";
type Vertical = "insurance" | "government" | "university" | "other";

export default function AuthModal({ open, onClose }: Props) {
  const [leadType, setLeadType] = useState<LeadType>("customer");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  
  // Customer-specific fields
  const [vertical, setVertical] = useState<Vertical>("insurance");
  const [volume, setVolume] = useState("");
  
  // Investor-specific fields
  const [ticketSize, setTicketSize] = useState("");
  const [stage, setStage] = useState("");
  
  // Career-specific fields
  const [role, setRole] = useState("");

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

  // Reset campos condicionales cuando cambia el tipo
  useEffect(() => {
    setVolume("");
    setTicketSize("");
    setStage("");
    setRole("");
  }, [leadType]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setOk(null);

    if (!email.trim()) {
      setErr("Please enter your email.");
      return;
    }

    if (!name.trim()) {
      setErr("Please enter your name.");
      return;
    }

    // Validación condicional
    if (leadType === "customer" && !company.trim()) {
      setErr("Please enter your organization name.");
      return;
    }

    setLoading(true);
    try {
      const payload: any = {
        email: email.trim(),
        name: name.trim(),
        company: company.trim() || null,
        leadType,
      };

      // Campos condicionales según tipo
      if (leadType === "customer") {
        payload.vertical = vertical;
        payload.volume = volume.trim() || null;
      } else if (leadType === "investor") {
        payload.ticketSize = ticketSize.trim() || null;
        payload.stage = stage.trim() || null;
      } else if (leadType === "career") {
        payload.role = role.trim() || null;
      }

      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      // Mensajes personalizados según tipo
      if (leadType === "customer") {
        setOk("Thanks! We'll reach out within 48 hours to discuss a pilot.");
      } else if (leadType === "investor") {
        setOk("Thanks! We'll send the investor brief to your email within 24 hours.");
      } else {
        setOk("Thanks! We'll review your profile and reach out if there's a fit.");
      }
      
      // Limpiar campos después de 3 segundos
      setTimeout(() => {
        setEmail("");
        setName("");
        setCompany("");
        setVolume("");
        setTicketSize("");
        setStage("");
        setRole("");
      }, 3000);
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
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bv-modal__panel">
        <div className="bv-modal__header">
          <h2 className="bv-modal__title">Join 2026 Pilot Program</h2>
          <button type="button" className="bv-icon-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <p className="bv-modal__sub">
          {leadType === "customer" && "We're selecting 10 organizations for early pilots. Tell us about your verification needs."}
          {leadType === "investor" && "We're raising $500K pre-seed. Share your investment focus and we'll send the brief."}
          {leadType === "career" && "We're hiring blockchain devs, backend engineers, and GTM talent. Tell us your background."}
        </p>

        <form className="bv-modal__form" onSubmit={submit}>
          {/* Lead Type Selection */}
          <div className="bv-field">
            <span style={{ fontWeight: 600 }}>I'm interested as:</span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
              <button
                type="button"
                className={leadType === "customer" ? "bv-btn bv-btn--primary" : "bv-btn bv-btn--ghost"}
                onClick={() => setLeadType("customer")}
                style={{ flex: "1 1 auto", minWidth: "fit-content" }}
              >
                Potential Customer
              </button>

              <button
                type="button"
                className={leadType === "investor" ? "bv-btn bv-btn--primary" : "bv-btn bv-btn--ghost"}
                onClick={() => setLeadType("investor")}
                style={{ flex: "1 1 auto", minWidth: "fit-content" }}
              >
                Investor
              </button>

              <button
                type="button"
                className={leadType === "career" ? "bv-btn bv-btn--primary" : "bv-btn bv-btn--ghost"}
                onClick={() => setLeadType("career")}
                style={{ flex: "1 1 auto", minWidth: "fit-content" }}
              >
                Career
              </button>
            </div>
          </div>

          {/* Common Fields */}
          <label className="bv-field">
            <span>Name *</span>
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </label>

          <label className="bv-field">
            <span>Email *</span>
            <input
              type="email"
              name="email"
              required
              placeholder="john@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </label>

          {/* Conditional Fields for CUSTOMER */}
          {leadType === "customer" && (
            <>
              <label className="bv-field">
                <span>Organization *</span>
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="Regional Health Insurance Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={loading}
                />
              </label>

              <label className="bv-field">
                <span>Vertical *</span>
                <select
                  value={vertical}
                  onChange={(e) => setVertical(e.target.value as Vertical)}
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "14px",
                  }}
                >
                  <option value="insurance">Healthcare Insurance / TPA</option>
                  <option value="government">Government / Public Agency</option>
                  <option value="university">University / Education</option>
                  <option value="other">Other (tell us in next call)</option>
                </select>
              </label>

              <label className="bv-field">
                <span>Monthly document volume (optional)</span>
                <input
                  type="text"
                  name="volume"
                  placeholder="e.g., 5,000 claims/month or 10,000 verifications/month"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  disabled={loading}
                />
              </label>
            </>
          )}

          {/* Conditional Fields for INVESTOR */}
          {leadType === "investor" && (
            <>
              <label className="bv-field">
                <span>Fund / Organization (optional)</span>
                <input
                  type="text"
                  name="company"
                  placeholder="Acme Ventures"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={loading}
                />
              </label>

              <label className="bv-field">
                <span>Stage focus (optional)</span>
                <input
                  type="text"
                  name="stage"
                  placeholder="e.g., Pre-seed, Seed, Series A"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  disabled={loading}
                />
              </label>

              <label className="bv-field">
                <span>Typical ticket size (optional)</span>
                <input
                  type="text"
                  name="ticketSize"
                  placeholder="e.g., $50K-250K"
                  value={ticketSize}
                  onChange={(e) => setTicketSize(e.target.value)}
                  disabled={loading}
                />
              </label>
            </>
          )}

          {/* Conditional Fields for CAREER */}
          {leadType === "career" && (
            <>
              <label className="bv-field">
                <span>Current company/background (optional)</span>
                <input
                  type="text"
                  name="company"
                  placeholder="e.g., Ex-Stripe backend engineer"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={loading}
                />
              </label>

              <label className="bv-field">
                <span>Role interested in (optional)</span>
                <input
                  type="text"
                  name="role"
                  placeholder="e.g., Blockchain engineer, Backend engineer, GTM"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading}
                />
              </label>
            </>
          )}

          {err ? (
            <div style={{ marginTop: 6 }} className="bv-modal__sub">
              <strong style={{ color: "var(--bv-danger, #ff4d4f)" }}>{err}</strong>
            </div>
          ) : null}

          {ok ? (
            <div style={{ marginTop: 6 }} className="bv-modal__sub">
              <strong style={{ color: "var(--bv-success, #52c41a)" }}>{ok}</strong>
            </div>
          ) : null}

          <div className="bv-modal__actions">
            <button type="button" className="bv-btn bv-btn--ghost" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="bv-btn bv-btn--primary" disabled={loading}>
              {loading ? "Submitting…" : leadType === "customer" ? "Request pilot" : leadType === "investor" ? "Request brief" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
