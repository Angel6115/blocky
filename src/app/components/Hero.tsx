import Image from "next/image";

type Props = {
  onRequestAccess: () => void;
};

export default function Hero({ onRequestAccess }: Props) {
  return (
    <section className="bv-hero">
      <div className="bv-container bv-hero__grid">
        {/* Left copy */}
        <div className="bv-hero__copy">
          <div className="bv-pill">
            <span className="bv-pill__dot" />
            <span>2026 Pilot Program — 10 slots for high-impact organizations</span>
          </div>

          <h1 className="bv-h1">Verification Network for Insurers, Governments, and Universities</h1>

          <p className="bv-lead">
            BlockyVault turns 3–7 day manual document checks into a 2-second API call. Verify insurance claims, 
            government certificates, and academic credentials instantly—with cryptographic proof for audits and 
            fraud investigations.
          </p>

          <div className="bv-cta">
            <button className="bv-btn bv-btn--primary" type="button" onClick={onRequestAccess}>
              Join 2026 pilot list
            </button>
            <a className="bv-btn" href="#why">
              See how it works
            </a>
          </div>

          <div className="bv-sub">
            Pre-launch: We&apos;re selecting 10 organizations with urgent verification pain in healthcare, government, 
            or education. Priority for teams processing 1,000+ documents monthly.
          </div>
        </div>

        {/* Right visual */}
        <div className="bv-hero__visual">
          <div className="bv-orb" aria-hidden="true" />
          <div className="bv-heroPhoneWrap">
            <Image
              src="/brand/iphoneblocky.png"
              alt="BlockyVault verification API dashboard"
              width={640}
              height={640}
              priority
              className="bv-heroPhone"
            />
          </div>
        </div>
      </div>

      {/* Bottom "tagline strip" */}
      <div className="bv-container">
        <div className="bv-strip card">
          <span>API-first</span>
          <span>2-second verification</span>
          <span>Blockchain proof</span>
          <span>Healthcare</span>
          <span>Government</span>
          <span>Universities</span>
          <span>Audit-ready</span>
        </div>
      </div>
    </section>
  );
}
