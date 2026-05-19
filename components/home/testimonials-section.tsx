"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote: "Shield Africa transformed our farming community. Through their Farmers' Academy, I learned modern techniques that tripled my harvest. My family's life has changed forever.",
    name: "Ibrahim Adamu",
    role: "Farmer, Benue State",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote: "The education intervention program gave my blind students hope and tools they never had before. Shield Africa doesn't just donate—they transform lives through sustainable support.",
    name: "Mrs. Grace Okonkwo",
    role: "Principal, School for the Blind, Jabi",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote: "As a displaced person, I lost everything. Shield Africa's IDP outreach gave us food, shelter support, and most importantly, dignity. They treated us like family.",
    name: "Maryam Yusuf",
    role: "IDP Camp Resident, Makurdi",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote: "The medical outreach in Pagi saved my mother's life. Free healthcare, genuine care, and follow-up support—Shield Africa is doing God's work in our community.",
    name: "Chukwudi Eze",
    role: "Community Member, Abuja",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="bg-primary py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
              Testimonials
            </span>
            <h2 className="mt-6 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Voices from the Communities We Serve
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Real stories from real people whose lives have been transformed 
              through our sustainable development initiatives.
            </p>

            {/* Navigation */}
            <div className="mt-8 flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous testimonial</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next testimonial</span>
              </Button>
              <span className="text-sm text-white/60">
                {current + 1} / {testimonials.length}
              </span>
            </div>
          </motion.div>

          {/* Testimonial Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl bg-white p-8 shadow-2xl lg:p-10"
              >
                {/* Quote Icon */}
                <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Quote className="h-5 w-5" />
                </div>

                {/* Quote */}
                <blockquote className="mt-4 font-serif text-xl leading-relaxed text-foreground lg:text-2xl">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonials[current].name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicators */}
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === current 
                      ? "w-8 bg-white" 
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
