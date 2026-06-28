+++
title = "Security"
description = "Security posture, responsible disclosure, and safe-use information for Machine Mind, Saumil Patel's personal technical blog and portfolio."
template = "prose-page.html"
updated = 2026-06-28

[extra]
seo_title = "Security"
seo_description = "Security posture, responsible disclosure, and safe-use information for Machine Mind."

[extra.faq]
faq_title = "Security FAQ"
items = [
  { question = "Does this site collect passwords?", answer = "No. This is a static personal blog and does not provide user accounts or password login." },
  { question = "Does the search box send my query to a server?", answer = "No. Pagefind search runs locally in your browser using a static search index." },
  { question = "Can I submit sensitive files through this site?", answer = "No. Do not submit sensitive files or secrets through this site." },
  { question = "How do I report a security issue?", answer = "Email the contact route listed on this page so the issue can be reviewed and addressed." },
]
+++

Machine Mind is a static personal blog and portfolio. The site does not provide
user accounts, payment flows, private dashboards, or password-based access.

## Responsible disclosure

If you believe you have found a security issue affecting this site, please email
**[email2saumil2024@gmail.com](mailto:email2saumil2024@gmail.com)** with a clear description
and steps to reproduce. Please allow reasonable time for a response before any
public disclosure. There is no bug-bounty program; this is a personal site.

A machine-readable contact is also published at
[`/.well-known/security.txt`](/.well-known/security.txt).

## What this site does not collect

- No account passwords
- No payment details
- No private documents
- No sensitive form submissions

## Static-site security posture

- Static pages generated with [Zola](https://www.getzola.org)
- Hosted on GitHub Pages over HTTPS
- Minimal, dependency-free vanilla JavaScript
- No client-side framework runtime
- No third-party analytics or tracking by default
- [Pagefind](https://pagefind.app) search runs locally in the browser

## External links

External links may lead to third-party websites that have their own privacy and
security practices. Outbound links use `rel="noopener noreferrer"` where the
templates control them.

## Security headers

GitHub Pages has limitations around custom HTTP response headers. Recommended
production headers (CSP, HSTS, and others) are documented in
`SECURITY_HEADERS.md` in the repository for use if the site later moves to a host
that supports custom headers.

See also: [Privacy](/privacy/) · [Disclaimer](/terms/)
