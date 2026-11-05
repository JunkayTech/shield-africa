// app/api/admin/analytics/route.ts — aggregated stats for the dashboard
import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/guard";
import { getAnalytics, getEvents, getRegistrations } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

function dayKey(offsetDays: number): string {
  return new Date(Date.now() - offsetDays * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
}

export async function GET() {
  const auth = await requirePermission("analytics");
  if ("error" in auth) return auth.error;

  const [analytics, registrations, events] = await Promise.all([
    getAnalytics(),
    getRegistrations(),
    getEvents(),
  ]);

  // Daily series for the last 28 days (oldest first)
  const series: { date: string; views: number }[] = [];
  for (let i = 27; i >= 0; i--) {
    const key = dayKey(i);
    series.push({ date: key, views: analytics.days[key]?.total ?? 0 });
  }

  const sumRange = (days: number) => {
    let total = 0;
    for (let i = 0; i < days; i++) {
      total += analytics.days[dayKey(i)]?.total ?? 0;
    }
    return total;
  };

  // Top pages over the last 30 days
  const pageTotals: Record<string, number> = {};
  for (let i = 0; i < 30; i++) {
    const day = analytics.days[dayKey(i)];
    if (!day) continue;
    for (const [path, count] of Object.entries(day.paths)) {
      pageTotals[path] = (pageTotals[path] ?? 0) + count;
    }
  }
  const topPages = Object.entries(pageTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([path, views]) => ({ path, views }));

  const today = dayKey(0);
  const regToday = registrations.filter((r) => r.createdAt.slice(0, 10) === today);

  return NextResponse.json({
    views: {
      today: analytics.days[today]?.total ?? 0,
      last7: sumRange(7),
      last30: sumRange(30),
      allTime: Object.values(analytics.days).reduce((a, d) => a + d.total, 0),
    },
    series,
    topPages,
    registrations: {
      total: registrations.length,
      today: regToday.length,
      checkedIn: registrations.filter((r) => r.checkedIn).length,
      recent: registrations.slice(0, 6),
    },
    events: {
      total: events.length,
      upcoming: events.filter((e) => e.status === "upcoming").length,
    },
  });
}
