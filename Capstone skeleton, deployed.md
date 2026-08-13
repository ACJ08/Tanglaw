# Capstone Skeleton, Deployed

## Assignment Information

**FE-04 — Frontend AI Engineering, Week 3, Foundations**

## Project Overview

Tanglaw is a Vite, React, and TypeScript single-page application for trusted information, verification, learning, and community support. It uses React Router, Tailwind CSS v4, reusable shadcn/Radix components, Supabase authentication, and browser `localStorage` for demo sessions and preferences.

## Live Preview

[Open Tanglaw Live Application](https://tanglaw-tau.vercel.app/)

## Repository

[Tanglaw source code on GitHub](https://github.com/ACJ08/Tanglaw)

## Application Scaffold

`src/main.tsx` mounts the app and an error boundary. `src/app/App.tsx` provides the browser router, theme provider, authentication provider, application routes, and shared navigation. Feature pages live in `src/app/pages`; reusable interface elements live in `src/app/components` and `src/app/components/ui`.

## Routes and Screens

Public routes: `/`, `/health`, `/auth/callback`, `/truth-hubs`, and `/accessibility`.

Authenticated routes: `/verify`, `/learn`, `/offline`, `/sync`, `/dashboard`, `/history`, and `/profile`.

Role-limited routes: `/community` (official, NGO, humanitarian) and `/crisis` (official, humanitarian).

## Root Layout and Navigation

The `Navbar` component presents the public landing navigation for signed-out visitors and the application sidebar for authenticated visitors. The public desktop and mobile navigation both include **Health Check**, which links to `/health`.

## Tailwind and Design Tokens

Tailwind CSS v4 is enabled with the Vite plugin. Global styles are loaded from `src/styles/index.css`; `src/styles/theme.css` defines Tanglaw’s color, surface, border, typography, shadow, and spacing-related CSS tokens. `ThemeContext` persists the selected light or dark theme in `localStorage` and updates `data-theme` on the document root.

## Vercel Deployment

`vercel.json` declares the Vite framework, runs `npm run build`, serves `dist`, and includes an SPA fallback so direct public routes such as `/health` resolve to the application. The repository’s production URL is listed above. Deploying the committed changes through the existing GitHub-to-Vercel connection makes the health route available in production.

## Environment Variables

`.env.example` and `.env.production.example` contain placeholders only. Frontend-exposed settings use the `VITE_` prefix only for the Supabase URL and anonymous key. `GROQ_API_KEY` is marked server-only and is not used by frontend source.

## Public Health-Check Page

The public Health Check is at `/health`. It is rendered directly by React Router, outside `ProtectedRoute`, so it requires no login, account, role, or dashboard state. It can be reached from the landing page’s desktop navigation and mobile menu.

## Health-Check Data Flow

On load, `HealthCheckPage` fetches the safe same-origin endpoint `/api/health`. The Vercel function in `api/health.ts` returns a live timestamp, operational status, non-sensitive availability message, and release label. The page renders the returned timestamp and fields rather than a static status.

## Health-Check Accessibility

The page uses a descriptive heading, semantic sections, an `aria-live` loading state, and an alert for unavailable/empty responses. Status refresh is available with a labeled button. No response includes account details, secrets, tokens, or internal exception text.

## Responsive Design

The public navigation switches to its accessible menu below the `md` breakpoint; the Health Check entry remains in that menu. The page uses one-column cards by default, three cards from `sm`, compact mobile padding, and a constrained desktop content width. These rules cover the 375px and 1280px evaluation sizes without horizontal layout requirements.

## Build Verification

Verified locally on August 13, 2026:

- `npm.cmd run typecheck` completed successfully.
- `npm.cmd run test` completed successfully.
- `npm.cmd run build` completed successfully with Vite 6.3.5 (2,529 modules transformed).

Vite reports an existing advisory that the main production chunk exceeds 500 kB after minification; it does not prevent the build.

## Security and Secrets

Git ignores local environment files, dependency/build output, caches, and editor files. The audit found a publishable Supabase value in the production example file; it was replaced with a placeholder. No server-only key is committed in the application source or this document. A Supabase anonymous key is a client configuration value, but its value is not copied into example files.

## Current Implementation Status

Tanglaw remains an existing functional application; no screen was replaced or framework migration performed. The focused additions are the public `/health` route/navigation, its safe Vercel health function integration, environment-example cleanup, and this assignment record.

## Assignment Evaluation Checklist

| Requirement | Status | Evidence |
| --- | --- | --- |
| Application scaffold | Complete | Vite/React entry point and structured `src/app` modules |
| Routes/screens | Complete | React Router routes documented above |
| Root layout | Complete | `App.tsx`, `Navbar`, and `PageLayout` |
| Navigation | Complete | Public desktop/mobile navigation includes Health Check |
| Tailwind/design tokens | Complete | Tailwind Vite plugin and `theme.css` tokens |
| Vercel deployment | Complete | Existing Vercel URL and `vercel.json` build/output configuration |
| Environment variables | Complete | Placeholder-only example files and ignored local env files |
| Public Health-Check Page | Complete | `/health` route outside `ProtectedRoute` |
| Health-Check fetches data | Complete | Browser fetch to `/api/health`, dynamic timestamp rendered |
| Health-Check requires no authentication | Complete | No authentication wrapper on `/health` |
| Health-Check available from landing page | Complete | Public desktop and mobile navigation link |
| Responsive at 375px | Implemented (source reviewed) | Mobile menu and single-column health cards |
| Responsive at 1280px | Implemented (source reviewed) | Desktop navigation and responsive card grid |
| No secrets in repository | Complete | Example credential removed; ignore rules audited |
| Production build succeeds | Complete | `npm.cmd run build` succeeded |
| Live preview documented | Complete | Vercel URL above |
| Repository documented | Complete | GitHub URL above |

## Submission Links

- **Live Application:** [https://tanglaw-tau.vercel.app/](https://tanglaw-tau.vercel.app/)
- **Source Code:** [https://github.com/ACJ08/Tanglaw](https://github.com/ACJ08/Tanglaw)
