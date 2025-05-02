import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactPage } from "@/components/contact-page"

export default function Contact() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <ContactPage />
      </main>
      <Footer />
    </div>
  )
}
