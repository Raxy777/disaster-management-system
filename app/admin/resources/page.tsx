import { AdminLayout } from "@/components/admin/admin-layout"
import { ResourceManagement } from "@/components/admin/resource-management"

export default function ResourcesPage() {
  return (
    <AdminLayout title="Resource Management">
      <ResourceManagement />
    </AdminLayout>
  )
}
