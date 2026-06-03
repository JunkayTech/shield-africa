export const programs = [
  {
    slug: "farmers-academy",
    title: "Shield Africa Farmers' Academy",
    category: "Agriculture",
    location: "Nationwide, Nigeria",
    description:
      "A flagship residential training program equipping smallholder farmers with climate-smart agronomy, financial literacy and market linkages.",
    image: "agriculture",
    caseStudyUrl: "/impact/case-studies/farmers-academy",
  },
  {
    slug: "young-agripreneur",
    title: "Young Agri-preneur Financing Project",
    category: "Agri-preneur",
    location: "Pan-Nigeria",
    description:
      "Catalytic financing, mentorship and equipment access for first-time agribusiness founders under 35.",
    image: "agripreneur",
    caseStudyUrl: "/impact/case-studies/young-agripreneur-financing"
  },
  {
    slug: "dry-season-rice",
    title: "Dry Season Rice Farming Project",
    category: "Agriculture",
    location: "Oju, Benue State",
    description:
      "Irrigation infrastructure and improved seed varieties enabling year-round rice production for 2,400 households.",
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
    image: "agriculture",
    caseStudyUrl: "/impact/case-studies/naka-farming",
  },
  {
    slug: "jeje-outreach",
    title: "Jeje Community Outreach",
    category: "Humanitarian",
    location: "Nasarawa State",
    description:
      "Integrated WASH, nutrition and child welfare programming for under-served rural communities.",
    image: "humanitarian",
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
] as const;

export const stats = [
  { label: "Communities Impacted", value: 108, suffix: "" },
  { label: "Youth Empowered", value: 23000, suffix: "+" },
  { label: "Farmers Supported", value: 25000, suffix: "+" },
  { label: "Active Projects", value: 8, suffix: "" },
  { label: "Women Reached", value: 12800, suffix: "" },
  { label: "Total Beneficiaries", value: 165000, suffix: "" },
] as const;

export const values = [
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
] as const;

export const events = [
  {
    date: "Mar 14, 2026",
    title: "Farmers' Academy — Cohort 09 Intake",
    location: "Makurdi, Benue State",
    type: "Training",
    body: "A 4-week residency for 120 smallholder farmers across Benue, Nasarawa and Plateau states.",
  },
  {
    date: "Apr 02, 2026",
    title: "Pagi Medical Outreach — Spring Edition",
    location: "Pagi Community, FCT",
    type: "Outreach",
    body: "Free consultations, malaria & hypertension screening and essential medicines for 2,000+ residents.",
  },
  {
    date: "Apr 22, 2026",
    title: "Women's Economic Power Summit",
    location: "Abuja",
    type: "Convening",
    body: "A one-day convening with cooperatives, financiers and policymakers on closing the women's funding gap.",
  },
  {
    date: "May 10, 2026",
    title: "Young Agri-preneur Pitch Day",
    location: "Lagos",
    type: "Convening",
    body: "20 finalists pitch for seed grants, mentorship and equipment leases.",
  },
  {
    date: "Jun 05, 2026",
    title: "IDP Dignity Kit Drive",
    location: "Tas Yande Camp, Benue",
    type: "Outreach",
    body: "Distribution of 1,500 dignity kits alongside psychosocial support workshops.",
  },
  {
    date: "Jul 18, 2026",
    title: "School for the Blind — Annual Library Build",
    location: "Jabi, Abuja",
    type: "Community",
    body: "Volunteers and partners build out the assistive-technology learning lab.",
  },
] as const;

export type Program = typeof programs[number];
export type Stat = typeof stats[number];
export type Value = typeof values[number];
export type Event = typeof events[number];
