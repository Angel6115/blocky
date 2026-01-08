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

// Fecha en formato: 2026-01-08 23:57:55
function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

// Nombre de archivo: waitlist_2026-01-08_16-25.csv / .xlsx
function buildFilename(ext: "csv" | "xlsx") {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const ts = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(
    d.getHours()
  )}-${pad(d.getMinutes())}`;
  return `waitlist_${ts}.${ext}`;
}

// Escapado simple para CSV
function csvCell(value: unknown): string {
  const s = String(value ?? "");
  if (s.includes('"') || s.includes(",") || s.includes("\n") || s.includes("\r")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

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
    const formatParam = (searchParams.get("format") ?? "csv").trim().toLowerCase();
    const isXlsx = formatParam === "xlsx";

    const limit = Math.min(Math.max(Number(limitParam || "100") || 100, 1), 500);
    const hasAccountFilter = !!accountTypeParam && accountTypeParam !== "all";

    const sql: any = neon(process.env.DATABASE_URL);
    let rows: DbRow[] = [];

    // ---------- Query base (mismas reglas que admin/waitlist normal) ----------
    if (q) {
      const like = `%${q}%`;

      if (hasAccountFilter) {
        rows = (await sql`
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
        `) as DbRow[];
      } else {
        rows = (await sql`
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
        `) as DbRow[];
      }
    } else if (hasAccountFilter) {
      rows = (await sql`
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
      `) as DbRow[];
    } else {
      rows = (await sql`
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
      `) as DbRow[];
    }

    // ---------- XLSX ----------
    if (isXlsx) {
      const ExcelJS: any = await import("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Waitlist");

      sheet.columns = [
        { header: "id", key: "id", width: 36 },
        { header: "email", key: "email", width: 30 },
        { header: "company", key: "company", width: 18 },
        { header: "full_name", key: "full_name", width: 22 },
        { header: "phone", key: "phone", width: 16 },
        { header: "account_type", key: "account_type", width: 16 },
        { header: "source", key: "source", width: 14 },
        { header: "created_at", key: "created_at", width: 22 },
        { header: "approved_at", key: "approved_at", width: 22 },
      ];

      rows.forEach((r) => {
        sheet.addRow({
          id: r.id,
          email: r.email,
          company: r.company ?? "",
          full_name: r.full_name ?? "",
          phone: r.phone ?? "",
          account_type: r.account_type ?? "",
          source: r.source ?? "",
          created_at: formatDate(r.created_at),
          approved_at: formatDate(r.approved_at),
        });
      });

      const headerRow = sheet.getRow(1);
      headerRow.font = { bold: true };
      sheet.columns.forEach((col: any) => {
        col.alignment = { vertical: "middle", horizontal: "left" };
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const filename = buildFilename("xlsx");

      return new Response(buffer, {
        status: 200,
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    // ---------- CSV ----------
    const header = [
      "id",
      "email",
      "company",
      "full_name",
      "phone",
      "account_type",
      "source",
      "created_at",
      "approved_at",
    ];

    const lines: string[] = [];
    lines.push(header.join(","));

    for (const r of rows) {
      const row = [
        r.id,
        r.email,
        r.company ?? "",
        r.full_name ?? "",
        r.phone ?? "",
        r.account_type ?? "",
        r.source ?? "",
        formatDate(r.created_at),
        formatDate(r.approved_at),
      ].map(csvCell);
      lines.push(row.join(","));
    }

    const csv = lines.join("\r\n");
    const filename = buildFilename("csv");

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err: any) {
    console.error("admin/waitlist/export error:", err);
    return new Response(`Error: ${String(err?.message ?? "Server error")}`, {
      status: 500,
    });
  }
}
