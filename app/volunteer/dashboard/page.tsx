import type { Metadata } from "next"
import VolunteerDashboard from "@/components/volunteer/volunteer-dashboard"

export const metadata: Metadata = {
  title: "Volunteer Dashboard | Disaster Management",
  description: "Access your volunteer tasks, schedules, and assigned regions",
}

export default function VolunteerDashboardPage() {
  return <VolunteerDashboard />
}
