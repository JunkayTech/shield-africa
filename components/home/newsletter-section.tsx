"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-dark via-primary to-teal-dark p-8 text-center sm:p-12 lg:p-16"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
              Stay Connected
            </span>
            
            <h2 className="mt-6 font-serif text-3xl font-bold text-white sm:text-4xl">
              Stay Updated on Impact Stories
            </h2>
            
            <p className="mt-4 text-lg text-white/70">
              Get the latest news from the field, success stories, and updates 
              on how your support is making a difference across Africa.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 w-full border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white/40 sm:max-w-sm"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="group bg-accent text-accent-foreground hover:bg-orange-dark"
                >
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-white"
              >
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span>Thank you for subscribing!</span>
              </motion.div>
            )}

            <p className="mt-4 text-sm text-white/50">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
