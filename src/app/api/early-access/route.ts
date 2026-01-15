import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";

// Rate limiting básico
type Bucket = { count: number; resetAt: number };
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const RATE_MAX = 5;

const g = globalThis as unknown as { __bv_early_access_rl__?: Map<string, Bucket> };
const buckets = (g.__bv_early_access_rl__ ??= new Map<string, Bucket>());

function getClientIp(req: Request) {
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

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { ok: false, error: "DATABASE_URL missing" },
        { status: 500 }
      );
    }

    const ip = getClientIp(req);

    // Rate limit
    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please wait a few minutes." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({} as any));

    const {
      email: rawEmail,
      name: rawName,
      company: rawCompany,
      leadType,
      // Customer fields
      vertical,
      volume,
      // Investor fields
      ticketSize,
      stage,
      // Career fields
      role,
    } = body;

    // Clean inputs
    const email = String(rawEmail ?? "").trim().toLowerCase();
    const name = String(rawName ?? "").trim();
    const company = String(rawCompany ?? "").trim() || null;

    // Validación
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email." },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { ok: false, error: "Name is required." },
        { status: 400 }
      );
    }

    if (!leadType || !["customer", "investor", "career"].includes(leadType)) {
      return NextResponse.json(
        { ok: false, error: "Invalid lead type." },
        { status: 400 }
      );
    }

    // Validación condicional
    if (leadType === "customer" && !company) {
      return NextResponse.json(
        { ok: false, error: "Organization is required for customers." },
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL);

    // Insert/Update (SOLO columnas nuevas)
    await sql`
      INSERT INTO waitlist (
        email,
        name,
        company,
        lead_type,
        vertical,
        volume,
        ticket_size,
        stage,
        role,
        source
      )
      VALUES (
        ${email},
        ${name},
        ${company},
        ${leadType},
        ${vertical || null},
        ${volume || null},
        ${ticketSize || null},
        ${stage || null},
        ${role || null},
        'modal'
      )
      ON CONFLICT (email)
      DO UPDATE SET
        name = EXCLUDED.name,
        company = EXCLUDED.company,
        lead_type = EXCLUDED.lead_type,
        vertical = EXCLUDED.vertical,
        volume = EXCLUDED.volume,
        ticket_size = EXCLUDED.ticket_size,
        stage = EXCLUDED.stage,
        role = EXCLUDED.role
    `;

    // 📬 Slack notification
if (process.env.SLACK_WEBHOOK_URL) {
    try {
      const leadTypeEmoji = 
        leadType === "customer" ? "🏢" : 
        leadType === "investor" ? "💰" : 
        "👤";
      
      const details = 
        leadType === "customer" 
          ? `• *Vertical:* ${vertical || "N/A"}\n• *Volume:* ${volume || "N/A"}` 
          : leadType === "investor"
          ? `• *Stage:* ${stage || "N/A"}\n• *Ticket:* ${ticketSize || "N/A"}`
          : `• *Role:* ${role || "N/A"}`;
  
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: `${leadTypeEmoji} New ${leadType.toUpperCase()} Lead`,
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*${name}* • ${email}${company ? `\n*Company:* ${company}` : ""}\n\n${details}`,
              },
            },
            {
              type: "actions",
              elements: [
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    text: "View in Admin",
                  },
                  url: "https://blockyvault.com/admin/waitlist",
                  style: "primary",
                },
              ],
            },
          ],
        }),
      });
    } catch (err) {
      console.error("Slack notification failed:", err);
    }
  }
  
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("early-access error:", err);

    const code = err?.code as string | undefined;

    if (code === "23505") {
      return NextResponse.json(
        { ok: false, error: "That email is already registered." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
