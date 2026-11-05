// lib/embed.ts
// Converts common video URLs (YouTube, Vimeo, Cloudflare Stream) into
// embeddable iframe URLs. Returns null if the URL can't be embedded.

export function toEmbedUrl(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    // YouTube
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch" && u.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
      }
      if (u.pathname.startsWith("/embed/")) return url;
      if (u.pathname.startsWith("/shorts/")) {
        return `https://www.youtube.com/embed/${u.pathname.split("/")[2]}`;
      }
      if (u.pathname.startsWith("/live/")) {
        return `https://www.youtube.com/embed/${u.pathname.split("/")[2]}`;
      }
    }
    if (host === "youtu.be") {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }

    // Vimeo
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
    }
    if (host === "player.vimeo.com") return url;

    // Cloudflare Stream — watch or iframe URLs
    // e.g. https://customer-<code>.cloudflarestream.com/<video-id>/watch
    if (host.endsWith("cloudflarestream.com")) {
      const parts = u.pathname.split("/").filter(Boolean);
      const id = parts[0];
      if (id) return `https://${u.hostname}/${id}/iframe`;
    }

    // Direct video files can be played with a <video> tag instead
    if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(u.pathname)) return null;

    return null;
  } catch {
    return null;
  }
}

export function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url.split("?")[0] ?? "");
}
