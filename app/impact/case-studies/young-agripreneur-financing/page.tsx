"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Briefcase,
  Wallet,
} from "lucide-react";

import { PageLayout } from "@/components/page-layout";
import { Reveal } from "@/components/reveal";

const gallery: string[] = [];

for (let i = 1; i <= 17; i++) {
  gallery.push(`/images/projects/young-agripreneur/${i}.jpg`);
}

export default function YoungAgripreneurPage() {
  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src="/images/projects/young-agripreneur/banner.jpg"
          alt="Young Agripreneur Financing Project"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex min-h-screen items-center">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="max-w-4xl">
                <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-white backdrop-blur">
                  Youth Empowerment Initiative
                </span>

                <h1 className="mt-6 font-serif text-5xl font-light text-white md:text-8xl">
                  Young
                  <span className="block text-accent">
                    Agri-preneur Financing
                  </span>
                  Project
                </h1>

                <p className="mt-6 text-xl leading-9 text-white/90">
                  Supporting young people with financing, mentorship,
                  business development and agricultural entrepreneurship
                  opportunities.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#gallery"
                    className="rounded-full bg-primary-deep px-8 py-4 font-medium text-white"
                  >
                    Explore Gallery
                  </a>

                  <a
                    href="#impact"
                    className="rounded-full border border-white px-8 py-4 font-medium text-white"
                  >
                    View Impact
                  </a>
                </div>

                <div className="mt-8 inline-block rounded-full bg-white/10 px-5 py-3 text-white backdrop-blur">
                  📸 17 Project Photos Available
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IMPACT CARDS */}
      <section id="impact" className="-mt-20 relative z-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 rounded-3xl bg-white p-8 shadow-2xl md:grid-cols-4">
            <div className="text-center">
              <Users className="mx-auto mb-3 h-10 w-10 text-accent" />
              <h3 className="font-serif text-4xl font-medium text-primary">
                300+
              </h3>
              <p className="text-muted-foreground">
                Youth Beneficiaries
              </p>
            </div>

            <div className="text-center">
              <Wallet className="mx-auto mb-3 h-10 w-10 text-accent" />
              <h3 className="font-serif text-4xl font-medium text-primary">
                ₦100M+
              </h3>
              <p className="text-muted-foreground">
                Financing Facilitated
              </p>
            </div>

            <div className="text-center">
              <Briefcase className="mx-auto mb-3 h-10 w-10 text-accent" />
              <h3 className="font-serif text-4xl font-medium text-primary">
                150+
              </h3>
              <p className="text-muted-foreground">
                Agribusinesses Started
              </p>
            </div>

            <div className="text-center">
              <TrendingUp className="mx-auto mb-3 h-10 w-10 text-accent" />
              <h3 className="font-serif text-4xl font-medium text-primary">
                85%
              </h3>
              <p className="text-muted-foreground">
                Business Growth Rate
              </p>
            </div>
          </div>
        </div>
      </section>

<section className="mx-auto max-w-7xl px-6 py-16">
  <div className="rounded-3xl border border-border bg-surface-elevated p-8 shadow-soft">

    <h2 className="font-serif text-4xl font-light text-primary">
      Browse Case Studies
    </h2>

    <p className="mt-3 text-muted-foreground">
      Explore our featured projects and success stories.
    </p>

    <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

      <Link
        href="/impact/case-studies/farmers-academy"
        className="rounded-2xl border border-border p-4 transition hover:bg-primary hover:text-white"
      >
        Farmers Academy
      </Link>

      <Link
  href="/impact/case-studies/young-agripreneur-financing"
  className="rounded-2xl bg-primary text-white p-4"
>
        Young Agri-preneur Financing
      </Link>

      <Link
        href="/impact/case-studies/dry-season-rice-farming"
        className="rounded-2xl border border-border p-4 transition hover:bg-primary hover:text-white"
      >
        Dry Season Rice Farming
      </Link>

      <Link
        href="/impact/case-studies/school-for-the-blind"
        className="rounded-2xl border border-border p-4 transition hover:bg-primary hover:text-white"
      >
        School for the Blind
      </Link>

      <Link
        href="/impact/case-studies/naka-farming-project"
        className="rounded-2xl border border-border p-4 transition hover:bg-primary hover:text-white"
      >
        Naka Farming Project
      </Link>

      <Link
        href="/impact/case-studies/jeje-outreach-project"
        className="rounded-2xl border border-border p-4 transition hover:bg-primary hover:text-white"
      >
        Jeje Outreach Project
      </Link>

      <Link
        href="/impact/case-studies/pagi-medical-outreach"
        className="rounded-2xl border border-border p-4 transition hover:bg-primary hover:text-white"
      >
        Pagi Medical Outreach
      </Link>

      <Link
        href="/impact/case-studies/vaw-campaign"
        className="rounded-2xl border border-border p-4 transition hover:bg-primary hover:text-white"
      >
        VAW Campaign
      </Link>

    </div>
  </div>
</section>


      {/* OVERVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <Image
              src="/images/projects/young-agripreneur/1.jpg"
              alt="Young Agripreneur"
              width={900}
              height={700}
              className="rounded-3xl object-cover shadow-xl"
            />
          </Reveal>

          <Reveal>
            <div className="flex h-full items-center">
              <div>
                <span className="font-medium uppercase tracking-[0.18em] text-accent">
                  Project Overview
                </span>

                <h2 className="mt-4 font-serif text-5xl font-light text-primary">
                  Financing the Future of Agriculture
                </h2>

                <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                  The Young Agri-preneur Financing Project was established
                  to address the financial barriers that prevent young
                  people from entering and thriving within the agricultural
                  sector.
                </p>

                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Through strategic financing support, mentorship,
                  entrepreneurship training and market linkage
                  opportunities, the project empowers young people to
                  establish profitable agribusiness ventures and create
                  sustainable livelihoods.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <h2 className="font-serif text-5xl font-light text-primary">
            Project Gallery
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Highlights from trainings, financing events, mentorship
            programmes and youth-led agribusiness activities.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {gallery.map((image, index) => {
            const featured =
              index === 0 ||
              index === 5 ||
              index === 12 ||
              index === 20 ||
              index === 28;

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl shadow-lg ${
                  featured
                    ? "col-span-2 h-[520px]"
                    : "h-[250px]"
                }`}
              >
                <Image
                  src={image}
                  alt={`Young Agripreneur ${index + 1}`}
                  fill
                  sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/20" />
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-deep py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-5xl font-light">
            Empower the Next Generation
          </h2>

          <p className="mt-6 text-xl text-white/90">
            Join us in creating opportunities for young agricultural
            entrepreneurs across Africa.
          </p>

          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-medium text-primary"
          >
            Partner With Us
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}