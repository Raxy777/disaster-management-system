"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Download, ExternalLink, MapPin, Phone, Thermometer, Umbrella } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Mock data for helplines
const helplines = [
  {
    category: "National Emergency",
    numbers: [
      { name: "National Emergency Number", number: "112" },
      { name: "National Disaster Response Force", number: "1078" },
      { name: "Ambulance", number: "108" },
      { name: "Fire", number: "101" },
      { name: "Police", number: "100" },
    ],
  },
  {
    category: "State Emergency",
    numbers: [
      { name: "Riverside County Emergency", number: "951-555-0123" },
      { name: "Mountain View Emergency", number: "650-555-0156" },
      { name: "Central City Emergency", number: "213-555-0189" },
    ],
  },
  {
    category: "Health Services",
    numbers: [
      { name: "Poison Control", number: "1-800-222-1222" },
      { name: "Mental Health Helpline", number: "1-800-273-8255" },
      { name: "Child Helpline", number: "1098" },
      { name: "Women Helpline", number: "1091" },
    ],
  },
]

// Mock data for hospitals and relief centers
const facilities = [
  {
    id: 1,
    name: "Riverside General Hospital",
    type: "Hospital",
    address: "123 Medical Center Dr, Riverside",
    phone: "951-555-0123",
    distance: "2.3 miles",
    status: "Open 24/7",
    services: ["Emergency Room", "Trauma Center", "Burn Unit"],
  },
  {
    id: 2,
    name: "Mountain View Medical Center",
    type: "Hospital",
    address: "456 Health Parkway, Mountain View",
    phone: "650-555-0156",
    distance: "5.1 miles",
    status: "Open 24/7",
    services: ["Emergency Room", "Surgery", "Pediatrics"],
  },
  {
    id: 3,
    name: "Central City Community Shelter",
    type: "Relief Center",
    address: "789 Shelter Ave, Central City",
    phone: "213-555-0189",
    distance: "3.7 miles",
    status: "Open",
    services: ["Food", "Shelter", "Medical Aid"],
  },
  {
    id: 4,
    name: "Riverside Relief Center",
    type: "Relief Center",
    address: "321 Support Street, Riverside",
    phone: "951-555-0145",
    distance: "1.8 miles",
    status: "Open",
    services: ["Food", "Water", "Clothing", "Counseling"],
  },
  {
    id: 5,
    name: "Mountain High School Shelter",
    type: "Relief Center",
    address: "555 Education Blvd, Mountain View",
    phone: "650-555-0178",
    distance: "4.5 miles",
    status: "Open",
    services: ["Shelter", "Food", "Child Care"],
  },
]

// Mock data for emergency kits
const emergencyKits = [
  {
    id: "basic",
    title: "Basic Emergency Kit",
    description: "Essential items for a 72-hour emergency period",
    items: [
      "Water (one gallon per person per day for at least three days)",
      "Non-perishable food (at least a three-day supply)",
      "Battery-powered or hand crank radio",
      "Flashlight with extra batteries",
      "First aid kit",
      "Whistle to signal for help",
      "Dust mask, plastic sheeting, and duct tape",
      "Moist towelettes, garbage bags, and plastic ties",
      "Wrench or pliers to turn off utilities",
      "Manual can opener",
      "Local maps",
      "Cell phone with chargers and backup battery",
    ],
    image: "https://cdn.pixabay.com/photo/2012/10/22/21/48/first-aid-kit-62643_1280.jpg",
  },
  {
    id: "advanced",
    title: "Advanced Emergency Kit",
    description: "Comprehensive kit for extended emergencies",
    items: [
      "All items in the Basic Emergency Kit",
      "Prescription medications and glasses",
      "Infant formula and diapers",
      "Pet food and extra water for your pet",
      "Important family documents in a waterproof container",
      "Cash or traveler's checks and change",
      "Emergency reference materials",
      "Sleeping bag or warm blanket for each person",
      "Complete change of clothing",
      "Fire extinguisher",
      "Matches in a waterproof container",
      "Feminine supplies and personal hygiene items",
      "Mess kits, paper cups, plates, paper towels, and plastic utensils",
      "Paper and pencil",
      "Books, games, puzzles, or other activities for children",
    ],
    image: "https://www.distinctivemedical.com/wp-content/uploads/EB02_006-EB02_007-web-11.jpg",
  },
  {
    id: "car",
    title: "Car Emergency Kit",
    description: "Essential items to keep in your vehicle",
    items: [
      "Food and water",
      "Flashlight with extra batteries",
      "First aid kit",
      "Jumper cables",
      "Flares or reflective triangle",
      "Car cell phone charger",
      "Blanket",
      "Map",
      "Cat litter or sand (for traction)",
      "Shovel",
      "Ice scraper",
      "Warm clothes, gloves, and hat",
      "Tool kit",
      "Tire pressure gauge",
      "Tire inflator and sealant",
    ],
    image: "https://raminternational.ca/cdn/shop/products/FSAUTOEK1_1024x1024.jpg?v=1661282155",
  },
]

// Mock data for evacuation plans
const evacuationPlans = [
  {
    id: "flood",
    title: "Flood Evacuation Plan",
    description: "Guidelines for evacuating during flooding",
    file: "/evacuation-flood.pdf",
  },
  {
    id: "wildfire",
    title: "Wildfire Evacuation Plan",
    description: "Guidelines for evacuating during wildfires",
    file: "/evacuation-wildfire.pdf",
  },
  {
    id: "earthquake",
    title: "Earthquake Evacuation Plan",
    description: "Guidelines for evacuating after an earthquake",
    file: "/evacuation-earthquake.pdf",
  },
  {
    id: "hurricane",
    title: "Hurricane Evacuation Plan",
    description: "Guidelines for evacuating during hurricanes",
    file: "/evacuation-hurricane.pdf",
  },
]

// Mock weather data
const weatherData = {
  current: {
    location: "Central City",
    temperature: "72°F",
    condition: "Partly Cloudy",
    humidity: "45%",
    wind: "8 mph NW",
    updated: "10 minutes ago",
  },
  forecast: [
    {
      day: "Today",
      high: "75°F",
      low: "65°F",
      condition: "Partly Cloudy",
      precipitation: "10%",
    },
    {
      day: "Tomorrow",
      high: "78°F",
      low: "67°F",
      condition: "Sunny",
      precipitation: "0%",
    },
    {
      day: "Wednesday",
      high: "80°F",
      low: "68°F",
      condition: "Sunny",
      precipitation: "0%",
    },
    {
      day: "Thursday",
      high: "82°F",
      low: "70°F",
      condition: "Partly Cloudy",
      precipitation: "20%",
    },
    {
      day: "Friday",
      high: "79°F",
      low: "69°F",
      condition: "Chance of Rain",
      precipitation: "40%",
    },
  ],
  alerts: [
    {
      type: "Flash Flood Watch",
      area: "Riverside County",
      expires: "Tonight at 8:00 PM",
      severity: "Moderate",
    },
  ],
}

export function EmergencyResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState("all")
  const [selectedFacilityType, setSelectedFacilityType] = useState("all")

  // Filter facilities based on search query and selected type
  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch =
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedFacilityType === "all" || facility.type === selectedFacilityType
    return matchesSearch && matchesType
  })

  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Emergency Resources</h1>
          <p className="mt-2 text-muted-foreground">
            Access critical resources, helplines, and information during emergencies
          </p>
        </div>

        <Tabs defaultValue="helplines" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="helplines">Helplines</TabsTrigger>
            <TabsTrigger value="facilities">Hospitals & Relief Centers</TabsTrigger>
            <TabsTrigger value="kits">Emergency Kits</TabsTrigger>
            <TabsTrigger value="evacuation">Evacuation Plans</TabsTrigger>
            {/* <TabsTrigger value="weather">Weather Forecast</TabsTrigger> */}
          </TabsList>

          {/* Helplines Tab */}
          <TabsContent value="helplines" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold">Emergency Helplines</h2>
              {/* <div className="flex gap-2">
                <Select defaultValue="all" onValueChange={setSelectedState}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="national">National</SelectItem>
                    <SelectItem value="riverside">Riverside County</SelectItem>
                    <SelectItem value="mountain">Mountain View</SelectItem>
                    <SelectItem value="central">Central City</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download List
                </Button>
              </div> */}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {helplines.map((category) => (
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-[#0077B6]" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.numbers.map((item) => (
                        <li key={item.name} className="flex items-center justify-between">
                          <span className="text-sm">{item.name}</span>
                          <a
                            href={`tel:${item.number}`}
                            className="flex items-center gap-1 font-medium text-[#0077B6] hover:underline"
                          >
                            {item.number}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="rounded-lg border bg-muted/50 p-4">
              <h3 className="mb-2 font-semibold">Important Note</h3>
              <p className="text-sm text-muted-foreground">
                In case of a life-threatening emergency, always call helplines first. The helplines listed above are for
                specific assistance and information during disasters.
              </p>
            </div>
          </TabsContent>

          {/* Hospitals & Relief Centers Tab */}
          <TabsContent value="facilities" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold">Hospitals & Relief Centers</h2>
              <div className="flex flex-col gap-2 sm:flex-row">
                {/* <Input
                  placeholder="Search by name or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-[250px]"
                /> */}
                <Select defaultValue="all" onValueChange={setSelectedFacilityType}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Facility Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Facilities</SelectItem>
                    <SelectItem value="Hospital">Hospitals</SelectItem>
                    <SelectItem value="Relief Center">Relief Centers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Nearby Facilities</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredFacilities.map((facility) => (
                  <Card key={facility.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge className={facility.type === "Hospital" ? "bg-red-500" : "bg-[#0077B6]"}>
                          {facility.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{facility.distance}</span>
                      </div>
                      <CardTitle className="text-lg">{facility.name}</CardTitle>
                      <CardDescription>{facility.address}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          <span className="text-sm font-medium">{facility.status}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Phone:</span>
                          <a
                            href={`tel:${facility.phone}`}
                            className="text-sm font-medium text-[#0077B6] hover:underline"
                          >
                            {facility.phone}
                          </a>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Services:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {facility.services.map((service) => (
                              <Badge key={service} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href={`https://maps.google.com/?q=${facility.address}`} target="_blank">
                          <MapPin className="mr-2 h-4 w-4" />
                          Get Directions
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Emergency Kits Tab */}
          <TabsContent value="kits" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Emergency Kits Guide</h2>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Complete Guide
              </Button>
            </div>

            <div className="space-y-8">
              {emergencyKits.map((kit) => (
                <Card key={kit.id} className="overflow-hidden">
                  <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                    <div className="relative aspect-square md:aspect-auto">
                      <Image src={kit.image || "/placeholder.svg"} alt={kit.title} fill className="object-cover" />
                    </div>
                    <div className="p-6">
                      <CardTitle className="text-xl">{kit.title}</CardTitle>
                      <CardDescription className="mt-1">{kit.description}</CardDescription>
                      <Separator className="my-4" />
                      <div className="space-y-2">
                        <h4 className="font-medium">Checklist:</h4>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {kit.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="mt-1 h-4 w-4 rounded border border-[#0077B6]" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download Checklist
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
                <CardDescription>Learn more about preparing emergency kits for specific situations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Button variant="outline" className="justify-start" asChild>
                    <Link href="https://ndma.gov.in/Resources/Technical-Documents">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      NDMA Emergency Kit Guide
                    </Link>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <Link href="https://www.redcross.org/get-help/how-to-prepare-for-emergencies.html?srsltid=AfmBOopyfDep9QOB9IDVQBzlZp2BiM9w-SqnDXetszrJr-QLg8NVj2FP">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Red Cross Preparedness Guide
                    </Link>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <Link href="https://www.cdc.gov/emergency/index.html">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      CDC Emergency Preparedness
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Evacuation Plans Tab */}
          <TabsContent value="evacuation" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Evacuation Plans</h2>
              <Button variant="outline">
                <MapPin className="mr-2 h-4 w-4" />
                View Evacuation Routes
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {evacuationPlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href={plan.file} target="_blank">
                        <Download className="mr-2 h-4 w-4" />
                        Download Plan
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Evacuation Guidelines</CardTitle>
                <CardDescription>General guidelines to follow during evacuations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold">Before Evacuation</h3>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                      <li>Keep your emergency kit ready and accessible</li>
                      <li>Know your evacuation routes and meeting points</li>
                      <li>Keep your vehicle fueled and ready</li>
                      <li>Prepare your home by turning off utilities if instructed</li>
                      <li>Secure your property and valuable documents</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">During Evacuation</h3>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                      <li>Follow evacuation orders immediately</li>
                      <li>Take only essential items with you</li>
                      <li>Follow recommended evacuation routes</li>
                      <li>Stay informed through emergency broadcasts</li>
                      <li>If possible, inform friends or family of your evacuation plan</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">After Evacuation</h3>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                      <li>Do not return until authorities say it is safe</li>
                      <li>Be alert for damaged roads, bridges, and buildings</li>
                      <li>Check your home for damage before entering</li>
                      <li>Document any damage for insurance purposes</li>
                      <li>Contact your local emergency management office for assistance</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Weather Forecast Tab */}
          {/* <TabsContent value="weather" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Weather Forecast</h2>
              <div className="flex items-center gap-2">
                <Select defaultValue="central">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="central">Central City</SelectItem>
                    <SelectItem value="riverside">Riverside County</SelectItem>
                    <SelectItem value="mountain">Mountain View</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Current Weather</CardTitle>
                  <CardDescription>
                    {weatherData.current.location} • Updated {weatherData.current.updated}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
                      <Umbrella className="h-12 w-12 text-[#0077B6]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="text-4xl font-bold">{weatherData.current.temperature}</div>
                      <div className="text-lg">{weatherData.current.condition}</div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        Humidity: {weatherData.current.humidity} • Wind: {weatherData.current.wind}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {weatherData.alerts.length > 0 && (
                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      Weather Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {weatherData.alerts.map((alert, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-semibold text-red-600">{alert.type}</h3>
                        <p className="text-sm">
                          <span className="font-medium">Area:</span> {alert.area}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Expires:</span> {alert.expires}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Severity:</span> {alert.severity}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">5-Day Forecast</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {weatherData.forecast.map((day, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2 text-center">
                      <CardTitle className="text-base">{day.day}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                        <Thermometer className="h-6 w-6 text-[#0077B6]" />
                      </div>
                      <div className="text-lg font-bold">{day.high}</div>
                      <div className="text-sm text-muted-foreground">{day.low}</div>
                      <div className="mt-2 text-sm">{day.condition}</div>
                      <div className="text-xs text-muted-foreground">Precipitation: {day.precipitation}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Weather Safety Tips</CardTitle>
                <CardDescription>Stay safe during extreme weather conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Flood Safety</h3>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                      <li>Never walk or drive through flood waters</li>
                      <li>Move to higher ground immediately</li>
                      <li>Stay informed through weather alerts</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Thunderstorm Safety</h3>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                      <li>Seek shelter indoors</li>
                      <li>Stay away from windows and electrical equipment</li>
                      <li>Avoid using plumbing fixtures</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Extreme Heat Safety</h3>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                      <li>Stay hydrated and in cool places</li>
                      <li>Wear lightweight, light-colored clothing</li>
                      <li>Check on vulnerable individuals</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Winter Storm Safety</h3>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                      <li>Stay indoors and keep warm</li>
                      <li>Prepare for power outages</li>
                      <li>Avoid unnecessary travel</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View More Weather Safety Information
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  )
}
