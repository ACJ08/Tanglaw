# AI Workflow Comparison: Round 1 vs Round 2

## Overview

This exercise compared two approaches to implementing the Truth Hub functionality in Tanglaw.

**Round 1** used a deliberately vague prompt and accepted the generated implementation with minimal direction.

**Round 2** used an explore → plan → implement → verify workflow. The prompt explicitly referenced the relevant files, described expected behavior and edge cases, specified accessibility requirements, and required verification through typechecking, unit tests, and a production build.

The goal was to determine whether giving the AI more structure improved correctness enough to justify the additional prompting and review effort.

## Round 1 vs Round 2

| Area | Round 1 | Round 2 |
|---|---|---|
| Prompt | Vague, minimal context | Detailed specification with constraints and expected behavior |
| Exploration | Limited | Explicit exploration of existing page structure and project conventions |
| Architecture | Implementation remained closely tied to the page | Extracted data and pure filter/sort logic into reusable utilities |
| Search | Basic/partial | Name, address, and hub type |
| Filters | Non-functional | Hub Type + Status filters with reset and active chips |
| Near Me | Non-functional | Sorts by precomputed distance |
| Directions | Non-functional | Generates Google Maps search URL |
| Partnership | Non-functional | Validated Radix Dialog form with success feedback |
| Empty states | Missing | Contextual empty state with recovery actions |
| Accessibility | Limited | Semantic controls, ARIA states, labels, live regions, and keyboard support |
| Testing | No test runner | Vitest with 15 unit tests |
| Verification | Primarily manual | Typecheck + tests + production build + manual logic review |

## Correctness

Round 2 produced a more complete implementation because the prompt explicitly defined what each control should do and how edge cases should behave.

The implementation was verified with:

- Typecheck: passed
- Unit tests: 15/15 passed
- Production build: passed
- Manual logic review: passed

The tests specifically covered search, filtering, combined search and filtering, distance sorting, empty results, active filters, and Google Maps URL generation.

One important improvement was separating the filtering and sorting logic into `truthHubFilters.ts`. This made behavior independently testable rather than requiring every interaction to be tested through the UI.

## Accessibility

Round 2 addressed accessibility as an explicit requirement instead of treating it as an afterthought.

Examples include semantic buttons, `aria-expanded`, `aria-pressed`, `aria-invalid`, `role="alert"`, live regions, keyboard-accessible hub cards, focus states, and Radix Dialog behavior.

This reduced the amount of accessibility review required after implementation.

## Edge Cases

Round 2 explicitly considered cases that were missing or under-specified previously:

- Search returning no results
- Active filters combined with search
- Clearing search while filters remain active
- Sorting only the currently visible filtered results
- Preventing card clicks from triggering when clicking Get Directions
- Invalid partnership form submissions
- Mobile layout overflow

## Review Effort

Round 2 required more planning and prompting before implementation, but it reduced the amount of uncertainty during review.

Instead of manually discovering missing functionality after generation, expected behavior was defined before implementation and then verified using tests and build checks.

This made the workflow more systematic and easier to review.

## AI Mistake Caught

One important issue identified during the Round 2 exploration was that several files appeared in IDE history but were not actually present on disk, including `TruthHubNetworkVisual.tsx`, `truthHubFilters.ts`, and `TruthHubPartnershipDialog.tsx`.

The implementation therefore had to distinguish between files that existed in the project and files that were only referenced historically.

Another important limitation identified during review was that the partnership form only provides frontend success feedback. It does not persist applications because there is no backend implementation for that feature.

## What I Learned

The main lesson is that AI output quality depends heavily on the quality of the specification and verification loop.

A vague prompt can produce code that looks complete while leaving important behaviors unspecified. A stronger workflow makes the expected behavior, constraints, edge cases, and verification criteria explicit before implementation.

For future Tanglaw work, I will use:

**Explore → Plan → Implement → Test → Typecheck → Build → Review → Document**

rather than treating generated code as finished immediately after it compiles.


## Project-Specific Development Rules

### 1. Extract and test pure logic
Pure filtering, searching, sorting, and transformation logic should be extracted from UI components into reusable utilities when practical.

These utilities must have unit tests when their behavior affects feature correctness.

### 2. Follow accessibility requirements
Interactive controls must use appropriate semantic elements and accessibility attributes.

- Toggle controls should use `aria-pressed`.
- Expandable controls should use `aria-expanded`.
- Invalid form fields should use `aria-invalid`.
- Validation errors should use `role="alert"` where appropriate.
- Status and dynamic result changes should be announced through appropriate live regions.

### 3. Verify changes before considering a feature complete
After implementing a feature, run:

1. Typecheck
2. Unit tests
3. Production build

Do not consider the implementation complete if one of these checks fails.

### 4. Keep prototype assumptions explicit
Tanglaw currently contains prototype/static functionality.

Do not introduce backend services, browser geolocation, external APIs, or persistent storage unless they are explicitly required by the feature.

For example, Truth Hub distances are currently precomputed prototype values. "Near Me" should sort by those values rather than requesting browser geolocation.

External integrations such as Google Maps should use the simplest implementation that satisfies the prototype requirement without introducing unnecessary API keys or infrastructure.