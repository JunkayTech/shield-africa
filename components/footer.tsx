import Link from "next/link"
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const footerLinks = {
  organization: [
    { href: "/about", label: "About Us" },
    { href: "/impact", label: "Our Impact" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ],
  programs: [
    { href: "/impact#agriculture", label: "Agriculture" },
    { href: "/impact#education", label: "Education" },
    { href: "/impact#humanitarian", label: "Humanitarian" },
    { href: "/impact#health", label: "Health" },
  ],
  getInvolved: [
    { href: "/contact#partner", label: "Partner With Us" },
    { href: "/contact#volunteer", label: "Volunteer" },
    { href: "/contact#donate", label: "Donate" },
    { href: "/events", label: "Attend Events" },
  ],
}

const socialLinks = [
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-bold">Shield Africa</span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-background/70">
              Empowering communities through sustainable development initiatives, 
              humanitarian aid, and capacity building programs across Nigeria and Africa.
            </p>
            
            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@shieldafrica.org</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-background/70">
                <Phone className="h-4 w-4 text-primary" />
                <span>+234 (0) 800 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-background/70">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Abuja, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Organization Links */}
          <div>
            <h4 className="font-semibold text-background">Organization</h4>
            <ul className="mt-6 space-y-3">
              {footerLinks.organization.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Links */}
          <div>
            <h4 className="font-semibold text-background">Programs</h4>
            <ul className="mt-6 space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved Links */}
          <div>
            <h4 className="font-semibold text-background">Get Involved</h4>
            <ul className="mt-6 space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-background/50">
              &copy; {new Date().getFullYear()} Shield Africa. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 text-background/70 transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
