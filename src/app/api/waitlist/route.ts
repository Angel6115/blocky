import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";

// -----------------------
// Helpers
// -----------------------
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizePhone(raw: string) {
  // deja solo dígitos
  const digits = raw.replace(/[^\d]/g, "");

  // si viene con 1 + 10 dígitos (US/PR), mantenlo
  if (digits.length === 11 && digits.startsWith("1")) return digits;

  // si viene 10 dígitos, asume US/PR
  if (digits.length === 10) return `1${digits}`;

  // si no cuadra, devuelve lo que haya
  return digits;
}

function isLikelyUSPRPhone(normalizedDigits: string) {
  // esperamos 11 dígitos con leading 1 (ej: 1787xxxxxxx / 1939xxxxxxx)
  return normalizedDigits.length === 11 && normalizedDigits.startsWith("1");
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

// -----------------------
// Basic in-memory rate limit (MVP)
// 5 requests per IP per 10 minutes
// -----------------------
type Bucket = { count: number; resetAt: number };
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 5;

// Keep a global bucket map across hot reloads (dev) and within a running node process
const g = globalThis as unknown as { __bv_waitlist_rl__?: Map<string, Bucket> };
const buckets = (g.__bv_waitlist_rl__ ??= new Map<string, Bucket>());

function getClientIp(req: Request) {
  // Works behind proxies/CDNs when headers are forwarded
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || "unknown";
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr.trim();
  return "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const b = buckets.get(ip);

  if (!b || now > b.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true, remaining: RATE_MAX - 1, resetAt: now + RATE_WINDOW_MS };
  }

  if (b.count >= RATE_MAX) {
    return { allowed: false, remaining: 0, resetAt: b.resetAt };
  }

  b.count += 1;
  buckets.set(ip, b);
  return { allowed: true, remaining: RATE_MAX - b.count, resetAt: b.resetAt };
}

export async function POST(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return jsonError("DATABASE_URL missing. Check .env.local and restart dev server.", 500);
    }

    const ip = getClientIp(req);

    // -----------------------
    // Rate limit (MVP)
    // -----------------------
    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many requests. Please wait a few minutes and try again.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({} as any));

    // -----------------------
    // Honeypot (silent)
    // If a bot fills this, pretend ok and do nothing.
    // -----------------------
    const hp = String(body?.hp ?? "").trim();
    if (hp) {
      // Silent success: do not tip off bots
      return NextResponse.json({ ok: true });
    }

    const email = String(body?.email ?? "").trim().toLowerCase();
    const company = String(body?.company ?? "").trim() || null;

    const fullNameRaw = String(body?.fullName ?? "").trim();
    const phoneRaw = String(body?.phone ?? "").trim();

    const fullName = fullNameRaw || null;

    const phoneNormalized = phoneRaw ? normalizePhone(phoneRaw) : "";
    const phone = phoneNormalized || null;

    const source = String(body?.source ?? "modal").trim() || "modal";

    // 🔹 Account type (nuevo)
    const accountTypeRaw = String(body?.accountType ?? "").trim().toLowerCase();
    const allowedAccountTypes = new Set(["individual", "private_corp", "government"]);
    const account_type = allowedAccountTypes.has(accountTypeRaw) ? accountTypeRaw : "individual";

    // -----------------------
    // Validation (friendly)
    // -----------------------
    if (!email) return jsonError("Email is required.", 400);
    if (!isValidEmail(email)) return jsonError("Please enter a valid email.", 400);

    // These are REQUIRED now (DB is NOT NULL)
    if (!fullNameRaw) return jsonError("Full name is required.", 400);
    if (!phoneRaw) return jsonError("Phone is required.", 400);

    // Phone sanity check (PR/US)
    if (!isLikelyUSPRPhone(phoneNormalized)) {
      return jsonError("Please enter a valid phone number (PR/US).", 400);
    }

    const sql = neon(process.env.DATABASE_URL);

    // -----------------------
    // Insert / Upsert
    // -----------------------
    await sql`
      insert into waitlist (email, company, full_name, phone, source, account_type)
      values (${email}, ${company}, ${fullName}, ${phone}, ${source}, ${account_type})
      on conflict (email) do update
      set
        company = coalesce(excluded.company, waitlist.company),
        full_name = excluded.full_name,
        phone = excluded.phone,
        account_type = excluded.account_type
    `;

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const msg = String(err?.message ?? "");
    const code = err?.code as string | undefined;

    if (code === "23505") {
      return jsonError("That email is already on the waitlist.", 409);
    }

    if (code === "23502") {
      return jsonError("Missing required fields. Please complete the form and try again.", 400);
    }

    return NextResponse.json({ ok: false, error: msg || "Server error" }, { status: 500 });
  }
}
