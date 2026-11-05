# Shield Africa — Admin Console Setup

The site has a full admin console at **`/admin`** where an administrator can log in and manage everything on the website.

## What the admin can do

| Section | URL | What it manages |
|---|---|---|
| Dashboard | `/admin` | Website statistics (visits/clicks, most-visited pages), registration counts, quick actions |
| Events | `/admin/events` | Add / edit / delete events, set status (**upcoming / ongoing / past**), set the **featured** upcoming event shown on the home page, event flyers/thumbnails, photo galleries, and embedded videos |
| Registrations | `/admin/registrations` | All event registrations (website + desk), search, register walk-in attendees on event day, one-tap check-in, CSV export |
| Site Content | `/admin/content` | Home hero (text, buttons, background image), marquee, impact heading & statistics, projects/programs, values (About page), testimonials, newsletter text, contact details, footer blurb and social links |
| Media Library | `/admin/media` | Upload images & videos to **Cloudflare R2**, add embeddable video links (YouTube / Vimeo / Cloudflare Stream), copy URLs for use anywhere on the site |
| Admins & Access | `/admin/admins` | The owner (or anyone granted the permission) can add other admins and choose exactly what each one can do |

The UI follows a YouTube Studio-style layout: a fixed top bar, a collapsible sidebar on laptop (click the ☰ button to switch between full and mini rail) and a slide-in drawer on smartphones.

### Accounts & permissions

- The **owner** signs in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from the environment and always has full access.
- The owner can create **managed admins** in `/admin/admins`, each with their own email + password (hashed with scrypt) and a permission set: Events, Registrations, Site Content, Media Library, Analytics, Admins & Access. Both the navigation and the APIs enforce these permissions.

### Statistics

Page views on the public site are tracked via a lightweight beacon (`/api/track`, no cookies, no personal data) and aggregated per day/page. The dashboard shows visits today / 7 days / 30 days, a 28-day chart and the most-visited pages.

## 1. Configure environment variables

Copy the example file and fill in the values:

```bash
cp .env.example .env.local
```

### Admin login

| Variable | Description |
|---|---|
| `ADMIN_EMAIL` | Email the admin signs in with |
| `ADMIN_PASSWORD` | Password the admin signs in with |
| `ADMIN_AUTH_SECRET` | Random string used to sign session tokens — generate with `openssl rand -base64 32` |

### Cloudflare R2 (media + content storage)

All uploaded images/videos **and** the editable site content (events, text, media registry) are stored in a Cloudflare R2 bucket, so content survives redeploys on any hosting platform.

1. In the [Cloudflare dashboard](https://dash.cloudflare.com) go to **R2 Object Storage** and create a bucket (e.g. `shield-africa-media`).
2. Enable public access for the bucket: **Bucket → Settings → Public access** (use the `r2.dev` URL) or connect a custom domain (recommended, e.g. `media.shieldafrica.org`).
3. Add a CORS policy to the bucket (**Settings → CORS policy**) so the browser can upload directly:

```json
[
  {
    "AllowedOrigins": ["http://localhost:3000", "https://your-production-domain.com"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

4. Create an API token: **R2 → Manage R2 API Tokens → Create API Token** with *Object Read & Write* on the bucket.
5. Fill in the env vars:

| Variable | Where to find it |
|---|---|
| `R2_ACCOUNT_ID` | R2 overview page (Account ID) |
| `R2_ACCESS_KEY_ID` | From the API token you created |
| `R2_SECRET_ACCESS_KEY` | From the API token you created |
| `R2_BUCKET` | Your bucket name |
| `R2_PUBLIC_URL` | The bucket's public URL (`https://pub-….r2.dev` or custom domain) |

> **No R2 yet?** The admin still works: content is saved to local JSON files in `data/` and uploads go to `public/uploads/`. This is fine for local development; configure R2 before deploying so content and media persist.

## 2. Run

```bash
npm run dev
```

Then open [http://localhost:3000/admin](http://localhost:3000/admin) — you'll be redirected to the login page.

## How it works

- **Auth** — `middleware.ts` protects `/admin/*` and `/api/admin/*` using a signed JWT session cookie (`jose`). Login endpoint: `POST /api/admin/auth/login`.
- **Storage** — `lib/admin/store.ts` reads/writes three JSON documents (`data/events.json`, `data/content.json`, `data/media.json`) in R2 (or local files as fallback). Defaults in `lib/content-types.ts` mirror the original site, so the site renders identically before anything is saved.
- **Uploads** — the browser requests a presigned PUT URL (`POST /api/admin/media/upload`) and uploads the file **directly to R2**, so large videos never pass through the Next.js server.
- **Video embedding** — `lib/embed.ts` converts YouTube / Vimeo / Cloudflare Stream links into embeddable iframe URLs; direct `.mp4`/`.webm` URLs (e.g. uploaded to R2) are played with a native video player.
- **Public site** — pages read live data from `GET /api/content` and `GET /api/events` (client hook `hooks/use-site-content.ts`), and the event detail page renders server-side from the store.
