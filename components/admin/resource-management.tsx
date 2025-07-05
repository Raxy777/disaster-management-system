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
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  AlertTriangle,
  Download,
  Edit,
  Filter,
  MoreHorizontal,
  Package,
  Plus,
  RefreshCw,
  Search,
  Truck,
} from "lucide-react"
import { useState } from "react"

// Mock data for resources
const resourcesData = [
  {
    id: 1,
    name: "Water Bottles (500ml)",
    category: "Water",
    quantity: 5000,
    allocated: 2500,
    location: "Central Warehouse",
    status: "Available",
    lastUpdated: "2025-05-01T14:30:00Z",
  },
  {
    id: 2,
    name: "Emergency Food Kits",
    category: "Food",
    quantity: 1200,
    allocated: 800,
    location: "North Distribution Center",
    status: "Low Stock",
    lastUpdated: "2025-05-01T10:15:00Z",
  },
  {
    id: 3,
    name: "First Aid Kits",
    category: "Medical",
    quantity: 750,
    allocated: 300,
    location: "Medical Supply Depot",
    status: "Available",
    lastUpdated: "2025-04-30T16:45:00Z",
  },
  {
    id: 4,
    name: "Blankets",
    category: "Shelter",
    quantity: 2000,
    allocated: 1500,
    location: "South Warehouse",
    status: "Low Stock",
    lastUpdated: "2025-04-29T09:20:00Z",
  },
  {
    id: 5,
    name: "Portable Generators",
    category: "Equipment",
    quantity: 50,
    allocated: 35,
    location: "Equipment Storage",
    status: "Low Stock",
    lastUpdated: "2025-04-28T11:10:00Z",
  },
  {
    id: 6,
    name: "Tents (4-Person)",
    category: "Shelter",
    quantity: 300,
    allocated: 150,
    location: "Central Warehouse",
    status: "Available",
    lastUpdated: "2025-04-27T15:30:00Z",
  },
]

// Resource categories
const resourceCategories = [
  { value: "Water", label: "Water" },
  { value: "Food", label: "Food" },
  { value: "Medical", label: "Medical" },
  { value: "Shelter", label: "Shelter" },
  { value: "Equipment", label: "Equipment" },
  { value: "Clothing", label: "Clothing" },
  { value: "Other", label: "Other" },
]

export function ResourceManagement() {
  const { toast } = useToast()
  const [resources, setResources] = useState(resourcesData)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newResource, setNewResource] = useState({
    name: "",
    category: "",
    quantity: "",
    location: "",
  })

  // Filter resources based on search query and filters
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter
    const matchesStatus = statusFilter === "all" || resource.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault()

    const newResourceObj = {
      id: resources.length + 1,
      name: newResource.name,
      category: newResource.category,
      quantity: Number.parseInt(newResource.quantity),
      allocated: 0,
      location: newResource.location,
      status: "Available",
      lastUpdated: new Date().toISOString(),
    }

    setResources([newResourceObj, ...resources])
    setIsAddDialogOpen(false)
    setNewResource({
      name: "",
      category: "",
      quantity: "",
      location: "",
    })

    toast({
      title: "Resource added",
      description: "The resource has been added to inventory.",
    })
  }

  const handleDeleteResource = (id: number) => {
    setResources(resources.filter((resource) => resource.id !== id))

    toast({
      title: "Resource deleted",
      description: "The resource has been removed from inventory.",
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
    <div className="container mx-auto px-2 sm:px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold">Resource Management</h2>
          <p className="text-muted-foreground">Manage and track disaster response resources and inventory</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#0077B6] hover:bg-[#0077B6]/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
                <DialogDescription>Add a new resource to your inventory.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddResource}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Resource Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter resource name"
                      value={newResource.name}
                      onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newResource.category}
                        onValueChange={(value) => setNewResource({ ...newResource, category: value })}
                        required
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {resourceCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="Enter quantity"
                        value={newResource.quantity}
                        onChange={(e) => setNewResource({ ...newResource, quantity: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Storage Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter storage location"
                      value={newResource.location}
                      onChange={(e) => setNewResource({ ...newResource, location: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#0077B6] hover:bg-[#0077B6]/90">
                    Add Resource
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select defaultValue="all" onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {resourceCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="all" onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Low Stock">Low Stock</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="inventory">
        <TabsList className="mb-6 flex flex-wrap gap-2">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="allocations">Allocations</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge
                      variant="outline"
                      className={
                        resource.status === "Available"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : resource.status === "Low Stock"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {resource.status}
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
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Resource
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="mr-2 h-4 w-4" />
                          Allocate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Package className="mr-2 h-4 w-4" />
                          Request More
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteResource(resource.id)}>
                          Delete Resource
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-lg">{resource.name}</CardTitle>
                  <CardDescription>{resource.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Quantity</span>
                        <span>
                          {resource.allocated} / {resource.quantity} allocated
                        </span>
                      </div>
                      <Progress value={(resource.allocated / resource.quantity) * 100} className="h-2" />
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Location:</span> {resource.location}
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Last Updated:</span> {formatDate(resource.lastUpdated)}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">Allocate</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
              <div className="text-center">
                <AlertTriangle className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No resources found</h3>
                <p className="mt-1 text-sm text-muted-foreground">No resources match your current search criteria.</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="requests">
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Resource Requests</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                View and manage resource requests from relief centers.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="allocations">
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Resource Allocations</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Track resource allocations to different disaster areas.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="suppliers">
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Suppliers</h3>
              <p className="mt-1 text-sm text-muted-foreground">Manage supplier information and procurement.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
