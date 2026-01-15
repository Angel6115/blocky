// src/app/team/page.tsx
"use client";

import Link from "next/link";
import { useAuthModal } from "../components/auth/AuthModalProvider";

export default function TeamPage() {
  const { openAuthModal } = useAuthModal();
  const handleContactTeam = () => openAuthModal();

  return (
    <main>
      <section className="bv-section">
        <div className="bv-container">
          <div className="bv-sectionHead">
            <h1 className="bv-h2">Join the Team Building the Verification Layer</h1>
            <p className="bv-p">
              BlockyVault is building the <strong>API infrastructure</strong> that will power document verification for
              healthcare insurers, government agencies, and universities. If you want to work on a Plaid/Stripe-sized
              opportunity from day one—solving a $68 billion fraud problem with elegant APIs—this is for you.
            </p>
          </div>

          <div className="bv-card card" style={{ padding: 16, marginBottom: 16, background: "var(--card-bg)" }}>
            <div className="bv-cardTitle" style={{ marginBottom: 8 }}>
              Why Join BlockyVault Now
            </div>
            <div className="bv-grid3">
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Ground-Floor Opportunity
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  Pre-seed stage means significant equity, architectural decisions you&apos;ll own, and direct impact on
                  product direction. You&apos;ll be employee #2-5.
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Infrastructure Category
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  Not another SaaS tool. We&apos;re building the verification layer that becomes industry standard—similar
                  to how Plaid owns banking connections or Stripe owns payments.
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Real Market Pull
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  25+ customer interviews validated the pain. Target customers are already asking "when can we pilot?" We&apos;re
                  building because the market is pulling—not pushing.
                </div>
              </div>
            </div>
          </div>

          <div className="bv-sectionHead" style={{ marginTop: 24 }}>
            <h2 className="bv-h2" style={{ marginBottom: 6 }}>
              Open Roles (Pre-Seed Phase)
            </h2>
            <p className="bv-p" style={{ marginBottom: 0 }}>
              We&apos;re hiring for the 12-week MVP sprint and first year of pilots. Roles are contract-to-full-time with
              equity.
            </p>
          </div>

          <div className="bv-grid3" style={{ marginTop: 12 }}>
            <div className="bv-card card">
              <div className="bv-cardTitle">Blockchain/Smart Contract Engineer</div>
              <div className="bv-cardDesc">
                Build the verification proof layer: Solidity contracts, Merkle tree batching, Polygon integration. Optimize
                for &lt;$0.01 per 1,000 verifications. This is the cryptographic heart of BlockyVault.
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">Solidity</span>
                <span className="bv-chip">Polygon</span>
                <span className="bv-chip">Merkle trees</span>
              </div>
              <div style={{ marginTop: 12, fontSize: "14px", color: "var(--text-secondary)" }}>
                <strong>Contract:</strong> 3 months, $10K-15K/mo | <strong>Equity:</strong> 0.25-0.5%
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Backend/API Engineer</div>
              <div className="bv-cardDesc">
                Build the REST API that customers integrate with: document ingestion, AWS Textract processing, verification
                logic, risk scoring. Design for 99.5% uptime and &lt;5s latency at scale.
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">Node.js/Python</span>
                <span className="bv-chip">Postgres</span>
                <span className="bv-chip">AWS</span>
              </div>
              <div style={{ marginTop: 12, fontSize: "14px", color: "var(--text-secondary)" }}>
                <strong>Full-time:</strong> $90K-130K + equity | <strong>Equity:</strong> 0.5-1.0%
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Frontend/Dashboard Engineer</div>
              <div className="bv-cardDesc">
                Build the customer portal: API key management, usage dashboards, verification logs, integration guides.
                React/Next.js. Clean, fast, enterprise-grade UI.
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">React</span>
                <span className="bv-chip">Next.js</span>
                <span className="bv-chip">TypeScript</span>
              </div>
              <div style={{ marginTop: 12, fontSize: "14px", color: "var(--text-secondary)" }}>
                <strong>Contract:</strong> 3 months, $8K-12K/mo | <strong>Equity:</strong> 0.15-0.3%
              </div>
            </div>
          </div>

          <div className="bv-grid2" style={{ marginTop: 16 }}>
            <div className="bv-card card">
              <div className="bv-cardTitle">Go-to-Market / Pilot Lead (Month 4-6)</div>
              <div className="bv-cardDesc">
                Own pilot recruitment, customer onboarding, ROI studies, and conversion to paid contracts. Work directly with
                founder on sales process. Background in enterprise SaaS sales (health insurance or government preferred).
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">Enterprise sales</span>
                <span className="bv-chip">Customer success</span>
                <span className="bv-chip">Pilots</span>
              </div>
              <div style={{ marginTop: 12, fontSize: "14px", color: "var(--text-secondary)" }}>
                <strong>Full-time:</strong> $80K-110K + commission + equity | <strong>Equity:</strong> 0.3-0.75%
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Product Designer (Contract, Month 2-4)</div>
              <div className="bv-cardDesc">
                Design the customer dashboard, API documentation site, and public verification pages. Minimal, enterprise-grade
                aesthetic. Figma to production-ready components.
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">Figma</span>
                <span className="bv-chip">Design systems</span>
                <span className="bv-chip">Enterprise UX</span>
              </div>
              <div style={{ marginTop: 12, fontSize: "14px", color: "var(--text-secondary)" }}>
                <strong>Contract:</strong> 2-3 months, $6K-10K/mo
              </div>
            </div>
          </div>

          <div className="bv-card card" style={{ marginTop: 16, padding: 16 }}>
            <div className="bv-cardTitle" style={{ marginBottom: 8 }}>
              What We&apos;re Looking For
            </div>
            <div className="bv-list">
              <div className="bv-li">
                <span className="bv-liDot" />
                <strong>Builders who ship:</strong> We&apos;re a 12-week MVP sprint. Need people who can move fast, make
                decisions, and get to production without endless iteration.
              </div>
              <div className="bv-li">
                <span className="bv-liDot" />
                <strong>Infrastructure mindset:</strong> You understand APIs, uptime SLAs, cost optimization, and designing
                for enterprise customers. Not "move fast and break things"—move fast and build reliable things.
              </div>
              <div className="bv-li">
                <span className="bv-liDot" />
                <strong>Customer obsession:</strong> You want to talk to insurance claims adjusters, government document
                processors, and university registrars to understand their pain deeply.
              </div>
              <div className="bv-li">
                <span className="bv-liDot" />
                <strong>Startup experience preferred:</strong> You&apos;ve worked at early-stage companies (pre-seed to Series
                A) and know what "scrappy but production-ready" means.
              </div>
              <div className="bv-li">
                <span className="bv-liDot" />
                <strong>Ownership mentality:</strong> Small team means you&apos;ll own entire systems—API design, smart
                contract architecture, go-to-market playbooks. You thrive in autonomy.
              </div>
            </div>
          </div>

          <div className="bv-card card" style={{ marginTop: 16 }}>
            <div className="bv-cardTitle">The Founding Team (So Far)</div>
            <div className="bv-cardDesc" style={{ marginBottom: 12 }}>
              BlockyVault is founder-led by [Founder Name], who has:
            </div>
            <div className="bv-list">
              <div className="bv-li">
                <span className="bv-liDot" />
                Built and scaled [Previous SaaS Product] to $XXK ARR in 18 months
              </div>
              <div className="bv-li">
                <span className="bv-liDot" />
                10+ years in [relevant industry—insurance, fintech, government tech, or blockchain]
              </div>
              <div className="bv-li">
                <span className="bv-liDot" />
                Full-stack technical capability (can ship MVP solo if needed, reducing execution risk)
              </div>
              <div className="bv-li">
                <span className="bv-liDot" />
                50+ warm connections to insurance executives, government IT leaders, and university administrators
              </div>
            </div>
            <div className="bv-sub" style={{ marginTop: 12 }}>
              You&apos;ll be working directly with the founder on product, customer, and technical decisions. No layers of
              management—just builders solving problems together.
            </div>
          </div>

          <div className="bv-card card" style={{ marginTop: 16, background: "var(--card-bg)" }}>
            <div className="bv-cardTitle">Compensation & Equity Philosophy</div>
            <div className="bv-cardDesc" style={{ marginBottom: 12 }}>
              We&apos;re pre-seed, so cash is limited but equity is meaningful:
            </div>
            <div className="bv-grid3">
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Early Hires (1-5)
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  0.25-1.0% equity depending on role and impact. 4-year vest, 1-year cliff. Market-rate or slightly below
                  cash + meaningful equity upside.
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Contract Roles
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  Competitive contract rates ($6K-15K/mo depending on role) with option to convert to full-time + equity
                  after MVP/pilots.
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Remote + Flexible
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  Fully remote, but expect weekly syncs and quarterly in-person sprints. We optimize for output, not
                  hours.
                </div>
              </div>
            </div>
          </div>

          <div className="bv-card card" style={{ marginTop: 16 }}>
            <div className="bv-cardTitle">How to Apply</div>
            <div className="bv-cardDesc">
              Send us an email with:
              <br />
              <br />
              • Role you&apos;re interested in
              <br />
              • Why BlockyVault (not just "I want a startup job"—tell us what excites you about verification infrastructure)
              <br />
              • Link to GitHub, portfolio, or previous work
              <br />
              • 1-2 sentences on your most relevant experience
              <br />
              <br />
              We&apos;ll respond within 48 hours if there&apos;s a fit.
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button type="button" className="bv-btn bv-btn--primary" onClick={handleContactTeam}>
                Apply or inquire about roles
              </button>

              <Link className="bv-btn" href="/about">
                Read our story
              </Link>

              <Link className="bv-btn bv-btn--ghost" href="/investors">
                Investor overview
              </Link>

              <Link className="bv-btn bv-btn--ghost" href="/">
                Back to Home
              </Link>
            </div>
          </div>

          <div className="bv-sub" style={{ marginTop: 12 }}>
            Not ready to apply but curious? Join our pilot list or investor updates—we&apos;ll share product progress and
            hiring updates as we grow.
          </div>
        </div>
      </section>
    </main>
  );
}
