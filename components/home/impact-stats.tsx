"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Leaf, Heart, Award, GraduationCap, Stethoscope, TrendingUp, Target } from "lucide-react"

const stats = [
  { value: 108, label: "Communities Impacted", icon: Users, suffix: "" },
  { value: 23000, label: "Youth Empowered", icon: GraduationCap, suffix: "+" },
  { value: 25000, label: "Farmers Supported", icon: Leaf, suffix: "+" },
  { value: 8, label: "Active Projects", icon: Target, suffix: "" },
  { value: 12800, label: "Women Reached", icon: Heart, suffix: "" },
  { value: 165000, label: "Total Beneficiaries", icon: Users, suffix: "" },
  { value: 52, label: "Medical Outreaches", icon: Stethoscope, suffix: "" },
  { value: 95, label: "Success Rate", icon: TrendingUp, suffix: "%" },
]

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
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

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString()
    }
    return num.toString()
  }

  return (
    <span>
      {formatNumber(count)}{suffix}
    </span>
  )
}

export function ImpactStats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative overflow-hidden bg-background py-24">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Our Impact
          </span>
          <h2 className="mt-6 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Our Impact Across Communities
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Empowering communities through sustainable development initiatives, 
            humanitarian aid, and capacity building programs across Nigeria.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div ref={ref} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg"
            >
              {/* Background accent */}
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
              
              {/* Icon */}
              <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <stat.icon className="h-6 w-6" />
              </div>

              {/* Value */}
              <div className="relative font-serif text-4xl font-bold text-foreground">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>

              {/* Label */}
              <p className="relative mt-2 text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
