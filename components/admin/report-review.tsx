"use client"

import { useState } from "react"
import Image from "next/image"
import { CheckCircle, Download, Eye, Filter, MapPin, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { useToast } from "@/hooks/use-toast"

// Mock data for reports
const reportsData = [
  {
    id: 1,
    title: "Building Collapse",
    type: "Infrastructure",
    location: "Downtown, Central City",
    coordinates: "34.0522° N, 118.2437° W",
    description:
      "Partial collapse of a 3-story commercial building. No injuries reported but surrounding area may be unsafe. Building appears unstable with visible cracks in the remaining structure.",
    severity: "high",
    status: "pending",
    reporter: {
      name: "John Smith",
      phone: "555-123-4567",
      email: "john.smith@example.com",
    },
    submittedAt: "2025-05-01T10:30:00Z",
    images: ["/placeholder.svg?height=300&width=400"],
    peopleInDanger: "no",
    verified: false,
  },
  {
    id: 2,
    title: "Road Flooding",
    type: "Flood",
    location: "Highway 101, Riverside County",
    coordinates: "33.9533° N, 117.3962° W",
    description:
      "Severe flooding on Highway 101 between exits 25 and 27. Water approximately 2 feet deep and rising. Multiple vehicles stranded. Immediate road closure recommended.",
    severity: "high",
    status: "in-review",
    reporter: {
      name: "Sarah Johnson",
      phone: "555-987-6543",
      email: "sarah.j@example.com",
    },
    submittedAt: "2025-05-01T09:15:00Z",
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    peopleInDanger: "yes",
    verified: false,
  },
  {
    id: 3,
    title: "Power Outage",
    type: "Infrastructure",
    location: "North District, Central City",
    coordinates: "34.0689° N, 118.4452° W",
    description:
      "Complete power outage affecting approximately 15 blocks in the North District. Several downed power lines observed near the intersection of Maple and 5th Street.",
    severity: "medium",
    status: "verified",
    reporter: {
      name: "Michael Brown",
      phone: "555-456-7890",
      email: "mbrown@example.com",
    },
    submittedAt: "2025-05-01T08:45:00Z",
    images: ["/placeholder.svg?height=300&width=400"],
    peopleInDanger: "unknown",
    verified: true,
    verifiedBy: "Emily Chen",
    verifiedAt: "2025-05-01T10:20:00Z",
  },
  {
    id: 4,
    title: "Wildfire Spotted",
    type: "Wildfire",
    location: "Mountain Ridge, Mountain View",
    coordinates: "37.3861° N, 122.0839° W",
    description:
      "Small wildfire spotted on the eastern slope of Mountain Ridge. Estimated 2-3 acres currently burning. Smoke visible from Highway 9. No structures immediately threatened.",
    severity: "medium",
    status: "verified",
    reporter: {
      name: "David Wilson",
      phone: "555-789-0123",
      email: "dwilson@example.com",
    },
    submittedAt: "2025-04-30T16:20:00Z",
    images: ["/placeholder.svg?height=300&width=400"],
    peopleInDanger: "no",
    verified: true,
    verifiedBy: "Michael Rodriguez",
    verifiedAt: "2025-04-30T17:45:00Z",
  },
  {
    id: 5,
    title: "Gas Leak",
    type: "Hazardous Material",
    location: "Westside Apartments, Central City",
    coordinates: "34.0522° N, 118.4452° W",
    description:
      "Strong smell of gas reported in and around the Westside Apartment complex. Multiple residents evacuated as a precaution. Source of leak not yet identified.",
    severity: "high",
    status: "in-review",
    reporter: {
      name: "Jennifer Lee",
      phone: "555-234-5678",
      email: "jlee@example.com",
    },
    submittedAt: "2025-04-30T14:10:00Z",
    images: [],
    peopleInDanger: "yes",
    verified: false,
  },
  {
    id: 6,
    title: "Landslide Risk",
    type: "Geological",
    location: "Canyon Road, Mountain View",
    coordinates: "37.4133° N, 122.1162° W",
    description:
      "Signs of potential landslide observed on Canyon Road after heavy rainfall. Cracks in the hillside and minor debris on the road. Area should be assessed for safety.",
    severity: "medium",
    status: "resolved",
    reporter: {
      name: "Robert Taylor",
      phone: "555-345-6789",
      email: "rtaylor@example.com",
    },
    submittedAt: "2025-04-29T11:30:00Z",
    images: ["/placeholder.svg?height=300&width=400"],
    peopleInDanger: "no",
    verified: true,
    verifiedBy: "Sarah Johnson",
    verifiedAt: "2025-04-29T13:15:00Z",
    resolution: {
      action: "Area secured and monitored",
      notes:
        "Geologist team dispatched and confirmed low immediate risk. Warning signs placed and monitoring equipment installed.",
      resolvedBy: "Emergency Response Team",
      resolvedAt: "2025-04-29T16:45:00Z",
    },
  },
]

// Report types for dropdown
const reportTypes = [
  { value: "Flood", label: "Flood" },
  { value: "Wildfire", label: "Wildfire" },
  { value: "Earthquake", label: "Earthquake" },
  { value: "Infrastructure", label: "Infrastructure" },
  { value: "Hazardous Material", label: "Hazardous Material" },
  { value: "Geological", label: "Geological" },
  { value: "Other", label: "Other" },
]

export function ReportReview() {
  const { toast } = useToast()
  const [reports, setReports] = useState(reportsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Filter reports based on search query and filters
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesType = typeFilter === "all" || report.type === typeFilter
    const matchesSeverity = severityFilter === "all" || report.severity === severityFilter

    return matchesSearch && matchesStatus && matchesType && matchesSeverity
  })

  const handleVerifyReport = (id: number) => {
    setReports(
      reports.map((report) =>
        report.id === id
          ? {
              ...report,
              status: "verified",
              verified: true,
              verifiedBy: "Admin User",
              verifiedAt: new Date().toISOString(),
            }
          : report,
      ),
    )

    toast({
      title: "Report verified",
      description: "The report has been marked as verified.",
    })
  }

  const handleResolveReport = (id: number) => {
    setReports(
      reports.map((report) =>
        report.id === id
          ? {
              ...report,
              status: "resolved",
              resolution: {
                action: "Issue addressed",
                notes: "Report reviewed and appropriate action taken.",
                resolvedBy: "Admin User",
                resolvedAt: new Date().toISOString(),
              },
            }
          : report,
      ),
    )

    toast({
      title: "Report resolved",
      description: "The report has been marked as resolved.",
    })
  }

  const handleDeleteReport = (id: number) => {
    setReports(reports.filter((report) => report.id !== id))

    toast({
      title: "Report deleted",
      description: "The report has been permanently deleted.",
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
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex flex-1 flex-col">
          <AdminHeader title="Report Review" />

          <main className="flex-1 overflow-auto p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold">Report Review</h1>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Reports
              </Button>
            </div>

            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all" onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {reportTypes.map((type) => (
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
                <TabsTrigger value="all">All Reports</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="in-review">In Review</TabsTrigger>
                <TabsTrigger value="verified">Verified</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>

              <div className="space-y-4">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <Card key={report.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                report.severity === "high"
                                  ? "bg-red-500"
                                  : report.severity === "medium"
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                              }
                            >
                              {report.severity} severity
                            </Badge>
                            <Badge
                              variant="outline"
                              className={
                                report.status === "pending"
                                  ? "border-amber-500 text-amber-500"
                                  : report.status === "in-review"
                                    ? "border-blue-500 text-blue-500"
                                    : report.status === "verified"
                                      ? "border-green-500 text-green-500"
                                      : "border-gray-500 text-gray-500"
                              }
                            >
                              {report.status}
                            </Badge>
                            <Badge variant="outline">{report.type}</Badge>
                            {report.peopleInDanger === "yes" && <Badge className="bg-red-500">People in danger</Badge>}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedReport(report)
                                setIsViewDialogOpen(true)
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {report.status === "pending" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-500"
                                onClick={() => handleVerifyReport(report.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            {report.status === "verified" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-blue-500"
                                onClick={() => handleResolveReport(report.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500"
                              onClick={() => handleDeleteReport(report.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {report.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        {report.images.length > 0 && (
                          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                            {report.images.map((image, index) => (
                              <div key={index} className="relative h-20" />
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent>
                      <p>No reports found.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </Tabs>

            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Report Details</DialogTitle>
                  <DialogDescription>View all the information about this report.</DialogDescription>
                </DialogHeader>

                {selectedReport && (
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="title" className="text-right text-sm font-medium leading-none text-right">
                        Title
                      </label>
                      <Input type="text" id="title" value={selectedReport.title} className="col-span-3" disabled />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="type" className="text-right text-sm font-medium leading-none text-right">
                        Type
                      </label>
                      <Input type="text" id="type" value={selectedReport.type} className="col-span-3" disabled />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="location" className="text-right text-sm font-medium leading-none text-right">
                        Location
                      </label>
                      <Input
                        type="text"
                        id="location"
                        value={selectedReport.location}
                        className="col-span-3"
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="coordinates" className="text-right text-sm font-medium leading-none text-right">
                        Coordinates
                      </label>
                      <Input
                        type="text"
                        id="coordinates"
                        value={selectedReport.coordinates}
                        className="col-span-3"
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="description" className="text-right text-sm font-medium leading-none text-right">
                        Description
                      </label>
                      <Input
                        type="text"
                        id="description"
                        value={selectedReport.description}
                        className="col-span-3"
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="severity" className="text-right text-sm font-medium leading-none text-right">
                        Severity
                      </label>
                      <Input
                        type="text"
                        id="severity"
                        value={selectedReport.severity}
                        className="col-span-3"
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="status" className="text-right text-sm font-medium leading-none text-right">
                        Status
                      </label>
                      <Input type="text" id="status" value={selectedReport.status} className="col-span-3" disabled />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="reporterName" className="text-right text-sm font-medium leading-none text-right">
                        Reporter Name
                      </label>
                      <Input
                        type="text"
                        id="reporterName"
                        value={selectedReport.reporter.name}
                        className="col-span-3"
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="reporterPhone" className="text-right text-sm font-medium leading-none text-right">
                        Reporter Phone
                      </label>
                      <Input
                        type="text"
                        id="reporterPhone"
                        value={selectedReport.reporter.phone}
                        className="col-span-3"
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="reporterEmail" className="text-right text-sm font-medium leading-none text-right">
                        Reporter Email
                      </label>
                      <Input
                        type="text"
                        id="reporterEmail"
                        value={selectedReport.reporter.email}
                        className="col-span-3"
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="submittedAt" className="text-right text-sm font-medium leading-none text-right">
                        Submitted At
                      </label>
                      <Input
                        type="text"
                        id="submittedAt"
                        value={formatDate(selectedReport.submittedAt)}
                        className="col-span-3"
                        disabled
                      />
                    </div>
                    {selectedReport.verified && (
                      <>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label
                            htmlFor="verifiedBy"
                            className="text-right text-sm font-medium leading-none text-right"
                          >
                            Verified By
                          </label>
                          <Input
                            type="text"
                            id="verifiedBy"
                            value={selectedReport.verifiedBy}
                            className="col-span-3"
                            disabled
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label
                            htmlFor="verifiedAt"
                            className="text-right text-sm font-medium leading-none text-right"
                          >
                            Verified At
                          </label>
                          <Input
                            type="text"
                            id="verifiedAt"
                            value={formatDate(selectedReport.verifiedAt)}
                            className="col-span-3"
                            disabled
                          />
                        </div>
                      </>
                    )}
                    {selectedReport.resolution && (
                      <>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="action" className="text-right text-sm font-medium leading-none text-right">
                            Resolution Action
                          </label>
                          <Input
                            type="text"
                            id="action"
                            value={selectedReport.resolution.action}
                            className="col-span-3"
                            disabled
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="notes" className="text-right text-sm font-medium leading-none text-right">
                            Resolution Notes
                          </label>
                          <Input
                            type="text"
                            id="notes"
                            value={selectedReport.resolution.notes}
                            className="col-span-3"
                            disabled
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label
                            htmlFor="resolvedBy"
                            className="text-right text-sm font-medium leading-none text-right"
                          >
                            Resolved By
                          </label>
                          <Input
                            type="text"
                            id="resolvedBy"
                            value={selectedReport.resolution.resolvedBy}
                            className="col-span-3"
                            disabled
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label
                            htmlFor="resolvedAt"
                            className="text-right text-sm font-medium leading-none text-right"
                          >
                            Resolved At
                          </label>
                          <Input
                            type="text"
                            id="resolvedAt"
                            value={formatDate(selectedReport.resolution.resolvedAt)}
                            className="col-span-3"
                            disabled
                          />
                        </div>
                      </>
                    )}
                    {selectedReport.images.length > 0 && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium leading-none text-right">Images</label>
                        <div className="col-span-3 flex gap-2 overflow-x-auto pb-2">
                          {selectedReport.images.map((image, index) => (
                            <div key={index} className="relative h-20">
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`Report Image ${index + 1}`}
                                width={160}
                                height={120}
                                className="rounded-md object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <DialogFooter>
                  <Button type="button" variant="secondary" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
