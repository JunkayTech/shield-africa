"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "Shield Africa Farmers' Academy",
    description: "Comprehensive agricultural training program equipping farmers with modern sustainable farming techniques and business management skills.",
    category: "Agriculture",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2591&auto=format&fit=crop",
  },
  {
    title: "Young Agri-preneur Financing Project",
    description: "Providing access to capital, mentorship, and market linkages for young agricultural entrepreneurs across rural Nigeria.",
    category: "Agriculture",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: "Dry Season Rice Farming Project",
    description: "Supporting rice farmers in Oju, Benue State with irrigation systems and improved seedlings for year-round production.",
    category: "Agriculture",
    image: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: "Ichwa/Tas Yande IDP Outreach",
    description: "Providing humanitarian relief, food supplies, and psychosocial support to internally displaced persons in Makurdi, Benue State.",
    category: "Humanitarian",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: "Education Intervention Project",
    description: "Supporting the School for the Blind in Jabi, Abuja with educational materials, infrastructure, and teacher training programs.",
    category: "Education",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2673&auto=format&fit=crop",
  },
  {
    title: "Naka Farming Community Project",
    description: "Empowering the farming community in Naka, Benue State with modern agricultural tools and cooperative development.",
    category: "Agriculture",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: "Pagi Medical Outreach",
    description: "Free medical consultations, treatments, and health education reaching thousands of underserved residents in Abuja communities.",
    category: "Health",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: "Violence Against Women Campaign",
    description: "Advocacy and support programs combating gender-based violence and empowering women with legal aid and counseling services.",
    category: "Gender",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2574&auto=format&fit=crop",
  },
]

const categoryColors: Record<string, string> = {
  Agriculture: "bg-green-100 text-green-800",
  Education: "bg-blue-100 text-blue-800",
  Humanitarian: "bg-orange-100 text-orange-800",
  Health: "bg-red-100 text-red-800",
  Gender: "bg-purple-100 text-purple-800",
}

export function ProgramsShowcase() {
  return (
    <section className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Our Programs
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Projects & Initiatives
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Discover how we&apos;re creating lasting change across communities through 
              targeted interventions in agriculture, education, health, and humanitarian support.
            </p>
          </div>
          <Link
            href="/impact"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-sm transition-all hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <Badge className={`absolute left-4 top-4 ${categoryColors[project.category]}`}>
                  {project.category}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <Link href="/impact" className="absolute inset-0">
                <span className="sr-only">Learn more about {project.title}</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
