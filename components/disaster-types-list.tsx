"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const disasterTypes = [
  {
    id: "earthquake",
    title: "Earthquake",
    description: "Sudden shaking of the ground caused by movements within the Earth's crust.",
    icon: "/placeholder.svg?height=80&width=80",
    symptoms: ["Ground shaking", "Building collapse", "Landslides", "Tsunamis in coastal areas"],
    preparedness: [
      "Secure heavy furniture to walls",
      "Create an emergency kit",
      "Know safe spots in each room (under sturdy tables, against interior walls)",
      "Practice drop, cover, and hold on drills",
    ],
    response: [
      "Drop to the ground, take cover, and hold on",
      "Stay indoors until shaking stops",
      "If outdoors, move to a clear area away from buildings",
      "Be prepared for aftershocks",
    ],
  },
  {
    id: "flood",
    title: "Flood",
    description: "Overflow of water onto normally dry land, often caused by heavy rainfall or dam failures.",
    icon: "/placeholder.svg?height=80&width=80",
    symptoms: ["Rising water levels", "Intense rainfall", "Dam or levee failures", "Coastal storm surges"],
    preparedness: [
      "Know your area's flood risk",
      "Prepare an evacuation plan",
      "Elevate electrical systems",
      "Consider flood insurance",
    ],
    response: [
      "Move to higher ground immediately",
      "Do not walk or drive through flood waters",
      "Follow evacuation orders",
      "Disconnect utilities if instructed",
    ],
  },
  {
    id: "wildfire",
    title: "Wildfire",
    description: "Uncontrolled fire that burns in wildland vegetation, often in rural areas.",
    icon: "/placeholder.svg?height=80&width=80",
    symptoms: [
      "Smoke and ash in the air",
      "Orange/red glow in the sky",
      "Hot, dry, and windy conditions",
      "Rapid spread of flames",
    ],
    preparedness: [
      "Create defensible space around your home",
      "Use fire-resistant materials for construction",
      "Prepare an evacuation plan",
      "Keep emergency supplies ready",
    ],
    response: [
      "Follow evacuation orders immediately",
      "Close all windows and doors",
      "Remove flammable items from around the house",
      "Monitor local news for updates",
    ],
  },
  {
    id: "cyclone",
    title: "Cyclone/Hurricane/Typhoon",
    description: "Violent storm characterized by high winds rotating around a center of low atmospheric pressure.",
    icon: "/placeholder.svg?height=80&width=80",
    symptoms: ["Strong winds", "Heavy rainfall", "Storm surge in coastal areas", "Falling barometric pressure"],
    preparedness: [
      "Secure your home (board windows, secure loose items)",
      "Prepare an emergency kit",
      "Know evacuation routes",
      "Have a battery-powered radio",
    ],
    response: [
      "Stay indoors away from windows",
      "Follow evacuation orders",
      "Do not go outside during the eye of the storm",
      "Be aware of flooding and tornadoes",
    ],
  },
  {
    id: "tsunami",
    title: "Tsunami",
    description: "Series of ocean waves caused by underwater seismic activity or other disturbances.",
    icon: "/placeholder.svg?height=80&width=80",
    symptoms: [
      "Rapid recession of coastal waters",
      "Loud roaring sound from the ocean",
      "Earthquake in coastal areas",
      "Sudden rise in water level",
    ],
    preparedness: [
      "Know tsunami evacuation routes",
      "Prepare an emergency kit",
      "Have a battery-powered radio",
      "Understand tsunami warning signs",
    ],
    response: [
      "Move to higher ground immediately",
      "Follow evacuation orders",
      "Stay away from the coast until officials declare it safe",
      "Be alert for multiple waves",
    ],
  },
  {
    id: "landslide",
    title: "Landslide",
    description: "Movement of rock, earth, or debris down a sloped section of land.",
    icon: "/placeholder.svg?height=80&width=80",
    symptoms: [
      "Changes in landscape",
      "Tilting trees",
      "Unusual sounds (cracking trees, boulders knocking)",
      "Sudden increase in creek water levels",
    ],
    preparedness: [
      "Learn about local landslide risk",
      "Plant ground cover on slopes",
      "Install flexible pipe fittings to avoid gas or water leaks",
      "Create proper drainage channels",
    ],
    response: [
      "Move quickly away from the path of the landslide",
      "Listen for unusual sounds",
      "Watch for flooding",
      "Stay alert when driving",
    ],
  },
]

export function DisasterTypesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredDisasters = disasterTypes.filter((disaster) =>
    disaster.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Disaster Types</h1>
          <p className="mt-2 text-muted-foreground">
            Learn about different types of disasters, their warning signs, and how to prepare and respond
          </p>
        </div>

        <div className="mx-auto mb-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search disaster types..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDisasters.map((disaster) => (
            <Collapsible
              key={disaster.id}
              open={expandedId === disaster.id}
              onOpenChange={(open) => setExpandedId(open ? disaster.id : null)}
            >
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={disaster.icon || "/placeholder.svg"}
                        alt={disaster.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle>{disaster.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{disaster.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex w-full justify-between">
                      {expandedId === disaster.id ? "Show Less" : "Show More"}
                      {expandedId === disaster.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-4">
                    <div>
                      <h3 className="mb-2 font-semibold">Warning Signs</h3>
                      <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                        {disaster.symptoms.map((symptom, index) => (
                          <li key={index}>{symptom}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">How to Prepare</h3>
                      <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                        {disaster.preparedness.map((prep, index) => (
                          <li key={index}>{prep}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">How to Respond</h3>
                      <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                        {disaster.response.map((resp, index) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  </CollapsibleContent>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/disaster-types/${disaster.id}`}>Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  )
}
