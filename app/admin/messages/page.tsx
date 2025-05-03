import { AdminLayout } from "@/components/admin/admin-layout"
import { MessageCenter } from "@/components/admin/message-center"

export default function MessagesPage() {
  return (
    <AdminLayout title="Message Center">
      <MessageCenter />
    </AdminLayout>
  )
}
