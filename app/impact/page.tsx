import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ImpactHero } from "@/components/impact/impact-hero"
import { ImpactDashboard } from "@/components/impact/impact-dashboard"
import { ProjectPortfolio } from "@/components/impact/project-portfolio"
import { ImpactStories } from "@/components/impact/impact-stories"

export const metadata: Metadata = {
  title: "Our Impact | Shield Africa",
  description: "Explore the measurable impact Shield Africa has created across communities in Nigeria and Africa through sustainable development programs.",
}

export default function ImpactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ImpactHero />
      <ImpactDashboard />
      <ProjectPortfolio />
      <ImpactStories />
      <Footer />
    </main>
  )
}
