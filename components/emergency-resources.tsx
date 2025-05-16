import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FileText, Hospital, Phone, Video } from "lucide-react"
import Link from "next/link"

const resources = [
  {
    title: "Emergency Helplines",
    description: "Access important contact numbers for immediate assistance",
    icon: Phone,
    href: "/resources/helplines",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    title: "Hospital Locations",
    description: "Find nearby medical facilities and emergency rooms",
    icon: Hospital,
    href: "/resources/hospitals",
    color: "text-[#0077B6]",
    bgColor: "bg-blue-50",
  },
  {
    title: "Preparedness Guides",
    description: "Download guides for different disaster scenarios",
    icon: FileText,
    href: "/resources/guides",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    title: "Training Videos",
    description: "Watch instructional videos on emergency response",
    icon: Video,
    href: "/resources/training",
    color: "text-[#FF9933]",
    bgColor: "bg-orange-50",
  },
]

export function EmergencyResources() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Emergency Resources</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/resources">
              View all resources <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <Link key={resource.title} href={resource.href}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className={`mb-2 w-fit rounded-full p-2 ${resource.bgColor}`}>
                    <resource.icon className={`h-5 w-5 ${resource.color}`} />
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{resource.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
