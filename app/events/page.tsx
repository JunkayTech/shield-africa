import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EventsHero } from "@/components/events/events-hero"
import { UpcomingEvents } from "@/components/events/upcoming-events"
import { EventCategories } from "@/components/events/event-categories"
import { EventRegistration } from "@/components/events/event-registration"

export const metadata: Metadata = {
  title: "Events | Shield Africa",
  description: "Join Shield Africa's training programs, community outreach events, and engagement activities. Register to participate in our impact initiatives.",
}

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <EventsHero />
      <UpcomingEvents />
      <EventCategories />
      <EventRegistration />
      <Footer />
    </main>
  )
}
