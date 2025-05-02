import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EmergencyResourcesPage } from "@/components/emergency-resources-page"

export default function ResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <EmergencyResourcesPage />
      </main>
      <Footer />
    </div>
  )
}
