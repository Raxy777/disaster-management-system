import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertOctagon, HandHelping, Heart, MapPin } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Report Disaster",
    description: "Report an incident or disaster in your area",
    icon: AlertOctagon,
    href: "/report",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    title: "Get Help",
    description: "Find emergency resources and assistance",
    icon: HandHelping,
    href: "/resources",
    color: "text-[#0077B6]",
    bgColor: "bg-blue-50",
  },
  {
    title: "Volunteer & Donate",
    description: "Support relief efforts with time or resources",
    icon: Heart,
    href: "/volunteer-donate",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    title: "View Affected Areas",
    description: "See interactive maps of affected regions",
    icon: MapPin,
    href: "/map",
    color: "text-[#FF9933]",
    bgColor: "bg-orange-50",
  },
]

export function QuickActions() {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl">Quick Actions</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className={`mb-2 w-fit rounded-full p-2 ${action.bgColor}`}>
                    <action.icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{action.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
