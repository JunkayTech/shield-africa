"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Sparkles, Quote } from "lucide-react";
import { PageLayout } from "@/components/page-layout";
import { Reveal, Counter } from "@/components/reveal";
import { programs, stats, type Program } from "@/lib/site";

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <Marquee />
      <Stats />
      <Programs />
      <Partners />
      <Testimonials />
      <Newsletter />
    </PageLayout>
  );
}

function Hero() {
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
          src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=80"
          alt="African community gathered at golden hour"
          fill
          priority
          className="h-full w-full object-cover animate-slow-zoom"
          style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.08)` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.18_0.04_210/0.85)_0%,oklch(0.32_0.07_195/0.75)_55%,oklch(0.22_0.05_200/0.85)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,oklch(0.72_0.18_50/0.18),transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Est. 2014 · Operating in 14 states
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-light leading-[1.02] text-white text-balance sm:text-7xl lg:text-[5.5rem]">
            Sustainable
            <br />
            development across{" "}
            <span className="italic text-accent">Africa.</span>
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            We partner with communities, governments and grassroots leaders to
            unlock agency, capital and capacity — building futures that outlast
            our presence.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/impact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-foreground shadow-elevated transition hover:-translate-y-0.5"
            >
              Explore Our Impact
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground shadow-elevated transition hover:-translate-y-0.5"
            >
              Partner With Us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <div className="mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t border-white/20 pt-8">
            {[
              { v: "165K+", l: "Lives touched" },
              { v: "108", l: "Communities" },
              { v: "14", l: "States in Nigeria" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif text-3xl font-light text-white sm:text-4xl">
                  {s.v}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.15em] text-white/60">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Agriculture",
    "Education",
    "Humanitarian Aid",
    "Health",
    "Women Empowerment",
    "Youth Capacity",
    "Climate Resilience",
    "Community Dev.",
  ];
  return (
    <div className="border-y border-border bg-surface py-6 overflow-hidden">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-serif text-2xl italic text-muted-foreground/60"
          >
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Stats() {
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
                Our impact across communities.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Empowering communities through sustainable development
                initiatives, humanitarian aid and capacity building programs
                across Nigeria.
              </p>
              <Link
                href="/impact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                See the full impact report <ArrowRight className="h-4 w-4" />
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

function Programs() {
  return (
    <section className="relative bg-surface py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Programs & Projects
              </div>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
                Built with communities, designed to last.
              </h2>
            </div>
            <Link
              href="/impact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-5 py-2.5 text-sm font-medium transition hover:bg-secondary"
            >
              All programs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.slice(0, 6).map((p, i) => (
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
  agriculture: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
  education: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
  medical: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  women: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
  humanitarian: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
};

export function ProgramCard({ program }: { program: Program }) {
  const img = imageMap[program.image] || imageMap.agriculture;
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
        <div className="text-xs text-muted-foreground">{program.location}</div>
        <h3 className="mt-2 font-serif text-2xl font-medium leading-snug text-foreground">
          {program.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {program.description}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-5 text-sm font-medium">
          <span className="text-foreground">Read case study</span>
          <ArrowUpRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}

function Partners() {
  const partners = [
    "UNDP",
    "USAID",
    "FCDO",
    "Mastercard Foundation",
    "Ford Foundation",
    "Federal Ministry of Agriculture",
    "Open Society",
    "African Union",
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Trusted Partners
            </div>
            <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-light sm:text-4xl">
              In partnership with governments, donors and global institutions.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {partners.map((p) => (
              <div
                key={p}
                className="flex aspect-[3/1] items-center justify-center bg-surface-elevated px-4 text-center"
              >
                <span className="font-serif text-base font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground sm:text-lg">
                  {p}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "Shield Africa didn't just bring inputs — they brought a model. Our cooperative now feeds three neighboring villages.",
      name: "Mama Felicia Adoyi",
      role: "Cooperative Lead · Naka, Benue",
    },
    {
      quote:
        "Their rigor on data, their humility on the ground — it's rare. They are the partner we measure others against.",
      name: "Dr. Yetunde Okafor",
      role: "Programme Officer · UNDP Nigeria",
    },
    {
      quote:
        "I learned to read a balance sheet and to negotiate with offtakers. That changed everything for my farm.",
      name: "Ibrahim Suleiman",
      role: "Graduate · Young Agri-preneur Cohort 06",
    },
  ];
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
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
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

function Newsletter() {
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
                Stay updated on impact stories from the field.
              </h2>
              <p className="mt-5 max-w-md text-base text-muted-foreground">
                A monthly letter from the communities we serve — never spam,
                always signal.
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
