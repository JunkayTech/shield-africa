// app/admin/(dashboard)/page.tsx — analytics dashboard
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  CalendarPlus,
  ClipboardList,
  Eye,
  Image as ImageIcon,
  PencilLine,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAdminSession } from "@/components/admin/shell";
import { sessionCan } from "@/lib/admin/permissions";
import type { Registration } from "@/lib/content-types";

type Analytics = {
  views: { today: number; last7: number; last30: number; allTime: number };
  series: { date: string; views: number }[];
  topPages: { path: string; views: number }[];
  registrations: {
    total: number;
    today: number;
    checkedIn: number;
    recent: Registration[];
  };
  events: { total: number; upcoming: number };
};

export default function AdminDashboard() {
  const session = useAdminSession();
  const [data, setData] = useState<Analytics | null>(null);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    fetch("/api/admin/analytics", { cache: "no-store" })
      .then((r) => {
        if (r.status === 403) {
          setDenied(true);
          return null;
        }
        return r.ok ? r.json() : null;
      })
      .then((d) => d && setData(d))
      .catch(() => {});
  }, []);

  const firstName = session?.name?.split(" ")[0] ?? "there";

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-medium sm:text-3xl">
          Welcome back, {firstName} 👋
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening on shieldafrica.org.
        </p>
      </div>

      {/* ---------- Quick actions ---------- */}
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          What would you like to do?
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(!session || sessionCan(session, "events")) && (
            <QuickAction
              href="/admin/events/new"
              icon={<CalendarPlus className="h-5 w-5" />}
              title="Create an event"
              text="Add a new upcoming event to the website."
            />
          )}
          {(!session || sessionCan(session, "registrations")) && (
            <QuickAction
              href="/admin/registrations"
              icon={<ClipboardList className="h-5 w-5" />}
              title="Register an attendee"
              text="Sign someone up or check them in on event day."
            />
          )}
          {(!session || sessionCan(session, "content")) && (
            <QuickAction
              href="/admin/content"
              icon={<PencilLine className="h-5 w-5" />}
              title="Edit website text"
              text="Change words and pictures on any page."
            />
          )}
          {(!session || sessionCan(session, "media")) && (
            <QuickAction
              href="/admin/media"
              icon={<ImageIcon className="h-5 w-5" />}
              title="Upload photos & videos"
              text="Add media to use anywhere on the site."
            />
          )}
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      {denied ? (
        <p className="mt-8 rounded-2xl border border-border bg-background p-6 text-sm text-muted-foreground">
          You don&apos;t have access to website statistics. Ask the owner to grant
          you the <span className="font-medium">Analytics</span> permission.
        </p>
      ) : (
        <>
          <section className="mt-8">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Website statistics
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                icon={<Eye className="h-4 w-4" />}
                label="Visits today"
                value={data ? data.views.today : "—"}
              />
              <StatCard
                icon={<TrendingUp className="h-4 w-4" />}
                label="Visits · last 7 days"
                value={data ? data.views.last7 : "—"}
              />
              <StatCard
                icon={<Users className="h-4 w-4" />}
                label="Registrations"
                value={data ? data.registrations.total : "—"}
                sub={data ? `${data.registrations.today} today` : undefined}
              />
              <StatCard
                icon={<UserCheck className="h-4 w-4" />}
                label="Checked in"
                value={data ? data.registrations.checkedIn : "—"}
                sub={data ? `${data.events.upcoming} upcoming events` : undefined}
              />
            </div>
          </section>

          <section className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
            {/* Views chart */}
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Page views — last 28 days</h3>
                <Badge variant="secondary">
                  {data ? `${data.views.last30} in 30 days` : "…"}
                </Badge>
              </div>
              <div className="mt-4 h-56 w-full">
                {data && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.series} margin={{ left: -24, right: 4, top: 4 }}>
                      <defs>
                        <linearGradient id="views" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(d: string) => d.slice(5)}
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                        interval={6}
                      />
                      <YAxis
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid var(--border)",
                          fontSize: 12,
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="views"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        fill="url(#views)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Top pages */}
            <div className="rounded-2xl border border-border bg-background p-5">
              <h3 className="text-sm font-semibold">Most visited pages</h3>
              <div className="mt-4 space-y-3">
                {data?.topPages.length ? (
                  data.topPages.map((p) => {
                    const max = data.topPages[0]?.views || 1;
                    return (
                      <div key={p.path}>
                        <div className="flex items-center justify-between gap-2 text-sm">
                          <span className="truncate font-medium">
                            {p.path === "/" ? "Home" : p.path}
                          </span>
                          <span className="flex-none text-muted-foreground">
                            {p.views}
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${Math.max(6, (p.views / max) * 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No visits recorded yet. Statistics appear as soon as people
                    browse the website.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Recent registrations */}
          <section className="mt-6 rounded-2xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Latest registrations</h3>
              <Link
                href="/admin/registrations"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-4 divide-y divide-border">
              {data?.registrations.recent.length ? (
                data.registrations.recent.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-wrap items-center justify-between gap-2 py-3"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">
                        {r.firstName} {r.lastName}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {r.registrationNumber} · {r.eventSlug}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={r.source === "admin" ? "outline" : "secondary"}>
                        {r.source === "admin" ? "Desk" : "Website"}
                      </Badge>
                      {r.checkedIn && (
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                          Checked in
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-3 text-sm text-muted-foreground">
                  No registrations yet. They&apos;ll appear here when people sign up
                  on the website or at the registration desk.
                </p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div className="mt-3 font-serif text-3xl font-light">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-border bg-background p-5 transition hover:border-primary/50 hover:shadow-md"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <div className="mt-3 flex items-center gap-1 font-medium">
        {title}
        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
      </div>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </Link>
  );
}
