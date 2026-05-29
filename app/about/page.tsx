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
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,oklch(0.18_0.04_210)_0%,oklch(0.32_0.07_195)_55%,oklch(0.22_0.05_200)_100%)] pt-40 pb-24 text-white sm:pt-48 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-orange-300">
  About Shield Africa
</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-light leading-[1.05] text-balance sm:text-7xl">
              We exist so that{" "}
              <span className="italic text-orange-300">no community</span> is left
              behind.
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
                We aim to be the {" "}
                <span className="italic text-accent">largest solutions platform</span> has
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
                Our mission is to {" "}
                <span className="italic text-accent">
                  contribute sustainable solutions 
                </span>{" "}
                to global development problems in Africa through agricultural development, community empowerment, and strategic partnerships.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
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
                <p>
                  Shield Africa was established to create opportunities for
                  underserved communities through agriculture, education,
                  youth empowerment, gender inclusion, and humanitarian response.
                </p>
                <p>
                  At the core of our approach is a simple but powerful belief that 
                  sustainable development in Africa must be built with 
                <span className="italic text-accent"> communities, not just for </span>
                  them. We believe the most meaningful change happens when people are 
                  empowered to lead their own transformation. So we work differently. 
                  We sit at the table with 
                  local leaders, not above them. We listen before we act. We learn from 
                  the realities of the communities we serve. We invest in capacity building
                  so communities do not just receive support, but develop the skills,
                  confidence, and systems to sustain it. We build strategic partnerships
                  that multiply impact and open new possibilities. We champion local
                  ownership because the strongest solutions are the ones rooted in lived
                  experience. We design with innovation, creating models that can grow, 
                  adapt, and remain relevant as communities evolve.
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
            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl">
                Walk with us on the next decade.
              </h2>
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-foreground">
                Become a partner <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </PageLayout>
  );
}
