// src/app/components/Nav.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthModal } from "./auth/AuthModalProvider";

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Modal global
  const { openAuthModal } = useAuthModal();

  // (por ahora) dejamos signedEmail apagado hasta conectar auth real
  const signedEmail: string | undefined = undefined;

  // Cierra el menú si cambias a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 980) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Evita scroll del body cuando el menú está abierto
  useEffect(() => {
    if (open) document.body.classList.add("bv-noScroll");
    else document.body.classList.remove("bv-noScroll");
  }, [open]);

  const close = () => setOpen(false);

  const handleOpenAuth = () => {
    close(); // cierra drawer si está abierto
    openAuthModal(); // abre modal global
  };

  return (
    <header className="bv-nav">
      <div className="bv-container bv-nav__inner">
        {/* Brand */}
        <Link className="bv-brand" href="/" aria-label="BlockyVault home" onClick={close}>
          <span className="bv-brand__mark" aria-hidden="true">
            <img
              src="/brand/logo-mark.svg"
              alt=""
              width={80}
              height={80}
              className="bv-brand__logo"
              draggable={false}
            />
          </span>

          <span className="bv-brand__word">BlockyVault</span>
          <span className="bv-brand__tag">Private Preview</span>
        </Link>

        {/* Desktop links */}
        <nav className="bv-nav__links" aria-label="Primary navigation">
          <Link href="/#why">Why</Link>
          <Link href="/#product">Product</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/#testimonials">Testimonials</Link>
          <Link href="/about">About</Link>
          <Link href="/team">Team</Link>
          <Link href="/investors">Investors</Link>

          {/* ✅ Keep funnel: open Neon modal */}
          <button type="button" className="bv-linkBtn" onClick={handleOpenAuth}>
            Contact
          </button>
        </nav>

        {/* Desktop actions */}
        <div className="bv-nav__actions">
          <button type="button" className="bv-btn bv-btn--ghost" onClick={handleOpenAuth}>
            Sign in
          </button>
          <button type="button" className="bv-btn bv-btn--primary" onClick={handleOpenAuth}>
            Request early access
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="bv-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={open ? "bv-drawer bv-drawer--open" : "bv-drawer"} hidden={!open}>
        <div className="bv-drawer__panel">
          <div className="bv-drawer__top">
            <span className="bv-drawer__title">Menu</span>
            <button type="button" className="bv-drawer__close" onClick={close} aria-label="Close menu">
              ✕
            </button>
          </div>

          <div className="bv-drawer__links">
            <Link href="/#why" onClick={close}>
              Why
            </Link>
            <Link href="/#product" onClick={close}>
              Product
            </Link>
            <Link href="/#pricing" onClick={close}>
              Pricing
            </Link>
            <Link href="/#testimonials" onClick={close}>
              Testimonials
            </Link>
            <Link href="/about" onClick={close}>
              About
            </Link>
            <Link href="/team" onClick={close}>
              Team
            </Link>
            <Link href="/investors" onClick={close}>
              Investors
            </Link>

            {/* ✅ Keep funnel: open Neon modal */}
            <button type="button" className="bv-linkBtn" onClick={handleOpenAuth}>
              Contact
            </button>
          </div>

          <div className="bv-drawer__actions">
            <button type="button" className="bv-btn bv-btn--ghost bv-btnFull" onClick={handleOpenAuth}>
              Sign in
            </button>
            <button type="button" className="bv-btn bv-btn--primary bv-btnFull" onClick={handleOpenAuth}>
              Request early access
            </button>
          </div>

          {signedEmail ? (
            <div className="bv-drawer__signed">
              Signed in as <strong>{signedEmail}</strong>
            </div>
          ) : null}
        </div>

        <button className="bv-drawer__backdrop" aria-label="Close menu backdrop" onClick={close} />
      </div>

      {/* Signed strip (desktop) */}
      {signedEmail ? (
        <div className="bv-container" style={{ paddingBottom: 10 }}>
          <div className="bv-strip card" style={{ justifyContent: "space-between" }}>
            <span>Signed in as {signedEmail}</span>
            <span>Private Preview • Limited onboarding</span>
          </div>
        </div>
      ) : null}
    </header>
  );
}
