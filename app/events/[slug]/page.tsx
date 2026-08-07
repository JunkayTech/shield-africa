// app/events/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { Reveal } from "@/components/reveal";
import { EVENTS } from "../data/events";

export default function EventPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const event = EVENTS.find((e) => e.slug === slug);

  if (!event) {
    return (
      <PageLayout>
        <section className="py-40 text-center">
          <h1 className="font-serif text-4xl">Event not found</h1>
          <p className="mt-4 text-muted-foreground">The event you requested does not exist.</p>
          <div className="mt-6">
            <Link href="/events" className="rounded-full border px-4 py-2">Back to events</Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="pt-28 pb-12">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.18em] text-primary">Event Highlight</div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-6 font-serif text-5xl font-light">{event.title}</h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-4 text-sm text-muted-foreground">
              {event.date} • {event.location}
            </p>
            <p className="mt-6 text-lg text-muted-foreground">{event.body}</p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {event.images.map((src, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={src}
                  alt={`${event.title} ${i + 1}`}
                  width={1200}
                  height={800}
                  className="object-cover w-full h-56"
                  priority={i < 2}
                />
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/events" className="inline-flex items-center gap-2 rounded-full border px-4 py-2">
              Back to events
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
