import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const COOKIE_NAME = "bv_admin";

export async function GET() {
  const expected = process.env.ADMIN_SESSION_TOKEN || "";
  const got = (await cookies()).get(COOKIE_NAME)?.value || "";
  const authed = Boolean(expected) && got === expected;

  return NextResponse.json({ ok: true, authed });
}
