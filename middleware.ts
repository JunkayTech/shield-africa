// middleware.ts
// Protects all /admin pages and /api/admin routes with the admin session
// cookie (JWT). Unauthenticated page requests redirect to /admin/login;
// unauthenticated API requests get a 401.

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "sa_admin_session";

async function hasValidSession(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const secret =
    process.env.ADMIN_AUTH_SECRET || process.env.ADMIN_PASSWORD || "";
  if (!secret) return false;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload.role === "owner" || payload.role === "admin";
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isAuthApi = pathname.startsWith("/api/admin/auth/");
  if (isAuthApi) return NextResponse.next();

  const authed = await hasValidSession(req);

  if (isLoginPage) {
    if (authed) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  if (authed) return NextResponse.next();

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/api/admin/:path*"],
};
