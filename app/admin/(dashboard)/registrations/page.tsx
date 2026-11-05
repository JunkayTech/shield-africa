// app/admin/(dashboard)/registrations/page.tsx
// Event registration desk: see all registrations, register walk-in
// attendees and check people in on the day of the event.
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Circle,
  Download,
  Loader2,
  Search,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
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
} from "@/components/ui/dialog";
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
import type { Registration, SiteEvent } from "@/lib/content-types";

const EMPTY_FORM = {
  eventSlug: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organization: "",
  gender: "",
  notes: "",
  checkedIn: true,
};

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[] | null>(null);
  const [events, setEvents] = useState<SiteEvent[]>([]);
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    jsonFetch<Registration[]>("/api/admin/registrations")
      .then(setRegistrations)
      .catch((e) => toast.error(e.message));
    jsonFetch<SiteEvent[]>("/api/admin/events")
      .then((evts) => {
        setEvents(evts);
        const upcoming = evts.find((e) => e.status === "upcoming");
        setForm((f) => ({ ...f, eventSlug: upcoming?.slug ?? evts[0]?.slug ?? "" }));
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    if (!registrations) return [];
    const q = search.trim().toLowerCase();
    return registrations.filter((r) => {
      if (eventFilter !== "all" && r.eventSlug !== eventFilter) return false;
      if (statusFilter === "checked" && !r.checkedIn) return false;
      if (statusFilter === "pending" && r.checkedIn) return false;
      if (!q) return true;
      return [
        r.firstName,
        r.lastName,
        r.email,
        r.phone,
        r.registrationNumber,
        r.organization ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [registrations, eventFilter, statusFilter, search]);

  const checkedCount = filtered.filter((r) => r.checkedIn).length;

  function eventTitle(slug: string): string {
    return events.find((e) => e.slug === slug)?.title ?? slug;
  }

  async function toggleCheckIn(r: Registration) {
    try {
      const { registration } = await jsonFetch<{ registration: Registration }>(
        `/api/admin/registrations/${r.id}`,
        { method: "PUT", body: JSON.stringify({ checkedIn: !r.checkedIn }) }
      );
      setRegistrations((list) =>
        list ? list.map((x) => (x.id === r.id ? registration : x)) : list
      );
      toast.success(
        registration.checkedIn
          ? `${r.firstName} checked in ✓`
          : `${r.firstName} marked as not arrived`
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
  }

  async function remove(id: string) {
    try {
      await jsonFetch(`/api/admin/registrations/${id}`, { method: "DELETE" });
      setRegistrations((list) => (list ? list.filter((x) => x.id !== id) : list));
      toast.success("Registration deleted");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  }

  async function submitNew() {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      toast.error("First and last name are required");
      return;
    }
    if (!form.eventSlug) {
      toast.error("Choose an event");
      return;
    }
    setSaving(true);
    try {
      const { registration } = await jsonFetch<{ registration: Registration }>(
        "/api/admin/registrations",
        { method: "POST", body: JSON.stringify(form) }
      );
      setRegistrations((list) => (list ? [registration, ...list] : [registration]));
      toast.success(
        `Registered! Number: ${registration.registrationNumber}`,
        { duration: 6000 }
      );
      setDialogOpen(false);
      setForm((f) => ({ ...EMPTY_FORM, eventSlug: f.eventSlug }));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Registration failed");
    } finally {
      setSaving(false);
    }
  }

  function exportCsv() {
    const rows = [
      [
        "Registration No",
        "First name",
        "Last name",
        "Email",
        "Phone",
        "Organization",
        "Event",
        "Source",
        "Checked in",
        "Registered at",
      ],
      ...filtered.map((r) => [
        r.registrationNumber,
        r.firstName,
        r.lastName,
        r.email,
        r.phone,
        r.organization ?? "",
        eventTitle(r.eventSlug),
        r.source,
        r.checkedIn ? "yes" : "no",
        r.createdAt,
      ]),
    ];
    const csv = rows
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Registrations"
        description="Everyone who registered for an event — from the website or at the desk. On event day, use the green button beside a name to check people in, or “Register attendee” for walk-ins."
        actions={
          <>
            <Button variant="outline" onClick={exportCsv} disabled={!filtered.length}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
            <Button onClick={() => setDialogOpen(true)}>
              <UserPlus className="h-4 w-4" />
              Register attendee
            </Button>
          </>
        }
      />

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, phone or registration number…"
            className="pl-9"
          />
        </div>
        <Select value={eventFilter} onValueChange={setEventFilter}>
          <SelectTrigger className="sm:w-56">
            <SelectValue placeholder="All events" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All events</SelectItem>
            {events.map((e) => (
              <SelectItem key={e.slug} value={e.slug}>
                {e.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Everyone</SelectItem>
            <SelectItem value="checked">Checked in</SelectItem>
            <SelectItem value="pending">Not arrived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-3 text-sm text-muted-foreground">
        {registrations === null
          ? "Loading registrations…"
          : `${filtered.length} ${filtered.length === 1 ? "person" : "people"} · ${checkedCount} checked in`}
      </div>

      {/* List */}
      <div className="mt-4 space-y-2">
        {registrations !== null && filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-background p-10 text-center text-sm text-muted-foreground">
            No registrations found. Click{" "}
            <span className="font-medium text-foreground">“Register attendee”</span>{" "}
            to add someone.
          </div>
        )}
        {filtered.map((r) => (
          <div
            key={r.id}
            className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-background p-4"
          >
            <button
              onClick={() => toggleCheckIn(r)}
              title={r.checkedIn ? "Tap to undo check-in" : "Tap to check in"}
              className={`flex h-11 w-11 flex-none items-center justify-center rounded-full border-2 transition ${
                r.checkedIn
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-border text-muted-foreground hover:border-emerald-400 hover:text-emerald-500"
              }`}
            >
              {r.checkedIn ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : (
                <Circle className="h-6 w-6" />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">
                  {r.firstName} {r.lastName}
                </span>
                <Badge variant="outline" className="font-mono text-[10px]">
                  {r.registrationNumber}
                </Badge>
                <Badge variant={r.source === "admin" ? "outline" : "secondary"}>
                  {r.source === "admin" ? "Desk" : "Website"}
                </Badge>
              </div>
              <div className="mt-0.5 truncate text-xs text-muted-foreground">
                {eventTitle(r.eventSlug)}
                {r.email && <> · {r.email}</>}
                {r.phone && <> · {r.phone}</>}
                {r.organization && <> · {r.organization}</>}
              </div>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-none text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete {r.firstName} {r.lastName}&apos;s registration?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => remove(r.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>

      {/* Register attendee dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Register an attendee</DialogTitle>
            <DialogDescription>
              Fill in the attendee&apos;s details. A registration number is
              created automatically.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Event</Label>
              <Select
                value={form.eventSlug}
                onValueChange={(v) => setForm((f) => ({ ...f, eventSlug: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose the event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((e) => (
                    <SelectItem key={e.slug} value={e.slug}>
                      {e.title} — {e.date}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>First name *</Label>
                <Input
                  value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Last name *</Label>
                <Input
                  value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Organization</Label>
                <Input
                  value={form.organization}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, organization: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select
                  value={form.gender}
                  onValueChange={(v) => setForm((f) => ({ ...f, gender: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Prefer not to say">
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes (optional)</Label>
              <Input
                value={form.notes}
                placeholder="e.g. VIP guest, speaker, press…"
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <div>
                <div className="text-sm font-medium">Check in now</div>
                <div className="text-xs text-muted-foreground">
                  Turn on if the person is already at the event.
                </div>
              </div>
              <Switch
                checked={form.checkedIn}
                onCheckedChange={(v) => setForm((f) => ({ ...f, checkedIn: v }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitNew} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Register
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
