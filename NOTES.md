# FE-05 Notes: Manual Components and shadcn/Radix

## FE-05 Accessibility Playground

The FE-05 playground is available locally at:

`http://localhost:5173/playground/`

The deployed playground is available at:

`https://tanglaw-tau.vercel.app/playground/`

The playground contains three interactive components implemented manually in React + TypeScript:

- Modal Dialog
- Tabs
- Disclosure

These manual implementations are intentionally separate from Tanglaw's production components and do not import shadcn/ui, Radix UI, or another component library.

---

## 1. Manual Components Implemented

### Modal Dialog

The manual dialog implements the core WAI-ARIA dialog pattern, including:

- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby`
- `aria-describedby`
- Initial focus when the dialog opens
- Keyboard focus trapping
- `Tab` and `Shift + Tab` focus cycling
- `Escape` to close
- Focus restoration to the element that opened the dialog
- Optional backdrop dismissal
- Programmatic focus management
- Portal rendering

The dialog was manually implemented to understand the focus-management requirements rather than relying on a component library.

### Tabs

The manual tabs implement the core WAI-ARIA tabs pattern, including:

- `role="tablist"`
- `role="tab"`
- `role="tabpanel"`
- `aria-selected`
- `aria-controls`
- `aria-labelledby`
- Roving `tabIndex`
- Automatic activation
- `ArrowLeft` and `ArrowRight` navigation
- Wrapping keyboard navigation
- `Home` to move to the first tab
- `End` to move to the last tab
- Programmatic focus movement

### Disclosure

The manual disclosure uses a native HTML button and implements:

- `aria-expanded`
- `aria-controls`
- Expand/collapse state
- Keyboard interaction through native button behavior
- `Enter` support
- `Space` support
- Hidden content when collapsed

Using a native `<button>` allows the browser to provide the expected keyboard interaction without manually recreating basic button behavior.

---

## 2. Keyboard-Only Testing

The three components were manually tested using keyboard interaction rather than relying only on mouse interaction.

### Dialog

Verified:

- `Tab` moves between focusable elements inside the dialog.
- `Shift + Tab` moves backward through the dialog.
- Focus remains inside the modal while it is open.
- `Escape` closes the dialog.
- Focus returns to the original dialog trigger after closing.

**Result: PASS**

### Tabs

Verified:

- `Tab` reaches the active tab.
- `ArrowRight` moves to the next tab.
- `ArrowLeft` moves to the previous tab.
- Arrow navigation wraps between the first and last tabs.
- `Home` moves to the first tab.
- `End` moves to the last tab.

**Result: PASS**

### Disclosure

Verified:

- `Tab` reaches the disclosure button.
- `Enter` expands and collapses the disclosure.
- `Space` expands and collapses the disclosure.

**Result: PASS**

---

## 3. shadcn/ui and Radix Inspection

Tanglaw already uses shadcn-style UI components backed by Radix primitives.

The production Dialog and Tabs components were inspected to understand what the component library provides beyond the manual implementations.

The production components remain separate from the FE-05 playground because the purpose of this assignment is to understand how accessible components work internally before relying on component libraries.

The manual playground therefore does not import or reuse the production Dialog, Tabs, Accordion, or Collapsible components.

---

## 4. Concrete Gaps Compared With shadcn/Radix

### Gap 1 — Dialog Focus Management

The manual dialog uses a simple selector-based focus loop to identify focusable elements.

Radix Dialog provides a dedicated focus-management system that handles more complex cases, including dynamic focus changes and nested focus scopes.

This means the manual implementation demonstrates the fundamental concept but does not provide the same level of robustness as the production primitive.

### Gap 2 — Dialog Layer and Outside Interaction Management

The manual dialog handles backdrop interaction directly.

Radix provides additional primitives for managing modal layers, outside interaction, pointer events, and nested overlays.

This is important when applications contain multiple dialogs, popovers, menus, or other layered UI elements.

### Gap 3 — Dialog Composition and Lifecycle

The manual implementation directly manages opening, closing, and focus restoration.

Radix provides composable primitives such as triggers and close controls together with lifecycle and focus-management behavior.

This allows more complex applications to compose dialog behavior without manually coordinating every interaction.

### Gap 4 — Tabs Features

The manual tabs implement horizontal tabs with automatic activation.

The implementation does not currently provide the broader feature set available from Radix Tabs, such as:

- Disabled tab triggers
- Vertical orientation
- Controlled and uncontrolled usage
- Configurable activation behavior
- More extensive handling of dynamic tab structures

### Gap 5 — Dynamic Relationships

The manual tabs generate and maintain their own IDs for the relationship between tabs and tab panels.

Radix coordinates triggers, content, state attributes, focus behavior, and relationships through its primitives.

This reduces the amount of accessibility state that application developers need to manually coordinate.

---

## 5. What I Learned

The main lesson from implementing the components manually is that accessible components require more than adding ARIA attributes.

For example:

- A dialog requires focus management, focus trapping, Escape handling, and focus restoration.
- Tabs require a specific keyboard interaction model rather than simply changing content when clicked.
- A disclosure can often rely on native HTML controls instead of unnecessarily recreating browser behavior.
- ARIA attributes need to remain synchronized with the actual component state.
- Keyboard accessibility needs to be intentionally designed and tested.

The exercise made the accessibility responsibilities handled by component libraries such as Radix much more apparent.

---

## 6. Production Follow-Up

The manual implementations are educational FE-05 exercises and are not intended to replace Tanglaw's production shadcn/Radix components.

For production use, the existing shadcn/Radix implementations should continue to be preferred because they provide more comprehensive handling of focus management, component composition, layered interactions, and accessibility edge cases.

The manual playground exists specifically to demonstrate understanding of the underlying accessibility fundamentals.

---

## 7. Validation

The project was validated with:

- `npm run typecheck` — PASS
- `npm run test` — PASS (15/15 tests)
- `npm run build` — PASS
- `npm run build:playground` — PASS
- Manual keyboard-only browser testing — PASS

The FE-05 playground is therefore implemented, documented, compiled, built, and manually keyboard-tested.