"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowRight,
  Calendar,
  CreditCard,
  Download,
  ExternalLink,
  Heart,
  HelpingHand,
  Home,
  IndianRupee,
  MapPin,
  Package,
  ShoppingBag,
  Users
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

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
    logo: "/logos/red-cross.png",
    description: "Providing emergency assistance, disaster relief, and disaster preparedness education.",
    website: "https://www.redcross.org",
  },
  {
    id: 2,
    name: "Doctors Without Borders",
    logo: "/logos/doctors-without-borders.png",
    description: "Delivering emergency medical care to people affected by conflict, epidemics, and disasters.",
    website: "https://www.doctorswithoutborders.org",
  },
  {
    id: 3,
    name: "World Food Programme",
    logo: "/logos/world-food-programme.svg",
    description: "Delivering food assistance in emergencies and working with communities to improve nutrition.",
    website: "https://www.wfp.org",
  },
  {
    id: 4,
    name: "UNICEF",
    logo: "/logos/unicef.svg",
    description: "Working to protect the rights and wellbeing of every child, especially during emergencies.",
    website: "https://www.unicef.org",
  },
]

export function VolunteerPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("volunteer")
  const [donationAmount, setDonationAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [form, setForm] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    availability: string;
    skills: string[];
    experience: string;
    status: string;
  }>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    availability: "weekends",
    skills: [],
    experience: "",
    status: "pending",
  })
  const [submitting, setSubmitting] = useState(false)

  // Add state for donation form fields
  const [donationForm, setDonationForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    type: 'monetary',
    payment_method: 'credit_card',
    recurring: false,
    card_number: '',
    expiry: '',
    cvc: '',
  })
  const [donationSubmitting, setDonationSubmitting] = useState(false)

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Validate first name
    if (!validateName(form.first_name)) {
      toast({
        title: "Invalid first name",
        description: "Please enter a valid first name (at least 2 characters, letters only).",
        variant: "destructive",
      })
      setSubmitting(false)
      return
    }

    // Validate last name
    if (!validateName(form.last_name)) {
      toast({
        title: "Invalid last name",
        description: "Please enter a valid last name (at least 2 characters, letters only).",
        variant: "destructive",
      })
      setSubmitting(false)
      return
    }

    // Validate email
    if (!validateEmail(form.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      setSubmitting(false)
      return
    }

    // Validate phone number
    if (!validatePhoneNumber(form.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
        variant: "destructive",
      })
      setSubmitting(false)
      return
    }

    // Validate address
    if (!validateAddress(form.address)) {
      toast({
        title: "Invalid address",
        description: "Please enter a complete address (at least 10 characters).",
        variant: "destructive",
      })
      setSubmitting(false)
      return
    }

    // Validate city
    if (!validateCity(form.city)) {
      toast({
        title: "Invalid city",
        description: "Please enter a valid city name (letters only, at least 2 characters).",
        variant: "destructive",
      })
      setSubmitting(false)
      return
    }

    // Validate PIN code
    if (!validatePinCode(form.zip)) {
      toast({
        title: "Invalid PIN code",
        description: "Please enter a valid 6-digit Indian PIN code.",
        variant: "destructive",
      })
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          zip: form.zip,
          availability: form.availability,
          skills: form.skills,
          experience: form.experience,
          status: "pending", // Set default status as pending
        }),
      })
      if (res.ok) {
        toast({
          title: "Volunteer application submitted",
          description: "Thank you for volunteering! Your application is pending review. We will contact you soon.",
        })
        setForm({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          zip: "",
          availability: "weekends",
          skills: [],
          experience: "",
          status: "pending",
        })
      } else {
        const error = await res.json()
        toast({
          title: "Error submitting application",
          description: error.error || "An error occurred.",
          variant: "destructive",
        })
      }
    } catch (err: any) {
      toast({
        title: "Error submitting application",
        description: err.message || "An error occurred.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Input formatting functions
  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const cleanedValue = value.replace(/\D/g, '')
    // Add spaces every 4 digits
    return cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
  }

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const cleanedValue = value.replace(/\D/g, '')
    // Add slash after 2 digits
    if (cleanedValue.length >= 2) {
      return cleanedValue.substring(0, 2) + '/' + cleanedValue.substring(2, 4)
    }
    return cleanedValue
  }

  const formatCVC = (value: string) => {
    // Only allow digits and limit to 4 characters
    return value.replace(/\D/g, '').substring(0, 4)
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleanedValue = value.replace(/\D/g, '')
    // Limit to 10 digits for Indian phone numbers
    return cleanedValue.substring(0, 10)
  }

  const validatePhoneNumber = (phone: string) => {
    // Indian phone number validation: 10 digits starting with 6-9
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone.replace(/\D/g, ''))
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePinCode = (pin: string) => {
    // Indian PIN code validation: 6 digits
    const pinRegex = /^\d{6}$/
    return pinRegex.test(pin)
  }

  const validateName = (name: string) => {
    // Name should be at least 2 characters and contain only letters and spaces
    const nameRegex = /^[A-Za-z\s]{2,}$/
    return nameRegex.test(name.trim())
  }

  const validateAddress = (address: string) => {
    // Address should be at least 10 characters
    return address.trim().length >= 10
  }

  const validateCity = (city: string) => {
    // City should be at least 2 characters and contain only letters and spaces
    const cityRegex = /^[A-Za-z\s]{2,}$/
    return cityRegex.test(city.trim())
  }

  const formatPinCode = (value: string) => {
    // Only allow digits and limit to 6 characters
    return value.replace(/\D/g, '').substring(0, 6)
  }

  const validateCardNumber = (cardNumber: string) => {
    // Remove spaces and hyphens
    const cleanedNumber = cardNumber.replace(/[\s-]/g, '')
    // Check if it's 13-19 digits
    if (!/^\d{13,19}$/.test(cleanedNumber)) {
      return false
    }
    // Luhn algorithm validation
    let sum = 0
    let alternate = false
    for (let i = cleanedNumber.length - 1; i >= 0; i--) {
      let n = parseInt(cleanedNumber.charAt(i), 10)
      if (alternate) {
        n *= 2
        if (n > 9) n = (n % 10) + 1
      }
      sum += n
      alternate = !alternate
    }
    return sum % 10 === 0
  }

  const validateExpiryDate = (expiry: string) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
    if (!expiryRegex.test(expiry)) {
      return false
    }
    const [month, year] = expiry.split('/').map(Number)
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100
    const currentMonth = currentDate.getMonth() + 1
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false
    }
    return true
  }

  const validateCVC = (cvc: string) => {
    return /^\d{3,4}$/.test(cvc)
  }

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setDonationSubmitting(true)
    const amount = Number(donationAmount || customAmount)
    if (!amount || isNaN(amount) || amount <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid donation amount greater than ₹0.',
        variant: 'destructive',
      })
      setDonationSubmitting(false)
      return
    }

    if (amount > 1000000) {
      toast({
        title: 'Amount too large',
        description: 'Please contact us directly for donations above ₹10,00,000.',
        variant: 'destructive',
      })
      setDonationSubmitting(false)
      return
    }

    // Validate credit card details
    if (!validateCardNumber(donationForm.card_number)) {
      toast({
        title: 'Invalid card number',
        description: 'Please enter a valid credit card number.',
        variant: 'destructive',
      })
      setDonationSubmitting(false)
      return
    }

    if (!validateExpiryDate(donationForm.expiry)) {
      toast({
        title: 'Invalid expiry date',
        description: 'Please enter a valid expiry date (MM/YY) that is not expired.',
        variant: 'destructive',
      })
      setDonationSubmitting(false)
      return
    }

    if (!validateCVC(donationForm.cvc)) {
      toast({
        title: 'Invalid CVC',
        description: 'Please enter a valid 3 or 4 digit CVC code.',
        variant: 'destructive',
      })
      setDonationSubmitting(false)
      return
    }

    // Validate phone number if provided
    if (donationForm.phone && !validatePhoneNumber(donationForm.phone)) {
      toast({
        title: 'Invalid phone number',
        description: 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.',
        variant: 'destructive',
      })
      setDonationSubmitting(false)
      return
    }

    // Validate donor details
    if (!validateName(donationForm.first_name)) {
      toast({
        title: 'Invalid first name',
        description: 'Please enter a valid first name (at least 2 characters, letters only).',
        variant: 'destructive',
      })
      setDonationSubmitting(false)
      return
    }

    if (!validateName(donationForm.last_name)) {
      toast({
        title: 'Invalid last name',
        description: 'Please enter a valid last name (at least 2 characters, letters only).',
        variant: 'destructive',
      })
      setDonationSubmitting(false)
      return
    }

    if (!validateEmail(donationForm.email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      })
      setDonationSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: donationForm.first_name,
          last_name: donationForm.last_name,
          email: donationForm.email,
          phone: donationForm.phone,
          amount,
          type: donationForm.type,
          payment_method: donationForm.payment_method,
          recurring: donationForm.recurring,
        }),
      })
      if (res.ok) {
        toast({
          title: 'Thank you for your donation',
          description: `Your donation of ₹${amount} will help those in need.`,
        })
        setDonationAmount('')
        setCustomAmount('')
        setDonationForm({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          type: 'monetary',
          payment_method: 'credit_card',
          recurring: false,
          card_number: '',
          expiry: '',
          cvc: '',
        })
      } else {
        const error = await res.json()
        toast({
          title: 'Error submitting donation',
          description: error.error || 'An error occurred.',
          variant: 'destructive',
        })
      }
    } catch (err: any) {
      toast({
        title: 'Error submitting donation',
        description: err.message || 'An error occurred.',
        variant: 'destructive',
      })
    } finally {
      setDonationSubmitting(false)
    }
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
                        <Input
                          id="first-name"
                          value={form.first_name}
                          onChange={(e) => setForm(f => ({ ...f, first_name: e.target.value }))}
                          placeholder="Enter your first name"
                          className={!validateName(form.first_name) && form.first_name ? 'border-red-500' : ''}
                          required
                        />
                        {!validateName(form.first_name) && form.first_name && (
                          <p className="text-sm text-red-500">Please enter a valid first name (letters only, at least 2 characters)</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input
                          id="last-name"
                          value={form.last_name}
                          onChange={(e) => setForm(f => ({ ...f, last_name: e.target.value }))}
                          placeholder="Enter your last name"
                          className={!validateName(form.last_name) && form.last_name ? 'border-red-500' : ''}
                          required
                        />
                        {!validateName(form.last_name) && form.last_name && (
                          <p className="text-sm text-red-500">Please enter a valid last name (letters only, at least 2 characters)</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={form.email}
                          onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                          type="email"
                          placeholder="Enter your email"
                          className={!validateEmail(form.email) && form.email ? 'border-red-500' : ''}
                          required
                        />
                        {!validateEmail(form.email) && form.email && (
                          <p className="text-sm text-red-500">Please enter a valid email address</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={form.phone}
                          onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value)
                            setForm(f => ({ ...f, phone: formatted }))
                          }}
                          type="tel"
                          placeholder="Enter your 10-digit mobile number"
                          maxLength={10}
                          className={!validatePhoneNumber(form.phone) && form.phone ? 'border-red-500' : ''}
                          required
                        />
                        {!validatePhoneNumber(form.phone) && form.phone && (
                          <p className="text-sm text-red-500">Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={form.address}
                        onChange={(e) => setForm(f => ({ ...f, address: e.target.value }))}
                        placeholder="Enter your complete address"
                        className={!validateAddress(form.address) && form.address ? 'border-red-500' : ''}
                        required
                      />
                      {!validateAddress(form.address) && form.address && (
                        <p className="text-sm text-red-500">Please enter a complete address (at least 10 characters)</p>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={form.city}
                          onChange={(e) => setForm(f => ({ ...f, city: e.target.value }))}
                          placeholder="Enter your city"
                          className={!validateCity(form.city) && form.city ? 'border-red-500' : ''}
                          required
                        />
                        {!validateCity(form.city) && form.city && (
                          <p className="text-sm text-red-500">Please enter a valid city name (letters only, at least 2 characters)</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">PIN Code</Label>
                        <Input
                          id="zip"
                          value={form.zip}
                          onChange={(e) => {
                            const formatted = formatPinCode(e.target.value)
                            setForm(f => ({ ...f, zip: formatted }))
                          }}
                          placeholder="Enter your 6-digit PIN code"
                          maxLength={6}
                          className={!validatePinCode(form.zip) && form.zip ? 'border-red-500' : ''}
                          required
                        />
                        {!validatePinCode(form.zip) && form.zip && (
                          <p className="text-sm text-red-500">Please enter a valid 6-digit PIN code</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Availability</Label>
                      <RadioGroup
                        value={form.availability}
                        onValueChange={(value) => setForm(f => ({ ...f, availability: value }))}
                        className="flex flex-col space-y-1"
                      >
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
                          <input
                            type="checkbox"
                            id="first-aid"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={form.skills.includes("first-aid")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setForm(f => ({ ...f, skills: [...f.skills, "first-aid"] }))
                              } else {
                                setForm(f => ({ ...f, skills: f.skills.filter((s) => s !== "first-aid") }))
                              }
                            }}
                          />
                          <Label htmlFor="first-aid" className="text-sm">
                            First Aid / CPR
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="medical"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={form.skills.includes("medical")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setForm(f => ({ ...f, skills: [...f.skills, "medical"] }))
                              } else {
                                setForm(f => ({ ...f, skills: f.skills.filter((s) => s !== "medical") }))
                              }
                            }}
                          />
                          <Label htmlFor="medical" className="text-sm">
                            Medical Professional
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="driving"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={form.skills.includes("driving")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setForm(f => ({ ...f, skills: [...f.skills, "driving"] }))
                              } else {
                                setForm(f => ({ ...f, skills: f.skills.filter((s) => s !== "driving") }))
                              }
                            }}
                          />
                          <Label htmlFor="driving" className="text-sm">
                            Driving (Valid License)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="languages"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={form.skills.includes("languages")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setForm(f => ({ ...f, skills: [...f.skills, "languages"] }))
                              } else {
                                setForm(f => ({ ...f, skills: f.skills.filter((s) => s !== "languages") }))
                              }
                            }}
                          />
                          <Label htmlFor="languages" className="text-sm">
                            Multiple Languages
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="cooking"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={form.skills.includes("cooking")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setForm(f => ({ ...f, skills: [...f.skills, "cooking"] }))
                              } else {
                                setForm(f => ({ ...f, skills: f.skills.filter((s) => s !== "cooking") }))
                              }
                            }}
                          />
                          <Label htmlFor="cooking" className="text-sm">
                            Cooking
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="construction"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={form.skills.includes("construction")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setForm(f => ({ ...f, skills: [...f.skills, "construction"] }))
                              } else {
                                setForm(f => ({ ...f, skills: f.skills.filter((s) => s !== "construction") }))
                              }
                            }}
                          />
                          <Label htmlFor="construction" className="text-sm">
                            Construction
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="counseling"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={form.skills.includes("counseling")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setForm(f => ({ ...f, skills: [...f.skills, "counseling"] }))
                              } else {
                                setForm(f => ({ ...f, skills: f.skills.filter((s) => s !== "counseling") }))
                              }
                            }}
                          />
                          <Label htmlFor="counseling" className="text-sm">
                            Counseling
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="tech"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={form.skills.includes("tech")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setForm(f => ({ ...f, skills: [...f.skills, "tech"] }))
                              } else {
                                setForm(f => ({ ...f, skills: f.skills.filter((s) => s !== "tech") }))
                              }
                            }}
                          />
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
                        value={form.experience}
                        onChange={(e) => setForm(f => ({ ...f, experience: e.target.value }))}
                        placeholder="Briefly describe any previous volunteer experience"
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 rounded border-gray-300"
                        checked={true}
                        required
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="/terms" className="text-[#0077B6] hover:underline">
                          volunteer terms and conditions
                        </Link>
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-[#0077B6] hover:bg-[#0077B6]/90" disabled={submitting}>
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
                      <div className="rounded-full bg-blue-50 p-2 text-[#0077B6]">
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
                      <div className="rounded-full bg-blue-50 p-2 text-[#0077B6]">
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
                      <div className="rounded-full bg-blue-50 p-2 text-[#0077B6]">
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
                      <div className="rounded-full bg-blue-50 p-2 text-[#0077B6]">
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

            {/* <h2 className="mt-8 text-2xl font-bold">Current Volunteer Opportunities</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {volunteerOpportunities.map((opportunity) => (
                <Card key={opportunity.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[#0077B6]">{opportunity.slots}</Badge>
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
            </div> */}
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
                        {["500", "1000", "5000", "10000"].map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={donationAmount === amount ? "default" : "outline"}
                            className={donationAmount === amount ? "bg-[#0077B6] hover:bg-[#0077B6]/90" : ""}
                            onClick={() => {
                              setDonationAmount(amount)
                              setCustomAmount("")
                            }}
                          >
                            ₹{amount}
                          </Button>
                        ))}
                      </div>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          min="1"
                          max="1000000"
                          placeholder="Custom Amount"
                          className="pl-9"
                          value={customAmount}
                          onChange={(e) => {
                            const value = e.target.value
                            // Only allow positive numbers
                            if (value === '' || (Number(value) > 0 && Number(value) <= 1000000)) {
                              setCustomAmount(value)
                              setDonationAmount("")
                            }
                          }}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="first-name-donate">First Name</Label>
                          <Input 
                            id="first-name-donate" 
                            value={donationForm.first_name} 
                            onChange={e => setDonationForm(f => ({ ...f, first_name: e.target.value }))} 
                            placeholder="Enter your first name" 
                            className={!validateName(donationForm.first_name) && donationForm.first_name ? 'border-red-500' : ''}
                            required 
                          />
                          {!validateName(donationForm.first_name) && donationForm.first_name && (
                            <p className="text-sm text-red-500">Please enter a valid first name (letters only, at least 2 characters)</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name-donate">Last Name</Label>
                          <Input 
                            id="last-name-donate" 
                            value={donationForm.last_name} 
                            onChange={e => setDonationForm(f => ({ ...f, last_name: e.target.value }))} 
                            placeholder="Enter your last name" 
                            className={!validateName(donationForm.last_name) && donationForm.last_name ? 'border-red-500' : ''}
                            required 
                          />
                          {!validateName(donationForm.last_name) && donationForm.last_name && (
                            <p className="text-sm text-red-500">Please enter a valid last name (letters only, at least 2 characters)</p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email-donate">Email</Label>
                          <Input 
                            id="email-donate" 
                            type="email" 
                            value={donationForm.email} 
                            onChange={e => setDonationForm(f => ({ ...f, email: e.target.value }))} 
                            placeholder="Enter your email" 
                            className={!validateEmail(donationForm.email) && donationForm.email ? 'border-red-500' : ''}
                            required 
                          />
                          {!validateEmail(donationForm.email) && donationForm.email && (
                            <p className="text-sm text-red-500">Please enter a valid email address</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone-donate">Phone Number</Label>
                          <Input 
                            id="phone-donate" 
                            type="tel" 
                            value={donationForm.phone} 
                            onChange={(e) => {
                              const formatted = formatPhoneNumber(e.target.value)
                              setDonationForm(f => ({ ...f, phone: formatted }))
                            }}
                            placeholder="Enter your 10-digit mobile number (optional)" 
                            maxLength={10}
                            className={donationForm.phone && !validatePhoneNumber(donationForm.phone) ? 'border-red-500' : ''}
                          />
                          {donationForm.phone && !validatePhoneNumber(donationForm.phone) && (
                            <p className="text-sm text-red-500">Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9</p>
                          )}
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
                          <Input 
                            id="card-number" 
                            value={donationForm.card_number} 
                            onChange={(e) => {
                              const formatted = formatCardNumber(e.target.value)
                              setDonationForm(f => ({ ...f, card_number: formatted }))
                            }}
                            placeholder="1234 5678 9012 3456" 
                            maxLength={19}
                            className={!validateCardNumber(donationForm.card_number) && donationForm.card_number ? 'border-red-500' : ''}
                            required 
                          />
                          {!validateCardNumber(donationForm.card_number) && donationForm.card_number && (
                            <p className="text-sm text-red-500">Please enter a valid card number</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input 
                              id="expiry" 
                              value={donationForm.expiry} 
                              onChange={(e) => {
                                const formatted = formatExpiryDate(e.target.value)
                                setDonationForm(f => ({ ...f, expiry: formatted }))
                              }}
                              placeholder="MM/YY" 
                              maxLength={5}
                              className={!validateExpiryDate(donationForm.expiry) && donationForm.expiry ? 'border-red-500' : ''}
                              required 
                            />
                            {!validateExpiryDate(donationForm.expiry) && donationForm.expiry && (
                              <p className="text-sm text-red-500">Invalid or expired date</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input 
                              id="cvc" 
                              value={donationForm.cvc} 
                              onChange={(e) => {
                                const formatted = formatCVC(e.target.value)
                                setDonationForm(f => ({ ...f, cvc: formatted }))
                              }}
                              placeholder="123" 
                              maxLength={4}
                              className={!validateCVC(donationForm.cvc) && donationForm.cvc ? 'border-red-500' : ''}
                              required 
                            />
                            {!validateCVC(donationForm.cvc) && donationForm.cvc && (
                              <p className="text-sm text-red-500">Invalid CVC code</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="recurring" className="h-4 w-4 rounded border-gray-300" checked={donationForm.recurring} onChange={e => setDonationForm(f => ({ ...f, recurring: e.target.checked }))} />
                      <Label htmlFor="recurring" className="text-sm">
                        Make this a monthly recurring donation
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-[#0077B6] hover:bg-[#0077B6]/90" disabled={donationSubmitting}>
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
                        <div className="rounded-full bg-blue-50 p-2 text-[#0077B6]">
                          <Package className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">₹500</span> provides emergency food and water for one person
                            for three days
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-blue-50 p-2 text-[#0077B6]">
                          <ShoppingBag className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">₹1000</span> supplies a family with essential hygiene kits
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-blue-50 p-2 text-[#0077B6]">
                          <Home className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">₹5000</span> provides temporary shelter for a displaced family
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-blue-50 p-2 text-[#0077B6]">
                          <Heart className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">₹10000</span> funds medical supplies for emergency response
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
                        <Button variant="link" className="text-[#0077B6]" asChild>
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
                        <Badge className="w-fit bg-[#0077B6]">Medical</Badge>
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
                        <Badge className="w-fit bg-[#0077B6]">Logistics</Badge>
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
                        <Badge className="w-fit bg-[#0077B6]">Support</Badge>
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
                <CardDescription>Why partner with Suraksha Setu</CardDescription>
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
