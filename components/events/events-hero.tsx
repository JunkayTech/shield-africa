"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

export function EventsHero() {
  return (
    <section className="relative overflow-hidden bg-accent pt-32 pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20"
          >
            <Calendar className="h-8 w-8 text-white" />
          </motion.div>

          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Events & Programs
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/80">
            Join our training programs, community outreach events, and engagement 
            activities. Be part of the movement creating lasting change across Africa.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
