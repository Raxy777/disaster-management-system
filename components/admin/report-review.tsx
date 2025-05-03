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
import { useToast } from "@/hooks/use-toast"
import { AdminLayout } from "./admin-layout"

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
    <AdminLayout title="Report Review">
      <div className="container mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Report Review</h2>
              <p className="text-muted-foreground">
                Review and manage disaster reports submitted by users.
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
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
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredReports.map((report) => (
              <Card key={report.id}>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {report.title}
                      {report.verified && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {report.location}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                      onClick={() => {
                        setSelectedReport(report)
                        setIsViewDialogOpen(true)
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {!report.verified && (
                      <Button
                        size="sm"
                        className="flex-1 sm:flex-none"
                        onClick={() => handleVerifyReport(report.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verify
                      </Button>
                    )}
                    {report.status !== "resolved" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none"
                        onClick={() => handleResolveReport(report.id)}
                      >
                        Resolve
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteReport(report.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedReport?.title}</DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {selectedReport?.location}
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Report Details</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Type:</span> {selectedReport?.type}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Severity:</span>{" "}
                      <Badge
                        variant="outline"
                        className={`
                          ${
                            selectedReport?.severity === "high"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : selectedReport?.severity === "medium"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-green-50 text-green-700 border-green-200"
                          }
                        `}
                      >
                        {selectedReport?.severity}
                      </Badge>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Status:</span>{" "}
                      <Badge
                        variant="outline"
                        className={`
                          ${
                            selectedReport?.status === "pending"
                              ? "bg-gray-50 text-gray-700 border-gray-200"
                              : selectedReport?.status === "in-review"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : selectedReport?.status === "verified"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-purple-50 text-purple-700 border-purple-200"
                          }
                        `}
                      >
                        {selectedReport?.status}
                      </Badge>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Submitted:</span>{" "}
                      {new Date(selectedReport?.submittedAt).toLocaleString()}
                    </p>
                    {selectedReport?.verified && (
                      <p>
                        <span className="text-muted-foreground">Verified by:</span>{" "}
                        {selectedReport?.verifiedBy} on{" "}
                        {new Date(selectedReport?.verifiedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Reporter Information</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Name:</span> {selectedReport?.reporter.name}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Phone:</span> {selectedReport?.reporter.phone}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Email:</span> {selectedReport?.reporter.email}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm">{selectedReport?.description}</p>
              </div>

              {selectedReport?.images && selectedReport.images.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Images</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedReport.images.map((image, index) => (
                      <div key={index} className="relative aspect-video">
                        <Image
                          src={image}
                          alt={`Report image ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedReport?.resolution && (
                <div>
                  <h3 className="font-medium mb-2">Resolution</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Action:</span> {selectedReport.resolution.action}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Notes:</span> {selectedReport.resolution.notes}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Resolved by:</span>{" "}
                      {selectedReport.resolution.resolvedBy} on{" "}
                      {new Date(selectedReport.resolution.resolvedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
              {!selectedReport?.verified && (
                <Button onClick={() => handleVerifyReport(selectedReport?.id)}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verify Report
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
