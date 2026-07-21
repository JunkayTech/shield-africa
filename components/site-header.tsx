"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Logo } from "./logo";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Impact",
    href: "/impact",
    children: [
      { href: "/impact", label: "Impact" },
      {
        label: "Farmers Academy",
        href: "/impact/case-studies/farmers-academy",
      },
      {
        label: "Young Agri-preneur Financing",
        href: "/impact/case-studies/young-agripreneur-financing",
      },
      {
        label: "Dry Season Rice Farming",
        href: "/impact/case-studies/dry-season-rice",
      },
      {
        label: "School for the Blind",
        href: "/impact/case-studies/school-for-the-blind",
      },
      {
        label: "Naka Farming Project",
        href: "/impact/case-studies/naka-farming-project",
      },
      {
        label: "Jeje Outreach Project",
        href: "/impact/case-studies/jeje-outreach-project",
      },
      {
        label: "Pagi Medical Outreach",
        href: "/impact/case-studies/pagi-medical",
      },
      {
        label: "VAW Campaign",
        href: "/impact/case-studies/vaw-campaign",
      },
    ],
  },
  { href: "/events", label: "Events" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [impactOpen, setImpactOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setImpactOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white transition-shadow duration-300 ${
        scrolled
          ? "border-border/60 shadow-soft"
          : "border-border/40"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:h-24 sm:px-8">
        <Logo />

        {/* DESKTOP NAVIGATION */}

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            if ("children" in item) {
              return (
                <div
                  key={item.href}
                  className="group relative"
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </Link>

                  <div className="absolute left-0 top-full hidden w-80 rounded-2xl border border-border bg-white p-2 shadow-elevated group-hover:block">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-4 py-3 text-sm text-foreground/80 transition hover:bg-secondary hover:text-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated sm:inline-flex"
          >
            Partner With Us
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-elevated text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">

            {nav.map((item) => {

              if ("children" in item) {
                return (
                  <div key={item.href}>
                    <button
                      type="button"
                      onClick={() => setImpactOpen(!impactOpen)}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium text-foreground/80 hover:bg-secondary"
                    >
                      <span>{item.label}</span>

                      {impactOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>

                    {impactOpen && (
                      <div className="ml-4 border-l border-border pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-3 py-2 text-sm text-foreground/70 hover:bg-secondary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-base font-medium text-foreground/80 hover:bg-secondary"
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-4 py-3 text-base font-medium text-accent-foreground"
            >
              Partner With Us
              <ArrowUpRight className="h-4 w-4" />
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}
