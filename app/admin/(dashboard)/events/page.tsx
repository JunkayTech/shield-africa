// app/admin/(dashboard)/events/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { jsonFetch } from "@/components/admin/api";
import { PageHeader } from "@/components/admin/page-header";
import type { SiteEvent } from "@/lib/content-types";

const statusColors: Record<string, string> = {
  upcoming: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  ongoing: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  past: "bg-slate-100 text-slate-700 hover:bg-slate-100",
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<SiteEvent[] | null>(null);

  useEffect(() => {
    jsonFetch<SiteEvent[]>("/api/admin/events")
      .then(setEvents)
      .catch((e) => toast.error(e.message));
  }, []);

  async function remove(slug: string) {
    try {
      const { events: next } = await jsonFetch<{ events: SiteEvent[] }>(
        `/api/admin/events/${slug}`,
        { method: "DELETE" }
      );
      setEvents(next);
      toast.success("Event deleted");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Events"
        description="Everything on the Events page of the website. Click “New event” to add one, or “Edit” to change dates, pictures and videos. Mark one upcoming event as Featured to highlight it on the home page."
        actions={
          <Button asChild>
            <Link href="/admin/events/new">
              <Plus className="h-4 w-4" />
              New event
            </Link>
          </Button>
        }
      />

      <div className="space-y-3">
        {events === null && (
          <p className="text-sm text-muted-foreground">Loading events…</p>
        )}
        {events?.length === 0 && (
          <p className="text-sm text-muted-foreground">No events yet.</p>
        )}
        {events?.map((event) => (
          <div
            key={event.slug}
            className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-background p-4"
          >
            {event.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={event.thumbnail}
                alt=""
                className="h-16 w-24 flex-none rounded-lg border border-border object-cover"
              />
            ) : (
              <div className="h-16 w-24 flex-none rounded-lg border border-dashed border-border bg-muted" />
            )}

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="truncate font-medium">{event.title}</span>
                <Badge className={statusColors[event.status]}>{event.status}</Badge>
                {event.featured && (
                  <Badge variant="outline" className="gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    Featured
                  </Badge>
                )}
              </div>
              <div className="mt-1 truncate text-sm text-muted-foreground">
                {event.date} • {event.location}
              </div>
            </div>

            <div className="flex flex-none items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/admin/events/${event.slug}`}>
                  <Pencil className="h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete “{event.title}”?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This removes the event from the website. This action cannot
                      be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => remove(event.slug)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
