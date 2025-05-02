"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminSidebar } from "./admin-sidebar"
import { AdminHeader } from "./admin-header"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { AlertTriangle, CheckCircle, Clock, AlertCircle } from "lucide-react"

// Mock data for charts
const disasterData = [
  { name: "Jan", count: 4 },
  { name: "Feb", count: 3 },
  { name: "Mar", count: 5 },
  { name: "Apr", count: 7 },
  { name: "May", count: 2 },
]

const disasterTypeData = [
  { name: "Flood", value: 35 },
  { name: "Fire", value: 25 },
  { name: "Earthquake", value: 15 },
  { name: "Hurricane", value: 20 },
  { name: "Landslide", value: 5 },
]

const COLORS = ["#29ABE2", "#FF9933", "#808080", "#e74c3c", "#8e44ad"]

const responseTimeData = [
  { name: "Jan", time: 45 },
  { name: "Feb", time: 38 },
  { name: "Mar", time: 42 },
  { name: "Apr", time: 30 },
  { name: "May", time: 25 },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar activePage="dashboard" />
      
      <div className="flex-1">
        <AdminHeader title="Admin Dashboard" />
        
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Disasters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#29ABE2]">12</div>
                <p className="text-xs text-gray-500">+2 from last month</p>
                <div className="mt-4 flex items-center text-xs text-red-500">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span>3 critical situations</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#29ABE2]">248</div>
                <p className="text-xs text-gray-500">+15% from last month</p>
                <div className="mt-4 flex items-center text-xs text-green-500">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>All teams deployed</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#29ABE2]">25 min</div>
                <p className="text-xs text-gray-500">-5 min from last month</p>
                <div className="mt-4 flex items-center text-xs text-green-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Improved efficiency</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Resources Deployed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#29ABE2]">85%</div>
                <p className="text-xs text-gray-500">Of total inventory</p>
                <div className="mt-4 flex items-center text-xs text-amber-500">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>Restock needed soon</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Disaster Incidents</CardTitle>
                    <CardDescription>Monthly disaster incidents reported</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={disasterData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#29ABE2" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Disaster Types</CardTitle>
                    <CardDescription>Distribution by disaster category</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={disasterTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {disasterTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
