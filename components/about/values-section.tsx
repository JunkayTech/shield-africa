"use client"

import { motion } from "framer-motion"
import { Leaf, Eye, Shield, Users } from "lucide-react"

const values = [
  {
    title: "Sustainability",
    description: "We design programs that create lasting impact, ensuring communities can thrive long after our direct involvement ends.",
    icon: Leaf,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Transparency",
    description: "We maintain complete openness in our operations, finances, and impact reporting with all stakeholders.",
    icon: Eye,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Resilience",
    description: "We build capacity within communities to withstand challenges and adapt to changing circumstances.",
    icon: Shield,
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Collaboration",
    description: "We believe in the power of partnerships—working with communities, governments, and organizations to maximize impact.",
    icon: Users,
    color: "bg-purple-100 text-purple-700",
  },
]

export function ValuesSection() {
  return (
    <section className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Core Values
            </span>
            
            <h2 className="mt-6 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              The Principles That Guide Our Work
            </h2>
            
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Every program we design, every partnership we form, and every decision we make 
              is guided by our core values. These principles ensure that our work creates 
              genuine, lasting impact in the communities we serve.
            </p>

            <div className="mt-8">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl object-cover"
              />
            </div>
          </motion.div>

          {/* Values Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${value.color}`}>
                  <value.icon className="h-6 w-6" />
                </div>
                
                <h3 className="font-semibold text-foreground">{value.title}</h3>
                
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
