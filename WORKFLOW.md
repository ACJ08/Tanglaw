# AI Workflow Comparison: Round 1 vs Round 2

## Goal

I compared two AI-assisted approaches to improving Tanglaw's Truth Hub feature. The experiment tested whether a vague prompt or a specification-driven workflow produced a more correct, accessible, and reviewable result.

## Round 1 — Vague Prompt

**Prompt used:**

> Fix the Truth Hub Network section in Tanglaw.

The AI interpreted "fix" primarily as a visual/layout problem. It created `TruthHubNetworkVisual.tsx`, redesigned the Truth Hub hero visual, updated both `App.tsx` and `TruthHubPage.tsx`, and removed unused code. Typecheck and production build passed.

**Result:** the visual presentation improved, but Search, Filter, and Near Me remained non-functional. My manual review took approximately 4m 45s. The key mistake was that the AI chose its own interpretation of the problem instead of verifying the feature's intended behavior.

## Round 2 — Specification-Driven Workflow

**Prompt approach:**

> Make the Truth Hub feature fully functional, not just visually redesigned.

I explicitly required the AI to:

* explore the relevant files and project conventions first
* produce an implementation plan before coding
* implement Search, Filter, Near Me, Get Directions, and Partnership behavior
* preserve the existing design, themes, and working functionality
* handle accessibility and edge cases
* avoid unnecessary backend services or dependencies
* write tests and actually run them
* run typecheck and the production build
* report files changed, verification results, and limitations

The AI explored the existing `TruthHubPage.tsx`, identified the missing functionality, extracted reusable data/filter logic, and then implemented the feature.

**Result:** Search supports name, address, and type; filters support hub type and status; Near Me sorts by precomputed distance; Get Directions opens Google Maps; the partnership form validates input; and an accessible empty state was added. The implementation included 15 unit tests, all passing, plus successful typecheck and production build.

## Comparison

The main difference was not simply prompt length. Round 2 changed the AI's workflow from **generate → review** to **explore → plan → implement → test → verify**.

**Correctness:** Round 2 addressed the actual missing functionality rather than only redesigning the UI.

**Accessibility:** Round 2 explicitly required semantic controls, ARIA states, labels, focus states, keyboard interaction, and live regions.

**Edge cases:** Round 2 handled empty results, combined search/filter states, invalid form submissions, and nested card/action interactions.

**Review effort:** Round 2 required more upfront planning, but it reduced uncertainty because expected behavior and verification criteria were defined before implementation.

## AI Mistake Caught

The clearest mistake was in Round 1: the AI treated the Truth Hub problem primarily as a visual issue and left existing functional controls unfinished. This showed me that code that builds successfully can still fail the intended product behavior.

## What I Learned

A vague prompt lets the AI decide what "done" means. A strong workflow defines what done means before implementation and requires evidence that the result works.

**Future workflow:** Explore → Plan → Implement → Test → Typecheck → Build → Review → Document.
