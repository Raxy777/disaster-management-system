import type { Metadata } from "next"
import { VolunteerProfilePage } from "@/components/volunteer/volunteer-profile"

export const metadata: Metadata = {
  title: "Volunteer Profile | Disaster Management",
  description: "Manage your volunteer profile and account settings",
}

export default function VolunteerProfile() {
  return <VolunteerProfilePage />
}
