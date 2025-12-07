# AGENTS

## Scope and non goals
1) Scope is to guide coding agents working in this repository and to store high signal operational learnings.
2) Non goals include personal preferences unrelated to coding, generic AI advice, and chat history.

## Project quick facts
1) Primary purpose is an interactive portfolio site with motion-heavy UI and theme-aware styling.
2) Main language is TypeScript with React components.
3) Frameworks and major libraries are Next.js 16 App Router, React 19, Tailwind CSS 4, Framer Motion, and p5.js.
4) How to run dev is `npm run dev`.
5) How to run tests is `npm run lint -- --max-warnings=0` and `npm run build` because no dedicated test script is configured.
6) How to build is `npm run build`.
7) Configuration and env var locations are `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, and optional `.env*` files that are gitignored; no env vars are currently referenced in `src/`.

## Repo map
1) `src/app` contains App Router routes and global layout files.
2) `src/components` contains UI components including `OrbitCarousel`, `Header`, `Footer`, and `ThemeProvider`.
3) `src/lib` contains shared logic and data contracts, including the main content source `src/lib/data.ts`.
4) `public` contains static assets and portfolio media.
5) `docs` contains project conventions and audits, including naming and design-system docs.
6) `.github` contains agent and copilot operating guidance files.
7) Generated or vendor folders that should not be edited are `.next/`, `node_modules/`, `test-results/`, and `tsconfig.tsbuildinfo`.
8) There is no repo-level `scripts/` directory at this time.

## Golden rules for edits
1) Keep diffs minimal and reversible.
2) Prefer fixing root causes over symptoms.
3) Do not refactor unrelated code.
4) Preserve public APIs unless explicitly requested.
5) Add tests or verification steps when behavior changes.
6) Keep personal and portfolio content in `src/lib/data.ts` instead of hardcoding it in route or component files.
7) Do not create new git branches or ask others to create branches unless explicitly requested by the user.
8) For memory-maintenance tasks, edit only `AGENTS.md` unless the user explicitly asks for broader file changes.

## Commands
1) Install
   1) `npm install`
2) Dev
   1) `npm run dev`
3) Lint
   1) `npm run lint -- --max-warnings=0`
4) Format
   1) `npm run lint -- --fix`
5) Typecheck
   1) `npx tsc --noEmit`
6) Unit tests
   1) `echo "No unit test script configured"; npm run lint -- --max-warnings=0`
7) Integration or e2e tests
   1) `echo "No integration/e2e test script configured"; npm run build`
8) Build
   1) `npm run build`

## Code conventions
1) Formatting and linting are enforced through ESLint 9 flat config in `eslint.config.mjs`.
2) Lint violations should be fixed at source; use targeted `eslint-disable` comments only when behavior requires it and include a reason.
3) Error handling should use guard clauses and cleanup in effects; long-running loops and listeners must be removed in cleanup paths.
4) Logging should stay minimal and intentional; avoid new debug `console.log` noise and keep error logs actionable.
5) Naming conventions are `PascalCase` for component files, `camelCase` for variables/functions, and BEM-like kebab-case for CSS classes per `docs/naming-standard.md`.
6) Add new portfolio content in `src/lib/data.ts`, then render it through existing component patterns before creating new modules.

## Architecture constraints
1) Approved pattern is Next.js App Router pages composing reusable components with data sourced from `src/lib/data.ts`.
2) Forbidden pattern is hardcoding portfolio data directly in page or component markup when the same field belongs in `src/lib/data.ts`.
3) Dependency direction is route files in `src/app` importing from `src/components` and `src/lib`, while shared data contracts remain in `src/lib`.
4) State management should remain local React state and refs unless a shared store is explicitly required.
5) Database and migrations are not applicable in this repo because there is no backend database layer.
6) API contract rules are not applicable in this repo because no internal API routes are currently defined.

## Performance and reliability
1) Known hotspots are animation-heavy components such as `src/components/OrbitCarousel.tsx` and `src/components/RecursiveSketchBackground.tsx`.
2) Keep expensive visual updates inside `requestAnimationFrame` loops and mutable refs to avoid unnecessary React renders.
3) Event listeners, RAF handles, and media-query subscriptions must always be cleaned up in component unmount paths.
4) Observability is lightweight; use build and lint gates plus route smoke checks (`/`, `/work`, `/archive`, `/info`) after nontrivial UI changes.

## Security and privacy
1) Never log secrets or sensitive user data.
2) Secret handling belongs in `.env*` files that are not committed.
3) Validate and sanitize externally sourced URLs or user-facing links before rendering.
4) AuthN and AuthZ touch points are currently not present; if added later, document guards in this section before merging.

## Change workflow
1) Before coding
   1) Identify the exact files involved.
   2) Identify the verification commands.
   3) Identify edge cases.
2) While coding
   1) Make the smallest correct change.
   2) Update tests or verification notes alongside changes.
3) After coding
   1) Run fast checks.
   2) Run targeted tests.
   3) Update `AGENTS.md` Sessions entry.

## Output format in IDE chats
1) Plan in 3 to 7 steps.
2) List changed files.
3) Explain why the fix is correct.
4) Provide verification commands and expected results.
5) Note risks and rollback steps.

## Sessions
1) Append exactly one new entry after each completed task.
2) Each entry must be compact, operational, and deduplicated against prior entries.
3) Only include learnings that would change future agent behavior in this repo.
4) Never copy full chat transcripts into this section.

### Session entry template
1) Date
2) Goal
3) Outcome
4) Key Learnings
5) Next Steps

### Session 2026-02-05
1) Date: 2026-02-05.
2) Goal: Unify the repo operating manual with memory-maintainer behavior and require automatic `AGENTS.md` updates after each task.
3) Outcome: Created root `AGENTS.md` with repo-specific commands, decision rules, architecture constraints, and a persistent session protocol.
4) Key Learnings
   1) This repo has no dedicated test scripts, so lint plus build are the default correctness gates.
   2) `src/lib/data.ts` is the content source of truth and should receive data changes before UI mapping edits.
   3) Motion-heavy components require strict cleanup of RAF loops and listeners to prevent regressions.
5) Next Steps
   1) Append one compact session entry at the end of each future task.
   2) Keep command lists synchronized with `package.json` whenever scripts change.
   3) Add explicit test commands here if a test runner is introduced.

### Session 2026-02-05-2
1) Date: 2026-02-05.
2) Goal: Convert OrbitCarousel project details to desktop hover activation, increase panel size, and surface richer data-driven project metadata.
3) Outcome: Implemented timer-based hover/focus state handling with panel-safe transitions, expanded desktop panel sizing with internal scroll, and upgraded project data fields (`tech`, `features`, `highlights`, `longDescription`) for conditional rendering.
4) Key Learnings
   1) A shared open/close timer with hover-region refs prevents flicker when moving between card, title, and detail panel.
   2) Large overlay panels must cap width using remaining overlay space to avoid horizontal overflow at intermediate desktop widths.
   3) `projects: [...] satisfies Project[]` keeps schema checks in `src/lib/data.ts` while preserving existing object inference elsewhere.
5) Next Steps
   1) Keep new project entries aligned to the `Project` shape so optional sections render cleanly without component-level fallbacks.
   2) Run manual interaction smoke checks on fine-pointer desktop and coarse-pointer mobile whenever carousel behavior changes.
   3) Preserve single-source panel logic to avoid duplicate hover/tap state paths.

### Session 2026-02-05-3
1) Date: 2026-02-05.
2) Goal: Increase the OrbitCarousel detail panel vertical size for richer content visibility.
3) Outcome: Raised desktop detail panel `height` and `max-height` clamps so more project detail is visible before scrolling, while preserving mobile bottom-sheet constraints.
4) Key Learnings
   1) Increasing both `height` and `max-height` together keeps internal scroll behavior predictable across viewport heights.
5) Next Steps
   1) Re-check desktop visual balance at medium laptop heights after future typography or spacing changes.

### Session 2026-02-05-4
1) Date: 2026-02-05.
2) Goal: Hide the OrbitCarousel detail close button and prevent text overflow in the detail container.
3) Outcome: Removed the close button markup/styles and added wrapping safeguards (`overflow-wrap`/`word-break`) across panel text elements and tags to eliminate content overflow.
4) Key Learnings
   1) Global wrap safeguards at the panel level plus targeted tag/list/title wrapping prevents edge-case long-token overflow without changing layout structure.
5) Next Steps
   1) Keep new project copy and tech labels readable by favoring concise phrasing, even though long tokens now wrap safely.

### Session 2026-02-05-5
1) Date: 2026-02-05.
2) Goal: Make OrbitCarousel detail panel copy render in uppercase consistently.
3) Outcome: Applied `text-transform: uppercase` at the detail panel container level and removed local lowercase overrides in paragraph/list item styles.
4) Key Learnings
   1) Container-level text transform is the safest single-point control when multiple child styles previously override casing.
5) Next Steps
   1) Keep component-local text casing overrides out of detail panel styles unless intentionally required.

### Session 2026-02-05-6
1) Date: 2026-02-05.
2) Goal: Add a premium liquid-glass visual treatment to the OrbitCarousel detail container.
3) Outcome: Upgraded `.orbit-carousel__detail-panel` with layered gradients, stronger blur/saturation, refined shadows, radius polish, and non-interactive highlight overlays via `::before`/`::after`.
4) Key Learnings
   1) Pairing glass depth shadows with subtle screen-blended overlays creates a polished liquid finish without changing component structure.
5) Next Steps
   1) Keep future panel color tweaks anchored to existing CSS variables so glass behavior stays theme-aware.

### Session 2026-02-05-7
1) Date: 2026-02-05.
2) Goal: Match detail panel glassmorphism closer to a lightweight nav-pill style reference.
3) Outcome: Simplified panel visuals to a cleaner glass base using translucent background, blur-12 backdrop, soft white border, minimal dual shadow, rounded corners, and smooth `all 0.3s ease` transition.
4) Key Learnings
   1) Reducing decorative overlays can make glass components feel more polished and aligned with minimalist references.
5) Next Steps
   1) If needed, tune only opacity and blur values to balance visibility across light and dark themes without reintroducing heavy overlays.

### Session 2026-02-05-8
1) Date: 2026-02-05.
2) Goal: Make glass blur visibly stronger in the OrbitCarousel detail panel.
3) Outcome: Increased backdrop blur/saturation, reduced panel opacity with explicit translucent RGBA backgrounds, and added dark-theme specific glass values for clearer frosted separation.
4) Key Learnings
   1) Visible blur depends on both filter strength and panel opacity, so explicit RGBA backgrounds often outperform subtle token mixes for fast visual tuning.
5) Next Steps
   1) If blur still appears weak on specific devices, validate browser backdrop-filter support and adjust blur radius further before changing layout.

### Session 2026-02-05-9
1) Date: 2026-02-05.
2) Goal: Make the detail panel look more fully blurred and opaque, as a stronger frosted container.
3) Outcome: Raised panel opacity significantly and increased backdrop blur radius to 38px with tuned saturation/contrast, plus matching dark-theme opacity adjustments.
4) Key Learnings
   1) A "blurred and opaque" frosted look needs both high-alpha panel fill and high blur radius; either one alone reads weaker in motion-heavy backgrounds.
5) Next Steps
   1) If this feels too heavy on some displays, tune down alpha first before reducing blur radius.

### Session 2026-02-05-10
1) Date: 2026-02-05.
2) Goal: Redesign detail panel with clean, transparent glassmorphism that maintains text legibility while preserving liquid glass aesthetic.
3) Outcome: Reduced opacity from 72% to 8% (light) / 12% (dark), removed heavy gradient overlay, decreased blur from 38px to 12px, added border-radius, and simplified shadows for a minimalistic transparent glass effect.
4) Key Learnings
   1) True glassmorphism requires very low opacity (8-12%) to maintain transparency and legibility rather than heavy frosted overlays.
   2) Removing gradient overlays and using single-layer rgba backgrounds creates cleaner, more readable glass panels.
   3) Moderate blur (12px) with saturation boost provides glass separation without obscuring content.
5) Next Steps
   1) Monitor text contrast across both themes and adjust background opacity if readability suffers on specific background patterns.
   2) Consider adding a subtle text-shadow to detail panel text if contrast becomes an issue on busy backgrounds.

### Session 2026-02-05-11
1) Date: 2026-02-05.
2) Goal: Build a reusable global skill that can search local skills plus the full `skills.sh` catalog and install the best match quickly.
3) Outcome: Created global `skills-router` skill with a deterministic Python router script, documented `skills.sh` API endpoints, validated the skill, and executed a full paginated catalog scan with cached results.
4) Key Learnings
   1) `skills.sh` exposes fast query endpoints (`/api/search`) and paginated catalog endpoints (`/api/skills/all-time/<page>`), so full scans are scriptable without browser automation.
   2) Full catalog scans are expensive enough to warrant local caching for follow-up runs.
   3) Ranking should penalize weak lexical matches to avoid noisy local-skill false positives.
5) Next Steps
   1) Reuse the router script first for future “find a skill” requests before creating new skills from scratch.
   2) Refresh the cached full catalog only when search quality degrades or the user asks for a complete re-scan.

### Session 2026-02-05-12
1) Date: 2026-02-05.
2) Goal: Stop `/work` and `/archive` dev-time infinite reload loops and add a repeatable stability guard.
3) Outcome: Switched default dev server to webpack (`next dev --webpack`), kept explicit Turbopack opt-in script, and added `route-stability-check.mjs` + `verify:route-stability` script using headless Playwright to assert one document load, no `reloadPage` events, and no page runtime errors on `/`, `/work`, `/archive`, `/info`.
4) Key Learnings
   1) In this repo on Next 16.1.5, the observed reload loop was caused by Turbopack HMR `reloadPage` events tied to `Failed to write app endpoint` panics rather than app redirect logic.
   2) Route-level stability checks are a practical regression net even without a full e2e framework.
5) Next Steps
   1) Keep `npm run verify:route-stability` in smoke checks whenever route/layout or dev-server config changes.
   2) Use `npm run dev:turbopack` only for targeted Turbopack validation until the panic is resolved upstream.

### Session 2026-02-05-12
1) Date: 2026-02-05.
2) Goal: Add missing project live-site URLs and make the `/work` list open deployed demos when available.
3) Outcome: Added normalized `https://` `liveUrl` entries for deployed projects in `src/lib/data.ts` and updated `WorkList` to prefer `liveUrl` over repository links.
4) Key Learnings
   1) The `/work` route uses `src/app/work/WorkList.tsx` link selection, so demo-link behavior depends on that component preferring `liveUrl`.
5) Next Steps
   1) For future project additions, include `liveUrl` in `src/lib/data.ts` whenever a deployed demo exists so both carousel and `/work` stay aligned.

### Session 2026-02-05-13
1) Date: 2026-02-05.
2) Goal: Correct project years across the portfolio data set.
3) Outcome: Updated year fields in `src/lib/data.ts` for PromptDJ, Realtime Face Attendance, No BS College Predictor, Chatbot LangChain, Kaleidoscope, Listify, and Handwritten Text Recognition per the provided timeline.
4) Key Learnings
   1) Project chronology updates should be handled only in `src/lib/data.ts` to keep both carousel and `/work` consistent.
5) Next Steps
   1) Re-check any future timeline edits for downstream ordering assumptions in UI components.

### Session 2026-02-05-14
1) Date: 2026-02-05.
2) Goal: Remove the brief oversized title flash during home info title transitions.
3) Outcome: Switched the home info title `AnimatePresence` to `mode="wait"` so the incoming title renders after the outgoing one exits, preventing the pop-layout size flash.
4) Key Learnings
   1) `AnimatePresence` popLayout can create momentary scale artifacts for typography-heavy content; `mode="wait"` avoids overlap.
5) Next Steps
   1) If a gap feels too long, reduce the exit transition duration instead of reintroducing layout pop.

### Session 2026-02-05-15
1) Date: 2026-02-05.
2) Goal: Remove the home info title transition animation per feedback.
3) Outcome: Replaced the animated title block with a static `div`, removing the `AnimatePresence`/`motion` transition for the home info title.
4) Key Learnings
   1) For fixed info panels, removing motion can read cleaner than even short title transitions.
5) Next Steps
   1) If future motion is desired, consider subtle opacity-only transitions to avoid layout jitter.

### Session 2026-02-05-13
1) Date: 2026-02-05.
2) Goal: Lock the home detail panel to fixed dimensions, tighten the info/detail gap, and autoscale long detail headings.
3) Outcome: Set the overlay gap to 1vw, fixed the detail panel to constant width/height, adjusted interior typography sizes, and added title autoscaling for overflow safety.
4) Key Learnings
   1) Detail panel sizing and spacing are controlled in `src/app/globals.css`, while heading autoscaling requires a layout-aware ref in `src/components/OrbitCarousel.tsx`.
5) Next Steps
   1) Re-check desktop and mobile breakpoints to confirm the fixed detail size stays balanced with the info panel.

### Session 2026-02-05-14
1) Date: 2026-02-05.
2) Goal: Fix homepage layout bugs (title overlap, desync) with clamp-based responsive sizing and stable title rendering.
3) Outcome: Converted info-display and detail-panel from fixed px to clamp-based dimensions, added CSS line-clamp for title overflow, changed AnimatePresence from "wait" to "popLayout" mode, and removed redundant title-fitting JS logic.
4) Key Learnings
   1) AnimatePresence mode="wait" blocks new content until exit completes—use "popLayout" for non-blocking transitions when rapid updates are expected.
   2) CSS `-webkit-line-clamp` with `overflow: hidden` is more reliable than JS-based font scaling for preventing title overflow.
   3) Clamp-based sizing keeps gap proportions stable across viewports: `gap: clamp(0.75rem, 1.5vw, 1.5rem)` maintains ~1-2vw visual gap.
   4) Title desync was not a state bug but an animation timing issue—the title state (`activeProjectIndex`) was always correct.
5) Next Steps
   1) Test at viewport widths 320, 768, 1024, 1440, 1920 to confirm no title overflow or layout shift.
   2) Keep single source of truth pattern: `activeProjectIndex` for carousel/title, `selectedProjectIndex` for details panel.

### Session 2026-02-05-15
1) Date: 2026-02-05.
2) Goal: Reduce heading font sizes in both info-display and detail-panel containers to prevent overflow.
3) Outcome: Decreased `.info-display__title` from `clamp(1.25rem, 3.5vw, 2.5rem)` to `clamp(1.125rem, 3vw, 1.875rem)`, reduced `.orbit-carousel__detail-title` base size from `1.5rem` to `1.25rem`, and added proper line-clamp to detail title.
4) Key Learnings
   1) Both info-display title and detail-panel title need consistent line-clamp treatment (`-webkit-line-clamp: 2` with `-webkit-box` display) to prevent horizontal overflow.
   2) Smaller heading sizes improve fit across viewports without sacrificing readability.
5) Next Steps
   1) Monitor heading legibility at mobile breakpoints after font size reduction.
   2) Verify no text overflow on longest project titles during visual testing.

### Session 2026-02-10
1) Date: 2026-02-10.
2) Goal: Remove home overlay spacing, scale homepage UI to ~90%, and keep info/detail heights synced.
3) Outcome: Removed perceived horizontal gap by switching the overlay layout to `justify-content: flex-start`, scaled orbit system via CSS variables and breakpoint `--orbit-info-w` adjustments, fixed a `px` typo in detail panel height, and tightened info-panel vertical spacing (dots/content).
4) Key Learnings
   1) Flex layouts with `space-between` can create “phantom” gaps even with `gap: 0`; `flex-start` is the reliable zero-gap baseline when panels should touch.
   2) Global “shrink to 90%” is safest when driven by a small set of CSS variables (e.g. `--orbit-size-scale`, `--orbit-info-w`) plus matching height clamps.
   3) Small unit typos (e.g. `288p`) can slip through quickly—build/lint gates catch this early.
5) Next Steps
   1) Do a quick visual smoke check on `/` at 90% browser zoom across a couple viewport widths.

### Session 2026-02-10-2
1) Date: 2026-02-10.
2) Goal: Verify Twitter card meta image response and HTML meta tags from the terminal.
3) Outcome: Confirmed metadata targets (`https://yashdogra.dev/images/core/Works.jpeg` and `https://yashdogra.dev`) but environment DNS could not resolve the domain, so remote header/meta checks must be run from a network with DNS access.
4) Key Learnings
   1) Terminal-based verification depends on environment DNS resolution; if `curl` cannot resolve the host, rerun from a local network or CI runner with outbound DNS.
5) Next Steps
   1) Re-run the curl checks locally and share the outputs if further diagnosis is needed.

### Session 2026-02-10-3
1) Date: 2026-02-10.
2) Goal: Re-run Twitter card image/meta verification after the domain change.
3) Outcome: The shell environment lacks common tools (`curl`, `grep`, `ls`) and Python requests returned no observable output, so checks could not be completed from this terminal.
4) Key Learnings
   1) When the terminal lacks basic utilities, verification must be done from a local shell or CI environment with standard networking and tooling.
5) Next Steps
   1) Run the curl-based checks on the new domain locally and paste the output for analysis.

### Session 2026-02-10-4
1) Date: 2026-02-10.
2) Goal: Initialize workspace context and verify baseline gates (lint/build) before further changes.
3) Outcome: Confirmed project layout and scripts; `npm run lint -- --max-warnings=0` passed; `npm run build` passed when run outside the sandbox due to sandbox port-binding restrictions.
4) Key Learnings
   1) In this environment, `next build` (Turbopack) may fail inside the sandbox with "binding to a port: Operation not permitted"; rerun build outside the sandbox to validate production builds.
5) Next Steps
   1) Run `npm run dev` and smoke-check `/`, `/work`, `/archive`, `/info` before making UI changes.

### Session 2026-02-10-5
1) Date: 2026-02-10.
2) Goal: Fix social preview (Open Graph/Twitter card) meta so link preview images render reliably.
3) Outcome: Removed a relative `og:image:secure_url` output by dropping `secureUrl` from `openGraph.images`; made `metadataBase`/`openGraph.url` configurable via `NEXT_PUBLIC_SITE_URL`/`SITE_URL` with a safe fallback; verified generated HTML in `.next/server/app/*.html` includes absolute `og:image`/`twitter:image` and no `og:image:secure_url`.
4) Key Learnings
   1) Next metadata resolves relative `openGraph.images[].url` against `metadataBase`, but does not automatically resolve `secureUrl`; leaving `secureUrl` relative can break some scrapers.
   2) Making `metadataBase` depend on deployment env vars prevents stale hardcoded domains from breaking previews after domain changes.
5) Next Steps
   1) Set `NEXT_PUBLIC_SITE_URL` (or `SITE_URL`) in the deployment environment to the canonical production origin (e.g. `https://<your-domain>`), then re-scrape the URL in social validators to clear caches.

### Session 2026-02-10-6
1) Date: 2026-02-10.
2) Goal: Clean up local branch sprawl and remove stale/unmergeable local branches.
3) Outcome: Deleted all merged local branches and force-deleted the unmerged `chore/cleanup-dead-code` branch; confirmed no remaining local branches besides `main` and no unmerged remote branches against `origin/main`.
4) Key Learnings
   1) Use `git branch --merged main` to safely delete merged branches, but force-delete (`-D`) local branches that are ahead of their remote-tracking refs even when their commits are already in `main`.
5) Next Steps
   1) If remote clutter is a problem, delete `origin/backup/*` and other merged remote branches after confirming they are merged into `origin/main`.

### Session 2026-02-10-7
1) Date: 2026-02-10.
2) Goal: Remove an old Codex-created git worktree to avoid confusion when working in the repo.
3) Outcome: Removed the detached-head worktree at `~/.codex/worktrees/bb2e/workpage` and pruned worktree metadata; verified only the main checkout remains.
4) Key Learnings
   1) Use `git worktree list` to identify stray worktrees and `git worktree remove <path>` + `git worktree prune` to clean them up safely once the worktree is clean.
5) Next Steps
   1) If you see another detached worktree prompt, check `git worktree list` before doing any merges/commits.
