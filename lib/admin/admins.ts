// lib/admin/admins.ts
// Managed admin accounts (in addition to the env-configured owner).
// Passwords are hashed with scrypt; hashes never leave the server.

import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import type { Permission } from "@/lib/admin/permissions";

export type AdminAccount = {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // "salt:hex"
  permissions: Permission[];
  createdAt: string;
};

export type PublicAdminAccount = Omit<AdminAccount, "passwordHash">;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return (
    candidate.length === expected.length && timingSafeEqual(candidate, expected)
  );
}

export function toPublicAdmin(a: AdminAccount): PublicAdminAccount {
  const { passwordHash: _hash, ...pub } = a;
  return pub;
}
