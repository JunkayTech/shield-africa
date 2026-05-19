"use client"

import { motion } from "framer-motion"

export function StorySection() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2670&auto=format&fit=crop"
                alt="Shield Africa team working with local community"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-8 -right-4 rounded-2xl bg-accent p-6 text-accent-foreground shadow-xl sm:-right-8"
            >
              <div className="font-serif text-4xl font-bold">9+</div>
              <div className="text-sm font-medium">Years of Impact</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Our Story
            </span>
            
            <h2 className="mt-6 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              From Vision to Transformation
            </h2>

            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Shield Africa was founded in 2015 with a singular vision: to create lasting, 
                sustainable change across African communities. What began as a small initiative 
                in Benue State has grown into a comprehensive development organization reaching 
                over 165,000 beneficiaries across Nigeria.
              </p>
              <p>
                Our founders recognized that true development must be community-led, culturally 
                sensitive, and economically sustainable. This philosophy has guided every program 
                we&apos;ve launched—from agricultural training to educational interventions, from 
                humanitarian outreach to women&apos;s empowerment initiatives.
              </p>
              <p>
                Today, Shield Africa operates eight active projects spanning agriculture, education, 
                health, and humanitarian response. We&apos;ve trained over 25,000 farmers, empowered 
                23,000+ youth, and conducted 52 medical outreaches reaching thousands of underserved 
                communities.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
