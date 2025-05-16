"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

// Mock data for live alerts
const mockAlerts = [
  {
    id: 1,
    type: "Flood",
    location: "Riverside County",
    severity: "high",
    message: "Flash flood warning in effect until 8PM. Evacuate low-lying areas immediately.",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "Wildfire",
    location: "Mountain View",
    severity: "medium",
    message: "Wildfire spreading north. Prepare for possible evacuation.",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "Earthquake",
    location: "Central City",
    severity: "low",
    message: "5.2 magnitude earthquake detected. Check structures for damage.",
    time: "1 day ago",
  },
]

export function HeroBanner() {
  const [currentAlert, setCurrentAlert] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % mockAlerts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const alert = mockAlerts[currentAlert]

  return (
    <section className="relative bg-[#0077B6] py-12 md:py-20">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Disaster Response & Management System
            </h1>
            <p className="max-w-[600px] text-white/90 md:text-xl">
              Real-time alerts, resources, and coordination for effective disaster response and management.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="bg-white text-[#0077B6] hover:bg-white/90" asChild>
                <Link href="/report">
                  Report Disaster <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="bg-[#0077B6]border-white text-white hover:bg-white/10" asChild>
                <Link href="/resources">Emergency Resources</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="rounded-lg bg-white p-4">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <AlertTriangle className="h-5 w-5 text-[#FF9933]" />
                Live Alerts
              </h2>
              <div className="space-y-3">
                <Alert
                  className={`border-l-4 ${
                    alert.severity === "high"
                      ? "border-l-red-500"
                      : alert.severity === "medium"
                        ? "border-l-[#FF9933]"
                        : "border-l-yellow-500"
                  }`}
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="flex items-center justify-between">
                    {alert.type} - {alert.location}
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </AlertTitle>
                  <AlertDescription>{alert.message}</AlertDescription>
                </Alert>
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    {mockAlerts.map((_, index) => (
                      <span
                        key={index}
                        className={`block h-1.5 w-6 rounded-full ${
                          index === currentAlert ? "bg-[#0077B6]" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <Button variant="link" size="sm" className="text-[#0077B6]" asChild>
                    <Link href="/alerts">
                      View all alerts <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
