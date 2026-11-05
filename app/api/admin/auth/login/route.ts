// app/api/admin/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  authenticate,
  createSessionToken,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/admin/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json().catch(() => ({}));

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin login is not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD." },
      { status: 500 }
    );
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const session = await authenticate(email, password);
  if (!session) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = await createSessionToken(session);
  const res = NextResponse.json({
    ok: true,
    user: {
      email: session.email,
      name: session.name,
      role: session.role,
      permissions: session.permissions,
    },
  });
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  return res;
}
