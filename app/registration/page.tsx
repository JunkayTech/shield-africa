"use client";

import React, { useState } from "react";
import { PageLayout } from "@/components/page-layout";
import { Reveal } from "@/components/reveal";

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

const upcomingEvents = [
  {
    slug: "green-insight-book-launch-2026",
    title: "Green Insight Book Launch — Vol. 2",
    date: "Friday, 28th August, 2026",
  },
];

export default function RegistrationPage() {
  return (
    <PageLayout>
      <section
        id="register"
        className="overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32"
      >
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Reveal>
            <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-surface-elevated p-5 sm:rounded-3xl sm:p-8">
              <h2 className="font-serif text-2xl font-medium sm:text-3xl">
                Registration Details
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Please complete the form below to register for the
                event.
              </p>

              <RegistrationForm upcomingEvents={upcomingEvents} />
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}

/* =========================================================
   REGISTRATION FORM
========================================================= */

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

    /* =========================
       VALIDATION
    ========================= */

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone
    ) {
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
      setError(
        "Please select a sector or choose Other and specify."
      );
      return;
    }

    if (form.sector === "Other" && !form.sectorOther) {
      setError("Please specify your sector.");
      return;
    }

    if (!form.state) {
      setError(
        "Please select a state or choose Other and specify."
      );
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
      /* =========================
         PREPARE PAYLOAD
      ========================= */

      const payload = {
        ...form,
        submittedAt: new Date().toISOString(),
      };

      /* =========================
         GOOGLE APPS SCRIPT
      ========================= */

      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbyG2r6lbwdCU8tHjz-TusEBLh6--gYD49h0C9aJAQfxsPxtttnAP7VieK6wDSs5Anrt/exec";

      /* =========================
         SEND TO GOOGLE
      ========================= */

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      /* =========================
         READ GOOGLE RESPONSE
      ========================= */

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message ||
            "Registration could not be completed."
        );
      }

      /* =========================
         SUCCESS MESSAGE
      ========================= */

      setSuccess(
        `Registration successful! Your registration number is ${result.registrationNumber}. A confirmation email has been sent to ${form.email}.`
      );

      setSubmitting(false);

      /* =========================
         RESET FORM
      ========================= */

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
    <form
      onSubmit={handleSubmit}
      className="mt-6 grid min-w-0 w-full max-w-full gap-5"
    >
      {/* =====================================================
          PERSONAL INFORMATION
      ===================================================== */}

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        {/* First Name */}
        <label className="flex min-w-0 flex-col">
          <span className="text-sm font-medium">
            First Name
          </span>

          <input
            value={form.firstName}
            onChange={(e) =>
              update("firstName", e.target.value)
            }
            required
            placeholder="First name"
            className="mt-2 block w-full min-w-0 max-w-full rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>

        {/* Last Name */}
        <label className="flex min-w-0 flex-col">
          <span className="text-sm font-medium">
            Last Name
          </span>

          <input
            value={form.lastName}
            onChange={(e) =>
              update("lastName", e.target.value)
            }
            required
            placeholder="Last name"
            className="mt-2 block w-full min-w-0 max-w-full rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>
      </div>

      {/* Email / Phone / Gender */}
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Email */}
        <label className="flex min-w-0 flex-col">
          <span className="text-sm font-medium">
            Email Address
          </span>

          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              update("email", e.target.value)
            }
            required
            placeholder="you@organization.org"
            className="mt-2 block w-full min-w-0 max-w-full rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>

        {/* Phone */}
        <label className="flex min-w-0 flex-col">
          <span className="text-sm font-medium">
            Phone Number
          </span>

          <input
            type="tel"
            value={form.phone}
            onChange={(e) =>
              update("phone", e.target.value)
            }
            required
            placeholder="+234 810 000 0000"
            className="mt-2 block w-full min-w-0 max-w-full rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>

        {/* Gender */}
        <label className="flex min-w-0 flex-col">
          <span className="text-sm font-medium">
            Gender
          </span>

          <select
            value={form.gender}
            onChange={(e) =>
              update("gender", e.target.value)
            }
            className="mt-2 block w-full min-w-0 max-w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          >
            <option value="">Select</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </label>
      </div>

      {/* =====================================================
          AGE GROUP
      ===================================================== */}

      <label className="flex min-w-0 flex-col">
        <span className="text-sm font-medium">
          Age Group
        </span>

        <select
          value={form.ageGroup}
          onChange={(e) =>
            update("ageGroup", e.target.value)
          }
          required
          className="mt-2 block w-full min-w-0 max-w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        >
          <option value="">Select age group</option>

          {AGE_GROUPS.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
      </label>

      {/* =====================================================
          PROFESSIONAL INFORMATION
      ===================================================== */}

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Organization */}
        <label className="flex min-w-0 flex-col">
          <span className="text-sm font-medium">
            Organization / Institution
          </span>

          <input
            value={form.organization}
            onChange={(e) =>
              update("organization", e.target.value)
            }
            placeholder="Organization or institution"
            className="mt-2 block w-full min-w-0 max-w-full rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>

        {/* Job Title */}
        <label className="flex min-w-0 flex-col">
          <span className="text-sm font-medium">
            Job Title / Role
          </span>

          <input
            value={form.jobTitle}
            onChange={(e) =>
              update("jobTitle", e.target.value)
            }
            placeholder="Job title or role"
            className="mt-2 block w-full min-w-0 max-w-full rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>
      </div>

      {/* =====================================================
          SECTOR
      ===================================================== */}

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Sector */}
        <label className="flex min-w-0 flex-col">
          <span className="text-sm font-medium">
            Sector / Industry
          </span>

          <select
            value={form.sector}
            onChange={(e) =>
              update("sector", e.target.value)
            }
            required
            className="mt-2 block w-full min-w-0 max-w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          >
            <option value="">Select sector</option>

            {SECTORS.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </label>

        {/* Other Sector */}
        {form.sector === "Other" && (
          <label className="flex min-w-0 flex-col">
            <span className="text-sm font-medium">
              Please specify sector
            </span>

            <input
              value={form.sectorOther}
              onChange={(e) =>
                update("sectorOther", e.target.value)
              }
              placeholder="Specify sector"
              className="mt-2 block w-full min-w-0 max-w-full rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
        )}
      </div>

      {/* =====================================================
          COUNTRY / STATE
      ===================================================== */}

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Country */}
        <label className="flex min-w-0 flex-col">
          <span className="text-sm font-medium">
            Country
          </span>

          <input
            value={form.country}
            onChange={(e) =>
              update("country", e.target.value)
            }
            placeholder="Country"
            className="mt-2 block w-full min-w-0 max-w-full rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>

        {/* State */}
        <label className="flex min-w-0 flex-col">
          <span className="text-sm font-medium">
            State
          </span>

          <select
            value={form.state}
            onChange={(e) =>
              update("state", e.target.value)
            }
            required
            className="mt-2 block w-full min-w-0 max-w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          >
            <option value="">Select state</option>

            {NIGERIAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Other State */}
      {form.state === "Other" && (
        <label className="flex min-w-0 flex-col">
          <span className="text-sm font-medium">
            Please specify state
          </span>

          <input
            value={form.stateOther}
            onChange={(e) =>
              update("stateOther", e.target.value)
            }
            placeholder="Specify state"
            className="mt-2 block w-full min-w-0 max-w-full rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>
      )}

      {/* =====================================================
          FUTURE INFORMATION + CONSENT
      ===================================================== */}

      <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Future information */}
        <div className="min-w-0">
          <div className="break-words text-sm font-medium leading-relaxed">
            Would you like to receive information about future Shield
            Africa programmes?
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <label
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 ${
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
                onChange={() =>
                  update("futureInfo", "yes")
                }
              />

              <span>Yes</span>
            </label>

            <label
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 ${
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
                onChange={() =>
                  update("futureInfo", "no")
                }
              />

              <span>No</span>
            </label>
          </div>
        </div>

        {/* Consent */}
        <label className="flex min-w-0 items-start gap-3">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) =>
              update("consent", e.target.checked)
            }
            className="mt-1.5 h-4 w-4 shrink-0"
          />

          <div className="min-w-0">
            <div className="break-words text-sm font-medium leading-relaxed">
              Consent to receive updates from Shield Africa
            </div>

            <div className="mt-1 break-words text-sm leading-relaxed text-muted-foreground">
              I consent to receive updates and communications from
              Shield Africa.
            </div>
          </div>
        </label>
      </div>

      {/* =====================================================
          EVENT
      ===================================================== */}

      <label className="flex min-w-0 flex-col">
        <span className="text-sm font-medium">
          Event
        </span>

        <select
          value={form.eventSlug}
          onChange={(e) =>
            update("eventSlug", e.target.value)
          }
          className="mt-2 block w-full min-w-0 max-w-full overflow-hidden rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        >
          {upcomingEvents.map((event) => (
            <option
              key={event.slug}
              value={event.slug}
            >
              {event.title} — {event.date}
            </option>
          ))}
        </select>
      </label>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div
          role="alert"
          className="min-w-0 break-words rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-600"
        >
          {error}
        </div>
      )}

      {/* =====================================================
          SUCCESS
      ===================================================== */}

      {success && (
        <div
          role="status"
          className="min-w-0 break-words rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm leading-relaxed text-green-700"
        >
          {success}
        </div>
      )}

      {/* =====================================================
          SUBMIT
      ===================================================== */}

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting
            ? "Submitting..."
            : "Submit Registration"}
        </button>

        <span className="break-words text-center text-sm leading-relaxed text-muted-foreground sm:text-left">
          We will contact you with next steps.
        </span>
      </div>
    </form>
  );
}