import { AdminLayout } from "@/components/admin/admin-layout"
import { DisasterMap } from "@/components/admin/disaster-map"

export default function MapPage() {
  return (
    <AdminLayout title="Disaster Map">
      <DisasterMap />
    </AdminLayout>
  )
}
