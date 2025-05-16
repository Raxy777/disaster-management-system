"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertTriangle, Home, Users } from "lucide-react"
import { useEffect, useState } from "react"

// Mock data for statistics
const initialStats = [
  {
    title: "Active Disasters",
    value: 12,
    icon: AlertTriangle,
    color: "text-red-500",
    bgColor: "bg-red-50",
    change: "+2 today",
  },
  {
    title: "People Affected",
    value: 24350,
    icon: Users,
    color: "text-[#0077B6]",
    bgColor: "bg-blue-50",
    change: "+350 today",
  },
  {
    title: "Shelters Active",
    value: 48,
    icon: Home,
    color: "text-green-500",
    bgColor: "bg-green-50",
    change: "+5 today",
  },
  {
    title: "Response Teams",
    value: 86,
    icon: Activity,
    color: "text-[#FF9933]",
    bgColor: "bg-orange-50",
    change: "+12 today",
  },
]

export function LiveStatistics() {
  const [stats, setStats] = useState(initialStats)

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) =>
        prevStats.map((stat) => ({
          ...stat,
          value: stat.title === "People Affected" ? stat.value + Math.floor(Math.random() * 10) : stat.value,
        })),
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-gray-50 py-12">
      <div className="container">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl">Live Statistics</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`rounded-full p-2 ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.title === "People Affected" ? stat.value.toLocaleString() : stat.value}
                </div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
