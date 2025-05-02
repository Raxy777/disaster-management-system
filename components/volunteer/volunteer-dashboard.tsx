"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { MapPin, Clock, Users, FileText, Award, MessageSquare, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function VolunteerDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Volunteer Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Sarah Johnson</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Badge className="mr-2 bg-green-500">Active Volunteer</Badge>
          <Badge className="bg-blue-500">Level: Experienced</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Assigned Tasks</CardTitle>
            <CardDescription>Current and upcoming tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#29ABE2]">4</div>
            <div className="text-sm text-gray-500">2 urgent, 2 scheduled</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Hours Contributed</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#29ABE2]">24</div>
            <div className="text-sm text-gray-500">+8 from last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Impact</CardTitle>
            <CardDescription>People assisted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#29ABE2]">156</div>
            <div className="text-sm text-gray-500">Across 3 disaster zones</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="regions">Assigned Regions</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <div className="grid grid-cols-1 gap-4">
            <Card className="border-l-4 border-red-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="bg-red-500 mb-2">Urgent</Badge>
                    <h3 className="text-lg font-semibold">Supply Distribution</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Distribute emergency supplies at Westside Relief Center
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" /> Westside Community Center
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 mr-1" /> Today, 2:00 PM - 5:00 PM
                    </div>
                  </div>
                  <Button size="sm">Mark Complete</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-red-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="bg-red-500 mb-2">Urgent</Badge>
                    <h3 className="text-lg font-semibold">Evacuation Assistance</h3>
                    <p className="text-gray-600 text-sm mb-2">Help evacuate residents from flood-prone areas</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" /> Riverside District
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 mr-1" /> Today, 4:00 PM - 8:00 PM
                    </div>
                  </div>
                  <Button size="sm">Mark Complete</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-blue-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="bg-blue-500 mb-2">Scheduled</Badge>
                    <h3 className="text-lg font-semibold">First Aid Training</h3>
                    <p className="text-gray-600 text-sm mb-2">Assist in first aid training for community members</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" /> Community Health Center
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 mr-1" /> Tomorrow, 10:00 AM - 12:00 PM
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-blue-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="bg-blue-500 mb-2">Scheduled</Badge>
                    <h3 className="text-lg font-semibold">Relief Center Support</h3>
                    <p className="text-gray-600 text-sm mb-2">General support at the main relief center</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" /> Central Relief Center
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 mr-1" /> May 5, 9:00 AM - 1:00 PM
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Your Schedule</CardTitle>
                <CardDescription>Upcoming volunteer activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      date: "Today",
                      events: [
                        {
                          time: "2:00 PM - 5:00 PM",
                          title: "Supply Distribution",
                          location: "Westside Community Center",
                        },
                        { time: "4:00 PM - 8:00 PM", title: "Evacuation Assistance", location: "Riverside District" },
                      ],
                    },
                    {
                      date: "Tomorrow",
                      events: [
                        {
                          time: "10:00 AM - 12:00 PM",
                          title: "First Aid Training",
                          location: "Community Health Center",
                        },
                      ],
                    },
                    {
                      date: "May 5",
                      events: [
                        {
                          time: "9:00 AM - 1:00 PM",
                          title: "Relief Center Support",
                          location: "Central Relief Center",
                        },
                      ],
                    },
                  ].map((day, index) => (
                    <div key={index}>
                      <h3 className="font-medium text-gray-800">{day.date}</h3>
                      <div className="space-y-2 mt-2">
                        {day.events.map((event, eventIndex) => (
                          <div key={eventIndex} className="flex items-start p-3 bg-gray-50 rounded-md">
                            <div className="bg-[#29ABE2] text-white p-2 rounded-md mr-3">
                              <Clock className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">{event.title}</p>
                              <p className="text-sm text-gray-500">{event.time}</p>
                              <p className="text-sm text-gray-500">{event.location}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Select a date to view events</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regions">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Assigned Regions</CardTitle>
                <CardDescription>Areas you are currently assigned to</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Riverside District",
                      status: "Active Emergency",
                      type: "Flooding",
                      coordinator: "John Smith",
                      volunteers: 12,
                    },
                    {
                      name: "Westside Community",
                      status: "Relief Phase",
                      type: "Fire Damage",
                      coordinator: "Maria Rodriguez",
                      volunteers: 8,
                    },
                    {
                      name: "Central District",
                      status: "Preparedness",
                      type: "Hurricane Season",
                      coordinator: "David Chen",
                      volunteers: 15,
                    },
                  ].map((region, index) => (
                    <Card key={index} className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{region.name}</h3>
                            <Badge
                              className={`mb-2 ${
                                region.status === "Active Emergency"
                                  ? "bg-red-500"
                                  : region.status === "Relief Phase"
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                              }`}
                            >
                              {region.status}
                            </Badge>
                            <p className="text-gray-600 text-sm">Disaster Type: {region.type}</p>
                            <p className="text-gray-600 text-sm">Coordinator: {region.coordinator}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Users className="h-4 w-4 mr-1" /> {region.volunteers} volunteers assigned
                            </div>
                          </div>
                          <Button size="sm">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Region Map</CardTitle>
                <CardDescription>Visual overview of your assigned areas</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-gray-200 h-[300px] flex items-center justify-center">
                  <p className="text-gray-500">Interactive map would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Training Materials</CardTitle>
                <CardDescription>Resources to enhance your disaster response skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Basic First Aid",
                      type: "Video Course",
                      duration: "2 hours",
                      status: "Completed",
                      date: "March 15, 2023",
                    },
                    {
                      title: "Flood Response Protocols",
                      type: "PDF Guide",
                      duration: "45 minutes",
                      status: "Completed",
                      date: "April 2, 2023",
                    },
                    {
                      title: "Emergency Communication Systems",
                      type: "Interactive Module",
                      duration: "1.5 hours",
                      status: "In Progress",
                      date: "Started April 28, 2023",
                    },
                    {
                      title: "Psychological First Aid",
                      type: "Video Course",
                      duration: "3 hours",
                      status: "Not Started",
                      date: "Due by May 15, 2023",
                    },
                  ].map((course, index) => (
                    <div key={index} className="flex items-start p-4 border rounded-md">
                      <div
                        className={`p-2 rounded-md mr-3 ${
                          course.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : course.status === "In Progress"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {course.status === "Completed" ? (
                          <Award className="h-5 w-5" />
                        ) : course.status === "In Progress" ? (
                          <FileText className="h-5 w-5" />
                        ) : (
                          <FileText className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{course.title}</h3>
                          <Badge
                            className={`${
                              course.status === "Completed"
                                ? "bg-green-500"
                                : course.status === "In Progress"
                                  ? "bg-blue-500"
                                  : "bg-gray-500"
                            }`}
                          >
                            {course.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          {course.type} • {course.duration}
                        </p>
                        <p className="text-sm text-gray-500">{course.date}</p>
                      </div>
                      <Button size="sm" variant="outline" className="ml-2">
                        {course.status === "Completed"
                          ? "Review"
                          : course.status === "In Progress"
                            ? "Continue"
                            : "Start"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>Your disaster response qualifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Basic First Aid", date: "Valid until March 2025", icon: Award },
                    { name: "CPR Certified", date: "Valid until June 2024", icon: Award },
                    { name: "Emergency Response", date: "Valid until December 2024", icon: Award },
                  ].map((cert, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
                      <cert.icon className="h-5 w-5 text-[#29ABE2] mr-2" />
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-xs text-gray-500">{cert.date}</p>
                      </div>
                    </div>
                  ))}

                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Recommended Certifications</h4>
                    <div className="space-y-2">
                      {["Disaster Mental Health", "Shelter Operations", "Advanced Water Rescue"].map((rec, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-[#FF9933] rounded-full mr-2"></div>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communications">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communications from coordinators and team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      sender: "John Smith",
                      role: "Regional Coordinator",
                      time: "Today, 9:15 AM",
                      message:
                        "Attention all volunteers: We're expecting heavy rainfall in the Riverside District tonight. Please be prepared for possible deployment for flood response.",
                      urgent: true,
                    },
                    {
                      sender: "Maria Rodriguez",
                      role: "Team Leader",
                      time: "Yesterday, 4:30 PM",
                      message:
                        "Great job with the supply distribution yesterday! We were able to help over 50 families. Thank you for your dedication.",
                      urgent: false,
                    },
                    {
                      sender: "Disaster Management HQ",
                      role: "System Notification",
                      time: "April 29, 2:00 PM",
                      message:
                        "Your training module 'Emergency Communication Systems' is due by May 15. Please complete it at your earliest convenience.",
                      urgent: false,
                    },
                  ].map((message, index) => (
                    <Card key={index} className={`border-l-4 ${message.urgent ? "border-red-500" : "border-gray-200"}`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <div className="bg-gray-100 p-2 rounded-full mr-3">
                              {message.urgent ? (
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                              ) : (
                                <MessageSquare className="h-5 w-5 text-[#29ABE2]" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{message.sender}</h3>
                                {message.urgent && <Badge className="ml-2 bg-red-500">Urgent</Badge>}
                              </div>
                              <p className="text-xs text-gray-500">
                                {message.role} • {message.time}
                              </p>
                              <p className="text-sm mt-2">{message.message}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            Reply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Chat</CardTitle>
                  <CardDescription>Connect with your volunteer team</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Open Team Chat</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contacts</CardTitle>
                  <CardDescription>Important contacts for your regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "John Smith", role: "Regional Coordinator", phone: "555-123-4567" },
                      { name: "Emergency Dispatch", role: "24/7 Support", phone: "555-911-0000" },
                      { name: "Medical Support", role: "Field Medical Team", phone: "555-867-5309" },
                    ].map((contact, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-xs text-gray-500">{contact.role}</p>
                        </div>
                        <Link href={`tel:${contact.phone}`} className="text-[#29ABE2] text-sm font-medium">
                          {contact.phone}
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
