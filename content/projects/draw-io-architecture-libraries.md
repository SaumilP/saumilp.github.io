+++
title = "draw.io Architecture Libraries"
description = "Reusable draw.io shape libraries for clean, professional software architecture diagrams — C4, AWS, and custom notation."
template = "project-page.html"
date = 2024-01-01

[extra]
status = "Active"
stack = ["Python", "draw.io XML", "C4 Model", "Architecture"]
repo = "https://github.com/SaumilP/drawio_libraries"
+++

## The problem

Architecture diagrams in most teams suffer from inconsistency — each engineer invents their own notation, colour scheme, and level of abstraction. Reviews spend more time decoding the diagram than discussing the decision.

## Approach

Built a curated set of draw.io shape libraries covering C4 model levels (Context, Container, Component), AWS service icons, and a custom notation layer for domain events and async flows. Libraries are XML files that can be imported directly into draw.io desktop or app.diagrams.net with one click.

## Trade-offs

- **Chose draw.io over Mermaid/PlantUML:** Draw.io diagrams are visual-first and accessible to non-engineers. Mermaid is better for version control but harder to layout precisely.
- **Static XML over dynamic generation:** Keeps the library dependency-free and usable offline. The trade-off is that updating icons requires editing XML by hand.

## Outcome

The libraries are used in personal architecture documentation and have been shared with colleagues for review. The C4 layer in particular cuts diagram preparation time significantly by providing pre-built component shapes with consistent colour coding.
