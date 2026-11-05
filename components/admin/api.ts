// components/admin/api.ts
// Client-side helpers for the admin dashboard.
"use client";

import type { MediaItem } from "@/lib/content-types";

export async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export type UploadResult = {
  url: string;
  key: string;
  size: number;
  folder?: string;
};

export type UploadOptions = {
  /** destination folder, e.g. "events/shield-africa-summit-2026" */
  folder?: string;
  onProgress?: (pct: number) => void;
};

/**
 * Uploads a file to Cloudflare R2 (via presigned URL) or to the local
 * fallback storage, then registers it in the media library. Files are
 * stored under the given folder so media stays organised per section.
 */
export async function uploadFile(
  file: File,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const { folder = "general", onProgress } = options;

  // Try presign (R2) first.
  const presignRes = await fetch("/api/admin/media/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type || "application/octet-stream",
      folder,
    }),
  });

  let result: UploadResult;

  if (presignRes.ok) {
    const { uploadUrl, publicUrl, key, folder: savedFolder } = await presignRes.json();
    await putWithProgress(uploadUrl, file, onProgress);
    result = { url: publicUrl, key, size: file.size, folder: savedFolder };
  } else {
    // Local fallback: multipart upload straight to the API route.
    const form = new FormData();
    form.append("file", file);
    form.append("folder", folder);
    const res = await fetch("/api/admin/media/upload", { method: "POST", body: form });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || "Upload failed");
    }
    const data = await res.json();
    result = {
      url: data.publicUrl,
      key: data.key,
      size: data.size ?? file.size,
      folder: data.folder,
    };
  }

  // Register in the media library.
  await jsonFetch<{ ok: boolean; item: MediaItem }>("/api/admin/media", {
    method: "POST",
    body: JSON.stringify({
      type: file.type.startsWith("video/") ? "video" : "image",
      name: file.name,
      url: result.url,
      key: result.key,
      folder: result.folder ?? folder,
      size: result.size,
    }),
  });

  return result;
}

function putWithProgress(
  url: string,
  file: File,
  onProgress?: (pct: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new Error(`Upload failed (${xhr.status})`));
    xhr.onerror = () => reject(new Error("Upload failed (network error)"));
    xhr.send(file);
  });
}
