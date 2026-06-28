# Recommended security headers

This site is a **static** Zola site hosted on **GitHub Pages**.

> **GitHub Pages limitation:** GitHub Pages does **not** support custom HTTP
> response headers. The headers below cannot be applied on GitHub Pages today.
> They are documented here so they can be enabled verbatim if the site later
> moves to a host that supports custom headers (Cloudflare Pages, Netlify,
> Vercel, or an Nginx/Caddy reverse proxy).
>
> A meta-tag CSP is intentionally **not** shipped: the site uses a small inline
> theme script in `<head>` (to avoid a flash of the wrong theme) and Zola emits
> inline styles, so a strict meta CSP would either break rendering or require
> `'unsafe-inline'`, which defeats the purpose. A real HTTP `Content-Security-Policy`
> header (below) is the correct mechanism — apply it when on a capable host.

## Recommended response headers

```
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data: https:; font-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; form-action 'self'; upgrade-insecure-requests
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
X-Frame-Options: DENY
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```

### CSP notes for this site

- `script-src 'self' 'unsafe-inline'` — required for the inline no-flash theme
  script in `head.html`. To use a stricter `script-src 'self'` without
  `'unsafe-inline'`, move that script to an external file or add a per-build
  nonce/hash (only possible on a host that can inject headers).
- `style-src 'self' 'unsafe-inline'` — Zola/markdown may emit inline styles.
- `connect-src 'self'` — Pagefind fetches its static index from the same origin.
- `img-src 'self' data: https:` — allows local images and inline data URIs; tighten
  to `'self' data:` if no remote images are ever embedded.
- No third-party script, font, or analytics origins are required.

## Cloudflare Pages example (`_headers`)

```
/*
  Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data: https:; font-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; form-action 'self'; upgrade-insecure-requests
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
  X-Frame-Options: DENY
```

## Nginx example

```
add_header Content-Security-Policy "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data: https:; font-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; form-action 'self'; upgrade-insecure-requests" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" always;
add_header X-Frame-Options "DENY" always;
```

## What is active on GitHub Pages today

- **HTTPS** is enforced by GitHub Pages; all canonical URLs use `https://`.
- `<meta name="referrer" content="strict-origin-when-cross-origin">` is shipped in
  every page `<head>`.
- Outbound links rendered by templates use `rel="noopener noreferrer"`; Zola is
  configured with `external_links_no_referrer` / `external_links_no_follow` for
  Markdown links.
