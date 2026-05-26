"use client"

import { motion } from "framer-motion"

const partners = [
  { name: "Federal Ministry of Agriculture", logo: "FMA" },
  { name: "UNDP Nigeria", logo: "UNDP" },
  { name: "World Bank", logo: "WB" },
  { name: "African Development Bank", logo: "AfDB" },
  { name: "Bill & Melinda Gates Foundation", logo: "BMGF" },
  { name: "USAID", logo: "USAID" },
  { name: "European Union", logo: "EU" },
  { name: "UNICEF", logo: "UNICEF" },
]

export function PartnersSection() {
  return (
    <section className="bg-background py-16 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Trusted by leading organizations
          </p>
        </motion.div>

        {/* Partners Logos */}
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-center justify-center"
            >
              <div 
                className="flex h-16 w-full items-center justify-center rounded-lg bg-muted px-4 text-center text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted/80"
                title={partner.name}
              >
                {partner.logo}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
