"use client";

import { useEffect, useMemo, useState } from "react";

type Row = {
  id: string;
  email: string;
  name: string;
  company: string | null;
  lead_type: "customer" | "investor" | "career" | null;
  vertical: string | null;
  volume: string | null;
  ticket_size: string | null;
  stage: string | null;
  role: string | null;
  source: string | null;
  created_at: string;
  approved_at: string | null;
};

function formatDate(iso: string | null | undefined) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleString();
}

function badgeStyle(approved: boolean): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    border: approved ? "1px solid rgba(26, 255, 168, 0.22)" : "1px solid rgba(255,255,255,0.10)",
    background: approved ? "rgba(26, 255, 168, 0.10)" : "rgba(255,255,255,0.06)",
    color: approved ? "rgba(210, 255, 238, 0.95)" : "rgba(255,255,255,0.75)",
    whiteSpace: "nowrap",
    backdropFilter: "blur(10px)",
  };
}

function leadTypeBadge(leadType: string | null): React.CSSProperties {
  const colors: Record<string, { bg: string; border: string; text: string }> = {
    customer: {
      bg: "rgba(26, 255, 168, 0.12)",
      border: "rgba(26, 255, 168, 0.25)",
      text: "rgba(210, 255, 238, 0.95)",
    },
    investor: {
      bg: "rgba(255, 200, 0, 0.12)",
      border: "rgba(255, 200, 0, 0.25)",
      text: "rgba(255, 240, 180, 0.95)",
    },
    career: {
      bg: "rgba(100, 150, 255, 0.12)",
      border: "rgba(100, 150, 255, 0.25)",
      text: "rgba(200, 220, 255, 0.95)",
    },
  };

  const style = colors[leadType || ""] || {
    bg: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.14)",
    text: "rgba(255,255,255,0.75)",
  };

  return {
    display: "inline-flex",
    padding: "4px 10px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 700,
    background: style.bg,
    border: `1px solid ${style.border}`,
    color: style.text,
    textTransform: "capitalize",
  };
}

const ui = {
  cta: "#FF8A3D",
  ctaHover: "#FF9C5B",
  ctaText: "#111111",
  dangerBg: "rgba(255,255,255,0.06)",
  dangerBorder: "rgba(255,255,255,0.14)",
  dangerHover: "rgba(255,255,255,0.10)",
  dangerText: "rgba(255,255,255,0.90)",
  card: "rgba(10,10,14,0.35)",
  border: "rgba(255,255,255,0.10)",
  text: "rgba(255,255,255,0.92)",
  muted: "rgba(255,255,255,0.70)",
};

function Button({
  variant,
  children,
  disabled,
  onClick,
}: {
  variant: "approve" | "revoke" | "ghost";
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const base: React.CSSProperties = {
    height: 38,
    padding: "0 14px",
    borderRadius: 12,
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: 0.2,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    userSelect: "none",
    transition: "transform .12s ease, filter .12s ease, background .12s ease, border-color .12s ease",
    outline: "none",
    opacity: disabled ? 0.55 : 1,
    whiteSpace: "nowrap",
  };

  if (variant === "approve") {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        style={{
          ...base,
          background: ui.cta,
          color: ui.ctaText,
          border: "1px solid rgba(255,138,61,0.55)",
          boxShadow: "0 10px 22px rgba(255,138,61,0.22)",
        }}
        onMouseEnter={(e) => {
          if (disabled) return;
          e.currentTarget.style.background = ui.ctaHover;
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = ui.cta;
          e.currentTarget.style.transform = "translateY(0px)";
        }}
      >
        {children}
      </button>
    );
  }

  if (variant === "revoke") {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        style={{
          ...base,
          background: ui.dangerBg,
          color: ui.dangerText,
          border: `1px solid ${ui.dangerBorder}`,
          boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
        }}
        onMouseEnter={(e) => {
          if (disabled) return;
          e.currentTarget.style.background = ui.dangerHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = ui.dangerBg;
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{
        ...base,
        background: "rgba(255,255,255,0.04)",
        color: "rgba(255,255,255,0.9)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      {children}
    </button>
  );
}

function redirectToLogin() {
  const next = typeof window !== "undefined" ? window.location.pathname : "/admin/waitlist";
  const url = `/admin/login?next=${encodeURIComponent(next)}`;
  window.location.href = url;
}

export default function AdminWaitlistPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(100);
  const [leadType, setLeadType] = useState<"all" | "customer" | "investor" | "career">("all");

  const [rowBusy, setRowBusy] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);

  const queryKey = useMemo(() => `${q}::${limit}::${leadType}`, [q, limit, leadType]);

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      params.set("limit", String(limit));
      if (leadType !== "all") params.set("leadType", leadType);

      const res = await fetch(`/api/admin/waitlist?${params.toString()}`, { cache: "no-store" });

      if (res.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await res.json().catch(() => ({} as any));
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed to load waitlist.");

      setRows(Array.isArray(data.data) ? data.data : []);
    } catch (e: any) {
      setError(e?.message || "Server error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!alive) return;
      await load();
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(t);
  }, [toast]);

  async function logout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    } finally {
      redirectToLogin();
    }
  }

  async function setApproved(email: string, approve: boolean, rowId: string) {
    setRowBusy((p) => ({ ...p, [rowId]: true }));
    setError(null);

    try {
      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, approve }),
      });

      if (res.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await res.json().catch(() => ({} as any));
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed to update approval.");

      setToast(approve ? "Approved ✅" : "Revoked ✅");
      await load();
    } catch (e: any) {
      setError(e?.message || "Server error");
    } finally {
      setRowBusy((p) => ({ ...p, [rowId]: false }));
    }
  }

  function exportFile(kind: "csv" | "xlsx") {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    params.set("limit", String(limit));
    if (leadType !== "all") params.set("leadType", leadType);
    params.set("format", kind);

    const url = `/api/admin/waitlist/export?${params.toString()}`;
    window.open(url, "_blank");
  }

  return (
    <div style={{ padding: "24px 16px 40px", maxWidth: 1260, margin: "0 auto", color: ui.text }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Pilot Leads</h1>
          <div style={{ opacity: 0.75, marginTop: 6 }}>Admin view (protected).</div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 6 }}>Search</div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="email / name / company / vertical"
              style={{
                width: 260,
                maxWidth: "min(260px, 90vw)",
                padding: "10px 12px",
                borderRadius: 12,
                border: `1px solid ${ui.border}`,
                background: "rgba(255,255,255,0.06)",
                color: ui.text,
                outline: "none",
              }}
            />
          </div>

          <div>
            <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 6 }}>Limit</div>
            <input
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value || 100))}
              type="number"
              min={1}
              max={500}
              style={{
                width: 90,
                padding: "10px 12px",
                borderRadius: 12,
                border: `1px solid ${ui.border}`,
                background: "rgba(255,255,255,0.06)",
                color: ui.text,
                outline: "none",
              }}
            />
          </div>

          <div>
            <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 6 }}>Lead type</div>
            <select
              value={leadType}
              onChange={(e) => setLeadType(e.target.value as any)}
              style={{
                width: 150,
                padding: "10px 12px",
                borderRadius: 12,
                border: `1px solid ${ui.border}`,
                background: "rgba(255,255,255,0.06)",
                color: ui.text,
                outline: "none",
                appearance: "none",
              }}
            >
              <option value="all">All</option>
              <option value="customer">Customer</option>
              <option value="investor">Investor</option>
              <option value="career">Career</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
              <Button variant="ghost" onClick={() => load()}>
                Refresh
              </Button>

              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
              <Button variant="ghost" onClick={() => exportFile("csv")}>
                Export CSV
              </Button>
              <Button variant="ghost" onClick={() => exportFile("xlsx")}>
                Export XLSX
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast ? (
        <div
          style={{
            marginTop: 14,
            padding: "10px 12px",
            borderRadius: 14,
            background: "rgba(255,138,61,0.12)",
            border: "1px solid rgba(255,138,61,0.20)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.92)",
          }}
        >
          {toast}
        </div>
      ) : null}

      {/* Content */}
      <div style={{ marginTop: 18 }}>
        {loading ? (
          <div style={{ padding: 14, borderRadius: 14, background: ui.card, border: `1px solid ${ui.border}` }}>
            Loading…
          </div>
        ) : error ? (
          <div
            style={{
              padding: 14,
              borderRadius: 14,
              background: "rgba(255,0,0,0.10)",
              border: "1px solid rgba(255,0,0,0.18)",
            }}
          >
            <b>Error:</b> {error}
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="bv-admin-waitlist-table-desktop">
              <div
                style={{
                  border: `1px solid ${ui.border}`,
                  borderRadius: 16,
                  background: ui.card,
                  overflowX: "auto",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                      <th style={th}>Created</th>
                      <th style={th}>Status</th>
                      <th style={th}>Lead Type</th>
                      <th style={th}>Email</th>
                      <th style={th}>Name</th>
                      <th style={th}>Company</th>
                      <th style={th}>Details</th>
                      <th style={th}>Source</th>
                      <th style={th}>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.length === 0 ? (
                      <tr>
                        <td style={td} colSpan={9}>
                          No rows found.
                        </td>
                      </tr>
                    ) : (
                      rows.map((r) => {
                        const approved = !!r.approved_at;
                        const busy = !!rowBusy[r.id];

                        // Construir detalles según lead_type
                        let details = "-";
                        if (r.lead_type === "customer") {
                          details = `${r.vertical || "?"} | ${r.volume || "volume N/A"}`;
                        } else if (r.lead_type === "investor") {
                          details = `${r.stage || "?"} | ${r.ticket_size || "ticket N/A"}`;
                        } else if (r.lead_type === "career") {
                          details = r.role || "role N/A";
                        }

                        return (
                          <tr key={r.id} style={{ borderTop: `1px solid ${ui.border}` }}>
                            <td style={td}>{formatDate(r.created_at)}</td>

                            <td style={td}>
                              <span style={badgeStyle(approved)}>
                                <span
                                  aria-hidden="true"
                                  style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 999,
                                    background: approved ? "rgba(26,255,168,1)" : "rgba(255,255,255,0.35)",
                                    display: "inline-block",
                                  }}
                                />
                                {approved ? "Approved" : "Pending"}
                              </span>

                              {approved ? (
                                <div style={{ fontSize: 12, opacity: 0.75, marginTop: 6 }}>
                                  {formatDate(r.approved_at)}
                                </div>
                              ) : null}
                            </td>

                            <td style={td}>
                              <span style={leadTypeBadge(r.lead_type)}>{r.lead_type || "?"}</span>
                            </td>

                            <td style={td}>
                              <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                {r.email}
                              </span>
                            </td>

                            <td style={td}>{r.name ?? "-"}</td>
                            <td style={td}>{r.company ?? "-"}</td>
                            <td style={td}>{details}</td>
                            <td style={td}>{r.source ?? "-"}</td>

                            <td style={td}>
                              {approved ? (
                                <Button variant="revoke" disabled={busy} onClick={() => setApproved(r.email, false, r.id)}>
                                  {busy ? "Working…" : "Revoke"}
                                </Button>
                              ) : (
                                <Button variant="approve" disabled={busy} onClick={() => setApproved(r.email, true, r.id)}>
                                  {busy ? "Approving…" : "Approve"}
                                </Button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="bv-admin-waitlist-table-mobile">
              {rows.length === 0 ? (
                <div style={{ padding: 14, borderRadius: 14, background: ui.card, border: `1px solid ${ui.border}` }}>
                  No rows found.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {rows.map((r) => {
                    const approved = !!r.approved_at;
                    const busy = !!rowBusy[r.id];

                    let details = "-";
                    if (r.lead_type === "customer") {
                      details = `${r.vertical || "?"} | ${r.volume || "volume N/A"}`;
                    } else if (r.lead_type === "investor") {
                      details = `${r.stage || "?"} | ${r.ticket_size || "ticket N/A"}`;
                    } else if (r.lead_type === "career") {
                      details = r.role || "role N/A";
                    }

                    return (
                      <div
                        key={r.id}
                        style={{
                          borderRadius: 14,
                          border: `1px solid ${ui.border}`,
                          background: ui.card,
                          padding: 12,
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{r.name ?? r.email}</div>
                          <span style={badgeStyle(approved)}>
                            <span
                              aria-hidden="true"
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: 999,
                                background: approved ? "rgba(26,255,168,1)" : "rgba(255,255,255,0.35)",
                                display: "inline-block",
                              }}
                            />
                            {approved ? "Approved" : "Pending"}
                          </span>
                        </div>

                        <div style={{ fontSize: 12, opacity: 0.75 }}>{formatDate(r.created_at)}</div>

                        <div style={{ marginTop: 4 }}>
                          <span style={leadTypeBadge(r.lead_type)}>{r.lead_type || "?"}</span>
                        </div>

                        <div style={{ fontSize: 13, marginTop: 4, display: "grid", rowGap: 4 }}>
                          <div>
                            <span style={{ opacity: 0.7 }}>Email: </span>
                            <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                              {r.email}
                            </span>
                          </div>
                          <div>
                            <span style={{ opacity: 0.7 }}>Company: </span>
                            <span>{r.company ?? "-"}</span>
                          </div>
                          <div>
                            <span style={{ opacity: 0.7 }}>Details: </span>
                            <span>{details}</span>
                          </div>
                          <div>
                            <span style={{ opacity: 0.7 }}>Source: </span>
                            <span>{r.source ?? "-"}</span>
                          </div>
                          {approved && (
                            <div>
                              <span style={{ opacity: 0.7 }}>Approved at: </span>
                              <span>{formatDate(r.approved_at)}</span>
                            </div>
                          )}
                        </div>

                        <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end" }}>
                          {approved ? (
                            <Button variant="revoke" disabled={busy} onClick={() => setApproved(r.email, false, r.id)}>
                              {busy ? "Working…" : "Revoke"}
                            </Button>
                          ) : (
                            <Button variant="approve" disabled={busy} onClick={() => setApproved(r.email, true, r.id)}>
                              {busy ? "Approving…" : "Approve"}
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  fontSize: 12,
  letterSpacing: 0.25,
  padding: "14px 14px",
  opacity: 0.85,
  whiteSpace: "nowrap",
};

const td: React.CSSProperties = {
  padding: "14px 14px",
  fontSize: 14,
  whiteSpace: "nowrap",
};
