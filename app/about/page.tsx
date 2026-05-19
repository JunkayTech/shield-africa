"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/page-layout";
import { Reveal } from "@/components/reveal";
import { values } from "@/lib/site";

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Intro */}
      <section className="relative pt-40 pb-24 sm:pt-48 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              About Shield Africa
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-light leading-[1.05] text-balance sm:text-7xl">
              We exist so that{" "}
              <span className="italic text-primary">no community</span> is left
              behind by progress.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Founded by a coalition of African development practitioners,
              Shield Africa moves capital, expertise and dignity to the people
              and places most often overlooked — and stays for the long arc of
              change.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission split */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-px bg-border md:grid-cols-2">
          <Reveal>
            <div className="bg-surface p-10 sm:p-16">
              <div className="text-xs uppercase tracking-[0.18em] text-accent">
                Vision
              </div>
              <p className="mt-6 font-serif text-2xl font-light leading-relaxed sm:text-3xl">
                An Africa where{" "}
                <span className="italic text-primary">every community</span> has
                agency, capital, and capacity to thrive.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="bg-surface p-10 sm:p-16">
              <div className="text-xs uppercase tracking-[0.18em] text-accent">
                Mission
              </div>
              <p className="mt-6 font-serif text-2xl font-light leading-relaxed sm:text-3xl">
                To advance{" "}
                <span className="italic text-primary">
                  community-led, sustainable development
                </span>{" "}
                through programs that build skills, livelihoods and resilience.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&q=80"
                alt="Community gathering"
                width={800}
                height={1000}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl glass-card p-5">
                <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Since 2014
                </div>
                <div className="mt-1 font-serif text-lg">
                  Operating in 14 Nigerian states + 4 African nations.
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-primary">
                Our Story
              </div>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
                A decade of presence — not just programs.
              </h2>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  Shield Africa began as a single rural literacy project in
                  Benue State. A decade later we run integrated programming
                  across agriculture, education, health, gender and
                  humanitarian response — always with the same operating
                  principle: communities lead, we resource.
                </p>
                <p>
                  Our teams live in the regions they serve. Our grantmaking is
                  audited. Our outcomes are measured against the goals
                  communities set for themselves — not the assumptions of
                  distant capitals.
                </p>
                <p>
                  Today, that work touches more than 165,000 lives. Tomorrow,
                  we intend to operate continent-wide on the same terms.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.18em] text-primary">
                Core Values
              </div>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
                The principles we hold each other to.
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="group relative h-full rounded-3xl border border-border bg-surface-elevated p-8 transition hover:-translate-y-1 hover:shadow-elevated">
                  <div className="font-serif text-xl text-accent">
                    0{i + 1}
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-medium">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.18em] text-primary">
                Leadership
              </div>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
                Global expertise. African leadership.
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Dr. Adaeze Okwuosa",
                role: "Founder & Executive Director",
                bio: "Former WHO advisor; 18 years in West African development finance.",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
              },
              {
                name: "Emeka Bala",
                role: "Director, Programs",
                bio: "Designed national agritech extension models across Nigeria & Ghana.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
              },
              {
                name: "Fatima Yusuf",
                role: "Director, Partnerships",
                bio: "Brokers public-private capital coalitions with UNDP, FCDO and AU.",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
              },
            ].map((m, i) => (
              <Reveal key={m.name} delay={i * 100}>
                <article className="group rounded-3xl border border-border bg-surface-elevated p-6 transition hover:shadow-elevated">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-medium">
                    {m.name}
                  </h3>
                  <div className="mt-1 text-sm text-primary">{m.role}</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {m.bio}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-12 sm:px-8">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary-deep p-12 text-white sm:p-20">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl">
                Walk with us on the next decade.
              </h2>
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-foreground"
              >
                Become a partner <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </PageLayout>
  );
}
