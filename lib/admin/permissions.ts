// lib/admin/permissions.ts
// Permission catalogue for admin accounts. The owner (configured via
// ADMIN_EMAIL/ADMIN_PASSWORD env vars) always has every permission.

export const PERMISSIONS = [
  "events",
  "registrations",
  "content",
  "media",
  "analytics",
  "admins",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export const PERMISSION_INFO: Record<
  Permission,
  { label: string; description: string }
> = {
  events: {
    label: "Events",
    description: "Add, edit, publish and delete events on the website.",
  },
  registrations: {
    label: "Registrations",
    description:
      "View event registrations, register walk-in attendees and check people in on event day.",
  },
  content: {
    label: "Site Content",
    description:
      "Edit website text: hero, impact stats, projects, values, testimonials, contact details and footer.",
  },
  media: {
    label: "Media Library",
    description: "Upload images and videos, and manage video embed links.",
  },
  analytics: {
    label: "Analytics",
    description: "See website visits, clicks and registration statistics.",
  },
  admins: {
    label: "Admins & Access",
    description: "Add or remove other admins and choose what they can do.",
  },
};

export type AdminRole = "owner" | "admin";

export type AdminSession = {
  email: string;
  name: string;
  role: AdminRole;
  permissions: Permission[];
};

export function sessionCan(
  session: AdminSession | null,
  permission: Permission
): boolean {
  if (!session) return false;
  if (session.role === "owner") return true;
  return session.permissions.includes(permission);
}
