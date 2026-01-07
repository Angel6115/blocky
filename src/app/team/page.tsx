// src/app/team/page.tsx
import Link from "next/link";

export default function TeamPage() {
  return (
    <main>
      <section className="bv-section">
        <div className="bv-container">
          <div className="bv-sectionHead">
            <h1 className="bv-h2">Join Our Team</h1>
            <p className="bv-p">
              BlockyVault is building a privacy-first vault with verifiable trust. If you love clean design, deep
              security, and building products people actually understand—this is for you.
            </p>
          </div>

          <div className="bv-grid3">
            <div className="bv-card card">
              <div className="bv-cardTitle">Security Engineering</div>
              <div className="bv-cardDesc">
                Cryptographic proofs, threat modeling, secure architecture, audit-friendly systems.
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">Crypto</span>
                <span className="bv-chip">Threat model</span>
                <span className="bv-chip">Audits</span>
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Product & UX</div>
              <div className="bv-cardDesc">
                Minimal UI that reduces mistakes. Flows that feel premium and calm—on desktop and mobile.
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">UX systems</span>
                <span className="bv-chip">Accessibility</span>
                <span className="bv-chip">Design</span>
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">AI / Risk Signals</div>
              <div className="bv-cardDesc">
                Guardrails that detect unsafe patterns and recommend safer choices—privacy-preserving by design.
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">Privacy</span>
                <span className="bv-chip">Signals</span>
                <span className="bv-chip">Guardrails</span>
              </div>
            </div>
          </div>

          <div className="bv-card card" style={{ marginTop: 16 }}>
            <div className="bv-cardTitle">How to apply</div>
            <div className="bv-cardDesc">
              Send a short message with: (1) what role you want, (2) links or experience, (3) why BlockyVault.
              We’re small and selective—quality over quantity.
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="bv-btn bv-btn--primary" href="/contact">
                Contact recruiting
              </Link>
              <Link className="bv-btn" href="/about">
                Read About
              </Link>
              <Link className="bv-btn bv-btn--ghost" href="/">
                Back to Home
              </Link>
            </div>
          </div>

          <div className="bv-sub" style={{ marginTop: 12 }}>
            Short AI note: We use AI to reduce user error and risk—without turning your vault into training data.
          </div>
        </div>
      </section>
    </main>
  );
}
