"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Check, Filter, MessageSquare, Plus, Search, Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

// Mock data for messages
const messagesData = [
  {
    id: 1,
    sender: "John Smith",
    role: "Field Volunteer",
    avatar: "/placeholder-user.jpg",
    content:
      "Need additional medical supplies at the North Evacuation Center. Running low on bandages and antiseptics.",
    timestamp: "2025-05-01T14:30:00Z",
    status: "unread",
    priority: "high",
    category: "request",
  },
  {
    id: 2,
    sender: "Sarah Johnson",
    role: "Medical Coordinator",
    avatar: "/placeholder-user.jpg",
    content: "Medical team deployed to Eastern District. ETA 15 minutes. Will report back once on site.",
    timestamp: "2025-05-01T13:15:00Z",
    status: "read",
    priority: "medium",
    category: "update",
  },
  {
    id: 3,
    sender: "David Wilson",
    role: "Logistics Manager",
    avatar: "/placeholder-user.jpg",
    content: "Food and water supplies delivered to Southern Relief Center. Inventory updated in the system.",
    timestamp: "2025-05-01T11:45:00Z",
    status: "read",
    priority: "normal",
    category: "update",
  },
  {
    id: 4,
    sender: "Emily Chen",
    role: "Field Coordinator",
    avatar: "/placeholder-user.jpg",
    content:
      "Road to Western District blocked by fallen trees. Need assistance to clear the route for supply vehicles.",
    timestamp: "2025-05-01T10:20:00Z",
    status: "read",
    priority: "high",
    category: "alert",
  },
  {
    id: 5,
    sender: "Michael Brown",
    role: "Search Team Leader",
    avatar: "/placeholder-user.jpg",
    content: "Search operation in Mountain Area complete. All residents accounted for. Team returning to base.",
    timestamp: "2025-04-30T16:50:00Z",
    status: "read",
    priority: "normal",
    category: "update",
  },
  {
    id: 6,
    sender: "System Alert",
    role: "Automated",
    avatar: "/placeholder.svg",
    content:
      "ALERT: Flash flood warning issued for Riverside County. All teams in the area should evacuate immediately.",
    timestamp: "2025-04-30T15:10:00Z",
    status: "unread",
    priority: "critical",
    category: "alert",
  },
]

// Team members for new message dialog
const teamMembers = [
  { id: 1, name: "All Field Teams", role: "Group", avatar: "/placeholder.svg" },
  { id: 2, name: "Medical Team", role: "Group", avatar: "/placeholder.svg" },
  { id: 3, name: "Logistics Team", role: "Group", avatar: "/placeholder.svg" },
  { id: 4, name: "John Smith", role: "Field Volunteer", avatar: "/placeholder-user.jpg" },
  { id: 5, name: "Sarah Johnson", role: "Medical Coordinator", avatar: "/placeholder-user.jpg" },
  { id: 6, name: "David Wilson", role: "Logistics Manager", avatar: "/placeholder-user.jpg" },
  { id: 7, name: "Emily Chen", role: "Field Coordinator", avatar: "/placeholder-user.jpg" },
  { id: 8, name: "Michael Brown", role: "Search Team Leader", avatar: "/placeholder-user.jpg" },
]

export function MessageCenter() {
  const { toast } = useToast()
  const [messages, setMessages] = useState(messagesData)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [newMessage, setNewMessage] = useState({
    recipient: "",
    subject: "",
    content: "",
    priority: "normal",
  })

  // Filter messages based on search query and filters
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || message.category === categoryFilter
    const matchesPriority = priorityFilter === "all" || message.priority === priorityFilter

    return matchesSearch && matchesCategory && matchesPriority
  })

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would send the message to the server
    toast({
      title: "Message sent",
      description: `Message sent to ${newMessage.recipient}`,
    })

    setIsComposeDialogOpen(false)
    setNewMessage({
      recipient: "",
      subject: "",
      content: "",
      priority: "normal",
    })
  }

  const handleMarkAsRead = (id: number) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, status: "read" } : message)))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Message Center</h2>
          <p className="text-muted-foreground">Communicate with teams and manage alerts</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Dialog open={isComposeDialogOpen} onOpenChange={setIsComposeDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#29ABE2] hover:bg-[#29ABE2]/90">
                <Plus className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Compose New Message</DialogTitle>
                <DialogDescription>Send a message to team members or groups</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSendMessage}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="recipient">To:</label>
                    <select
                      id="recipient"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newMessage.recipient}
                      onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
                      required
                    >
                      <option value="">Select recipient</option>
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.name}>
                          {member.name} ({member.role})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject">Subject:</label>
                    <Input
                      id="subject"
                      placeholder="Enter message subject"
                      value={newMessage.subject}
                      onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="priority">Priority:</label>
                    <select
                      id="priority"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newMessage.priority}
                      onChange={(e) => setNewMessage({ ...newMessage, priority: e.target.value })}
                    >
                      <option value="normal">Normal</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="content">Message:</label>
                    <Textarea
                      id="content"
                      placeholder="Type your message here"
                      className="min-h-[150px]"
                      value={newMessage.content}
                      onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsComposeDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#29ABE2] hover:bg-[#29ABE2]/90">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[150px]"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="alert">Alerts</option>
            <option value="request">Requests</option>
            <option value="update">Updates</option>
          </select>
          <select
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[150px]"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="normal">Normal</option>
          </select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="inbox">
        <TabsList className="mb-6">
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox">
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <Card
                key={message.id}
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                  message.status === "unread" ? "border-l-4 border-l-[#29ABE2]" : ""
                }`}
                onClick={() => {
                  setSelectedMessage(message)
                  setIsViewDialogOpen(true)
                  if (message.status === "unread") {
                    handleMarkAsRead(message.id)
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                      <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{message.sender}</div>
                        <div className="flex items-center gap-2">
                          {message.priority === "critical" && <Badge className="bg-red-500">Critical</Badge>}
                          {message.priority === "high" && <Badge className="bg-amber-500">High</Badge>}
                          {message.category === "alert" && (
                            <Badge variant="outline" className="border-red-200 text-red-700">
                              Alert
                            </Badge>
                          )}
                          {message.category === "request" && (
                            <Badge variant="outline" className="border-blue-200 text-blue-700">
                              Request
                            </Badge>
                          )}
                          <div className="text-xs text-muted-foreground">{formatDate(message.timestamp)}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{message.role}</div>
                      <p className="text-sm">
                        {message.content.length > 120 ? `${message.content.substring(0, 120)}...` : message.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredMessages.length === 0 && (
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No messages found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">No messages match your current search criteria.</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="sent">
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Sent Messages</h3>
              <p className="mt-1 text-sm text-muted-foreground">Messages you've sent to team members and groups.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">System Alerts</h3>
              <p className="mt-1 text-sm text-muted-foreground">Important system alerts and notifications.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="archived">
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Archived Messages</h3>
              <p className="mt-1 text-sm text-muted-foreground">Messages you've archived for future reference.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedMessage && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DialogTitle>{selectedMessage.sender}</DialogTitle>
                    {selectedMessage.priority === "critical" && <Badge className="bg-red-500">Critical</Badge>}
                    {selectedMessage.priority === "high" && <Badge className="bg-amber-500">High</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground">{formatDate(selectedMessage.timestamp)}</div>
                </div>
                <DialogDescription className="flex items-center gap-2">
                  <span>{selectedMessage.role}</span>
                  {selectedMessage.category === "alert" && (
                    <Badge variant="outline" className="border-red-200 text-red-700">
                      Alert
                    </Badge>
                  )}
                  {selectedMessage.category === "request" && (
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      Request
                    </Badge>
                  )}
                  {selectedMessage.category === "update" && (
                    <Badge variant="outline" className="border-green-200 text-green-700">
                      Update
                    </Badge>
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p>{selectedMessage.content}</p>
              </div>
              <DialogFooter>
                <div className="flex w-full justify-between">
                  <Button variant="outline">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Forward
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Check className="mr-2 h-4 w-4" />
                      Mark as Resolved
                    </Button>
                    <Button className="bg-[#29ABE2] hover:bg-[#29ABE2]/90">
                      <Send className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
