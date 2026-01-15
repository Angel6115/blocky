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
              BlockyVault is building the <strong>verification infrastructure layer</strong> for healthcare insurers,
              government agencies, and universities. We&apos;re turning manual document verification—a process that takes
              days and costs millions—into a 2-second API call with cryptographic proof.
            </p>
          </div>

          <div className="bv-grid2">
            <div className="bv-card card">
              <div className="bv-cardTitle">The Problem We&apos;re Solving</div>
              <div className="bv-cardDesc">
                Healthcare fraud costs $68 billion annually. Every insurance claim requires document verification, but the
                current process—phone calls, fax, email—takes 3–7 days and costs $45–120 per check. Government agencies
                face similar bottlenecks with licenses and certificates. Universities field hundreds of verification calls
                monthly for diplomas and transcripts.
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">$68B fraud problem</span>
                <span className="bv-chip">Manual bottleneck</span>
                <span className="bv-chip">Desperate for automation</span>
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Our Solution</div>
              <div className="bv-cardDesc">
                A verification network that connects document issuers (hospitals, universities, agencies) with verifiers
                (insurers, employers, lenders). One API to verify documents from hundreds of sources—no phone calls, no
                custom integrations. Every verification generates cryptographic proof for audits and fraud investigations.
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">2-second verification</span>
                <span className="bv-chip">$0.50–2.00 per check</span>
                <span className="bv-chip">Blockchain proof</span>
              </div>
            </div>
          </div>

          <div className="bv-card card" style={{ marginTop: 16, padding: 16 }}>
            <div className="bv-cardTitle" style={{ marginBottom: 8 }}>
              Why Now: The Perfect Convergence
            </div>
            <div className="bv-cardDesc" style={{ marginBottom: 12 }}>
              Three factors are aligning in 2025-2026 that make BlockyVault possible—and necessary—right now:
            </div>
            <div className="bv-grid3">
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  AI Document Processing Maturity
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  AWS Textract and similar services now achieve 95%+ accuracy at $1.50 per 1,000 pages—making sub-$1
                  verification economics viable for the first time.
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Blockchain Enterprise Adoption
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  Fortune 500 blockchain usage grew 340% from 2023-2025. Polygon transaction costs ($0.00001) make
                  cryptographic proof scalable and credible.
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Post-COVID Fraud Crisis
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  Healthcare fraud increased $18B since 2020. Remote work made manual verification impossible to scale.
                  Organizations are desperate for automation.
                </div>
              </div>
            </div>
          </div>

          <div className="bv-grid3" style={{ marginTop: 16 }}>
            <div className="bv-card card">
              <div className="bv-cardTitle">How It Works</div>
              <div className="bv-cardDesc">
                Organizations integrate our REST API once. When they need to verify a document, they send it to our
                endpoint. We compare it against authoritative sources, generate a risk score, anchor the verification to a
                public blockchain, and return a tamper-evident certificate—all in under 5 seconds.
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Network Effects</div>
              <div className="bv-cardDesc">
                As more universities, hospitals, and agencies join as issuers, every insurer and employer gets broader
                coverage from a single integration. The network becomes more valuable with each participant—creating
                winner-take-most dynamics similar to Plaid and Stripe.
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Built for Enterprise</div>
              <div className="bv-cardDesc">
                BlockyVault is designed for organizations processing thousands of verifications monthly—not individual
                consumers. Our customers are regional health insurers, municipal agencies, and accredited universities with
                urgent verification pain.
              </div>
            </div>
          </div>

          <div className="bv-card card" style={{ marginTop: 16, padding: 16 }}>
            <div className="bv-cardTitle" style={{ marginBottom: 8 }}>
              Who We&apos;re Building For
            </div>
            <div className="bv-grid3" style={{ marginTop: 12 }}>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Healthcare Insurers
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  Regional and mid-size health insurers processing 10,000+ claims monthly. Current pain: manual
                  verification creates 3–7 day bottlenecks and exposes fraud risk.
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Government Agencies
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  Municipal and state offices verifying licenses, certificates, and benefits documents. Current pain:
                  citizens wait 10+ days, staff overwhelmed with verification calls.
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Universities & HR
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  Accredited universities and HR platforms verifying diplomas and transcripts. Current pain: registrars
                  field hundreds of manual verification requests monthly.
                </div>
              </div>
            </div>
          </div>

          <div className="bv-grid2" style={{ marginTop: 16 }}>
            <div className="bv-card card">
              <div className="bv-cardTitle">Where We Are: Pre-Launch 2026</div>
              <div className="bv-cardDesc">
                We&apos;re in pre-launch validation mode. Over the past 8 weeks, we&apos;ve conducted 25 customer discovery
                interviews with insurance claims adjusters, government document processors, and university registrars. The
                pain is real, the willingness to pay is validated, and we&apos;re targeting 3-5 signed Letters of Intent before
                building the MVP.
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">The Vision: Plaid of Document Verification</div>
              <div className="bv-cardDesc">
                By 2030, BlockyVault aims to be the default verification layer—the API that every insurer, government
                agency, and employer uses to instantly authenticate documents. Just as Plaid became the standard for banking
                connections, we&apos;re building the standard for document trust.
              </div>
            </div>
          </div>

          <div className="bv-card card" style={{ marginTop: 16 }}>
            <div className="bv-cardTitle">Our Approach: Founder-Led, Customer-Obsessed</div>
            <div className="bv-cardDesc" style={{ marginBottom: 12 }}>
              We&apos;re taking a disciplined, capital-efficient approach to building BlockyVault:
            </div>
            <div className="bv-list">
              <div className="bv-li">
                <span className="bv-liDot" />
                <strong>Validate before building:</strong> 25+ customer interviews, 3-5 LOIs before MVP development
              </div>
              <div className="bv-li">
                <span className="bv-liDot" />
                <strong>12-week MVP:</strong> Scrappy but production-ready API, blockchain integration, customer portal
              </div>
              <div className="bv-li">
                <span className="bv-liDot" />
                <strong>10 co-designed pilots:</strong> 60-90 day engagements with joint ROI studies
              </div>
              <div className="bv-li">
                <span className="bv-liDot" />
                <strong>Target 40-60% pilot conversion:</strong> Realistic enterprise sales expectations
              </div>
              <div className="bv-li">
                <span className="bv-liDot" />
                <strong>Founder-led sales until $1M ARR:</strong> Deep customer understanding before scaling
              </div>
            </div>
          </div>

          <div className="bv-card card" style={{ marginTop: 16, background: "var(--card-bg)" }}>
            <div className="bv-cardTitle">Join Us</div>
            <div className="bv-cardDesc" style={{ marginBottom: 12 }}>
              BlockyVault is early, and we&apos;re being intentional about who we work with:
            </div>
            <div className="bv-grid3">
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  For Potential Customers
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  If your organization processes 1,000+ document verifications monthly and current manual processes are
                  causing bottlenecks, we&apos;d love to explore a pilot.
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  For Investors
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  We&apos;re raising $500K pre-seed to build MVP and run 10 pilots. If you invest in infrastructure APIs or
                  fraud/trust solutions, request our investor brief.
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  For Talent
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  We&apos;re hiring blockchain developers, backend engineers, and go-to-market talent who want to build
                  category-defining infrastructure.
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button type="button" className="bv-btn bv-btn--primary" onClick={handleEarlyAccess}>
              Join 2026 pilot list
            </button>

            <Link className="bv-btn" href="/investors">
              Investor overview
            </Link>

            <Link className="bv-btn bv-btn--ghost" href="/team">
              See open roles
            </Link>

            <Link className="bv-btn bv-btn--ghost" href="/">
              Back to Home
            </Link>
          </div>

          <div className="bv-sub" style={{ marginTop: 12 }}>
            We&apos;re building the trust layer for institutional document verification—one API call at a time.
          </div>
        </div>
      </section>
    </main>
  );
}
