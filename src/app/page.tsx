"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Hero from "./components/Hero";
import ProductModal from "./components/ProductModal";
import { useAuthModal } from "./components/auth/AuthModalProvider";

type ModalData = {
  title: string;
  desc: string;
  bullets: string[];
  chips: string[];
};

export default function Home() {
  const year = new Date().getFullYear();

  const { openAuthModal } = useAuthModal();
  const handleEarlyAccess = () => openAuthModal();

  const productItems = useMemo<ModalData[]>(
    () => [
      {
        title: "Insurance Claims Verification",
        desc: "Verify medical records and claim attachments against authoritative sources—replacing 3–7 day manual processes.",
        bullets: [
          "Automated document analysis + source validation",
          "Fraud risk scoring (0–100)",
          "Designed for regional health insurers and TPAs",
        ],
        chips: ["Healthcare", "Claims", "Fraud detection"],
      },
      {
        title: "Government Document Verification",
        desc: "Authenticate birth certificates, licenses, and income documents without phone calls or fax delays.",
        bullets: [
          "APIs for municipal and state offices",
          "Reduce citizen wait times from 10 days to minutes",
          "Audit-ready verification logs",
        ],
        chips: ["Government", "Licenses", "Benefits"],
      },
      {
        title: "Educational Credential Verification",
        desc: "Instant verification of diplomas and transcripts for employers, lenders, and HR platforms.",
        bullets: [
          "Universities onboard once, reuse everywhere",
          "Employers verify in 2 seconds via API",
          "B2C2B model: alumni, universities, employers",
        ],
        chips: ["Universities", "HR", "Credentials"],
      },
      {
        title: "Blockchain Proof Layer",
        desc: "Every verification anchored with tamper-evident cryptographic proof for audits and compliance.",
        bullets: [
          "Merkle-tree batching on public blockchain",
          "Verification receipts for fraud teams",
          "Cost: <$0.01 per verification at scale",
        ],
        chips: ["Blockchain proof", "Merkle trees", "Compliance"],
      },
    ],
    []
  );

  const [openProduct, setOpenProduct] = useState(false);
  const [productData, setProductData] = useState<ModalData | null>(null);

  const openProductModal = (item: ModalData) => {
    setProductData(item);
    setOpenProduct(true);
  };

  const closeProductModal = () => {
    setOpenProduct(false);
    setProductData(null);
  };

  return (
    <div id="top">
      <main>
        <Hero onRequestAccess={handleEarlyAccess} />

        <section className="bv-section bv-proof" aria-label="The verification problem">
          <div className="bv-container">
            <div className="bv-card card" style={{ padding: 16 }}>
              <div className="bv-sectionHead" style={{ marginBottom: 12 }}>
                <h2 className="bv-h2" style={{ marginBottom: 6 }}>
                  Replace manual document verification with a 2-second API
                </h2>
                <p className="bv-p" style={{ marginBottom: 0 }}>
                  Insurers, governments, and universities spend millions on fraud detection and manual document checks.
                  BlockyVault turns that into a simple API call with cryptographic proof—designed for high-volume,
                  high-stakes workflows.
                </p>
              </div>

              <div className="bv-grid3" style={{ marginTop: 12 }}>
                <div className="bv-card card" style={{ padding: 14 }}>
                  <div className="bv-cardTitle">Healthcare Insurers</div>
                  <div className="bv-cardDesc">
                    Verify claim documents and medical records in seconds instead of 3–7 days.
                  </div>
                  <div className="bv-chipRow">
                    <span className="bv-chip">$68B fraud/year</span>
                    <span className="bv-chip">Claims bottleneck</span>
                  </div>
                </div>

                <div className="bv-card card" style={{ padding: 14 }}>
                  <div className="bv-cardTitle">Government Agencies</div>
                  <div className="bv-cardDesc">
                    Authenticate licenses, certificates, and benefits documents without phone calls.
                  </div>
                  <div className="bv-chipRow">
                    <span className="bv-chip">Citizen complaints</span>
                    <span className="bv-chip">Staff overload</span>
                  </div>
                </div>

                <div className="bv-card card" style={{ padding: 14 }}>
                  <div className="bv-cardTitle">Universities & HR</div>
                  <div className="bv-cardDesc">
                    Let employers verify diplomas and transcripts instantly instead of calling registrars.
                  </div>
                  <div className="bv-chipRow">
                    <span className="bv-chip">HR calls</span>
                    <span className="bv-chip">Credential fraud</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <button type="button" className="bv-btn bv-btn--primary" onClick={handleEarlyAccess}>
                  Join 2026 pilot list
                </button>
                <Link className="bv-btn bv-btn--ghost" href="/investors">
                  Investor overview
                </Link>
                <span className="bv-sub" style={{ marginTop: 0 }}>
                  We&apos;re selecting 10 organizations for early pilots. Limited slots.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="why" className="bv-section bv-why">
          <div className="bv-container">
            <div className="bv-sectionHead">
              <h2 className="bv-h2">Why BlockyVault is different</h2>
              <p className="bv-p">
                We&apos;re not a document storage platform. We&apos;re building the <strong>verification network</strong>{" "}
                that connects issuers (universities, hospitals, agencies) with verifiers (insurers, employers, lenders).
              </p>
            </div>

            <div className="bv-whyGrid">
              <div className="bv-whyCard card">
                <div className="bv-whyTop">
                  <h3 className="bv-cardTitle">API-First Network</h3>
                </div>
                <p className="bv-cardDesc">
                  One API to verify documents from hundreds of issuers—no custom integrations, no phone calls.
                </p>
                <div className="bv-chipRow">
                  <span className="bv-chip">REST API</span>
                  <span className="bv-chip">Webhooks</span>
                  <span className="bv-chip">Developer-friendly</span>
                </div>
              </div>

              <div className="bv-whyCard card bv-whyCard--featured">
                <div className="bv-whyTop">
                  <h3 className="bv-cardTitle">Cryptographic Proof</h3>
                </div>
                <p className="bv-cardDesc">
                  Every verification generates a tamper-evident proof receipt—perfect for audits, compliance, and fraud
                  investigations.
                </p>
                <div className="bv-chipRow">
                  <span className="bv-chip">Tamper-evident</span>
                  <span className="bv-chip">Blockchain-anchored</span>
                  <span className="bv-chip">Audit-ready</span>
                </div>
              </div>

              <div className="bv-whyCard card">
                <div className="bv-whyTop">
                  <h3 className="bv-cardTitle">Network Effects</h3>
                </div>
                <p className="bv-cardDesc">
                  As more universities and agencies join, every insurer and employer gets more coverage from a single
                  integration.
                </p>
                <div className="bv-chipRow">
                  <span className="bv-chip">Flywheel</span>
                  <span className="bv-chip">One-to-many</span>
                  <span className="bv-chip">Scales with adoption</span>
                </div>
              </div>
            </div>

            <div className="bv-whyCta card">
              <div className="bv-whyCta__left">
                <div className="bv-whyCta__title">We&apos;re hiring early partners</div>
                <div className="bv-whyCta__sub">
                  10 organizations (insurers, agencies, universities) to co-design pilots in 2026. Priority for teams with
                  urgent verification pain.
                </div>
              </div>
              <div className="bv-whyCta__right">
                <button type="button" className="bv-btn bv-btn--primary" onClick={handleEarlyAccess}>
                  Talk about a pilot
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="product" className="bv-section">
          <div className="bv-container">
            <div className="bv-sectionHead">
              <h2 className="bv-h2">High-impact use cases</h2>
              <p className="bv-p">
                We&apos;re starting with the workflows where verification pain is most acute and volume is highest.
              </p>
            </div>

            <div className="bv-grid4">
              <button className="bv-card" type="button" onClick={() => openProductModal(productItems[0])}>
                <div className="bv-cardTop">
                  <h3 className="bv-cardTitle">Insurance Claims</h3>
                </div>
                <div className="bv-cardDesc">Medical records and claim attachments verified in seconds.</div>
                <div className="bv-chipRow">
                  <span className="bv-chip">Health insurers</span>
                  <span className="bv-chip">TPAs</span>
                </div>
              </button>

              <button className="bv-card" type="button" onClick={() => openProductModal(productItems[1])}>
                <div className="bv-cardTop">
                  <h3 className="bv-cardTitle">Government Documents</h3>
                </div>
                <div className="bv-cardDesc">Birth certificates, licenses, and benefits documents.</div>
                <div className="bv-chipRow">
                  <span className="bv-chip">Municipal</span>
                  <span className="bv-chip">State agencies</span>
                </div>
              </button>

              <button className="bv-card" type="button" onClick={() => openProductModal(productItems[2])}>
                <div className="bv-cardTop">
                  <h3 className="bv-cardTitle">Educational Credentials</h3>
                </div>
                <div className="bv-cardDesc">Diplomas and transcripts for employers and lenders.</div>
                <div className="bv-chipRow">
                  <span className="bv-chip">Universities</span>
                  <span className="bv-chip">HR</span>
                </div>
              </button>

              <button className="bv-card" type="button" onClick={() => openProductModal(productItems[3])}>
                <div className="bv-cardTop">
                  <h3 className="bv-cardTitle">Proof & Audit Layer</h3>
                </div>
                <div className="bv-cardDesc">Cryptographic receipts for every verification.</div>
                <div className="bv-chipRow">
                  <span className="bv-chip">Blockchain proof</span>
                  <span className="bv-chip">Compliance</span>
                </div>
              </button>
            </div>
          </div>
        </section>

        <ProductModal open={openProduct} onClose={closeProductModal} data={productData} />

        <section id="pilots" className="bv-section">
          <div className="bv-container">
            <div className="bv-sectionHead">
              <h2 className="bv-h2">2026 pilot program</h2>
              <p className="bv-p">
                We&apos;re co-designing pilots with a small group of forward-thinking organizations. No self-serve pricing yet—
                this is about proving impact together.
              </p>
            </div>

            <div className="bv-grid3" style={{ marginTop: 16 }}>
              <div className="bv-card card">
                <div className="bv-cardTitle">Insurance Pilot</div>
                <div className="bv-cardDesc" style={{ marginTop: 8, marginBottom: 12 }}>
                  For regional health insurers and TPAs with urgent fraud and latency pain.
                </div>
                <div className="bv-list">
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Limited-scope API integration
                  </div>
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Joint ROI & fraud reduction study
                  </div>
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Preferential pricing on rollout
                  </div>
                </div>
                <div className="bv-priceSub" style={{ marginTop: 12 }}>
                  60–90 day co-designed pilots.
                </div>
                <button
                  type="button"
                  className="bv-btn bv-btn--ghost bv-btnFull"
                  style={{ marginTop: 12 }}
                  onClick={handleEarlyAccess}
                >
                  Explore insurance pilot
                </button>
              </div>

              <div className="bv-card card bv-card--featured">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div className="bv-cardTitle">Government Pilot</div>
                  <span className="bv-pop">Priority</span>
                </div>
                <div className="bv-cardDesc" style={{ marginTop: 8, marginBottom: 12 }}>
                  For municipal and state agencies with high verification volume.
                </div>
                <div className="bv-list">
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Document types scoped to your use case
                  </div>
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Citizen wait-time reduction focus
                  </div>
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Case study and impact report
                  </div>
                </div>
                <div className="bv-priceSub" style={{ marginTop: 12 }}>
                  We&apos;ll tailor it to your agency.
                </div>
                <button
                  type="button"
                  className="bv-btn bv-btn--primary bv-btnFull"
                  style={{ marginTop: 12 }}
                  onClick={handleEarlyAccess}
                >
                  Explore government pilot
                </button>
              </div>

              <div className="bv-card card">
                <div className="bv-cardTitle">Universities & Partners</div>
                <div className="bv-cardDesc" style={{ marginTop: 8, marginBottom: 12 }}>
                  For universities, HR platforms, and ecosystem partners.
                </div>
                <div className="bv-list">
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Credential verification for employers
                  </div>
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Revenue-sharing options for issuers
                  </div>
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Integration with HR / ATS tools
                  </div>
                </div>
                <div className="bv-priceSub" style={{ marginTop: 12 }}>
                  Flexible structure for early partners.
                </div>
                <button
                  type="button"
                  className="bv-btn bv-btn--ghost bv-btnFull"
                  style={{ marginTop: 12 }}
                  onClick={handleEarlyAccess}
                >
                  Discuss partnership
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="bv-section">
          <div className="bv-container">
            <div className="bv-sectionHead">
              <h2 className="bv-h2">Who we&apos;re talking to</h2>
              <p className="bv-p">
                BlockyVault is in pre-launch. We&apos;re currently speaking with teams that feel the verification pain every
                day.
              </p>
            </div>

            <div className="bv-grid3">
              <div className="bv-quote card">
                <p className="bv-quoteText">
                  Insurance leaders responsible for fraud detection and claims operations who are stuck with manual document
                  checks.
                </p>
                <div className="bv-quoteMeta">Health insurers & TPAs</div>
              </div>

              <div className="bv-quote card">
                <p className="bv-quoteText">
                  Public sector teams handling licenses, benefits, or records—and dealing with citizen complaints about long
                  waits.
                </p>
                <div className="bv-quoteMeta">Municipal & state agencies</div>
              </div>

              <div className="bv-quote card">
                <p className="bv-quoteText">
                  Universities and HR platforms that want to modernize credential verification for employers and lenders.
                </p>
                <div className="bv-quoteMeta">Universities & HR ecosystems</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bv-section" aria-label="Company links">
          <div className="bv-container">
            <div className="bv-sectionHead" style={{ marginBottom: 10 }}>
              <h2 className="bv-h2" style={{ marginBottom: 6 }}>
                Company
              </h2>
              <p className="bv-p" style={{ marginBottom: 0 }}>
                Learn more, explore the thesis, or reach out about pilots and investment.
              </p>
            </div>

            <div className="bv-grid4">
              <Link className="bv-card card" href="/about">
                <div className="bv-cardTitle">About BlockyVault</div>
                <div className="bv-cardDesc">The verification network we&apos;re building and why now.</div>
                <div className="bv-chipRow">
                  <span className="bv-chip">Story</span>
                  <span className="bv-chip">Vision</span>
                </div>
              </Link>

              <Link className="bv-card card" href="/team">
                <div className="bv-cardTitle">Team & Roles</div>
                <div className="bv-cardDesc">Who&apos;s behind BlockyVault and how to work with us.</div>
                <div className="bv-chipRow">
                  <span className="bv-chip">Engineering</span>
                  <span className="bv-chip">Go-to-market</span>
                </div>
              </Link>

              <Link className="bv-card card" href="/investors">
                <div className="bv-cardTitle">For Investors</div>
                <div className="bv-cardDesc">Access the investor overview and request a deeper brief.</div>
                <div className="bv-chipRow">
                  <span className="bv-chip">Thesis</span>
                  <span className="bv-chip">Roadmap</span>
                </div>
              </Link>

              <button type="button" className="bv-card card" onClick={handleEarlyAccess}>
                <div className="bv-cardTitle">Contact</div>
                <div className="bv-cardDesc">Pilots, partnerships, and investor conversations.</div>
                <div className="bv-chipRow">
                  <span className="bv-chip">Early access</span>
                  <span className="bv-chip">Investors</span>
                </div>
              </button>
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button type="button" className="bv-btn bv-btn--primary" onClick={handleEarlyAccess}>
                Join the pilot list
              </button>
              <button type="button" className="bv-btn bv-btn--ghost" onClick={handleEarlyAccess}>
                I&apos;m an investor
              </button>
            </div>

            <div className="bv-sub" style={{ marginTop: 10 }}>
              We&apos;re early and selective by design. If document verification is a daily headache for your team, we&apos;d
              love to hear from you.
            </div>
          </div>
        </section>

        <footer className="bv-footer">
          <div className="bv-container bv-footerInner">
            <span>© {year} BlockyVault</span>
            <span className="bv-footerRight" style={{ display: "inline-flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/about">About</Link>
              <Link href="/team">Team</Link>
              <Link href="/investors">Investors</Link>
              <button type="button" className="bv-linkBtn" onClick={handleEarlyAccess}>
                Contact
              </button>
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
