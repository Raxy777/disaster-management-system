import { AdminLayout } from "@/components/admin/admin-layout"
import { SettingsPanel } from "@/components/admin/settings-panel"

export default function SettingsPage() {
  return (
    <AdminLayout title="Settings">
      <SettingsPanel />
    </AdminLayout>
  )
}
