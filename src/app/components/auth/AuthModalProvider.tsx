"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import AuthModal from "../AuthModal";

type AuthMode = "signin" | "create";

type AuthModalContextValue = {
  openAuthModal: (mode?: AuthMode) => void;
  closeAuthModal: () => void;
  signedEmail: string;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("create");
  const [signedEmail, setSignedEmail] = useState<string>("");

  const openAuthModal = useCallback((mode: AuthMode = "create") => {
    setAuthMode(mode);
    setAuthOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => setAuthOpen(false), []);

  const value = useMemo(
    () => ({ openAuthModal, closeAuthModal, signedEmail }),
    [openAuthModal, closeAuthModal, signedEmail]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}

      {/* 1 sola instancia global */}
      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={closeAuthModal}
        onWaitlisted={(email) => setSignedEmail(email)}
      />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within <AuthModalProvider />");
  return ctx;
}
