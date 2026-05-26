"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Building2, Heart, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FormType = "partner" | "volunteer" | "general"

export function ContactForms() {
  const [activeForm, setActiveForm] = useState<FormType>("partner")
  const [submitted, setSubmitted] = useState(false)

  const forms = [
    { id: "partner" as const, label: "Partnership Inquiry", icon: Building2 },
    { id: "volunteer" as const, label: "Volunteer Application", icon: Heart },
    { id: "general" as const, label: "General Contact", icon: MessageSquare },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="partner" className="bg-background py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Form Type Selector */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {forms.map((form) => (
            <button
              key={form.id}
              onClick={() => {
                setActiveForm(form.id)
                setSubmitted(false)
              }}
              className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all ${
                activeForm === form.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              <form.icon className="h-4 w-4" />
              {form.label}
            </button>
          ))}
        </div>

        {/* Form Card */}
        <motion.div
          key={activeForm}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-card p-8 shadow-lg sm:p-10"
        >
          {!submitted ? (
            <>
              {activeForm === "partner" && <PartnershipForm onSubmit={handleSubmit} />}
              {activeForm === "volunteer" && <VolunteerForm onSubmit={handleSubmit} />}
              {activeForm === "general" && <GeneralForm onSubmit={handleSubmit} />}
            </>
          ) : (
            <SuccessMessage onReset={() => setSubmitted(false)} />
          )}
        </motion.div>
      </div>
    </section>
  )
}

function PartnershipForm({ onSubmit }: { onSubmit: (e: React.FormEvent) => void }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl font-bold text-foreground">Partnership Inquiry</h2>
        <p className="mt-2 text-muted-foreground">
          Interested in partnering with Shield Africa? Let us know how we can work together.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="orgName">Organization Name</Label>
          <Input id="orgName" placeholder="Your organization" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="orgType">Organization Type</Label>
          <select
            id="orgType"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="">Select type</option>
            <option value="ngo">NGO / Non-Profit</option>
            <option value="government">Government Agency</option>
            <option value="corporate">Corporate / Business</option>
            <option value="foundation">Foundation / Trust</option>
            <option value="international">International Organization</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contactName">Contact Person</Label>
          <Input id="contactName" placeholder="Full name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position / Title</Label>
          <Input id="position" placeholder="Your role" required />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="email@organization.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="+234 800 123 4567" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="partnershipArea">Area of Partnership Interest</Label>
        <select
          id="partnershipArea"
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <option value="">Select area</option>
          <option value="funding">Funding / Grants</option>
          <option value="technical">Technical Support</option>
          <option value="implementation">Program Implementation</option>
          <option value="capacity">Capacity Building</option>
          <option value="research">Research Partnership</option>
          <option value="csr">Corporate Social Responsibility</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Tell Us About Your Partnership Vision</Label>
        <textarea
          id="message"
          rows={4}
          placeholder="Describe how you envision this partnership..."
          required
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
      </div>

      <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-orange-dark">
        Submit Partnership Inquiry
      </Button>
    </form>
  )
}

function VolunteerForm({ onSubmit }: { onSubmit: (e: React.FormEvent) => void }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl font-bold text-foreground">Volunteer Application</h2>
        <p className="mt-2 text-muted-foreground">
          Join our team of dedicated volunteers making a difference across Africa.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="John" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Doe" required />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="volEmail">Email Address</Label>
          <Input id="volEmail" type="email" placeholder="john@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="volPhone">Phone Number</Label>
          <Input id="volPhone" type="tel" placeholder="+234 800 123 4567" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" placeholder="City, State" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="volunteerArea">Area of Interest</Label>
        <select
          id="volunteerArea"
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <option value="">Select area</option>
          <option value="agriculture">Agricultural Programs</option>
          <option value="education">Education Initiatives</option>
          <option value="health">Medical Outreaches</option>
          <option value="humanitarian">Humanitarian Response</option>
          <option value="admin">Administrative Support</option>
          <option value="communications">Communications / Media</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Your Skills & Experience</Label>
        <textarea
          id="skills"
          rows={4}
          placeholder="Tell us about your skills and relevant experience..."
          required
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
      </div>

      <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-orange-dark">
        Submit Volunteer Application
      </Button>
    </form>
  )
}

function GeneralForm({ onSubmit }: { onSubmit: (e: React.FormEvent) => void }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl font-bold text-foreground">General Inquiry</h2>
        <p className="mt-2 text-muted-foreground">
          Have a question or want to learn more? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="genFirstName">First Name</Label>
          <Input id="genFirstName" placeholder="John" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="genLastName">Last Name</Label>
          <Input id="genLastName" placeholder="Doe" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="genEmail">Email Address</Label>
        <Input id="genEmail" type="email" placeholder="john@example.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" placeholder="What is this regarding?" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="genMessage">Your Message</Label>
        <textarea
          id="genMessage"
          rows={5}
          placeholder="Write your message here..."
          required
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
      </div>

      <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-orange-dark">
        Send Message
      </Button>
    </form>
  )
}

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-12 text-center"
    >
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle2 className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">Message Sent Successfully!</h3>
      <p className="mt-2 text-muted-foreground">
        Thank you for reaching out. Our team will review your message and 
        get back to you within 2-3 business days.
      </p>
      <Button variant="outline" className="mt-6" onClick={onReset}>
        Send Another Message
      </Button>
    </motion.div>
  )
}
