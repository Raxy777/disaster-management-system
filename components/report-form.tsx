"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Camera, MapPin, Upload, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function ReportForm() {
  const { toast } = useToast()
  const [location, setLocation] = useState("")
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleGetLocation = () => {
    setIsGettingLocation(true)

    // Simulate getting location
    setTimeout(() => {
      setLocation("34.0522° N, 118.2437° W")
      setIsGettingLocation(false)

      toast({
        title: "Location detected",
        description: "Your current location has been added to the report.",
      })
    }, 1500)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // Here we're just creating a local URL for preview
      const imageUrl = URL.createObjectURL(file)
      setUploadedImage(imageUrl)

      toast({
        title: "Image uploaded",
        description: "Your image has been added to the report.",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate form submission
    toast({
      title: "Report submitted",
      description: "Thank you for your report. Emergency services have been notified.",
    })
  }

  return (
    <section className="py-12">
      <div className="container max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Report a Disaster</h1>
          <p className="mt-2 text-muted-foreground">
            Provide details about the disaster or emergency situation in your area
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Disaster Report Form</CardTitle>
            <CardDescription>Your information helps emergency services respond effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="Enter your full name" required />
                </div>

                <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" type="tel" placeholder="Enter your phone number" required />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email address" />
                </div>

                <div>
                  <Label>Disaster Type</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select disaster type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="earthquake">Earthquake</SelectItem>
                      <SelectItem value="flood">Flood</SelectItem>
                      <SelectItem value="wildfire">Wildfire</SelectItem>
                      <SelectItem value="cyclone">Cyclone/Hurricane</SelectItem>
                      <SelectItem value="landslide">Landslide</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Severity Level</Label>
                  <RadioGroup defaultValue="medium" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="severity-low" />
                      <Label htmlFor="severity-low">Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="severity-medium" />
                      <Label htmlFor="severity-medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="severity-high" />
                      <Label htmlFor="severity-high">High</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Location</Label>
                  <div className="flex gap-2">
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter location or use GPS"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" onClick={handleGetLocation} disabled={isGettingLocation}>
                      {isGettingLocation ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <MapPin className="h-4 w-4" />
                      )}
                      <span className="ml-2">Get Location</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the situation in detail"
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div>
                  <Label>Upload Images</Label>
                  <div className="mt-2">
                    {uploadedImage ? (
                      <div className="relative mb-4 h-40 w-full overflow-hidden rounded-md border">
                        <Image
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Uploaded disaster image"
                          fill
                          className="object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2"
                          onClick={() => setUploadedImage(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed">
                        <label
                          htmlFor="image-upload"
                          className="flex cursor-pointer flex-col items-center justify-center"
                        >
                          <div className="mb-2 rounded-full bg-muted p-2">
                            <Camera className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <span className="text-sm font-medium">Click to upload</span>
                          <span className="mt-1 text-xs text-muted-foreground">JPG, PNG or GIF (max. 5MB)</span>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Are people in immediate danger?</Label>
                  <RadioGroup defaultValue="no" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="danger-yes" />
                      <Label htmlFor="danger-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="danger-no" />
                      <Label htmlFor="danger-no">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unsure" id="danger-unsure" />
                      <Label htmlFor="danger-unsure">Unsure</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button type="submit" className="bg-[#0077B6] hover:bg-[#0077B6]/90">
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Report
                </Button>
                <Button type="reset" variant="outline">
                  Clear Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
