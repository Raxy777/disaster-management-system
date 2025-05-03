"use client"

import { useState } from "react"
import { Bell, AlertTriangle, Info, MapPin, Calendar, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

// Mock data for alerts
const alerts = [
  {
    id: 1,
    title: "Flash Flood Warning",
    description: "Flash flood warning issued for riverside communities. Evacuate to higher ground immediately.",
    type: "emergency",
    location: "Riverside District",
    date: "2023-05-03T08:30:00",
    status: "active",
  },
  {
    id: 2,
    title: "Severe Thunderstorm Watch",
    description: "Severe thunderstorms expected in the next 6 hours. Secure loose objects and stay indoors.",
    type: "warning",
    location: "Central City",
    date: "2023-05-03T10:15:00",
    status: "active",
  },
  {
    id: 3,
    title: "Evacuation Order Lifted",
    description: "The evacuation order for North County has been lifted. Residents may return to their homes.",
    type: "info",
    location: "North County",
    date: "2023-05-02T14:45:00",
    status: "resolved",
  },
  {
    id: 4,
    title: "Wildfire Containment Update",
    description: "The Mountain Ridge wildfire is now 75% contained. Some road closures remain in effect.",
    type: "info",
    location: "Mountain Ridge",
    date: "2023-05-01T17:20:00",
    status: "resolved",
  },
  {
    id: 5,
    title: "Earthquake Safety Advisory",
    description: "Following the 4.5 magnitude earthquake, residents are advised to check homes for structural damage.",
    type: "warning",
    location: "Metro Area",
    date: "2023-04-30T09:10:00",
    status: "active",
  },
]

export default function AlertsList() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAlerts = alerts.filter((alert) => {
    // Filter by status
    if (filter !== "all" && alert.status !== filter) return false

    // Filter by search query
    if (
      searchQuery &&
      !alert.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !alert.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !alert.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "emergency":
        return <Badge variant="destructive">Emergency</Badge>
      case "warning":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
            Warning
          </Badge>
        )
      case "info":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Information
          </Badge>
        )
      default:
        return <Badge>Alert</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Input
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <div className="absolute left-3 top-2.5 text-muted-foreground">
            <Filter className="h-4 w-4" />
          </div>
        </div>

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Alerts</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
          <TabsTrigger value="information">Information</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {filteredAlerts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No alerts found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="emergency" className="mt-6">
          {filteredAlerts.filter((a) => a.type === "emergency").length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredAlerts
                .filter((a) => a.type === "emergency")
                .map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No emergency alerts</h3>
              <p className="text-muted-foreground">There are currently no emergency alerts.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="information" className="mt-6">
          {filteredAlerts.filter((a) => a.type === "info" || a.type === "warning").length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredAlerts
                .filter((a) => a.type === "info" || a.type === "warning")
                .map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Info className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No information alerts</h3>
              <p className="text-muted-foreground">There are currently no information alerts.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AlertCard({ alert }: { alert: any }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <Card className={`overflow-hidden ${alert.status === "resolved" ? "opacity-75" : ""}`}>
      <CardHeader
        className={`${
          alert.type === "emergency" ? "bg-red-50" : alert.type === "warning" ? "bg-amber-50" : "bg-blue-50"
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getAlertIcon(alert.type)}
            <CardTitle className="text-lg">{alert.title}</CardTitle>
          </div>
          {getAlertBadge(alert.type)}
        </div>
        <CardDescription className="flex items-center gap-1 mt-2">
          <MapPin className="h-3.5 w-3.5" /> {alert.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <p>{alert.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-3.5 w-3.5" />
          <span>{formatDate(alert.date)}</span>
        </div>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

function getAlertIcon(type: string) {
  switch (type) {
    case "emergency":
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />
    default:
      return <Bell className="h-5 w-5" />
  }
}

function getAlertBadge(type: string) {
  switch (type) {
    case "emergency":
      return <Badge variant="destructive">Emergency</Badge>
    case "warning":
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
          Warning
        </Badge>
      )
    case "info":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
          Information
        </Badge>
      )
    default:
      return <Badge>Alert</Badge>
  }
}
