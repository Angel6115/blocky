import "./globals.css";
import LayoutShell from "./components/LayoutShell";
import { AuthModalProvider } from "./components/auth/AuthModalProvider";

export const metadata = {
  icons: {
    icon: "/favicon.svg",            // navegador moderno
    shortcut: "/favicon.png",        // fallback (opcional si lo subes luego)
    apple: "/favicon.png",           // iOS Safari (opcional si lo subes luego)
  },
  title: "BlockyVault",
  description: "Verifiable security, built for humans.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthModalProvider>
          <LayoutShell>{children}</LayoutShell>
        </AuthModalProvider>
      </body>
    </html>
  );
}
