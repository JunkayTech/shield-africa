"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, TrendingUp, Briefcase, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";

import { PageLayout } from "@/components/page-layout";
import { Reveal } from "@/components/reveal";

const gallery: string[] = [];
for (let i = 1; i <= 10; i++) {
  gallery.push(`/images/projects/vaw-campaign/${i}.jpg`);
}

export default function VawCampaignPage() {
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
      <section className="relative min-h-screen overflow-hidden pb-8">
        <Image
          src="/images/projects/vaw-campaign/banner.jpg"
          alt="VAW Campaign"
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
                  Protection & Awareness Initiative
                </span>

                <h1 className="mt-6 font-serif text-5xl font-light text-white md:text-8xl">
                  VAW
                  <span className="block text-accent">Campaign</span>
                </h1>

                <p className="mt-6 text-xl leading-9 text-white/90">
                  The Violence Against Women Campaign raises awareness, strengthens referral pathways, and provides survivor-centered support to reduce gender-based violence and protect women and girls.
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
                <div className="mt-8 inline-block rounded-full bg-white/10 px-5 py-3 text-white backdrop-blur relative z-30">
  📸 10 Project Photos Available
</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IMPACT CARDS */}
      <section id="impact" className="-mt-12 relative z-10 lg:z-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 rounded-3xl bg-white p-8 shadow-2xl md:grid-cols-4">
            <Reveal>
              <div className="text-center">
                <Users className="mx-auto mb-3 h-10 w-10 text-accent" />
                <h3 className="font-serif text-4xl font-medium text-primary">3,200+</h3>
                <p className="text-muted-foreground">Survivors Supported</p>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="text-center">
                <MapPin className="mx-auto mb-3 h-10 w-10 text-accent" />
                <h3 className="font-serif text-4xl font-medium text-primary">20</h3>
                <p className="text-muted-foreground">Communities Reached</p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="text-center">
                <Briefcase className="mx-auto mb-3 h-10 w-10 text-accent" />
                <h3 className="font-serif text-4xl font-medium text-primary">1,100+</h3>
                <p className="text-muted-foreground">Legal & Psychosocial Referrals</p>
              </div>
            </Reveal>

            <Reveal delay={270}>
              <div className="text-center">
                <TrendingUp className="mx-auto mb-3 h-10 w-10 text-accent" />
                <h3 className="font-serif text-4xl font-medium text-primary">58%</h3>
                <p className="text-muted-foreground">Increase in Reporting</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CASE STUDIES NAV */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl border border-border bg-surface-elevated p-8 shadow-soft">
          <h2 className="font-serif text-4xl font-light text-primary">
            Browse Case Studies
          </h2>

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

      {/* OVERVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <Image
              src="/images/projects/vaw-campaign/1.jpg"
              alt="VAW Campaign Overview"
              width={900}
              height={700}
              className="rounded-3xl object-cover shadow-xl"
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="flex items-center">
              <div>
                <span className="font-medium uppercase tracking-[0.18em] text-accent">
                  Project Overview
                </span>

                <h2 className="mt-4 font-serif text-5xl font-light text-primary">
                  Prevent Protect Empower
                </h2>

                <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                  The VAW Campaign combines awareness-raising, survivor-centered services, legal aid and psychosocial support to prevent violence and support recovery for women and girls.
                </p>

                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Working with local authorities, health providers and community leaders, the campaign strengthens referral pathways and builds community capacity to prevent and respond to gender-based violence.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <div className="text-center">
            <h2 className="font-serif text-5xl font-light text-primary">
              Project Gallery
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">
              Scenes from awareness sessions, safe-space activities, legal clinics and community dialogues.
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
                  alt={`VAW Campaign ${index + 1}`}
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
            const featured = index === 0 || index === 5; // two featured tiles for 10 images

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl shadow-lg ${featured ? "col-span-2 row-span-2" : ""}`}
              >
                <Image
                  src={image}
                  alt={`VAW Campaign ${index + 1}`}
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
            <h2 className="font-serif text-5xl font-light">Support VAW Campaign</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-xl text-white/90">
              Partner with us to prevent violence, protect survivors and build safer communities.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-medium text-primary"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
