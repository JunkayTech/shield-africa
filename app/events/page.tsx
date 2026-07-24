"use client";

import { useState } from "react";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { PageLayout } from "@/components/page-layout";
import { Reveal } from "@/components/reveal";

const types = ["Upcoming", "Past"] as const;

export default function EventsPage() {
  const [filter, setFilter] = useState<(typeof types)[number]>("Upcoming");

  // Hard-coded events with thumbnails
  const upcomingEvents = [
    {
      title: "Sustainability Lab",
      date: "Friday, 31st July, 2026",
      location: "Abuja, Nigeria",
      body: "An interactive Leadership and Ethnical Decision-Making For Business Resilience. ",
      thumbnail: "/images/events/thumbnail_july.png",
    },
  ];

  const pastEvents = [
    {
      title: "Shield Africa Summit 2024",
      date: "November 15th,2024",
      location: "Abuja, Nigeria",
      body: "Annual summit convening partners and communities.",
      thumbnail: "/images/events/summit2024.jpg",
    },
    {
      title: "Shield Africa Summit 2025",
      date: "November 20th, 2025",
      location: "Abuja, Nigeria",
      body: "Annual summit convening partners and communities.",
      thumbnail: "/images/events/summit2025.jpg",
    },
    {
      title: "Green Insight Launch 2024/2025",
      date: "August 29th, 2025",
      location: "Abuja, Nigeria",
      body: "Launch of Green Insight initiative for sustainable development.",
      thumbnail: "/images/events/green_insight.jpg",
    },
  ];

  const filtered = filter === "Upcoming" ? upcomingEvents : pastEvents;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.18em] text-primary">
              Events & Programs
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-light leading-[1.05] text-balance sm:text-7xl">
              Conversations that drive{" "}
              <span className="italic text-primary">impact.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Trainings, convenings and summits — open to partners, volunteers and the communities we serve.
            </p>
          </Reveal>

          {/* Filter buttons */}
          <Reveal delay={320}>
            <div className="mt-12 flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    filter === t
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-surface-elevated text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Events list */}
      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface-elevated">
            {filtered.map((e, i) => (
              <Reveal key={e.title} delay={i * 60}>
                <article
                  className={`group grid gap-6 p-7 transition hover:bg-secondary sm:grid-cols-[160px_1fr_auto] sm:items-center sm:gap-8 sm:p-9 ${
                    i !== filtered.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative h-32 w-full sm:h-40 sm:w-40 overflow-hidden rounded-xl">
                    <Image
                      src={e.thumbnail}
                      alt={e.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Event details */}
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-primary">
                      <Calendar className="h-3.5 w-3.5" /> {e.date}
                    </div>
                    <h3 className="mt-3 font-serif text-2xl font-medium leading-snug sm:text-3xl">
                      {e.title}
                    </h3>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" /> {e.location}
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {e.body}
                    </p>
                  </div>

                  {/* Register button */}
                  {filter === "Upcoming" ? (
                    <a
                      href="#register"
                      className="inline-flex items-center gap-1.5 self-start rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition group-hover:border-foreground group-hover:bg-foreground group-hover:text-background sm:self-center"
                    >
                      Register
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium line-through text-muted-foreground sm:self-center">
                      Register
                    </span>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section id="register" className="px-5 pb-32 sm:px-8">
        <Reveal>
          <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl border border-border bg-surface p-10 sm:p-16 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-primary">
                Participate
              </div>
              <h2 className="mt-4 font-serif text-3xl font-light leading-tight sm:text-4xl">
                Register your interest.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Tell us which program excites you. We&apos;ll follow up within 48
                hours with logistics and onboarding details.
              </p>
            </div>
            <form
              onSubmit={(ev) => ev.preventDefault()}
              className="grid gap-4 sm:grid-cols-2"
            >
              <Field label="Full name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Organization (optional)" name="org" />
              <Field label="Event of interest" name="event" />
              <div className="sm:col-span-2">
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background"
              >
                Submit registration
              </button>
            </form>
          </div>
        </Reveal>
      </section>
    </PageLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="mt-2 w-full rounded-full border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
