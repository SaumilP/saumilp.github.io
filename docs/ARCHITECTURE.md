# Architecture

Machine Mind is a statically generated blog with a single dynamic feature (a
per-post view counter). This document describes how the pieces fit together,
the hosting topology, and the data flow for the view counter.

> **Security note:** This document intentionally contains **no credentials**.
> All secrets live in `.env.local` (local, git-ignored) and in Vercel
> environment variables (deployed). Only environment-variable *names* and a
> non-sensitive table name appear below.

## Overview

```
                    ┌──────────────────────────────────────────────┐
   Push to master ─▶│  GitHub repo (SaumilP/saumilp.github.io)      │
                    └───────────────┬───────────────┬──────────────┘
                                    │               │
                 Vercel build       │               │  GitHub Actions
              (Zola 0.22.1 + api)   │               │  (redirect site)
                                    ▼               ▼
                    ┌───────────────────────┐   ┌─────────────────────────┐
                    │  Vercel (canonical)   │   │  GitHub Pages            │
                    │  saumilpgithubio      │   │  saumilp.github.io       │
                    │  .vercel.app          │   │  → 301-style redirect    │
                    │                       │   │    to Vercel (index +    │
                    │  • static site        │   │    path-preserving 404)  │
                    │  • /api/views (func)  │   └─────────────────────────┘
                    └──────────┬────────────┘
                               │ HTTPS (REST)
                               ▼
                    ┌───────────────────────┐
                    │  Supabase (Postgres)  │
                    │  table: blog_post_views│
                    │  Row Level Security on │
                    └───────────────────────┘
```

## Components

### Static site (Zola 0.22.x)

- **Content** authored in Markdown under `content/` (`blog/`, `notes/`,
  `projects/`, `about/`, plus the `_index` home page).
- **Templating** via Tera (`templates/`) with partials, macros, and shortcodes.
- **Styling** is a hand-rolled SCSS design system (`sass/`) compiled by Zola to
  `main.css`. CSS custom properties (`sass/_tokens.scss`) drive light/dark mode.
- **Search** is built at deploy time by [Pagefind](https://pagefind.app), which
  indexes the rendered `public/` output — no server component.
- **Syntax highlighting** uses Zola 0.22's Giallo engine in `class` mode with a
  dual theme (`catppuccin-latte` / `catppuccin-mocha`). Zola emits
  `giallo-light.css` and `giallo-dark.css`; `templates/partials/head.html`
  toggles which is active based on the user's theme.

### Hosting topology

| Host | Role | Notes |
| --- | --- | --- |
| **Vercel** | Canonical site + serverless `/api` | `base_url` points here |
| **GitHub Pages** | Redirect only | Forwards legacy `saumilp.github.io` links |

The GitHub Pages redirect (`.github/workflows/deploy.yml`) publishes a tiny
two-file site:

- `index.html` — redirects the root (meta-refresh + JS + `rel=canonical`,
  marked `noindex` to avoid duplicate-content indexing).
- `404.html` — GitHub Pages serves this for any unknown path, and its JS
  redirect preserves `pathname + search + hash`, so deep links such as
  `saumilp.github.io/blog/foo/` land on `…vercel.app/blog/foo/`.

### View counter

A single serverless function, `api/views.ts`, backs the counter.

**Endpoint:** `/api/views?slug=<page-path>`

| Method | Behavior |
| --- | --- |
| `GET` | Returns `{ "views": <n> }` for the slug (0 if unseen). |
| `POST` | Increments (or inserts) the row and returns the new `{ "views": <n> }`. |

**Client** (`templates/page.html`, end-of-post block): on page load a single
`fetch(..., { method: 'POST' })` records the view and uses the returned total to
render a formatted count (`Intl.NumberFormat`) with an eye icon. One round trip
both increments and displays. If the request fails, the counter hides itself.

Because the whole site and the API share the Vercel origin, these are
**same-origin** requests — no CORS configuration is required.

**Storage:** Supabase Postgres, table `blog_post_views`:

| Column | Type | Notes |
| --- | --- | --- |
| `slug` | `text` | Primary key — the page path (e.g. `/blog/foo`). |
| `views` | `int` | View count, default `0`. |

Row Level Security is enabled on the table; the function authenticates with the
public **anon** key, so only the policy-permitted read/increment operations are
possible even though the key is client-grade.

## Request flow (a blog post)

1. Browser requests `…/blog/<post>/` from Vercel → static HTML served.
2. `main.css` + `giallo-{light,dark}.css` + page JS load from the same origin.
3. End-of-post script POSTs to `/api/views?slug=/blog/<post>`.
4. The function upserts the row in Supabase and returns the new total.
5. The script renders the formatted count.

## Configuration & secrets

| Where | Holds | Committed? |
| --- | --- | --- |
| `config.toml` | Site config, `base_url`, highlighting, nav, social | Yes (no secrets) |
| `vercel.json` | Build command (pinned Zola), routing flags | Yes |
| `.env.local` | `SUPABASE_URL`, `SUPABASE_ANON_KEY` for local `vercel dev` | **No** (git-ignored) |
| Vercel env vars | `SUPABASE_URL`, `SUPABASE_ANON_KEY` for deploys | **No** (Vercel only) |

`api/views.ts` reads `process.env.SUPABASE_URL` and
`process.env.SUPABASE_ANON_KEY` at runtime; no credential is ever hard-coded or
committed.

## Build pipeline

**Vercel (canonical):**

```
push → Vercel → download Zola 0.22.1 → zola build → public/ + deploy api/ → live
```

**GitHub Pages (redirect):**

```
push → GitHub Actions → generate index.html + 404.html → upload Pages artifact → deploy
```

## Notable design decisions

- **No analytics / no CDN tracking.** The view counter is the only telemetry and
  it stores just a slug and an integer.
- **Vanilla JS, no SPA framework.** Each interactive bit (theme toggle, search,
  copy-code, TOC, view counter) is an independent small script.
- **The counter increments per page load** (refreshes included). This is a
  deliberate simplicity trade-off; a per-visitor guard (localStorage or a
  hashed-IP check in the function) can be added later if needed.
- **Zola pinned to 0.22.1** in `vercel.json` so builds are reproducible and the
  Giallo highlighting themes resolve consistently.
