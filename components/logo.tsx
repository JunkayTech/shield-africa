"use client";

import Link from "next/link";
import Image from "next/image";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3"
      aria-label="Shield Africa"
    >
      <Image
  src="/images/logo.png"
  alt="Shield Africa Logo"
  width={110}
  height={40}
  className="object-contain"
  style={{ width: "auto", height: "auto" }}
  priority
    />
    </Link>
  );
}