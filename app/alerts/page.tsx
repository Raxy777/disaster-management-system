import type { Metadata } from "next"
import AlertsList from "@/components/alerts-list"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Alerts | Disaster Management System",
  description: "View and manage emergency alerts and notifications",
}

export default function AlertsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Emergency Alerts</h1>
        <AlertsList />
      </main>
      <Footer />
    </div>
  )
}
