import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DisasterTypesList } from "@/components/disaster-types-list"

export default function DisasterTypesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <DisasterTypesList />
      </main>
      <Footer />
    </div>
  )
}
