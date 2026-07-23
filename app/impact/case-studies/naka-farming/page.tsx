"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { PageLayout } from "@/components/page-layout";
import { Reveal } from "@/components/reveal";

const gallery: string[] = [];
for (let i = 1; i <= 18; i++) {
  gallery.push(`/images/projects/naka-farming/${i}.jpg`);
}

export default function NakaFarmingPage() {
  const pathname = usePathname();

  const caseStudies = [
    { href: "/impact/case-studies/farmers-academy", label: "Farmers Academy" },
    { href: "/impact/case-studies/young-agripreneur-financing", label: "Young Agri-preneur Financing" },
    { href: "/impact/case-studies/dry-season-rice", label: "Dry Season Rice Farming" },
    { href: "/impact/case-studies/school-for-the-blind", label: "School for the Blind" },
    { href: "/impact/case-studies/naka-farming", label: "Naka Farming Project" },
    { href: "/impact/case-studies/jeje-outreach", label: "Jeje Outreach Project" },
    { href: "/impact/case-studies/pagi-medical", label: "Pagi Medical Outreach" },
    { href: "/impact/case-studies/vaw-campaign", label: "VAW Campaign" },
  ];

  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src="/images/projects/naka-farming/banner.jpg"
          alt="Naka Farming Project"
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
                  Community Agriculture Initiative
                </span>
                <h1 className="mt-6 font-serif text-5xl font-light text-white md:text-8xl">
                  Naka
                  <span className="block text-accent">Farming Project</span>
                </h1>
                <p className="mt-6 text-xl leading-9 text-white/90">
                  Community-based farming initiative in Naka region, promoting sustainable agricultural practices and improving local food security through collective farming.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#gallery"
                    className="rounded-full bg-primary-deep px-8 py-4 font-medium text-white"
                  >
                    Explore Gallery
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CASE STUDIES NAV */}
      {/*}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl border border-border bg-surface-elevated p-8 shadow-soft">
          <p className="mt-3 text-muted-foreground">
            Explore our featured projects and success stories.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {caseStudies.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-2xl p-4 transition ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "border border-border hover:bg-primary hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      */}

      {/* OVERVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <Image
              src="/images/projects/naka-farming/1.jpg"
              alt="Naka Farming Project"
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
                  Community Agriculture
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                  Community-based farming initiative in Naka region, promoting sustainable agricultural practices and improving local food security through collective farming.
                </p>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  By pooling resources, knowledge, and labor, the project empowers local farmers to increase productivity, strengthen resilience, and ensure food availability for households across the region.
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
            Highlights from collective farming activities, training sessions, and harvests in the Naka community.
          </p>
        </div>

        {/* Masonry layout for mobile & tablet */}
        <div className="mt-16 block lg:hidden">
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {gallery.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-3xl shadow-lg break-inside-avoid"
              >
                <Image
                  src={image}
                  alt={`Naka Farming ${index + 1}`}
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition duration-500 hover:bg-black/20" />
              </div>
            ))}
          </div>
        </div>

        {/* Grid layout for desktop */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-4 lg:auto-rows-[200px] gap-4">
          {gallery.map((image, index) => {
            const featured = index === 0 || index === 5 || index === 12;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl shadow-lg
                ${featured ? "col-span-2 row-span-2" : ""}`}
              >
                <Image
                  src={image}
                  alt={`Naka Farming ${index + 1}`}
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
            Strengthening Local Food Security
          </h2>
          <p className="mt-6 text-xl text-white/90">
            Partner with us to expand sustainable farming practices and empower communities in Naka and beyond.
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
