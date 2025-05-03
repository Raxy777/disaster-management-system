"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, AlertTriangle, Bell, LogOut, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Disaster Types", href: "/disaster-types" },
  { name: "Real-Time Alerts", href: "/alerts" },
  { name: "Emergency Resources", href: "/resources" },
  { name: "Report a Disaster", href: "/report" },
  { name: "Volunteer & Donate", href: "/volunteer-donate" },
  { name: "News", href: "/news" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">HopeNet</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-5 lg:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/alerts" className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF9933] text-[10px] text-white">
              3
            </span>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={user.role === "admin" ? "/admin/profile" : "/volunteer/profile"}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={user.role === "admin" ? "/admin/dashboard" : "/volunteer/dashboard"}>
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}

          <Button className="md:hidden" variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn("fixed inset-0 top-16 z-50 bg-[#29ABE2] md:hidden", isOpen ? "block" : "hidden")}>
        <div className="container border-t border-[#1d8eb8] py-4">
          <Button className="absolute right-4 top-4" variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5 text-white" />
            <span className="sr-only">Close menu</span>
          </Button>
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-white transition-colors hover:text-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href={user.role === "admin" ? "/admin/profile" : "/volunteer/profile"}
                  className="flex items-center gap-2 text-base font-medium text-white transition-colors hover:text-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <UserIcon className="h-4 w-4" />
                  Profile
                </Link>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 justify-start text-white bg-[#29ABE2] border-white hover:bg-white/10"
                  onClick={() => {
                    setIsOpen(false)
                    logout()
                  }}
                >
                  <LogOut className=" h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              <Button variant="outline" className="text-white bg-[#29ABE2] border-white hover:bg-white/10" asChild>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
