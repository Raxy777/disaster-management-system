import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, ExternalLink, FileText, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for officials
const officials = [
  {
    name: "Dr. Sarah Johnson",
    title: "Director",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Dr. Johnson has over 20 years of experience in disaster management and emergency response. She previously served as the Deputy Director of FEMA and has led response efforts for numerous major disasters.",
  },
  {
    name: "Michael Rodriguez",
    title: "Deputy Director, Operations",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Mr. Rodriguez oversees all operational aspects of disaster response and recovery. With a background in military logistics, he brings strategic planning expertise to emergency situations.",
  },
  {
    name: "Dr. Emily Chen",
    title: "Chief Scientific Officer",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Dr. Chen leads our scientific research and technological innovation efforts. Her work focuses on developing advanced early warning systems and predictive models for natural disasters.",
  },
  {
    name: "James Wilson",
    title: "Director of Community Engagement",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Mr. Wilson manages our volunteer programs and community partnerships. He has extensive experience in nonprofit management and community organizing.",
  },
]

// Mock data for partner NGOs
const partnerNGOs = [
  {
    name: "Red Cross",
    logo: "/placeholder.svg?height=60&width=120",
    description: "Providing emergency assistance, disaster relief, and disaster preparedness education.",
    website: "https://www.redcross.org",
  },
  {
    name: "Doctors Without Borders",
    logo: "/placeholder.svg?height=60&width=120",
    description: "Delivering emergency medical care to people affected by conflict, epidemics, and disasters.",
    website: "https://www.doctorswithoutborders.org",
  },
  {
    name: "World Food Programme",
    logo: "/logos/world-food-programme.svg?height=60&width=120",
    description: "Delivering food assistance in emergencies and working with communities to improve nutrition.",
    website: "https://www.wfp.org",
  },
  {
    name: "UNICEF",
    logo: "/logos/unicef.svg?height=60&width=120",
    description: "Working to protect the rights and wellbeing of every child, especially during emergencies.",
    website: "https://www.unicef.org",
  },
  {
    name: "Habitat for Humanity",
    logo: "/logos/habitat-for-humanity.svg?height=60&width=120",
    description: "Building and repairing homes in disaster-affected communities.",
    website: "https://www.habitat.org",
  },
  {
    name: "Save the Children",
    logo: "/logos/save-the-children.svg?height=60&width=120",
    description: "Providing support to children in crisis situations and disaster-affected areas.",
    website: "https://www.savethechildren.org",
  },
]

// Mock data for annual reports
const annualReports = [
  {
    year: "2024",
    title: "Annual Impact Report 2024",
    description: "Comprehensive overview of our disaster response activities and impact for the year 2024.",
    file: "/reports/annual-report-2024.pdf",
    thumbnail: "/placeholder.svg?height=150&width=100",
  },
  {
    year: "2023",
    title: "Annual Impact Report 2023",
    description: "Comprehensive overview of our disaster response activities and impact for the year 2023.",
    file: "/reports/annual-report-2023.pdf",
    thumbnail: "/placeholder.svg?height=150&width=100",
  },
  {
    year: "2022",
    title: "Annual Impact Report 2022",
    description: "Comprehensive overview of our disaster response activities and impact for the year 2022.",
    file: "/reports/annual-report-2022.pdf",
    thumbnail: "/placeholder.svg?height=150&width=100",
  },
  {
    year: "2021",
    title: "Annual Impact Report 2021",
    description: "Comprehensive overview of our disaster response activities and impact for the year 2021.",
    file: "/reports/annual-report-2021.pdf",
    thumbnail: "/placeholder.svg?height=150&width=100",
  },
]

export function AboutPage() {
  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">About Us</h1>
          <p className="mt-2 text-muted-foreground">
            Learn about our mission, leadership, and commitment to disaster management
          </p>
        </div>

        {/* Mission & Vision Section */}
        <div className="mb-12 grid gap-8 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-lg md:aspect-auto md:h-full">

          </div>
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
            <p className="mb-6 text-muted-foreground">
              Suraksha Setu is dedicated to providing rapid, effective, and coordinated disaster management services
              to communities affected by natural and man-made disasters. We work tirelessly to save lives, alleviate
              suffering, and support recovery efforts through innovative technology, community engagement, and
              partnerships with government agencies and NGOs.
            </p>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Core Values Section */}
        <div className="mb-12">
          <h2 className="mb-8 text-center text-2xl font-bold">Our Core Values</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#0077B6]/10 text-[#0077B6]">
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
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We operate with complete transparency, ensuring that our actions, decisions, and use of resources are
                  open to scrutiny by the communities we serve and our partners.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#0077B6]/10 text-[#0077B6]">
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
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <CardTitle>Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We strive to maximize the impact of our resources through efficient operations, innovative solutions,
                  and strategic partnerships that amplify our effectiveness.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#0077B6]/10 text-[#0077B6]">
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
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </div>
                <CardTitle>Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We believe in the power of collaboration, working closely with communities, governments, NGOs, and
                  other stakeholders to achieve our shared goals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#0077B6]/10 text-[#0077B6]">
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
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <CardTitle>Compassion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We approach our work with deep compassion for those affected by disasters, recognizing the trauma and
                  hardship they face and responding with empathy and respect.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="officials" className="mt-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="officials">Governing Body</TabsTrigger>
            <TabsTrigger value="partners">Partner NGOs</TabsTrigger>
            <TabsTrigger value="reports">Annual Reports</TabsTrigger>
          </TabsList>

          {/* Officials Tab */}
          <TabsContent value="officials" className="mt-6">
            <h2 className="mb-6 text-2xl font-bold">Our Leadership Team</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {officials.map((official) => (
                <Card key={official.name} className="overflow-hidden">
                  <div className="grid md:grid-cols-[1fr_2fr]">
                    <div className="relative aspect-square">
                      <Image
                        src={official.image || "/placeholder.svg"}
                        alt={official.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <CardTitle>{official.name}</CardTitle>
                      <CardDescription className="mb-4">{official.title}</CardDescription>
                      <p className="text-sm text-muted-foreground">{official.bio}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Partners Tab */}
          <TabsContent value="partners" className="mt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold">Our Partner Organizations</h2>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Become a Partner
              </Button>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {partnerNGOs.map((org) => (
                <Card key={org.name}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-24 overflow-hidden">
                        <Image src={org.logo || "/placeholder.svg"} alt={org.name} fill className="object-contain" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{org.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{org.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={org.website} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Website
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="mt-6">
            <h2 className="mb-6 text-2xl font-bold">Annual Reports & Publications</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {annualReports.map((report) => (
                <Card key={report.year}>
                  <CardHeader className="pb-2">
                    <div className="relative mx-auto h-40 w-28 overflow-hidden">
                      <Image
                        src={report.thumbnail || "/placeholder.svg"}
                        alt={report.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardTitle className="mt-4 text-center text-lg">{report.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-sm text-muted-foreground">{report.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href={report.file} target="_blank">
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Other Publications</CardTitle>
                  <CardDescription>Research papers, case studies, and special reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-muted p-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">Disaster Preparedness Best Practices</h3>
                        <p className="text-sm text-muted-foreground">
                          A comprehensive guide to preparing communities for various types of disasters.
                        </p>
                        <Button variant="link" className="mt-1 h-auto p-0 text-[#0077B6]" asChild>
                          <Link href="/publications/disaster-preparedness.pdf">Download PDF</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-muted p-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">Climate Change and Disaster Frequency</h3>
                        <p className="text-sm text-muted-foreground">
                          Research paper on the correlation between climate change and increasing disaster frequency.
                        </p>
                        <Button variant="link" className="mt-1 h-auto p-0 text-[#0077B6]" asChild>
                          <Link href="/publications/climate-change-research.pdf">Download PDF</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-muted p-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">Case Study: Riverside County Flood Response</h3>
                        <p className="text-sm text-muted-foreground">
                          Detailed analysis of the response efforts during the Riverside County floods.
                        </p>
                        <Button variant="link" className="mt-1 h-auto p-0 text-[#0077B6]" asChild>
                          <Link href="/publications/riverside-case-study.pdf">Download PDF</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* History Timeline */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Our History</h2>
          <div className="relative border-l border-muted pl-6">
            <div className="mb-10 relative">
              <div className="absolute -left-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                <div className="h-3 w-3 rounded-full bg-[#0077B6]"></div>
              </div>
              <div>
                <h3 className="font-bold">2015: Foundation</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                   Suraksha Setu was founded with a mission to improve disaster management through technology and
                  community engagement.
                </p>
              </div>
            </div>
            <div className="mb-10 relative">
              <div className="absolute -left-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                <div className="h-3 w-3 rounded-full bg-[#0077B6]"></div>
              </div>
              <div>
                <h3 className="font-bold">2017: First Major Response</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Coordinated our first major disaster response during the coastal hurricanes, assisting over 10,000
                  affected individuals.
                </p>
              </div>
            </div>
            <div className="mb-10 relative">
              <div className="absolute -left-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                <div className="h-3 w-3 rounded-full bg-[#0077B6]"></div>
              </div>
              <div>
                <h3 className="font-bold">2019: Technology Innovation</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Launched our first early warning system and disaster management platform, integrating real-time data
                  and predictive analytics.
                </p>
              </div>
            </div>
            <div className="mb-10 relative">
              <div className="absolute -left-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                <div className="h-3 w-3 rounded-full bg-[#0077B6]"></div>
              </div>
              <div>
                <h3 className="font-bold">2021: International Expansion</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Expanded operations to international disaster zones, partnering with global NGOs and relief
                  organizations.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                <div className="h-3 w-3 rounded-full bg-[#0077B6]"></div>
              </div>
              <div>
                <h3 className="font-bold">2023: Community Resilience Initiative</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Launched our Community Resilience Initiative, focusing on preparedness and long-term recovery support
                  for vulnerable communities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 rounded-lg bg-[#0077B6]/10 p-8 text-center">
          <h2 className="text-2xl font-bold">Join Our Mission</h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Whether you're interested in volunteering, donating, or partnering with us, there are many ways to support
            our disaster management efforts and make a difference in affected communities.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild>
              <Link href="/volunteer-donate">Volunteer or Donate</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
