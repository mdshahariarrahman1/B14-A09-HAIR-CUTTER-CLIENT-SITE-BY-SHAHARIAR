<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Single-package Next.js 16.4.6 App Router app under `src/`. No monorepo, CI, pre-commit hooks, tests, or formatter. Only checks: `npm run lint` (ESLint flat config in `eslint.config.mjs`; there is no `next lint`) and `npx tsc --noEmit` (no typecheck script). npm is the only package manager (`package-lock.json`; no other lockfiles). `README.md` is stock create-next-app boilerplate (it points at `app/page.tsx` and lists other package managers) — trust the source/config over it.

## Environment and auth

- `.env` is gitignored, so a fresh checkout has none. Required vars: `MONGODB_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (also read client-side in `src/lib/auth-client.ts`), `NEXT_PUBLIC_IMGBB_API_KEY` (client-side imgbb profile-image upload on sign-up), `BACKEND_URL` (see below).
- Auth wiring: `src/lib/auth.ts` (better-auth + `@better-auth/mongo-adapter`), handler `src/app/api/auth/[...all]/route.ts`, client `src/lib/auth-client.ts`. Pages call `authClient.signIn.email` / `authClient.signUp.email`.
- Only email/password auth is enabled in `auth.ts`; the "Google" buttons on the auth pages are UI-only (no social provider configured).
- The connection comes only from `MONGODB_URL`; the database name `HairCutterDB` is hardcoded in `auth.ts` — no local mongod needed.
- `user.additionalFields.role` is `input: false` with server-side default `"customer"`; don't send `role` from the sign-up client.
- `src/lib/utils.ts` re-exports `cn` from the `cn` npm package, not clsx/tailwind-merge.

## External backend

- The homepage's "Featured Salon Services" section (`src/components/HomePage_components/ServicesSix.tsx`, a server component) fetches `${BACKEND_URL}/services_six` (dev value `http://localhost:5000`) with `next: { revalidate: 60 }`; that service is not in this repo. Fetch failures are swallowed and the section renders an empty state, so a blank section means a missing/unreachable backend, not a UI bug.

## Next.js 16 gotchas

- Version-matched docs live in `node_modules/next/dist/docs/`; read the relevant page before writing Next code.
- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler`. Exporting `dynamic`, `revalidate`, or `fetchCache` from a route segment is an error: use `'use cache'` + `cacheLife`, and wrap request-time data (e.g. sessions) in `<Suspense>`. Dev validates instant navigation; `export const instant = false` is the temporary opt-out. Guide: `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`.
- `params` / `searchParams` are Promises — `await` them.
- `middleware.ts` is deprecated and renamed to `proxy.ts` (neither exists yet).
- `npm run dev` (Turbopack) rewrites the managed marker blocks in this file: `nextjs-agent-rules`, plus `nextjs-agent-feedback` because `experimental.agentFeedback: true`. Only content between markers is replaced; commit the file so dev doesn't leave a dirty tree.

## UI conventions

- Tailwind CSS 4, CSS-first: no `tailwind.config`; theme/imports in `src/app/globals.css`, processed by the `@tailwindcss/turbopack` rule in `next.config.ts`. Don't add PostCSS/Tailwind config files.
- shadcn `base-nova` style built on `@base-ui/react` (`components.json`), not Radix; `lucide` icons.
- Path alias `@/*` → `./src/*`.
- `src/app/page.tsx` composes `src/components/HomePage_components/*`; auth pages sit in the `(auth)` route group, so their URLs are `/sign-in` and `/sign-up`.
