// app/admin/(dashboard)/events/new/page.tsx
import { EventForm } from "@/components/admin/event-form";

export default function NewEventPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-serif text-3xl font-light">New event</h1>
      <div className="mt-8">
        <EventForm />
      </div>
    </div>
  );
}
