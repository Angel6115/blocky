import React from "react";
import "./globals.css";
import AppShell from "./components/AppShell";

export const metadata = {
  title: "BlockyVault — Verifiable Security Built for Humans",
  description:
    "BlockyVault is a modern vault focused on clarity, privacy, and verifiable trust. Designed for teams that demand security that feels simple.",
  metadataBase: new URL("https://www.blockyvault.com"),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "BlockyVault — Verifiable Security Built for Humans",
    description:
      "Modern security vault with proof-based integrity, adaptive intelligence, and human-first design.",
    url: "https://www.blockyvault.com",
    siteName: "BlockyVault",
    images: [
      {
        url: "/brand/og-cover.png",
        width: 1200,
        height: 630,
        alt: "BlockyVault OG Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlockyVault — Verifiable Security Built for Humans",
    description:
      "BlockyVault is a modern vault focused on clarity, privacy, and verifiable trust.",
    images: ["/brand/og-cover.png"],
  },
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
