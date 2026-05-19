"use client";

import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="Shield Africa">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${inverted ? "bg-white" : "bg-primary"}`}>
        <svg viewBox="0 0 32 32" className={`h-7 w-7 ${inverted ? "text-primary" : "text-white"}`} fill="currentColor">
          <path d="M16 2L4 8v8c0 7.732 5.12 14.944 12 17 6.88-2.056 12-9.268 12-17V8L16 2zm0 4l8 4v6c0 5.824-3.84 11.256-8 13-4.16-1.744-8-7.176-8-13v-6l8-4z"/>
          <path d="M16 10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
      </div>
      <div className={inverted ? "text-white" : "text-foreground"}>
        <div className="font-serif text-lg font-semibold leading-tight">Shield Africa</div>
        <div className={`text-[10px] uppercase tracking-[0.15em] ${inverted ? "text-white/70" : "text-muted-foreground"}`}>
          Sustainable Development
        </div>
      </div>
    </Link>
  );
}
