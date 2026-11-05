// components/admin/event-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ImageInput } from "@/components/admin/image-input";
import { MultiUploadButton } from "@/components/admin/multi-upload-button";
import { jsonFetch } from "@/components/admin/api";
import { toEmbedUrl } from "@/lib/embed";
import type { EventStatus, SiteEvent } from "@/lib/content-types";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const EMPTY: SiteEvent = {
  slug: "",
  title: "",
  date: "",
  time: "",
  location: "",
  theme: "",
  body: "",
  status: "upcoming",
  featured: false,
  thumbnail: "",
  mobileThumbnail: "",
  images: [],
  videos: [],
};

export function EventForm({ initial }: { initial?: SiteEvent }) {
  const router = useRouter();
  const isNew = !initial;
  const [event, setEvent] = useState<SiteEvent>(initial ?? EMPTY);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [busy, setBusy] = useState(false);

  function set<K extends keyof SiteEvent>(key: K, value: SiteEvent[K]) {
    setEvent((e) => ({ ...e, [key]: value }));
  }

  // All uploads for this event land in its own media folder.
  const mediaFolder = `events/${event.slug || slugify(event.title) || "new-event"}`;

  async function save() {
    if (!event.title.trim()) {
      toast.error("Title is required");
      return;
    }
    setBusy(true);
    try {
      const payload = { ...event, slug: event.slug || slugify(event.title) };
      if (isNew) {
        await jsonFetch("/api/admin/events", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      } else {
        await jsonFetch(`/api/admin/events/${initial!.slug}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      }
      toast.success(isNew ? "Event created" : "Event saved");
      router.push("/admin/events");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Basics */}
      <Section title="Event details">
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldBlock label="Title">
            <Input
              value={event.title}
              onChange={(e) => {
                set("title", e.target.value);
                if (!slugTouched) set("slug", slugify(e.target.value));
              }}
              placeholder="Shield Africa Summit 2027"
            />
          </FieldBlock>
          <FieldBlock label="Slug (URL)">
            <Input
              value={event.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", slugify(e.target.value));
              }}
              placeholder="shield-africa-summit-2027"
            />
          </FieldBlock>
          <FieldBlock label="Date (as displayed)">
            <Input
              value={event.date}
              onChange={(e) => set("date", e.target.value)}
              placeholder="Thursday, 19th November, 2026"
            />
          </FieldBlock>
          <FieldBlock label="Time (optional)">
            <Input
              value={event.time ?? ""}
              onChange={(e) => set("time", e.target.value)}
              placeholder="9:00AM Prompt"
            />
          </FieldBlock>
          <div className="sm:col-span-2">
            <FieldBlock label="Location">
              <Input
                value={event.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="Abuja, Nigeria"
              />
            </FieldBlock>
          </div>
          <div className="sm:col-span-2">
            <FieldBlock label="Theme (optional)">
              <Input
                value={event.theme ?? ""}
                onChange={(e) => set("theme", e.target.value)}
                placeholder="Strengthening Africa’s Capacity for Sustainable Development…"
              />
            </FieldBlock>
          </div>
          <div className="sm:col-span-2">
            <FieldBlock label="Description">
              <Textarea
                rows={4}
                value={event.body}
                onChange={(e) => set("body", e.target.value)}
                placeholder="What is this event about?"
              />
            </FieldBlock>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-3">
            <Label>Status</Label>
            <Select
              value={event.status}
              onValueChange={(v) => set("status", v as EventStatus)}
            >
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="past">Past</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="featured"
              checked={Boolean(event.featured)}
              onCheckedChange={(v) => set("featured", v)}
            />
            <Label htmlFor="featured">
              Featured event (highlighted on the home page)
            </Label>
          </div>
        </div>
      </Section>

      {/* Images */}
      <Section title="Images">
        <p className="-mt-2 mb-4 text-xs text-muted-foreground">
          Uploads here are stored in this event&apos;s own folder:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">{mediaFolder}</code>
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldBlock label="Thumbnail / flyer (desktop)">
            <ImageInput
              value={event.thumbnail ?? ""}
              onChange={(v) => set("thumbnail", v)}
              folder={mediaFolder}
            />
          </FieldBlock>
          <FieldBlock label="Thumbnail / flyer (mobile, optional)">
            <ImageInput
              value={event.mobileThumbnail ?? ""}
              onChange={(v) => set("mobileThumbnail", v)}
              folder={mediaFolder}
            />
          </FieldBlock>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label className="text-sm">
              Highlight / gallery images (shown on the event&apos;s page)
            </Label>
            <MultiUploadButton
              folder={mediaFolder}
              label="Upload several at once"
              onUploaded={(urls) => set("images", [...event.images, ...urls])}
            />
          </div>
          <div className="mt-3 space-y-3">
            {event.images.map((img, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex-1">
                  <ImageInput
                    value={img}
                    folder={mediaFolder}
                    onChange={(v) =>
                      set(
                        "images",
                        event.images.map((x, j) => (j === i ? v : x))
                      )
                    }
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="text-destructive"
                  onClick={() =>
                    set(
                      "images",
                      event.images.filter((_, j) => j !== i)
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => set("images", [...event.images, ""])}
            >
              <Plus className="h-4 w-4" />
              Add image
            </Button>
          </div>
        </div>
      </Section>

      {/* Videos */}
      <Section title="Videos">
        <p className="text-sm text-muted-foreground">
          Paste YouTube, Vimeo or Cloudflare Stream links — they are embedded on
          the event page. Or upload video files directly; they are stored in
          this event&apos;s folder and played on the page.
        </p>
        <div className="mt-3">
          <MultiUploadButton
            folder={mediaFolder}
            accept="video/*"
            label="Upload video file(s)"
            onUploaded={(urls) =>
              set("videos", [
                ...event.videos,
                ...urls.map((url) => ({ title: "", url })),
              ])
            }
          />
        </div>
        <div className="mt-4 space-y-3">
          {event.videos.map((video, i) => (
            <div key={i} className="rounded-xl border border-border p-4">
              <div className="flex items-start gap-2">
                <div className="grid flex-1 gap-3 sm:grid-cols-[1fr_2fr]">
                  <Input
                    value={video.title}
                    placeholder="Video title (optional)"
                    onChange={(e) =>
                      set(
                        "videos",
                        event.videos.map((v, j) =>
                          j === i ? { ...v, title: e.target.value } : v
                        )
                      )
                    }
                  />
                  <Input
                    value={video.url}
                    placeholder="https://www.youtube.com/watch?v=… or Cloudflare Stream link"
                    onChange={(e) =>
                      set(
                        "videos",
                        event.videos.map((v, j) =>
                          j === i ? { ...v, url: e.target.value } : v
                        )
                      )
                    }
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="text-destructive"
                  onClick={() =>
                    set(
                      "videos",
                      event.videos.filter((_, j) => j !== i)
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {video.url && !toEmbedUrl(video.url) && !/\.(mp4|webm|ogg|mov)/i.test(video.url) && (
                <p className="mt-2 text-xs text-amber-600">
                  This link may not be embeddable — use a YouTube, Vimeo,
                  Cloudflare Stream or direct video file URL.
                </p>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              set("videos", [...event.videos, { title: "", url: "" }])
            }
          >
            <Plus className="h-4 w-4" />
            Add video link
          </Button>
        </div>
      </Section>

      <div className="flex items-center gap-3">
        <Button onClick={save} disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isNew ? "Create event" : "Save changes"}
        </Button>
        <Button variant="outline" onClick={() => router.push("/admin/events")}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-background p-6">
      <h2 className="font-serif text-xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function FieldBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}
