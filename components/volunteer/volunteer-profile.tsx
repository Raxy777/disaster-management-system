"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, Check, Eye, EyeOff, Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"

export function VolunteerProfilePage() {
  const { user, updateUserProfile } = useAuth()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState(false)

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "555-987-6543", // Example data
    address: "123 Main St, Anytown, USA", // Example data
    emergencyContact: "Jane Doe (555-123-4567)", // Example data
    skills: "First Aid, Search and Rescue, Communication", // Example data
    availability: "weekends", // Example data
    bio: "Dedicated volunteer with 3 years of experience in disaster response and community support.", // Example data
  })

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (value: string, name: string) => {
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      updateUserProfile({
        name: profileForm.name,
        email: profileForm.email,
      })

      setProfileSuccess(true)
      setIsLoading(false)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setProfileSuccess(false)
      }, 3000)
    }, 1000)
  }

  // Handle password update
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return // Show error (would add proper validation in a real app)
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would call an API to update the password
      setPasswordSuccess(true)
      setIsLoading(false)

      // Reset form and success message after 3 seconds
      setTimeout(() => {
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
        setPasswordSuccess(false)
      }, 3000)
    }, 1000)
  }

  // If no user is logged in, redirect to login
  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <>
      <Navbar />

      <main className="container mx-auto p-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/volunteer/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="mb-8 flex flex-col items-start md:flex-row md:items-center">
            <div className="mb-4 mr-6 md:mb-0">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="mt-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Change Avatar
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your volunteer profile information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                {profileSuccess && (
                  <Alert className="mb-6 border-green-500 bg-green-50 text-green-700">
                    <Check className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Your profile information has been updated successfully.</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleProfileUpdate}>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" value={profileForm.name} onChange={handleProfileChange} required />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={profileForm.phone} onChange={handleProfileChange} />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" value={profileForm.address} onChange={handleProfileChange} />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        name="emergencyContact"
                        value={profileForm.emergencyContact}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="skills">Skills & Certifications</Label>
                      <Textarea
                        id="skills"
                        name="skills"
                        value={profileForm.skills}
                        onChange={handleProfileChange}
                        rows={3}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="availability">Availability</Label>
                      <Select
                        value={profileForm.availability}
                        onValueChange={(value) => handleSelectChange(value, "availability")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekdays">Weekdays</SelectItem>
                          <SelectItem value="weekends">Weekends</SelectItem>
                          <SelectItem value="evenings">Evenings</SelectItem>
                          <SelectItem value="anytime">Anytime</SelectItem>
                          <SelectItem value="on-call">On-Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" value={profileForm.bio} onChange={handleProfileChange} rows={4} />
                    </div>
                  </div>

                  <Button type="submit" className="mt-6" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to maintain account security</CardDescription>
              </CardHeader>
              <CardContent>
                {passwordSuccess && (
                  <Alert className="mb-6 border-green-500 bg-green-50 text-green-700">
                    <Check className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Your password has been updated successfully.</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handlePasswordUpdate}>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">{showCurrentPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Alert variant="destructive" className="bg-amber-50 text-amber-800 border-amber-200">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Password Requirements</AlertTitle>
                        <AlertDescription>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Minimum 8 characters long</li>
                            <li>Include at least one uppercase letter</li>
                            <li>Include at least one number</li>
                            <li>Include at least one special character</li>
                          </ul>
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>

                  <Button type="submit" className="mt-6" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}
