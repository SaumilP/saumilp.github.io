+++
title = "Mastodon Toot Client"
description = "A Rust CLI bot for scheduling and automating Mastodon posts from plain-text files — safe, stateless, and deployable as a cron job."
template = "project-page.html"
date = 2024-02-01

[extra]
status = "Active"
stack = ["Rust", "Tokio", "reqwest", "Mastodon API", "GitHub Actions"]
repo = "https://github.com/SaumilP/mastodon-toot-client"
+++

## The problem

Mastodon's official apps don't support scheduling or file-based content. Automating posts for a personal account — say, a weekly architecture tip from a text file — required either a Python script with fragile state management or a paid third-party service.

## Approach

Built a stateless Rust CLI: reads a text file of toots (one per line), posts the next unposted one to the Mastodon API, and marks it done by moving the line to a `done` file. Runs as a GitHub Actions cron job — no server required, credentials stored as Actions secrets.

## Trade-offs

- **Stateless file-append over a database:** Simpler deployment and easier to audit. The "done" file doubles as a history log.
- **Rust over Python:** Compile-time guarantees matter when the binary runs unattended. The async Tokio runtime handles the HTTP call without blocking.

## Outcome

A zero-dependency automation that posts on a schedule without any hosted infrastructure. The approach generalises to any API-driven content automation with similar stateless patterns.
