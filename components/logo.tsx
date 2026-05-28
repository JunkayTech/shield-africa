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
  width={200}
  height={80}
  className="w-28 md:w-36 h-auto object-contain"
  priority
/>
    </Link>
  );
}
