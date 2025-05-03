import type { Metadata } from "next"
import VolunteerDashboard from "@/components/volunteer/volunteer-dashboard"

export const metadata: Metadata = {
  title: "Volunteer Dashboard | Disaster Management",
  description: "Dashboard for volunteers to manage tasks and view assignments",
}

export default function VolunteerDashboardPage() {
  return <VolunteerDashboard />
}
