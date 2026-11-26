<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project & checks

- Single-package Next.js 16.4.6 App Router app, all code under `src/`. No monorepo, CI, pre-commit hooks, tests, or formatter.
- Only checks: `npm run lint` (ESLint flat config `eslint.config.mjs`, no `next lint`) and `npx tsc --noEmit` (no `typecheck` script). npm only (`package-lock.json`).
- `README.md` is stock create-next-app boilerplate (wrong paths, other package managers) — trust source/config.

## Setup & auth

- `.env` is gitignored; required: `MONGODB_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_IMGBB_API_KEY`, `BACKEND_URL` (dev `http://localhost:5000`). `BETTER_AUTH_*` are consumed implicitly by better-auth — only `BETTER_AUTH_URL` appears in `src/` (`auth-client.ts`); don't hunt for a secret reference.
- Wiring: `src/lib/auth.ts` (better-auth + mongo adapter, DB name hardcoded `HairCutterDB`), `src/app/api/auth/[...all]/route.ts` (handler), `src/lib/auth-client.ts` (client). Email/password only; the Google buttons are UI-only. No local mongod needed.
- `user.additionalFields.role` is `input: false` with server-side default `"customer"` — never send `role` from sign-up. Sign-up uploads the avatar to imgbb client-side first.
- `src/lib/utils.ts` re-exports `cn` from the `cn` npm package, not clsx/tailwind-merge.

## Service data flow

- Three server-side fetches hit `BACKEND_URL`, all with `cache: "no-store"` and errors swallowed into empty/"not found" UI — blank data means the backend is missing/unreachable, not a UI bug:
  - `GET /services_six` → homepage featured services (`src/components/HomePage_components/ServicesSix.tsx`).
  - `GET /services` → listing (`src/app/services/page.tsx`); search/category/sort/pagination are client-side in `ServicesBrowser.tsx`.
  - `src/app/services/[id]/page.tsx` tries `GET /services/:id`, then falls back to the list; ids must match `/^[a-f\d]{24}$/i` or it shows "Invalid service".
- Backend docs: `_id` (string or `{$oid}`), `isActive`, `price`, `duration`; `isActive === false` is filtered out of lists.

## Unfinished wiring (not bugs to chase)

- `BookingForm.tsx` POSTs to `/api/appointments` — no such route exists; booking requests 404.
- The detail page expects login protection in a future `proxy.ts` and hardcodes `isAdmin = false`; role gating isn't wired.
- Logged-in Navbar has a "Salon Details" link to `/salons`, but there is no such route — 404.

## Next.js 16 / config

- Version-matched docs: `node_modules/next/dist/docs/` — read before writing Next code.
- `next.config.ts`: `reactCompiler` + `experimental.agentFeedback` + permissive image `remotePatterns`; Tailwind 4 via the Turbopack CSS rule. `cacheComponents` / `partialPrefetching` are off — the latter fails config validation without the former, so don't enable it alone.
- `cache: "no-store"` routes are dynamic; `next build` logs benign "Dynamic server usage ... couldn't be rendered statically" messages from their `catch` blocks, but the build succeeds.
- `params` / `searchParams` are Promises — `await` them. `middleware.ts` is deprecated → `proxy.ts` (neither file exists yet).
- `npm run dev` (Turbopack) regenerates the managed marker blocks in this file; only text between markers is replaced. Commit the file to avoid a dirty tree.

## UI / dashboards

- Tailwind CSS 4, CSS-first: no `tailwind.config` or PostCSS config; theme in `src/app/globals.css`. shadcn `base-nova` on `@base-ui/react` (not Radix), `lucide` icons, alias `@/*` → `./src/*`.
- Google fonts via `next/font/google` (Teko, Roboto, Rajdhani, Oxanium) — dev/build need network. In dashboards use `font-heading` / `font-body` CSS vars, not new font imports.
- `src/app/page.tsx` composes `src/components/HomePage_components/*`; the `(auth)` route group gives `/sign-in` and `/sign-up`.
- Dashboards (`src/app/dashboard/{customer,admin}/...`, shared in `src/components/dashboard/`) are UI-only: lists/stats come from `mock-data.ts`, forms are presentational.
- `RoleGuard.tsx` redirects client-side after hydration only — not authorization; typing another role's URL isn't blocked.
- Dashboard tokens are scoped via `.dashboard-scope` in `globals.css`; portaled content (dropdown, select, collapsed sidebar tooltips) needs `dashboard-scope` on its own class. Sidebar uses `collapsible="icon"` and cookie state (Cmd/Ctrl+B); `use-mobile.ts` uses `useSyncExternalStore`.
