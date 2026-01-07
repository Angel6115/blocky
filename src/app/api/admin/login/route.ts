import { NextResponse } from "next/server";

export const runtime = "nodejs";

const COOKIE_NAME = "bv_admin";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    // ✅ Accept both payload shapes:
    // UI sends: { username, password }
    // legacy:   { user, pass }
    const username = String(body?.username ?? body?.user ?? "").trim();
    const password = String(body?.password ?? body?.pass ?? "").trim();

    const expectedUser = process.env.ADMIN_USER || "";
    const expectedPass = process.env.ADMIN_PASS || "";
    const sessionToken = process.env.ADMIN_SESSION_TOKEN || "";

    if (!expectedUser || !expectedPass || !sessionToken) {
      return jsonError("Missing ADMIN_USER/ADMIN_PASS/ADMIN_SESSION_TOKEN env vars", 500);
    }

    if (username !== expectedUser || password !== expectedPass) {
      return jsonError("Invalid credentials", 401);
    }

    const res = NextResponse.json({ ok: true });

    res.cookies.set({
      name: COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    return res;
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Server error" }, { status: 500 });
  }
}
