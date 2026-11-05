// app/admin/(dashboard)/events/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getEvent } from "@/lib/admin/store";
import { EventForm } from "@/components/admin/event-form";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-serif text-3xl font-light">Edit event</h1>
      <p className="mt-2 text-sm text-muted-foreground">{event.title}</p>
      <div className="mt-8">
        <EventForm initial={event} />
      </div>
    </div>
  );
}
