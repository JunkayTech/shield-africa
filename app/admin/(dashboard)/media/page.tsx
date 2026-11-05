// app/admin/(dashboard)/media/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Copy,
  Film,
  FolderOpen,
  Link2,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { jsonFetch, uploadFile } from "@/components/admin/api";
import { toEmbedUrl } from "@/lib/embed";
import { CASE_STUDIES, galleryFolder } from "@/lib/galleries";
import type { MediaItem, SiteEvent } from "@/lib/content-types";

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [events, setEvents] = useState<SiteEvent[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [destination, setDestination] = useState("general");
  const [folderFilter, setFolderFilter] = useState("all");
  const fileRef = useRef<HTMLInputElement>(null);

  // Embed dialog state
  const [embedOpen, setEmbedOpen] = useState(false);
  const [embedName, setEmbedName] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    refresh();
    jsonFetch<SiteEvent[]>("/api/admin/events").then(setEvents).catch(() => {});
  }, []);

  async function refresh() {
    try {
      setItems(await jsonFetch<MediaItem[]>("/api/admin/media"));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load media");
    }
  }

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        setProgress(0);
        await uploadFile(file, { folder: destination, onProgress: setProgress });
      }
      toast.success(`Uploaded to ${destination}`);
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function addEmbed() {
    if (!embedUrl.trim()) return;
    try {
      await jsonFetch("/api/admin/media", {
        method: "POST",
        body: JSON.stringify({
          type: "embed",
          name: embedName.trim() || embedUrl,
          url: embedUrl.trim(),
        }),
      });
      toast.success("Video link added");
      setEmbedOpen(false);
      setEmbedName("");
      setEmbedUrl("");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to add link");
    }
  }

  async function remove(id: string) {
    try {
      const { items: next } = await jsonFetch<{ items: MediaItem[] }>(
        `/api/admin/media?id=${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );
      setItems(next);
      toast.success("Deleted");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    toast.success("URL copied — paste it into any image/video field");
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-light">Media Library</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Images and videos are stored on Cloudflare R2, organised into
            folders per event and impact project. Choose where a file belongs
            before uploading, then copy its URL into any image field.
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Upload to folder</Label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger className="w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>General</SelectLabel>
                  <SelectItem value="general">General library</SelectItem>
                  <SelectItem value="site">Website pages (site)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Events — highlights &amp; flyers</SelectLabel>
                  {events.map((e) => (
                    <SelectItem key={e.slug} value={`events/${e.slug}`}>
                      {e.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Impact — project galleries</SelectLabel>
                  {CASE_STUDIES.map((cs) => (
                    <SelectItem key={cs.slug} value={galleryFolder(cs.slug)}>
                      {cs.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              handleFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <Button onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {progress > 0 ? `${progress}%` : "Uploading…"}
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload files
              </>
            )}
          </Button>

          <Dialog open={embedOpen} onOpenChange={setEmbedOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Link2 className="h-4 w-4" />
                Add video link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a video embed link</DialogTitle>
                <DialogDescription>
                  Paste a YouTube, Vimeo or Cloudflare Stream link. It can be
                  embedded on event pages.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <Input
                  placeholder="Title (optional)"
                  value={embedName}
                  onChange={(e) => setEmbedName(e.target.value)}
                />
                <Input
                  placeholder="https://www.youtube.com/watch?v=…"
                  value={embedUrl}
                  onChange={(e) => setEmbedUrl(e.target.value)}
                />
                {embedUrl && !toEmbedUrl(embedUrl) && (
                  <p className="text-xs text-amber-600">
                    This link may not be embeddable. YouTube, Vimeo and
                    Cloudflare Stream links work best.
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button onClick={addEmbed}>Add link</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Folder filter */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <FolderOpen className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Browse folder:</span>
        <Select value={folderFilter} onValueChange={setFolderFilter}>
          <SelectTrigger className="w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All folders</SelectItem>
            {[...new Set((items ?? []).map((i) => i.folder || "general"))]
              .sort()
              .map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items === null && (
          <p className="text-sm text-muted-foreground">Loading media…</p>
        )}
        {items?.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No media yet. Upload images/videos or add a video link.
          </p>
        )}
        {items
          ?.filter(
            (item) =>
              folderFilter === "all" || (item.folder || "general") === folderFilter
          )
          .map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-border bg-background"
          >
            <div className="relative aspect-video bg-muted">
              {item.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              ) : item.type === "embed" && toEmbedUrl(item.url) ? (
                <iframe
                  src={toEmbedUrl(item.url)!}
                  className="h-full w-full"
                  allowFullScreen
                  title={item.name}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <Film className="h-10 w-10" />
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-medium">{item.name}</span>
                <Badge variant="secondary" className="flex-none text-[10px] uppercase">
                  {item.type}
                </Badge>
              </div>
              {item.type !== "embed" && (
                <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <FolderOpen className="h-3 w-3" />
                  {item.folder || "general"}
                </div>
              )}
              <div className="mt-3 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => copyUrl(item.url)}
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy URL
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() => remove(item.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
