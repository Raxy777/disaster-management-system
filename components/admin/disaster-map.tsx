"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Layers, MapPin, Search, ZoomIn, ZoomOut } from "lucide-react"
import { useState } from "react"

export function DisasterMap() {
  const [mapType, setMapType] = useState("incidents")
  const [searchQuery, setSearchQuery] = useState("")
  const [zoomLevel, setZoomLevel] = useState(5)

  // This would be replaced with actual map implementation
  // using libraries like Leaflet, Google Maps, or Mapbox
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Disaster Map</h2>
          <p className="text-muted-foreground">Interactive map of disaster incidents and resources</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Select value={mapType} onValueChange={setMapType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Map Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="incidents">Incidents</SelectItem>
              <SelectItem value="resources">Resources</SelectItem>
              <SelectItem value="volunteers">Volunteers</SelectItem>
              <SelectItem value="heatmap">Impact Heatmap</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search locations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Incident Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="flood">Floods</SelectItem>
              <SelectItem value="fire">Wildfires</SelectItem>
              <SelectItem value="earthquake">Earthquakes</SelectItem>
              <SelectItem value="storm">Storms</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="map">
        <TabsList className="mb-6">
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="satellite">Satellite View</TabsTrigger>
          <TabsTrigger value="terrain">Terrain View</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="relative">
          <Card>
            <CardContent className="p-0">
              <div className="relative bg-gray-100 h-[600px] rounded-md flex items-center justify-center">
                {/* This would be replaced with an actual map component */}
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-[#0077B6]" />
                  <p className="mt-4 text-lg font-medium">Interactive Map</p>
                  <p className="text-sm text-muted-foreground">
                    This would be an interactive map showing disaster incidents and resources.
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <Button variant="secondary" size="icon" onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 10))}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 1))}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Incidents</CardTitle>
                <CardDescription>Current disaster incidents on the map</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-500">High</Badge>
                      <span>Flash Flood</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500">Medium</Badge>
                      <span>Wildfire</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-500">Low</Badge>
                      <span>Power Outage</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Resource Centers</CardTitle>
                <CardDescription>Active resource distribution centers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Central Relief Center</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>North Medical Station</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>South Evacuation Center</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Map Legend</CardTitle>
                <CardDescription>Map symbols and indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-500">High</Badge>
                    <span className="text-sm">High Severity Incident</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-500">Medium</Badge>
                    <span className="text-sm">Medium Severity Incident</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500">Low</Badge>
                    <span className="text-sm">Low Severity Incident</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Resource Center</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Volunteer Team</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="satellite">
          <div className="flex h-[600px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Satellite View</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Satellite imagery of disaster areas would be displayed here.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="terrain">
          <div className="flex h-[600px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Terrain View</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Terrain map of disaster areas would be displayed here.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
