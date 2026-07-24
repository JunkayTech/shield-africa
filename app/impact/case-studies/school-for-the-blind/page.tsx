"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, BookOpen, Heart, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";

import { PageLayout } from "@/components/page-layout";
import { Reveal } from "@/components/reveal";

const gallery: string[] = [];
for (let i = 1; i <= 20; i++) {
  gallery.push(`/images/projects/blind/${i}.jpg`);
}

export default function SchoolForTheBlindPage() {
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
      <section className="relative min-h-screen overflow-hidden pt-16 sm:pt-24 pb-8">
        <Image
          src="/images/projects/blind/banner.jpg"
          alt="School for the Blind banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex min-h-screen items-center">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="max-w-3xl">
                <h1 className="mt-6 font-serif text-5xl font-light text-white md:text-7xl">
                  School for the
                  <span className="block text-accent">Blind</span>
                </h1>
                <p className="mt-6 text-xl leading-9 text-white/90">
               Provided educational resources and learning materials to students at the School for the Blind in Abuja, FCT, supporting inclusive learning and improving access to quality education.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="#gallery"
                    className="rounded-full border border-white/20 px-8 py-4 font-medium text-white/90"
                  >
                    View Gallery
                  </Link>
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
      <section id="overview" className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div>
              <Image
                src="/images/projects/blind/1.jpg"
                alt="Students at the School for the Blind"
                width={900}
                height={700}
                className="rounded-3xl shadow-xl object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex items-center">
              <div>
                <span className="font-medium uppercase tracking-[0.18em] text-accent">
                  Project Overview
                </span>
                <h2 className="mt-4 font-serif text-4xl font-light text-primary">
                  Access to Quality Education for All
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                  The School for the Blind Support Project was implemented to improve access to inclusive education and enhance the learning experience of visually impaired pupils at the School for the Blind in Abuja, FCT. Recognizing the challenges students face in accessing appropriate learning resources, the project provided Braille versions of core textbooks, writing materials designed for visually impaired learners, and food supplies to support their well-being.
                </p>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                The intervention reached all pupils from Primary 1 to Primary 6, ensuring they had access to essential educational resources and a more conducive learning environment, while promoting equity and inclusion in education.
                </p>
                <div className="mt-8 flex gap-4">
                  <Link
                    href="/impact"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-5 py-2.5 text-sm font-medium transition hover:bg-secondary"
                  >
                    All projects <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white"
                  >
                    Support this work
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <div className="text-center">
            <h2 className="font-serif text-4xl font-light text-primary">
              Project Gallery
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">
              Moments from classrooms, distribution days, and community workshops.
            </p>
          </div>
        </Reveal>

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
                  alt={`School for the Blind ${index + 1}`}
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
            const featured = index === 0 || index === 4 || index === 9 || index === 14 || index === 18;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl shadow-lg
                ${featured ? "col-span-2 row-span-2" : ""}`}
              >
                <Image
                  src={image}
                  alt={`School for the Blind ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
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
            <Reveal>
              <h2 className="font-serif text-5xl font-light">
                Partner With Shield Africa
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 text-xl text-white/90">
                Join us in advancing sustainable development, empowering communities,
                and building a brighter future across Africa.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <Link
                href="/contact"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-medium text-primary"
              >
                Get Involved
                <ArrowRight size={18} />
              </Link>
            </Reveal>
          </div>
        </section>
    </PageLayout>
  );
}
