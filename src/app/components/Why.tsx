// src/app/components/Why.tsx
"use client";

type Props = {
  title?: string;
  subtitle?: string;
};

export default function Why({
  title = "Why BlockyVault",
  subtitle = "Security should feel simple, not intimidating.",
}: Props) {
  return (
    <section
      className="bv-section"
      style={{
        padding: "56px 0",
      }}
    >
      <div className="bv-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ maxWidth: 720 }}>
          <h2
            className="bv-h2"
            style={{
              fontSize: 28,
              lineHeight: 1.15,
              fontWeight: 800,
              margin: 0,
              color: "rgba(255,255,255,0.92)",
              letterSpacing: -0.2,
            }}
          >
            {title}
          </h2>

          <p
            style={{
              marginTop: 10,
              marginBottom: 0,
              fontSize: 16,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 620,
            }}
          >
            {subtitle}
          </p>
        </div>

        <div
          style={{
            marginTop: 22,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          <Card
            title="Built for clarity"
            body="No clutter. No unnecessary features. Just a clean vault that helps you stay organized and in control."
          />
          <Card
            title="Security you can understand"
            body="Strong protection without forcing you to think like a security engineer."
          />
          <Card
            title="Designed to grow with you"
            body="From personal use to teams — BlockyVault scales without changing who it’s for."
          />
        </div>

        {/* Mobile layout */}
        <style jsx>{`
          @media (max-width: 920px) {
            section :global(.bv-container) {
              padding: 0 16px !important;
            }
            section > div > div:nth-child(2) {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div
      style={{
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.04)",
        padding: 16,
        boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
        backdropFilter: "blur(10px)",
        minHeight: 132,
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: 16,
          fontWeight: 800,
          color: "rgba(255,255,255,0.92)",
          letterSpacing: -0.1,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          marginTop: 8,
          marginBottom: 0,
          fontSize: 14,
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.70)",
        }}
      >
        {body}
      </p>
    </div>
  );
}
