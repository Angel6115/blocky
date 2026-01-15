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

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function buildFilename(ext: "csv" | "xlsx") {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const ts = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(
    d.getHours()
  )}-${pad(d.getMinutes())}`;
  return `waitlist_${ts}.${ext}`;
}

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
    const formatParam = (searchParams.get("format") ?? "csv").trim().toLowerCase();
    const isXlsx = formatParam === "xlsx";

    const limit = Math.min(Math.max(Number(limitParam || "100") || 100, 1), 500);
    const hasLeadFilter = !!leadTypeParam && leadTypeParam !== "all";

    const sql: any = neon(process.env.DATABASE_URL);
    let rows: DbRow[] = [];

    // Query lógica (igual que route.ts)
    if (q) {
      const like = `%${q}%`;

      if (hasLeadFilter) {
        rows = (await sql`
          SELECT
            id, email, name, company, lead_type, vertical, volume,
            ticket_size, stage, role, source, created_at, approved_at
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
        `) as DbRow[];
      } else {
        rows = (await sql`
          SELECT
            id, email, name, company, lead_type, vertical, volume,
            ticket_size, stage, role, source, created_at, approved_at
          FROM waitlist
          WHERE
            email ILIKE ${like} OR
            COALESCE(name, '') ILIKE ${like} OR
            COALESCE(company, '') ILIKE ${like} OR
            COALESCE(vertical, '') ILIKE ${like}
          ORDER BY created_at DESC
          LIMIT ${limit}
        `) as DbRow[];
      }
    } else if (hasLeadFilter) {
      rows = (await sql`
        SELECT
          id, email, name, company, lead_type, vertical, volume,
          ticket_size, stage, role, source, created_at, approved_at
        FROM waitlist
        WHERE lead_type = ${leadTypeParam}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `) as DbRow[];
    } else {
      rows = (await sql`
        SELECT
          id, email, name, company, lead_type, vertical, volume,
          ticket_size, stage, role, source, created_at, approved_at
        FROM waitlist
        ORDER BY created_at DESC
        LIMIT ${limit}
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
        { header: "name", key: "name", width: 22 },
        { header: "company", key: "company", width: 18 },
        { header: "lead_type", key: "lead_type", width: 14 },
        { header: "vertical", key: "vertical", width: 16 },
        { header: "volume", key: "volume", width: 20 },
        { header: "ticket_size", key: "ticket_size", width: 16 },
        { header: "stage", key: "stage", width: 16 },
        { header: "role", key: "role", width: 20 },
        { header: "source", key: "source", width: 14 },
        { header: "created_at", key: "created_at", width: 22 },
        { header: "approved_at", key: "approved_at", width: 22 },
      ];

      rows.forEach((r) => {
        sheet.addRow({
          id: r.id,
          email: r.email,
          name: r.name ?? "",
          company: r.company ?? "",
          lead_type: r.lead_type ?? "",
          vertical: r.vertical ?? "",
          volume: r.volume ?? "",
          ticket_size: r.ticket_size ?? "",
          stage: r.stage ?? "",
          role: r.role ?? "",
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
      "name",
      "company",
      "lead_type",
      "vertical",
      "volume",
      "ticket_size",
      "stage",
      "role",
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
        r.name ?? "",
        r.company ?? "",
        r.lead_type ?? "",
        r.vertical ?? "",
        r.volume ?? "",
        r.ticket_size ?? "",
        r.stage ?? "",
        r.role ?? "",
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
