Your current prompt is already detailed, but it mostly **describes what to fix** rather than instructing the AI **how to think like a senior product designer and frontend architect**. Below is a much stronger version that tells the AI to analyze the existing implementation, preserve the design system, improve UX, and implement frontend functionality based on your paper.

---

# Prompt

Act as a **Senior UI/UX Designer, Senior Frontend Engineer, Product Designer, Motion Designer, and Design Systems Expert** with over **15 years of experience** building award-winning SaaS products, AI platforms, and hackathon-winning web applications.

You are redesigning and improving my existing landing page for **Tanglaw P2P**.

Do **NOT** redesign everything from scratch. Instead, **carefully analyze the existing implementation**, identify every UI, UX, accessibility, responsiveness, animation, and visual hierarchy issue, then improve it while preserving the current design language, branding, and overall structure.

Your objective is to make the landing page look like a professionally built startup website comparable to **Linear, Vercel, Stripe, Framer, Notion AI, Arc Browser, and OpenAI**, while remaining faithful to Tanglaw P2P's mission of community verification, media and information literacy, and accessibility.

---

# General Design Requirements

Before modifying anything:

* Analyze every section of the landing page.
* Preserve the existing design language.
* Maintain consistency in spacing, typography, color palette, animations, and component styling.
* Improve visual hierarchy where necessary.
* Ensure every section is fully responsive across mobile, tablet, laptop, and desktop.
* Follow accessibility best practices (WCAG-friendly contrast, readable typography, keyboard navigation where applicable).

Do not make arbitrary design changes. Every modification should improve usability, readability, accessibility, or visual polish.

---

# Hero Section Improvements

The Hero section requires several UI and UX fixes.

## 1. Rotating Hero Headline

The animated final phrase is currently **being cut off by the viewport**, making it difficult to read.

Redesign this component so that:

* Every rotating phrase is always fully visible.
* The animation remains smooth and premium.
* The text never overflows or clips.
* The container automatically adapts to the longest phrase.
* The typography remains visually balanced on all screen sizes.

Do not reduce readability just to fit the layout.

---

## 2. Hero Statistics Cards

The following capability labels currently appear cramped and visually broken:

* 100% Free & Open
* Offline Capable
* AI-Powered Verification

Improve this section by:

* fixing spacing
* improving typography
* balancing line height
* preventing awkward word wrapping
* improving icon alignment
* ensuring cards have equal height
* ensuring labels remain readable on every screen size

These cards should feel like premium SaaS feature cards instead of compressed text blocks.

---

## 3. Scroll Indicator

The current label uses the word:

> Scroll

Replace it with something more engaging and appropriate for a modern landing page.

Examples of the tone (do not copy exactly):

* Discover the Platform
* Explore Tanglaw
* Explore the Ecosystem
* Learn More
* Begin the Journey
* Discover the Features

Choose whichever best fits the overall experience.

---

# Platform Capabilities Marquee

The horizontal scrolling feature cards under **Platform Capabilities** currently move too slowly.

Improve the animation by:

* increasing the scrolling speed slightly
* keeping it readable
* ensuring it remains smooth
* preventing jitter
* keeping infinite looping seamless

The animation should feel dynamic without becoming distracting.

---

# Processing Illustration Animation

For the image:

**Processing.png**

Only animate the **speech bubble**.

Do **NOT** animate Liyab.

Possible animations include:

* gentle blinking
* subtle pulsing
* floating
* breathing effect
* typing indicator animation
* glow effect

The goal is to make the AI assistant appear alive while preserving a calm and friendly interaction.

---

# Truth Hub Network Section

The section using:

* Truth Hub.png
* Map.png

currently has weak visual hierarchy and layout.

Redesign this section while keeping the same content.

Improve:

* spacing
* alignment
* image positioning
* card hierarchy
* typography
* visual balance
* responsiveness

The images should complement one another instead of competing for attention.

Consider using:

* layered cards
* glassmorphism
* floating location pins
* connection lines
* map overlays
* animated location indicators
* subtle gradients

The section should visually communicate that Truth Hubs form a connected verification network across communities.

---

# Logo Visibility

The Tanglaw logo currently blends into the landing page because:

* the Tanglaw text is dark blue
* the checkmark icon is also dark blue
* the Hero background contains similar colors

Improve the branding without changing the logo identity.

Possible improvements include:

* subtle glow
* soft outline
* glass background
* elevated navbar
* adaptive logo colors depending on background
* gradient halo
* improved contrast
* dynamic navbar styling

Choose the most elegant solution.

The logo should remain readable on every section.

---

# Functional Navigation & Buttons

After completing all UI improvements, make every button functional.

This is a frontend-only implementation.

There is no backend yet.

Use React Router or appropriate frontend routing.

Every CTA should navigate to its corresponding page, modal, or section.

Examples include:

* Sign Up
* Learn More
* Get Started
* Explore Features
* View Truth Hubs
* Learn with Liyab
* Verify Information
* Offline Mode
* Crisis Verification
* Community Resources

Buttons should never be placeholders.

If a backend feature is unavailable, create a polished frontend page with realistic mock content demonstrating how the feature will work.

---

# Implement Frontend Features Based on My Solution Description

The implementation must follow **my research paper exactly**.

Do **not invent new core features**.

Everything should align with the architecture described below.

---

## Feature 1 — Offline Threat Ledger

Create a dedicated frontend experience demonstrating:

* locally stored threat database
* offline verification
* scam indicators
* emergency advisories
* verified public information

Use modern cards and interactive UI.

---

## Feature 2 — Localized Text Parser

Design a verification interface where users can:

* paste suspicious text
* upload copied messages
* simulate local AI analysis
* receive explainable verification

Display educational explanations rather than simply showing:

Safe

Fake

Instead explain:

* suspicious links
* urgency
* impersonation
* financial pressure
* manipulation tactics
* confidence score
* recommendation

The interface should feel educational.

---

## Feature 3 — Community Verification

Create pages demonstrating:

* community reports
* verified scam patterns
* trusted contributors
* local verification

Use timelines, activity feeds, and verification cards.

---

## Feature 4 — Lightweight Synchronization

Create a frontend visualization showing:

Offline Device

↓

Internet Available

↓

Threat Ledger Update

↓

Community Sync

↓

Offline Devices Updated

Show synchronization visually.

---

## Feature 5 — Decentralized Community Replication

Design an interactive section explaining:

Dynamic Local Sync

↓

WebRTC

↓

Wi-Fi Direct

↓

QR Code Distribution

↓

Offline Sharing

Include beautiful illustrations or diagrams.

---

## Feature 6 — Crisis Verification Mode

Create a dedicated Crisis Verification page.

Display:

* emergency banner
* trusted advisories
* verification checklist
* urgent alerts
* Neutral / Unknown status
* recommended next actions

Use color carefully.

Avoid panic-inducing interfaces.

---

## Feature 7 — Universal Accessibility

Create frontend demonstrations for:

* Voice Guidance
* Simplified Language
* High Contrast Mode
* Multilingual Support
* Large Touch Targets
* Accessibility Settings
* Explainable Verification
* Offline Accessibility

Accessibility should feel integrated into the product rather than isolated in a settings page.

---

# User Roles

Implement frontend-only role-based navigation.

During Sign Up, users choose their role.

The available roles should be derived from the paper.

Include at least:

### Community Member

Features:

* Verify Information
* Threat Ledger
* Crisis Verification
* Learning Resources
* Verification History
* Accessibility Settings

---

### Student Media Literacy Advocate

Features:

* Community Education
* Update Threat Ledger (UI Demo)
* Learning Modules
* Community Awareness Toolkit
* Verification Dashboard

---

### Barangay / LGU Representative

Features:

* Community Reports
* Truth Hub Management
* Local Advisory Publishing (UI Only)
* Community Statistics
* Crisis Coordination Dashboard

---

### Educators / Schools

Features:

* Media Literacy Resources
* Classroom Activities
* Student Verification Challenges
* Learning Progress

---

### NGO / Community Organizations

Features:

* Awareness Campaign Dashboard
* Community Analytics
* Verification Resources
* Educational Materials

---

### Humanitarian & Disaster Response Partners

Features:

* Crisis Monitoring
* Advisory Distribution
* Offline Deployment Toolkit
* Community Updates

---

# User Personas

Create dedicated persona showcase cards based on my research paper.

Include:

Maria — Rural Mother

Roberto — Senior Citizen

Angel — Student Media Literacy Advocate

Each persona should include:

* illustration
* background
* challenge
* Tanglaw solution
* accessibility benefits
* workflow

These sections should be visually engaging with alternating layouts and smooth scroll animations.

---

# Ethical Guardrails

Create a dedicated section explaining Tanglaw's trust and safety mechanisms.

Include:

* Neutral / Unknown State Protocol
* Cryptographically Signed Ledger Integrity
* Privacy-Preserving Local Processing
* Explainable Verification
* Human-Centered Recommendations
* No Black-Box Decisions
* Trusted Authority Verification

Each safeguard should be presented in an elegant card with an appropriate icon and concise explanation.

---

# Technical Requirements

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* Lucide React Icons
* Responsive Design
* Accessible Components
* Clean Component Architecture

Do not introduce unnecessary dependencies.

---

# Final Goal

The completed website should feel like a production-ready startup platform that could be presented to hackathon judges, investors, government agencies, NGOs, UNESCO representatives, and community stakeholders. Every section should clearly communicate Tanglaw P2P's mission of **offline-first community verification, equitable access to trustworthy information, explainable AI, accessibility, and Media and Information Literacy**, while ensuring that all frontend interactions, navigation, role-based dashboards, and feature demonstrations are functional, polished, intuitive, and directly aligned with the research paper.
