"use client";

import Nav from "./Nav";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="bv-main">{children}</main>
    </>
  );
}
