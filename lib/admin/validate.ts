// lib/admin/validate.ts
import type { SiteEvent } from "@/lib/content-types";

export function sanitizeEvent(input: Partial<SiteEvent>): SiteEvent | null {
  if (!input.title || !input.slug) return null;
  return {
    slug: String(input.slug)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, ""),
    title: String(input.title),
    date: String(input.date ?? ""),
    time: input.time ? String(input.time) : undefined,
    location: String(input.location ?? ""),
    theme: input.theme ? String(input.theme) : undefined,
    body: String(input.body ?? ""),
    status:
      input.status === "past" || input.status === "ongoing"
        ? input.status
        : "upcoming",
    featured: Boolean(input.featured),
    thumbnail: input.thumbnail ? String(input.thumbnail) : undefined,
    mobileThumbnail: input.mobileThumbnail
      ? String(input.mobileThumbnail)
      : undefined,
    images: Array.isArray(input.images)
      ? input.images.map(String).filter(Boolean)
      : [],
    videos: Array.isArray(input.videos)
      ? input.videos
          .filter((v) => v && typeof v.url === "string" && v.url)
          .map((v) => ({ title: String(v.title ?? ""), url: String(v.url) }))
      : [],
  };
}
