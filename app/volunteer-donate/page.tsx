import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { VolunteerPage } from "@/components/volunteer-page"

export default function VolunteerDonatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <VolunteerPage />
      </main>
      <Footer />
    </div>
  )
}
