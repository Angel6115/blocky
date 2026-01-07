import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const COOKIE_NAME = "bv_admin";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

async function isAuthed() {
  const expected = process.env.ADMIN_SESSION_TOKEN || "";
  const cookieStore = await cookies(); // ✅ IMPORTANT (cookies() is async)
  const got = cookieStore.get(COOKIE_NAME)?.value || "";
  return Boolean(expected) && got === expected;
}

export async function POST(req: Request) {
  try {
    // ✅ Hard auth check here (do NOT rely only on middleware)
    if (!(await isAuthed())) return jsonError("Unauthorized", 401);

    if (!process.env.DATABASE_URL) {
      return jsonError("DATABASE_URL missing. Check .env.local and restart dev server.", 500);
    }

    const body = await req.json().catch(() => ({} as any));
    const email = String(body?.email ?? "").trim().toLowerCase();
    const approve = Boolean(body?.approve);

    if (!email) return jsonError("Email is required.", 400);

    const sql = neon(process.env.DATABASE_URL);

    const rows = await sql`
      update waitlist
      set approved_at = ${approve ? sql`now()` : null}
      where lower(email) = ${email}
      returning email, approved_at
    `;

    const row = Array.isArray(rows) && rows.length ? rows[0] : null;
    if (!row) return jsonError("Email not found.", 404);

    return NextResponse.json({
      ok: true,
      row: {
        email: String(row.email),
        approved_at:
          row.approved_at instanceof Date
            ? row.approved_at.toISOString()
            : row.approved_at ?? null,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
