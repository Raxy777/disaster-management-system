"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ChevronRight, Facebook, Instagram, Search, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Mock data for news articles
const newsArticles = [
  {
    id: 1,
    title: "Emergency Response Teams Deployed to Riverside County Flood Zone",
    excerpt:
      "Relief teams have been deployed to assist with evacuation and recovery efforts in the affected areas of Riverside County.",
    content:
      'RIVERSIDE COUNTY - Following the severe flooding that has affected Riverside County over the past 48 hours, emergency response teams have been deployed to assist with evacuation and recovery efforts. The National Guard has been mobilized to support local authorities in rescuing stranded residents and providing essential supplies to affected communities.\n\nAccording to the Disaster Management Agency, over 200 personnel are currently on the ground, with additional teams expected to arrive in the coming days. Helicopters and boats are being used to reach isolated areas where road access has been cut off due to high water levels.\n\n"Our priority is ensuring the safety of all residents in the affected areas," said Emergency Response Coordinator Sarah Johnson. "We urge people to follow evacuation orders and to avoid attempting to return to their homes until authorities have declared it safe to do so."\n\nTemporary shelters have been established at local schools and community centers, providing accommodation for displaced residents. Medical teams are on standby to address any health concerns, and psychological support services are available for those experiencing trauma.\n\nThe flooding, caused by unprecedented rainfall, has damaged infrastructure and homes across the county. Early estimates suggest that recovery efforts will continue for several weeks, with a focus on restoring essential services and helping communities rebuild.',
    category: "Emergency Response",
    date: "May 1, 2025",
    author: "John Smith",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: 2,
    title: "Wildfire Containment Progress in Mountain View",
    excerpt: "Firefighters have contained 60% of the wildfire. Evacuation orders remain in place for certain zones.",
    content:
      'MOUNTAIN VIEW - Firefighters have made significant progress in containing the wildfire that has been raging in the Mountain View area for the past week. As of this morning, the fire is reported to be 60% contained, according to fire department officials.\n\nThe wildfire, which started on April 25, has burned approximately 5,000 acres of land and forced the evacuation of several communities in the region. Despite the progress in containment, evacuation orders remain in place for certain zones as a precautionary measure.\n\n"We\'ve made good progress over the last 48 hours, thanks to favorable weather conditions and the tireless efforts of our firefighting teams," said Fire Chief Michael Rodriguez. "However, we\'re not out of the woods yet, and we ask residents to remain vigilant and follow all evacuation orders."\n\nOver 500 firefighters from multiple agencies have been working around the clock to combat the blaze, with support from aircraft dropping fire retardant and water. The cause of the fire is still under investigation, but authorities suspect it may have been sparked by a lightning strike during a dry thunderstorm.\n\nEnvironmental experts are assessing the impact on local wildlife and ecosystems, while disaster relief organizations are providing support to affected communities. Residents are advised to monitor official channels for updates on evacuation orders and air quality warnings.',
    category: "Wildfire",
    date: "April 29, 2025",
    author: "Emily Johnson",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 3,
    title: "Earthquake Damage Assessment in Central City",
    excerpt:
      "Structural engineers are evaluating buildings after the 5.2 magnitude earthquake. No major casualties reported.",
    content:
      'CENTRAL CITY - Following the 5.2 magnitude earthquake that struck Central City yesterday, structural engineers are conducting comprehensive assessments of buildings and infrastructure throughout the affected area. According to initial reports, while there has been significant structural damage to older buildings, no major casualties have been reported.\n\nThe earthquake, which occurred at 3:27 PM local time with its epicenter located approximately 15 miles east of downtown, was felt across the metropolitan area and surrounding counties. Emergency services responded promptly, with search and rescue teams deployed to areas where building damage was most severe.\n\n"We\'re grateful that there have been no reports of serious injuries or fatalities," said Mayor Robert Chen. "However, we\'re taking this situation very seriously and are working diligently to ensure the safety of all residents."\n\nCity officials have closed several public buildings, including schools and government offices, pending thorough safety inspections. Residents of buildings with visible structural damage have been advised to seek alternative accommodation until inspections can be completed.\n\nThe city\'s emergency management team has established a hotline for residents to report damage and seek assistance. Utility companies are working to restore services in areas where they were disrupted, with priority given to critical facilities such as hospitals and emergency shelters.\n\nSeismologists from the National Geological Survey are monitoring for aftershocks, which could potentially cause additional damage to already weakened structures. Residents are advised to be prepared for aftershocks and to follow safety guidelines in the event of further seismic activity.',
    category: "Earthquake",
    date: "April 28, 2025",
    author: "David Lee",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 4,
    title: "New Early Warning System Launched for Coastal Communities",
    excerpt:
      "State-of-the-art tsunami early warning system deployed along the coast to provide critical advance notice.",
    content:
      'COASTAL REGION - A new state-of-the-art tsunami early warning system has been deployed along the coastal regions, providing communities with critical advance notice in the event of an impending tsunami. The system, which represents a significant upgrade from previous technology, can detect tsunami waves up to 30 minutes before they reach the shore.\n\nThe $15 million project, funded through a partnership between federal agencies and local governments, includes a network of buoys equipped with pressure sensors that can detect changes in water pressure indicative of tsunami waves. These buoys transmit data in real-time to monitoring centers, where algorithms analyze the information and trigger alerts when necessary.\n\n"This system represents a major advancement in our ability to protect coastal communities," said Dr. Lisa Wong, Director of the Coastal Hazards Program. "With the additional warning time, emergency services can coordinate evacuations more effectively, potentially saving thousands of lives."\n\nThe warning system is integrated with multiple notification channels, including emergency broadcast systems, mobile alerts, sirens, and digital signage along coastal roads. Public education campaigns are underway to ensure residents understand the warning signals and know the appropriate evacuation routes.\n\nThe deployment comes after years of research and development following the devastating tsunami of 2018, which claimed over 200 lives and caused billions in property damage. Officials hope that the new system will prevent similar tragedies in the future.\n\n"While we can\'t prevent natural disasters from occurring, we can significantly improve our response to them," said Mayor Samantha Torres during the system\'s inauguration ceremony. "This early warning system is a testament to our commitment to protecting our coastal communities."\n\nExperts note that the system will be particularly valuable during seismic events in the Pacific Ring of Fire, which can trigger tsunamis with little warning. Regular testing and maintenance protocols have been established to ensure the system remains operational at all times.\n\nCommunity drills and evacuation exercises are scheduled for the coming months to familiarize residents with emergency procedures.',
    category: "Technology",
    date: "April 26, 2025",
    author: "Maria Rodriguez",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 5,
    title: "Volunteer Heroes: The Untold Stories of Disaster Response",
    excerpt:
      "Meet the everyday heroes who have dedicated their time and skills to helping communities recover from disasters.",
    content:
      'NATIONAL - Behind every disaster recovery effort are countless volunteers who selflessly dedicate their time, skills, and energy to helping communities rebuild. These unsung heroes often work tirelessly behind the scenes, receiving little recognition for their invaluable contributions.\n\nIn a special report, we highlight some of these remarkable individuals and their stories of courage, compassion, and resilience in the face of adversity.\n\nTake James Wilson, a retired construction worker who has traveled to 15 disaster zones over the past decade, using his expertise to help rebuild homes and critical infrastructure. "I just want to use the skills I have to make a difference," says Wilson. "When you see a family return to their rebuilt home, that feeling is worth more than any paycheck."\n\nThen there\'s Dr. Amara Patel, who takes leave from her medical practice during major disasters to provide emergency medical care in affected areas. During the recent earthquake in Central City, Dr. Patel worked 20-hour shifts treating injuries and ensuring continuity of care for those with chronic conditions.\n\nCollege students like Sophia Chen and Marcus Johnson represent the younger generation of volunteers. They organized a network of 200 fellow students who provided childcare, debris clearing, and meal services during the Riverside County floods.\n\n"These volunteers embody the best of humanity," says Volunteer Coordinator Robert Martinez. "They come from all walks of life, but they share a common desire to help others in their time of greatest need."\n\nDisaster response organizations emphasize that volunteers don\'t need specialized skills to make a difference. Many of the most valuable contributions come from people performing essential tasks like preparing meals, distributing supplies, or simply providing emotional support to those affected.\n\nFor those inspired to volunteer, numerous organizations offer training programs and coordination services to match volunteers with opportunities that fit their skills and availability.',
    category: "Human Interest",
    date: "April 24, 2025",
    author: "Sophia Williams",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
]

// Mock data for press releases
const pressReleases = [
  {
    id: 1,
    title: "Disaster Management Agency Announces New Emergency Response Protocol",
    date: "April 30, 2025",
    content:
      "The Disaster Management Agency today announced the implementation of a new emergency response protocol designed to improve coordination between federal, state, and local agencies during major disasters. The protocol, which goes into effect immediately, establishes clear communication channels and decision-making hierarchies to ensure a more efficient and effective response to emergencies.",
  },
  {
    id: 2,
    title: "Governor Declares State of Emergency for Riverside County",
    date: "April 29, 2025",
    content:
      "Governor Thompson has declared a state of emergency for Riverside County following severe flooding that has affected thousands of residents. The declaration makes additional resources available for emergency response and recovery efforts, including the mobilization of the National Guard to assist with evacuations and the distribution of supplies.",
  },
  {
    id: 3,
    title: "New Funding Approved for Disaster Preparedness Programs",
    date: "April 27, 2025",
    content:
      "The State Legislature has approved $50 million in funding for disaster preparedness programs across the state. The funding will support initiatives including infrastructure improvements, emergency response training, and public education campaigns aimed at helping communities better prepare for and respond to natural disasters.",
  },
]

// Mock data for success stories
const successStories = [
  {
    id: 1,
    title: "Community Rebuilds Stronger After Devastating Tornado",
    location: "Millfield",
    date: "March 15, 2025",
    image: "/placeholder.svg?height=300&width=500",
    excerpt:
      "One year after a devastating EF-4 tornado destroyed much of Millfield, the community has rebuilt with stronger, more resilient infrastructure and a renewed sense of community spirit.",
  },
  {
    id: 2,
    title: "Innovative Flood Management System Saves Riverside Neighborhood",
    location: "Riverside County",
    date: "February 28, 2025",
    image: "/placeholder.svg?height=300&width=500",
    excerpt:
      "A newly implemented flood management system successfully protected a Riverside County neighborhood that had previously experienced severe flooding during heavy rainfall events.",
  },
  {
    id: 3,
    title: "Rapid Response Team Credited with Saving Lives During Wildfire",
    location: "Mountain View",
    date: "January 20, 2025",
    image: "/placeholder.svg?height=300&width=500",
    excerpt:
      "The quick actions of a specialized rapid response team have been credited with saving dozens of lives during the recent wildfire that threatened the Mountain View community.",
  },
]

export function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Filter news articles based on search query and category
  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Get featured articles
  const featuredArticles = newsArticles.filter((article) => article.featured)

  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">News & Updates</h1>
          <p className="mt-2 text-muted-foreground">
            Stay informed with the latest news, updates, and stories from our disaster management efforts
          </p>
        </div>

        {/* Featured Articles */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Featured Stories</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-[#0077B6]">{article.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {article.date}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={`/news/${article.id}`}>Read Full Story</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="all-news" className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all-news">All News</TabsTrigger>
              <TabsTrigger value="press-releases">Press Releases</TabsTrigger>
              <TabsTrigger value="ground-reports">Ground Reports</TabsTrigger>
              <TabsTrigger value="success-stories">Success Stories</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search news..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue="all" onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Emergency Response">Emergency Response</SelectItem>
                  <SelectItem value="Wildfire">Wildfire</SelectItem>
                  <SelectItem value="Earthquake">Earthquake</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Human Interest">Human Interest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* All News Tab */}
          <TabsContent value="all-news" className="space-y-6">
            {filteredArticles.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-[#0077B6]">{article.category}</Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          {article.date}
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" className="px-0 text-[#0077B6]" asChild>
                        <Link href={`/news/${article.id}`}>
                          Read more <ChevronRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <p className="text-muted-foreground">No news articles found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>

          {/* Press Releases Tab */}
          <TabsContent value="press-releases" className="space-y-6">
            <div className="space-y-4">
              {pressReleases.map((release) => (
                <Card key={release.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{release.title}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {release.date}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{release.content}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/news/press-releases/${release.id}`}>View Full Press Release</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Ground Reports Tab */}
          <TabsContent value="ground-reports" className="space-y-6">
            <div className="rounded-lg border bg-muted/50 p-6 text-center">
              <h3 className="mb-2 text-lg font-semibold">Ground Reports</h3>
              <p className="mb-4 text-muted-foreground">
                Real-time updates from our teams on the ground in disaster-affected areas.
              </p>
              <div className="mx-auto max-w-md">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    width={500}
                    height={300}
                    alt="Ground report"
                    className="w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Button variant="outline" className="border-white text-white hover:bg-white/20">
                      Watch Video Report
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our ground reports section is being updated with the latest information from our field teams. Please
                  check back soon for updates.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Success Stories Tab */}
          <TabsContent value="success-stories" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {successStories.map((story) => (
                <Card key={story.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image src={story.image || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{story.location}</Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {story.date}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg">{story.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <CardDescription className="line-clamp-3">{story.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="px-0 text-[#0077B6]" asChild>
                      <Link href={`/news/success-stories/${story.id}`}>
                        Read full story <ChevronRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Social Media Feed */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Social Media Updates</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                  <CardTitle className="text-base">Twitter</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="h-[300px] overflow-y-auto">
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#1DA1F2]" />
                      <div>
                        <p className="text-sm font-medium">Suraksha Setu</p>
                        <p className="text-xs text-muted-foreground">@SurakshaSetu</p>
                      </div>
                    </div>
                    <p className="text-sm">
                      UPDATE: Emergency response teams have successfully evacuated 150 residents from the Riverside
                      flood zone. Shelter operations are underway at Central High School. #RiversideFlood
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#1DA1F2]" />
                      <div>
                        <p className="text-sm font-medium">Suraksha Setu</p>
                        <p className="text-xs text-muted-foreground">@SurakshaSetu</p>
                      </div>
                    </div>
                    <p className="text-sm">
                      ALERT: Flash flood warning extended for Riverside County until 8PM tonight. Residents in low-lying
                      areas should evacuate immediately. #FloodWarning
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#1DA1F2]" />
                      <div>
                        <p className="text-sm font-medium">Suraksha Setu</p>
                        <p className="text-xs text-muted-foreground">@SurakshaSetu</p>
                      </div>
                    </div>
                    <p className="text-sm">
                      Volunteers needed at Mountain View Community Center to help with supply distribution. If you can
                      help, please report to the volunteer check-in desk. #HelpNeeded
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">8 hours ago</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="https://twitter.com" target="_blank">
                    <Twitter className="mr-2 h-4 w-4" />
                    Follow on Twitter
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Facebook className="h-5 w-5 text-[#1877F2]" />
                  <CardTitle className="text-base">Facebook</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="h-[300px] overflow-y-auto">
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#1877F2]" />
                      <div>
                        <p className="text-sm font-medium">Disaster Response Organization</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                    <p className="text-sm">
                      DONATION DRIVE: We're collecting bottled water, non-perishable food, blankets, and hygiene
                      supplies for flood victims. Drop-off locations are listed in the comments. Thank you for your
                      support!
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>45 Likes</span>
                      <span>12 Comments</span>
                      <span>23 Shares</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#1877F2]" />
                      <div>
                        <p className="text-sm font-medium">Disaster Response Organization</p>
                        <p className="text-xs text-muted-foreground">6 hours ago</p>
                      </div>
                    </div>
                    <p className="text-sm">
                      Our teams are on the ground in Riverside County providing emergency assistance. Here are some
                      photos from our relief operations. We're grateful for the incredible volunteers who make this work
                      possible.
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-1">
                      <div className="aspect-square bg-gray-100" />
                      <div className="aspect-square bg-gray-100" />
                      <div className="aspect-square bg-gray-100" />
                      <div className="aspect-square bg-gray-100" />
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>87 Likes</span>
                      <span>34 Comments</span>
                      <span>15 Shares</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="https://facebook.com" target="_blank">
                    <Facebook className="mr-2 h-4 w-4" />
                    Follow on Facebook
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Instagram className="h-5 w-5 text-[#E1306C]" />
                  <CardTitle className="text-base">Instagram</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="h-[300px] overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                    <div className="h-full w-full bg-gray-200" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                    <div className="h-full w-full bg-gray-200" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                    <div className="h-full w-full bg-gray-200" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                    <div className="h-full w-full bg-gray-200" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                    <div className="h-full w-full bg-gray-200" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                    <div className="h-full w-full bg-gray-200" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="https://instagram.com" target="_blank">
                    <Instagram className="mr-2 h-4 w-4" />
                    Follow on Instagram
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 rounded-lg bg-[#0077B6]/10 p-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold">Stay Updated</h2>
            <p className="mt-2 text-muted-foreground">
              Subscribe to our newsletter to receive the latest news and updates directly in your inbox
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Input placeholder="Enter your email" className="sm:flex-1" />
              <Button>Subscribe</Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              By subscribing, you agree to our{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
