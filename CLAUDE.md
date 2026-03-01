# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev        # Start development server at localhost:3000
bun build      # Production build
bun start      # Start production server
bun lint       # Run ESLint (note: ESLint is ignored during builds via next.config.js)
```

This project uses `bun` as the package manager (lockfile is `bun.lockb`).

## Architecture

This is a Next.js 15 personal portfolio site deployed on Vercel with a bento-grid homepage layout.

### Path Aliases

- `@/*` maps to the project root
- `@config/*` maps to `config/`

### Homepage Grid System

The homepage (`app/page.tsx`) renders a responsive bento grid using `react-grid-layout`. The architecture has three distinct layers:

1. **Grid items** (`config/grid-items.ts`) — maps string keys (`i`) to React components
2. **Layouts** (`config/layouts.ts`) — defines `lgLayout`, `mdLayout`, `smLayout` with x/y/w/h positions for each grid key
3. **Grid components** (`components/grid/`) — individual widget components (Spotify, Location, CV, etc.) exported from `components/grid/index.ts`

To add a new grid widget: create a component in `components/grid/`, export it from `index.ts`, add an entry to `gridItems` in `config/grid-items.ts`, and add layout entries in all three layouts in `config/layouts.ts`.

The grid uses breakpoints `lg: 1199px`, `md: 799px`, `sm: 374px` with 4 columns on lg/md and 2 columns on sm/xs. Dragging is only enabled on `lg` and `md` breakpoints.

### Content (MDX)

Blog posts live in `content/posts/*.mdx` and projects in `content/projects/*.mdx`. Frontmatter is parsed with a custom regex parser in `lib/mdx.ts` (no external frontmatter library).

- **Posts** require: `title`, `description`, `date`
- **Projects** require: `title`, `description`, `links`, `technologies`; optionally `images`

Dynamic routes are at `app/(content)/posts/[slug]/` and `app/(content)/projects/[slug]/`.

### Spotify Integration

`/api/now-playing` fetches from the Spotify API using OAuth refresh tokens. Credentials are read from environment variables: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`. The Spotify widget polls every 5s when a track is playing, 30s otherwise. Remote images from `i.scdn.co` are allowlisted in `next.config.js`.

### Theming

Dark/light mode via `next-themes` with Tailwind CSS v4. The `ThemeProvider` wraps the app in `app/providers.tsx` with `enableSystem={false}`. Custom dark palette uses `dark-950` class.

### Fonts

Two custom fonts configured in `lib/fonts.ts`:
- `poppins` — body font (applied as `className`)
- `calistoga` — display font (applied as CSS variable `--font-calistoga`, used via `font-calistoga` Tailwind class)

### Code Style

Prettier is configured with 4-space tabs, single quotes, JSX single quotes, and `prettier-plugin-tailwindcss` for automatic class sorting. The `.prettierrc` settings apply to all TS/TSX files.
