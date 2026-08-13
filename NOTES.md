# FE-05 notes: manual components and shadcn/Radix

These can be found as: http://localhost:5173/playground/ 
or in deployment: https://tanglaw-tau.vercel.app/playground


## Repository assessment before implementation

| Requirement | Status before FE-05 work | Evidence |
| --- | --- | --- |
| Manual `playground/` dialog, tabs, and disclosure | COMPLETE | No `playground/` directory or manual examples existed. |
| Production dialog and tabs | COMPLETE | `src/app/components/ui/dialog.tsx` and `tabs.tsx` wrap Radix primitives; they are not the required from-scratch work. |
| Production disclosure | COMPLETE | `accordion.tsx` and `collapsible.tsx` wrap Radix primitives. `TruthHubPage.tsx` also has application-specific expanded-card controls. |
| shadcn Dialog and Tabs installed and inspectable | COMPLETE | Both wrappers import `@radix-ui/react-dialog` and `@radix-ui/react-tabs`; packages are declared in `package.json`. |
| Keyboard/focus behavior implemented manually for FE-05 | COMPLETE | Existing keyboard behavior comes from Radix or application-specific code, not a dedicated manual APG exercise. |
| TypeScript, Vite, and tests | COMPLETE | Strict TypeScript, Vite, and Vitest configuration already exist; keyboard behavior requires browser testing. |

The audit also found Radix dropdown, popover, menu, select, and carousel components. No existing file is repurposed for this assignment.

## What the manual playground implements

- **Dialog:** `role="dialog"`, `aria-modal`, labelled title and description, portal rendering, initial focus, Tab/Shift+Tab focus cycling, Escape, optional backdrop close, and focus restoration.
- **Tabs:** APG roles and relationships, generated IDs, roving `tabIndex`, automatic activation with wrapping Left/Right Arrow navigation, plus Home and End.
- **Disclosure:** a native button with `aria-expanded` and `aria-controls`; native Enter and Space activation is retained.

## Concrete gaps compared with shadcn/Radix

1. The manual dialog uses a simple selector-based focus loop. Radix Dialog supplies a dedicated focus scope that handles more edge cases, including nested dialogs and focus changes caused by dynamically added or removed content.
2. Radix Dialog also manages modal outside interaction and accessibility isolation beyond this demo's backdrop and `aria-modal`; its portal and dismissable-layer primitives coordinate stacked overlays, pointer events, and nested layers more reliably.
3. The manual dialog restores the element focused before opening. Radix has lifecycle hooks and composable `Trigger`/`Close` primitives that account for cancelled opening, custom focus targets, and nested focus scopes.
4. The manual tabs intentionally support horizontal automatic activation only and have no disabled-tab API or orientation option. Radix Tabs supports controlled/uncontrolled state, vertical orientation, disabled triggers, and configurable automatic versus manual activation.
5. The manual tabs create and maintain ID relationships directly. Radix coordinates composed triggers/content, state attributes, and roving focus across dynamic children, reducing the chance of stale IDs or focus references after a component tree change.

## Lessons and production follow-up

The manual components demonstrate the APG fundamentals, but they are intentionally educational rather than replacements for Radix. A production dialog should additionally account for nested layers, scrolling, dynamic focusable content, and assistive-technology behavior across browsers. Existing Tanglaw production components should continue to use the inspected shadcn/Radix wrappers.
