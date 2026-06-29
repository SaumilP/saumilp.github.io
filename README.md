# Machine Mind

Personal technical blog & portfolio of **Saumil Patel** — practical notes on
software architecture, backend engineering, cloud systems, Rust, Java, and
developer tooling.

Built with [Zola](https://www.getzola.org) 0.22.x, a custom Tera + SCSS design
system, [Pagefind](https://pagefind.app) search, and a few tiny vanilla-JS
modules. No front-end framework and no external analytics. The only dynamic
piece is a per-post **view counter** backed by a Vercel serverless function and
Supabase.

The site is hosted on **Vercel** (static site + `/api`); the legacy
`saumilp.github.io` GitHub Pages URL now serves a path-preserving redirect to
the Vercel deployment.

> Full design — request flow, hosting topology, and the view-counter data path —
> is documented in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Local development

```sh
# Requires Zola 0.22.x
zola serve            # http://127.0.0.1:1111 (live reload; search needs a full build)
```

To preview search locally, build the full pipeline and serve `public/`:

```sh
zola build
npx -y pagefind@1.1.1 --site public
cd public && python3 -m http.server 8000   # then open http://localhost:8000
```

### Running the view-counter API locally

The `/api/views` function needs the Vercel runtime and Supabase credentials.
Create a `.env.local` (git-ignored — never commit it) with **your own** values:

```sh
SUPABASE_URL=...            # your Supabase project URL
SUPABASE_ANON_KEY=...       # the public anon key (RLS-protected)
```

Then:

```sh
npm install
npx vercel dev             # serves the site + /api together
```

> Secrets live only in `.env.local` (local) and Vercel **Project → Settings →
> Environment Variables** (deployed). No keys are stored in the repository.

## Validation

```sh
zola check                              # links + templates
zola build                              # production build into ./public
python3 scripts/check_links.py public   # internal link / asset audit
```

## Structure

```
content/      Markdown — _index (home), blog/, notes/, projects/, about/
templates/    base, index, section, page, taxonomy_*, 404, projects, about
              partials/ (head, seo, header, footer, search-modal, pagination, toc)
              macros/   (icons, meta, cards)
              shortcodes/ (callout, figure, repo_card)
sass/         design system (tokens, reset, base, layout, header, footer,
              home, cards, article, code, search, utilities) -> main.css
static/js/    mobile-nav, theme-toggle, search, copy-code, toc
api/          views.ts — serverless view counter (Supabase)
config.toml   site config, nav, social, topics, curated projects
vercel.json   Vercel build (pinned Zola 0.22.1) + clean URLs
docs/         ARCHITECTURE.md
```

## Deployment

| Target | What it serves | Trigger |
| --- | --- | --- |
| **Vercel** | Canonical site + `/api/views` | Push to `master` (auto) |
| **GitHub Pages** | Redirect to the Vercel URL | `.github/workflows/deploy.yml` on push |

Vercel builds the site by downloading the pinned Zola 0.22.1 release (see
`vercel.json`) and serving `public/`. The serverless function in `api/` is
deployed automatically and reads its Supabase credentials from Vercel
environment variables.

> **One-time setup:** in the repo **Settings → Pages**, set **Source** to
> **GitHub Actions** so the redirect workflow takes effect.

## References

- [Architecture & data flow](docs/ARCHITECTURE.md)
- [Favicon generation](https://realfavicongenerator.net/)
