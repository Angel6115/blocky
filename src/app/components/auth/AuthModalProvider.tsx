"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import AuthModal from "./AuthModal";  // ← Ahora usa el modal optimizado en auth/

type AuthModalContextValue = {
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [authOpen, setAuthOpen] = useState(false);

  const openAuthModal = useCallback(() => {
    setAuthOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => setAuthOpen(false), []);

  const value = useMemo(
    () => ({ openAuthModal, closeAuthModal }),
    [openAuthModal, closeAuthModal]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}

      {/* Modal optimizado (customer/investor/career) */}
      <AuthModal open={authOpen} onClose={closeAuthModal} />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within <AuthModalProvider />");
  return ctx;
}
