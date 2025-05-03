import type { Metadata } from "next"
import { AdminProfilePage } from "@/components/admin/admin-profile"

export const metadata: Metadata = {
  title: "Admin Profile | Disaster Management",
  description: "Manage your admin profile and account settings",
}

export default function AdminProfile() {
  return <AdminProfilePage />
}
