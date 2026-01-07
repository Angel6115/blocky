"use client";

import React, { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AuthModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="bv-modal__overlay"
      onMouseDown={(e) => {
        // click fuera para cerrar
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bv-modal__panel">
        <div className="bv-modal__header">
          <h2 className="bv-modal__title">Request early access</h2>
          <button className="bv-icon-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <p className="bv-modal__sub">
          Leave your email and we’ll invite you when onboarding opens.
        </p>

        <form
          className="bv-modal__form"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: conectar endpoint / supabase / resend / etc.
            onClose();
          }}
        >
          <label className="bv-field">
            <span>Email</span>
            <input type="email" name="email" required placeholder="you@company.com" />
          </label>

          <label className="bv-field">
            <span>Company (optional)</span>
            <input type="text" name="company" placeholder="BlockyVault Inc." />
          </label>

          <div className="bv-modal__actions">
            <button type="button" className="bv-btn bv-btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bv-btn">
              Request access
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
