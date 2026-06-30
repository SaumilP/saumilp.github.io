+++
title = "Privacy"
description = "How Machine Mind handles data: a privacy-conscious, analytics-free static site where search runs locally in your browser."
template = "prose-page.html"
updated = 2026-06-28

[extra]
seo_title = "Privacy"
seo_description = "Privacy information for Machine Mind — no tracking, no advertising cookies, and local-only Pagefind search."

[extra.faq]
faq_title = "Privacy FAQ"
items = [
  { question = "Does this site use analytics or tracking?", answer = "No. There are no analytics scripts, advertising trackers, or fingerprinting on this site by default." },
  { question = "Does this site use cookies?", answer = "The site sets no tracking cookies. A theme preference is stored locally in your browser using localStorage, not a cookie, and is never sent to a server." },
  { question = "Does search send my query anywhere?", answer = "No. Pagefind search runs entirely in your browser against a static index. Your queries are not transmitted to any server." },
]
+++

This site is designed to be privacy-conscious and minimal.

## Data collection

Machine Mind does **not** use analytics, advertising trackers, fingerprinting, or
behavioural cookies. No personal data is collected by the site itself.

A single browser **localStorage** value (`theme`) remembers your light/dark
preference. It stays in your browser and is never transmitted.

## Local search

Search is powered by [Pagefind](https://pagefind.app), which runs entirely in your
browser against a static index generated at build time. Search queries are not
sent to any server.

## Server logs

The site is hosted on GitHub Pages. As with any web host, the hosting provider
may process standard access logs (such as IP address and user agent) outside the
site owner's direct control. Refer to GitHub's privacy documentation for details.

## External links and embeds

Outbound links may lead to third-party sites that have their own privacy
policies. This site does not embed third-party tracking widgets, ad networks, or
social media trackers.

## Contact

For privacy questions, email
**[email2saumil2024@gmail.com](mailto:email2saumil2024@gmail.com)**.

See also: [Security](/security/) · [Disclaimer](/terms/)
