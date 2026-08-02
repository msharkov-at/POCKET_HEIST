# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — run ESLint (flat config via `eslint.config.mjs`)
- `npm test` — run Vitest in watch mode
- `npx vitest run` — run the full test suite once (non-watch), used for CI-style checks
- `npx vitest run tests/components/Navbar.test.tsx` — run a single test file
- `npx vitest run -t "renders the main heading"` — run a single test by name

## Architecture

Next.js App Router project (`app/`) using two route groups with separate layouts:

- `app/(public)/` — unauthenticated pages (`/`, `/login`, `/signup`, `/preview`). Its layout (`app/(public)/layout.tsx`) wraps children in a bare `<main className="public">` with no nav.
- `app/(dashboard)/` — authenticated pages (`/heists`, `/heists/create`, `/heists/[id]`). Its layout renders the shared `Navbar` component above `{children}`.

`app/(public)/page.tsx` (the `/` route) is a splash page: it is meant to redirect to `/heists` when logged in and `/login` otherwise, but that redirect logic is not implemented yet — it currently just renders static marketing copy.

`app/(public)/preview/page.tsx` is a scratch route for previewing new UI components in isolation before wiring them into real pages.

All pages so far are static placeholders (no data fetching, no auth, no state) — the route/layout structure is the main thing implemented.

### Styling

Tailwind CSS v4 is configured via the `@tailwindcss/postcss` plugin (no `tailwind.config.js` — v4 uses CSS-based config). Theme tokens (colors, font) are defined with `@theme` in `app/globals.css` and consumed as Tailwind utilities, e.g. `--color-primary` → `bg-primary`/`text-primary`. Shared layout utility classes (`.page-content`, `.center-content`, `.form-title`) are also defined in `globals.css` using `@apply` and used directly as `className` strings across pages rather than repeating utility classes inline.

Component-local styles use CSS Modules (e.g. `components/Navbar/Navbar.module.css` imported as `styles` in `Navbar.tsx`), not Tailwind, when a style is specific to one component.

### Import alias

`@/*` maps to the project root (see `tsconfig.json` paths), e.g. `@/components/Navbar`, `@/app/globals.css`.

### Testing

Vitest + React Testing Library, jsdom environment (`vitest.config.mts`). `vitest.setup.ts` loads `@testing-library/jest-dom/vitest` matchers globally. Path aliases in tests are resolved via `vite-tsconfig-paths`, so `@/*` imports work the same as in app code. Test files live under `tests/`, mirroring the source structure (e.g. `tests/components/Navbar.test.tsx` tests `components/Navbar/Navbar.tsx`).

## Additional coding preferences

- No semicolons in JavaScript/TypeScript.
- Don't apply Tailwind utility classes directly in component markup unless it's a single class. If an element needs more than one utility class, define a class in a CSS file (component `.module.css` or `globals.css`) and combine the utilities there with `@apply`, then reference that one class in the markup.
- Keep project dependencies minimal — prefer what's already installed or a built-in solution before adding a new package.
- Use `git switch -c <branch>` to create and switch to a new branch, not `git checkout -b`.
