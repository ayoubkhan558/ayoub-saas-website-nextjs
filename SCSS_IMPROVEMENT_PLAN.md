# SCSS Improvement Plan

## Context
The codebase has ~10,000 lines of SCSS across 54 files: a shared layer in
`src/styles/` (`_foundation`, `_buttons`, `_pages`, `_mixins`, `_animations`)
plus 49 `*.module.scss` co-located with components. The foundation layer is
already strong — a full `:root` design-token system (colors, `--space-*`,
`--text-*` fluid type via `clamp-val()`, `--radius-*`, `--shadow-*`,
`--border-*`). Components are ~95% tokenized (1,935 `var()` refs vs 109 raw
hex).

The problems are **consistency and leverage**, not architecture: existing
tokens are bypassed, breakpoints are ad-hoc, and only one mixin exists. This
plan closes those gaps without a rewrite.

## Findings (evidence)

1. **Existing tokens bypassed — biggest win.**
   `rgba(49, 38, 59, α)` is written raw **132 times** across component modules,
   even though `--border-hairline/line/soft/strong` (`_foundation.scss:187-190`)
   already encode exactly these values. Plus **109 raw hex** literals and many
   repeated `rgba(248,244,255,α)` / `rgba(255,255,255,α)` surface tints with no
   token.

2. **Breakpoint anarchy.** 15+ distinct `min-width` values hand-written across
   **34 files**, including near-duplicates that are almost certainly meant to be
   the same tier: `760px` vs `768px` (61 uses combined), `900px` vs `920px`,
   `980px` vs `1040px` vs `1080px`. No breakpoint variables or mixin — every
   query is a magic number.

3. **Thin mixin layer.** `_mixins.scss` has only `clamp-val()`. Repeated
   patterns (responsive queries, focus ring, visually-hidden, card surface,
   reduced-motion guard) are copy-pasted instead of shared.

4. **Oversized modules.** Several modules exceed 450 lines
   (`ServicesPage` 556, `AboutSection` 509, `ProjectShowcaseSection` 467,
   `HeroSection` 466), largely from repeated card/section-shell blocks.

## Plan

### Phase 1 — Standardize breakpoints (highest ROI, low risk)
- Add a breakpoint scale + mixin to `src/styles/_mixins.scss`:
  ```scss
  $breakpoints: (sm: 560px, md: 768px, lg: 920px, xl: 1120px);
  @mixin mq($name) {
    @media (min-width: map.get($breakpoints, $name)) { @content; }
  }
  ```
  (add `@use "sass:map";`). Component modules already `@use "mixins" as *`.
- Migrate raw `@media (min-width: …)` → `@include mq(md)` etc., collapsing the
  760/768 and 900/920 near-duplicates onto the nearest tier. Do it per-file,
  visually diffing rendering; start with the 4 largest modules.
- Keep `prefers-reduced-motion` / `max-width` one-offs as-is, or add a
  `@mixin reduced-motion` for the 11 reduced-motion blocks.

### Phase 2 — Enforce existing tokens
- Replace the 132 raw `rgba(49, 38, 59, α)` with the matching `--border-*`
  token where α lines up (0.08/0.12/0.16/0.28); for other α values add a small
  set of tokens (e.g. `--tint-ink-*`) rather than scattering raw rgba.
- Replace 109 raw hex with the nearest existing color token; introduce a token
  only when a value recurs and none fits.
- Add tokens for the recurring surface tints (`rgba(248,244,255,α)`,
  `rgba(255,255,255,α)`) seen 40+ times.
- Optional: adopt `color-mix(in srgb, var(--color-…) X%, transparent)` so one
  base color yields all alpha variants without new tokens.

### Phase 3 — Grow the mixin/util layer
Add to `_mixins.scss` (only patterns proven repeated above):
- `@mixin focus-ring` → wraps `box-shadow: var(--shadow-focus)` + outline reset.
- `@mixin visually-hidden` for a11y labels.
- `@mixin card-surface` → the repeated `background: var(--color-surface)` +
  `border: 1px solid var(--border-line)` + `border-radius: var(--radius-cards)`.
- `@mixin section-shell` for the shared section padding-block rhythm.

### Phase 4 — Trim oversized modules
- After Phases 2–3, refactor the 450+ line modules to consume the new mixins;
  extract genuinely shared card markup patterns. Target: no module > ~300 lines.

### Phase 5 — Guardrails (prevent regression)
- Add `stylelint` with `stylelint-config-standard-scss` +
  `stylelint-declaration-strict-value` to force color/spacing through tokens,
  and a custom rule/CI grep banning raw `@media (min-width` in `*.module.scss`.
- Wire into `package.json` (`"lint:css": "stylelint 'src/**/*.scss'"`) and the
  existing lint step.

## Critical files
- `src/styles/_mixins.scss` — add breakpoints + mixins (central change).
- `src/styles/_foundation.scss` — add any new tint/surface tokens.
- Largest consumers first: `services/ServicesPage.module.scss`,
  `landing/AboutSection/AboutSection.module.scss`,
  `landing/ProjectShowcaseSection/…`, `landing/HeroSection/…`.

## Verification
- `npx tsc --noEmit` (unaffected) and `yarn build` must stay green after each
  phase — SCSS errors surface at build time.
- `yarn dev` and visually compare the 4 largest sections before/after each
  migration (breakpoint collapse is the one visual-risk step).
- Track progress with greps as acceptance metrics:
  - `grep -rc "rgba(49, ?38, ?59" src/components` → target 0 (Phase 2).
  - `grep -rl "@media (min-width" src/components` → target 0 (Phase 1).
  - `stylelint` passes in CI (Phase 5).

## Sequencing note
Phases are independent and shippable on their own. Recommended order 1 → 2 →
3 → 4 → 5; Phase 1 (breakpoints) gives the biggest consistency win for the
least risk and should land first.
