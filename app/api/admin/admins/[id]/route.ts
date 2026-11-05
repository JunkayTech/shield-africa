// app/api/admin/admins/[id]/route.ts — update & delete managed admin accounts
import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/guard";
import { getAdmins, saveAdmins } from "@/lib/admin/store";
import { hashPassword, toPublicAdmin } from "@/lib/admin/admins";
import { PERMISSIONS, type Permission } from "@/lib/admin/permissions";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const auth = await requirePermission("admins");
  if ("error" in auth) return auth.error;

  const { id } = await params;
  const admins = await getAdmins();
  const idx = admins.findIndex((a) => a.id === id);
  if (idx < 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  if (typeof body.name === "string" && body.name.trim()) {
    admins[idx].name = body.name.trim();
  }
  if (Array.isArray(body.permissions)) {
    admins[idx].permissions = body.permissions
      .map(String)
      .filter((p: string): p is Permission =>
        (PERMISSIONS as readonly string[]).includes(p)
      );
  }
  if (typeof body.password === "string" && body.password) {
    if (body.password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }
    admins[idx].passwordHash = hashPassword(body.password);
  }

  await saveAdmins(admins);
  return NextResponse.json({
    ok: true,
    admin: toPublicAdmin(admins[idx]),
    admins: admins.map(toPublicAdmin),
  });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await requirePermission("admins");
  if ("error" in auth) return auth.error;

  const { id } = await params;
  const admins = await getAdmins();
  const next = admins.filter((a) => a.id !== id);
  await saveAdmins(next);
  return NextResponse.json({ ok: true, admins: next.map(toPublicAdmin) });
}
