"use client";

import { useEffect, useRef } from "react";

type ModalData = {
  title: string;
  desc: string;
  bullets: string[];
  chips: string[];
};

export default function ProductModal({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: ModalData | null;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // opcional: trap focus mínimo (tab dentro del modal)
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // focus al abrir
    setTimeout(() => {
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !data) return null;

  return (
    <div className="bv-modalBackdrop" role="presentation" onMouseDown={onClose}>
      {/* Panel */}
      <div
        ref={panelRef}
        className="bv-modal card"
        role="dialog"
        aria-modal="true"
        aria-label={data.title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="bv-modalHead">
          <div>
            <div className="bv-modalTitle">{data.title}</div>
            <div className="bv-modalDesc">{data.desc}</div>
          </div>

          <button type="button" className="bv-modalClose" onClick={onClose} aria-label="Close">
            Close
          </button>
        </div>

        <div className="bv-modalBody">
          <div className="bv-modalBullets">
            {data.bullets.map((b) => (
              <div key={b} className="bv-modalBullet">
                <span className="bv-bulletDot" aria-hidden="true" />
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div className="bv-modalChips">
            {data.chips.map((c) => (
              <span key={c} className="bv-chip">
                {c}
              </span>
            ))}
          </div>

          <div className="bv-modalCta">
            <a className="bv-btn bv-btn--primary" href="#get-started" onClick={onClose}>
              Get started
            </a>
            <a className="bv-btn" href="#security" onClick={onClose}>
              See security details
            </a>
          </div>

          <div className="bv-modalHint">
            Tip: press <span className="bv-kbd">Esc</span> to close.
          </div>
        </div>
      </div>
    </div>
  );
}
