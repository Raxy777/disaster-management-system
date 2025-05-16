"use client"

import type React from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { AlertTriangle, Eye, EyeOff, Info, KeyRound, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<UserRole>("user")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(username, password, userType)

      if (success) {
        // Redirect based on user role
        if (userType === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/volunteer/dashboard")
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-8 flex items-center gap-2">
        <AlertTriangle className="h-8 w-8 text-[#0077B6]" />
        <span className="text-2xl font-bold">Suraksha Setu</span>
      </div>

      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Access your account to manage disaster response</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <Tabs defaultValue="user" className="w-full" onValueChange={(value) => setUserType(value as UserRole)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <Alert className="mt-4 border-[#FF9933] bg-amber-50">
              <Info className="h-4 w-4 text-[#FF9933]" />
              <AlertTitle>Demo Credentials</AlertTitle>
              <AlertDescription className="mt-2 text-xs">
                {userType === "admin" ? (
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium">Username:</span> admin
                    </p>
                    <p>
                      <span className="font-medium">Password:</span> admin123
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium">Username:</span> user
                    </p>
                    <p>
                      <span className="font-medium">Password:</span> user123
                    </p>
                  </div>
                )}
              </AlertDescription>
            </Alert>

            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    className="pl-9"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-9 pr-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-9 w-9"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#0077B6] hover:bg-[#0077B6]/90" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Signing in
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t p-6 text-center">
          <div className="text-xs text-muted-foreground">
            <p>By signing in, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
          <div className="text-xs">
            <Link href="/" className="text-[#0077B6] hover:underline">
              Return to Home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
