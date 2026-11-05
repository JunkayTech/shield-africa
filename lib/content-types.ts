// lib/content-types.ts
// Shared types + default content for the editable site content store.
// Defaults mirror the original hard-coded site content so the site renders
// identically before an admin ever saves anything.

export type EventStatus = "upcoming" | "past" | "ongoing";

export type EventVideo = {
  title: string;
  /** Any YouTube / Vimeo / Cloudflare Stream watch or embed URL */
  url: string;
};

export type SiteEvent = {
  slug: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  theme?: string;
  body: string;
  status: EventStatus;
  featured?: boolean;
  thumbnail?: string;
  mobileThumbnail?: string;
  images: string[];
  videos: EventVideo[];
};

export type Stat = { label: string; value: number; suffix: string };

export type Program = {
  slug: string;
  title: string;
  category: string;
  location: string;
  description: string;
  /** image map key or a full image URL/path */
  image: string;
  caseStudyUrl: string;
};

export type Value = { title: string; body: string };

export type Testimonial = { quote: string; name: string; role: string };

export type SocialLink = {
  label: string;
  href: string;
};

export type SiteContent = {
  hero: {
    titleLine1: string;
    titleLine2: string;
    titleLine3Prefix: string;
    titleLine3Accent: string;
    subtitle: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    backgroundImage: string;
  };
  marquee: string[];
  impact: {
    heading: string;
    text: string;
  };
  stats: Stat[];
  programs: Program[];
  values: Value[];
  testimonials: Testimonial[];
  newsletter: {
    heading: string;
    text: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  footer: {
    blurb: string;
    socials: SocialLink[];
  };
  /**
   * Photo galleries for impact case studies, keyed by case-study slug
   * (e.g. "pagi-medical"). When a slug has no entry (or an empty list),
   * the website falls back to its built-in gallery.
   */
  galleries: Record<string, string[]>;
};

export type MediaItem = {
  id: string;
  /** "image" | "video" for uploaded files, "embed" for external video links */
  type: "image" | "video" | "embed";
  name: string;
  /** public URL (R2 public URL, /uploads path, or external embed link) */
  url: string;
  /** R2 object key (uploaded files only) */
  key?: string;
  /** logical folder, e.g. "events/shield-africa-summit-2026" or "impact/pagi-medical" */
  folder?: string;
  size?: number;
  createdAt: string;
};

export type Registration = {
  id: string;
  registrationNumber: string;
  eventSlug: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender?: string;
  ageGroup?: string;
  organization?: string;
  jobTitle?: string;
  sector?: string;
  country?: string;
  state?: string;
  /** "website" = public form, "admin" = registered at the desk by an admin */
  source: "website" | "admin";
  checkedIn: boolean;
  checkedInAt?: string;
  notes?: string;
  createdAt: string;
};

export type AnalyticsDay = {
  total: number;
  paths: Record<string, number>;
};

export type AnalyticsDoc = {
  days: Record<string, AnalyticsDay>;
};

export const DEFAULT_EVENTS: SiteEvent[] = [
  {
    slug: "shield-africa-summit-2026",
    title: "Shield Africa Summit 2026",
    date: "Thursday, 19th November, 2026",
    time: "9:00AM Prompt",
    location:
      "Skywide Event Marquee, 2 Tunde Idiagbon Street, City Park 2, Utako, Abuja, Nigeria",
    theme:
      "Strengthening Africa’s Capacity for Sustainable Development: Investing in People, Systems, and Economic Opportunities",
    body: "Strengthening Africa’s Capacity for Sustainable Development: Investing in People, Systems, and Economic Opportunities. Starts at 9:00 AM.",
    status: "upcoming",
    featured: true,
    thumbnail: "/images/events/summit2026/Shield%20Africa%20Summit%202026.png",
    mobileThumbnail: "/images/events/summit2026/Shield%20Africa%20Summit%202026.png",
    images: [],
    videos: [],
  },
  {
    slug: "sustainability-lab-2026",
    title: "Sustainability Lab",
    date: "Friday, 31st July, 2026",
    location: "Abuja, Nigeria",
    body: "An interactive Leadership and Ethical Decision-Making For Business Resilience.",
    status: "upcoming",
    images: [
      "/images/events/sustainability-lab/1.jpg",
      "/images/events/sustainability-lab/2.jpg",
      "/images/events/sustainability-lab/3.jpg",
    ],
    videos: [],
  },
  {
    slug: "green-insight-book-launch-2026",
    title: "Green Insight Book Launch — Vol. 2",
    date: "Friday, 28th August, 2026",
    location: "Skywide Studios, Abuja, Nigeria",
    body: "Join us to celebrate the launch of Green Insight Publication (Vol. 2).",
    status: "past",
    thumbnail: "/images/events/green_insight.png",
    mobileThumbnail: "/images/events/green_insight2.png",
    images: [],
    videos: [],
  },
  {
    slug: "shield-africa-summit-2025",
    title: "Shield Africa Summit 2025",
    date: "November 20th, 2025",
    location: "Abuja, Nigeria",
    body: "Annual summit convening partners and communities.",
    status: "past",
    thumbnail: "/images/events/SA_Summit25_Landscape.png",
    mobileThumbnail: "/images/events/SA_Summit25_mobile.png",
    images: [
      "/images/events/summit2025/1.jpg",
      "/images/events/summit2025/2.jpg",
      "/images/events/summit2025/3.jpg",
    ],
    videos: [],
  },
  {
    slug: "green-insight-launch-2024-2025",
    title: "Green Insight Launch 2024/2025",
    date: "August 29th, 2025",
    location: "Abuja, Nigeria",
    body: "Launch of Green Insight initiative for sustainable development.",
    status: "past",
    thumbnail: "/images/events/green_insight_landscape.png",
    mobileThumbnail: "/images/events/green_insight_mobile.png",
    images: [
      "/images/events/green_insight/1.jpg",
      "/images/events/green_insight/2.jpg",
      "/images/events/green_insight/3.jpg",
    ],
    videos: [],
  },
  {
    slug: "shield-africa-summit-2024",
    title: "Shield Africa Summit 2024",
    date: "November 15th, 2024",
    location: "Abuja, Nigeria",
    body: "Annual summit convening partners and communities.",
    status: "past",
    thumbnail: "/images/events/SA_Summit_Landscape24.png",
    mobileThumbnail: "/images/events/SA_Summit24.png",
    images: Array.from({ length: 19 }, (_, i) => `/images/events/summit2024/${i + 1}.JPG`),
    videos: [],
  },
];

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    titleLine1: "Advancing",
    titleLine2: "Sustainable Development",
    titleLine3Prefix: "across",
    titleLine3Accent: "Africa.",
    subtitle:
      "We design and implement impactful programmes that strengthen food systems, promote quality education, gender inclusion, and improve livelihoods.",
    primaryCtaLabel: "Explore Our Impact",
    primaryCtaHref: "/impact",
    secondaryCtaLabel: "Register For Shield Africa Event",
    secondaryCtaHref: "/events#register",
    backgroundImage:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=80",
  },
  marquee: [
    "Agrifood Systems",
    "Education",
    "Gender Equality",
    "Humanitarian Aid",
    "Youth Empowerment",
    "Climate Resilience",
  ],
  impact: {
    heading: "Our impact across communities.",
    text: "Empowering communities through sustainable development initiatives, humanitarian aid and capacity building programs across Africa.",
  },
  stats: [
    { label: "Communities Impacted", value: 108, suffix: "" },
    { label: "Youth Empowered", value: 23000, suffix: "+" },
    { label: "Farmers Supported", value: 25000, suffix: "+" },
    { label: "Active Projects", value: 8, suffix: "" },
    { label: "Women Reached", value: 12800, suffix: "" },
    { label: "Total Beneficiaries", value: 165000, suffix: "" },
  ],
  programs: [
    {
      slug: "farmers-academy",
      title: "Farmers' Academy",
      category: "Agriculture",
      location: "Nationwide, Nigeria",
      description:
        "Empowering farmers through practical training, climate-smart agriculture, agribusiness development, and sustainable food production systems.",
      image: "farmers_academy",
      caseStudyUrl: "/impact/case-studies/farmers-academy",
    },
    {
      slug: "young-agripreneur",
      title: "Youth Agribusiness Financing Programme",
      category: "Agri-preneur",
      location: "Pan-Nigeria",
      description:
        "Supporting young people with financing, mentorship, business development and agricultural entrepreneurship opportunities.",
      image: "agripreneur",
      caseStudyUrl: "/impact/case-studies/young-agripreneur-financing",
    },
    {
      slug: "dry-season-rice",
      title: "Dry Season Rice Project",
      category: "Agriculture",
      location: "Oju, Benue State",
      description:
        "Empowered farmers in Oju Local Government Area, Benue State, through the provision of agri-inputs and training for dry-season rice cultivation, boosting food production and year-round income generation.",
      image: "rice_farming",
      caseStudyUrl: "/impact/case-studies/dry-season-rice",
    },
    {
      slug: "ichwa-idp",
      title: "Ichwa / Tas Yande IDP Outreach",
      category: "Humanitarian",
      location: "Makurdi, Benue State",
      description:
        "Food, dignity kits and psychosocial support delivered to internally displaced families in conflict-affected camps.",
      image: "humanitarian",
      caseStudyUrl: "/impact/case-studies/ichwa-idp",
    },
    {
      slug: "school-for-the-blind",
      title: "Education Intervention — School for the Blind",
      category: "Education",
      location: "Jabi, Abuja",
      description:
        "Braille learning materials, assistive devices and teacher upskilling at the Federal Nursery & Primary School for the Blind.",
      image: "education",
      caseStudyUrl: "/impact/case-studies/school-for-the-blind",
    },
    {
      slug: "naka-farming",
      title: "Naka Farming Community Project",
      category: "Agriculture",
      location: "Benue State",
      description:
        "Community-owned cooperative model unlocking shared inputs, storage and offtake for 600 farmers.",
      image: "farming",
      caseStudyUrl: "/impact/case-studies/naka-farming",
    },
    {
      slug: "jeje-outreach",
      title: "Jeje Community Outreach",
      category: "Humanitarian",
      location: "Nasarawa State",
      description:
        "Integrated WASH, nutrition and child welfare programming for under-served rural communities.",
      image: "outreach",
      caseStudyUrl: "/impact/case-studies/jeje-outreach",
    },
    {
      slug: "pagi-medical",
      title: "Pagi Medical Outreach",
      category: "Health",
      location: "Abuja",
      description:
        "Free primary care, screenings and essential medicines reaching 1,800 patients in a single mobilization.",
      image: "medical",
      caseStudyUrl: "/impact/case-studies/pagi-medical",
    },
    {
      slug: "vaw-campaign",
      title: "Violence Against Women Campaign",
      category: "Gender",
      location: "Multi-state",
      description:
        "Survivor support networks, legal aid and community dialogue confronting GBV across at-risk communities.",
      image: "women",
      caseStudyUrl: "/impact/case-studies/vaw-campaign",
    },
  ],
  values: [
    {
      title: "Sustainability",
      body: "We build interventions that outlast our presence — owned, financed and led by communities themselves.",
    },
    {
      title: "Transparency",
      body: "Every Naira, every outcome, every story — accountable to the people we serve and the partners who walk with us.",
    },
    {
      title: "Resilience",
      body: "We design for shocks: climate, conflict, displacement. Programs adapt; the mission holds.",
    },
    {
      title: "Collaboration",
      body: "Government, civil society, the private sector and grassroots leaders — convened around a shared theory of change.",
    },
  ],
  testimonials: [
    {
      quote:
        "Before now, we have experienced a lot of difficulties in farming as a result of insufficient funds to acquire the necessities for farming. We are very grateful for Shield Africa's intervention and we pray that you will continue to have and also reach out to other communities as you have reached us today.",
      name: "Mrs. Abi Rose Eneh",
      role: "Chairlady, Owolaole Housewives · Multipurpose Association",
    },
    {
      quote:
        "The lack of access to fertilizers has crippled the productivity of our farming enterprise in this community. This is because of the exorbitant prices which has made it relatively impossible to acquire these inputs by most of our farmers. But today, Shield Africa has distributed this agro inputs free of charge and we are so excited.",
      name: "Mr. Ogoh Abi Johnson",
      role: "Chairman · Ayigbu Multipurpose Cooperative Society",
    },
    {
      quote:
        "We are saying thank you to Shield Africa for this initiative, your vision and mission. I know that it is not easy to work with the visually impaired children as well as the staff. However, you have remained persistent and courageous. We are grateful for both the learning and feeding materials you have brought us.",
      name: "Mrs. Rose Uganden",
      role: "Principal · School for the Blind, FCT Abuja",
    },
    {
      quote:
        "On behalf of myself and community, I want to sincerely appreciate Shield Africa for this initiative of providing agro inputs which I know will go a long way in cushioning the many adversities we have been faced with as a farming community.",
      name: "Chief Opah Emmanuel Oboh",
      role: "Chief · Oju Community, Benue State",
    },
  ],
  newsletter: {
    heading: "Stay updated on impact stories from the field.",
    text: "Stay updated with our programmes, community activities, development initiatives and upcoming events across Africa.",
  },
  contact: {
    email: "inquiries@shieldafrica.org",
    phone: "+234 810 060 0657",
    address:
      "Shield Africa Office, 2105 Herbert Macaulay Way, Wuse Zone 6, FCT Abuja",
  },
  footer: {
    blurb:
      "Shield Africa is a non-profit advancing sustainable development, humanitarian aid and economic dignity across Africa.",
    socials: [
      { label: "Facebook", href: "https://www.facebook.com/shieldafricasdi" },
      { label: "Instagram", href: "https://www.instagram.com/shieldafricaofficial" },
      { label: "X (Twitter)", href: "https://x.com/ShieldAfrica_" },
      { label: "YouTube", href: "https://youtube.com/@shieldafrica" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/shield-africa-sdi/" },
    ],
  },
  galleries: {},
};

/** Deep-merge saved content over defaults so new fields never break old saves. */
export function mergeContent(saved: Partial<SiteContent> | null | undefined): SiteContent {
  if (!saved) return DEFAULT_CONTENT;
  return {
    hero: { ...DEFAULT_CONTENT.hero, ...saved.hero },
    marquee: saved.marquee ?? DEFAULT_CONTENT.marquee,
    impact: { ...DEFAULT_CONTENT.impact, ...saved.impact },
    stats: saved.stats ?? DEFAULT_CONTENT.stats,
    programs: saved.programs ?? DEFAULT_CONTENT.programs,
    values: saved.values ?? DEFAULT_CONTENT.values,
    testimonials: saved.testimonials ?? DEFAULT_CONTENT.testimonials,
    newsletter: { ...DEFAULT_CONTENT.newsletter, ...saved.newsletter },
    contact: { ...DEFAULT_CONTENT.contact, ...saved.contact },
    footer: {
      blurb: saved.footer?.blurb ?? DEFAULT_CONTENT.footer.blurb,
      socials: saved.footer?.socials ?? DEFAULT_CONTENT.footer.socials,
    },
    galleries: saved.galleries ?? DEFAULT_CONTENT.galleries,
  };
}
