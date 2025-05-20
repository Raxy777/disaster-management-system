import { AdminLayout } from "@/components/admin/admin-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, BarChart3, Bell, Download, FileText, MapPin, RefreshCw, User, Users } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import type React from "react"

export const metadata: Metadata = {
  title: "Admin Dashboard | Disaster Management",
  description: "Administrative dashboard for disaster management system",
}

// Metric Card Component
const MetricCard = ({
  title,
  value,
  change,
  icon,
  changeType = "positive",
}: {
  title: string
  value: string
  change?: string
  icon: React.ReactNode
  changeType?: "positive" | "negative" | "neutral"
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
          {change && (
            <Badge
              variant="outline"
              className={`
                ${changeType === "positive" ? "bg-green-50 text-green-700 border-green-200" : ""}
                ${changeType === "negative" ? "bg-red-50 text-red-700 border-red-200" : ""}
                ${changeType === "neutral" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
              `}
            >
              {change}
            </Badge>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboardPage() {
  // Mock data for admin dashboard
  const recentAlerts = [
    { id: 1, title: "Flash Flood Warning", location: "Eastern District", severity: "High", time: "2 hours ago" },
    { id: 2, title: "Evacuation Order", location: "Coastal Areas", severity: "Critical", time: "5 hours ago" },
    { id: 3, title: "Road Closure", location: "Highway 101", severity: "Medium", time: "Yesterday" },
  ]

  const pendingReports = [
    {
      id: 1,
      title: "Building Damage Report",
      location: "Downtown Area",
      status: "Pending Review",
      time: "3 hours ago",
    },
    {
      id: 2,
      title: "Medical Supply Shortage",
      location: "Northern Relief Camp",
      status: "Pending Review",
      time: "5 hours ago",
    },
    { id: 3, title: "Volunteer Request", location: "Southern District", status: "Pending Review", time: "Yesterday" },
  ]

  const resourceStatus = [
    { id: 1, name: "Food Supplies", available: 65, allocated: 40, required: 100 },
    { id: 2, name: "Medical Kits", available: 120, allocated: 85, required: 150 },
    { id: 3, name: "Shelter Capacity", available: 450, allocated: 380, required: 500 },
    { id: 4, name: "Rescue Teams", available: 12, allocated: 10, required: 15 },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Alert Created",
      user: "Aakash Singh",
      time: "10 minutes ago",
      details: "Flash Flood Warning for Eastern District",
    },
    {
      id: 2,
      action: "Resource Allocated",
      user: "Maria Garcia",
      time: "1 hour ago",
      details: "20 Medical Kits to Northern Relief Camp",
    },
    {
      id: 3,
      action: "Report Approved",
      user: "David Chen",
      time: "3 hours ago",
      details: "Road Damage Report in Western District",
    },
    {
      id: 4,
      action: "Volunteer Assigned",
      user: "Rohini Chatterjee",
      time: "Yesterday",
      details: "5 volunteers to Evacuation Center",
    },
    {
      id: 5,
      action: "System Update",
      user: "System",
      time: "2 days ago",
      details: "Platform maintenance and security updates",
    },
  ]

  return (
    <AdminLayout title="Dashboard">
      <div>
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold">Welcome back, Admin</h2>
              <p className="text-muted-foreground">
                Here's what's happening with your disaster response operations today.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                Refresh Data
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Active Disasters"
              value="3"
              change="+1 from last week"
              icon={<AlertTriangle className="text-red-500" />}
              changeType="negative"
            />

            <MetricCard
              title="Affected Population"
              value="12,450"
              change="+2,300 from last week"
              icon={<Users className="text-blue-500" />}
              changeType="neutral"
            />

            <MetricCard
              title="Active Volunteers"
              value="245"
              change="+28 from last week"
              icon={<Users className="text-green-500" />}
              changeType="positive"
            />

            <MetricCard title="Relief Centers" value="8" icon={<MapPin className="text-purple-500" />} />
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Disaster Overview</CardTitle>
                    <CardDescription>Current active disasters and their status</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <RefreshCw size={14} />
                      Refresh
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download size={14} />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-red-100 p-2 rounded-full">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Flash Flood</h3>
                            <p className="text-sm text-muted-foreground">Eastern District</p>
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-700 border-red-200">Critical</Badge>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Response Progress</span>
                          <span>45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">Manage Response</Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-amber-100 p-2 rounded-full">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Wildfire</h3>
                            <p className="text-sm text-muted-foreground">Northern Forest Area</p>
                          </div>
                        </div>
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200">High</Badge>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Response Progress</span>
                          <span>70%</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">Manage Response</Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <AlertTriangle className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Coastal Storm</h3>
                            <p className="text-sm text-muted-foreground">Southern Coastal Region</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">Medium</Badge>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Response Progress</span>
                          <span>30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">Manage Response</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" size="lg">
                    <Bell className="mr-2 h-4 w-4" />
                    Create New Alert
                  </Button>
                  <Button className="w-full justify-start" variant="outline" size="lg">
                    <FileText className="mr-2 h-4 w-4" />
                    Review Pending Reports
                  </Button>
                  <Button className="w-full justify-start" variant="outline" size="lg">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Volunteers
                  </Button>
                  <Button className="w-full justify-start" variant="outline" size="lg">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Analytics Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline" size="lg">
                    <MapPin className="mr-2 h-4 w-4" />
                    Update Resource Map
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Latest emergency alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle
                            className={`h-5 w-5 ${
                              alert.severity === "Critical"
                                ? "text-red-500"
                                : alert.severity === "High"
                                  ? "text-orange-500"
                                  : "text-yellow-500"
                            }`}
                          />
                          <h3 className="font-medium">{alert.title}</h3>
                        </div>
                        <Badge
                          className={`${
                            alert.severity === "Critical"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : alert.severity === "High"
                                ? "bg-orange-100 text-orange-700 border-orange-200"
                                : "bg-yellow-100 text-yellow-700 border-yellow-200"
                          }`}
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          {alert.location}
                        </div>
                        <div>{alert.time}</div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center mt-6">
                    <Button>View All Alerts</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Pending Reports</CardTitle>
                <CardDescription>Reports awaiting review and action</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingReports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <h3 className="font-medium">{report.title}</h3>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">{report.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          {report.location}
                        </div>
                        <div>{report.time}</div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Reject
                        </Button>
                        <Button variant="outline" size="sm">
                          Approve
                        </Button>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center mt-6">
                    <Button>View All Reports</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Resource Status</CardTitle>
                <CardDescription>Current inventory and allocation of resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {resourceStatus.map((resource) => (
                    <div key={resource.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{resource.name}</h3>
                        <div className="text-sm">
                          <span className="font-medium">{resource.available}</span>
                          <span className="text-muted-foreground"> / {resource.required} available</span>
                        </div>
                      </div>
                      <Progress value={(resource.available / resource.required) * 100} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{resource.allocated} allocated</span>
                        <span>
                          {resource.available < resource.required * 0.3
                            ? "Low stock"
                            : resource.available < resource.required * 0.7
                              ? "Adequate"
                              : "Well stocked"}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline">Request Resources</Button>
                    <Button>Manage Inventory</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="bg-gray-100 p-2 rounded-full">
                        {activity.action.includes("Alert") ? (
                          <Bell className="h-5 w-5 text-orange-500" />
                        ) : activity.action.includes("Resource") ? (
                          <MapPin className="h-5 w-5 text-blue-500" />
                        ) : activity.action.includes("Report") ? (
                          <FileText className="h-5 w-5 text-green-500" />
                        ) : activity.action.includes("Volunteer") ? (
                          <Users className="h-5 w-5 text-purple-500" />
                        ) : (
                          <BarChart3 className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium">{activity.action}</h3>
                          <span className="text-sm text-muted-foreground">{activity.time}</span>
                        </div>
                        <p className="text-sm">{activity.details}</p>
                        <p className="text-xs text-muted-foreground mt-1">By: {activity.user}</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center mt-6">
                    <Button>View All Activity</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Link href="/admin/profile">
            <Button variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Manage Profile
            </Button>
          </Link>
        </div>
      </div>
    </AdminLayout>
  )
}
