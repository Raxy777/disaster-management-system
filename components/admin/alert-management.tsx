"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle, ChevronDown, Clock, Edit, Eye, Filter, MapPin, Plus, Search, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data for alerts
const alertsData = [
  {
    id: 1,
    title: "Flash Flood Warning",
    type: "Flood",
    severity: "high",
    status: "active",
    location: "Riverside County",
    affectedAreas: ["Downtown Riverside", "Riverside Shores", "Eastside"],
    message:
      "Flash flood warning in effect until 8PM. Evacuate low-lying areas immediately. Seek higher ground. Do not attempt to cross flooded roads.",
    createdAt: "2025-05-01T14:30:00Z",
    expiresAt: "2025-05-01T20:00:00Z",
    sentTo: ["SMS", "Email", "App", "Emergency Broadcast System"],
    createdBy: "Rohini Chatterjee",
  },
  {
    id: 2,
    title: "Wildfire Alert",
    type: "Wildfire",
    severity: "medium",
    status: "active",
    location: "Mountain View",
    affectedAreas: ["North Ridge", "Pine Valley", "Mountain Crest"],
    message:
      "Wildfire spreading north. Prepare for possible evacuation. Gather essential items and stay tuned for updates.",
    createdAt: "2025-04-30T10:15:00Z",
    expiresAt: "2025-05-02T10:15:00Z",
    sentTo: ["SMS", "Email", "App"],
    createdBy: "Michael Rodriguez",
  },
  {
    id: 3,
    title: "Earthquake Advisory",
    type: "Earthquake",
    severity: "low",
    status: "active",
    location: "Central City",
    affectedAreas: ["Downtown", "Westside", "Northern District"],
    message:
      "5.2 magnitude earthquake detected. Check structures for damage. Be prepared for aftershocks. Follow safety protocols.",
    createdAt: "2025-04-29T08:45:00Z",
    expiresAt: "2025-05-01T08:45:00Z",
    sentTo: ["SMS", "Email", "App"],
    createdBy: "Pradip Debnath",
  },
  {
    id: 4,
    title: "Severe Thunderstorm Warning",
    type: "Storm",
    severity: "medium",
    status: "scheduled",
    location: "Eastern County",
    affectedAreas: ["Eastside", "Rural Areas", "Highway 101"],
    message:
      "Severe thunderstorm expected tonight. Potential for heavy rain, lightning, and strong winds. Secure loose objects and stay indoors.",
    createdAt: "2025-04-30T16:20:00Z",
    expiresAt: "2025-05-01T23:59:00Z",
    sentTo: ["SMS", "Email", "App"],
    createdBy: "Ankan Basu",
  },
  {
    id: 5,
    title: "Heat Wave Advisory",
    type: "Weather",
    severity: "medium",
    status: "draft",
    location: "Countywide",
    affectedAreas: ["All Districts"],
    message:
      "Heat wave expected over the next 3 days with temperatures exceeding 100°F. Stay hydrated, limit outdoor activities, and check on vulnerable individuals.",
    createdAt: "2025-04-30T09:10:00Z",
    expiresAt: "2025-05-03T20:00:00Z",
    sentTo: [],
    createdBy: "Rohini Chatterjee",
  },
  {
    id: 6,
    title: "Tsunami Warning - EXPIRED",
    type: "Tsunami",
    severity: "high",
    status: "expired",
    location: "Coastal Areas",
    affectedAreas: ["Beachfront", "Harbor", "Coastal Communities"],
    message:
      "Tsunami warning following offshore earthquake. Move to higher ground immediately. Follow evacuation routes.",
    createdAt: "2025-04-15T07:30:00Z",
    expiresAt: "2025-04-15T19:30:00Z",
    sentTo: ["SMS", "Email", "App", "Emergency Broadcast System"],
    createdBy: "Michael Rodriguez",
  },
]

// Alert types for dropdown
const alertTypes = [
  { value: "Flood", label: "Flood" },
  { value: "Wildfire", label: "Wildfire" },
  { value: "Earthquake", label: "Earthquake" },
  { value: "Storm", label: "Storm" },
  { value: "Tsunami", label: "Tsunami" },
  { value: "Weather", label: "Weather" },
  { value: "Other", label: "Other" },
]

export function AlertManagement() {
  const { toast } = useToast()
  const [alerts, setAlerts] = useState(alertsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newAlert, setNewAlert] = useState({
    title: "",
    type: "",
    severity: "medium",
    location: "",
    affectedAreas: "",
    message: "",
    expiresAt: "",
  })

  // Filter alerts based on search query and filters
  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || alert.status === statusFilter
    const matchesType = typeFilter === "all" || alert.type === typeFilter
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter

    return matchesSearch && matchesStatus && matchesType && matchesSeverity
  })

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault()

    const newAlertObj = {
      id: alerts.length + 1,
      title: newAlert.title,
      type: newAlert.type,
      severity: newAlert.severity,
      status: "draft",
      location: newAlert.location,
      affectedAreas: newAlert.affectedAreas.split(",").map((area) => area.trim()),
      message: newAlert.message,
      createdAt: new Date().toISOString(),
      expiresAt: newAlert.expiresAt,
      sentTo: [],
      createdBy: "Admin User",
    }

    setAlerts([newAlertObj, ...alerts])
    setIsCreateDialogOpen(false)
    setNewAlert({
      title: "",
      type: "",
      severity: "medium",
      location: "",
      affectedAreas: "",
      message: "",
      expiresAt: "",
    })

    toast({
      title: "Alert created",
      description: "The alert has been created as a draft.",
    })
  }

  const handleDeleteAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))

    toast({
      title: "Alert deleted",
      description: "The alert has been permanently deleted.",
    })
  }

  const handleActivateAlert = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, status: "active" } : alert)))

    toast({
      title: "Alert activated",
      description: "The alert has been activated and notifications are being sent.",
      variant: "default",
    })
  }

  const handleExpireAlert = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, status: "expired" } : alert)))

    toast({
      title: "Alert expired",
      description: "The alert has been marked as expired.",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Alert Management</h1>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#0077B6] hover:bg-[#0077B6]/90">
                <Plus className="mr-2 h-4 w-4" />
                Create New Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Alert</DialogTitle>
                <DialogDescription>Create a new emergency alert to notify affected populations.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateAlert}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Alert Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter alert title"
                        value={newAlert.title}
                        onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Alert Type</Label>
                      <Select
                        value={newAlert.type}
                        onValueChange={(value) => setNewAlert({ ...newAlert, type: value })}
                        required
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {alertTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Severity Level</Label>
                    <RadioGroup
                      defaultValue={newAlert.severity}
                      className="flex space-x-4"
                      onValueChange={(value) => setNewAlert({ ...newAlert, severity: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="severity-low" />
                        <Label htmlFor="severity-low">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="severity-medium" />
                        <Label htmlFor="severity-medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="severity-high" />
                        <Label htmlFor="severity-high">High</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Enter affected location"
                        value={newAlert.location}
                        onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expires">Expiration Date/Time</Label>
                      <Input
                        id="expires"
                        type="datetime-local"
                        value={newAlert.expiresAt}
                        onChange={(e) => setNewAlert({ ...newAlert, expiresAt: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="areas">Affected Areas</Label>
                    <Input
                      id="areas"
                      placeholder="Enter affected areas (comma separated)"
                      value={newAlert.affectedAreas}
                      onChange={(e) => setNewAlert({ ...newAlert, affectedAreas: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Alert Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Enter alert message"
                      className="min-h-[100px]"
                      value={newAlert.message}
                      onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#0077B6] hover:bg-[#0077B6]/90">
                    Create Alert
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select defaultValue="all" onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all" onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {alertTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="all" onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[130px]">
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

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Alerts</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
                <Card key={alert.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            alert.severity === "high"
                              ? "bg-red-500"
                              : alert.severity === "medium"
                                ? "bg-amber-500"
                                : "bg-green-500"
                          }
                        >
                          {alert.severity} severity
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            alert.status === "active"
                              ? "border-green-500 text-green-500"
                              : alert.status === "draft"
                                ? "border-gray-500 text-gray-500"
                                : alert.status === "scheduled"
                                  ? "border-blue-500 text-blue-500"
                                  : "border-red-500 text-red-500"
                          }
                        >
                          {alert.status}
                        </Badge>
                        <Badge variant="outline">{alert.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/alerts/${alert.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {alert.status === "draft" && (
                              <DropdownMenuItem onClick={() => handleActivateAlert(alert.id)}>
                                Activate Alert
                              </DropdownMenuItem>
                            )}
                            {alert.status === "active" && (
                              <DropdownMenuItem onClick={() => handleExpireAlert(alert.id)}>
                                Mark as Expired
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteAlert(alert.id)}>
                              Delete Alert
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {alert.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <div className="mt-4 flex flex-wrap gap-1">
                      {alert.affectedAreas.map((area, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-3 text-xs text-muted-foreground">
                    <div className="flex w-full flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>Created by {alert.createdBy}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Created: {formatDate(alert.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Expires: {formatDate(alert.expiresAt)}</span>
                        </div>
                      </div>
                      {alert.sentTo.length > 0 && <div>Sent via: {alert.sentTo.join(", ")}</div>}
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <AlertTriangle className="mx-auto h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No alerts found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    No alerts match your current search criteria.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  )
}
