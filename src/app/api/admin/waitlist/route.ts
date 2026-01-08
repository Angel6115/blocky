import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";

type DbRow = {
  id: string;
  email: string;
  company: string | null;
  full_name: string | null;
  phone: string | null;
  source: string | null;
  created_at: string;
  approved_at: string | null;
  account_type: string | null;
};

export async function GET(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ ok: false, error: "DATABASE_URL missing" }, { status: 500 });
    }

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const q = (searchParams.get("q") ?? "").trim();
    const accountTypeParam = (searchParams.get("accountType") ?? "").trim().toLowerCase();
    const limitParam = searchParams.get("limit");

    const limit = Math.min(Math.max(Number(limitParam || "100") || 100, 1), 500);

    const sql = neon(process.env.DATABASE_URL);

    let rows: DbRow[] = [];

    const hasAccountFilter = accountTypeParam && accountTypeParam !== "all";

    if (q) {
      const like = `%${q}%`;

      if (hasAccountFilter) {
        const result = await sql`
          select
            id,
            email,
            company,
            full_name,
            phone,
            source,
            created_at,
            approved_at,
            account_type
          from waitlist
          where
            account_type = ${accountTypeParam}
            and (
              email ilike ${like} or
              coalesce(company, '') ilike ${like} or
              coalesce(full_name, '') ilike ${like} or
              coalesce(phone, '') ilike ${like}
            )
          order by created_at desc
          limit ${limit}
        `;
        rows = result as unknown as DbRow[];
      } else {
        const result = await sql`
          select
            id,
            email,
            company,
            full_name,
            phone,
            source,
            created_at,
            approved_at,
            account_type
          from waitlist
          where
            email ilike ${like} or
            coalesce(company, '') ilike ${like} or
            coalesce(full_name, '') ilike ${like} or
            coalesce(phone, '') ilike ${like}
          order by created_at desc
          limit ${limit}
        `;
        rows = result as unknown as DbRow[];
      }
    } else if (hasAccountFilter) {
      const result = await sql`
        select
          id,
          email,
          company,
          full_name,
          phone,
          source,
          created_at,
          approved_at,
          account_type
        from waitlist
        where account_type = ${accountTypeParam}
        order by created_at desc
        limit ${limit}
      `;
      rows = result as unknown as DbRow[];
    } else {
      const result = await sql`
        select
          id,
          email,
          company,
          full_name,
          phone,
          source,
          created_at,
          approved_at,
          account_type
        from waitlist
        order by created_at desc
        limit ${limit}
      `;
      rows = result as unknown as DbRow[];
    }

    return NextResponse.json({ ok: true, data: rows });
  } catch (err: any) {
    console.error("admin/waitlist error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
