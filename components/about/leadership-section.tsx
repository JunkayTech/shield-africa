"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter } from "lucide-react"

const leaders = [
  {
    name: "Dr. Amara Okonkwo",
    role: "Executive Director",
    bio: "Former World Bank development specialist with 20+ years of experience in sustainable agriculture and community development across West Africa.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Emeka Abiodun",
    role: "Director of Programs",
    bio: "Agricultural economist and former UNDP consultant specializing in food security and rural development initiatives.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Fatima Bello",
    role: "Director of Operations",
    bio: "Operations expert with extensive experience in humanitarian logistics and NGO management across Nigeria.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Dr. James Okoro",
    role: "Director of Health Programs",
    bio: "Public health physician with expertise in community health interventions and medical outreach program design.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  },
]

export function LeadershipSection() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Leadership
          </span>
          <h2 className="mt-6 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Our Leadership Team
          </h2>
          <p className="mt-4 text-muted-foreground">
            Combining global expertise with deep African roots, our leadership team brings 
            decades of experience in sustainable development, humanitarian response, and 
            community empowerment.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-semibold text-white">{leader.name}</h3>
                  <p className="text-sm text-white/70">{leader.role}</p>
                  
                  {/* Social Links */}
                  <div className="mt-4 flex gap-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <a 
                      href="#" 
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                      aria-label={`${leader.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a 
                      href="#" 
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                      aria-label={`${leader.name}'s Twitter`}
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-muted-foreground">
                {leader.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
