import "./globals.css";
import LayoutShell from "./components/LayoutShell";
import { AuthModalProvider } from "./components/auth/AuthModalProvider";

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
