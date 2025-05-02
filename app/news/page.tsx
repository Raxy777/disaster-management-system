import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { NewsPage } from "@/components/news-page"

export default function News() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <NewsPage />
      </main>
      <Footer />
    </div>
  )
}
