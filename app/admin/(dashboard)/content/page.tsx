// app/admin/(dashboard)/content/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { jsonFetch } from "@/components/admin/api";
import { ImageInput } from "@/components/admin/image-input";
import { MultiUploadButton } from "@/components/admin/multi-upload-button";
import { CASE_STUDIES, defaultGallery, galleryFolder } from "@/lib/galleries";
import type { SiteContent } from "@/lib/content-types";

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    jsonFetch<SiteContent>("/api/admin/content")
      .then(setContent)
      .catch((e) => toast.error(e.message));
  }, []);

  async function save() {
    if (!content) return;
    setBusy(true);
    try {
      await jsonFetch("/api/admin/content", {
        method: "PUT",
        body: JSON.stringify(content),
      });
      toast.success("Site content saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  if (!content) {
    return (
      <div className="mx-auto max-w-5xl">
        <h1 className="font-serif text-3xl font-light">Site Content</h1>
        <p className="mt-6 text-sm text-muted-foreground">Loading content…</p>
      </div>
    );
  }

  const c = content;
  const set = (updater: (prev: SiteContent) => SiteContent) =>
    setContent((prev) => (prev ? updater(prev) : prev));

  return (
    <div className="mx-auto max-w-5xl pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-light">Site Content</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Everything here is live on the public website once saved.
          </p>
        </div>
        <Button onClick={save} disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Save all changes
        </Button>
      </div>

      <Tabs defaultValue="hero" className="mt-8">
        <TabsList className="flex-wrap">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="impact">Impact &amp; Stats</TabsTrigger>
          <TabsTrigger value="programs">Projects</TabsTrigger>
          <TabsTrigger value="galleries">Galleries</TabsTrigger>
          <TabsTrigger value="values">Values</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="contact">Contact &amp; Footer</TabsTrigger>
        </TabsList>

        {/* ------------------ HERO ------------------ */}
        <TabsContent value="hero" className="mt-6 space-y-5">
          <Card>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Title — line 1">
                <Input
                  value={c.hero.titleLine1}
                  onChange={(e) =>
                    set((p) => ({ ...p, hero: { ...p.hero, titleLine1: e.target.value } }))
                  }
                />
              </Field>
              <Field label="Title — line 2 (accent)">
                <Input
                  value={c.hero.titleLine2}
                  onChange={(e) =>
                    set((p) => ({ ...p, hero: { ...p.hero, titleLine2: e.target.value } }))
                  }
                />
              </Field>
              <Field label="Title — line 3 prefix">
                <Input
                  value={c.hero.titleLine3Prefix}
                  onChange={(e) =>
                    set((p) => ({ ...p, hero: { ...p.hero, titleLine3Prefix: e.target.value } }))
                  }
                />
              </Field>
              <Field label="Title — line 3 accent">
                <Input
                  value={c.hero.titleLine3Accent}
                  onChange={(e) =>
                    set((p) => ({ ...p, hero: { ...p.hero, titleLine3Accent: e.target.value } }))
                  }
                />
              </Field>
            </div>
            <Field label="Subtitle" className="mt-5">
              <Textarea
                rows={3}
                value={c.hero.subtitle}
                onChange={(e) =>
                  set((p) => ({ ...p, hero: { ...p.hero, subtitle: e.target.value } }))
                }
              />
            </Field>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Primary button label">
                <Input
                  value={c.hero.primaryCtaLabel}
                  onChange={(e) =>
                    set((p) => ({ ...p, hero: { ...p.hero, primaryCtaLabel: e.target.value } }))
                  }
                />
              </Field>
              <Field label="Primary button link">
                <Input
                  value={c.hero.primaryCtaHref}
                  onChange={(e) =>
                    set((p) => ({ ...p, hero: { ...p.hero, primaryCtaHref: e.target.value } }))
                  }
                />
              </Field>
              <Field label="Secondary button label">
                <Input
                  value={c.hero.secondaryCtaLabel}
                  onChange={(e) =>
                    set((p) => ({ ...p, hero: { ...p.hero, secondaryCtaLabel: e.target.value } }))
                  }
                />
              </Field>
              <Field label="Secondary button link">
                <Input
                  value={c.hero.secondaryCtaHref}
                  onChange={(e) =>
                    set((p) => ({ ...p, hero: { ...p.hero, secondaryCtaHref: e.target.value } }))
                  }
                />
              </Field>
            </div>
            <Field label="Hero background image" className="mt-5">
              <ImageInput
                value={c.hero.backgroundImage}
                folder="site/hero"
                onChange={(v) =>
                  set((p) => ({ ...p, hero: { ...p.hero, backgroundImage: v } }))
                }
              />
            </Field>
          </Card>

          <Card title="Scrolling marquee items">
            <ListEditor
              items={c.marquee}
              onChange={(items) => set((p) => ({ ...p, marquee: items }))}
              placeholder="e.g. Climate Resilience"
            />
          </Card>
        </TabsContent>

        {/* ------------------ IMPACT & STATS ------------------ */}
        <TabsContent value="impact" className="mt-6 space-y-5">
          <Card title="Impact section (home page)">
            <Field label="Heading">
              <Input
                value={c.impact.heading}
                onChange={(e) =>
                  set((p) => ({ ...p, impact: { ...p.impact, heading: e.target.value } }))
                }
              />
            </Field>
            <Field label="Text" className="mt-5">
              <Textarea
                rows={3}
                value={c.impact.text}
                onChange={(e) =>
                  set((p) => ({ ...p, impact: { ...p.impact, text: e.target.value } }))
                }
              />
            </Field>
          </Card>

          <Card title="Impact statistics">
            <div className="space-y-3">
              {c.stats.map((s, i) => (
                <div key={i} className="flex items-end gap-3">
                  <Field label={i === 0 ? "Label" : ""} className="flex-1">
                    <Input
                      value={s.label}
                      onChange={(e) =>
                        set((p) => ({
                          ...p,
                          stats: p.stats.map((x, j) =>
                            j === i ? { ...x, label: e.target.value } : x
                          ),
                        }))
                      }
                    />
                  </Field>
                  <Field label={i === 0 ? "Value" : ""} className="w-32">
                    <Input
                      type="number"
                      value={s.value}
                      onChange={(e) =>
                        set((p) => ({
                          ...p,
                          stats: p.stats.map((x, j) =>
                            j === i ? { ...x, value: Number(e.target.value) || 0 } : x
                          ),
                        }))
                      }
                    />
                  </Field>
                  <Field label={i === 0 ? "Suffix" : ""} className="w-20">
                    <Input
                      value={s.suffix}
                      placeholder="+"
                      onChange={(e) =>
                        set((p) => ({
                          ...p,
                          stats: p.stats.map((x, j) =>
                            j === i ? { ...x, suffix: e.target.value } : x
                          ),
                        }))
                      }
                    />
                  </Field>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive"
                    onClick={() =>
                      set((p) => ({ ...p, stats: p.stats.filter((_, j) => j !== i) }))
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  set((p) => ({
                    ...p,
                    stats: [...p.stats, { label: "", value: 0, suffix: "" }],
                  }))
                }
              >
                <Plus className="h-4 w-4" /> Add stat
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ------------------ PROGRAMS ------------------ */}
        <TabsContent value="programs" className="mt-6 space-y-5">
          {c.programs.map((prog, i) => (
            <Card key={i} title={prog.title || `Project ${i + 1}`}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Title">
                  <Input
                    value={prog.title}
                    onChange={(e) =>
                      set((p) => ({
                        ...p,
                        programs: p.programs.map((x, j) =>
                          j === i ? { ...x, title: e.target.value } : x
                        ),
                      }))
                    }
                  />
                </Field>
                <Field label="Category">
                  <Input
                    value={prog.category}
                    onChange={(e) =>
                      set((p) => ({
                        ...p,
                        programs: p.programs.map((x, j) =>
                          j === i ? { ...x, category: e.target.value } : x
                        ),
                      }))
                    }
                  />
                </Field>
                <Field label="Location">
                  <Input
                    value={prog.location}
                    onChange={(e) =>
                      set((p) => ({
                        ...p,
                        programs: p.programs.map((x, j) =>
                          j === i ? { ...x, location: e.target.value } : x
                        ),
                      }))
                    }
                  />
                </Field>
                <Field label="Case study link">
                  <Input
                    value={prog.caseStudyUrl}
                    onChange={(e) =>
                      set((p) => ({
                        ...p,
                        programs: p.programs.map((x, j) =>
                          j === i ? { ...x, caseStudyUrl: e.target.value } : x
                        ),
                      }))
                    }
                  />
                </Field>
              </div>
              <Field label="Description" className="mt-5">
                <Textarea
                  rows={3}
                  value={prog.description}
                  onChange={(e) =>
                    set((p) => ({
                      ...p,
                      programs: p.programs.map((x, j) =>
                        j === i ? { ...x, description: e.target.value } : x
                      ),
                    }))
                  }
                />
              </Field>
              <Field
                label="Image (key like “education” or full image URL / upload)"
                className="mt-5"
              >
                <ImageInput
                  value={prog.image}
                  folder={`impact/${prog.slug || "projects"}`}
                  previewType={prog.image.startsWith("/") || prog.image.startsWith("http") ? "image" : "none"}
                  onChange={(v) =>
                    set((p) => ({
                      ...p,
                      programs: p.programs.map((x, j) =>
                        j === i ? { ...x, image: v } : x
                      ),
                    }))
                  }
                />
              </Field>
              <div className="mt-5">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() =>
                    set((p) => ({
                      ...p,
                      programs: p.programs.filter((_, j) => j !== i),
                    }))
                  }
                >
                  <Trash2 className="h-4 w-4" /> Remove project
                </Button>
              </div>
            </Card>
          ))}
          <Button
            variant="outline"
            onClick={() =>
              set((p) => ({
                ...p,
                programs: [
                  ...p.programs,
                  {
                    slug: `project-${p.programs.length + 1}`,
                    title: "",
                    category: "",
                    location: "",
                    description: "",
                    image: "",
                    caseStudyUrl: "/impact",
                  },
                ],
              }))
            }
          >
            <Plus className="h-4 w-4" /> Add project
          </Button>
        </TabsContent>

        {/* ------------------ GALLERIES ------------------ */}
        <TabsContent value="galleries" className="mt-6 space-y-5">
          <p className="rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground">
            These are the photo galleries shown on each impact case-study page
            (e.g. the <span className="font-medium">Pagi Medical Outreach</span>{" "}
            gallery). Uploads are stored in that project&apos;s own folder — for
            example <code className="rounded bg-muted px-1.5 py-0.5">impact/pagi-medical</code>{" "}
            — so every picture ends up in the right place. Until you change a
            gallery, the website keeps using its built-in photos.
          </p>

          {CASE_STUDIES.map((cs) => {
            const custom = c.galleries[cs.slug];
            const isCustom = Boolean(custom && custom.length > 0);
            const images = isCustom ? custom! : defaultGallery(cs.slug);

            const setGallery = (imgs: string[]) =>
              set((p) => ({
                ...p,
                galleries: { ...p.galleries, [cs.slug]: imgs },
              }));

            const resetGallery = () =>
              set((p) => {
                const next = { ...p.galleries };
                delete next[cs.slug];
                return { ...p, galleries: next };
              });

            return (
              <Card key={cs.slug}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-xl">{cs.title}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Folder:{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5">
                        {galleryFolder(cs.slug)}
                      </code>{" "}
                      · {images.length} photo{images.length === 1 ? "" : "s"}
                      {isCustom ? " (customised)" : " (built-in)"}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <MultiUploadButton
                      folder={galleryFolder(cs.slug)}
                      label="Upload photos"
                      onUploaded={(urls) =>
                        setGallery([...(isCustom ? custom! : defaultGallery(cs.slug)), ...urls])
                      }
                    />
                    {isCustom && (
                      <Button variant="outline" size="sm" onClick={resetGallery}>
                        Reset to built-in
                      </Button>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">
                  {images.slice(0, 21).map((src, i) => (
                    <div
                      key={`${src}-${i}`}
                      className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        title="Remove from gallery"
                        onClick={() =>
                          setGallery(images.filter((_, j) => j !== i))
                        }
                        className="absolute right-1 top-1 hidden h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white group-hover:flex"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  {images.length > 21 && (
                    <div className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">
                      +{images.length - 21} more
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </TabsContent>

        {/* ------------------ VALUES ------------------ */}
        <TabsContent value="values" className="mt-6 space-y-5">
          {c.values.map((v, i) => (
            <Card key={i}>
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-5">
                  <Field label="Title">
                    <Input
                      value={v.title}
                      onChange={(e) =>
                        set((p) => ({
                          ...p,
                          values: p.values.map((x, j) =>
                            j === i ? { ...x, title: e.target.value } : x
                          ),
                        }))
                      }
                    />
                  </Field>
                  <Field label="Text">
                    <Textarea
                      rows={2}
                      value={v.body}
                      onChange={(e) =>
                        set((p) => ({
                          ...p,
                          values: p.values.map((x, j) =>
                            j === i ? { ...x, body: e.target.value } : x
                          ),
                        }))
                      }
                    />
                  </Field>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-destructive"
                  onClick={() =>
                    set((p) => ({ ...p, values: p.values.filter((_, j) => j !== i) }))
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
          <Button
            variant="outline"
            onClick={() =>
              set((p) => ({ ...p, values: [...p.values, { title: "", body: "" }] }))
            }
          >
            <Plus className="h-4 w-4" /> Add value
          </Button>
        </TabsContent>

        {/* ------------------ TESTIMONIALS ------------------ */}
        <TabsContent value="testimonials" className="mt-6 space-y-5">
          {c.testimonials.map((t, i) => (
            <Card key={i}>
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-5">
                  <Field label="Quote">
                    <Textarea
                      rows={3}
                      value={t.quote}
                      onChange={(e) =>
                        set((p) => ({
                          ...p,
                          testimonials: p.testimonials.map((x, j) =>
                            j === i ? { ...x, quote: e.target.value } : x
                          ),
                        }))
                      }
                    />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name">
                      <Input
                        value={t.name}
                        onChange={(e) =>
                          set((p) => ({
                            ...p,
                            testimonials: p.testimonials.map((x, j) =>
                              j === i ? { ...x, name: e.target.value } : x
                            ),
                          }))
                        }
                      />
                    </Field>
                    <Field label="Role">
                      <Input
                        value={t.role}
                        onChange={(e) =>
                          set((p) => ({
                            ...p,
                            testimonials: p.testimonials.map((x, j) =>
                              j === i ? { ...x, role: e.target.value } : x
                            ),
                          }))
                        }
                      />
                    </Field>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-destructive"
                  onClick={() =>
                    set((p) => ({
                      ...p,
                      testimonials: p.testimonials.filter((_, j) => j !== i),
                    }))
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
          <Button
            variant="outline"
            onClick={() =>
              set((p) => ({
                ...p,
                testimonials: [...p.testimonials, { quote: "", name: "", role: "" }],
              }))
            }
          >
            <Plus className="h-4 w-4" /> Add testimonial
          </Button>

          <Card title="Newsletter section">
            <Field label="Heading">
              <Input
                value={c.newsletter.heading}
                onChange={(e) =>
                  set((p) => ({
                    ...p,
                    newsletter: { ...p.newsletter, heading: e.target.value },
                  }))
                }
              />
            </Field>
            <Field label="Text" className="mt-5">
              <Textarea
                rows={2}
                value={c.newsletter.text}
                onChange={(e) =>
                  set((p) => ({
                    ...p,
                    newsletter: { ...p.newsletter, text: e.target.value },
                  }))
                }
              />
            </Field>
          </Card>
        </TabsContent>

        {/* ------------------ CONTACT & FOOTER ------------------ */}
        <TabsContent value="contact" className="mt-6 space-y-5">
          <Card title="Contact details">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email">
                <Input
                  value={c.contact.email}
                  onChange={(e) =>
                    set((p) => ({ ...p, contact: { ...p.contact, email: e.target.value } }))
                  }
                />
              </Field>
              <Field label="Phone">
                <Input
                  value={c.contact.phone}
                  onChange={(e) =>
                    set((p) => ({ ...p, contact: { ...p.contact, phone: e.target.value } }))
                  }
                />
              </Field>
            </div>
            <Field label="Address" className="mt-5">
              <Textarea
                rows={2}
                value={c.contact.address}
                onChange={(e) =>
                  set((p) => ({ ...p, contact: { ...p.contact, address: e.target.value } }))
                }
              />
            </Field>
          </Card>

          <Card title="Footer">
            <Field label="Footer blurb">
              <Textarea
                rows={2}
                value={c.footer.blurb}
                onChange={(e) =>
                  set((p) => ({ ...p, footer: { ...p.footer, blurb: e.target.value } }))
                }
              />
            </Field>
            <div className="mt-5">
              <Label className="text-sm">Social links</Label>
              <div className="mt-3 space-y-3">
                {c.footer.socials.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      className="w-40"
                      value={s.label}
                      placeholder="Label"
                      onChange={(e) =>
                        set((p) => ({
                          ...p,
                          footer: {
                            ...p.footer,
                            socials: p.footer.socials.map((x, j) =>
                              j === i ? { ...x, label: e.target.value } : x
                            ),
                          },
                        }))
                      }
                    />
                    <Input
                      value={s.href}
                      placeholder="https://…"
                      onChange={(e) =>
                        set((p) => ({
                          ...p,
                          footer: {
                            ...p.footer,
                            socials: p.footer.socials.map((x, j) =>
                              j === i ? { ...x, href: e.target.value } : x
                            ),
                          },
                        }))
                      }
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex-none text-destructive"
                      onClick={() =>
                        set((p) => ({
                          ...p,
                          footer: {
                            ...p.footer,
                            socials: p.footer.socials.filter((_, j) => j !== i),
                          },
                        }))
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    set((p) => ({
                      ...p,
                      footer: {
                        ...p.footer,
                        socials: [...p.footer.socials, { label: "", href: "" }],
                      },
                    }))
                  }
                >
                  <Plus className="h-4 w-4" /> Add social link
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Button onClick={save} disabled={busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Save all changes
        </Button>
      </div>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-background p-6">
      {title && <h2 className="mb-5 font-serif text-xl">{title}</h2>}
      {children}
    </section>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      {label ? <Label className="text-sm">{label}</Label> : null}
      {children}
    </div>
  );
}

function ListEditor({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={item}
            placeholder={placeholder}
            onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))}
          />
          <Button
            variant="outline"
            size="icon"
            className="flex-none text-destructive"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => onChange([...items, ""])}>
        <Plus className="h-4 w-4" /> Add item
      </Button>
    </div>
  );
}
