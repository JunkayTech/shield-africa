"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { PageLayout } from "@/components/page-layout";
import { Reveal, Counter } from "@/components/reveal";
import { programs, stats, type Program } from "@/lib/site";

const imageMap: Record<string, string> = {
  agriculture: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
  education: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
  medical: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  women: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
  humanitarian: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
};

export default function ImpactPage() {
  const featured = programs.slice(0, 3);
  return (
    <PageLayout>
      <section className="relative pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.18em] text-primary">
              Our Impact
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-5xl font-serif text-5xl font-light leading-[1.05] text-balance sm:text-7xl">
              Measured in lives,{" "}
              <span className="italic text-primary">not pageviews.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Every number below is grounded in third-party verified field
              data. We publish what worked, what didn&apos;t, and what we changed
              because of it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats dashboard */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-border md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 40}>
                <div className="h-full bg-surface-elevated p-7">
                  <div className="font-serif text-4xl font-light sm:text-5xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured case studies */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.18em] text-primary">
                Case Studies
              </div>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
                Three programs. Three theories of change.
              </h2>
            </div>
          </Reveal>
          <div className="mt-16 space-y-20">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={80}>
                <article
                  className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
                    i % 2 === 1 ? "lg:[&>:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative overflow-hidden rounded-3xl">
                    <Image
                      src={imageMap[p.image] || imageMap.agriculture}
                      alt={p.title}
                      width={640}
                      height={512}
                      className="aspect-[5/4] w-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="inline-flex rounded-full bg-accent/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-accent-foreground">
                      {p.category}
                    </span>
                    <h3 className="mt-5 font-serif text-3xl font-light leading-tight sm:text-4xl">
                      {p.title}
                    </h3>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" /> {p.location}
                    </div>
                    <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                    <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-6">
                      {[
                        { v: "12K+", l: "Direct beneficiaries" },
                        { v: "94%", l: "Retention" },
                        { v: "3.2x", l: "Income uplift" },
                      ].map((m) => (
                        <div key={m.l}>
                          <div className="font-serif text-2xl font-light">
                            {m.v}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {m.l}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full portfolio */}
      <section className="bg-surface py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.18em] text-primary">
                Project Portfolio
              </div>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
                Every active and recent project.
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 70}>
                <ProgramCard program={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary p-12 text-primary-foreground sm:p-16">
            <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <h2 className="font-serif text-3xl font-light leading-tight sm:text-5xl">
                Co-fund the next 100 communities.
              </h2>
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-foreground"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </PageLayout>
  );
}

function ProgramCard({ program }: { program: Program }) {
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
          <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5" />
        </div>
      </div>
    </article>
  );
}
