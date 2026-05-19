"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageLayout } from "@/components/page-layout";
import { Reveal } from "@/components/reveal";

const tabs = ["Partnership", "Volunteer", "General"] as const;

export default function ContactPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Partnership");
  return (
    <PageLayout>
      <section className="relative pt-40 pb-20 sm:pt-48 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.18em] text-primary">
              Get In Touch
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-light leading-[1.05] text-balance sm:text-7xl">
              Let&apos;s build the next{" "}
              <span className="italic text-primary">decade</span> together.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="space-y-6">
              <ContactItem
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value="inquiries@shieldafrica.org"
              />
              <ContactItem
                icon={<Phone className="h-5 w-5" />}
                label="Phone"
                value="+234 810 060 0657"
              />
              <ContactItem
                icon={<MapPin className="h-5 w-5" />}
                label="Headquarters"
                value="Shield Africa Office, 2105 Herbert Macaulay Way, Wuse Zone 6, FCT Abuja"
              />

              <div className="rounded-3xl border border-border bg-surface p-7">
                <div className="font-serif text-lg">Our commitments</div>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li>Reply to every partnership inquiry within 48 hours.</li>
                  <li>Share due-diligence packets on request.</li>
                  <li>Co-design programs — never deliver them to you.</li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl border border-border bg-surface-elevated p-8 shadow-soft sm:p-10">
              <div className="flex flex-wrap gap-2">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      tab === t
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-8 grid gap-4 sm:grid-cols-2"
              >
                <Field label="Full name" name="name" />
                <Field label="Email" name="email" type="email" />
                {tab !== "General" && (
                  <Field label="Organization" name="org" />
                )}
                {tab === "Partnership" && (
                  <Field label="Partnership type" name="type" placeholder="Funder, Government, Implementing partner" />
                )}
                {tab === "Volunteer" && (
                  <Field label="Area of interest" name="area" placeholder="Agriculture, Education, Health..." />
                )}
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                    {tab === "Volunteer" ? "Why do you want to volunteer?" : "Message"}
                  </label>
                  <textarea
                    rows={5}
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button
                  type="submit"
                  className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition hover:shadow-elevated"
                >
                  Send {tab.toLowerCase()} inquiry
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface-elevated p-5">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {label}
        </div>
        <div className="mt-1 font-medium">{value}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-full border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
