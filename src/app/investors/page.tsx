// src/app/investors/page.tsx
import Link from "next/link";

export default function InvestorsPage() {
  return (
    <main>
      <section className="bv-section">
        <div className="bv-container">
          <div className="bv-sectionHead">
            <h1 className="bv-h2">Welcome Investors</h1>
            <p className="bv-p">
              BlockyVault is building a trust-first vault designed for teams that need provable security, audit-ready
              visibility, and clean UX. We’re approaching the category with a “proof + clarity” strategy.
            </p>
          </div>

          <div className="bv-grid2">
            <div className="bv-card card">
              <div className="bv-cardTitle">Category opportunity</div>
              <div className="bv-cardDesc">
                Security tools often fail because they’re confusing. BlockyVault prioritizes usability and verifiable
                integrity—reducing mistakes and increasing adoption.
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">Adoption</span>
                <span className="bv-chip">Trust</span>
                <span className="bv-chip">Compliance</span>
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Differentiation</div>
              <div className="bv-cardDesc">
                Proof receipts for critical actions + AI guardrails to reduce unsafe behavior—built to be privacy-first,
                not surveillance.
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">Proof receipts</span>
                <span className="bv-chip">AI guardrails</span>
                <span className="bv-chip">Privacy-first</span>
              </div>
            </div>
          </div>

          <div className="bv-grid3" style={{ marginTop: 16 }}>
            <div className="bv-card card">
              <div className="bv-cardTitle">Go-to-market</div>
              <div className="bv-cardDesc">
                Private Preview onboarding, then focused verticals where auditability and trust are mandatory.
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Product strategy</div>
              <div className="bv-cardDesc">
                Minimal vault core → team controls → verifiable security layer → advanced workflows and integrations.
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Next milestones</div>
              <div className="bv-cardDesc">
                Preview onboarding, feedback loops, proof receipt system, and secure foundations for regulated use cases.
              </div>
            </div>
          </div>

          <div className="bv-card card" style={{ marginTop: 16 }}>
            <div className="bv-cardTitle">Investor contact</div>
            <div className="bv-cardDesc">
              If you’re exploring the space or want to request an investor brief, reach out. We can share roadmap,
              technical approach, and preview metrics.
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="bv-btn bv-btn--primary" href="/contact">
                Request investor brief
              </Link>
              <Link className="bv-btn" href="/about">
                About
              </Link>
              <Link className="bv-btn bv-btn--ghost" href="/">
                Back to Home
              </Link>
            </div>
          </div>

          <div className="bv-sub" style={{ marginTop: 12 }}>
            Short AI note: Our intelligence layer focuses on preventing human error—while minimizing data exposure.
          </div>
        </div>
      </section>
    </main>
  );
}
