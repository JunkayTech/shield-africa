"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const stories = [
  {
    title: "From Subsistence to Success",
    excerpt: "How the Farmers' Academy transformed Ibrahim's 2-hectare farm into a thriving 15-hectare agricultural enterprise supporting his entire extended family.",
    category: "Agriculture",
    image: "https://images.unsplash.com/photo-1589923188651-268a9765e432?q=80&w=2670&auto=format&fit=crop",
    quote: "Shield Africa didn't just teach me to farm—they taught me to build a future.",
    author: "Ibrahim Adamu",
  },
  {
    title: "Light in the Darkness",
    excerpt: "The Education Intervention Project brought assistive technology and specialized training that helped blind students in Jabi achieve academic excellence.",
    category: "Education",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2622&auto=format&fit=crop",
    quote: "For the first time, my disability doesn't define my potential.",
    author: "Amina Hassan, Student",
  },
  {
    title: "Rebuilding Hope",
    excerpt: "How Shield Africa's IDP outreach program helped displaced families in Makurdi find stability, dignity, and a path toward rebuilding their lives.",
    category: "Humanitarian",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2670&auto=format&fit=crop",
    quote: "They gave us more than food—they gave us hope and the strength to start again.",
    author: "Maryam Yusuf, IDP",
  },
]

export function ImpactStories() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Impact Stories
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Stories of Transformation
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Behind every statistic is a human story. These are the voices 
              of communities transformed by sustainable development.
            </p>
          </div>
        </motion.div>

        {/* Stories Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {stories.map((story, index) => (
            <motion.article
              key={story.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={story.image}
                  alt={story.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Quote Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex gap-3">
                    <Quote className="h-6 w-6 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-white italic">
                        &ldquo;{story.quote}&rdquo;
                      </p>
                      <p className="mt-2 text-xs text-white/70">— {story.author}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mt-6">
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  {story.category}
                </span>
                <h3 className="mt-2 font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {story.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {story.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-muted-foreground">
            Want to be part of stories like these?
          </p>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-orange-dark">
              <Link href="/contact">
                Partner With Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/events">
                Join Our Events
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
