// app/admin/(dashboard)/layout.tsx
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/shell";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Admin — Shield Africa",
  robots: { index: false, follow: false },
};

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminShell>{children}</AdminShell>
      <Toaster richColors position="top-right" />
    </>
  );
}
