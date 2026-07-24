"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { LogoTransparent as LogoT } from "./logo";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.797l-5.32-6.96L4.8 22H1.54l8.02-9.165L1 2h6.96l4.81 6.36L18.244 2Zm-1.193 18h1.84L7.06 4H5.09l11.96 16Z" />
    </svg>
  );
}

const socials = [
  { href: "https://www.facebook.com/shieldafricasdi", label: "Facebook", Icon: Facebook },
  { href: "https://www.instagram.com/shieldafricaofficial", label: "Instagram", Icon: Instagram },
  { href: "https://x.com/ShieldAfrica_", label: "X (Twitter)", Icon: XIcon },
  { href: "https://youtube.com/@shieldafrica", label: "YouTube", Icon: Youtube },
  { href: "https://www.linkedin.com/company/shield-africa-sdi/", label: "LinkedIn", Icon: Linkedin },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-[oklch(0.28_0.05_195)] text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid items-center gap-8 border-b border-white/15 pb-12 lg:grid-cols-[auto_1fr_auto]">
          {/* ✅ Transparent logo for footer */}
          <LogoT className="h-12 w-auto" />
          <p className="max-w-xl text-sm leading-relaxed text-white/70 lg:px-8">
            Shield Africa is a non-profit advancing sustainable development,
            humanitarian aid and economic dignity across Nigeria and the African
            continent.
          </p>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-soft transition hover:shadow-elevated"
          >
            Partner With Us
          </Link>
        </div>

        <div className="grid gap-12 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          <FooterCol
            title="Explore"
            links={[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/impact", label: "Impact" },
              { href: "/events", label: "Events" },
            ]}
          />
          <FooterCol
            title="Programs"
            links={[
              { href: "/impact", label: "Farmers' Academy" },
              { href: "/impact", label: "Education Intervention" },
              { href: "/impact", label: "Medical Outreach" },
              { href: "/impact", label: "Women Empowerment" },
            ]}
          />
          <div>
            <h4 className="font-serif text-base font-semibold text-white">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>inquiries@shieldafrica.org</li>
              <li>+234 810 060 0657</li>
              <li>Shield Africa Office, 2105 Herbert Macaulay Way, Wuse Zone 6, FCT Abuja</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-xs text-white/60 sm:flex-row sm:px-8">
          <p>&copy; {new Date().getFullYear()} Shield Africa. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:bg-accent hover:border-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="font-serif text-base font-semibold text-white">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l, i) => (
          <li key={i}>
            <Link href={l.href} className="text-white/70 transition hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
