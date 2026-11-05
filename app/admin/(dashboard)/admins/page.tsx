// app/admin/(dashboard)/admins/page.tsx
// Manage admin team members and what each of them is allowed to do.
"use client";

import { useEffect, useState } from "react";
import { Crown, KeyRound, Loader2, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useAdminSession } from "@/components/admin/shell";
import {
  PERMISSION_INFO,
  PERMISSIONS,
  type Permission,
} from "@/lib/admin/permissions";
import type { PublicAdminAccount } from "@/lib/admin/admins";

type FormState = {
  id: string | null; // null = creating
  name: string;
  email: string;
  password: string;
  permissions: Permission[];
};

const EMPTY: FormState = {
  id: null,
  name: "",
  email: "",
  password: "",
  permissions: ["events", "registrations"],
};

export default function AdminsPage() {
  const session = useAdminSession();
  const [admins, setAdmins] = useState<PublicAdminAccount[] | null>(null);
  const [denied, setDenied] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ ...EMPTY });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/admins", { cache: "no-store" })
      .then(async (r) => {
        if (r.status === 403) {
          setDenied(true);
          return null;
        }
        return r.ok ? r.json() : null;
      })
      .then((d) => d && setAdmins(d))
      .catch(() => {});
  }, []);

  function openCreate() {
    setForm({ ...EMPTY });
    setDialogOpen(true);
  }

  function openEdit(a: PublicAdminAccount) {
    setForm({
      id: a.id,
      name: a.name,
      email: a.email,
      password: "",
      permissions: [...a.permissions],
    });
    setDialogOpen(true);
  }

  function togglePermission(p: Permission, on: boolean) {
    setForm((f) => ({
      ...f,
      permissions: on
        ? [...new Set([...f.permissions, p])]
        : f.permissions.filter((x) => x !== p),
    }));
  }

  async function save() {
    if (!form.name.trim()) return toast.error("Enter the admin's name");
    if (!form.id) {
      if (!form.email.includes("@")) return toast.error("Enter a valid email");
      if (form.password.length < 8)
        return toast.error("Password must be at least 8 characters");
    }
    if (form.id && form.password && form.password.length < 8) {
      return toast.error("New password must be at least 8 characters");
    }

    setSaving(true);
    try {
      if (form.id) {
        const { admins: next } = await jsonFetch<{ admins: PublicAdminAccount[] }>(
          `/api/admin/admins/${form.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              name: form.name,
              permissions: form.permissions,
              ...(form.password ? { password: form.password } : {}),
            }),
          }
        );
        setAdmins(next);
        toast.success("Admin updated");
      } else {
        const { admins: next } = await jsonFetch<{ admins: PublicAdminAccount[] }>(
          "/api/admin/admins",
          {
            method: "POST",
            body: JSON.stringify({
              name: form.name,
              email: form.email,
              password: form.password,
              permissions: form.permissions,
            }),
          }
        );
        setAdmins(next);
        toast.success(
          `Admin added. Share the login details with ${form.name}.`,
          { duration: 6000 }
        );
      }
      setDialogOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    try {
      const { admins: next } = await jsonFetch<{ admins: PublicAdminAccount[] }>(
        `/api/admin/admins/${id}`,
        { method: "DELETE" }
      );
      setAdmins(next);
      toast.success("Admin removed");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  }

  if (denied) {
    return (
      <div className="mx-auto max-w-4xl">
        <PageHeader title="Admins & Access" />
        <p className="rounded-2xl border border-border bg-background p-6 text-sm text-muted-foreground">
          Only admins with the <span className="font-medium">Admins &amp; Access</span>{" "}
          permission can manage the team. Ask the owner for access.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Admins & Access"
        description="Add team members who can sign in to this console, and choose exactly what each person can do. Only tick the boxes they need."
        actions={
          <Button onClick={openCreate}>
            <UserPlus className="h-4 w-4" />
            Add admin
          </Button>
        }
      />

      <div className="space-y-2">
        {/* Owner card */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-background p-4">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <Crown className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">Owner</span>
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                Full access
              </Badge>
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {session?.role === "owner"
                ? `${session.email} (you)`
                : "Configured on the server — can do everything, including managing admins."}
            </div>
          </div>
        </div>

        {admins === null && (
          <p className="p-4 text-sm text-muted-foreground">Loading admins…</p>
        )}
        {admins?.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-background p-8 text-center text-sm text-muted-foreground">
            No other admins yet. Click{" "}
            <span className="font-medium text-foreground">“Add admin”</span> to
            invite a team member.
          </div>
        )}
        {admins?.map((a) => (
          <div
            key={a.id}
            className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-background p-4"
          >
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {a.name
                .split(/\s+/)
                .map((p) => p[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium">{a.name}</div>
              <div className="truncate text-xs text-muted-foreground">{a.email}</div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {a.permissions.length ? (
                  a.permissions.map((p) => (
                    <Badge key={p} variant="secondary" className="text-[10px]">
                      {PERMISSION_INFO[p]?.label ?? p}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="outline" className="text-[10px]">
                    No permissions yet
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex flex-none items-center gap-1">
              <Button variant="outline" size="sm" onClick={() => openEdit(a)}>
                <KeyRound className="h-4 w-4" />
                Edit access
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove {a.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                      They will no longer be able to sign in to the admin console.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => remove(a.id)}>
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>

      {/* Add / edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit admin access" : "Add a new admin"}</DialogTitle>
            <DialogDescription>
              {form.id
                ? "Update this admin's name, password or permissions."
                : "They'll sign in at /admin/login with the email and password you set here."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Full name</Label>
              <Input
                value={form.name}
                placeholder="e.g. Grace Adeyemi"
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            {!form.id && (
              <div className="space-y-2">
                <Label>Email (used to sign in)</Label>
                <Input
                  type="email"
                  value={form.email}
                  placeholder="grace@shieldafrica.org"
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label>
                {form.id ? "New password (leave blank to keep current)" : "Password"}
              </Label>
              <Input
                type="password"
                value={form.password}
                placeholder="At least 8 characters"
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>What can they do?</Label>
              <div className="space-y-2">
                {PERMISSIONS.map((p) => (
                  <label
                    key={p}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 transition hover:bg-muted/50"
                  >
                    <Checkbox
                      checked={form.permissions.includes(p)}
                      onCheckedChange={(v) => togglePermission(p, v === true)}
                      className="mt-0.5"
                    />
                    <span>
                      <span className="block text-sm font-medium">
                        {PERMISSION_INFO[p].label}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {PERMISSION_INFO[p].description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {form.id ? "Save changes" : "Add admin"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
