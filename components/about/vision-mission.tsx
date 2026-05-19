"use client"

import { motion } from "framer-motion"
import { Eye, Target } from "lucide-react"

export function VisionMission() {
  return (
    <section className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-primary p-8 text-white lg:p-12"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }} />
            </div>

            <div className="relative">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Eye className="h-7 w-7" />
              </div>
              
              <h3 className="font-serif text-2xl font-bold">Our Vision</h3>
              
              <p className="mt-6 text-xl leading-relaxed text-white/90 lg:text-2xl">
                &ldquo;An Africa where every community has agency, capital, and capacity to thrive.&rdquo;
              </p>
              
              <p className="mt-6 text-white/70">
                We envision a continent where sustainable development is the norm, where communities 
                are self-sufficient, and where every individual has the opportunity to reach their 
                full potential regardless of their circumstances.
              </p>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl bg-card p-8 shadow-lg lg:p-12"
          >
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Target className="h-7 w-7" />
            </div>
            
            <h3 className="font-serif text-2xl font-bold text-foreground">Our Mission</h3>
            
            <p className="mt-6 text-xl leading-relaxed text-foreground lg:text-2xl">
              Community-led sustainable development through partnership, innovation, and empowerment.
            </p>
            
            <p className="mt-6 text-muted-foreground">
              We work hand-in-hand with local communities to identify needs, design solutions, and 
              implement programs that create lasting impact. Our approach combines global best practices 
              with local knowledge to ensure relevance and sustainability.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-muted p-4">
                <div className="font-serif text-2xl font-bold text-primary">165K+</div>
                <div className="text-sm text-muted-foreground">Lives Touched</div>
              </div>
              <div className="rounded-xl bg-muted p-4">
                <div className="font-serif text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
