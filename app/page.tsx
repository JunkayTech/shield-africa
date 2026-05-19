import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ImpactStats } from "@/components/home/impact-stats"
import { ProgramsShowcase } from "@/components/home/programs-showcase"
import { PartnersSection } from "@/components/home/partners-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { NewsletterSection } from "@/components/home/newsletter-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ImpactStats />
      <ProgramsShowcase />
      <PartnersSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
