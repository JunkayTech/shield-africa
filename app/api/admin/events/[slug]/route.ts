// app/api/admin/events/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { deleteEvent, getEvent, upsertEvent } from "@/lib/admin/store";
import { sanitizeEvent } from "@/lib/admin/validate";
import { requirePermission } from "@/lib/admin/guard";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(event);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const auth = await requirePermission("events");
  if ("error" in auth) return auth.error;

  const { slug } = await params;
  const existing = await getEvent(slug);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => null);
  const event = body ? sanitizeEvent(body) : null;
  if (!event || !event.slug) {
    return NextResponse.json({ error: "Title and slug are required." }, { status: 400 });
  }
  const events = await upsertEvent(event, slug);
  return NextResponse.json({ ok: true, events });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await requirePermission("events");
  if ("error" in auth) return auth.error;

  const { slug } = await params;
  const events = await deleteEvent(slug);
  return NextResponse.json({ ok: true, events });
}
