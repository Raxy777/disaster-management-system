import { AdminLayout } from "@/components/admin/admin-layout"
import { VolunteerManagement } from "@/components/admin/volunteer-management"

export default function VolunteersPage() {
  return (
    <AdminLayout title="Volunteer Management">
      <VolunteerManagement />
    </AdminLayout>
  )
}
