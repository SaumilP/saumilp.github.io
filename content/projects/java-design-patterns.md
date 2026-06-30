+++
title = "Java Design Patterns"
description = "Practical Java design patterns — runnable examples, tests, and architecture notes covering creational, structural, and behavioural patterns."
template = "project-page.html"
date = 2023-06-01

[extra]
status = "Active"
stack = ["Java 21", "Maven", "JUnit 5", "Spring Boot"]
repo = "https://github.com/SaumilP/design-patterns"
+++

## The problem

Design patterns are often taught with UML diagrams and abstract descriptions. Real engineers need runnable code they can step through, modify, and connect to frameworks they already use (Spring, CDI, etc.).

## Approach

Each pattern gets its own Maven module: a minimal implementation, a Spring Boot integration where it makes sense, and JUnit 5 tests that assert the expected behaviour. Patterns are documented with a short "when to use / when not to" note rather than a textbook definition.

## Trade-offs

- **Maven multi-module over Gradle:** Heavier to set up but more familiar to enterprise Java developers who are the primary audience.
- **Spring integration optional:** Not every pattern maps naturally to Spring — forced integration would produce misleading examples.

## Outcome

A living reference that maps GoF patterns to real Java 21 idioms (records, sealed classes, switch expressions) and framework-level equivalents in Spring Boot 3.
