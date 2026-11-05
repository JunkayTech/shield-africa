// app/api/admin/registrations/[id]/route.ts — check-in / edit / delete
import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/guard";
import { deleteRegistration, updateRegistration } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const auth = await requirePermission("registrations");
  if ("error" in auth) return auth.error;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const patch: Record<string, unknown> = {};
  for (const field of [
    "firstName",
    "lastName",
    "email",
    "phone",
    "gender",
    "ageGroup",
    "organization",
    "jobTitle",
    "sector",
    "country",
    "state",
    "notes",
    "eventSlug",
  ]) {
    if (typeof body[field] === "string") patch[field] = body[field];
  }
  if (typeof body.checkedIn === "boolean") {
    patch.checkedIn = body.checkedIn;
    patch.checkedInAt = body.checkedIn ? new Date().toISOString() : undefined;
  }

  const updated = await updateRegistration(id, patch);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, registration: updated });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await requirePermission("registrations");
  if ("error" in auth) return auth.error;

  const { id } = await params;
  const items = await deleteRegistration(id);
  return NextResponse.json({ ok: true, registrations: items });
}
