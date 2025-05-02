import type { Metadata } from "next"
import AdminDashboard from "@/components/admin/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard | Disaster Management",
  description: "Administrative dashboard for disaster management system",
}

export default function AdminDashboardPage() {
  return <AdminDashboard />
}
