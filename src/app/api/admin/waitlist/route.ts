import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";

type DbRow = {
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

export async function GET(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { ok: false, error: "DATABASE_URL missing" },
        { status: 500 }
      );
    }

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const q = (searchParams.get("q") ?? "").trim();
    const leadTypeParam = (searchParams.get("leadType") ?? "").trim().toLowerCase();
    const limitParam = searchParams.get("limit");

    const limit = Math.min(Math.max(Number(limitParam || "100") || 100, 1), 500);

    const sql = neon(process.env.DATABASE_URL);

    let rows: DbRow[] = [];

    const hasLeadFilter = leadTypeParam && leadTypeParam !== "all";

    if (q) {
      const like = `%${q}%`;

      if (hasLeadFilter) {
        const result = await sql`
          SELECT
            id,
            email,
            name,
            company,
            lead_type,
            vertical,
            volume,
            ticket_size,
            stage,
            role,
            source,
            created_at,
            approved_at
          FROM waitlist
          WHERE
            lead_type = ${leadTypeParam}
            AND (
              email ILIKE ${like} OR
              COALESCE(name, '') ILIKE ${like} OR
              COALESCE(company, '') ILIKE ${like} OR
              COALESCE(vertical, '') ILIKE ${like}
            )
          ORDER BY created_at DESC
          LIMIT ${limit}
        `;
        rows = result as unknown as DbRow[];
      } else {
        const result = await sql`
          SELECT
            id,
            email,
            name,
            company,
            lead_type,
            vertical,
            volume,
            ticket_size,
            stage,
            role,
            source,
            created_at,
            approved_at
          FROM waitlist
          WHERE
            email ILIKE ${like} OR
            COALESCE(name, '') ILIKE ${like} OR
            COALESCE(company, '') ILIKE ${like} OR
            COALESCE(vertical, '') ILIKE ${like}
          ORDER BY created_at DESC
          LIMIT ${limit}
        `;
        rows = result as unknown as DbRow[];
      }
    } else if (hasLeadFilter) {
      const result = await sql`
        SELECT
          id,
          email,
          name,
          company,
          lead_type,
          vertical,
          volume,
          ticket_size,
          stage,
          role,
          source,
          created_at,
          approved_at
        FROM waitlist
        WHERE lead_type = ${leadTypeParam}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
      rows = result as unknown as DbRow[];
    } else {
      const result = await sql`
        SELECT
          id,
          email,
          name,
          company,
          lead_type,
          vertical,
          volume,
          ticket_size,
          stage,
          role,
          source,
          created_at,
          approved_at
        FROM waitlist
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
      rows = result as unknown as DbRow[];
    }

    return NextResponse.json({ ok: true, data: rows });
  } catch (err: any) {
    console.error("admin/waitlist error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
