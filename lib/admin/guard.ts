// lib/admin/guard.ts
// Per-permission authorization helper for /api/admin routes.
// (Authentication itself is enforced by middleware.ts.)

import { NextResponse } from "next/server";
import { getSession } from "@/lib/admin/auth";
import { sessionCan, type AdminSession, type Permission } from "@/lib/admin/permissions";

export async function requirePermission(
  permission: Permission
): Promise<{ session: AdminSession } | { error: NextResponse }> {
  const session = await getSession();
  if (!session) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (!sessionCan(session, permission)) {
    return {
      error: NextResponse.json(
        { error: "You don't have permission to do this. Ask the owner for access." },
        { status: 403 }
      ),
    };
  }
  return { session };
}
