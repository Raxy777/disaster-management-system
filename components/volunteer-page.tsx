"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  Heart,
  HelpingHand,
  MapPin,
  Package,
  ShoppingBag,
  Users,
  Home,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

// Mock data for requirements
const requirementFeeds = [
  {
    id: 1,
    location: "Riverside County Flood Zone",
    time: "2 hours ago",
    requirements: [
      { item: "Bottled Water", quantity: "500 bottles", urgent: true },
      { item: "Blankets", quantity: "200", urgent: true },
      { item: "First Aid Kits", quantity: "50", urgent: false },
    ],
  },
  {
    id: 2,
    location: "Mountain View Wildfire Area",
    time: "5 hours ago",
    requirements: [
      { item: "N95 Masks", quantity: "1000", urgent: true },
      { item: "Eye Drops", quantity: "300 bottles", urgent: false },
      { item: "Burn Ointment", quantity: "100 tubes", urgent: true },
    ],
  },
  {
    id: 3,
    location: "Central City Earthquake Zone",
    time: "1 day ago",
    requirements: [
      { item: "Tents", quantity: "50", urgent: true },
      { item: "Sleeping Bags", quantity: "200", urgent: false },
      { item: "Portable Toilets", quantity: "20", urgent: true },
    ],
  },
]

// Mock data for volunteer opportunities
const volunteerOpportunities = [
  {
    id: 1,
    title: "Flood Relief Volunteer",
    location: "Riverside County",
    date: "May 5-10, 2025",
    slots: "25/50 filled",
    skills: ["Swimming", "First Aid", "Heavy Lifting"],
    description:
      "Help with evacuation, distribution of supplies, and cleanup efforts in flood-affected areas of Riverside County.",
  },
  {
    id: 2,
    title: "Medical Support Volunteer",
    location: "Mountain View",
    date: "May 7-14, 2025",
    slots: "10/30 filled",
    skills: ["Medical Training", "First Aid", "Counseling"],
    description:
      "Provide medical assistance and support to those affected by the wildfire in Mountain View. Medical professionals preferred.",
  },
  {
    id: 3,
    title: "Shelter Management Volunteer",
    location: "Central City",
    date: "May 3-17, 2025",
    slots: "15/40 filled",
    skills: ["Organization", "Communication", "Basic Cooking"],
    description:
      "Help manage shelters for those displaced by the earthquake in Central City. Duties include registration, food distribution, and general support.",
  },
  {
    id: 4,
    title: "Supply Distribution Volunteer",
    location: "Multiple Locations",
    date: "Ongoing",
    slots: "30/100 filled",
    skills: ["Driving", "Organization", "Heavy Lifting"],
    description:
      "Assist with the distribution of supplies to affected areas. Valid driver's license required for some positions.",
  },
]

// Mock data for partner organizations
const partnerOrganizations = [
  {
    id: 1,
    name: "Red Cross",
    logo: "/placeholder.svg?height=60&width=120",
    description: "Providing emergency assistance, disaster relief, and disaster preparedness education.",
    website: "https://www.redcross.org",
  },
  {
    id: 2,
    name: "Doctors Without Borders",
    logo: "/placeholder.svg?height=60&width=120",
    description: "Delivering emergency medical care to people affected by conflict, epidemics, and disasters.",
    website: "https://www.doctorswithoutborders.org",
  },
  {
    id: 3,
    name: "World Food Programme",
    logo: "/placeholder.svg?height=60&width=120",
    description: "Delivering food assistance in emergencies and working with communities to improve nutrition.",
    website: "https://www.wfp.org",
  },
  {
    id: 4,
    name: "UNICEF",
    logo: "/placeholder.svg?height=60&width=120",
    description: "Working to protect the rights and wellbeing of every child, especially during emergencies.",
    website: "https://www.unicef.org",
  },
]

export function VolunteerPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("volunteer")
  const [donationAmount, setDonationAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Volunteer application submitted",
      description: "Thank you for volunteering! We will contact you soon.",
    })
  }

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Thank you for your donation",
      description: `Your donation of $${donationAmount || customAmount} will help those in need.`,
    })
  }

  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Volunteer & Donate</h1>
          <p className="mt-2 text-muted-foreground">
            Join our efforts to provide relief and support to disaster-affected communities
          </p>
        </div>

        <Tabs defaultValue="volunteer" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="volunteer">Become a Volunteer</TabsTrigger>
            <TabsTrigger value="donate">Donate</TabsTrigger>
            <TabsTrigger value="requirements">Live Requirements</TabsTrigger>
            <TabsTrigger value="partners">Partner Organizations</TabsTrigger>
          </TabsList>

          {/* Volunteer Registration Tab */}
          <TabsContent value="volunteer" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Volunteer Registration</CardTitle>
                  <CardDescription>Join our team of dedicated volunteers to help those in need</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVolunteerSubmit} className="space-y-4">
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
                        <Input id="phone" type="tel" placeholder="Enter your phone number" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Enter your address" required />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Enter your city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="Enter your ZIP code" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Availability</Label>
                      <RadioGroup defaultValue="weekends" className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weekdays" id="weekdays" />
                          <Label htmlFor="weekdays">Weekdays</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weekends" id="weekends" />
                          <Label htmlFor="weekends">Weekends</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="anytime" id="anytime" />
                          <Label htmlFor="anytime">Anytime (including emergencies)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Skills & Experience</Label>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="first-aid" className="h-4 w-4 rounded border-gray-300" />
                          <Label htmlFor="first-aid" className="text-sm">
                            First Aid / CPR
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="medical" className="h-4 w-4 rounded border-gray-300" />
                          <Label htmlFor="medical" className="text-sm">
                            Medical Professional
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="driving" className="h-4 w-4 rounded border-gray-300" />
                          <Label htmlFor="driving" className="text-sm">
                            Driving (Valid License)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="languages" className="h-4 w-4 rounded border-gray-300" />
                          <Label htmlFor="languages" className="text-sm">
                            Multiple Languages
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="cooking" className="h-4 w-4 rounded border-gray-300" />
                          <Label htmlFor="cooking" className="text-sm">
                            Cooking
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="construction" className="h-4 w-4 rounded border-gray-300" />
                          <Label htmlFor="construction" className="text-sm">
                            Construction
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="counseling" className="h-4 w-4 rounded border-gray-300" />
                          <Label htmlFor="counseling" className="text-sm">
                            Counseling
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="tech" className="h-4 w-4 rounded border-gray-300" />
                          <Label htmlFor="tech" className="text-sm">
                            Technical / IT
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Previous Volunteer Experience</Label>
                      <Textarea
                        id="experience"
                        placeholder="Briefly describe any previous volunteer experience"
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergency-contact">Emergency Contact</Label>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input id="emergency-contact-name" placeholder="Name" required />
                        <Input id="emergency-contact-phone" placeholder="Phone Number" required />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300" required />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="/terms" className="text-[#29ABE2] hover:underline">
                          volunteer terms and conditions
                        </Link>
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-[#29ABE2] hover:bg-[#29ABE2]/90">
                      <HelpingHand className="mr-2 h-4 w-4" />
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Why Volunteer?</CardTitle>
                    <CardDescription>Make a difference in your community</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-blue-50 p-2 text-[#29ABE2]">
                        <HelpingHand className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Direct Impact</h3>
                        <p className="text-sm text-muted-foreground">
                          Provide hands-on assistance to those affected by disasters
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-blue-50 p-2 text-[#29ABE2]">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Community Building</h3>
                        <p className="text-sm text-muted-foreground">
                          Connect with others who share your commitment to helping
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-blue-50 p-2 text-[#29ABE2]">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Flexible Scheduling</h3>
                        <p className="text-sm text-muted-foreground">
                          Volunteer when you can, with opportunities for all schedules
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-blue-50 p-2 text-[#29ABE2]">
                        <Heart className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Personal Growth</h3>
                        <p className="text-sm text-muted-foreground">
                          Develop new skills and gain valuable experience while helping others
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Already a Volunteer?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Access your volunteer dashboard to view your schedule, tasks, and impact.
                      </p>
                      <Button className="w-full" asChild>
                        <Link href="/volunteer/dashboard">
                          <Users className="mr-2 h-4 w-4" />
                          Go to Volunteer Dashboard
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <h2 className="mt-8 text-2xl font-bold">Current Volunteer Opportunities</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {volunteerOpportunities.map((opportunity) => (
                <Card key={opportunity.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[#29ABE2]">{opportunity.slots}</Badge>
                      <span className="text-sm text-muted-foreground">{opportunity.date}</span>
                    </div>
                    <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {opportunity.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                    <div className="mt-4">
                      <p className="mb-2 text-sm font-medium">Required Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {opportunity.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Apply Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Donate Tab */}
          <TabsContent value="donate" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Make a Donation</CardTitle>
                  <CardDescription>Support our disaster relief efforts with a donation</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonationSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label>Donation Type</Label>
                      <RadioGroup defaultValue="monetary" className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monetary" id="monetary" />
                          <Label htmlFor="monetary">Monetary Donation</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="supplies" id="supplies" />
                          <Label htmlFor="supplies">Supplies Donation</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label>Donation Amount</Label>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {["10", "25", "50", "100"].map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={donationAmount === amount ? "default" : "outline"}
                            className={donationAmount === amount ? "bg-[#29ABE2] hover:bg-[#29ABE2]/90" : ""}
                            onClick={() => {
                              setDonationAmount(amount)
                              setCustomAmount("")
                            }}
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Custom Amount"
                          className="pl-9"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value)
                            setDonationAmount("")
                          }}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="first-name-donate">First Name</Label>
                          <Input id="first-name-donate" placeholder="Enter your first name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name-donate">Last Name</Label>
                          <Input id="last-name-donate" placeholder="Enter your last name" required />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email-donate">Email</Label>
                          <Input id="email-donate" type="email" placeholder="Enter your email" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone-donate">Phone Number</Label>
                          <Input id="phone-donate" type="tel" placeholder="Enter your phone number" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <Label>Payment Method</Label>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="credit-card" name="payment" className="h-4 w-4" defaultChecked />
                          <Label htmlFor="credit-card" className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" /> Credit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="paypal" name="payment" className="h-4 w-4" />
                          <Label htmlFor="paypal" className="flex items-center gap-2">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 4.643-5.813 4.643h-2.189c-.11 0-.216.022-.302.066a.535.535 0 0 0-.206.192.506.506 0 0 0-.076.272l-.895 5.687-.25.158a.3.3 0 0 1-.296.245h-3.5c-.518 0-.8-.382-.724-.9l1.03-6.53c.083-.519.53-.9 1.054-.9h2.19c4.297 0 7.148-1.746 8.132-6.797.28-1.43.135-2.594-.533-3.475z" />
                            </svg>
                            PayPal
                          </Label>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="recurring" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="recurring" className="text-sm">
                        Make this a monthly recurring donation
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-[#29ABE2] hover:bg-[#29ABE2]/90">
                      <Heart className="mr-2 h-4 w-4" />
                      {donationAmount || customAmount
                        ? `Donate $${donationAmount || customAmount}`
                        : "Complete Donation"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Donate Supplies</CardTitle>
                    <CardDescription>Physical items needed for disaster relief</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Most Needed Items:</h3>
                      <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                        <li>Bottled water</li>
                        <li>Non-perishable food</li>
                        <li>Blankets and bedding</li>
                        <li>Personal hygiene items</li>
                        <li>First aid supplies</li>
                        <li>Baby supplies (diapers, formula)</li>
                        <li>Cleaning supplies</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Drop-off Locations:</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="font-medium">Central City Community Center</p>
                          <p className="text-muted-foreground">123 Main St, Central City</p>
                          <p className="text-muted-foreground">Mon-Fri: 9am-5pm, Sat: 10am-2pm</p>
                        </div>
                        <div>
                          <p className="font-medium">Riverside Relief Center</p>
                          <p className="text-muted-foreground">456 River Rd, Riverside</p>
                          <p className="text-muted-foreground">Mon-Sat: 8am-6pm</p>
                        </div>
                        <div>
                          <p className="font-medium">Mountain View Fire Station</p>
                          <p className="text-muted-foreground">789 Mountain Ave, Mountain View</p>
                          <p className="text-muted-foreground">24/7 Drop-off Available</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/resources/drop-off-locations">
                        <MapPin className="mr-2 h-4 w-4" />
                        View All Drop-off Locations
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Your Impact</CardTitle>
                    <CardDescription>How your donation helps</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-blue-50 p-2 text-[#29ABE2]">
                          <Package className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">$25</span> provides emergency food and water for one person
                            for three days
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-blue-50 p-2 text-[#29ABE2]">
                          <ShoppingBag className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">$50</span> supplies a family with essential hygiene kits
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-blue-50 p-2 text-[#29ABE2]">
                          <Home className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">$100</span> provides temporary shelter for a displaced family
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-blue-50 p-2 text-[#29ABE2]">
                          <Heart className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">$250</span> funds medical supplies for emergency response
                            teams
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Live Requirements Tab */}
          <TabsContent value="requirements" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold">Live Requirement Feeds</h2>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Full Requirements List
              </Button>
            </div>

            <div className="space-y-6">
              {requirementFeeds.map((feed) => (
                <Card key={feed.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{feed.location}</CardTitle>
                      <span className="text-sm text-muted-foreground">{feed.time}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="pb-2 text-left font-medium">Item</th>
                              <th className="pb-2 text-left font-medium">Quantity Needed</th>
                              <th className="pb-2 text-left font-medium">Priority</th>
                              <th className="pb-2 text-left font-medium">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {feed.requirements.map((req, index) => (
                              <tr key={index} className="border-b last:border-0">
                                <td className="py-3">{req.item}</td>
                                <td className="py-3">{req.quantity}</td>
                                <td className="py-3">
                                  <Badge className={req.urgent ? "bg-red-500" : "bg-yellow-500"}>
                                    {req.urgent ? "Urgent" : "Normal"}
                                  </Badge>
                                </td>
                                <td className="py-3">
                                  <Button size="sm" variant="outline">
                                    Donate
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="link" className="text-[#29ABE2]" asChild>
                          <Link href={`/requirements/${feed.id}`}>
                            View Full Requirements <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Volunteer for Specific Needs</CardTitle>
                <CardDescription>Match your skills with current requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <Badge className="w-fit bg-[#29ABE2]">Medical</Badge>
                        <CardTitle className="text-base">Medical Professionals</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          Doctors, nurses, and EMTs needed for emergency medical response in affected areas.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm" className="w-full">
                          Volunteer
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <Badge className="w-fit bg-[#29ABE2]">Logistics</Badge>
                        <CardTitle className="text-base">Supply Distribution</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          Help organize and distribute supplies to affected communities and shelters.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm" className="w-full">
                          Volunteer
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <Badge className="w-fit bg-[#29ABE2]">Support</Badge>
                        <CardTitle className="text-base">Shelter Assistance</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          Assist with shelter operations, including registration, food service, and general support.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm" className="w-full">
                          Volunteer
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Partner Organizations Tab */}
          <TabsContent value="partners" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold">Partner Organizations</h2>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Become a Partner
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {partnerOrganizations.map((org) => (
                <Card key={org.id}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-32 overflow-hidden">
                        <Image src={org.logo || "/placeholder.svg"} alt={org.name} fill className="object-contain" />
                      </div>
                      <div>
                        <CardTitle>{org.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{org.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={org.website} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Website
                      </Link>
                    </Button>
                    <Button size="sm">Partner Portal</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Partner Benefits</CardTitle>
                <CardDescription>Why partner with HopeNet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="font-semibold">For NGOs and Relief Organizations</h3>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                      <li>Access to real-time disaster data and affected areas</li>
                      <li>Coordination with other relief efforts</li>
                      <li>Volunteer management and deployment tools</li>
                      <li>Resource sharing and allocation platform</li>
                      <li>Joint funding opportunities</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">For Corporate Partners</h3>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                      <li>Corporate social responsibility opportunities</li>
                      <li>Employee volunteer programs</li>
                      <li>In-kind donation coordination</li>
                      <li>Brand visibility on relief efforts</li>
                      <li>Impact reporting and metrics</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Apply for Partnership</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
