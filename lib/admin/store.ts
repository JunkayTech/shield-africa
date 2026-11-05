// lib/admin/store.ts
// Content store for events, site content and the media registry.
// Primary backend: Cloudflare R2 (JSON documents). When R2 is not
// configured (e.g. local development), falls back to JSON files in ./data.

import { promises as fs } from "fs";
import path from "path";
import {
  DEFAULT_CONTENT,
  DEFAULT_EVENTS,
  mergeContent,
  type AnalyticsDoc,
  type MediaItem,
  type Registration,
  type SiteContent,
  type SiteEvent,
} from "@/lib/content-types";
import type { AdminAccount } from "@/lib/admin/admins";
import { isR2Configured, r2GetJson, r2PutJson } from "@/lib/admin/r2";

const KEYS = {
  events: "data/events.json",
  content: "data/content.json",
  media: "data/media.json",
  admins: "data/admins.json",
  registrations: "data/registrations.json",
  analytics: "data/analytics.json",
} as const;

const LOCAL_DIR = path.join(process.cwd(), "data");

async function readDoc<T>(key: keyof typeof KEYS): Promise<T | null> {
  if (isR2Configured()) {
    return r2GetJson<T>(KEYS[key]);
  }
  try {
    const file = path.join(LOCAL_DIR, `${key}.json`);
    const text = await fs.readFile(file, "utf8");
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

async function writeDoc(key: keyof typeof KEYS, data: unknown): Promise<void> {
  if (isR2Configured()) {
    await r2PutJson(KEYS[key], data);
    return;
  }
  await fs.mkdir(LOCAL_DIR, { recursive: true });
  const file = path.join(LOCAL_DIR, `${key}.json`);
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

// ---------- Events ----------

export async function getEvents(): Promise<SiteEvent[]> {
  const saved = await readDoc<SiteEvent[]>("events");
  return saved ?? DEFAULT_EVENTS;
}

export async function saveEvents(events: SiteEvent[]): Promise<void> {
  await writeDoc("events", events);
}

export async function getEvent(slug: string): Promise<SiteEvent | undefined> {
  const events = await getEvents();
  return events.find((e) => e.slug === slug);
}

export async function upsertEvent(event: SiteEvent, originalSlug?: string): Promise<SiteEvent[]> {
  const events = await getEvents();
  const matchSlug = originalSlug || event.slug;
  const idx = events.findIndex((e) => e.slug === matchSlug);
  if (idx >= 0) {
    events[idx] = event;
  } else {
    events.unshift(event);
  }
  // A featured event is the single highlighted "upcoming" event.
  if (event.featured) {
    for (const e of events) {
      if (e.slug !== event.slug) e.featured = false;
    }
  }
  await saveEvents(events);
  return events;
}

export async function deleteEvent(slug: string): Promise<SiteEvent[]> {
  const events = (await getEvents()).filter((e) => e.slug !== slug);
  await saveEvents(events);
  return events;
}

// ---------- Site content ----------

export async function getContent(): Promise<SiteContent> {
  const saved = await readDoc<Partial<SiteContent>>("content");
  return mergeContent(saved);
}

export async function saveContent(content: SiteContent): Promise<void> {
  await writeDoc("content", content);
}

export const defaultContent = DEFAULT_CONTENT;

// ---------- Media registry ----------

export async function getMedia(): Promise<MediaItem[]> {
  const saved = await readDoc<MediaItem[]>("media");
  return saved ?? [];
}

export async function saveMedia(items: MediaItem[]): Promise<void> {
  await writeDoc("media", items);
}

export async function addMediaItem(item: MediaItem): Promise<MediaItem[]> {
  const items = await getMedia();
  items.unshift(item);
  await saveMedia(items);
  return items;
}

export async function removeMediaItem(id: string): Promise<{ removed?: MediaItem; items: MediaItem[] }> {
  const items = await getMedia();
  const removed = items.find((m) => m.id === id);
  const next = items.filter((m) => m.id !== id);
  await saveMedia(next);
  return { removed, items: next };
}

// ---------- Managed admin accounts ----------

export async function getAdmins(): Promise<AdminAccount[]> {
  const saved = await readDoc<AdminAccount[]>("admins");
  return saved ?? [];
}

export async function saveAdmins(admins: AdminAccount[]): Promise<void> {
  await writeDoc("admins", admins);
}

// ---------- Event registrations ----------

export async function getRegistrations(): Promise<Registration[]> {
  const saved = await readDoc<Registration[]>("registrations");
  return saved ?? [];
}

export async function saveRegistrations(items: Registration[]): Promise<void> {
  await writeDoc("registrations", items);
}

export async function addRegistration(
  input: Omit<Registration, "id" | "registrationNumber" | "createdAt" | "checkedIn"> & {
    checkedIn?: boolean;
  }
): Promise<Registration> {
  const items = await getRegistrations();
  const year = new Date().getFullYear();
  const seq = items.length + 1;
  const registration: Registration = {
    ...input,
    id: crypto.randomUUID(),
    registrationNumber: `SA-${year}-${String(seq).padStart(4, "0")}`,
    checkedIn: input.checkedIn ?? false,
    createdAt: new Date().toISOString(),
  };
  items.unshift(registration);
  await saveRegistrations(items);
  return registration;
}

export async function updateRegistration(
  id: string,
  patch: Partial<Registration>
): Promise<Registration | null> {
  const items = await getRegistrations();
  const idx = items.findIndex((r) => r.id === id);
  if (idx < 0) return null;
  // id, number and creation date are immutable
  const { id: _i, registrationNumber: _n, createdAt: _c, ...rest } = patch;
  items[idx] = { ...items[idx], ...rest };
  await saveRegistrations(items);
  return items[idx];
}

export async function deleteRegistration(id: string): Promise<Registration[]> {
  const items = (await getRegistrations()).filter((r) => r.id !== id);
  await saveRegistrations(items);
  return items;
}

// ---------- Analytics (page views) ----------

const ANALYTICS_RETENTION_DAYS = 120;

function dayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export async function trackPageView(path: string): Promise<void> {
  const doc = (await readDoc<AnalyticsDoc>("analytics")) ?? { days: {} };
  const key = dayKey();
  const day = doc.days[key] ?? { total: 0, paths: {} };
  day.total += 1;
  day.paths[path] = (day.paths[path] ?? 0) + 1;
  doc.days[key] = day;

  // prune old days
  const cutoff = dayKey(
    new Date(Date.now() - ANALYTICS_RETENTION_DAYS * 24 * 60 * 60 * 1000)
  );
  for (const k of Object.keys(doc.days)) {
    if (k < cutoff) delete doc.days[k];
  }

  await writeDoc("analytics", doc);
}

export async function getAnalytics(): Promise<AnalyticsDoc> {
  return (await readDoc<AnalyticsDoc>("analytics")) ?? { days: {} };
}
