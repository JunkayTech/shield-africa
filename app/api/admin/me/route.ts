// app/api/admin/me/route.ts — current admin session info for the UI
import { NextResponse } from "next/server";
import { getSession } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(session);
}
