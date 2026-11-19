<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Single-package Next.js 16.4.6 App Router app (`src/` dir). Not a monorepo.
No CI, pre-commit hooks, tests, or formatter — `npm run lint` and `npx tsc --noEmit` are the only checks.

- Auth is **better-auth + MongoDB**: server `src/lib/auth.ts`, client `src/lib/auth-client.ts`,
  handler `src/app/api/auth/[...all]/route.ts`.
- Auth requires a running local MongoDB at `mongodb://localhost:27017/database`
  (hardcoded in `src/lib/auth.ts`) and `.env` with `BETTER_AUTH_SECRET` / `BETTER_AUTH_URL`.
- `src/lib/utils.ts` re-exports `cn` from the `cn` npm package — don't replace it with the
  standard clsx/tailwind-merge helper.
- `auth-client.ts` exports `authClient` (uses `BETTER_AUTH_URL`) *and* bare `signIn/signUp/useSession`
  from a second client — prefer `authClient.*`.

## Commands

- `npm run dev` — dev server (Turbopack). It also (re)writes the managed blocks in this file;
  commit `AGENTS.md` changes instead of reverting them. A second managed block
  (`nextjs-agent-feedback`) may appear — keep both marker blocks intact.
- `npm run build` / `npm run start`
- `npm run lint` — ESLint flat config (`eslint.config.mjs`); there is no `next lint`.
- No typecheck script: run `npx tsc --noEmit`.

## Next.js 16 specifics (this project)

- Version-matched docs live at `node_modules/next/dist/docs/` — read them before writing
  Next code; don't trust training-data APIs (see managed block above).
- `cacheComponents: true` + `partialPrefetching: true` are enabled: exporting `dynamic`,
  `revalidate`, or `fetchCache` from a route segment is an **error**. Cache with
  `'use cache'` + `cacheLife`, wrap runtime data in `<Suspense>`; dev validates
  "instant navigation" per route. Guide: `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`.
- `params` / `searchParams` are Promises — `await` them.
- `middleware.ts` is renamed to `proxy.ts` (neither exists yet; use `proxy.ts` if adding one).
- React Compiler is on (`reactCompiler: true`): no impure mutations during render.

## Styling / UI

- Tailwind CSS 4, CSS-first: no `tailwind.config` exists. Theme/imports are in
  `src/app/globals.css`; CSS is processed via the `@tailwindcss/turbopack` rule in
  `next.config.ts` — don't add PostCSS/Tailwind config files.
- shadcn/ui style is `base-nova` (components built on `@base-ui/react`, **not Radix**);
  config in `components.json`.
- Path alias: `@/*` → `./src/*`.
