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
  created_at?: string
  updated_at?: string
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
  const [newVolunteer, setNewVolunteer] = useState<Omit<Volunteer, 'id' | 'created_at' | 'updated_at'>>({
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
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null)
  const [assignmentData, setAssignmentData] = useState({ assigned_to: "", status: "" })
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
      
      // Ensure each volunteer has default date values if missing
      const volunteersWithDates = Array.isArray(data) ? data.map((volunteer: any) => ({
        ...volunteer,
        created_at: volunteer.created_at || new Date().toISOString(),
        updated_at: volunteer.updated_at || new Date().toISOString(),
        location: volunteer.location || volunteer.city || "Unknown"
      })) : []
      
      setVolunteers(volunteersWithDates)
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

  const handleDeleteVolunteer = async (id: number) => {
    try {
      const res = await fetch(`/api/volunteers/${id}`, {
        method: "DELETE",
      })
      
      if (res.ok) {
        setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id))
        toast({
          title: "Volunteer removed",
          description: "The volunteer has been removed from the system.",
        })
      } else {
        const error = await res.json()
        toast({
          title: "Error removing volunteer",
          description: error.error || "An error occurred.",
          variant: "destructive"
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      toast({
        title: "Error removing volunteer",
        description: errorMessage,
        variant: "destructive"
      })
    }
  }

  const handleEditVolunteer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingVolunteer) return

    setSubmitting(true)
    try {
      const res = await fetch(`/api/volunteers/${editingVolunteer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingVolunteer),
      })

      if (res.ok) {
        const updatedVolunteer = await res.json()
        // Ensure updated volunteer has proper date fields
        const volunteerWithDates = {
          ...updatedVolunteer,
          created_at: updatedVolunteer.created_at || new Date().toISOString(),
          updated_at: updatedVolunteer.updated_at || new Date().toISOString(),
          location: updatedVolunteer.location || updatedVolunteer.city || "Unknown"
        }
        setVolunteers(volunteers.map(v => v.id === volunteerWithDates.id ? volunteerWithDates : v))
        toast({
          title: "Volunteer updated",
          description: "The volunteer details have been updated successfully.",
        })
        setIsEditDialogOpen(false)
        setEditingVolunteer(null)
      } else {
        const error = await res.json()
        toast({
          title: "Error updating volunteer",
          description: error.error || "An error occurred.",
          variant: "destructive"
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      toast({
        title: "Error updating volunteer",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleAssignVolunteer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedVolunteer) return

    setSubmitting(true)
    try {
      const res = await fetch(`/api/volunteers/${selectedVolunteer.id}/assign`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assignmentData),
      })

      if (res.ok) {
        const updatedVolunteer = await res.json()
        // Ensure updated volunteer has proper date fields
        const volunteerWithDates = {
          ...updatedVolunteer,
          created_at: updatedVolunteer.created_at || new Date().toISOString(),
          updated_at: updatedVolunteer.updated_at || new Date().toISOString(),
          location: updatedVolunteer.location || updatedVolunteer.city || "Unknown"
        }
        setVolunteers(volunteers.map(v => v.id === volunteerWithDates.id ? volunteerWithDates : v))
        toast({
          title: "Assignment updated",
          description: "The volunteer assignment has been updated successfully.",
        })
        setIsAssignDialogOpen(false)
        setSelectedVolunteer(null)
        setAssignmentData({ assigned_to: "", status: "" })
      } else {
        const error = await res.json()
        toast({
          title: "Error updating assignment",
          description: error.error || "An error occurred.",
          variant: "destructive"
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      toast({
        title: "Error updating assignment",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const openEditDialog = (volunteer: Volunteer) => {
    setEditingVolunteer(volunteer)
    setIsEditDialogOpen(true)
  }

  const openAssignDialog = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer)
    setAssignmentData({
      assigned_to: volunteer.assigned_to || "",
      status: volunteer.status
    })
    setIsAssignDialogOpen(true)
  }

  const openViewDialog = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer)
    setIsViewDialogOpen(true)
  }

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) {
      return "N/A"
    }
    
    const date = new Date(dateString)
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "N/A"
    }
    
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
      'Created Date': volunteer.created_at,
      'Last Updated': volunteer.updated_at,
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
      { wch: 15 }, // Created Date
      { wch: 15 }, // Last Updated
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

  // Filter volunteers based on search query and filters
  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesSearch = 
      volunteer.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.phone.includes(searchQuery) ||
      volunteer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = statusFilter === "all" || volunteer.status === statusFilter
    
    const matchesLocation = locationFilter === "all" || 
      volunteer.city === locationFilter || 
      volunteer.location === locationFilter

    return matchesSearch && matchesStatus && matchesLocation
  })

  // Filter volunteers by tab
  const getVolunteersByTab = (tabValue: string) => {
    switch (tabValue) {
      case "active":
        return filteredVolunteers.filter(v => v.status === "Active")
      case "unassigned":
        return filteredVolunteers.filter(v => !v.assigned_to || v.assigned_to === "")
      default:
        return filteredVolunteers
    }
  }

  const renderVolunteerCards = (volunteers: Volunteer[]) => (
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
                  <DropdownMenuItem onClick={() => openViewDialog(volunteer)}>
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openEditDialog(volunteer)}>
                    Edit Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openAssignDialog(volunteer)}>
                    Assign to Team
                  </DropdownMenuItem>
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
                <span>{volunteer.location || volunteer.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Availability: {volunteer.availability}</span>
              </div>
              {volunteer.assigned_to && (
                <div className="pt-1">
                  <Badge variant="outline">Assigned to: {volunteer.assigned_to}</Badge>
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
              <span>Joined: {formatDate(volunteer.created_at)}</span>
              <span>Last updated: {formatDate(volunteer.updated_at)}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

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

          {/* Edit Volunteer Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>Edit Volunteer</DialogTitle>
                <DialogDescription>Update volunteer information.</DialogDescription>
              </DialogHeader>
              {editingVolunteer && (
                <form onSubmit={handleEditVolunteer} className="flex flex-col h-full">
                  <div className="grid gap-4 py-4 overflow-y-auto flex-1 max-h-[60vh]">
                    <div className="space-y-2">
                      <Label htmlFor="edit_first_name">First Name</Label>
                      <Input
                        id="edit_first_name"
                        placeholder="Enter first name"
                        value={editingVolunteer.first_name}
                        onChange={(e) => setEditingVolunteer({ ...editingVolunteer, first_name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit_last_name">Last Name</Label>
                      <Input
                        id="edit_last_name"
                        placeholder="Enter last name"
                        value={editingVolunteer.last_name}
                        onChange={(e) => setEditingVolunteer({ ...editingVolunteer, last_name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit_email">Email</Label>
                      <Input
                        id="edit_email"
                        type="email"
                        placeholder="Enter email address"
                        value={editingVolunteer.email}
                        onChange={(e) => setEditingVolunteer({ ...editingVolunteer, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit_phone">Phone</Label>
                      <Input
                        id="edit_phone"
                        placeholder="Enter phone number"
                        value={editingVolunteer.phone}
                        onChange={(e) => setEditingVolunteer({ ...editingVolunteer, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit_address">Address</Label>
                      <Input
                        id="edit_address"
                        placeholder="Enter address"
                        value={editingVolunteer.address}
                        onChange={(e) => setEditingVolunteer({ ...editingVolunteer, address: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit_city">City</Label>
                      <Input
                        id="edit_city"
                        placeholder="Enter city"
                        value={editingVolunteer.city}
                        onChange={(e) => setEditingVolunteer({ ...editingVolunteer, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit_zip">PIN</Label>
                      <Input
                        id="edit_zip"
                        placeholder="Enter pin code"
                        value={editingVolunteer.zip}
                        onChange={(e) => setEditingVolunteer({ ...editingVolunteer, zip: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit_availability">Availability</Label>
                      <Select
                        value={editingVolunteer.availability}
                        onValueChange={(value) => setEditingVolunteer({ ...editingVolunteer, availability: value })}
                        required
                      >
                        <SelectTrigger id="edit_availability">
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
                              id={`edit-skill-${skill}`}
                              checked={editingVolunteer.skills.includes(skill)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setEditingVolunteer({
                                    ...editingVolunteer,
                                    skills: [...editingVolunteer.skills, skill],
                                  })
                                } else {
                                  setEditingVolunteer({
                                    ...editingVolunteer,
                                    skills: editingVolunteer.skills.filter((s) => s !== skill),
                                  })
                                }
                              }}
                              className="rounded border-gray-300"
                            />
                            <Label htmlFor={`edit-skill-${skill}`} className="text-sm">
                              {skill}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="mt-4 border-t pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#0077B6] hover:bg-[#0077B6]/90" disabled={submitting}>
                      {submitting ? "Updating..." : "Update Volunteer"}
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>

          {/* Assign Volunteer Dialog */}
          <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Assign Volunteer</DialogTitle>
                <DialogDescription>
                  Update assignment and status for {selectedVolunteer?.first_name} {selectedVolunteer?.last_name}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAssignVolunteer}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="assign_to">Assign To</Label>
                    <Select
                      value={assignmentData.assigned_to}
                      onValueChange={(value) => setAssignmentData({ ...assignmentData, assigned_to: value })}
                    >
                      <SelectTrigger id="assign_to">
                        <SelectValue placeholder="Select assignment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Unassigned</SelectItem>
                        <SelectItem value="Search and Rescue Team">Search and Rescue Team</SelectItem>
                        <SelectItem value="Medical Team">Medical Team</SelectItem>
                        <SelectItem value="Emergency Response Team">Emergency Response Team</SelectItem>
                        <SelectItem value="Communication Team">Communication Team</SelectItem>
                        <SelectItem value="Logistics Team">Logistics Team</SelectItem>
                        <SelectItem value="Evacuation Team">Evacuation Team</SelectItem>
                        <SelectItem value="Relief Distribution Team">Relief Distribution Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="volunteer_status">Status</Label>
                    <Select
                      value={assignmentData.status}
                      onValueChange={(value) => setAssignmentData({ ...assignmentData, status: value })}
                      required
                    >
                      <SelectTrigger id="volunteer_status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                        <SelectItem value="Training">Training</SelectItem>
                        <SelectItem value="Deployed">Deployed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#0077B6] hover:bg-[#0077B6]/90" disabled={submitting}>
                    {submitting ? "Updating..." : "Update Assignment"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* View Volunteer Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Volunteer Profile</DialogTitle>
                <DialogDescription>Detailed information about the volunteer.</DialogDescription>
              </DialogHeader>
              {selectedVolunteer && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedVolunteer.avatar || "/placeholder.svg"} alt={selectedVolunteer.first_name + ' ' + selectedVolunteer.last_name} />
                      <AvatarFallback className="text-lg">
                        {(selectedVolunteer.first_name?.charAt(0) ?? "") + (selectedVolunteer.last_name?.charAt(0) ?? "")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{selectedVolunteer.first_name} {selectedVolunteer.last_name}</h3>
                      <p className="text-muted-foreground">{selectedVolunteer.email}</p>
                      <Badge
                        variant="outline"
                        className={
                          selectedVolunteer.status === "Active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : selectedVolunteer.status === "Inactive"
                              ? "bg-gray-50 text-gray-700 border-gray-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                        }
                      >
                        {selectedVolunteer.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <p className="text-sm text-muted-foreground">{selectedVolunteer.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Availability</Label>
                      <p className="text-sm text-muted-foreground">{selectedVolunteer.availability}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Address</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedVolunteer.address}, {selectedVolunteer.city} - {selectedVolunteer.zip}
                    </p>
                  </div>

                  {selectedVolunteer.assigned_to && (
                    <div>
                      <Label className="text-sm font-medium">Assignment</Label>
                      <p className="text-sm text-muted-foreground">{selectedVolunteer.assigned_to}</p>
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-medium">Skills</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedVolunteer.skills?.map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground border-t pt-4">
                    <div>
                      <Label className="text-sm font-medium">Joined Date</Label>
                      <p>{formatDate(selectedVolunteer.created_at)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Last Updated</Label>
                      <p>{formatDate(selectedVolunteer.updated_at)}</p>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    setIsViewDialogOpen(false)
                    if (selectedVolunteer) openEditDialog(selectedVolunteer)
                  }}
                  className="bg-[#0077B6] hover:bg-[#0077B6]/90"
                >
                  Edit Volunteer
                </Button>
              </DialogFooter>
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
          {renderVolunteerCards(getVolunteersByTab("all"))}

          {getVolunteersByTab("all").length === 0 && !loading && (
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
              <div className="text-center">
                <AlertTriangle className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No volunteers found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {searchQuery || statusFilter !== "all" || locationFilter !== "all" 
                    ? "No volunteers match your current search criteria." 
                    : "No volunteers have been added yet."}
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
              <div className="text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <h3 className="mt-2 text-lg font-medium">Loading volunteers...</h3>
                <p className="mt-1 text-sm text-muted-foreground">Please wait while we fetch the volunteer data.</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="active">
          {renderVolunteerCards(getVolunteersByTab("active"))}
          
          {getVolunteersByTab("active").length === 0 && !loading && (
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
              <div className="text-center">
                <AlertTriangle className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No active volunteers found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {searchQuery || statusFilter !== "all" || locationFilter !== "all" 
                    ? "No active volunteers match your current search criteria." 
                    : "No active volunteers are currently in the system."}
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="unassigned">
          {renderVolunteerCards(getVolunteersByTab("unassigned"))}
          
          {getVolunteersByTab("unassigned").length === 0 && !loading && (
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
              <div className="text-center">
                <AlertTriangle className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No unassigned volunteers found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {searchQuery || statusFilter !== "all" || locationFilter !== "all" 
                    ? "No unassigned volunteers match your current search criteria." 
                    : "All volunteers are currently assigned to teams."}
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="teams">
          <div className="space-y-6">
            {/* Group volunteers by assignment */}
            {["Search and Rescue Team", "Medical Team", "Emergency Response Team", "Communication Team", "Logistics Team", "Evacuation Team", "Relief Distribution Team"].map((team) => {
              const teamVolunteers = filteredVolunteers.filter(v => v.assigned_to === team)
              if (teamVolunteers.length === 0) return null
              
              return (
                <div key={team}>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    {team} 
                    <Badge variant="secondary">{teamVolunteers.length} volunteers</Badge>
                  </h3>
                  {renderVolunteerCards(teamVolunteers)}
                </div>
              )
            })}
            
            {filteredVolunteers.filter(v => v.assigned_to && !["Search and Rescue Team", "Medical Team", "Emergency Response Team", "Communication Team", "Logistics Team", "Evacuation Team", "Relief Distribution Team"].includes(v.assigned_to)).length === 0 && 
             ["Search and Rescue Team", "Medical Team", "Emergency Response Team", "Communication Team", "Logistics Team", "Evacuation Team", "Relief Distribution Team"].every(team => 
               filteredVolunteers.filter(v => v.assigned_to === team).length === 0
             ) && !loading && (
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <AlertTriangle className="mx-auto h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No team assignments found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">No volunteers are currently assigned to teams.</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
