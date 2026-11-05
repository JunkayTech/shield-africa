// lib/galleries.ts
// Registry of the impact case-study galleries that ship with the website.
// Each case study has a media folder ("impact/<slug>") that admin uploads
// are stored under, plus a built-in default gallery generated from the
// numbered images in /public/images/projects/<dir>/.

export type CaseStudyInfo = {
  /** case-study slug — also the key in SiteContent.galleries */
  slug: string;
  title: string;
  /** directory under /public/images/projects */
  dir: string;
  /** number of built-in numbered images (1..count .jpg) */
  count: number;
};

export const CASE_STUDIES: CaseStudyInfo[] = [
  { slug: "farmers-academy", title: "Farmers' Academy", dir: "farmers", count: 34 },
  {
    slug: "young-agripreneur-financing",
    title: "Youth Agribusiness Financing Programme",
    dir: "young-agripreneur",
    count: 17,
  },
  { slug: "dry-season-rice", title: "Dry Season Rice Project", dir: "dry-season-rice", count: 76 },
  { slug: "ichwa-idp", title: "Ichwa / Tas Yande IDP Outreach", dir: "ichwa-idp", count: 24 },
  {
    slug: "school-for-the-blind",
    title: "Education Intervention — School for the Blind",
    dir: "blind",
    count: 20,
  },
  { slug: "naka-farming", title: "Naka Farming Community Project", dir: "naka-farming", count: 18 },
  { slug: "jeje-outreach", title: "Jeje Community Outreach", dir: "jeje-outreach", count: 7 },
  {
    slug: "pagi-medical",
    title: "Pagi Medical Outreach",
    dir: "pagi-medical-outreach",
    count: 10,
  },
  { slug: "vaw-campaign", title: "Violence Against Women Campaign", dir: "vaw-campaign", count: 10 },
];

/** The built-in gallery for a case study (numbered images in /public). */
export function defaultGallery(slug: string): string[] {
  const info = CASE_STUDIES.find((c) => c.slug === slug);
  if (!info) return [];
  return Array.from(
    { length: info.count },
    (_, i) => `/images/projects/${info.dir}/${i + 1}.jpg`
  );
}

/** Admin-managed gallery when set, otherwise the built-in one. */
export function resolveGallery(
  slug: string,
  galleries: Record<string, string[]> | undefined
): string[] {
  const custom = galleries?.[slug];
  return custom && custom.length > 0 ? custom : defaultGallery(slug);
}

/** Media folder that uploads for a case study are stored under. */
export function galleryFolder(slug: string): string {
  return `impact/${slug}`;
}
