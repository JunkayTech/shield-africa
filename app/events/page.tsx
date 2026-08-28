"use client";

import { useState } from "react";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { Reveal } from "@/components/reveal";

const types = ["Upcoming", "Past", "Ongoing"] as const;

export default function EventsPage() {
  const [filter, setFilter] =
    useState<(typeof types)[number]>("Upcoming");

  const pastEvents = [
    {
      slug: "green-insight-book-launch-2026",
      title: "Green Insight Book Launch — Vol. 2",
      date: "Friday, 28th August, 2026",
      location: "Skywide Studios, Abuja, Nigeria",
      body: "Join us to celebrate the launch of Green Insight Publication (Vol. 2).",
      thumbnail: "/images/events/green_insight.png",
      mobileThumbnail: "/images/events/green_insight2.png",
    },
    {
      slug: "shield-africa-summit-2025",
      title: "Shield Africa Summit 2025",
      date: "November 20th, 2025",
      location: "Abuja, Nigeria",
      body: "Annual summit convening partners and communities.",
      thumbnail: "/images/events/SA_Summit25_Landscape.png",
      mobileThumbnail: "/images/events/SA_Summit25_mobile.png",
    },
    {
      slug: "green-insight-launch-2024-2025",
      title: "Green Insight Launch 2024/2025",
      date: "August 29th, 2025",
      location: "Abuja, Nigeria",
      body: "Launch of Green Insight initiative for sustainable development.",
      thumbnail: "/images/events/green_insight_landscape.png",
      mobileThumbnail: "/images/events/green_insight_mobile.png",
    },
    {
      slug: "shield-africa-summit-2024",
      title: "Shield Africa Summit 2024",
      date: "November 15th, 2024",
      location: "Abuja, Nigeria",
      body: "Annual summit convening partners and communities.",
      thumbnail: "/images/events/SA_Summit_Landscape24.png",
      mobileThumbnail: "/images/events/SA_Summit24.png",
    },
  ];

  const filtered =
    filter === "Past"
      ? pastEvents
      : filter === "Ongoing"
      ? []
      : [];

  return (
    <PageLayout>
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.18em] text-primary">
              Events & Programs
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[1.08] text-balance sm:text-5xl md:text-6xl lg:text-7xl">
              Conversations that drive{" "}
              <span className="italic text-primary">
                impact.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg">
              Trainings, convenings and summits — open to
              partners, volunteers and the communities we serve.
            </p>
          </Reveal>

          {/* Filter buttons */}
          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap gap-2 sm:mt-12">
              {types.map((t) => (
                <button
                  key={t}
                  type="button"
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

      {/* =========================================================
          EVENTS LIST
      ========================================================= */}
      <section className="overflow-hidden pb-20 sm:pb-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-surface-elevated sm:rounded-3xl">

            {/* =====================================================
                UPCOMING — NO EVENT
            ===================================================== */}
            {filter === "Upcoming" ? (
              <div className="p-10 text-center sm:p-16">
                <div className="mx-auto max-w-xl">
                  <h2 className="font-serif text-2xl font-medium sm:text-3xl">
                    No event currently.
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    There are no upcoming events at the moment.
                    Please check back soon for new events and
                    programmes.
                  </p>
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground sm:p-10">
                No events recorded.
              </div>
            ) : (
              filtered.map((e, i) => (
                <Reveal key={e.slug} delay={i * 60}>
                  <article
                    className={`group grid min-w-0 gap-5 p-5 transition hover:bg-secondary sm:gap-6 sm:p-7 md:grid-cols-[160px_minmax(0,1fr)_auto] md:items-center md:gap-7 md:p-8 lg:grid-cols-[160px_minmax(0,1fr)_auto] lg:gap-8 lg:p-9 ${
                      i !== filtered.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                  >
                    {/* Event thumbnail */}
                    <div className="relative h-48 w-full min-w-0 overflow-hidden rounded-xl sm:h-56 md:h-40 md:w-40">
                      <picture>
                        <source
                          media="(max-width: 767px)"
                          srcSet={
                            e.mobileThumbnail
                              ? e.mobileThumbnail
                              : e.thumbnail
                          }
                        />

                        <Image
                          src={e.thumbnail}
                          alt={e.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 767px) 100vw, 160px"
                          priority={i === 0}
                        />
                      </picture>
                    </div>

                    {/* Event information */}
                    <div className="min-w-0">
                      <div className="flex min-w-0 items-start gap-2 text-xs uppercase tracking-[0.12em] text-primary sm:tracking-[0.15em]">
                        <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0" />

                        <span className="min-w-0 break-words">
                          {e.date}
                        </span>
                      </div>

                      <h3 className="mt-3 break-words font-serif text-2xl font-medium leading-snug sm:text-3xl">
                        {e.title}
                      </h3>

                      <div className="mt-2 flex min-w-0 items-start gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" />

                        <span className="min-w-0 break-words">
                          {e.location}
                        </span>
                      </div>

                      <p className="mt-3 max-w-2xl break-words text-sm leading-relaxed text-muted-foreground">
                        {e.body}
                      </p>

                      {/* Event Highlights */}
                      <div className="mt-4">
                        <Link
                          href={`/events/${e.slug}`}
                          className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-medium transition hover:bg-foreground hover:text-background"
                        >
                          <span className="truncate">
                            Event Highlights
                          </span>

                          <ArrowUpRight className="h-4 w-4 shrink-0" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}