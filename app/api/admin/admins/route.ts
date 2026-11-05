// app/api/admin/admins/route.ts — list & create managed admin accounts
import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/guard";
import { getAdmins, saveAdmins } from "@/lib/admin/store";
import { hashPassword, toPublicAdmin, type AdminAccount } from "@/lib/admin/admins";
import { PERMISSIONS, type Permission } from "@/lib/admin/permissions";

export const dynamic = "force-dynamic";

function sanitizePermissions(input: unknown): Permission[] {
  if (!Array.isArray(input)) return [];
  return input
    .map(String)
    .filter((p): p is Permission =>
      (PERMISSIONS as readonly string[]).includes(p)
    );
}

export async function GET() {
  const auth = await requirePermission("admins");
  if ("error" in auth) return auth.error;
  const admins = await getAdmins();
  return NextResponse.json(admins.map(toPublicAdmin));
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission("admins");
  if ("error" in auth) return auth.error;

  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");
  const permissions = sanitizePermissions(body?.permissions);

  if (!name || !email || !email.includes("@")) {
    return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }
  if (email === process.env.ADMIN_EMAIL?.trim().toLowerCase()) {
    return NextResponse.json(
      { error: "This email belongs to the owner account." },
      { status: 409 }
    );
  }

  const admins = await getAdmins();
  if (admins.some((a) => a.email.toLowerCase() === email)) {
    return NextResponse.json(
      { error: "An admin with this email already exists." },
      { status: 409 }
    );
  }

  const account: AdminAccount = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: hashPassword(password),
    permissions,
    createdAt: new Date().toISOString(),
  };
  admins.push(account);
  await saveAdmins(admins);

  return NextResponse.json({
    ok: true,
    admin: toPublicAdmin(account),
    admins: admins.map(toPublicAdmin),
  });
}
