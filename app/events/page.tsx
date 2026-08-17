"use client";

import { useState } from "react";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { Reveal } from "@/components/reveal";

const types = ["Upcoming", "Past"] as const;

const SECTORS = [
  "Government & Public Sector",
  "Agriculture, Agribusiness & Food Systems",
  "Financial Services, Banking & Investment",
  "Development, Nonprofit & Humanitarian",
  "Education, Research & Academia",
  "Technology & Digital Services",
  "Energy & Utilities",
  "Manufacturing & Industrial",
  "Healthcare & Life Sciences",
  "Construction, Infrastructure & Real Estate",
  "Media, Communications & Creative Industries",
  "Trade, Commerce & Consumer Services",
  "Environment, Climate & Sustainability",
  "Legal, Policy & Regulatory",
  "Other",
] as const;

const AGE_GROUPS = [
  "18 - 25",
  "26 - 35",
  "36 - 45",
  "46 - 55",
  "55 and above",
] as const;

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT Abuja",
  "Other",
] as const;

export default function EventsPage() {
  const [filter, setFilter] =
    useState<(typeof types)[number]>("Upcoming");

  const upcomingEvents: {
    slug: string;
    title: string;
    date: string;
    location: string;
    body: string;
    thumbnail: string;
  }[] = [
    {
      slug: "green-insight-book-launch-2026",
      title: "Green Insight Book Launch — Vol. 2",
      date: "Friday, 28th August, 2026",
      location: "Skywide Studios, Abuja, Nigeria",
      body: "Join us to celebrate the launch of Green Insight Publication (Vol. 2).",
      thumbnail: "/images/events/green_insight2.png",
    },
  ];

  const pastEvents = [
    {
      slug: "shield-africa-summit-2024",
      title: "Shield Africa Summit 2024",
      date: "November 15th, 2024",
      location: "Abuja, Nigeria",
      body: "Annual summit convening partners and communities.",
      thumbnail: "/images/events/summit2024.jpg",
    },
  ];

  const filtered = filter === "Upcoming" ? upcomingEvents : pastEvents;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.18em] text-primary">
              Events & Programs
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-light leading-[1.05] text-balance sm:text-7xl">
              Conversations that drive{" "}
              <span className="italic text-primary">impact.</span>
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Trainings, convenings and summits — open to partners, volunteers
              and the communities we serve.
            </p>
          </Reveal>

          {/* Filter buttons */}
          <Reveal delay={320}>
            <div className="mt-12 flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    filter === t
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-surface-elevated text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Events list */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface-elevated">
            {filtered.length === 0 ? (
              <div className="p-10 text-center text-muted-foreground">
                {filter === "Upcoming"
                  ? "No upcoming events at the moment."
                  : "No past events recorded."}
              </div>
            ) : (
              filtered.map((e, i) => (
                <Reveal key={e.slug} delay={i * 60}>
                  <article
                    className={`group grid gap-6 p-7 transition hover:bg-secondary sm:grid-cols-[160px_1fr_auto] sm:items-center sm:gap-8 sm:p-9 ${
                      i !== filtered.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                  >
                    <div className="relative h-32 w-full overflow-hidden rounded-xl sm:h-40 sm:w-40">
                      <Image
                        src={e.thumbnail}
                        alt={e.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 160px"
                      />
                    </div>

                    <div>
                      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-primary">
                        <Calendar className="h-3.5 w-3.5" /> {e.date}
                      </div>

                      <h3 className="mt-3 font-serif text-2xl font-medium leading-snug sm:text-3xl">
                        {e.title}
                      </h3>

                      <div className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" /> {e.location}
                      </div>

                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {e.body}
                      </p>

                      <div className="mt-4">
                        <Link
                          href={`/events/${e.slug}`}
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-medium transition hover:bg-foreground hover:text-background"
                        >
                          Event Highlights
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    {filter === "Upcoming" ? (
                      <a
                        href="#register"
                        className="inline-flex items-center gap-1.5 self-start rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition group-hover:border-foreground group-hover:bg-foreground group-hover:text-background sm:self-center"
                      >
                        Register
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium line-through text-muted-foreground sm:self-center">
                        Register
                      </span>
                    )}
                  </article>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section id="register" className="pb-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border bg-surface-elevated p-8">
              <h2 className="font-serif text-2xl font-medium">
                Registration Details
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Please complete the form below to register for the event.
              </p>

              <RegistrationForm upcomingEvents={upcomingEvents} />
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}

/* ---------------------------
   RegistrationForm component
   --------------------------- */

function RegistrationForm({
  upcomingEvents,
}: {
  upcomingEvents: {
    slug: string;
    title: string;
    date: string;
  }[];
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    ageGroup: "",
    organization: "",
    jobTitle: "",
    sector: "",
    sectorOther: "",
    country: "Nigeria",
    state: "",
    stateOther: "",
    futureInfo: "yes",
    consent: false,
    eventSlug: upcomingEvents[0]?.slug || "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((s) => ({
      ...s,
      [key]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    // Basic validation
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      setError(
        "Please fill in all required personal information fields."
      );
      return;
    }

    if (!form.ageGroup) {
      setError("Please select an age group.");
      return;
    }

    if (!form.sector) {
      setError("Please select a sector or choose Other and specify.");
      return;
    }

    if (form.sector === "Other" && !form.sectorOther) {
      setError("Please specify your sector.");
      return;
    }

    if (!form.state) {
      setError("Please select a state or choose Other and specify.");
      return;
    }

    if (form.state === "Other" && !form.stateOther) {
      setError("Please specify your state.");
      return;
    }

    if (!form.consent) {
      setError(
        "Consent is required to receive updates from Shield Africa."
      );
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...form,
        submittedAt: new Date().toISOString(),
      };

      /*
       * Google Apps Script Web App URL
       */
      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbyG2r6lbwdCU8tHjz-TusEBLh6--gYD49h0C9aJAQfxsPxtttnAP7VieK6wDSs5Anrt/exec";

      /*
       * Send registration to Google Apps Script
       */
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      /*
       * Read response from Google Apps Script
       */
      const result = await response.json();

      /*
       * Check whether Google Apps Script
       * successfully processed the registration
       */
      if (!result.success) {
        throw new Error(
          result.message || "Registration could not be completed."
        );
      }

      /*
       * Show successful registration message
       */
      setSuccess(
        `Registration successful! Your registration number is ${result.registrationNumber}. A confirmation email has been sent to ${form.email}.`
      );

      setSubmitting(false);

      /*
       * Clear form after successful submission
       */
      setForm((s) => ({
        ...s,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        ageGroup: "",
        organization: "",
        jobTitle: "",
        sector: "",
        sectorOther: "",
        state: "",
        stateOther: "",
        futureInfo: "yes",
        consent: false,
      }));
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while submitting. Please try again."
      );

      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      {/* Personal Information */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col">
          <span className="text-sm font-medium">Full Name</span>

          <input
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            required
            placeholder="First name"
            className="mt-2 rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">Last Name</span>

          <input
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            required
            placeholder="Last name"
            className="mt-2 rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col">
          <span className="text-sm font-medium">Email Address</span>

          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            placeholder="you@organization.org"
            className="mt-2 rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">Phone Number</span>

          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
            placeholder="+234 810 000 0000"
            className="mt-2 rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">Gender</span>

          <select
            value={form.gender}
            onChange={(e) => update("gender", e.target.value)}
            className="mt-2 rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          >
            <option value="">Select</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">
              Prefer not to say
            </option>
          </select>
        </label>
      </div>

      {/* Age Group */}
      <label className="flex flex-col">
        <span className="text-sm font-medium">Age Group</span>

        <select
          value={form.ageGroup}
          onChange={(e) => update("ageGroup", e.target.value)}
          required
          className="mt-2 rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
        >
          <option value="">Select age group</option>

          {AGE_GROUPS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </label>

      {/* Professional Information */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col">
          <span className="text-sm font-medium">
            Organization / Institution
          </span>

          <input
            value={form.organization}
            onChange={(e) => update("organization", e.target.value)}
            placeholder="Organization or institution"
            className="mt-2 rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">
            Job Title / Role
          </span>

          <input
            value={form.jobTitle}
            onChange={(e) => update("jobTitle", e.target.value)}
            placeholder="Job title or role"
            className="mt-2 rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>
      </div>

      {/* Sector */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col">
          <span className="text-sm font-medium">
            Sector / Industry
          </span>

          <select
            value={form.sector}
            onChange={(e) => update("sector", e.target.value)}
            required
            className="mt-2 rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          >
            <option value="">Select sector</option>

            {SECTORS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        {form.sector === "Other" && (
          <label className="flex flex-col">
            <span className="text-sm font-medium">
              Please specify sector
            </span>

            <input
              value={form.sectorOther}
              onChange={(e) =>
                update("sectorOther", e.target.value)
              }
              placeholder="Specify sector"
              className="mt-2 rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
        )}
      </div>

      {/* Country & State */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col">
          <span className="text-sm font-medium">Country</span>

          <input
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
            placeholder="Country"
            className="mt-2 rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">State</span>

          <select
            value={form.state}
            onChange={(e) => update("state", e.target.value)}
            required
            className="mt-2 rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          >
            <option value="">Select state</option>

            {NIGERIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Other State */}
      {form.state === "Other" && (
        <label className="flex flex-col">
          <span className="text-sm font-medium">
            Please specify state
          </span>

          <input
            value={form.stateOther}
            onChange={(e) => update("stateOther", e.target.value)}
            placeholder="Specify state"
            className="mt-2 rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>
      )}

      {/* Future Participation & Consent */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 items-center">
        <div>
          <div className="text-sm font-medium">
            Would you like to receive information about future Shield
            Africa programmes?
          </div>

          <div className="mt-2 flex gap-3">
            <label
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 ${
                form.futureInfo === "yes"
                  ? "bg-foreground text-background"
                  : "bg-surface-elevated text-muted-foreground"
              }`}
            >
              <input
                type="radio"
                name="futureInfo"
                value="yes"
                checked={form.futureInfo === "yes"}
                onChange={() => update("futureInfo", "yes")}
              />

              Yes
            </label>

            <label
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 ${
                form.futureInfo === "no"
                  ? "bg-foreground text-background"
                  : "bg-surface-elevated text-muted-foreground"
              }`}
            >
              <input
                type="radio"
                name="futureInfo"
                value="no"
                checked={form.futureInfo === "no"}
                onChange={() => update("futureInfo", "no")}
              />

              No
            </label>
          </div>
        </div>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) =>
              update("consent", e.target.checked)
            }
            className="mt-1"
          />

          <div>
            <div className="text-sm font-medium">
              Consent to receive updates from Shield Africa
            </div>

            <div className="text-sm text-muted-foreground">
              I consent to receive updates and communications from
              Shield Africa.
            </div>
          </div>
        </label>
      </div>

      {/* Event */}
      <label className="flex flex-col">
        <span className="text-sm font-medium">Event</span>

        <select
          value={form.eventSlug}
          onChange={(e) =>
            update("eventSlug", e.target.value)
          }
          className="mt-2 rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
        >
          {upcomingEvents.map((ev) => (
            <option key={ev.slug} value={ev.slug}>
              {ev.title} — {ev.date}
            </option>
          ))}
        </select>
      </label>

      {/* Error Message */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Submit */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Registration"}
        </button>

        <span className="text-sm text-muted-foreground">
          We will contact you with next steps.
        </span>
      </div>
    </form>
  );
}