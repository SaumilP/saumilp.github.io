# saumilp.github.io

This repository serves a lightweight **redirect** from the old GitHub Pages URL
to the site's current home:

**➡️ https://saumilp.dev**

The site itself is built and deployed separately; this repo only forwards
visitors so existing links, bookmarks, and search results keep working.

## How it works

- **`index.html`** — redirects the root to `https://saumilp.dev/`.
- **`404.html`** — GitHub Pages serves this for any path it can't find, so a
  deep link such as `/blog/some-post/` is forwarded to the **same path** on the
  new domain (path, query string, and hash are all preserved). A `<meta refresh>`
  provides a no-JavaScript fallback to the site root.

No build step or CI is involved — the two static pages are served directly by
GitHub Pages.

## Configuration

GitHub Pages is configured to **Deploy from a branch** using `main` at the root
(`/`). Pushing to `main` publishes the redirect automatically.
