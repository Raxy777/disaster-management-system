"use client"

import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "@/components/ui/chart"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { addDays, format } from "date-fns"
import { Calendar, Download, RefreshCw } from "lucide-react"
import { useState } from "react"
import type { DateRange } from "react-day-picker"

// Mock data for analytics
const disasterData = [
  { name: "Floods", value: 35, color: "#0088FE" },
  { name: "Wildfires", value: 25, color: "#FF8042" },
  { name: "Earthquakes", value: 15, color: "#FFBB28" },
  { name: "Storms", value: 20, color: "#00C49F" },
  { name: "Other", value: 5, color: "#FF8042" },
]

const responseTimeData = [
  { name: "Jan", avg: 45 },
  { name: "Feb", avg: 42 },
  { name: "Mar", avg: 38 },
  { name: "Apr", avg: 35 },
  { name: "May", avg: 30 },
]

const resourceAllocationData = [
  { name: "Food", allocated: 1200, used: 1000 },
  { name: "Water", allocated: 2000, used: 1800 },
  { name: "Medical", allocated: 800, used: 600 },
  { name: "Shelter", allocated: 500, used: 450 },
  { name: "Equipment", allocated: 300, used: 250 },
]

const volunteerActivityData = [
  { name: "Week 1", active: 120, new: 20 },
  { name: "Week 2", active: 132, new: 15 },
  { name: "Week 3", active: 145, new: 18 },
  { name: "Week 4", active: 160, new: 25 },
  { name: "Week 5", active: 178, new: 22 },
  { name: "Week 6", active: 195, new: 30 },
]

const affectedPopulationData = [
  { name: "Jan", population: 5000 },
  { name: "Feb", population: 7500 },
  { name: "Mar", population: 12000 },
  { name: "Apr", population: 9000 },
  { name: "May", population: 6000 },
]

export function AnalyticsDashboard() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Analyze disaster response data and performance metrics</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          <TabsTrigger value="response">Response</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Disaster Types</CardTitle>
                <CardDescription>Distribution of disaster types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={disasterData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {disasterData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Response Time</CardTitle>
                <CardDescription>Average time to respond to incidents (minutes)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="avg" stroke="#0077B6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Affected Population</CardTitle>
                <CardDescription>Number of people affected by disasters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={affectedPopulationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="population" stroke="#FF9933" fill="#FF9933" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
                <CardDescription>Allocated vs. Used Resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resourceAllocationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="allocated" fill="#0077B6" name="Allocated" />
                      <Bar dataKey="used" fill="#FF9933" name="Used" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Volunteer Activity</CardTitle>
                <CardDescription>Active and new volunteers over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={volunteerActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="active"
                        stroke="#0077B6"
                        strokeWidth={2}
                        name="Active Volunteers"
                      />
                      <Line type="monotone" dataKey="new" stroke="#FF9933" strokeWidth={2} name="New Volunteers" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Resource Analytics</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Detailed analytics about resource allocation and usage.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="volunteers">
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Volunteer Analytics</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Detailed analytics about volunteer activities and performance.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="response">
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Response Analytics</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Detailed analytics about disaster response times and effectiveness.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
