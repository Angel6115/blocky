"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LayoutShell from "./LayoutShell";
import { AuthModalProvider } from "./auth/AuthModalProvider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  // Mostrar SIEMPRE el splash ~2 segundos en cada carga
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* App real */}
      <AuthModalProvider>
        <LayoutShell>{children}</LayoutShell>
      </AuthModalProvider>

      {/* Splash overlay */}
      {showSplash && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "radial-gradient(circle at 20% 0%, #1C1240 0, #05030F 45%, #020109 100%)",
            pointerEvents: "auto",
          }}
        >
          <div
  style={{
    position: "relative",
    width: "min(440px, 100vw)",  // antes 260px
    height: "min(820px, 260vw)", // antes 520px
    filter: "drop-shadow(0 24px 70px rgba(0,0,0,0.9))",
    animation: "bv-splash-float 3.6s ease-out forwards", // alargamos animación también
  }}
>
            <Image
              src="/brand/iphoneblocky.png" // 👈 ruta corregida (sin guion)
              alt="BlockyVault verification API dashboard"
              fill
              priority
              sizes="360px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
