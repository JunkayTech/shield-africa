"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "info@shieldafrica.org",
    href: "mailto:info@shieldafrica.org",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 (0) 800 123 4567",
    href: "tel:+2348001234567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Plot 123, Central Business District, Abuja, Nigeria",
    href: "#",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Monday - Friday: 9:00 AM - 5:00 PM",
    href: "#",
  },
]

export function ContactInfo() {
  return (
    <section className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Contact Information
            </span>
            
            <h2 className="mt-6 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Other Ways to Reach Us
            </h2>
            
            <p className="mt-4 text-muted-foreground">
              Have questions about our programs or want to visit our office? 
              Here&apos;s how you can reach us directly.
            </p>

            <div className="mt-8 space-y-6">
              {contactDetails.map((detail, index) => (
                <motion.a
                  key={detail.label}
                  href={detail.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 rounded-xl bg-card p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <detail.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{detail.label}</p>
                    <p className="mt-1 font-medium text-foreground">{detail.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl bg-card shadow-lg"
          >
            <div className="relative aspect-square bg-muted">
              {/* Map placeholder with location */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">Shield Africa Headquarters</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Central Business District, Abuja
                  </p>
                </div>
              </div>
              
              {/* Decorative grid pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full" style={{
                  backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                   linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
