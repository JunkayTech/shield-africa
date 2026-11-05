// app/api/admin/media/route.ts
// GET    – list media registry
// POST   – register a media item (uploaded file or external video embed link)
// DELETE – remove a media item (and its R2 object / local file if uploaded)

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { addMediaItem, getMedia, removeMediaItem } from "@/lib/admin/store";
import { isR2Configured, r2DeleteObject } from "@/lib/admin/r2";
import { requirePermission } from "@/lib/admin/guard";
import type { MediaItem } from "@/lib/content-types";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getMedia());
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission("media");
  if ("error" in auth) return auth.error;

  const body = await req.json().catch(() => null);
  if (!body?.url || !body?.type) {
    return NextResponse.json({ error: "url and type are required." }, { status: 400 });
  }
  const item: MediaItem = {
    id: crypto.randomUUID(),
    type: body.type === "video" ? "video" : body.type === "embed" ? "embed" : "image",
    name: String(body.name || body.url.split("/").pop() || "untitled"),
    url: String(body.url),
    key: body.key ? String(body.key) : undefined,
    folder: body.folder ? String(body.folder) : undefined,
    size: typeof body.size === "number" ? body.size : undefined,
    createdAt: new Date().toISOString(),
  };
  const items = await addMediaItem(item);
  return NextResponse.json({ ok: true, item, items });
}

export async function DELETE(req: NextRequest) {
  const auth = await requirePermission("media");
  if ("error" in auth) return auth.error;

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required." }, { status: 400 });

  const { removed, items } = await removeMediaItem(id);

  // Best-effort removal of the underlying stored object.
  if (removed?.key) {
    try {
      if (isR2Configured()) {
        await r2DeleteObject(removed.key);
      } else if (removed.key.startsWith("uploads/")) {
        await fs.unlink(path.join(process.cwd(), "public", removed.key));
      }
    } catch {
      // registry entry is already gone; ignore storage errors
    }
  }

  return NextResponse.json({ ok: true, items });
}
