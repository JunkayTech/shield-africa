// app/api/admin/content/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/admin/store";
import { mergeContent, type SiteContent } from "@/lib/content-types";
import { requirePermission } from "@/lib/admin/guard";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getContent());
}

export async function PUT(req: NextRequest) {
  const auth = await requirePermission("content");
  if ("error" in auth) return auth.error;

  const body = (await req.json().catch(() => null)) as Partial<SiteContent> | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid content payload." }, { status: 400 });
  }
  // Merge over defaults so partial payloads can never corrupt the document.
  const content = mergeContent(body);
  await saveContent(content);
  return NextResponse.json({ ok: true, content });
}
