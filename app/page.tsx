"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { PageLayout } from "@/components/page-layout";
import { Reveal, Counter } from "@/components/reveal";
import { useSiteContent, useSiteEvents } from "@/hooks/use-site-content";
import type {
  Program,
  SiteContent,
  SiteEvent,
  Stat,
  Testimonial,
} from "@/lib/content-types";

export default function HomePage() {
  const content = useSiteContent();
  const events = useSiteEvents();

  return (
    <PageLayout>
      <Hero hero={content.hero} />
      <Marquee items={content.marquee} />
      <Stats stats={content.stats} impact={content.impact} />
      <Programs programs={content.programs} />

      <UpcomingEvents events={events} />

      <Testimonials items={content.testimonials} />
      <Newsletter data={content.newsletter} />
    </PageLayout>
  );
}

function Hero({ hero }: { hero: SiteContent["hero"] }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.25);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={hero.backgroundImage}
          alt="African community gathered at golden hour"
          fill
          priority
          className="h-full w-full object-cover animate-slow-zoom"
          style={{
            transform: `translate3d(0, ${offset}px, 0) scale(1.08)`,
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.18_0.04_210/0.85)_0%,oklch(0.32_0.07_195/0.75)_55%,oklch(0.22_0.05_200/0.85)_100%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,oklch(0.72_0.18_50/0.18),transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <Reveal delay={120}>
          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-light leading-[1.02] text-white text-balance sm:text-7xl lg:text-[5.5rem]">
            {hero.titleLine1}
            <br />
            <span className="italic text-accent">{hero.titleLine2}</span>
            <br />
            {hero.titleLine3Prefix}{" "}
            <span className="italic text-accent">{hero.titleLine3Accent}</span>
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={hero.primaryCtaHref}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-foreground shadow-elevated transition hover:-translate-y-0.5"
            >
              {hero.primaryCtaLabel}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href={hero.secondaryCtaHref}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground shadow-elevated transition hover:-translate-y-0.5"
            >
              {hero.secondaryCtaLabel}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee({ items }: { items: string[] }) {
  return (
    <div className="border-y border-border bg-surface py-6 overflow-hidden">
      <div className="flex w-max animate-marquee gap-6 sm:gap-12 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-6 sm:gap-12 font-serif text-base sm:text-2xl italic text-muted-foreground/60"
          >
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Stats({
  stats,
  impact,
}: {
  stats: Stat[];
  impact: SiteContent["impact"];
}) {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Our Impact
              </div>

              <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
                {impact.heading}
              </h2>

              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                {impact.text}
              </p>

              <Link
                href="/impact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                See the full impact report
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-border md:grid-cols-2">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 60}>
                <div className="group relative h-full bg-surface-elevated p-7 transition-colors hover:bg-secondary sm:p-9">
                  <div className="font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>

                  <div className="mt-3 text-sm font-medium text-muted-foreground">
                    {s.label}
                  </div>

                  <div className="absolute right-6 top-6 h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition group-hover:opacity-100" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Programs({ programs }: { programs: Program[] }) {
  return (
    <section className="relative bg-surface py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Projects
              </div>

              <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
                Built with communities, designed to last.
              </h2>
            </div>

            <Link
              href="/impact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-5 py-2.5 text-sm font-medium transition hover:bg-secondary"
            >
              All projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80}>
              <ProgramCard program={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const imageMap: Record<string, string> = {
  agriculture: "/images/agriculture.jpg",
  education: "/images/education.jpg",
  medical: "/images/medical.jpg",
  women: "/images/women.jpg",
  humanitarian: "/images/humanitarian.jpg",
  agripreneur: "/images/agri-preneur.jpg",
};

export function ProgramCard({ program }: { program: Program }) {
  const img =
    program.image.startsWith("/") || program.image.startsWith("http")
      ? program.image
      : imageMap[program.image] || imageMap.agriculture;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface-elevated shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated">
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image
          src={img}
          alt={program.title}
          fill
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground backdrop-blur">
          {program.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="text-xs text-muted-foreground">
          {program.location}
        </div>

        <h3 className="mt-2 font-serif text-2xl font-medium leading-snug text-foreground">
          {program.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {program.description}
        </p>

        <Link
          href={program.caseStudyUrl}
          className="mt-6 flex items-center justify-between border-t border-border pt-5 text-sm font-medium transition hover:text-primary"
        >
          <span className="text-foreground">More</span>

          <ArrowUpRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}


function UpcomingEvents({ events }: { events: SiteEvent[] }) {
  const featured =
    events.find((e) => e.featured && e.status === "upcoming") ??
    events.find((e) => e.status === "upcoming");

  if (!featured) return null;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Upcoming Events
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 overflow-hidden rounded-3xl border border-border bg-surface-elevated p-6 sm:p-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={featured.thumbnail || featured.images[0] || "/placeholder.jpg"}
                  alt={`${featured.title} flyer`}
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <div className="inline-flex rounded-full bg-accent/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                  Featured Event.
                </div>

                <h3 className="mt-5 font-serif text-4xl font-light leading-tight">
                  {featured.title}
                </h3>

                {featured.theme && (
                  <div className="mt-8 space-y-3 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Theme:</span>{" "}
                      {featured.theme}
                    </p>
                  </div>
                )}

                <div className="mt-8 space-y-3 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Date:</span>{" "}
                    {featured.date}
                  </p>

                  {featured.time && (
                    <p>
                      <span className="font-medium text-foreground">Time:</span>{" "}
                      {featured.time}
                    </p>
                  )}

                  <p>
                    <span className="font-medium text-foreground">
                      Location:
                    </span>{" "}
                    {featured.location}
                  </p>
                </div>

                <Link
                  href="/events"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  View Event Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section className="bg-primary-deep py-28 text-white sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Voices from the field
            </div>

            <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
              Stories that travel with us.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <Quote className="h-8 w-8 text-accent" />

                <blockquote className="mt-6 font-serif text-xl leading-relaxed text-white/95">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-8 border-t border-white/10 pt-5">
                  <div className="font-medium text-white">{t.name}</div>
                  <div className="text-sm text-white/60">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter({ data }: { data: SiteContent["newsletter"] }) {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface-elevated to-secondary p-10 sm:p-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

            <div className="relative">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Field Dispatch
              </div>

              <h2 className="mt-4 max-w-xl font-serif text-3xl font-light leading-tight sm:text-5xl">
                {data.heading}
              </h2>

              <p className="mt-5 max-w-md text-base text-muted-foreground">
                {data.text}
              </p>

              <form
                className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder="you@organization.org"
                  className="flex-1 rounded-full border border-border bg-background px-5 py-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <button
                  type="submit"
                  className="rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:opacity-90"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
