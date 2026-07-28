Here's a significantly expanded version of your prompt with one major addition: **Light Mode is now the default theme**, while **Dark Mode remains fully supported as an optional theme**. I've also added more implementation requirements so an AI coding agent won't accidentally default back to dark mode.

---

# Prompt

Act as a **Senior UI/UX Designer, Senior Frontend Engineer, Senior Product Designer, Visual Designer, Human-Centered Design Expert, Accessibility Specialist, and Design Systems Architect** with over **15 years of experience** designing award-winning SaaS platforms, civic technology applications, AI-powered products, accessibility-first interfaces, and scalable design systems.

Your task is to **enhance, modernize, and refine the application's design system without removing any existing functionality.**

The existing **Dark Mode is already polished and should remain completely intact. Do NOT redesign, remove, simplify, or replace Dark Mode.**

Instead, your objective is to introduce a **production-ready Light Mode** that better represents the personality of our mascot, **Liyab**, while making the platform more welcoming, approachable, and inclusive for the general public.

The application must support **both Light Mode and Dark Mode**, with complete feature parity, identical functionality, consistent layouts, and a shared design system.

---

# Critical Requirements

## 1. Light Mode must be the default theme

This is a strict requirement.

When a user visits the application for the very first time:

* The application must automatically load in **Light Mode**.
* Light Mode should be considered the platform's primary visual identity.
* Dark Mode should remain available through a theme switcher.
* The selected theme should be remembered using persistent storage (such as localStorage, cookies, or user preferences) so that returning users keep their chosen theme.

Priority order:

1. First-time visitor → **Light Mode**
2. Returning visitor → previously selected preference
3. Authenticated users → optional user profile preference (if supported)

Do **not** default the application to Dark Mode.

---

## 2. Preserve the Existing Dark Mode

Do **NOT** remove or break any part of the existing Dark Mode.

Preserve:

* all layouts
* component structures
* spacing
* animations
* typography
* interactions
* responsiveness
* pages
* functionality
* transitions
* icons
* illustrations
* AI components

Dark Mode should simply become an alternative theme rather than the application's primary identity.

---

## 3. Theme Parity

Every page and component must work perfectly in both themes.

No component should appear unfinished or inconsistent when switching themes.

Switching between themes should:

* happen instantly
* preserve page state
* preserve user progress
* include smooth color transitions
* avoid flashes of incorrect themes (FOUC)
* maintain accessibility

---

# Context

One of the first things I noticed is that the current interface no longer complements the personality of our mascot, **Liyab**.

Liyab was intentionally designed to embody:

* friendliness
* warmth
* hope
* empathy
* trust
* encouragement
* guidance
* optimism
* community
* accessibility

However, the application's visual identity has gradually evolved into something that feels more like:

* enterprise software
* SaaS dashboards
* business intelligence platforms
* analytics software
* developer tooling
* cybersecurity dashboards
* corporate admin systems

Although the interface is visually impressive and technically modern, it no longer communicates the emotional experience users should feel when interacting with Liyab.

Instead of feeling welcomed by a helpful AI companion, users currently feel as though they are entering a complex enterprise platform.

The redesign should solve this disconnect while preserving the application's professionalism.

---

# Vision

The application should feel like:

> "A trusted AI-powered civic platform where technology feels approachable, human, inclusive, and community-driven."

Every interaction should reduce anxiety and increase confidence.

The interface should invite exploration instead of intimidating first-time users.

---

# Target Audience

Design for:

* Citizens
* Families
* Parents
* Students
* Teachers
* Barangay officials
* Community volunteers
* NGOs
* Senior adults
* Persons with disabilities
* First-time technology users
* Individuals with varying digital literacy

The experience should prioritize:

* trust
* warmth
* simplicity
* clarity
* accessibility
* friendliness
* confidence
* inclusivity
* readability

---

# Design Direction

Light Mode should become the application's primary visual identity.

The emotional experience should feel:

* bright
* welcoming
* calm
* optimistic
* trustworthy
* elegant
* premium
* clean
* spacious
* community-focused
* friendly
* modern

Users should immediately feel comfortable interacting with the application.

---

# Visual Inspiration

Draw inspiration from the emotional quality—not direct visual copies—of products such as:

* Google Material Design 3
* Canva
* Duolingo
* ChatGPT Light Mode
* Google Gemini
* Apple Human Interface Guidelines
* Notion Light Mode
* Microsoft Fluent Design
* Airbnb
* Linear
* GitHub Light Theme

These products successfully balance professionalism with approachability.

---

# Color System

Create a complete Light Mode color system.

Use:

* warm white backgrounds
* soft off-white surfaces
* light neutral cards
* subtle elevation
* accessible shadows
* soft borders
* calm accent colors
* restrained gradients
* plenty of whitespace

Accent colors should reinforce Liyab's identity while remaining visually comfortable for extended use.

Avoid:

* harsh blacks
* excessive gradients
* dark-heavy interfaces
* neon colors
* visual clutter
* aggressive contrast

---

# Typography

Improve typography for readability.

Use:

* larger heading hierarchy
* comfortable paragraph spacing
* readable line lengths
* accessible font sizes
* proper font weights
* generous whitespace

Text should feel inviting rather than dense.

---

# Accessibility

Ensure compliance with accessibility best practices.

Optimize for:

* WCAG AA (preferably AAA where practical)
* keyboard navigation
* screen readers
* reduced motion preferences
* scalable typography
* large touch targets
* readable spacing
* high color contrast
* cognitive accessibility

The application should be usable by individuals with varying levels of technical experience.

---

# Mascot Integration

Liyab should become the emotional centerpiece of the platform.

Throughout the interface, Liyab should visually reinforce that the application is:

* welcoming
* helpful
* trustworthy
* supportive
* educational
* conversational
* community-driven

Liyab should guide users rather than simply decorate the interface.

---

# UI Components

Ensure every component fully supports both Light Mode and Dark Mode, including:

* Landing Page
* Navigation Bar
* Sidebar
* Hero Section
* Dashboard
* Cards
* Buttons
* Forms
* Search
* Inputs
* Dropdowns
* Tables
* Charts
* Graphs
* AI Assistant
* Chat Interface
* Dialogs
* Modals
* Toast Notifications
* Tooltips
* Progress Indicators
* Timeline Components
* Authentication Screens
* Settings
* User Profile
* Community Pages
* Analytics
* Footer
* Mobile Navigation

Every component should automatically adapt using the shared theme system.

---

# Landing Page Improvements

The landing page should become the strongest representation of the application's identity.

## Functional Navigation

Ensure the landing page navigation is fully functional.

Each navigation item should smoothly scroll to its corresponding section.

Include:

* Home
* Features
* How It Works
* Meet Liyab
* AI Features
* Accessibility
* Community Impact
* FAQ
* Contact

Navigation should include:

* active section highlighting
* sticky behavior
* responsive mobile menu
* smooth scrolling
* proper alignment
* accessible keyboard navigation

---

# Add a "How the App Works" Section

Introduce a comprehensive section that explains the application's workflow using engaging visuals such as:

* step cards
* timelines
* icons
* illustrations
* connecting arrows
* animations

Suggested flow:

1. User submits a report, concern, or inquiry.
2. Liyab analyzes the request using AI.
3. The platform validates information using trusted sources and community verification.
4. AI generates understandable recommendations and insights.
5. Community contributions continuously improve collective knowledge.

The explanation should be understandable within a few seconds, even for first-time users.

---

# Landing Page Content

Ensure the landing page contains:

* Hero Section
* Problem Statement
* Why the Platform Exists
* Meet Liyab
* Core Features
* How It Works
* AI Capabilities
* Community Verification
* Accessibility Features
* Benefits
* Frequently Asked Questions
* Call-to-Action
* Footer

Each section should have smooth transitions and consistent spacing.

---

# Technical Implementation

Implement a scalable theme architecture.

Requirements include:

* Light Mode as the default theme
* Existing Dark Mode preserved
* Theme persistence
* CSS variables or design tokens
* Reusable semantic color tokens (e.g., `--background`, `--surface`, `--primary`, `--text-primary`, `--border`, `--muted`)
* Shared component styling
* No duplicated component logic
* Smooth animated theme transitions
* Responsive layouts
* Performance optimization
* No flash of unstyled or incorrect theme during initial load
* Consistent spacing, border radius, elevation, and typography across both themes

---

# Final Design Goals

The redesign must achieve the following:

1. Keep the existing Dark Mode completely intact without removing or degrading any functionality.
2. Introduce a beautiful, production-ready Light Mode that serves as the application's default theme.
3. Ensure Light Mode becomes the platform's primary visual identity while Dark Mode remains an equally polished alternative.
4. Align the interface with Liyab's warm, approachable, and community-oriented personality.
5. Reduce the application's corporate and enterprise feel without sacrificing professionalism.
6. Create a unified design system that supports both themes consistently.
7. Improve accessibility and usability for citizens, senior adults, and first-time users.
8. Ensure every page and component works seamlessly in both themes.
9. Make the landing page navigation fully functional, responsive, and synchronized with each section.
10. Add a visually engaging **"How the App Works"** section that clearly communicates the application's workflow.
11. Ensure theme switching is smooth, state-preserving, and remembers the user's preference.
12. Maintain pixel-perfect responsiveness across desktop, tablet, and mobile devices.
13. Preserve all existing application functionality while enhancing the visual experience.

The final result should feel like a **production-ready, world-class civic technology platform** where **Light Mode is the default and primary experience**, reflecting the warmth, trust, and guidance of **Liyab**, while **Dark Mode remains a fully supported, polished alternative** for users who prefer it. The interface should consistently communicate professionalism, inclusivity, accessibility, and community empowerment across every screen and interaction.
