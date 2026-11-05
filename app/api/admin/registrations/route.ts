// app/api/admin/registrations/route.ts — list & create registrations (desk)
import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/guard";
import { addRegistration, getRegistrations } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requirePermission("registrations");
  if ("error" in auth) return auth.error;
  return NextResponse.json(await getRegistrations());
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission("registrations");
  if ("error" in auth) return auth.error;

  const body = await req.json().catch(() => null);
  const firstName = String(body?.firstName ?? "").trim();
  const lastName = String(body?.lastName ?? "").trim();
  const eventSlug = String(body?.eventSlug ?? "").trim();

  if (!firstName || !lastName || !eventSlug) {
    return NextResponse.json(
      { error: "First name, last name and event are required." },
      { status: 400 }
    );
  }

  const registration = await addRegistration({
    eventSlug,
    firstName,
    lastName,
    email: String(body?.email ?? "").trim(),
    phone: String(body?.phone ?? "").trim(),
    gender: body?.gender ? String(body.gender) : undefined,
    ageGroup: body?.ageGroup ? String(body.ageGroup) : undefined,
    organization: body?.organization ? String(body.organization) : undefined,
    jobTitle: body?.jobTitle ? String(body.jobTitle) : undefined,
    sector: body?.sector ? String(body.sector) : undefined,
    country: body?.country ? String(body.country) : undefined,
    state: body?.state ? String(body.state) : undefined,
    notes: body?.notes ? String(body.notes) : undefined,
    source: "admin",
    // Walk-ins registered at the desk are usually present already.
    checkedIn: Boolean(body?.checkedIn),
    checkedInAt: body?.checkedIn ? new Date().toISOString() : undefined,
  });

  return NextResponse.json({ ok: true, registration });
}
