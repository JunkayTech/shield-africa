"use client"

import { motion } from "framer-motion"

export function ImpactHero() {
  return (
    <section className="relative overflow-hidden bg-foreground pt-32 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/95 to-foreground" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary"
          >
            Our Impact
          </motion.span>

          <h1 className="mt-6 font-serif text-4xl font-bold text-background sm:text-5xl lg:text-6xl">
            Measuring Change, Creating Futures
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-background/70">
            Every number tells a story. Every statistic represents real lives transformed. 
            Explore the measurable impact we&apos;ve created across Nigeria and the African continent.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
