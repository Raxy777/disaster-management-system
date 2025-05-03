import { AdminLayout } from "@/components/admin/admin-layout"
import { AlertManagement } from "@/components/admin/alert-management"

export default function AlertsPage() {
  return (
    <AdminLayout title="Alert Management">
      <AlertManagement />
    </AdminLayout>
  )
}
