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
import { Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"

export function ContactPage() {
  const { toast } = useToast()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    toast({
      title: "Message sent",
      description: "Thank you for your message. We will get back to you soon.",
    })
  }

  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Contact Us</h1>
          <p className="mt-2 text-muted-foreground">
            Get in touch with our team for inquiries, support, or to report a disaster
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Reach out to us through various channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[#0077B6]/10 p-2 text-[#0077B6]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-muted-foreground">General Inquiries: 1-800-DISASTER</p>
                    <p className="text-sm text-muted-foreground">Emergency Hotline: 1-800-EMERGENCY</p>
                    <p className="text-sm text-muted-foreground">Support: 1-800-SUPPORT</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[#0077B6]/10 p-2 text-[#0077B6]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">General Inquiries: info@surakshasetu.org</p>
                    <p className="text-sm text-muted-foreground">Support: support@surakshasetu.org</p>
                    <p className="text-sm text-muted-foreground">Media: media@surakshasetu.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[#0077B6]/10 p-2 text-[#0077B6]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Headquarters</h3>
                    <p className="text-sm text-muted-foreground">325, Sarat Chatterjee Road</p>
                    <p className="text-sm text-muted-foreground">Shibpur, Howrah-711102</p>
                    <p className="text-sm text-muted-foreground">West Bengal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Office Hours</CardTitle>
                <CardDescription>When you can reach our team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monday - Friday</span>
                    <span className="text-sm font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Saturday</span>
                    <span className="text-sm font-medium">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sunday</span>
                    <span className="text-sm font-medium">Closed</span>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Note: Our emergency hotline is available 24/7 for disaster-related emergencies.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Offices</CardTitle>
                <CardDescription>Find an office near you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium">Riverside County Office</h3>
                    <p className="text-xs text-muted-foreground">456 Riverside Drive, Riverside, CA 92501</p>
                    <p className="text-xs text-muted-foreground">Phone: 951-555-0123</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Mountain View Office</h3>
                    <p className="text-xs text-muted-foreground">789 Mountain Road, Mountain View, CA 94043</p>
                    <p className="text-xs text-muted-foreground">Phone: 650-555-0156</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Central City Office</h3>
                    <p className="text-xs text-muted-foreground">321 Central Avenue, Central City, CA 90001</p>
                    <p className="text-xs text-muted-foreground">Phone: 213-555-0189</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">Thank You!</h3>
                    <p className="mb-6 text-muted-foreground">
                      Your message has been sent successfully. We'll get back to you soon.
                    </p>
                    <Button onClick={() => setFormSubmitted(false)}>Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="Enter your first name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Enter your last name" required />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="Enter your phone number" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="support">Support Request</SelectItem>
                          <SelectItem value="volunteer">Volunteer Information</SelectItem>
                          <SelectItem value="donation">Donation Inquiry</SelectItem>
                          <SelectItem value="report">Report a Disaster</SelectItem>
                          <SelectItem value="media">Media Inquiry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Preferred Contact Method</Label>
                      <RadioGroup defaultValue="email" className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="contact-email" />
                          <Label htmlFor="contact-email">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="phone" id="contact-phone" />
                          <Label htmlFor="contact-phone">Phone</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="either" id="contact-either" />
                          <Label htmlFor="contact-either">Either</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Enter your message here" className="min-h-[150px]" required />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="privacy" className="h-4 w-4 rounded border-gray-300" required />
                      <Label htmlFor="privacy" className="text-sm">
                        I agree to the{" "}
                        <a href="/privacy" className="text-[#0077B6] hover:underline">
                          privacy policy
                        </a>{" "}
                        and consent to being contacted regarding my inquiry.
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-[#0077B6] hover:bg-[#0077B6]/90">
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Location Map</CardTitle>
                  <CardDescription>Find our headquarters and regional offices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[16/9] overflow-hidden rounded-md bg-muted">
                    {/* Map placeholder - would be replaced with actual map component */}
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Interactive map would render here showing office locations
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
