"use client"

import type React from "react"
import * as XLSX from 'xlsx'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  AlertTriangle,
  Calendar,
  Download,
  Filter,
  MapPin,
  MoreHorizontal,
  Phone,
  Search,
  UserPlus,
} from "lucide-react"
import { useEffect, useState } from "react"

interface Volunteer {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  address: string
  city: string
  zip: string
  skills: string[]
  availability: string
  status: string
  assigned_to: string
  assignedTo?: string
  avatar: string
  location?: string
  joinedDate: string
  lastActive: string
}

const skillOptions = [
  "First Aid",
  "Medical",
  "Driving",
  "Heavy Lifting",
  "Construction",
  "Communication",
  "Leadership",
  "Counseling",
  "Translation",
  "Cooking",
  "Search and Rescue",
  "Navigation",
  "Logistics",
  "Administration",
]

export function VolunteerManagement() {
  const { toast } = useToast()
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newVolunteer, setNewVolunteer] = useState<Omit<Volunteer, 'id' | 'joinedDate' | 'lastActive'>>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    skills: [],
    availability: "",
    status: "Active",
    assigned_to: "",
    avatar: "",
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchVolunteers()
  }, [])

  const fetchVolunteers = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/volunteers")
      const data = await res.json()
      setVolunteers(Array.isArray(data) ? data : [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      toast({ title: "Error fetching volunteers", description: errorMessage, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleAddVolunteer = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVolunteer),
      })
      if (res.ok) {
        toast({ title: "Volunteer added", description: "The volunteer has been added to the system." })
        setIsAddDialogOpen(false)
        setNewVolunteer({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          zip: "",
          skills: [],
          availability: "",
          status: "Active",
          assigned_to: "",
          avatar: "",
        })
        fetchVolunteers()
      } else {
        const error = await res.json()
        toast({ title: "Error adding volunteer", description: error.error || "An error occurred.", variant: "destructive" })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      toast({ title: "Error adding volunteer", description: errorMessage, variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteVolunteer = (id: number) => {
    setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id))

    toast({
      title: "Volunteer removed",
      description: "The volunteer has been removed from the system.",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleDownloadExcel = () => {
    if (volunteers.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no volunteers to export.",
        variant: "destructive"
      })
      return
    }

    // Prepare data for Excel export
    const exportData = volunteers.map((volunteer) => ({
      'ID': volunteer.id,
      'First Name': volunteer.first_name,
      'Last Name': volunteer.last_name,
      'Email': volunteer.email,
      'Phone': volunteer.phone,
      'Address': volunteer.address,
      'City': volunteer.city,
      'PIN Code': volunteer.zip,
      'Skills': volunteer.skills.join(', '),
      'Availability': volunteer.availability,
      'Status': volunteer.status,
      'Assigned To': volunteer.assigned_to || volunteer.assignedTo || 'Unassigned',
      'Location': volunteer.location || `${volunteer.city}`,
      'Joined Date': volunteer.joinedDate,
      'Last Active': volunteer.lastActive,
    }))

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(exportData)

    // Set column widths for better readability
    const columnWidths = [
      { wch: 10 }, // ID
      { wch: 15 }, // First Name
      { wch: 15 }, // Last Name
      { wch: 25 }, // Email
      { wch: 15 }, // Phone
      { wch: 30 }, // Address
      { wch: 15 }, // City
      { wch: 12 }, // PIN Code
      { wch: 40 }, // Skills
      { wch: 15 }, // Availability
      { wch: 12 }, // Status
      { wch: 20 }, // Assigned To
      { wch: 20 }, // Location
      { wch: 15 }, // Joined Date
      { wch: 15 }, // Last Active
    ]
    worksheet['!cols'] = columnWidths

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Volunteers')

    // Generate filename with current date
    const currentDate = new Date().toISOString().split('T')[0]
    const filename = `volunteers_data_${currentDate}.xlsx`

    // Download the file
    XLSX.writeFile(workbook, filename)

    toast({
      title: "Export successful",
      description: `Downloaded ${volunteers.length} volunteer records to ${filename}`,
    })
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex-1"></div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#0077B6] hover:bg-[#0077B6]/90">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Volunteer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>Add New Volunteer</DialogTitle>
                <DialogDescription>Add a new volunteer to the disaster response team.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddVolunteer} className="flex flex-col h-full">
                <div className="grid gap-4 py-4 overflow-y-auto flex-1 max-h-[60vh]">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      placeholder="Enter first name"
                      value={newVolunteer.first_name}
                      onChange={(e) => setNewVolunteer({ ...newVolunteer, first_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      placeholder="Enter last name"
                      value={newVolunteer.last_name}
                      onChange={(e) => setNewVolunteer({ ...newVolunteer, last_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={newVolunteer.email}
                      onChange={(e) => setNewVolunteer({ ...newVolunteer, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      value={newVolunteer.phone}
                      onChange={(e) => setNewVolunteer({ ...newVolunteer, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter address"
                      value={newVolunteer.address}
                      onChange={(e) => setNewVolunteer({ ...newVolunteer, address: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Enter city"
                      value={newVolunteer.city}
                      onChange={(e) => setNewVolunteer({ ...newVolunteer, city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">PIN</Label>
                    <Input
                      id="zip"
                      placeholder="Enter pin code"
                      value={newVolunteer.zip}
                      onChange={(e) => setNewVolunteer({ ...newVolunteer, zip: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select
                      value={newVolunteer.availability}
                      onValueChange={(value) => setNewVolunteer({ ...newVolunteer, availability: value })}
                      required
                    >
                      <SelectTrigger id="availability">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Weekdays">Weekdays</SelectItem>
                        <SelectItem value="Weekends">Weekends</SelectItem>
                        <SelectItem value="Evenings">Evenings</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="On Call">On Call</SelectItem>
                        <SelectItem value="Flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Skills</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {skillOptions.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`skill-${skill}`}
                            checked={newVolunteer.skills.includes(skill)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewVolunteer({
                                  ...newVolunteer,
                                  skills: [...newVolunteer.skills, skill],
                                })
                              } else {
                                setNewVolunteer({
                                  ...newVolunteer,
                                  skills: newVolunteer.skills.filter((s) => s !== skill),
                                })
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor={`skill-${skill}`} className="text-sm">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter className="mt-4 border-t pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#0077B6] hover:bg-[#0077B6]/90" disabled={submitting}>
                    {submitting ? "Adding..." : "Add Volunteer"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleDownloadExcel}
            title="Download volunteers data as Excel file"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search volunteers..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select defaultValue="all" onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="On Leave">On Leave</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all" onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Central City">Central City</SelectItem>
              <SelectItem value="North District">North District</SelectItem>
              <SelectItem value="South District">South District</SelectItem>
              <SelectItem value="East District">East District</SelectItem>
              <SelectItem value="West District">West District</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6 flex flex-wrap gap-2">
          <TabsTrigger value="all">All Volunteers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {volunteers.map((volunteer) => (
              <Card key={volunteer.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge
                      variant="outline"
                      className={
                        volunteer.status === "Active"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : volunteer.status === "Inactive"
                            ? "bg-gray-50 text-gray-700 border-gray-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                      }
                    >
                      {volunteer.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>Assign to Team</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteVolunteer(volunteer.id)}>
                          Remove Volunteer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={volunteer.avatar || "/placeholder.svg"} alt={volunteer.first_name + ' ' + volunteer.last_name} />
                      <AvatarFallback>
                        {(volunteer.first_name?.charAt(0) ?? "") + (volunteer.last_name?.charAt(0) ?? "")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{volunteer.first_name} {volunteer.last_name}</CardTitle>
                      <CardDescription>{volunteer.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{volunteer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{volunteer.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Availability: {volunteer.availability}</span>
                    </div>
                    {volunteer.assignedTo && (
                      <div className="pt-1">
                        <Badge variant="outline">Assigned to: {volunteer.assignedTo}</Badge>
                      </div>
                    )}
                    <div className="pt-1">
                      <div className="text-xs text-muted-foreground mb-1">Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {volunteer.skills?.map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground border-t pt-3">
                  <div className="w-full flex justify-between">
                    <span>Joined: {formatDate(volunteer.joinedDate)}</span>
                    <span>Last active: {formatDate(volunteer.lastActive)}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {volunteers.length === 0 && (
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
              <div className="text-center">
                <AlertTriangle className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No volunteers found</h3>
                <p className="mt-1 text-sm text-muted-foreground">No volunteers match your current search criteria.</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="active">
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Active Volunteers</h3>
              <p className="mt-1 text-sm text-muted-foreground">View and manage currently active volunteers.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="unassigned">
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Unassigned Volunteers</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Volunteers who are not currently assigned to any team or task.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="teams">
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Volunteer Teams</h3>
              <p className="mt-1 text-sm text-muted-foreground">Manage volunteer teams and assignments.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
