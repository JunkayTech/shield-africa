// app/api/content/route.ts — public, read-only site content
import { NextResponse } from "next/server";
import { getContent } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content, {
    headers: { "Cache-Control": "no-store" },
  });
}
