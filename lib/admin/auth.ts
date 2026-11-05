// lib/admin/auth.ts
// JWT session auth for the admin area.
//
// Two kinds of sign-in:
//  - the OWNER, configured via ADMIN_EMAIL / ADMIN_PASSWORD env vars,
//    who always has every permission, and
//  - managed admin accounts created by the owner in /admin/admins,
//    each with an assigned set of permissions.

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { verifyPassword } from "@/lib/admin/admins";
import { getAdmins } from "@/lib/admin/store";
import {
  PERMISSIONS,
  type AdminSession,
  type Permission,
} from "@/lib/admin/permissions";

export const SESSION_COOKIE = "sa_admin_session";
const SESSION_DAYS = 7;

function getSecret(): Uint8Array {
  const secret =
    process.env.ADMIN_AUTH_SECRET || process.env.ADMIN_PASSWORD || "";
  if (!secret) throw new Error("ADMIN_AUTH_SECRET is not configured");
  return new TextEncoder().encode(secret);
}

/** Verifies credentials against the env owner and managed admins. */
export async function authenticate(
  email: string,
  password: string
): Promise<AdminSession | null> {
  const normalized = email.trim().toLowerCase();

  const ownerEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const ownerPassword = process.env.ADMIN_PASSWORD;
  if (ownerEmail && ownerPassword && normalized === ownerEmail) {
    if (password === ownerPassword) {
      return {
        email: ownerEmail,
        name: "Owner",
        role: "owner",
        permissions: [...PERMISSIONS],
      };
    }
    return null;
  }

  const admins = await getAdmins();
  const account = admins.find((a) => a.email.toLowerCase() === normalized);
  if (account && verifyPassword(password, account.passwordHash)) {
    return {
      email: account.email,
      name: account.name,
      role: "admin",
      permissions: account.permissions,
    };
  }
  return null;
}

export async function createSessionToken(
  session: AdminSession
): Promise<string> {
  return new SignJWT({
    email: session.email,
    name: session.name,
    role: session.role,
    permissions: session.permissions,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.role !== "owner" && payload.role !== "admin") return null;
    const permissions = Array.isArray(payload.permissions)
      ? (payload.permissions.filter((p) =>
          (PERMISSIONS as readonly string[]).includes(String(p))
        ) as Permission[])
      : [];
    return {
      email: String(payload.email ?? ""),
      name: String(payload.name ?? "Admin"),
      role: payload.role,
      permissions,
    };
  } catch {
    return null;
  }
}

/** Reads the current admin session in route handlers / server components. */
export async function getSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getSession()) !== null;
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_DAYS * 24 * 60 * 60,
};
