"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Map,
  MessageSquare,
  Settings,
  ShieldAlert,
  User,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data for dashboard stats
const stats = [
  {
    title: "Active Disasters",
    value: "12",
    change: "+2",
    changeType: "increase",
    description: "from last week",
  },
  {
    title: "Affected People",
    value: "24,350",
    change: "+350",
    changeType: "increase",
    description: "from yesterday",
  },
  {
    title: "Active Shelters",
    value: "48",
    change: "+5",
    changeType: "increase",
    description: "from last week",
  },
  {
    title: "Relief Teams",
    value: "86",
    change: "+12",
    changeType: "increase",
    description: "from last month",
  },
]

// Mock data for recent alerts
const recentAlerts = [
  {
    id: 1,
    title: "Flash Flood Warning",
    location: "Riverside County",
    time: "2 hours ago",
    severity: "high",
  },
  {
    id: 2,
    title: "Wildfire Alert",
    location: "Mountain View",
    time: "5 hours ago",
    severity: "medium",
  },
  {
    id: 3,
    title: "Earthquake Advisory",
    location: "Central City",
    time: "1 day ago",
    severity: "low",
  },
]

// Mock data for pending reports
const pendingReports = [
  {
    id: 1,
    title: "Building Collapse",
    location: "Downtown",
    reporter: "Aakash Singh",
    time: "30 minutes ago",
    status: "pending",
  },
  {
    id: 2,
    title: "Road Flooding",
    location: "Highway 101",
    reporter: "Rohini Chatterjee",
    time: "1 hour ago",
    status: "pending",
  },
  {
    id: 3,
    title: "Power Outage",
    location: "North District",
    reporter: "Sayon Roy",
    time: "2 hours ago",
    status: "pending",
  },
]

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <AlertTriangle className="h-6 w-6 text-[#0077B6]" />
              <span className="text-lg font-bold">Admin Panel</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link href="/admin/dashboard">
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/map">
                        <Map className="h-4 w-4" />
                        <span>Interactive Map</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/alerts">
                        <ShieldAlert className="h-4 w-4" />
                        <span>Alert Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/reports">
                        <FileText className="h-4 w-4" />
                        <span>Report Review</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Resources</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/shelters">
                        <Home className="h-4 w-4" />
                        <span>Shelter Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/volunteers">
                        <Users className="h-4 w-4" />
                        <span>Volunteer Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/donations">
                        <BarChart3 className="h-4 w-4" />
                        <span>Donation Tracking</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/settings">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-3 py-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex w-full justify-between p-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0077B6] text-white">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-muted-foreground">Super Admin</p>
                      </div>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF9933] text-xs text-white">
                    3
                  </span>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/">View Public Site</Link>
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="mb-6">
              <Tabs defaultValue="overview" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid gap-6">
              {activeTab === "overview" && (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                      <Card key={stat.title}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <p className="text-xs text-muted-foreground">
                            <span className={stat.changeType === "increase" ? "text-green-500" : "text-red-500"}>
                              {stat.change}
                            </span>{" "}
                            {stat.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>Disaster Activity Map</CardTitle>
                        <CardDescription>Real-time view of active disasters and response efforts</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video rounded-md bg-muted">
                          <div className="flex h-full w-full items-center justify-center">
                            <Map className="h-12 w-12 text-muted-foreground" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Alerts</CardTitle>
                        <CardDescription>Latest emergency alerts issued</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentAlerts.map((alert) => (
                            <div key={alert.id} className="flex items-start gap-4">
                              <div
                                className={`mt-0.5 h-2 w-2 rounded-full ${
                                  alert.severity === "high"
                                    ? "bg-red-500"
                                    : alert.severity === "medium"
                                      ? "bg-[#FF9933]"
                                      : "bg-yellow-500"
                                }`}
                              />
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">{alert.title}</p>
                                <p className="text-xs text-muted-foreground">{alert.location}</p>
                                <p className="text-xs text-muted-foreground">{alert.time}</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Pending Reports</CardTitle>
                        <CardDescription>User-submitted reports awaiting review</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {pendingReports.map((report) => (
                            <div key={report.id} className="flex items-start gap-4">
                              <div className="mt-0.5 h-2 w-2 rounded-full bg-[#0077B6]" />
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">{report.title}</p>
                                <p className="text-xs text-muted-foreground">{report.location}</p>
                                <p className="text-xs text-muted-foreground">
                                  Reported by {report.reporter} • {report.time}
                                </p>
                              </div>
                              <Button variant="ghost" size="sm">
                                Review
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Upcoming Activities</CardTitle>
                        <CardDescription>Scheduled events and operations</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                              <Calendar className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium leading-none">Emergency Response Training</p>
                              <p className="text-xs text-muted-foreground">May 3, 2025 • 10:00 AM</p>
                              <p className="text-xs text-muted-foreground">Central Command Center</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                              <MessageSquare className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium leading-none">Coordination Meeting</p>
                              <p className="text-xs text-muted-foreground">May 5, 2025 • 2:00 PM</p>
                              <p className="text-xs text-muted-foreground">Virtual Conference</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                              <Users className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium leading-none">Volunteer Deployment</p>
                              <p className="text-xs text-muted-foreground">May 7, 2025 • 8:00 AM</p>
                              <p className="text-xs text-muted-foreground">Riverside County</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              {activeTab === "alerts" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Alert Management</CardTitle>
                      <CardDescription>Create, edit, and send alerts to affected areas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
                        <div className="text-center">
                          <ShieldAlert className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">Alert Management Interface</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            This section would contain the full alert management interface
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "reports" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Report Review System</CardTitle>
                      <CardDescription>Review and verify user-submitted disaster reports</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
                        <div className="text-center">
                          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">Report Review Interface</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            This section would contain the full report review interface
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "resources" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Resource Management</CardTitle>
                      <CardDescription>Manage shelters, supplies, and volunteer resources</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
                        <div className="text-center">
                          <Home className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">Resource Management Interface</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            This section would contain the full resource management interface
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
