# Machine Mind

Personal technical blog & portfolio of **Saumil Patel** — practical notes on
software architecture, backend engineering, cloud systems, Rust, Java, and
developer tooling.

Built with [Zola](https://www.getzola.org), a custom Tera + SCSS design system,
[Pagefind](https://pagefind.app) search, and a few tiny vanilla-JS modules.
No framework, no CDN dependency, no external analytics.

## Local development

```sh
# Requires Zola 0.18.x
zola serve            # http://127.0.0.1:1111 (live reload; search needs a full build)
```

To preview search locally, build the full pipeline and serve `public/`:

```sh
zola build
npx -y pagefind@1.1.1 --site public
cd public && python3 -m http.server 8000   # then open http://localhost:8000
```

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
config.toml   site config, nav, social, topics, curated projects
```

## Deployment

Pushes to `master` are built and deployed to GitHub Pages by
`.github/workflows/deploy.yml` (Zola build -> Pagefind index -> upload artifact
-> deploy). Pull requests run the same build + validation without deploying.

> **One-time setup:** in the repo **Settings -> Pages**, set **Source** to
> **GitHub Actions** (replacing the old `gh-pages` branch source).

## References

- [Favicon generation](https://realfavicongenerator.net/)
