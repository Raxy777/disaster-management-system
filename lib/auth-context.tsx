"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Define user types
export type UserRole = "admin" | "user" | null
export type UserData = {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
} | null

type AuthContextType = {
  user: UserData
  loading: boolean
  login: (username: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  updateUserProfile: (data: Partial<UserData>) => void
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // In a real app, this would validate the session with the server
        const storedUser = localStorage.getItem("disaster_response_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Session validation error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  // Login function
  const login = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    setLoading(true)

    try {
      // Demo login logic - in a real app, this would be an API call
      if (role === "admin" && username === "admin" && password === "admin123") {
        const userData: UserData = {
          id: "admin-1",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          avatar: "/placeholder.svg?height=128&width=128",
        }

        setUser(userData)
        localStorage.setItem("disaster_response_user", JSON.stringify(userData))

        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard",
        })

        return true
      } else if (role === "user" && username === "user" && password === "user123") {
        const userData: UserData = {
          id: "user-1",
          name: "Alex Johnson",
          email: "alex@example.com",
          role: "user",
          avatar: "/placeholder.svg?height=128&width=128",
        }

        setUser(userData)
        localStorage.setItem("disaster_response_user", JSON.stringify(userData))

        toast({
          title: "User login successful",
          description: "Welcome to your volunteer dashboard",
        })

        return true
      }

      toast({
        title: "Login failed",
        description: "Invalid username or password. Try the demo credentials.",
        variant: "destructive",
      })

      return false
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    // Clear user data
    setUser(null)
    localStorage.removeItem("disaster_response_user")

    // Show toast notification
    toast({
      title: "Logged out successfully",
      description: "You have been securely logged out of your account",
    })

    // Redirect to login page
    router.push("/login")
  }

  // Update user profile
  const updateUserProfile = (data: Partial<UserData>) => {
    if (!user) return

    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    localStorage.setItem("disaster_response_user", JSON.stringify(updatedUser))

    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully",
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUserProfile }}>{children}</AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
