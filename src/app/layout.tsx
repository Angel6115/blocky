import React from "react";
import "./globals.css";
import AppShell from "./components/AppShell";


export const metadata = {
  title: "BlockyVault — Verification Network for Insurers, Governments & Universities",
  description:
    "API infrastructure that turns 3-7 day manual document verification into 2-second calls. Built for healthcare insurers, government agencies, and universities. Blockchain-backed proof for audits and fraud prevention.",
  metadataBase: new URL("https://www.blockyvault.com"),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "BlockyVault — Verification Network for Insurers, Governments & Universities",
    description:
      "Replace manual document checks with a 2-second verification API. Cryptographic proof for insurance claims, government certificates, and academic credentials.",
    url: "https://www.blockyvault.com",
    siteName: "BlockyVault",
    images: [
      {
        url: "/brand/og-cover.png",
        width: 1200,
        height: 630,
        alt: "BlockyVault - Document Verification API Infrastructure",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlockyVault — Verification API for Enterprise Document Trust",
    description:
      "API infrastructure replacing manual verification with 2-second cryptographic proof. For insurers, government, and universities.",
    images: ["/brand/og-cover.png"],
  },
  keywords: [
    "document verification API",
    "healthcare fraud prevention",
    "insurance claims verification",
    "government document authentication",
    "credential verification",
    "blockchain proof",
    "enterprise verification",
    "fraud detection API",
  ],
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
