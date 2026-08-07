// app/events/data/events.ts
export type EventData = {
  slug: string;
  title: string;
  date: string;
  location: string;
  body: string;
  images: string[]; // highlight images for the event
};

export const EVENTS: EventData[] = [
  {
    slug: "sustainability-lab-2026",
    title: "Sustainability Lab",
    date: "Friday, 31st July, 2026",
    location: "Abuja, Nigeria",
    body: "An interactive Leadership and Ethical Decision-Making For Business Resilience.",
    images: [
      "/images/events/sustainability-lab/1.jpg",
      "/images/events/sustainability-lab/2.jpg",
      "/images/events/sustainability-lab/3.jpg",
    ],
  },
  {
    slug: "shield-africa-summit-2024",
    title: "Shield Africa Summit 2024",
    date: "November 15th, 2024",
    location: "Abuja, Nigeria",
    body: "Annual summit convening partners and communities.",
    images: Array.from({ length: 19 }, (_, i) => `/images/events/summit2024/${i + 1}.JPG`),
  },
  {
    slug: "shield-africa-summit-2025",
    title: "Shield Africa Summit 2025",
    date: "November 20th, 2025",
    location: "Abuja, Nigeria",
    body: "Annual summit convening partners and communities.",
    images: [
      "/images/events/summit2025/1.jpg",
      "/images/events/summit2025/2.jpg",
      "/images/events/summit2025/3.jpg",
    ],
  },
  {
    slug: "green-insight-launch-2024-2025",
    title: "Green Insight Launch 2024/2025",
    date: "August 29th, 2025",
    location: "Abuja, Nigeria",
    body: "Launch of Green Insight initiative for sustainable development.",
    images: [
      "/images/events/green_insight/1.jpg",
      "/images/events/green_insight/2.jpg",
      "/images/events/green_insight/3.jpg",
    ],
  },
];
