// src/app/about/page.tsx
"use client";

import Link from "next/link";
import { useAuthModal } from "../components/auth/AuthModalProvider";

export default function AboutPage() {
  const { openAuthModal } = useAuthModal();
  const handleEarlyAccess = () => openAuthModal();

  return (
    <main>
      <section className="bv-section">
        <div className="bv-container">
          <div className="bv-sectionHead">
            <h1 className="bv-h2">About BlockyVault</h1>
            <p className="bv-p">
              BlockyVault is building a modern vault focused on clarity, privacy, and <strong>verifiable trust</strong>.
              We’re designing security that feels simple for people—yet stands up in environments that demand proof.
            </p>
          </div>

          <div className="bv-grid2">
            <div className="bv-card card">
              <div className="bv-cardTitle">Our mission</div>
              <div className="bv-cardDesc">
                Make secure storage accessible to everyone—without the confusing UI, noise, or fragile workflows that
                cause mistakes.
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">Human-first</span>
                <span className="bv-chip">Trust-first</span>
                <span className="bv-chip">Proof-ready</span>
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Why now</div>
              <div className="bv-cardDesc">
                Teams and individuals need security they can understand and prove. We’re building a vault that supports
                audits, collaboration, and real-world accountability—without exposing sensitive content.
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">Audit-ready</span>
                <span className="bv-chip">Minimal UI</span>
                <span className="bv-chip">Team controls</span>
              </div>
            </div>
          </div>

          <div className="bv-grid3" style={{ marginTop: 16 }}>
            <div className="bv-card card">
              <div className="bv-cardTitle">Verifiable actions</div>
              <div className="bv-cardDesc">
                Critical actions can generate tamper-evident proof receipts—so you can demonstrate integrity without
                revealing what’s inside.
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Adaptive intelligence</div>
              <div className="bv-cardDesc">
                AI guardrails can help reduce risk by spotting unsafe patterns and guiding users toward safer actions,
                designed with privacy in mind.
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Private Preview</div>
              <div className="bv-cardDesc">
                We’re onboarding intentionally to protect quality and security. Early access is limited while we harden
                the platform.
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link className="bv-btn bv-btn--ghost" href="/">
              Back to Home
            </Link>

            <Link className="bv-btn" href="/investors">
              Investor overview
            </Link>

            {/* ✅ Funnel: open Neon modal */}
            <button type="button" className="bv-btn bv-btn--primary" onClick={handleEarlyAccess}>
              Request early access
            </button>

            {/* ✅ Funnel-safe contact */}
            <button type="button" className="bv-btn" onClick={handleEarlyAccess}>
              Contact
            </button>
          </div>

          <div className="bv-sub" style={{ marginTop: 12 }}>
            Short AI note: We’re using intelligence to reduce risk—not to read your secrets.
          </div>
        </div>
      </section>
    </main>
  );
}
