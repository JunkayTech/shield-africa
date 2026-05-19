"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: 1,
    title: "Shield Africa Farmers' Academy",
    description: "Comprehensive agricultural training program equipping farmers with modern sustainable farming techniques, business management skills, and market access strategies. The academy has transformed subsistence farmers into agricultural entrepreneurs.",
    category: "Agriculture",
    location: "Benue State, Nigeria",
    date: "2018 - Present",
    beneficiaries: "8,500+ farmers",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2591&auto=format&fit=crop",
    results: ["180% average yield increase", "65% income growth", "500+ farm cooperatives formed"],
  },
  {
    id: 2,
    title: "Young Agri-preneur Financing Project",
    description: "Providing access to capital, mentorship, and market linkages for young agricultural entrepreneurs across rural Nigeria. The program combines microfinancing with intensive business training.",
    category: "Agriculture",
    location: "Multiple States",
    date: "2020 - Present",
    beneficiaries: "2,300+ youth",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop",
    results: ["₦450M in loans disbursed", "340+ businesses launched", "92% repayment rate"],
  },
  {
    id: 3,
    title: "Dry Season Rice Farming Project",
    description: "Supporting rice farmers in Oju, Benue State with irrigation systems, improved seedlings, and technical support for year-round rice production, reducing dependence on rainfall.",
    category: "Agriculture",
    location: "Oju, Benue State",
    date: "2021 - Present",
    beneficiaries: "1,200+ farmers",
    image: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?q=80&w=2670&auto=format&fit=crop",
    results: ["2 growing seasons per year", "3,000 hectares irrigated", "Food security improved"],
  },
  {
    id: 4,
    title: "Ichwa/Tas Yande IDP Outreach",
    description: "Providing humanitarian relief, food supplies, shelter support, and psychosocial services to internally displaced persons affected by conflict in Benue State.",
    category: "Humanitarian",
    location: "Makurdi, Benue State",
    date: "2019 - Present",
    beneficiaries: "15,000+ IDPs",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop",
    results: ["Monthly food distribution", "Shelter for 2,000+ families", "Trauma counseling provided"],
  },
  {
    id: 5,
    title: "Education Intervention Project",
    description: "Supporting the School for the Blind in Jabi, Abuja with educational materials, assistive technology, infrastructure upgrades, and teacher training programs.",
    category: "Education",
    location: "Jabi, Abuja",
    date: "2020 - Present",
    beneficiaries: "350+ students",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2673&auto=format&fit=crop",
    results: ["Braille library established", "Computer lab equipped", "95% student retention"],
  },
  {
    id: 6,
    title: "Pagi Medical Outreach",
    description: "Free medical consultations, treatments, health screenings, and health education reaching thousands of underserved residents in Abuja peri-urban communities.",
    category: "Health",
    location: "Pagi, Abuja",
    date: "2017 - Present",
    beneficiaries: "28,000+ patients",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
    results: ["52 outreaches conducted", "Free medications distributed", "Health workers trained"],
  },
  {
    id: 7,
    title: "Violence Against Women Campaign",
    description: "Advocacy and support programs combating gender-based violence through legal aid, counseling services, economic empowerment, and community education.",
    category: "Gender",
    location: "Nationwide",
    date: "2019 - Present",
    beneficiaries: "12,800+ women",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2574&auto=format&fit=crop",
    results: ["85 support groups active", "Legal aid for 500+ cases", "Community sensitization"],
  },
  {
    id: 8,
    title: "Naka Farming Community Project",
    description: "Empowering the farming community in Naka with modern agricultural tools, cooperative development, and sustainable farming practices training.",
    category: "Agriculture",
    location: "Naka, Benue State",
    date: "2022 - Present",
    beneficiaries: "2,100+ farmers",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2670&auto=format&fit=crop",
    results: ["15 cooperatives formed", "Equipment provided", "Market linkages established"],
  },
]

const categories = ["All", "Agriculture", "Education", "Humanitarian", "Health", "Gender"]

const categoryColors: Record<string, string> = {
  Agriculture: "bg-green-100 text-green-800",
  Education: "bg-blue-100 text-blue-800",
  Humanitarian: "bg-orange-100 text-orange-800",
  Health: "bg-red-100 text-red-800",
  Gender: "bg-purple-100 text-purple-800",
}

export function ProjectPortfolio() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Project Portfolio
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Our Programs & Initiatives
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
            Explore our comprehensive portfolio of development programs making 
            measurable impact across Nigeria and Africa.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className={`absolute left-4 top-4 ${categoryColors[project.category]}`}>
                    {project.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-foreground">{project.title}</h3>
                  
                  {/* Meta Info */}
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {project.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {project.beneficiaries}
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>

                  {/* Expandable Results */}
                  <AnimatePresence>
                    {expandedProject === project.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 rounded-lg bg-muted p-4">
                          <h4 className="text-sm font-semibold text-foreground">Key Results:</h4>
                          <ul className="mt-2 space-y-1">
                            {project.results.map((result, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                    className="mt-4 text-primary hover:text-primary/80"
                  >
                    {expandedProject === project.id ? "Show Less" : "View Results"}
                    <ArrowRight className={`ml-1 h-4 w-4 transition-transform ${expandedProject === project.id ? "rotate-90" : ""}`} />
                  </Button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
