+++
title = "Enterprise Spring Patterns"
description = "Spring Boot patterns and recipes for building maintainable enterprise systems — service layering, transactional boundaries, event-driven flows."
template = "project-page.html"
date = 2023-09-01

[extra]
status = "Active"
stack = ["Java 21", "Spring Boot 3", "Spring Data", "Kafka", "PostgreSQL"]
repo = "https://github.com/SaumilP/enterprise-spring-patterns-and-recipes"
+++

## The problem

Spring Boot makes the happy path easy, but enterprise systems have edge cases: transactional outbox patterns, idempotent consumers, domain event publishing, and layered service boundaries. These topics are scattered across blog posts with inconsistent advice.

## Approach

Built a reference application demonstrating enterprise patterns with real infrastructure: PostgreSQL for persistence, Kafka for event streaming, and Redis for idempotency keys. Each pattern is isolated in its own package with an integration test that uses Testcontainers.

## Trade-offs

- **Testcontainers over H2:** H2 in-memory DB hides PostgreSQL-specific behaviour. Testcontainers is slower to start but catches real issues.
- **Outbox pattern over direct Kafka publish:** Ensures at-least-once delivery without distributed transactions.

## Outcome

A self-contained reference for backend engineers migrating from monolith Spring MVC to event-driven architectures. Covers the gap between "Hello World" Spring Boot tutorials and production-grade system design.
