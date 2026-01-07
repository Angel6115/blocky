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
            <span>Private Preview — limited onboarding for teams</span>
          </div>

          <h1 className="bv-h1">Verifiable security, built for humans.</h1>

          <p className="bv-lead">
            BlockyVault is a modern vault for passwords, notes, keys, and files—designed to stay clean, fast, and
            team-ready. We pair privacy-first encryption with proof-based security layers, so trust is something you can
            verify—not just assume.
          </p>

          <div className="bv-cta">
            <button className="bv-btn bv-btn--primary" type="button" onClick={onRequestAccess}>
              Request early access
            </button>
            <a className="bv-btn" href="#why">
              See how it works
            </a>
          </div>

          <div className="bv-sub">
            Private Preview: join the waitlist to get early access, product updates, and priority onboarding as we expand.
          </div>
        </div>

        {/* Right visual */}
        <div className="bv-hero__visual">
          <div className="bv-orb" aria-hidden="true" />
          <div className="bv-heroPhoneWrap">
            <Image
              src="/brand/iphoneblocky.png"
              alt="BlockyVault iPhone preview"
              width={640}
              height={640}
              priority
              className="bv-heroPhone"
            />
          </div>
        </div>
      </div>

      {/* Bottom “tagline strip” */}
      <div className="bv-container">
        <div className="bv-strip card">
          <span>Fast</span>
          <span>Private</span>
          <span>Readable</span>
          <span>Verifiable</span>
          <span>Team-ready</span>
          <span>Minimal</span>
          <span>Audit-friendly</span>
        </div>
      </div>
    </section>
  );
}
