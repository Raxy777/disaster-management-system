import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ReportForm } from "@/components/report-form"

export default function ReportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <ReportForm />
      </main>
      <Footer />
    </div>
  )
}
