# Tanglaw AI Development Rules

## 1. Test pure feature logic separately from UI components

When implementing filtering, searching, sorting, validation, or other deterministic behavior, extract the logic into a testable utility instead of keeping all logic inside the page component.

For Truth Hub functionality, use:

- `src/app/lib/truthHubData.ts` for data and types
- `src/app/lib/truthHubFilters.ts` for search, filtering, and sorting logic
- Vitest tests for deterministic behavior

New deterministic feature logic should have unit tests covering normal cases and important edge cases.

## 2. Forms must use accessible validation

All user-facing forms must provide:

- visible labels
- field-level validation
- `aria-invalid` when a field is invalid
- `role="alert"` for validation errors where appropriate
- keyboard-accessible controls
- clear success or failure feedback

Do not rely only on color to communicate validation or status.

## 3. Interactive controls must have explicit accessible states

Buttons and interactive controls must use semantic HTML and expose their state where appropriate.

Examples:

- `aria-expanded` for expandable content
- `aria-pressed` for toggle buttons
- accessible labels for icon-only buttons
- visible focus states
- keyboard support

Do not use clickable non-semantic elements when a `<button>` or other semantic control is appropriate.

## 4. Verify changes before considering a feature complete

After implementing a feature, run:

```bash
npm run typecheck
npm run test
npm run build

## 5. Respect Tanglaw's prototype architecture

Tanglaw currently uses prototype/static data for features without backend infrastructure.

Do not introduce browser geolocation, new backend services, persistent storage, or external APIs unless explicitly required by the feature.

For Truth Hub, distances are precomputed in the prototype. "Near Me" should sort using the existing distance values rather than requesting browser geolocation.

Use the simplest external integration that satisfies the prototype requirement without introducing unnecessary API keys or infrastructure.