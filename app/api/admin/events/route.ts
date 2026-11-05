// app/api/admin/events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getEvents, upsertEvent } from "@/lib/admin/store";
import { sanitizeEvent } from "@/lib/admin/validate";
import { requirePermission } from "@/lib/admin/guard";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getEvents());
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission("events");
  if ("error" in auth) return auth.error;

  const body = await req.json().catch(() => null);
  const event = body ? sanitizeEvent(body) : null;
  if (!event || !event.slug) {
    return NextResponse.json({ error: "Title and slug are required." }, { status: 400 });
  }
  const existing = await getEvents();
  if (existing.some((e) => e.slug === event.slug)) {
    return NextResponse.json(
      { error: `An event with slug "${event.slug}" already exists.` },
      { status: 409 }
    );
  }
  const events = await upsertEvent(event);
  return NextResponse.json({ ok: true, events });
}
