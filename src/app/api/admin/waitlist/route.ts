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

export async function GET(req: Request) {
  try {
    // ✅ Hard auth check here (do NOT rely only on middleware)
    if (!(await isAuthed())) return jsonError("Unauthorized", 401);

    if (!process.env.DATABASE_URL) {
      return jsonError("DATABASE_URL missing. Check .env.local and restart dev server.", 500);
    }

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") ?? "").trim().toLowerCase();
    const limitRaw = Number(searchParams.get("limit") ?? "100");
    const limit = Number.isFinite(limitRaw)
      ? Math.min(Math.max(limitRaw, 1), 500)
      : 100;

    const sql = neon(process.env.DATABASE_URL);

    const rows =
      q.length > 0
        ? await sql`
            select id, email, company, full_name, phone, source, created_at, approved_at
            from waitlist
            where
              lower(email) like ${"%" + q + "%"}
              or lower(coalesce(company, '')) like ${"%" + q + "%"}
              or lower(coalesce(full_name, '')) like ${"%" + q + "%"}
              or lower(coalesce(phone, '')) like ${"%" + q + "%"}
            order by created_at desc
            limit ${limit}
          `
        : await sql`
            select id, email, company, full_name, phone, source, created_at, approved_at
            from waitlist
            order by created_at desc
            limit ${limit}
          `;

    const data = (rows as any[]).map((r) => ({
      id: String(r.id),
      email: String(r.email),
      company: r.company ?? null,
      full_name: r.full_name ?? null,
      phone: r.phone ?? null,
      source: r.source ?? null,
      created_at: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at),
      approved_at: r.approved_at
        ? r.approved_at instanceof Date
          ? r.approved_at.toISOString()
          : String(r.approved_at)
        : null,
    }));

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
