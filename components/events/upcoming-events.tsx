"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const upcomingEvents = [
  {
    id: 1,
    title: "Farmers' Academy: Advanced Techniques Workshop",
    description: "A 3-day intensive workshop covering advanced sustainable farming techniques, irrigation systems, and post-harvest processing methods.",
    date: "June 15-17, 2026",
    time: "9:00 AM - 4:00 PM",
    location: "Makurdi, Benue State",
    category: "Training",
    spots: 50,
    spotsLeft: 12,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2670&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "Quarterly Medical Outreach - Pagi Community",
    description: "Free medical consultations, screenings, and treatments. Includes eye care, dental services, and chronic disease management.",
    date: "June 22, 2026",
    time: "8:00 AM - 5:00 PM",
    location: "Pagi, Abuja",
    category: "Health",
    spots: 500,
    spotsLeft: 285,
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=2672&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "Women in Business Workshop",
    description: "Entrepreneurship training for women including business planning, financial literacy, and access to microfinance opportunities.",
    date: "July 5-6, 2026",
    time: "10:00 AM - 3:00 PM",
    location: "Abuja",
    category: "Empowerment",
    spots: 80,
    spotsLeft: 34,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2574&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "Youth Agri-preneur Bootcamp",
    description: "Week-long intensive program for young agricultural entrepreneurs covering business development, funding access, and market strategies.",
    date: "July 12-18, 2026",
    time: "Full Day",
    location: "Benue State",
    category: "Training",
    spots: 100,
    spotsLeft: 45,
    image: "https://images.unsplash.com/photo-1529390079861-591f9adf22ad?q=80&w=2670&auto=format&fit=crop",
    featured: true,
  },
]

const categoryColors: Record<string, string> = {
  Training: "bg-blue-100 text-blue-800",
  Health: "bg-red-100 text-red-800",
  Empowerment: "bg-purple-100 text-purple-800",
  Community: "bg-green-100 text-green-800",
}

export function UpcomingEvents() {
  const featuredEvents = upcomingEvents.filter(e => e.featured)
  const regularEvents = upcomingEvents.filter(e => !e.featured)

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Upcoming Events
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Join Our Next Programs
          </h2>
        </motion.div>

        {/* Featured Events */}
        <div className="mb-12 grid gap-8 lg:grid-cols-2">
          {featuredEvents.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-card shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Featured Badge */}
                <div className="absolute left-4 top-4 flex gap-2">
                  <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                  <Badge className={categoryColors[event.category]}>{event.category}</Badge>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                  <p className="mt-2 text-sm text-white/80 line-clamp-2">{event.description}</p>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-primary" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    {event.location}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {event.spotsLeft} spots left of {event.spots}
                    </span>
                  </div>
                  <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-orange-dark">
                    <Link href="#register">
                      Register
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div 
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${((event.spots - event.spotsLeft) / event.spots) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Regular Events */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regularEvents.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="p-6">
                <Badge className={categoryColors[event.category]}>{event.category}</Badge>
                
                <h3 className="mt-4 font-semibold text-foreground group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {event.description}
                </p>

                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {event.location}
                  </div>
                </div>

                <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                  <Link href="#register">Register Now</Link>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
