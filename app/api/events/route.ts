// app/api/events/route.ts — public, read-only events list
import { NextResponse } from "next/server";
import { getEvents } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const events = await getEvents();
  return NextResponse.json(events, {
    headers: { "Cache-Control": "no-store" },
  });
}
