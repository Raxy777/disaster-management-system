"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Filter, Home, Info, Layers, MapPin } from "lucide-react"
import { useState } from "react"

// Mock data for map markers
const disasterZones = [
  {
    id: 1,
    name: "Riverside County Flood Zone",
    type: "Flood",
    severity: "high",
    lat: 33.9,
    lng: -117.5,
    affectedArea: "25 sq km",
    population: "12,500",
    status: "Active",
  },
  {
    id: 2,
    name: "Mountain View Wildfire",
    type: "Wildfire",
    severity: "medium",
    lat: 34.1,
    lng: -118.2,
    affectedArea: "8 sq km",
    population: "5,200",
    status: "Active",
  },
  {
    id: 3,
    name: "Central City Earthquake Impact",
    type: "Earthquake",
    severity: "low",
    lat: 34.05,
    lng: -118.4,
    affectedArea: "12 sq km",
    population: "8,300",
    status: "Recovery",
  },
]

const shelters = [
  {
    id: 1,
    name: "Riverside Community Center",
    type: "Shelter",
    capacity: "250",
    occupancy: "180",
    lat: 33.95,
    lng: -117.4,
    status: "Open",
  },
  {
    id: 2,
    name: "Mountain High School",
    type: "Shelter",
    capacity: "350",
    occupancy: "210",
    lat: 34.15,
    lng: -118.25,
    status: "Open",
  },
  {
    id: 3,
    name: "Central City Stadium",
    type: "Shelter",
    capacity: "500",
    occupancy: "320",
    lat: 34.0,
    lng: -118.35,
    status: "Open",
  },
]

export function InteractiveMap() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [filters, setFilters] = useState({
    flood: true,
    wildfire: true,
    earthquake: true,
    shelters: true,
    alerts: true,
  })

  return (
    <section className="py-6">
      <div className="container">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Interactive Map</h1>
            <p className="text-muted-foreground">View affected zones, shelter locations, and real-time alerts</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Layers className="mr-2 h-4 w-4" /> Change Map Style
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border bg-muted">
              {/* Map placeholder - would be replaced with actual map component */}
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <div className="text-center">
                  <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Interactive map would render here with the selected markers
                  </p>
                </div>
              </div>

              {/* Sample markers on the map */}
              <div className="absolute left-1/4 top-1/3">
                <div
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white"
                  onClick={() => setSelectedMarker(disasterZones[0])}
                >
                  <AlertTriangle className="h-3 w-3" />
                </div>
              </div>
              <div className="absolute left-2/3 top-1/4">
                <div
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-orange-500 text-white"
                  onClick={() => setSelectedMarker(disasterZones[1])}
                >
                  <AlertTriangle className="h-3 w-3" />
                </div>
              </div>
              <div className="absolute left-1/2 top-2/3">
                <div
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white"
                  onClick={() => setSelectedMarker(shelters[0])}
                >
                  <Home className="h-3 w-3" />
                </div>
              </div>

              {/* Selected marker info */}
              {selectedMarker && (
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white p-4 shadow-lg">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">{selectedMarker.name}</h3>
                    <Badge
                      className={
                        selectedMarker.type === "Flood"
                          ? "bg-blue-500"
                          : selectedMarker.type === "Wildfire"
                            ? "bg-red-500"
                            : selectedMarker.type === "Earthquake"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                      }
                    >
                      {selectedMarker.type}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {selectedMarker.severity && (
                      <div>
                        <span className="text-muted-foreground">Severity:</span>{" "}
                        <span className="font-medium">{selectedMarker.severity}</span>
                      </div>
                    )}
                    {selectedMarker.status && (
                      <div>
                        <span className="text-muted-foreground">Status:</span>{" "}
                        <span className="font-medium">{selectedMarker.status}</span>
                      </div>
                    )}
                    {selectedMarker.affectedArea && (
                      <div>
                        <span className="text-muted-foreground">Area:</span>{" "}
                        <span className="font-medium">{selectedMarker.affectedArea}</span>
                      </div>
                    )}
                    {selectedMarker.population && (
                      <div>
                        <span className="text-muted-foreground">Population:</span>{" "}
                        <span className="font-medium">{selectedMarker.population}</span>
                      </div>
                    )}
                    {selectedMarker.capacity && (
                      <div>
                        <span className="text-muted-foreground">Capacity:</span>{" "}
                        <span className="font-medium">{selectedMarker.capacity}</span>
                      </div>
                    )}
                    {selectedMarker.occupancy && (
                      <div>
                        <span className="text-muted-foreground">Occupancy:</span>{" "}
                        <span className="font-medium">{selectedMarker.occupancy}</span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-2 p-0 text-[#0077B6]"
                    onClick={() => setSelectedMarker(null)}
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Map Layers</CardTitle>
                <CardDescription>Toggle map elements visibility</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="disasters">Disasters</TabsTrigger>
                    <TabsTrigger value="shelters">Shelters</TabsTrigger>
                  </TabsList>
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="flood"
                          checked={filters.flood}
                          onCheckedChange={(checked) => setFilters({ ...filters, flood: !!checked })}
                        />
                        <label
                          htmlFor="flood"
                          className="flex cursor-pointer items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          <div className="mr-2 h-3 w-3 rounded-full bg-blue-500" />
                          Flood Zones
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="wildfire"
                          checked={filters.wildfire}
                          onCheckedChange={(checked) => setFilters({ ...filters, wildfire: !!checked })}
                        />
                        <label
                          htmlFor="wildfire"
                          className="flex cursor-pointer items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          <div className="mr-2 h-3 w-3 rounded-full bg-red-500" />
                          Wildfire Areas
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="earthquake"
                          checked={filters.earthquake}
                          onCheckedChange={(checked) => setFilters({ ...filters, earthquake: !!checked })}
                        />
                        <label
                          htmlFor="earthquake"
                          className="flex cursor-pointer items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500" />
                          Earthquake Impact
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="shelters"
                          checked={filters.shelters}
                          onCheckedChange={(checked) => setFilters({ ...filters, shelters: !!checked })}
                        />
                        <label
                          htmlFor="shelters"
                          className="flex cursor-pointer items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          <div className="mr-2 h-3 w-3 rounded-full bg-green-500" />
                          Shelter Locations
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="alerts"
                          checked={filters.alerts}
                          onCheckedChange={(checked) => setFilters({ ...filters, alerts: !!checked })}
                        />
                        <label
                          htmlFor="alerts"
                          className="flex cursor-pointer items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          <div className="mr-2 h-3 w-3 rounded-full bg-[#FF9933]" />
                          Active Alerts
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">Filter by severity</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Severities</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">Filter by date</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select time period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">Past Week</SelectItem>
                          <SelectItem value="month">Past Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Legend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span className="text-sm">Flood Zones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="text-sm">Wildfire Areas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">Earthquake Impact</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-sm">Shelter Locations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#FF9933]" />
                    <span className="text-sm">Active Alerts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
