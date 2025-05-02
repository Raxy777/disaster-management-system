import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { InteractiveMap } from "@/components/interactive-map"

export default function MapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <InteractiveMap />
      </main>
      <Footer />
    </div>
  )
}
