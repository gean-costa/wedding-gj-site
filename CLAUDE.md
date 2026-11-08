# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Wedding website for Gean Costa & Juliana Silva (13 Nov 2027, Belém - PA). Must work well on both desktop and mobile. Built incrementally, one section at a time. The owner is a beginner in web development and communicates in Portuguese (pt-BR): reply in Portuguese and explain new commands/concepts step by step. All site copy is in pt-BR.

Planned v1 sections: home (names, date, countdown), Nossa história, Cerimônia e Recepção (done), Confirmação de presença (RSVP, needs a backend/database), Lista de presentes. Hosting target: Vercel; code lives in a public GitHub repo, so never commit secrets (use `.env.local`, which is gitignored).

## Commands

```bash
npm run dev     # dev server at http://localhost:3000
npm run lint    # ESLint (flat config, eslint.config.mjs)
npm run build   # production build; also runs TypeScript checks
```

There is no test suite yet.

Source files are UTF-8 without BOM and full of pt-BR accents: never rewrite them with Windows PowerShell 5.1 `Get-Content`/`Set-Content` (it reads them as ANSI and corrupts accents); use the editor tools.

On this Windows machine Node/Git were installed via winget; if `node`/`git` aren't found in a shell that predates the install, refresh PATH first:
`$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')`

## Architecture

- Next.js 16 App Router with `src/` dir, TypeScript, Tailwind CSS v4 (CSS-first config: theme tokens live in `@theme` in `src/app/globals.css`, no `tailwind.config`). Path alias `@/*` → `src/*`.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`. Under Cache Components, reading the current time/random values during server render is an error: anything time-dependent (e.g. `src/components/Countdown.tsx`) reads `Date.now()` only inside `useEffect` in a Client Component, or must use `connection()` + `<Suspense>` / `'use cache'`. Check `node_modules/next/dist/docs/` before using unfamiliar APIs.
- `src/lib/wedding.ts` is the single source of truth for couple names, date (stored with explicit `-03:00` offset; Belém has no DST), and venue data, plus Google Maps URL helpers (no API key needed). Pages should read from it rather than hardcoding details.
- The site is currently a single page (`src/app/page.tsx`) with anchor-linked sections (`#inicio`, `#historia`, `#cerimonia`) and a fixed header; sections use `scroll-mt-16` to clear the header.
- Theme: wedding palette tokens `ink` #575C60, `primary` #667588, `secondary` #98AEC3 (low contrast on light bg: decoration only, not small text), `stone` #898788, `mist` #D9D9D9, `paper` #F6F7F9, plus aliases `background`/`foreground`/`accent`, all in `@theme` in `globals.css`. Fonts `font-sans` (Geist), `font-serif` (Playfair Display, placeholder pending choice), `font-script` (Italianno, for the couple's names), wired via CSS variables from `next/font` in `src/app/layout.tsx`. Names are always shown bride first ("Juliana & Gean") and must fit on one line (hero uses `whitespace-nowrap` + `clamp()` font size).
- Visual identity is Portuguese azulejos (Belém's Cidade Velha). Tile designs are inline SVG on a 100x100 grid in `src/components/AzulejoDesigns.tsx`, each drawn so motifs continue into the neighboring tile when repeated. Designs have no grout; `withJoint(Tile)` adds the grout joint + glaze edge (`TileJoint`). The site uses `TileFlorComRejunte` (Flor simples with grout; petals in #BFDDF3); `TileArabesco`, `TileInstituto`, `TileOctogono` are kept on purpose for future use. `/estilos/azulejo-novo` shows every design with and without grout. `src/components/Azulejo.tsx` wraps them as `AzulejoBackground` (SVG `<pattern>`; `id` must be unique per page), `AzulejoBand`, `AzulejoIcon`, `AzulejoFrame`, all defaulting to Arabescos with an optional `Tile` prop.
- `src/app/estilos/**` are temporary comparison pages used to make design decisions with the couple (styles, azulejo usage, fonts, tile catalog). Not linked from the site; remove before publishing.
- Visual checks without a browser: headless Edge screenshots (`msedge --headless=new --screenshot=... --window-size=W,H URL`). Headless can't render below ~500px wide, so for mobile widths screenshot a local HTML file containing `<iframe>`s of 375px/320px pointing at localhost.
