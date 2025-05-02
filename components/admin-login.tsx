"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, Eye, EyeOff, KeyRound, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export function AdminLogin() {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      setVerificationSent(true)

      toast({
        title: "Verification code sent",
        description: "Please check your email or phone for the verification code.",
      })
    }, 1500)
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate verification process
    setTimeout(() => {
      setIsLoading(false)

      // Redirect to admin dashboard
      window.location.href = "/admin/dashboard"
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-8 flex items-center gap-2">
        <AlertTriangle className="h-8 w-8 text-[#29ABE2]" />
        <span className="text-2xl font-bold">DisasterResponse</span>
      </div>

      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>Secure login for authorized personnel only</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          {!verificationSent ? (
            <Tabs defaultValue="credentials" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="credentials">Credentials</TabsTrigger>
                <TabsTrigger value="sso">Single Sign-On</TabsTrigger>
              </TabsList>
              <TabsContent value="credentials">
                <form onSubmit={handleLogin} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="username" placeholder="Enter your username" className="pl-9" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/admin/reset-password" className="text-xs text-[#29ABE2] hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-9 pr-9"
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
                  <Button type="submit" className="w-full bg-[#29ABE2] hover:bg-[#29ABE2]/90" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Authenticating
                      </>
                    ) : (
                      "Continue to Verification"
                    )}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="sso">
                <div className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">Sign in with your organization's identity provider</p>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Redirecting to SSO provider",
                        description: "You will be redirected to your organization's login page.",
                      })
                    }}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Continue with SSO
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="verification">Verification Code</Label>
                <Input
                  id="verification"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  A verification code has been sent to your registered email and phone
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#29ABE2] hover:bg-[#29ABE2]/90"
                disabled={isLoading || verificationCode.length !== 6}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Verifying
                  </>
                ) : (
                  "Verify and Login"
                )}
              </Button>
              <Button type="button" variant="link" className="w-full" onClick={() => setVerificationSent(false)}>
                Back to Login
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t p-6 text-center">
          <div className="text-xs text-muted-foreground">
            <p>This is a secure system for authorized personnel only.</p>
            <p>Unauthorized access attempts will be logged and reported.</p>
          </div>
          <div className="text-xs">
            <Link href="/" className="text-[#29ABE2] hover:underline">
              Return to Public Site
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
