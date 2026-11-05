// hooks/use-site-content.ts
// Client hook that loads editable site content. Renders instantly with the
// built-in defaults, then swaps in admin-edited content once fetched.
"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_CONTENT,
  DEFAULT_EVENTS,
  type SiteContent,
  type SiteEvent,
} from "@/lib/content-types";

export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/content", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && !cancelled) setContent(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}

export function useSiteEvents(): SiteEvent[] {
  const [events, setEvents] = useState<SiteEvent[]>(DEFAULT_EVENTS);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/events", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && !cancelled) setEvents(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return events;
}
