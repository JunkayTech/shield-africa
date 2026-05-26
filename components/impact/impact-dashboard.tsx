"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Leaf, GraduationCap, Heart, Stethoscope, Users, MapPin, TrendingUp, Calendar } from "lucide-react"

const impactAreas = [
  {
    category: "Agriculture",
    icon: Leaf,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    stats: [
      { label: "Farmers Trained", value: 25000, suffix: "+" },
      { label: "Hectares Cultivated", value: 15000, suffix: "" },
      { label: "Yield Increase", value: 180, suffix: "%" },
    ],
  },
  {
    category: "Education",
    icon: GraduationCap,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    stats: [
      { label: "Youth Empowered", value: 23000, suffix: "+" },
      { label: "Schools Supported", value: 45, suffix: "" },
      { label: "Scholarships Given", value: 1200, suffix: "+" },
    ],
  },
  {
    category: "Women & Gender",
    icon: Heart,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    stats: [
      { label: "Women Reached", value: 12800, suffix: "" },
      { label: "Support Groups", value: 85, suffix: "" },
      { label: "Businesses Started", value: 340, suffix: "+" },
    ],
  },
  {
    category: "Health",
    icon: Stethoscope,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    stats: [
      { label: "Medical Outreaches", value: 52, suffix: "" },
      { label: "Patients Treated", value: 28000, suffix: "+" },
      { label: "Health Workers Trained", value: 150, suffix: "" },
    ],
  },
]

const overallStats = [
  { label: "Total Beneficiaries", value: 165000, icon: Users },
  { label: "Communities Impacted", value: 108, icon: MapPin },
  { label: "Success Rate", value: 95, suffix: "%", icon: TrendingUp },
  { label: "Active Projects", value: 8, icon: Calendar },
]

function AnimatedCounter({ value, suffix = "", inView }: { value: number; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const steps = 60
    const stepValue = value / steps
    const stepTime = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep >= steps) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(stepValue * currentStep))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [value, inView])

  return <span>{count.toLocaleString()}{suffix}</span>
}

export function ImpactDashboard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="bg-background py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {overallStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground"
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
                <stat.icon className="relative h-8 w-8 opacity-80" />
                <div className="relative mt-4 font-serif text-4xl font-bold">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                </div>
                <p className="relative mt-1 text-sm opacity-80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Impact Breakdown
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Impact by Sector
          </h2>
        </motion.div>

        {/* Impact Area Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {impactAreas.map((area, index) => (
            <motion.div
              key={area.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${area.color} p-6 text-white`}>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                    <area.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{area.category}</h3>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-border">
                {area.stats.map((stat) => (
                  <div key={stat.label} className="p-4 text-center">
                    <div className="font-serif text-2xl font-bold text-foreground">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
