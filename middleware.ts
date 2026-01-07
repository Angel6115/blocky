// middleware.ts (ROOT)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "bv_admin";

function isAuthed(req: NextRequest) {
  const expected = process.env.ADMIN_SESSION_TOKEN || "";
  const got = req.cookies.get(COOKIE_NAME)?.value || "";
  return Boolean(expected) && got === expected;
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (!isAdminPage && !isAdminApi) return NextResponse.next();

  // Permitir login sin auth
  if (pathname === "/admin/login") return NextResponse.next();
  if (pathname.startsWith("/api/admin/login")) return NextResponse.next();

  // Si está autenticado, pasa
  if (isAuthed(req)) return NextResponse.next();

  // Si es API: 401 JSON (SIN WWW-Authenticate => NO POPUP)
  if (isAdminApi) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // Si es página: redirect al login bonito
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = `?next=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
