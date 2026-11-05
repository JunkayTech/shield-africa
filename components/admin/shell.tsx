// components/admin/shell.tsx
// YouTube Studio–style admin shell:
//  - fixed top app bar (menu button, brand, view-site, account menu)
//  - desktop: collapsible sidebar (full ↔ mini icon rail)
//  - mobile: slide-in drawer
// Navigation adapts to the signed-in admin's permissions.
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  ExternalLink,
  Globe,
  Image as ImageIcon,
  LogOut,
  Menu,
  PencilLine,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  sessionCan,
  type AdminSession,
  type Permission,
} from "@/lib/admin/permissions";

/* ------------------------------------------------------------------ */
/* Session context                                                      */
/* ------------------------------------------------------------------ */

const SessionContext = createContext<AdminSession | null>(null);

export function useAdminSession(): AdminSession | null {
  return useContext(SessionContext);
}

/* ------------------------------------------------------------------ */
/* Navigation                                                           */
/* ------------------------------------------------------------------ */

type NavItem = {
  href: string;
  label: string;
  /** Short helper text shown in the expanded sidebar */
  hint: string;
  icon: typeof CalendarDays;
  permission?: Permission;
};

const NAV: NavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    hint: "Statistics & overview",
    icon: BarChart3,
  },
  {
    href: "/admin/events",
    label: "Events",
    hint: "Create & manage events",
    icon: CalendarDays,
    permission: "events",
  },
  {
    href: "/admin/registrations",
    label: "Registrations",
    hint: "Attendees & event-day check-in",
    icon: ClipboardList,
    permission: "registrations",
  },
  {
    href: "/admin/content",
    label: "Site Content",
    hint: "Edit website text & images",
    icon: PencilLine,
    permission: "content",
  },
  {
    href: "/admin/media",
    label: "Media Library",
    hint: "Photos, videos & links",
    icon: ImageIcon,
    permission: "media",
  },
  {
    href: "/admin/admins",
    label: "Admins & Access",
    hint: "Team members & permissions",
    icon: UserCog,
    permission: "admins",
  },
];

function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "A"
  );
}

/* ------------------------------------------------------------------ */
/* Shell                                                                */
/* ------------------------------------------------------------------ */

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setSession)
      .catch(() => {});
    setCollapsed(localStorage.getItem("sa-admin-nav") === "mini");
  }, []);

  function toggleNav() {
    // < md: open the drawer; otherwise collapse/expand the rail
    if (window.innerWidth < 768) {
      setDrawerOpen(true);
    } else {
      setCollapsed((c) => {
        localStorage.setItem("sa-admin-nav", c ? "full" : "mini");
        return !c;
      });
    }
  }

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const visibleNav = NAV.filter(
    (item) => !item.permission || sessionCan(session, item.permission)
  );

  return (
    <SessionContext.Provider value={session}>
      <div className="min-h-screen bg-muted/30">
        {/* ---------------- Top app bar ---------------- */}
        <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center gap-2 border-b border-border bg-background px-2 sm:px-4">
          <button
            onClick={toggleNav}
            aria-label="Toggle menu"
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/admin" className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="min-w-0 leading-tight">
              <div className="truncate font-serif text-[15px] font-semibold">
                Shield Africa
              </div>
              <div className="truncate text-[9px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Admin Console
              </div>
            </div>
          </Link>

          <div className="flex-1" />

          <Link
            href="/"
            target="_blank"
            className="hidden items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            <Globe className="h-4 w-4" />
            View site
            <ExternalLink className="h-3 w-3" />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Account"
                className="ml-1 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary transition hover:ring-2 hover:ring-primary/30"
              >
                {initials(session?.name ?? "A")}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <div className="font-medium">{session?.name ?? "Admin"}</div>
                <div className="mt-0.5 truncate text-xs font-normal text-muted-foreground">
                  {session?.email}
                </div>
                <Badge variant="secondary" className="mt-2 text-[10px] uppercase">
                  {session?.role === "owner" ? "Owner — full access" : "Admin"}
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" target="_blank">
                  <Globe className="h-4 w-4" /> View live site
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} variant="destructive">
                <LogOut className="h-4 w-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* ---------------- Desktop sidebar ---------------- */}
        <aside
          className={cn(
            "fixed bottom-0 left-0 top-14 z-40 hidden flex-col border-r border-border bg-background transition-[width] duration-200 md:flex",
            collapsed ? "w-[76px]" : "w-64"
          )}
        >
          <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
            {visibleNav.map((item) => (
              <SidebarLink
                key={item.href}
                item={item}
                pathname={pathname}
                mini={collapsed}
              />
            ))}
          </nav>
          <div className="border-t border-border px-2 py-3">
            <button
              onClick={logout}
              className={cn(
                "flex w-full items-center rounded-xl text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive",
                collapsed
                  ? "flex-col gap-1 px-1 py-2.5 text-[10px]"
                  : "gap-4 px-4 py-2.5 text-sm font-medium"
              )}
            >
              <LogOut className="h-5 w-5 flex-none" />
              Sign out
            </button>
          </div>
        </aside>

        {/* ---------------- Mobile drawer ---------------- */}
        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="border-b border-border px-4 py-4">
              <SheetTitle className="flex items-center gap-2.5 text-left">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="leading-tight">
                  <span className="block font-serif text-[15px] font-semibold">
                    Shield Africa
                  </span>
                  <span className="block text-[9px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                    Admin Console
                  </span>
                </span>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Admin navigation menu
              </SheetDescription>
            </SheetHeader>
            <nav className="space-y-1 px-2 py-3">
              {visibleNav.map((item) => (
                <SidebarLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  mini={false}
                  onClick={() => setDrawerOpen(false)}
                />
              ))}
            </nav>
            <div className="mt-auto space-y-1 border-t border-border px-2 py-3">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-4 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                onClick={() => setDrawerOpen(false)}
              >
                <Globe className="h-5 w-5" /> View live site
              </Link>
              <button
                onClick={logout}
                className="flex w-full items-center gap-4 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-5 w-5" /> Sign out
              </button>
            </div>
          </SheetContent>
        </Sheet>

        {/* ---------------- Content ---------------- */}
        <main
          className={cn(
            "pt-14 transition-[padding] duration-200",
            collapsed ? "md:pl-[76px]" : "md:pl-64"
          )}
        >
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </SessionContext.Provider>
  );
}

function SidebarLink({
  item,
  pathname,
  mini,
  onClick,
}: {
  item: NavItem;
  pathname: string;
  mini: boolean;
  onClick?: () => void;
}) {
  const active =
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(item.href);
  const Icon = item.icon;

  if (mini) {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        title={item.label}
        className={cn(
          "flex flex-col items-center gap-1 rounded-xl px-1 py-2.5 text-center text-[10px] font-medium transition",
          active
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
        <span className="leading-tight">{item.label.split(" ")[0]}</span>
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 rounded-xl px-4 py-2.5 transition",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5 flex-none" />
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-sm font-medium">{item.label}</span>
        <span
          className={cn(
            "block truncate text-[11px]",
            active ? "text-primary/70" : "text-muted-foreground/70"
          )}
        >
          {item.hint}
        </span>
      </span>
    </Link>
  );
}
