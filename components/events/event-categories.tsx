"use client"

import { motion } from "framer-motion"
import { GraduationCap, Heart, Users, Stethoscope, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const categories = [
  {
    title: "Training Programs",
    description: "Intensive capacity-building workshops in agriculture, entrepreneurship, and technical skills development.",
    icon: GraduationCap,
    stats: "24 programs annually",
    color: "from-blue-500 to-blue-600",
    topics: ["Sustainable Farming", "Business Management", "Financial Literacy", "Technical Skills"],
  },
  {
    title: "Medical Outreaches",
    description: "Free healthcare services including consultations, screenings, treatments, and health education in underserved communities.",
    icon: Stethoscope,
    stats: "52 outreaches completed",
    color: "from-red-500 to-red-600",
    topics: ["General Medicine", "Eye Care", "Dental Services", "Maternal Health"],
  },
  {
    title: "Community Engagements",
    description: "Participatory events that bring communities together for collective action, dialogue, and shared development goals.",
    icon: Users,
    stats: "108 communities reached",
    color: "from-green-500 to-green-600",
    topics: ["Town Halls", "Sensitization Campaigns", "Cultural Events", "Volunteer Days"],
  },
  {
    title: "Empowerment Workshops",
    description: "Specialized programs for women, youth, and vulnerable groups focused on skills development and economic empowerment.",
    icon: Heart,
    stats: "35,000+ empowered",
    color: "from-purple-500 to-purple-600",
    topics: ["Women in Business", "Youth Leadership", "Digital Skills", "Advocacy Training"],
  },
]

export function EventCategories() {
  return (
    <section className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Event Categories
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Programs We Organize
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
            Our events span multiple categories, each designed to address specific 
            community needs and development goals.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-lg"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                    <category.icon className="h-7 w-7" />
                  </div>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
                    {category.stats}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{category.title}</h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-muted-foreground">{category.description}</p>

                {/* Topics */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.topics.map((topic) => (
                    <span 
                      key={topic}
                      className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <Button asChild variant="ghost" className="mt-4 text-primary hover:text-primary/80">
                  <Link href="#register">
                    View Upcoming
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
