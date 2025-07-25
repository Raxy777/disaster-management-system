import { supabase } from '@/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

// Mock data for development/testing
const mockVolunteers = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "Central City",
    zip: "12345",
    skills: ["First Aid", "Medical", "Communication"],
    availability: "Full-time",
    status: "Active",
    assigned_to: "Medical Team",
    avatar: "",
    location: "Central City",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-12-20T14:22:00Z"
  },
  {
    id: 2,
    first_name: "Sarah",
    last_name: "Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Avenue",
    city: "North District",
    zip: "23456",
    skills: ["Search and Rescue", "Navigation", "Heavy Lifting"],
    availability: "Weekends",
    status: "Active",
    assigned_to: "Search and Rescue Team",
    avatar: "",
    location: "North District",
    created_at: "2024-02-20T09:15:00Z",
    updated_at: "2024-12-19T16:45:00Z"
  },
  {
    id: 3,
    first_name: "Michael",
    last_name: "Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 345-6789",
    address: "789 Pine Road",
    city: "South District",
    zip: "34567",
    skills: ["Leadership", "Logistics", "Administration"],
    availability: "Weekdays",
    status: "Active",
    assigned_to: "",
    avatar: "",
    location: "South District",
    created_at: "2024-03-10T11:20:00Z",
    updated_at: "2024-12-18T13:30:00Z"
  },
  {
    id: 4,
    first_name: "Emily",
    last_name: "Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 456-7890",
    address: "321 Elm Street",
    city: "East District",
    zip: "45678",
    skills: ["Counseling", "Translation", "Communication"],
    availability: "Evenings",
    status: "On Leave",
    assigned_to: "Communication Team",
    avatar: "",
    location: "East District",
    created_at: "2024-04-05T14:10:00Z",
    updated_at: "2024-12-15T10:20:00Z"
  },
  {
    id: 5,
    first_name: "David",
    last_name: "Thompson",
    email: "david.thompson@email.com",
    phone: "+1 (555) 567-8901",
    address: "654 Maple Drive",
    city: "West District",
    zip: "56789",
    skills: ["Construction", "Heavy Lifting", "Driving"],
    availability: "Flexible",
    status: "Inactive",
    assigned_to: "",
    avatar: "",
    location: "West District",
    created_at: "2024-05-12T08:45:00Z",
    updated_at: "2024-12-10T12:15:00Z"
  }
]

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('volunteers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.log('Supabase error, using mock data:', error.message)
      // Return mock data if Supabase fails
      return NextResponse.json(mockVolunteers)
    }
    
    // If no data from Supabase, return mock data
    if (!data || data.length === 0) {
      return NextResponse.json(mockVolunteers)
    }
    
    return NextResponse.json(data)
  } catch (err) {
    console.log('Database error, using mock data:', err)
    // Fallback to mock data if database is not available
    return NextResponse.json(mockVolunteers)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { data, error } = await supabase
      .from('volunteers')
      .insert([body])
      .select()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
} 