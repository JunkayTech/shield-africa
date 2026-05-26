import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { StorySection } from "@/components/about/story-section"
import { VisionMission } from "@/components/about/vision-mission"
import { LeadershipSection } from "@/components/about/leadership-section"
import { ValuesSection } from "@/components/about/values-section"

export const metadata: Metadata = {
  title: "About Us | Shield Africa",
  description: "Learn about Shield Africa's mission to empower communities through sustainable development initiatives across Nigeria and Africa.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <AboutHero />
      <StorySection />
      <VisionMission />
      <LeadershipSection />
      <ValuesSection />
      <Footer />
    </main>
  )
}
