import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForms } from "@/components/contact/contact-forms"
import { ContactInfo } from "@/components/contact/contact-info"

export const metadata: Metadata = {
  title: "Contact Us | Shield Africa",
  description: "Get in touch with Shield Africa. Partner with us, volunteer, or reach out for inquiries about our sustainable development programs.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ContactHero />
      <ContactForms />
      <ContactInfo />
      <Footer />
    </main>
  )
}
