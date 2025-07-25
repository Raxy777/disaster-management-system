"use client"

import type { ReactNode } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  AlertTriangle,
  BarChart3,
  Bell,
  FileText,
  Home,
  LifeBuoy,
  LogOut,
  Map,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "./admin-header"

interface AdminLayoutProps {
  children: ReactNode
  title: string
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const pathname = usePathname()
  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Alerts", href: "/admin/alerts", icon: Bell },
    { name: "Reports", href: "/admin/reports", icon: FileText },
    { name: "Resources", href: "/admin/resources", icon: LifeBuoy },
    { name: "Volunteers", href: "/admin/volunteers", icon: Users },
    { name: "Map", href: "/admin/map", icon: Map },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <AlertTriangle className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Admin Panel</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarContent>
          <div className="border-t p-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
              <span>Log out</span>
            </Button>
          </div>
        </Sidebar>
        <div className="flex flex-1 flex-col min-h-screen bg-background">
          <AdminHeader title={title} />
          <main className="flex-1 p-2 sm:p-4 md:p-6 overflow-y-auto w-full max-w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
