"use client"

import { Navbar } from "@/components/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { AlertCircle, CalendarIcon, Clock, Download, MapPin, MessageSquare, User, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function VolunteerDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { user } = useAuth()

  // Mock data for volunteer dashboard
  const tasks = [
    {
      id: 1,
      title: "Food Distribution",
      location: "Shelter #3",
      status: "In Progress",
      due: "Today, 5:00 PM",
      priority: "High",
    },
    {
      id: 2,
      title: "Medical Supply Check",
      location: "Medical Camp",
      status: "Pending",
      due: "Tomorrow, 9:00 AM",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Evacuation Assistance",
      location: "East District",
      status: "Completed",
      due: "Yesterday",
      priority: "High",
    },
    {
      id: 4,
      title: "Relief Kit Assembly",
      location: "Central Warehouse",
      status: "Pending",
      due: "May 5, 2023",
      priority: "Low",
    },
  ]

  const trainings = [
    { id: 1, title: "First Aid Basics", progress: 100, completed: true },
    { id: 2, title: "Disaster Response Protocol", progress: 75, completed: false },
    { id: 3, title: "Communication Systems", progress: 30, completed: false },
    { id: 4, title: "Psychological First Aid", progress: 0, completed: false },
  ]

  const team = [
    { id: 1, name: "Rohini Chatterjee", role: "Team Lead", avatar: "https://plus.unsplash.com/premium_photo-1682089874677-3eee554feb19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    { id: 2, name: "Sourav Sarkar", role: "Medical Support", avatar: "http://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
    { id: 3, name: "Aisha Patel", role: "Logistics", avatar: "http://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
    { id: 4, name: "Dibyendu Ghosh", role: "Communications", avatar: "http://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
  ]

  const announcements = [
    {
      id: 1,
      title: "Emergency Response Training",
      date: "May 10, 2023",
      content: "All volunteers must complete the emergency response training by the end of this week.",
    },
    {
      id: 2,
      title: "New Relief Center",
      date: "May 3, 2023",
      content: "A new relief center has been established in the western district. Volunteers needed.",
    },
    {
      id: 3,
      title: "Supply Donation Drive",
      date: "May 1, 2023",
      content: "We are organizing a supply donation drive this weekend. Please share with your networks.",
    },
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Volunteer Dashboard</h1>
              <p className="text-gray-700 mt-1">
                Welcome back, {user?.name || "Alex"}! Here's your volunteer activity overview.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Download Schedule
              </Button>
              <Button className="bg-[#0077B6] hover:bg-[#1d8eb8]">Check In</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Assigned Tasks</CardTitle>
                <CardDescription>Your current workload</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-gray-900">7</div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      3 In Progress
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      4 Pending
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Hours Contributed</CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-gray-900">24.5</div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    +8.5 from last month
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Assigned Region</CardTitle>
                <CardDescription>Current deployment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-medium text-gray-900">Eastern District</div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <MapPin size={14} />
                    View Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="tasks" className="mb-8">
            <TabsList className="mb-4 bg-white shadow-sm">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Assigned Tasks</CardTitle>
                  <CardDescription>Manage your current tasks and track progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg bg-white"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">{task.title}</h3>
                            {task.status === "In Progress" && (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                In Progress
                              </Badge>
                            )}
                            {task.status === "Pending" && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                Pending
                              </Badge>
                            )}
                            {task.status === "Completed" && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Completed
                              </Badge>
                            )}
                            {task.priority === "High" && (
                              <Badge className="bg-red-100 text-red-700 border-red-200">High Priority</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-700">
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              {task.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              Due: {task.due}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex gap-2">
                          {task.status !== "Completed" && (
                            <Button variant="outline" size="sm">
                              Update Status
                            </Button>
                          )}
                          <Button size="sm" className="bg-[#0077B6] hover:bg-[#1d8eb8]">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Your Schedule</CardTitle>
                  <CardDescription>View and manage your volunteer schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Calendar mode="single" selected={date} onSelect={setDate} className="border rounded-md p-3" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-4">Upcoming Shifts</h3>
                      <div className="space-y-4">
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">Food Distribution</div>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              Today
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-700 mt-1">2:00 PM - 6:00 PM</div>
                          <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
                            <MapPin size={14} />
                            Shelter #3, Eastern District
                          </div>
                        </div>

                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">Medical Support</div>
                            <Badge variant="outline" className="bg-gray-50 text-gray-700">
                              Tomorrow
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-700 mt-1">9:00 AM - 1:00 PM</div>
                          <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
                            <MapPin size={14} />
                            Medical Camp, Central District
                          </div>
                        </div>

                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">Supply Distribution</div>
                            <Badge variant="outline" className="bg-gray-50 text-gray-700">
                              May 6
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-700 mt-1">10:00 AM - 4:00 PM</div>
                          <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
                            <MapPin size={14} />
                            Central Warehouse
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="training">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Training & Certifications</CardTitle>
                  <CardDescription>Track your training progress and certifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {trainings.map((training) => (
                      <div key={training.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{training.title}</h3>
                            {training.completed && <Badge className="bg-green-100 text-green-700">Completed</Badge>}
                          </div>
                          {training.completed ? (
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Download size={14} />
                              Certificate
                            </Button>
                          ) : (
                            <Button size="sm" className="bg-[#0077B6] hover:bg-[#1d8eb8]">
                              Continue
                            </Button>
                          )}
                        </div>
                        <Progress value={training.progress} className="h-2" />
                        <div className="text-sm text-gray-700">{training.progress}% Complete</div>
                      </div>
                    ))}

                    <div className="pt-4">
                      <h3 className="font-medium mb-3">Available Trainings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border border-dashed">
                          <CardContent className="p-4">
                            <h4 className="font-medium">Advanced Search & Rescue</h4>
                            <p className="text-sm text-gray-700 mt-1">
                              Learn advanced techniques for search and rescue operations.
                            </p>
                            <Button variant="outline" size="sm" className="mt-3">
                              Enroll
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="border border-dashed">
                          <CardContent className="p-4">
                            <h4 className="font-medium">Emergency Communications</h4>
                            <p className="text-sm text-gray-700 mt-1">
                              Master emergency communication protocols and systems.
                            </p>
                            <Button variant="outline" size="sm" className="mt-3">
                              Enroll
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Your Team</CardTitle>
                  <CardDescription>Connect with your volunteer team members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {team.map((member) => (
                        <Card key={member.id}>
                          <CardContent className="p-4 flex flex-col items-center text-center">
                            <Avatar className="h-16 w-16 mb-3 mt-2">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-gray-700">{member.role}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-3 w-full flex items-center justify-center gap-1"
                            >
                              <MessageSquare size={14} />
                              Message
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Team Activities</h3>
                      <div className="space-y-3">
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">Team Briefing</div>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              Today, 8:00 AM
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
                            <Users size={14} />
                            All team members
                          </div>
                        </div>

                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">Coordination Meeting</div>
                            <Badge variant="outline" className="bg-gray-50 text-gray-700">
                              May 5, 4:00 PM
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
                            <Users size={14} />
                            Team leads only
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="announcements">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Announcements & Updates</CardTitle>
                  <CardDescription>Important information for all volunteers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{announcement.title}</h3>
                          <Badge variant="outline" className="bg-gray-50 text-gray-700">
                            {announcement.date}
                          </Badge>
                        </div>
                        <p className="text-gray-700">{announcement.content}</p>
                        {announcement.id === 1 && (
                          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start gap-2">
                            <AlertCircle size={18} className="text-yellow-600 mt-0.5" />
                            <div className="text-sm text-yellow-800">
                              This training is mandatory for all volunteers. Please complete it by the deadline.
                            </div>
                          </div>
                        )}
                        {announcement.id === 2 && (
                          <Button className="mt-3 bg-[#0077B6] hover:bg-[#1d8eb8]">Sign Up</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Resources & Documents</CardTitle>
                <CardDescription>Access important resources and documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="font-medium">Volunteer Handbook</div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download size={14} />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="font-medium">Emergency Protocols</div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download size={14} />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="font-medium">Contact Directory</div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download size={14} />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="font-medium">Area Maps</div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download size={14} />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Volunteer events and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Volunteer Appreciation Day</div>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700">
                        May 15
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-700 mt-1">
                      Join us for a day of recognition and celebration of our volunteer community.
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
                      <CalendarIcon size={14} />
                      2:00 PM - 5:00 PM
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
                      <MapPin size={14} />
                      Community Center
                    </div>
                    <Button variant="outline" size="sm" className="mt-3">
                      RSVP
                    </Button>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Disaster Preparedness Workshop</div>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700">
                        May 22
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-700 mt-1">
                      Learn essential skills for disaster preparedness and response.
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
                      <CalendarIcon size={14} />
                      10:00 AM - 12:00 PM
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
                      <MapPin size={14} />
                      Training Center
                    </div>
                    <Button variant="outline" size="sm" className="mt-3">
                      Register
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-end">
            <Link href="/volunteer/profile">
              <Button variant="outline" className="flex items-center gap-2 mr-2">
                <User className="h-4 w-4" />
                Manage Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
