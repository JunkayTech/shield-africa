"use client"

import { motion } from "framer-motion"

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-primary pt-32 pb-20">
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
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90"
          >
            About Shield Africa
          </motion.span>

          <h1 className="mt-6 font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Our Story of Impact & Transformation
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/80">
            For nearly a decade, Shield Africa has been at the forefront of sustainable 
            development across Nigeria and the African continent, transforming communities 
            and empowering lives through innovative programs.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
