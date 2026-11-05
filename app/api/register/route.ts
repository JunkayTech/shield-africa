// app/api/register/route.ts — public event registration endpoint.
// Mirrors website registrations into the admin store so the team can see
// and check in attendees from the admin dashboard.

import { NextRequest, NextResponse } from "next/server";
import { addRegistration } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const firstName = String(body?.firstName ?? "").trim();
  const lastName = String(body?.lastName ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const eventSlug = String(body?.eventSlug ?? "").trim();

  if (!firstName || !lastName || !email || !eventSlug) {
    return NextResponse.json(
      { error: "firstName, lastName, email and eventSlug are required." },
      { status: 400 }
    );
  }

  const registration = await addRegistration({
    eventSlug,
    firstName,
    lastName,
    email,
    phone: String(body?.phone ?? "").trim(),
    gender: body?.gender ? String(body.gender) : undefined,
    ageGroup: body?.ageGroup ? String(body.ageGroup) : undefined,
    organization: body?.organization ? String(body.organization) : undefined,
    jobTitle: body?.jobTitle ? String(body.jobTitle) : undefined,
    sector: body?.sector ? String(body.sector) : undefined,
    country: body?.country ? String(body.country) : undefined,
    state: body?.state ? String(body.state) : undefined,
    source: "website",
  });

  return NextResponse.json({
    ok: true,
    registrationNumber: registration.registrationNumber,
  });
}
