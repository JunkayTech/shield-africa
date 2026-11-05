// app/api/admin/media/upload/route.ts
//
// Two upload modes:
//  - Cloudflare R2 configured: POST JSON {filename, contentType} returns a
//    presigned PUT URL; the browser uploads the file directly to R2.
//  - Local fallback: POST multipart/form-data with a "file" field; the file
//    is written to public/uploads and served from /uploads/...
//
// This keeps large video uploads off the Next.js server when R2 is in use.

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import {
  isR2Configured,
  publicUrlForKey,
  r2PresignUpload,
} from "@/lib/admin/r2";
import { requirePermission } from "@/lib/admin/guard";

export const dynamic = "force-dynamic";

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Sanitizes a logical folder like "events/shield-africa-summit-2026". */
function safeFolder(folder: unknown): string {
  const cleaned = String(folder ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9/_-]+/g, "-")
    .replace(/\/{2,}/g, "/")
    .replace(/^[-/]+|[-/]+$/g, "")
    .split("/")
    .filter((seg) => seg && seg !== "." && seg !== "..")
    .slice(0, 3) // keep paths shallow: area/section/sub
    .join("/");
  return cleaned || "general";
}

function uniqueKey(filename: string, folder: string): string {
  const stamp = Date.now().toString(36);
  return `media/${folder}/${stamp}-${safeName(filename)}`;
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission("media");
  if ("error" in auth) return auth.error;

  const contentType = req.headers.get("content-type") || "";

  // Presign mode (R2)
  if (contentType.includes("application/json")) {
    const body = await req.json().catch(() => null);
    if (!body?.filename || !body?.contentType) {
      return NextResponse.json(
        { error: "filename and contentType are required." },
        { status: 400 }
      );
    }
    if (!isR2Configured()) {
      return NextResponse.json(
        { error: "Cloudflare R2 is not configured. Use multipart upload instead.", mode: "local" },
        { status: 400 }
      );
    }
    const folder = safeFolder(body.folder);
    const key = uniqueKey(String(body.filename), folder);
    const uploadUrl = await r2PresignUpload(key, String(body.contentType));
    return NextResponse.json({
      mode: "r2",
      key,
      folder,
      uploadUrl,
      publicUrl: publicUrlForKey(key),
    });
  }

  // Direct multipart mode (local fallback)
  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file field is required." }, { status: 400 });
    }
    const folder = safeFolder(form.get("folder"));
    const key = `uploads/${folder}/${Date.now().toString(36)}-${safeName(file.name)}`;
    const target = path.join(process.cwd(), "public", key);
    await fs.mkdir(path.dirname(target), { recursive: true });
    const bytes = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(target, bytes);
    return NextResponse.json({
      mode: "local",
      key,
      folder,
      publicUrl: `/${key}`,
      size: bytes.length,
    });
  }

  return NextResponse.json({ error: "Unsupported content type." }, { status: 415 });
}
