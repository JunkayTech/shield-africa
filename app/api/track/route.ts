// app/api/track/route.ts — lightweight public page-view tracking
import { NextRequest, NextResponse } from "next/server";
import { trackPageView } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  let path = String(body?.path ?? "");

  // only track public site pages
  if (
    !path.startsWith("/") ||
    path.startsWith("/admin") ||
    path.startsWith("/api") ||
    path.length > 200
  ) {
    return NextResponse.json({ ok: false });
  }

  // normalize (strip query/hash)
  path = path.split("?")[0].split("#")[0] || "/";

  try {
    await trackPageView(path);
  } catch {
    // tracking must never break the site
  }
  return NextResponse.json({ ok: true });
}
