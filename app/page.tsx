import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroBanner } from "@/components/hero-banner"
import { QuickActions } from "@/components/quick-actions"
import { LiveStatistics } from "@/components/live-statistics"
import { DisasterUpdates } from "@/components/disaster-updates"
import { EmergencyResources } from "@/components/emergency-resources"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <QuickActions />
        <LiveStatistics />
        <DisasterUpdates />
        {/* <EmergencyResources /> */}
      </main>
      <Footer />
    </div>
  )
}
