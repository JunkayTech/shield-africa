"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Wallet, MapPin, Truck, Heart } from "lucide-react";
import { PageLayout } from "@/components/page-layout";
import { Reveal } from "@/components/reveal";
import { values } from "@/lib/site";

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Intro / Banner */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,oklch(0.18_0.04_210)_0%,oklch(0.32_0.07_195)_55%,oklch(0.22_0.05_200)_100%)] pt-40 pb-24 text-white sm:pt-48 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-orange-300">
              About Shield Africa
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-light leading-[1.05] text-balance sm:text-7xl">
              Safeguarding{" "}
              <span className="italic text-orange-300">Africa's</span> Interest.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission split */}
      <section className="relative border-y border-white/10 bg-[linear-gradient(135deg,#0b2e2f_0%,#145c56_55%,#0f3d3e_100%)] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,170,70,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,170,70,0.08),transparent_40%)]" />
        <div className="mx-auto grid max-w-7xl gap-px bg-border md:grid-cols-2">
          <Reveal>
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-10 sm:p-16">
              <div className="text-xs uppercase tracking-[0.18em] text-accent">
                Vision
              </div>
              <p className="mt-6 font-serif text-2xl font-light leading-relaxed sm:text-3xl text-cyan-950">
                We aim to be the{" "}
                <span className="italic text-accent">largest solutions platform</span>{" "}
                for the Sustainable Development Goals.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-10 sm:p-16">
              <div className="text-xs uppercase tracking-[0.18em] text-accent">
                Mission
              </div>
              <p className="mt-6 font-serif text-2xl font-light leading-relaxed sm:text-3xl text-cyan-950">
                Our mission is to contribute sustainable solutions to global development problems in Africa through agricultural development, community empowerment, and strategic partnerships.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story (left as-is for client content) */}
      <section className="bg-[oklch(0.98_0.01_180)] py-28 sm:py-36">
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
                Built From the Ground Up. Driven by Purpose
              </h2>

              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
                {/* Client requested to leave this section for their content.
                    Existing copy is preserved so they can replace it later. */}
                <p>
                  Shield Africa was established to create opportunities for
                  underserved communities through agriculture, education,
                  youth empowerment, gender inclusion, and humanitarian response.
                </p>

                <p>
                  At the core of our approach is a simple but powerful belief that
                  sustainable development in Africa must be built with{" "}
                  <span className="italic text-accent">communities, not just for</span>{" "}
                  them. We believe the most meaningful change happens when people are
                  empowered to lead their own transformation. So we work differently.
                </p>

                <p>
                  Today, Shield Africa stands as a growing platform for sustainable
                  development, connecting people, institutions, and partners to advance
                  a more food-secure, empowered, and resilient Africa.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our SDGs (mixed visual icons used by many NGOs) */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.18em] text-primary">
                Our SDGs
              </div>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
                The Sustainable Development Goals we focus on
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Use mixed visual SDG assets (combined icon + color + label) */}
            <Reveal delay={60}>
              <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
                <Image
                  src="/images/sdgs/mixed/sdg1-mixed.svg"
                  alt="SDG1 No Poverty mixed visual"
                  width={64}
                  height={64}
                />
                <div>
                  <div className="font-medium">SDG1</div>
                  <div className="text-sm text-muted-foreground">No Poverty</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
                <Image
                  src="/images/sdgs/mixed/sdg2-mixed.svg"
                  alt="SDG2 Zero Hunger mixed visual"
                  width={64}
                  height={64}
                />
                <div>
                  <div className="font-medium">SDG2</div>
                  <div className="text-sm text-muted-foreground">Zero Hunger</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
                <Image
                  src="/images/sdgs/mixed/sdg4-mixed.svg"
                  alt="SDG4 Quality Education mixed visual"
                  width={64}
                  height={64}
                />
                <div>
                  <div className="font-medium">SDG4</div>
                  <div className="text-sm text-muted-foreground">Quality Education</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
                <Image
                  src="/images/sdgs/mixed/sdg5-mixed.svg"
                  alt="SDG5 Gender Equality mixed visual"
                  width={64}
                  height={64}
                />
                <div>
                  <div className="font-medium">SDG5</div>
                  <div className="text-sm text-muted-foreground">Gender Equality</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
                <Image
                  src="/images/sdgs/mixed/sdg13-mixed.svg"
                  alt="SDG13 Climate Action mixed visual"
                  width={64}
                  height={64}
                />
                <div>
                  <div className="font-medium">SDG13</div>
                  <div className="text-sm text-muted-foreground">Climate Action</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
                <Image
                  src="/images/sdgs/mixed/sdg17-mixed.svg"
                  alt="SDG17 Partnerships for the Goals mixed visual"
                  width={64}
                  height={64}
                />
                <div>
                  <div className="font-medium">SDG17</div>
                  <div className="text-sm text-muted-foreground">Partnerships for the Goals</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-20 bg-[linear-gradient(to_bottom,oklch(0.97_0.01_180),white)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.18em] text-primary">
                What we do
              </div>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
                Practical interventions that deliver results
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={60}>
              <article className="group rounded-3xl border border-border bg-white/80 p-6">
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-accent" />
                  <div>
                    <h3 className="font-medium">Capacity Building</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We equip youth, women, farmers, and community stakeholders with practical skills, technical knowledge, and leadership training to improve livelihoods and drive sustainable development.
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal delay={120}>
              <article className="group rounded-3xl border border-border bg-white/80 p-6">
                <div className="flex items-center gap-4">
                  <Wallet className="h-8 w-8 text-accent" />
                  <div>
                    <h3 className="font-medium">Financing</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We support smallholder farmers, agripreneurs, and community enterprises through access to funding opportunities, grants, financial inclusion initiatives, and business growth support.
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal delay={180}>
              <article className="group rounded-3xl border border-border bg-white/80 p-6">
                <div className="flex items-center gap-4">
                  <MapPin className="h-8 w-8 text-accent" />
                  <div>
                    <h3 className="font-medium">Extension Services / Advisory Support</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We provide expert guidance, technical assistance, and field-based advisory services to improve agricultural productivity, climate resilience, and business performance.
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal delay={240}>
              <article className="group rounded-3xl border border-border bg-white/80 p-6">
                <div className="flex items-center gap-4">
                  <Truck className="h-8 w-8 text-accent" />
                  <div>
                    <h3 className="font-medium">Trade Facilitation</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We connect producers and agribusinesses to markets, partnerships, and value chain opportunities that promote sustainable economic growth and market access.
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal delay={300}>
              <article className="group rounded-3xl border border-border bg-white/80 p-6">
                <div className="flex items-center gap-4">
                  <Heart className="h-8 w-8 text-accent" />
                  <div>
                    <h3 className="font-medium">Humanitarian Aid</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We deliver timely humanitarian support and community interventions that address food insecurity, displacement, emergencies, and vulnerable populations across Africa.
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Culture */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.18em] text-primary">
                Our Culture
              </div>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
                Principles that guide how we work
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={60}>
              <article className="rounded-3xl border border-border bg-surface-elevated p-6">
                <h3 className="font-medium">Transparency & Accountability</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We cultivate a culture of openness, ensuring clear communication and honest reporting in all aspects of our operations. Accountability is at the core of our actions.
                </p>
              </article>
            </Reveal>

            <Reveal delay={120}>
              <article className="rounded-3xl border border-border bg-surface-elevated p-6">
                <h3 className="font-medium">Employee Dignity</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every employee is valued, empowered to thrive, and recognized for their unique contributions, because dignity drives engagement and excellence.
                </p>
              </article>
            </Reveal>

            <Reveal delay={180}>
              <article className="rounded-3xl border border-border bg-surface-elevated p-6">
                <h3 className="font-medium">Collaboration & Partnerships</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We believe in the power of collaboration. By building strong, strategic alliances, we drive innovation and achieve our shared vision for sustainable development.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[linear-gradient(to_bottom,oklch(0.97_0.01_180),white)] py-28 sm:py-36">
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
                <div className="group relative h-full rounded-3xl border border-border bg-white/80 backdrop-blur p-8 transition hover:-translate-y-1 hover:shadow-elevated">
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

      {/* CTA */}
      <section className="px-5 pb-12 sm:px-8">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary-deep p-12 text-white sm:p-20">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
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
