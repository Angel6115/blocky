"use client";

import { useEffect, useId, useMemo, useState } from "react";

type Mode = "signin" | "create";
type Step = "email" | "verify" | "done";

type Props = {
  open: boolean;
  mode: Mode;
  onClose: () => void;
  onWaitlisted: (email: string) => void;
};

export default function AuthModal({ open, mode, onClose, onWaitlisted }: Props) {
  const titleId = useId();

  const [activeMode, setActiveMode] = useState<Mode>(mode);
  const [step, setStep] = useState<Step>("email");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Used to show inline required-field feedback
  const [touched, setTouched] = useState(false);

  // Honeypot (bots will often fill it)
  const [website, setWebsite] = useState("");

  const isValidEmail = useMemo(() => {
    const e = email.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }, [email]);

  const canContinue = useMemo(() => {
    if (!isValidEmail) return false;

    if (activeMode === "create") {
      if (!fullName.trim()) return false;
      if (!phone.trim()) return false;
      if (!accepted) return false;
    }

    return true;
  }, [isValidEmail, activeMode, accepted, fullName, phone]);

  const showErrors = touched && activeMode === "create" && step === "email";
  const fullNameError = showErrors && !fullName.trim();
  const phoneError = showErrors && !phone.trim();
  const emailError = showErrors && !isValidEmail;
  const termsError = showErrors && !accepted;

  // Sync external mode when modal opens
  useEffect(() => {
    if (!open) return;

    setActiveMode(mode);
    setStep("email");
    setMsg(null);
    setLoading(false);
    setTouched(false);

    // reset terms + honeypot each time create is opened
    if (mode === "create") setAccepted(false);
    setWebsite("");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, mode, onClose]);

  const markTouched = () => {
    // Only show errors for create mode on the email step
    if (activeMode === "create" && step === "email") setTouched(true);
  };

  const goVerify = async () => {
    // If button is enabled, we can still mark touched for consistency
    markTouched();

    if (!canContinue) {
      setMsg("Please complete the required fields to continue.");
      return;
    }

    setLoading(true);
    setMsg(null);

    // Demo: simulate link send (UI only)
    await new Promise((r) => setTimeout(r, 650));

    setLoading(false);
    setStep("verify");

    const e = email.trim();
    const isCreate = activeMode === "create";

    const nameLine = isCreate && fullName.trim() ? `Thanks, ${fullName.trim()}. ` : "";
    const companyLine = isCreate && company.trim() ? `Company: ${company.trim()}. ` : "";

    setMsg(
      isCreate
        ? `${nameLine}${companyLine}You’re joining the Private Preview waitlist. We sent a verification link to ${e}. (Demo) Click “I verified” to complete your request.`
        : `We sent a secure sign-in link to ${e}. (Demo) Click “I verified” to continue.`
    );
  };

  // ✅ Real insert for waitlist (Neon) when mode=create
  const insertWaitlist = async () => {
    // Honeypot check (silent success to avoid tipping bots)
    if (website.trim()) {
      return; // do nothing (pretend success)
    }

    const e = email.trim().toLowerCase();
    const c = company.trim();

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: e,
        company: c || null,
        fullName: fullName.trim() || null,
        phone: phone.trim() || null,
        source: "modal",
        hp: website.trim() || null,
      }),
    });

    const data = await res.json().catch(() => ({} as any));

    if (!res.ok || !data?.ok) {
      throw new Error(data?.error || "Server error");
    }
  };

  const verified = async () => {
    setLoading(true);
    setMsg(null);

    try {
      // ✅ Only create mode writes to Neon waitlist
      if (activeMode === "create") {
        await insertWaitlist();
        onWaitlisted(email.trim());
      }

      // small UX delay (optional)
      await new Promise((r) => setTimeout(r, 250));

      setLoading(false);
      setStep("done");

      if (activeMode === "create") {
        setMsg("You’re on the Private Preview waitlist. We’ll notify you when your access is approved.");
      } else {
        // still demo for signin
        setMsg("Signed in successfully. (Demo)");
      }
    } catch (err: any) {
      setLoading(false);
      // bring user back so they can retry
      setStep("verify");
      setMsg(`Couldn’t complete your request: ${err?.message || "Server error"}`);
    }
  };

  const closeAndReset = () => onClose();

  const switchMode = (m: Mode) => {
    setActiveMode(m);
    setMsg(null);
    setLoading(false);
    setStep("email");
    setTouched(false);
    if (m === "create") setAccepted(false);
    setWebsite("");
  };

  const back = () => {
    setMsg(null);
    setLoading(false);
    setStep("email");
    setTouched(false);
  };

  const headline = activeMode === "signin" ? "Sign in" : "Request early access";
  const subline =
    step === "email"
      ? activeMode === "signin"
        ? "Enter your email to receive a secure sign-in link."
        : "Private Preview is limited. Request access with a verification link—no password required."
      : step === "verify"
      ? "Check your inbox for the verification link."
      : "Request received.";

  if (!open) return null;

  return (
    <div className="bv-modalOverlay" role="presentation" onMouseDown={closeAndReset}>
      <div
        className="bv-modal bv-modal--enter"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="bv-modalTop">
          <div>
            <div className="bv-modalKicker">BlockyVault • Private Preview</div>
            <h3 id={titleId} className="bv-modalTitle">
              {headline}
            </h3>
            <div className="bv-modalSub">{subline}</div>
          </div>

          <button type="button" className="bv-x" onClick={closeAndReset} aria-label="Close">
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="bv-authTabs" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            role="tab"
            className={activeMode === "signin" ? "bv-authTab bv-authTab--active" : "bv-authTab"}
            aria-selected={activeMode === "signin"}
            onClick={() => switchMode("signin")}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            className={activeMode === "create" ? "bv-authTab bv-authTab--active" : "bv-authTab"}
            aria-selected={activeMode === "create"}
            onClick={() => switchMode("create")}
          >
            Request access
          </button>
        </div>

        <div className="bv-authBody">
          {step === "email" && (
            <div className="bv-step bv-step--in">
              {activeMode === "create" ? (
                <div className="bv-authFine" style={{ marginBottom: 10 }}>
                  Fields marked with <span aria-hidden="true">*</span> are required.
                </div>
              ) : null}

              {activeMode === "create" ? (
                <>
                  {/* Honeypot field (hidden from humans, attractive to bots) */}
                  <div style={{ position: "absolute", left: -9999, top: -9999 }} aria-hidden="true">
                    <label>
                      Website
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="bv-grid2" style={{ gap: 12 }}>
                    <label className="bv-field">
                      <span className="bv-label">
                        Full name <span aria-hidden="true">*</span>
                      </span>
                      <input
                        className="bv-input"
                        type="text"
                        autoComplete="name"
                        placeholder="Blocky Vault"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={markTouched}
                        style={fullNameError ? { borderColor: "#ff6b6b" } : undefined}
                        required
                      />
                      {fullNameError ? (
                        <div className="bv-authFine" style={{ color: "#ff6b6b" }}>
                          Full name is required.
                        </div>
                      ) : null}
                    </label>

                    <label className="bv-field">
                      <span className="bv-label">Company</span>
                      <input
                        className="bv-input"
                        type="text"
                        autoComplete="organization"
                        placeholder="Blocky Labs"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        onBlur={markTouched}
                      />
                    </label>

                    <label className="bv-field" style={{ gridColumn: "1 / -1" }}>
                      <span className="bv-label">
                        Phone <span aria-hidden="true">*</span>
                      </span>
                      <input
                        className="bv-input"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(787) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={markTouched}
                        style={phoneError ? { borderColor: "#ff6b6b" } : undefined}
                        required
                      />
                      {phoneError ? (
                        <div className="bv-authFine" style={{ color: "#ff6b6b" }}>
                          Phone is required.
                        </div>
                      ) : null}
                    </label>
                  </div>
                </>
              ) : null}

              <label className="bv-field" style={{ marginTop: activeMode === "create" ? 12 : 0 }}>
                <span className="bv-label">
                  Email {activeMode === "create" ? <span aria-hidden="true">*</span> : null}
                </span>
                <input
                  className="bv-input"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={markTouched}
                  style={emailError ? { borderColor: "#ff6b6b" } : undefined}
                  required={activeMode === "create"}
                />
                {emailError ? (
                  <div className="bv-authFine" style={{ color: "#ff6b6b" }}>
                    Enter a valid email.
                  </div>
                ) : null}
              </label>

              {activeMode === "create" ? (
                <>
                  <label className="bv-checkRow" style={{ marginTop: 10 }}>
                    <input
                      type="checkbox"
                      checked={accepted}
                      onChange={(e) => setAccepted(e.target.checked)}
                      onBlur={markTouched}
                    />
                    <span>
                      I agree to the <span className="bv-muted">Terms</span> and{" "}
                      <span className="bv-muted">Privacy</span>.
                    </span>
                  </label>
                  {termsError ? (
                    <div className="bv-authFine" style={{ color: "#ff6b6b", marginTop: 6 }}>
                      You must accept Terms &amp; Privacy.
                    </div>
                  ) : null}
                </>
              ) : null}

              {msg ? <div className="bv-authMsg">{msg}</div> : null}

              <button
                className="bv-btn bv-btn--primary bv-btnFull"
                type="button"
                disabled={!canContinue || loading}
                onClick={goVerify}
              >
                {loading ? "Sending link…" : activeMode === "create" ? "Request early access" : "Continue"}
              </button>

              <div className="bv-authFine" style={{ marginTop: 10 }}>
                {activeMode === "create"
                  ? "Private Preview is limited. We onboard teams in batches."
                  : "Passwordless by design: magic links reduce phishing & password reuse."}
              </div>
            </div>
          )}

          {step === "verify" && (
            <div className="bv-step bv-step--in">
              <div className="bv-verifyCard">
                <div className="bv-verifyTop">
                  <div className="bv-verifyDot" aria-hidden="true" />
                  <div>
                    <div className="bv-verifyTitle">
                      {activeMode === "create" ? "Verification link sent" : "Sign-in link sent"}
                    </div>
                    <div className="bv-verifySub">{email.trim()}</div>
                  </div>
                </div>

                {msg ? <div className="bv-authMsg">{msg}</div> : null}

                <button className="bv-btn bv-btn--primary bv-btnFull" type="button" onClick={verified} disabled={loading}>
                  {loading ? (activeMode === "create" ? "Submitting…" : "Verifying…") : "I verified"}
                </button>

                <div className="bv-verifyActions">
                  <button type="button" className="bv-linkMini" onClick={back} disabled={loading}>
                    Change details
                  </button>
                  <button
                    type="button"
                    className="bv-linkMini"
                    onClick={() => setMsg("Resent link (demo).")}
                    disabled={loading}
                  >
                    Resend link
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="bv-step bv-step--in">
              <div className="bv-done">
                <div className="bv-doneIcon" aria-hidden="true">
                  ✓
                </div>
                <div className="bv-doneTitle">{activeMode === "create" ? "Request submitted" : "Signed in"}</div>
                <div className="bv-doneSub">
                  {activeMode === "create"
                    ? "You’re on the Private Preview waitlist. We’ll email you when your access is approved."
                    : "Session ready for your vault experience."}
                </div>

                <button className="bv-btn bv-btn--primary bv-btnFull" type="button" onClick={closeAndReset}>
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
