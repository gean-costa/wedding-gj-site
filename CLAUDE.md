# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Wedding website for Gean Costa & Juliana Silva (13 Nov 2027, Belém - PA). Must work well on both desktop and mobile. Built incrementally, one section at a time. The owner is a beginner in web development and communicates in Portuguese (pt-BR): reply in Portuguese and explain new commands/concepts step by step. All site copy is in pt-BR.

Planned v1 sections: home (names, date, countdown), Nossa história, Cerimônia e festa (done), Confirmação de presença (RSVP, needs a backend/database), Lista de presentes. Hosting target: Vercel; code lives in a public GitHub repo, so never commit secrets (use `.env.local`, which is gitignored).

## Commands

```bash
npm run dev     # dev server at http://localhost:3000
npm run lint    # ESLint (flat config, eslint.config.mjs)
npm run build   # production build; also runs TypeScript checks
```

There is no test suite yet.

On this Windows machine Node/Git were installed via winget; if `node`/`git` aren't found in a shell that predates the install, refresh PATH first:
`$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')`

## Architecture

- Next.js 16 App Router with `src/` dir, TypeScript, Tailwind CSS v4 (CSS-first config: theme tokens live in `@theme` in `src/app/globals.css`, no `tailwind.config`). Path alias `@/*` → `src/*`.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`. Under Cache Components, reading the current time/random values during server render is an error: anything time-dependent (e.g. `src/components/Countdown.tsx`) reads `Date.now()` only inside `useEffect` in a Client Component, or must use `connection()` + `<Suspense>` / `'use cache'`. Check `node_modules/next/dist/docs/` before using unfamiliar APIs.
- `src/lib/wedding.ts` is the single source of truth for couple names, date (stored with explicit `-03:00` offset; Belém has no DST), and venue data, plus Google Maps URL helpers (no API key needed). Pages should read from it rather than hardcoding details.
- The site is currently a single page (`src/app/page.tsx`) with anchor-linked sections (`#inicio`, `#historia`, `#cerimonia`) and a fixed header; sections use `scroll-mt-16` to clear the header.
- Theme: custom colors `background`/`foreground`/`accent` and fonts `font-sans` (Geist), `font-serif` (Playfair Display), `font-script` (Great Vibes), wired via CSS variables from `next/font` in `src/app/layout.tsx`.
