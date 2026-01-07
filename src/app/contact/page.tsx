// src/app/contact/page.tsx
import Link from "next/link";

export default function ContactPage() {
  return (
    <main>
      <section className="bv-section">
        <div className="bv-container">
          <div className="bv-sectionHead">
            <h1 className="bv-h2">Contact Us</h1>
            <p className="bv-p">
              Want early access, a partnership conversation, or an investor brief? Reach out and we’ll route it to the
              right place.
            </p>
          </div>

          <div className="bv-grid2">
            <div className="bv-card card">
              <div className="bv-cardTitle">Email</div>
              <div className="bv-cardDesc">
                Use your new domain inboxes. Recommended:
                <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
                  <div>
                    <span className="bv-chip">info@blockyvault.com</span> — general
                  </div>
                  <div>
                    <span className="bv-chip">admin@blockyvault.com</span> — operations
                  </div>
                  <div>
                    <span className="bv-chip">investors@blockyvault.com</span> — investors
                  </div>
                </div>
              </div>
            </div>

            <div className="bv-card card">
              <div className="bv-cardTitle">What to include</div>
              <div className="bv-cardDesc">
                To get a fast response, include:
                <div className="bv-list" style={{ marginTop: 10 }}>
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Who you are / your org
                  </div>
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    What you need (preview, partnership, investor)
                  </div>
                  <div className="bv-li">
                    <span className="bv-liDot" />
                    Timeline and context
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bv-card card" style={{ marginTop: 16 }}>
            <div className="bv-cardTitle">Private Preview</div>
            <div className="bv-cardDesc">
              We’re onboarding in waves. If you’re in healthcare / compliance / regulated environments, mention it in
              your message—we prioritize high-trust teams.
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="bv-btn bv-btn--primary" href="/">
                Back to Home
              </Link>
              <Link className="bv-btn" href="/about">
                About
              </Link>
              <Link className="bv-btn bv-btn--ghost" href="/team">
                Join our team
              </Link>
            </div>
          </div>

          <div className="bv-sub" style={{ marginTop: 12 }}>
            Short AI note: We keep communications minimal—no spam, no noise, just clear onboarding steps.
          </div>
        </div>
      </section>
    </main>
  );
}
