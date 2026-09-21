---

name: Hybrid Enterprise Cinematic
description: High-end design system for responsive multi-page websites (landing, corporate, ecommerce) combining minimal clarity, enterprise structure, and cinematic motion.

colors:
primary: "#3B82F6"
secondary: "#8B5CF6"
success: "#16A34A"
warning: "#D97706"
danger: "#DC2626"
surface: "#FFFFFF"
surfaceAlt: "#F9FAFB"
border: "#E5E7EB"
text: "#111827"
textMuted: "#6B7280"
neutral: "#FFFFFF"

typography:
h1:
fontFamily: "Poppins"
fontSize: 2.75rem
fontWeight: 600
h2:
fontFamily: "Poppins"
fontSize: 2.25rem
fontWeight: 600
h3:
fontFamily: "Poppins"
fontSize: 1.75rem
fontWeight: 500
body-lg:
fontFamily: "Open Sans"
fontSize: 1.125rem
body-md:
fontFamily: "Open Sans"
fontSize: 1rem
body-sm:
fontFamily: "Open Sans"
fontSize: 0.875rem
label:
fontFamily: "Open Sans"
fontSize: 0.75rem
mono:
fontFamily: "IBM Plex Mono"
fontSize: 0.875rem
scale: "14 / 16 / 18 / 20 / 24 / 32 / 40"
weights: "300, 400, 500, 600, 700"

spacing:
base: 8
scale: "4 / 8 / 12 / 16 / 24 / 32 / 48 / 64"

rounded:
sm: 6px
md: 10px
lg: 16px

shadows:
sm: "0 1px 2px rgba(0,0,0,0.05)"
md: "0 4px 12px rgba(0,0,0,0.08)"
lg: "0 10px 25px rgba(0,0,0,0.12)"

grid:
columns: 12
gutter: 24px
container: 1280px

motion:
duration:
fast: 150ms
base: 200ms
slow: 300ms
page: 400ms
cinematic: 600ms
easing:
standard: "ease-out"
entrance: "cubic-bezier(0.16, 1, 0.3, 1)"
exit: "ease-in"
scale:
hover: 1.02
tap: 0.98
opacity:
hidden: 0
visible: 1

---

# Overview

Hybrid Enterprise Cinematic is a design system for building premium-level websites that combine clarity, structure, and cinematic storytelling.

It merges:

* Paper → minimal clarity, whitespace, typography-first
* Corporate → grid systems, scalability, trust
* Motion → interaction feedback
* Cinematic → storytelling and emotional engagement

Designed for:

* landing pages
* corporate websites
* ecommerce
* SaaS marketing sites

---

# Design Principles

1. Clarity over decoration
2. Structure creates trust
3. Motion communicates, not decorates
4. Minimal but not empty
5. Performance is part of design
6. Accessibility is mandatory

---

# Color System

## Rules

* Use only defined tokens
* Colors are semantic, not decorative
* Maintain contrast ≥ 4.5:1

## Roles

* Primary → main actions
* Secondary → accent
* Surface → base background
* SurfaceAlt → section separation
* Border → structure
* Text → main content
* TextMuted → secondary content

---

# Typography System

## Fonts

* Headings → Poppins
* Body → Open Sans
* Technical → IBM Plex Mono

## Rules

* Max 3 weights per screen
* Line height: 1.4–1.6
* Typography defines hierarchy, not color

---

# Spacing System

Base unit: 8px

Scale:
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64

Rules:

* No arbitrary spacing
* Prefer spacing over dividers
* Maintain vertical rhythm

---

# Layout System

## Grid

* 12 columns
* Max width: 1280px
* Gutter: 24px

## Breakpoints

* sm: 640px
* md: 768px
* lg: 1024px
* xl: 1280px

## Rules

* Mobile-first
* Stack before shrink
* No horizontal scroll

---

# Component System

All components must support:

* default
* hover
* focus-visible
* active
* disabled
* loading
* error

## Guidelines

* Prefer borders over shadows
* Keep elevation subtle
* Consistent radius system

---

# Core Components

## Buttons

* Primary → filled
* Secondary → outline
* Ghost → minimal

## Cards

* Surface background
* Subtle border
* Padding 16–24px

## Inputs

* Neutral border
* Focus ring primary
* Error = danger

## Tables

* Clear headers
* Hover states
* Optional zebra

---

# Navigation

* Navbar (public)
* Sidebar (internal)
* Breadcrumbs (deep pages)

Rules:

* Always show location
* Keep navigation shallow

---

# Multi-Page Architecture

Page types:

* Landing
* Product
* Ecommerce
* Auth
* Dashboard (light use)

Rules:

* Shared layout shells
* Reusable sections
* Consistent spacing

---

# Internationalization (i18n)

## Rules

* No hardcoded text
* Use translation keys

Example:
t("hero.title")

## Requirements

* Flexible layouts
* Handle text expansion
* Support RTL if needed

---

# Motion System

## Principles

* Subtle
* Functional
* Performant

## Allowed

* opacity
* transform

## Avoid

* layout reflow animations
* excessive blur

---

## Standard Animations

Fade:
opacity 0 → 1 (200ms)

Slide:
translateY 16px → 0 (200–300ms)

Hover:
scale 1 → 1.02 (150ms)

---

# Cinematic Layer

## Purpose

Enable Apple-level storytelling through motion.

---

## Reveal System

* opacity 0 → 1
* translateY 24px → 0
* duration: 600ms
* stagger: 60–120ms

---

## Scroll Storytelling

Each section:

1. Enter
2. Focus
3. Transition

Rules:

* animate per section, not entire page
* avoid loops

---

## Hero Pattern

Sequence:

* Title (0ms)
* Subtitle (80ms)
* CTA (160ms)
* Visual (240ms)

Easing:
cubic-bezier(0.16, 1, 0.3, 1)

---

## Depth System

* scale: 0.96 → 1
* subtle parallax
* max 3 layers

---

## Focus Control

* dim inactive elements
* highlight active

---

## Image Motion

* slow scale-in
* subtle hover zoom

---

## Typography Motion

* fade + translate only
* never distort text

---

# GSAP Usage

Use for:

* scroll storytelling
* timelines
* pinned sections
* hero animations

---

# Motion Library Usage

Use for:

* hover
* tap
* component transitions
* page transitions

---

# Ecommerce Motion

Recommended:

* product hover zoom
* gallery transitions
* add-to-cart feedback

Avoid:

* heavy checkout animations

---

# Performance Rules

* 60fps mandatory
* GPU properties only
* lazy load animations

---

# Accessibility

* WCAG 2.2 AA
* keyboard navigation
* focus-visible
* prefers-reduced-motion

---

# Anti-Patterns

* animating everything
* inconsistent spacing
* decorative colors
* excessive motion
* poor contrast

---

# AI Instructions

When generating UI:

1. Use tokens only
2. Follow spacing scale
3. Apply grid system
4. Use typography hierarchy
5. Include states
6. Apply motion only when useful
7. Maintain accessibility
8. Avoid inventing styles

---

# Design Intent

This system produces:

* clean interfaces
* structured layouts
* premium perception
* cinematic storytelling

---

# Final Rule

If it does not improve clarity, hierarchy, or storytelling:
→ remove it
-----------
