import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <img src="/logos/ss-logo.png" alt="Suraksha Setu" className="h-12 w-12" />
              <span className="text-lg font-bold">Suraksha Setu</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A comprehensive disaster management and response platform providing real-time alerts, resources, and
              coordination for effective disaster response.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/disaster-types" className="text-muted-foreground hover:text-foreground">
                  Disaster Types
                </Link>
              </li>
              <li>
                <Link href="/alerts" className="text-muted-foreground hover:text-foreground">
                  Real-Time Alerts
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-foreground">
                  Emergency Resources
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-muted-foreground hover:text-foreground">
                  Report a Disaster
                </Link>
              </li>
              <li>
                <Link href="/volunteer-donate" className="text-muted-foreground hover:text-foreground">
                  Volunteer & Donate
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources/helplines" className="text-muted-foreground hover:text-foreground">
                  Emergency Helplines
                </Link>
              </li>
              <li>
                <Link href="/resources/hospitals" className="text-muted-foreground hover:text-foreground">
                  Hospital Locations
                </Link>
              </li>
              <li>
                <Link href="/resources/guides" className="text-muted-foreground hover:text-foreground">
                  Preparedness Guides
                </Link>
              </li>
              <li>
                <Link href="/resources/training" className="text-muted-foreground hover:text-foreground">
                  Training Videos
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-muted-foreground hover:text-foreground">
                  Interactive Map
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
            <div className="mt-4">
              <h4 className="mb-2 text-sm font-semibold">Emergency Hotline</h4>
              <p className="text-lg font-bold text-primary">1-800-DISASTER</p>
              <p className="text-xs text-muted-foreground">Available 24/7</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Suraksha Setu. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-foreground">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
