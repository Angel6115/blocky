// src/app/investors/page.tsx
"use client";

import Link from "next/link";
import { useAuthModal } from "../components/auth/AuthModalProvider";

export default function InvestorsPage() {
  const { openAuthModal } = useAuthModal();
  const handleInvestorBrief = () => openAuthModal();

  return (
    <main>
      <section className="bv-section">
        <div className="bv-container">
          <div className="bv-sectionHead">
            <h1 className="bv-h2">Investor Overview</h1>
            <p className="bv-p">
              BlockyVault is building the <strong>verification infrastructure layer</strong> for healthcare insurers,
              government agencies, and universities. We&apos;re the API that turns 3–7 day manual document checks into
              2-second verifications—backed by cryptographic proof.
            </p>
          </div>

          {/* Investment Highlights - Top Priority */}
          <div className="bv-card card" style={{ padding: 16, marginBottom: 16, background: "var(--card-bg)" }}>
            <div className="bv-cardTitle" style={{ marginBottom: 8 }}>
              Investment Highlights
            </div>
            <div className="bv-grid3" style={{ gap: 12 }}>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  $30B+ TAM
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  Healthcare fraud ($2.1B→$8B), document verification ($6.5B→$23.6B), identity verification
                  ($8.2B→$18B) by 2030
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  10-50x LTV:CAC
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  Infrastructure-grade unit economics vs 2-5x for storage SaaS. Enterprise ARPU $1.5K-$50K/mo
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Plaid/Stripe Model
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  API layer with network effects. Comparables: Plaid ($13.4B), Stripe ($95B), Checkr ($5B)
                </div>
              </div>
            </div>
          </div>

          {/* The Opportunity */}
          <div className="bv-grid2">
            <div className="bv-card card">
              <div className="bv-cardTitle">The $68B Problem</div>
              <div className="bv-cardDesc">
                Healthcare insurance fraud alone costs $68 billion annually. Every claim requires document verification,
                but manual processes take 3–7 days and cost $45–120 per check. BlockyVault does it in 2 seconds for
                $0.50–2.00.
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">Healthcare fraud</span>
                <span className="bv-chip">Manual bottleneck</span>
                <span className="bv-chip">Acute pain</span>
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Why Now</div>
              <div className="bv-cardDesc">
                Three factors converging in 2025-2026: AI document processing maturity (AWS Textract 95%+ accuracy),
                blockchain enterprise adoption (+340%), and post-COVID fraud acceleration (+$18B since 2020).
              </div>
              <div className="bv-chipRow">
                <span className="bv-chip">AI ready</span>
                <span className="bv-chip">Blockchain credible</span>
                <span className="bv-chip">Market desperate</span>
              </div>
            </div>
          </div>

          {/* Business Model & Traction */}
          <div className="bv-grid3" style={{ marginTop: 16 }}>
            <div className="bv-card card">
              <div className="bv-cardTitle">Three Revenue Streams</div>
              <div className="bv-cardDesc">
                <strong>Insurance</strong> ($300K-500K Y1): Regional health insurers, 5,000-10,000 verifications/mo.
                <br />
                <br />
                <strong>Government</strong> ($250K-400K Y1): Municipal agencies, licenses and benefits documents.
                <br />
                <br />
                <strong>Universities</strong> ($150K-300K Y1): Credential verification for employers and lenders.
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Unit Economics</div>
              <div className="bv-cardDesc">
                <strong>ARPU:</strong> $1.5K-$50K/mo (vs $9-49 storage SaaS)
                <br />
                <strong>CAC:</strong> $3K-10K
                <br />
                <strong>LTV:</strong> $100K-500K (3-year)
                <br />
                <strong>LTV:CAC:</strong> 10-50x (world-class)
                <br />
                <strong>Gross margin:</strong> 80%+ (blockchain cost &lt;$0.01)
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">Validation Plan</div>
              <div className="bv-cardDesc">
                <strong>Pre-seed (now):</strong> 25 customer interviews, 3-5 LOIs target
                <br />
                <br />
                <strong>Months 1-3:</strong> MVP build (12 weeks)
                <br />
                <br />
                <strong>Months 4-6:</strong> 10 pilots, 4-5 convert to paid (40-60% rate)
                <br />
                <br />
                <strong>Month 12:</strong> $300K-800K ARR → Seed raise
              </div>
            </div>
          </div>

          {/* Defensibility */}
          <div className="bv-card card" style={{ marginTop: 16 }}>
            <div className="bv-cardTitle">Competitive Moat & Defensibility</div>
            <div className="bv-cardDesc" style={{ marginBottom: 12 }}>
              <strong>Network Effects:</strong> Each university/hospital that joins makes the platform more valuable for
              verifiers (insurers/employers). First-mover advantage = 12-18 month head start before competitors understand
              the network model.
            </div>
            <div className="bv-grid3">
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Data Moat
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  2 years of blockchain-anchored verification history = irreplicable asset. ML fraud models improve with
                  every verification.
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Patent Strategy
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  3 patents planned: (1) Real-time verification + blockchain (core), (2) Network revenue sharing, (3)
                  Fraud detection ML. Filing Q2 2026.
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Winner-Take-Most
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  Similar to Plaid (banking) and Checkr (background checks): infrastructure APIs with network effects
                  become category-defining.
                </div>
              </div>
            </div>
          </div>

          {/* Comparable Exits */}
          <div className="bv-card card" style={{ marginTop: 16 }}>
            <div className="bv-cardTitle">Comparable Outcomes</div>
            <div className="bv-cardDesc" style={{ marginBottom: 12 }}>
              Infrastructure APIs addressing fraud/trust problems with first-mover advantage:
            </div>
            <div className="bv-grid3">
              <div className="bv-card card" style={{ padding: 12, background: "var(--bg)" }}>
                <div className="bv-cardDesc" style={{ fontWeight: 600 }}>
                  Plaid
                </div>
                <div className="bv-sub" style={{ marginTop: 4 }}>
                  Banking verification API
                  <br />
                  2013-2020: $150M → $13.4B
                  <br />
                  <strong>1,340x return</strong>
                </div>
              </div>
              <div className="bv-card card" style={{ padding: 12, background: "var(--bg)" }}>
                <div className="bv-cardDesc" style={{ fontWeight: 600 }}>
                  Stripe
                </div>
                <div className="bv-sub" style={{ marginTop: 4 }}>
                  Payment infrastructure
                  <br />
                  2010-2017: $4M → $95B
                  <br />
                  <strong>23,750x return</strong>
                </div>
              </div>
              <div className="bv-card card" style={{ padding: 12, background: "var(--bg)" }}>
                <div className="bv-cardDesc" style={{ fontWeight: 600 }}>
                  Checkr
                </div>
                <div className="bv-sub" style={{ marginTop: 4 }}>
                  Background check API
                  <br />
                  2014-2019: $25M → $5B
                  <br />
                  <strong>200x return</strong>
                </div>
              </div>
            </div>
          </div>

          {/* 48-Month Trajectory */}
          <div className="bv-card card" style={{ marginTop: 16 }}>
            <div className="bv-cardTitle">48-Month Path to $1B+ Valuation</div>
            <div style={{ overflowX: "auto", marginTop: 12 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th style={{ textAlign: "left", padding: "8px", fontSize: "14px" }}>Period</th>
                    <th style={{ textAlign: "left", padding: "8px", fontSize: "14px" }}>ARR</th>
                    <th style={{ textAlign: "left", padding: "8px", fontSize: "14px" }}>Valuation</th>
                    <th style={{ textAlign: "left", padding: "8px", fontSize: "14px" }}>Stage</th>
                    <th style={{ textAlign: "left", padding: "8px", fontSize: "14px" }}>Customers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "8px", fontSize: "14px" }}>Q1 2026 (Now)</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>$0</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>$5M</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>Pre-seed</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>0 (building)</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "8px", fontSize: "14px" }}>Q4 2026</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>$500K-1M</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>$15M</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>Seed</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>15</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "8px", fontSize: "14px" }}>Q4 2027</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>$5-10M</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>$75M</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>Series A</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>80</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "8px", fontSize: "14px" }}>Q4 2028</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>$30-40M</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>$250M</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>Series B</td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>300</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "8px", fontSize: "14px" }}>
                      <strong>Q4 2029</strong>
                    </td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>
                      <strong>$100M+</strong>
                    </td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>
                      <strong>$1B+</strong>
                    </td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>
                      <strong>Series C/Exit</strong>
                    </td>
                    <td style={{ padding: "8px", fontSize: "14px" }}>800+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* The Ask */}
          <div className="bv-card card" style={{ marginTop: 16, background: "var(--card-bg)" }}>
            <div className="bv-cardTitle">Pre-Seed Round: $500K</div>
            <div className="bv-cardDesc" style={{ marginBottom: 12 }}>
              <strong>Valuation:</strong> $5M pre-money → $5.5M post
              <br />
              <strong>Use of funds:</strong> 12-week MVP development + 10 pilot recruitments + patent filing
              <br />
              <strong>Milestones:</strong> MVP live, 3-5 LOIs signed, 4-5 pilots converted to paid, $300K-800K ARR
            </div>
            <div className="bv-grid3">
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Team
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  $200K: 1 blockchain dev, 1 designer (contract)
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Infrastructure
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  $50K: AWS, Polygon, Supabase, monitoring
                </div>
              </div>
              <div>
                <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 4 }}>
                  Go-to-Market
                </div>
                <div className="bv-sub" style={{ marginTop: 0 }}>
                  $100K: Customer calls, pilot recruitment
                </div>
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <div className="bv-cardDesc" style={{ fontWeight: 600, marginBottom: 8 }}>
                Expected Return (Conservative)
              </div>
              <div className="bv-sub" style={{ marginTop: 0 }}>
                Exit at $400M-800M (4-8x ARR @ $100M) = <strong>800x-1,600x return</strong> on $500K pre-seed in 5-6
                years
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bv-card card" style={{ marginTop: 16 }}>
            <div className="bv-cardTitle">Request Full Investor Brief</div>
            <div className="bv-cardDesc">
              We&apos;re currently speaking with angels, micro-VCs, and strategic investors who understand infrastructure
              plays. The full brief includes: detailed financial model, competitive analysis, go-to-market playbook,
              patent strategy, and customer interview insights.
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button type="button" className="bv-btn bv-btn--primary" onClick={handleInvestorBrief}>
                Request investor brief
              </button>

              <Link className="bv-btn" href="/about">
                About BlockyVault
              </Link>

              <Link className="bv-btn bv-btn--ghost" href="/">
                Back to Home
              </Link>
            </div>
          </div>

          <div className="bv-sub" style={{ marginTop: 12 }}>
            Pre-seed stage: We&apos;re early and selective. If you invest in infrastructure APIs, network effects, or
            fraud/trust solutions, we&apos;d love to connect.
          </div>
        </div>
      </section>
    </main>
  );
}
