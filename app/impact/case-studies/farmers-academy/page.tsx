"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Sprout, TrendingUp, MapPin } from "lucide-react";

import { PageLayout } from "@/components/page-layout";
import { Reveal } from "@/components/reveal";

const gallery: string[] = [];
for (let i = 1; i <= 34; i++) {
  gallery.push(`/images/projects/farmers/${i}.jpg`);
}

export default function FarmersAcademyPage() {
  return (
    <PageLayout>
      {/* HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src="/images/projects/farmers/banner.jpg"
          alt="Farmers Academy"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex min-h-screen items-center">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="max-w-3xl">
                <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-white backdrop-blur">
                  Agricultural Development Initiative
                </span>
                <h1 className="mt-6 font-serif text-6xl font-light text-white md:text-8xl">
                  Farmers'
                  <span className="block text-accent">Academy</span>
                </h1>
                <p className="mt-6 text-xl leading-9 text-white/90">
                  Empowering farmers through practical training,
                  climate-smart agriculture, agribusiness development,
                  and sustainable food production systems.
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
                  📸 34 Project Photos Available
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
            <Reveal>
              <div className="text-center">
                <Users className="mx-auto mb-3 h-10 w-10 text-accent" />
                <h3 className="font-serif text-4xl font-medium text-primary">500+</h3>
                <p className="text-muted-foreground">Farmers Trained</p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="text-center">
                <MapPin className="mx-auto mb-3 h-10 w-10 text-accent" />
                <h3 className="font-serif text-4xl font-medium text-primary">25+</h3>
                <p className="text-muted-foreground">Communities Reached</p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="text-center">
                <Sprout className="mx-auto mb-3 h-10 w-10 text-accent" />
                <h3 className="font-serif text-4xl font-medium text-primary">80%</h3>
                <p className="text-muted-foreground">Yield Increase</p>
              </div>
            </Reveal>
            <Reveal delay={270}>
              <div className="text-center">
                <TrendingUp className="mx-auto mb-3 h-10 w-10 text-accent" />
                <h3 className="font-serif text-4xl font-medium text-primary">₦50M+</h3>
                <p className="text-muted-foreground">Economic Value Created</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div>
              <Image
                src="/images/projects/farmers/1.jpg"
                alt="Farmers Training"
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
                <h2 className="mt-4 font-serif text-5xl font-light text-primary">
                  Training & Capacity Building
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                  The Shield Africa Farmers' Academy equips smallholder
                  farmers with modern agricultural knowledge, climate-smart
                  farming practices, business skills and market access
                  opportunities.
                </p>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Through training workshops, mentorship programmes,
                  demonstration farms and extension support, farmers are
                  empowered to improve productivity and strengthen food
                  security within their communities.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      ```tsx
{/* GALLERY */}
<section id="gallery" className="mx-auto max-w-7xl px-6 py-20">
  <Reveal>
    <div className="text-center">
      <h2 className="font-serif text-5xl font-light text-primary">
        Project Gallery
      </h2>

      <p className="mt-4 text-lg text-muted-foreground">
        Highlights from training sessions, field demonstrations,
        community engagements and harvest activities.
      </p>
    </div>
  </Reveal>

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
          className={`group relative overflow-hidden rounded-3xl shadow-lg
          ${
            featured
              ? "col-span-2 h-[520px]"
              : "h-[250px]"
          }`}
        >
          <Image
            src={image}
            alt={`Farmers Academy ${index + 1}`}
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
```


      {/* CTA */}
      <section className="bg-primary-deep py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-serif text-5xl font-light">Partner With Shield Africa</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-xl text-white/90">
              Together we can empower more farmers and strengthen food security.
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
