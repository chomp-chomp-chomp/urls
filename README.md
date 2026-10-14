# chom.pm / chmp.me — URL Shortener & Link Toolkit

A URL shortener and link-cleaning toolkit built as a single Cloudflare Worker, backed by Workers KV, spanning two custom domains:

- **[chmp.me](https://chmp.me)** — a homepage/directory linking out to this and other sibling tools (`dl.`, `clip.`, `cooling.`, `summit.chmp.me`).
- **[chom.pm](https://chom.pm)** — where the shortener itself lives: `/clean`, `/admin`, and every generated short link (`chom.pm/{code}`). `chmp.me/clean` and `chmp.me/admin` redirect here automatically; old `chmp.me/{code}` links keep working.

## What's here

- **`/clean`** (chom.pm) — "URL Strip": paste a URL, strip tracking parameters (`utm_*`, `fbclid`, `gclid`, etc.), trace its redirect chain, and generate Email/Contact QR codes. No login, no API key — just the stripper and the untracked QR generator.
- **`/admin`** (chom.pm) — everything else: create, search, tag, and bulk-manage short links; CSV export/import; per-link QR codes (including trackable Link QR codes); click analytics.
- **`/{shortCode}`** — the actual redirect, with click tracking, resolved on either domain.

## Features

- **Tracking-parameter stripping** (`/clean`) — removes `utm_*`, `fbclid`, `gclid`, and dozens of other known tracking params from a pasted URL, with a redirect-chain tracer (`/api/peek`) alongside it.
- **Short links** (`/admin`) — random or custom short codes, optional titles and tags, bulk CSV upload, CSV export.
- **QR codes** — generated entirely client-side (vendored [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator), nothing sent to a third party):
  - **Link** QR codes reuse the shortener, so scans are tracked like any other click. Admin only, since it's the only page that can create/manage short links.
  - **Email** and **Contact (vCard)** QR codes are encoded directly in the browser and never touch the server — available on both `/clean` and `/admin`.
- **Click analytics** (`/admin`), per link:
  - Aggregate totals: click count, last-clicked time, top referrer, top country, top city.
  - A rolling log of the 50 most recent individual hits — timestamp, full referrer URL, and city/region/country (via Cloudflare's edge geolocation, `request.cf`). No IP address is ever captured or stored.
- **Two ways in**: a password-protected admin panel, and a public API secured by an API key (`X-API-Key`), for scripts and integrations.
- Dark mode, installable PWA icons for `/clean`.

## Project structure

```
urls/
├── worker-themed-no-titles.js   # The entire app: Worker + every HTML page, inlined as JS template literals.
│                                 # This is the file that's actually deployed — see `main` in wrangler.toml.
├── wrangler.toml                 # Cloudflare config: Worker name, KV binding, static asset rules
├── .assetsignore                 # Restricts the static-assets binding to /clean/* only (icons, manifest)
├── clean/                        # Static icons/manifest served at /clean/*
├── chrome-extension/             # Standalone Chrome extension that calls /api/shorten (see its own README)
├── .github/workflows/deploy.yml  # Auto-deploys to Cloudflare on push to `main`
└── *.md                          # Deep-dive docs (API usage, bookmarklets, iOS Shortcuts, etc.) — see below
```

> **Note:** `src/` and the other `worker-*.js` files at the repo root (`worker-bundle.js`, `worker-enhanced.js`, `worker-themed.js`, `worker-with-tracking.js`, etc.) are earlier iterations kept for reference. They are **not** deployed — `worker-themed-no-titles.js` is the single source of truth for everything that runs in production. When making changes, edit that file.

## Setup

### Prerequisites

- Node.js and the Wrangler CLI (`npm install` pulls in `wrangler` as a dev dependency)
- A Cloudflare account with Workers + KV enabled

### Local setup

```bash
npm install
npx wrangler login

# Create the KV namespace (only needed once) and update the id in wrangler.toml
npx wrangler kv:namespace create "URLS"
```

Set the two secrets the Worker reads at runtime:

```bash
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put API_KEY
```

### Run locally

```bash
npm run dev
```

### Deploy

Pushing to `main` deploys automatically via `.github/workflows/deploy.yml` (needs `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `ADMIN_PASSWORD`, and `API_KEY` set as GitHub Actions secrets). To deploy manually instead:

```bash
npm run deploy
```

## API

The public API is a single endpoint, authenticated with your API key:

```bash
curl -X POST https://chom.pm/api/shorten \
  -H "X-API-Key: YOUR-API-KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/long/url", "shortCode": "optional-custom-code"}'
```

```json
{ "success": true, "shortCode": "abc123", "url": "https://example.com/long/url", "shortUrl": "https://chom.pm/abc123" }
```

The response's `shortUrl` is always `chom.pm`, regardless of which domain `/api/shorten` was actually called through.

Admin routes (`/admin/*`) use the same shape but authenticate with a login token from `POST /admin/login` instead of an API key, and additionally support listing, editing, tagging, deleting (single/bulk), stats, the click log, and CSV export/import.

For more — including language-specific examples, newsletter-platform integrations, and troubleshooting — see **[example-usage.md](example-usage.md)** and **[API-USAGE.md](API-USAGE.md)**.

## Other docs in this repo

| File | What it covers |
|---|---|
| [API-USAGE.md](API-USAGE.md) / [example-usage.md](example-usage.md) | Full API reference and integration examples |
| [CLICK-TRACKING.md](CLICK-TRACKING.md) | How click analytics work |
| [BOOKMARKLET.md](BOOKMARKLET.md) | A browser bookmarklet for quick shortening |
| [IOS-SHORTCUTS.md](IOS-SHORTCUTS.md) | iOS Shortcuts integration |
| [INTEGRATIONS.md](INTEGRATIONS.md) | Third-party integration patterns |
| [chrome-extension/README.md](chrome-extension/README.md) | The Chrome extension in this repo |
| [CLOUDFLARE-SETUP-GUIDE.md](CLOUDFLARE-SETUP-GUIDE.md), [GITHUB-ACTIONS-SETUP.md](GITHUB-ACTIONS-SETUP.md), [DEPLOY-STEPS.md](DEPLOY-STEPS.md) | Deployment walkthroughs |
| [FAVICON-SETUP.md](FAVICON-SETUP.md), [ADD-ICONS-GUIDE.md](ADD-ICONS-GUIDE.md) | Icon/PWA asset setup |

Some of these predate recent features (QR codes, tags, the click log, the chom.pm domain split) and may describe an earlier version of the admin UI or use `chmp.me` in examples where `chom.pm` is now canonical — when in doubt, the behavior in `worker-themed-no-titles.js` is current.

## Security notes

- Admin auth is a password-derived token with a 7-day server-side expiry, stored in `localStorage` so it survives across tabs/sessions.
- `/clean` requires no login or API key at all — it only strips URLs, traces redirects, and generates untracked Email/Contact QR codes.
- The public API is gated by a separate API key, independent of the admin password.
- No IP addresses are collected anywhere in click tracking — only Cloudflare's coarse edge geolocation (country/region/city).
- For production, prefer `wrangler secret put` over plaintext `[vars]` in `wrangler.toml` for `ADMIN_PASSWORD` and `API_KEY`.

## License

MIT
