"use client";

import Link from "next/link";
import Image from "next/image";

// ✅ White background logo (used in header)
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className ?? ""}`}
      aria-label="Shield Africa"
    >
      <Image
        src="/images/logo.png"   // white background version
        alt="Shield Africa Logo"
        width={200}
        height={80}
        className="w-28 md:w-36 h-auto object-contain"
        priority
      />
    </Link>
  );
}

// ✅ Transparent background logo (used in footer)
export function LogoTransparent({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className ?? ""}`}
      aria-label="Shield Africa"
    >
      <Image
        src="/images/logo2.png"   // transparent background version
        alt="Shield Africa Logo Transparent"
        width={200}
        height={80}
        className="w-28 md:w-36 h-auto object-contain"
        priority
      />
    </Link>
  );
}
