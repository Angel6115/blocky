// src/app/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Hero from "./components/Hero";
import ProductModal from "./components/ProductModal";

type ModalData = {
  title: string;
  desc: string;
  bullets: string[];
  chips: string[];
};

type Billing = "monthly" | "yearly";

export default function Home() {
  const year = new Date().getFullYear();

  // -----------------------------
  // Product modal (Home only)
  // -----------------------------
  const productItems = useMemo<ModalData[]>(
    () => [
      {
        title: "Encrypted Vault",
        desc: "Passwords, notes, keys, and files—organized and protected.",
        bullets: ["Client-side encryption options", "Clean structure for teams", "Secure sharing controls"],
        chips: ["AES-256", "Zero-trust", "Key management"],
      },
      {
        title: "Fast Search",
        desc: "Find what you need instantly with clean structure and tags.",
        bullets: ["Smart filters & tags", "Readable structure", "Instant access"],
        chips: ["Smart filters", "Tags", "Quick find"],
      },
      {
        title: "Sharing Controls",
        desc: "Invite teammates safely with granular access permissions.",
        bullets: ["Role-based access", "Granular permissions", "Safe invites & revocation"],
        chips: ["Roles", "Permissions", "Invites"],
      },
      {
        title: "Export Anytime",
        desc: "Portable backups when you need them—no lock-in anxiety.",
        bullets: ["Export critical records", "Keep portability", "Compliance-friendly"],
        chips: ["CSV", "PDF", "JSON"],
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

  // -----------------------------
  // Pricing toggle
  // -----------------------------
  const [billing, setBilling] = useState<Billing>("monthly");
  const isYearly = billing === "yearly";

  const starterMonthly = 9;
  const teamMonthly = 29;
  const starterYearly = starterMonthly * 10; // 2 months free
  const teamYearly = teamMonthly * 10;

  const displayStarter = isYearly ? starterYearly : starterMonthly;
  const displayTeam = isYearly ? teamYearly : teamMonthly;
  const starterUnit = isYearly ? "/yr" : "/mo";
  const teamUnit = isYearly ? "/yr" : "/mo";

  return (
    <div id="top">
      <main>
        {/* Hero: por ahora CTA va a Contact para canalizar early access */}
        <Hero onRequestAccess={() => (window.location.href = "/contact")} />

        {/* Why BlockyVault is different */}
        <section id="why" className="bv-section bv-why">
          <div className="bv-container">
            <div className="bv-sectionHead">
              <h2 className="bv-h2">Why BlockyVault is different</h2>
              <p className="bv-p">
                Most vaults store secrets. BlockyVault builds <strong>verifiable trust</strong> and uses{" "}
                <strong>adaptive intelligence</strong> to prevent risk before it becomes a breach.
              </p>
            </div>

            <div className="bv-whyGrid">
              <div className="bv-whyCard card">
                <div className="bv-whyTop">
                  <div className="bv-miniIcon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2l1.4 4.6L18 8l-4.6 1.4L12 14l-1.4-4.6L6 8l4.6-1.4L12 2Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 14l.9 2.9L9 18l-3.1 1.1L5 22l-.9-2.9L1 18l3.1-1.1L5 14Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18 13l.9 2.9L22 17l-3.1 1.1L18 21l-.9-2.9L14 17l3.1-1.1L18 13Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="bv-cardTitle">Adaptive Intelligence</h3>
                </div>

                <p className="bv-cardDesc">
                  Security that learns how your team works—spotting risky patterns, reducing mistakes, and recommending
                  safer actions in real time.
                </p>

                <div className="bv-chipRow">
                  <span className="bv-chip">Risk signals</span>
                  <span className="bv-chip">Smart prompts</span>
                  <span className="bv-chip">Context-aware</span>
                </div>
              </div>

              <div className="bv-whyCard card bv-whyCard--featured">
                <div className="bv-whyTop">
                  <div className="bv-miniIcon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2L20 6V12C20 17 16.7 20.7 12 22C7.3 20.7 4 17 4 12V6L12 2Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.5 12.2L11.2 14L14.8 10.2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="bv-cardTitle">Cryptographic Proof</h3>
                </div>

                <p className="bv-cardDesc">
                  Every sensitive action creates a verifiable record. That means trust you can prove—ideal for audits,
                  compliance, and high-stakes teams.
                </p>

                <div className="bv-chipRow">
                  <span className="bv-chip">Tamper-evident</span>
                  <span className="bv-chip">Verifiable logs</span>
                  <span className="bv-chip">Audit-ready</span>
                </div>
              </div>

              <div className="bv-whyCard card">
                <div className="bv-whyTop">
                  <div className="bv-miniIcon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 12.5C14 12.5 15.6 10.9 15.6 8.9C15.6 6.9 14 5.3 12 5.3C10 5.3 8.4 6.9 8.4 8.9C8.4 10.9 10 12.5 12 12.5Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M6 20.5C6.7 17.7 9.1 15.8 12 15.8C14.9 15.8 17.3 17.7 18 20.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path d="M20.5 7.5H18.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M20.5 11H17.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="bv-cardTitle">Human-First Security</h3>
                </div>

                <p className="bv-cardDesc">
                  Minimal UI built to reduce friction and confusion—so teams stay consistent, fast, and protected without
                  security fatigue.
                </p>

                <div className="bv-chipRow">
                  <span className="bv-chip">Low friction</span>
                  <span className="bv-chip">Clear permissions</span>
                  <span className="bv-chip">Fewer errors</span>
                </div>
              </div>
            </div>

            <div className="bv-whyCta card">
              <div className="bv-whyCta__left">
                <div className="bv-whyCta__title">Built for teams that need provable security.</div>
                <div className="bv-whyCta__sub">Join the Private Preview and get priority onboarding as we expand access.</div>
              </div>
              <div className="bv-whyCta__right">
                <Link className="bv-btn bv-btn--primary" href="/contact">
                  Request early access
                </Link>
                <a className="bv-btn bv-btn--ghost" href="#pricing">
                  See pricing
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Product */}
        <section id="product" className="bv-section">
          <div className="bv-container">
            <div className="bv-sectionHead">
              <h2 className="bv-h2">Product</h2>
              <p className="bv-p">Everything you need to store and control sensitive information—without clutter.</p>
            </div>

            <div className="bv-grid4">
              <button className="bv-card" type="button" onClick={() => openProductModal(productItems[0])}>
                <div className="bv-cardTop">
                  <div className="bv-miniIcon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 11V8.5C7 5.46 9.46 3 12.5 3C15.54 3 18 5.46 18 8.5V11"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6.5 11H18.5C19.6 11 20.5 11.9 20.5 13V19C20.5 20.1 19.6 21 18.5 21H6.5C5.4 21 4.5 20.1 4.5 19V13C4.5 11.9 5.4 11 6.5 11Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path d="M12.5 15V17.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="bv-cardTitle">Encrypted Vault</h3>
                </div>

                <div className="bv-cardDesc">Passwords, notes, keys, and files—organized and protected.</div>

                <div className="bv-chipRow">
                  <span className="bv-chip">AES-256</span>
                  <span className="bv-chip">Zero-trust</span>
                </div>
              </button>

              <button className="bv-card" type="button" onClick={() => openProductModal(productItems[1])}>
                <div className="bv-cardTop">
                  <div className="bv-miniIcon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M10.5 18C14.09 18 17 15.09 17 11.5C17 7.91 14.09 5 10.5 5C6.91 5 4 7.91 4 11.5C4 15.09 6.91 18 10.5 18Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path d="M20 20L16.8 16.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="bv-cardTitle">Fast Search</h3>
                </div>

                <div className="bv-cardDesc">Find what you need instantly with clean structure and tags.</div>

                <div className="bv-chipRow">
                  <span className="bv-chip">Smart filters</span>
                  <span className="bv-chip">Tags</span>
                </div>
              </button>

              <button className="bv-card" type="button" onClick={() => openProductModal(productItems[2])}>
                <div className="bv-cardTop">
                  <div className="bv-miniIcon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M16.5 21C16.5 18.79 14.04 17 11 17C7.96 17 5.5 18.79 5.5 21"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11 14C12.93 14 14.5 12.43 14.5 10.5C14.5 8.57 12.93 7 11 7C9.07 7 7.5 8.57 7.5 10.5C7.5 12.43 9.07 14 11 14Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M18.5 21C18.5 19.7 17.55 18.57 16.1 18.04"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M15.8 7.35C16.6 7.86 17.1 8.77 17.1 9.8C17.1 10.83 16.6 11.74 15.8 12.25"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h3 className="bv-cardTitle">Sharing Controls</h3>
                </div>

                <div className="bv-cardDesc">Invite teammates safely with granular access permissions.</div>

                <div className="bv-chipRow">
                  <span className="bv-chip">Roles</span>
                  <span className="bv-chip">Permissions</span>
                </div>
              </button>

              <button className="bv-card" type="button" onClick={() => openProductModal(productItems[3])}>
                <div className="bv-cardTop">
                  <div className="bv-miniIcon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 3V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path
                        d="M8 10L12 14L16 10"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M5 21H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="bv-cardTitle">Export Anytime</h3>
                </div>

                <div className="bv-cardDesc">Portable backups when you need them—no lock-in anxiety.</div>

                <div className="bv-chipRow">
                  <span className="bv-chip">CSV</span>
                  <span className="bv-chip">PDF</span>
                  <span className="bv-chip">JSON</span>
                </div>
              </button>
            </div>
          </div>
        </section>

        <ProductModal open={openProduct} onClose={closeProductModal} data={productData} />

        {/* Pricing */}
        <section id="pricing" className="bv-section">
          <div className="bv-container">
            <div className="bv-pricingHeadRow">
              <div className="bv-sectionHead" style={{ marginBottom: 0 }}>
                <h2 className="bv-h2">Pricing</h2>
                <p className="bv-p">Start small. Upgrade when your team grows.</p>
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <span className="bv-saveBadge">2 months free yearly</span>

                <div className="bv-toggle" role="tablist" aria-label="Billing period">
                  <button
                    type="button"
                    className={billing === "monthly" ? "bv-toggleBtn bv-toggleBtn--active" : "bv-toggleBtn"}
                    onClick={() => setBilling("monthly")}
                    aria-pressed={billing === "monthly"}
                  >
                    Monthly
                  </button>

                  <button
                    type="button"
                    className={billing === "yearly" ? "bv-toggleBtn bv-toggleBtn--active" : "bv-toggleBtn"}
                    onClick={() => setBilling("yearly")}
                    aria-pressed={billing === "yearly"}
                  >
                    Yearly
                  </button>
                </div>
              </div>
            </div>

            <div className="bv-grid3" style={{ marginTop: 16 }}>
              <div className="bv-card card">
                <div className="bv-priceTop">
                  <div className="bv-cardTitle">Starter</div>
                  <div className="bv-price">
                    <span className="bv-priceVal">${displayStarter}</span>
                    <span className="bv-priceUnit">{starterUnit}</span>
                  </div>
                </div>

                <div className="bv-cardDesc">For individuals & solo founders.</div>

                <div className="bv-list">
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Personal vault
                  </div>
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Secure notes & passwords
                  </div>
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Basic export
                  </div>
                </div>

                <div className="bv-priceSub">{isYearly ? "Billed annually." : "Billed monthly."}</div>

                <Link className="bv-btn bv-btn--ghost bv-btnFull" href="/contact">
                  Choose Starter
                </Link>
              </div>

              <div className="bv-card card bv-card--featured">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                  <div className="bv-priceTop" style={{ marginBottom: 0 }}>
                    <div className="bv-cardTitle">Team</div>
                    <div className="bv-price">
                      <span className="bv-priceVal">${displayTeam}</span>
                      <span className="bv-priceUnit">{teamUnit}</span>
                    </div>
                  </div>
                  <span className="bv-pop">Most popular</span>
                </div>

                <div className="bv-cardDesc">For small teams that need controls & auditability.</div>

                <div className="bv-list">
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Shared vaults
                  </div>
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Roles & permissions
                  </div>
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Audit trails
                  </div>
                </div>

                <div className="bv-priceSub">
                  {isYearly ? "Billed annually. Includes priority onboarding." : "Billed monthly. Upgrade anytime."}
                </div>

                <Link className="bv-btn bv-btn--primary bv-btnFull" href="/contact">
                  Choose Team
                </Link>
              </div>

              <div className="bv-card card">
                <div className="bv-priceTop">
                  <div className="bv-cardTitle">Enterprise</div>
                  <div className="bv-price">
                    <span className="bv-priceVal">Let’s talk</span>
                  </div>
                </div>

                <div className="bv-cardDesc">Custom policies, onboarding, and compliance support.</div>

                <div className="bv-list">
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    SSO / SAML
                  </div>
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Custom retention policies
                  </div>
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Dedicated support
                  </div>
                </div>

                <div className="bv-priceSub">We’ll tailor it to your requirements.</div>

                <Link className="bv-btn bv-btn--ghost bv-btnFull" href="/contact">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="bv-section">
          <div className="bv-container">
            <div className="bv-sectionHead">
              <h2 className="bv-h2">Testimonials</h2>
              <p className="bv-p">What teams say after switching to clarity.</p>
            </div>

            <div className="bv-grid3">
              <div className="bv-quote card">
                <p className="bv-quoteText">“Finally a vault that feels premium and clean. Our team adopted it instantly.”</p>
                <div className="bv-quoteMeta">— Ops Lead</div>
              </div>

              <div className="bv-quote card">
                <p className="bv-quoteText">“The UI is minimal but powerful. It actually reduces errors in our workflow.”</p>
                <div className="bv-quoteMeta">— Security Manager</div>
              </div>

              <div className="bv-quote card">
                <p className="bv-quoteText">“Audit trails + sharing controls = trust. This is what we needed.”</p>
                <div className="bv-quoteMeta">— Founder</div>
              </div>
            </div>
          </div>
        </section>

        {/* Company / Links */}
        <section className="bv-section" aria-label="Company links">
          <div className="bv-container">
            <div className="bv-sectionHead" style={{ marginBottom: 10 }}>
              <h2 className="bv-h2" style={{ marginBottom: 6 }}>
                Company
              </h2>
              <p className="bv-p" style={{ marginBottom: 0 }}>
                Learn more, reach us, or explore opportunities.
              </p>
            </div>

            <div className="bv-grid4">
              <Link className="bv-card card" href="/about">
                <div className="bv-cardTitle">About Us</div>
                <div className="bv-cardDesc">Mission, why we exist, and what we’re building.</div>
                <div className="bv-chipRow">
                  <span className="bv-chip">Story</span>
                  <span className="bv-chip">Vision</span>
                </div>
              </Link>

              <Link className="bv-card card" href="/team">
                <div className="bv-cardTitle">Join Our Team</div>
                <div className="bv-cardDesc">Open roles and how to collaborate with us.</div>
                <div className="bv-chipRow">
                  <span className="bv-chip">Engineering</span>
                  <span className="bv-chip">Design</span>
                </div>
              </Link>

              <Link className="bv-card card" href="/investors">
                <div className="bv-cardTitle">Welcome Investors</div>
                <div className="bv-cardDesc">Investor overview and how to request a brief.</div>
                <div className="bv-chipRow">
                  <span className="bv-chip">Deck</span>
                  <span className="bv-chip">Roadmap</span>
                </div>
              </Link>

              <Link className="bv-card card" href="/contact">
                <div className="bv-cardTitle">Contact Us</div>
                <div className="bv-cardDesc">Early access, partnerships, and support.</div>
                <div className="bv-chipRow">
                  <span className="bv-chip">Email</span>
                  <span className="bv-chip">Preview</span>
                </div>
              </Link>
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="bv-btn bv-btn--primary" href="/contact">
                Request early access
              </Link>
              <Link className="bv-btn bv-btn--ghost" href="/contact">
                Contact us
              </Link>
            </div>

            <div className="bv-sub" style={{ marginTop: 10 }}>
              Short AI note: We focus on reducing risk and human error—without turning your vault into noise.
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
              <Link href="/contact">Contact</Link>
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
