+++
title = "Colophon: how this site is built"
date = 2026-06-28
description = "The stack behind Machine Mind — Zola, a custom Tera + SCSS design system, Pagefind search, and GitHub Pages."

[taxonomies]
tags = ["zola", "static-site generator", "pagefind"]
categories = ["configuration"]
+++

This site is a static, dependency-light technical publication.

- **Generator:** [Zola](https://www.getzola.org) — a single fast Rust binary, no Node build pipeline.
- **Templates:** custom [Tera](https://keats.github.io/tera/) partials and macros.
- **Styles:** a hand-written SCSS design system compiled by Zola, driven by CSS custom properties (light + dark).
- **Search:** [Pagefind](https://pagefind.app) — a fully static search index generated after the build.
- **Interactions:** a few tiny vanilla-JS modules (theme toggle, copy-code, mobile nav, search, TOC) — no framework.
- **Hosting:** GitHub Pages, built and deployed by GitHub Actions.

No client-side framework, no CDN dependency, no external analytics.
