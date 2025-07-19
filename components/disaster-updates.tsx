import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const updates = [
  {
    id: 1,
    title: "Flood Recovery Efforts in Riverside County",
    description:
      "Relief teams have been deployed to assist with evacuation and recovery efforts in the affected areas.",
    type: "Flood",
    date: "May 1, 2025",
    image: "https://media.istockphoto.com/id/1055164542/photo/dam-construction-on-the-river-rescue-operation-with-a-boat-oil-spill.webp?b=1&s=612x612&w=0&k=20&c=wzZJOcs4enfC17VRD_8koh4J-n6qKGZyYqIRj_x4tIA=",
  },
  {
    id: 2,
    title: "Wildfire Containment Progress in Mountain View",
    description:
      "Firefighters have contained 60% of the wildfire. Evacuation orders remain in place for certain zones.",
    type: "Wildfire",
    date: "April 29, 2025",
    image: "https://images.pexels.com/photos/3552472/pexels-photo-3552472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    title: "Earthquake Damage Assessment in Central City",
    description:
      "Structural engineers are evaluating buildings after the 5.2 magnitude earthquake. No major casualties reported.",
    type: "Earthquake",
    date: "April 28, 2025",
    image: "https://images.pexels.com/photos/7907392/pexels-photo-7907392.jpeg",
  },
]

export function DisasterUpdates() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Latest Updates</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/news">
              View all updates <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {updates.map((update) => (
            <Card key={update.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image src={update.image || "/placeholder.svg"} alt={update.title} fill className="object-cover" />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge
                    className={
                      update.type === "Flood"
                        ? "bg-blue-500"
                        : update.type === "Wildfire"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    }
                  >
                    {update.type}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {update.date}
                  </div>
                </div>
                <CardTitle className="line-clamp-2 text-lg">{update.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">{update.description}</CardDescription>
              </CardContent>
              <CardFooter>
                {/* <Button variant="link" className="px-0 text-[#0077B6]" asChild>
                  <Link href={`/news/${update.id}`}>
                    Read more <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
