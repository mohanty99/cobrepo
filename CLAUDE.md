# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Layout

```
cobprog/
└── block-builder/       # The React + Vite application (all source lives here)
    ├── src/
    │   ├── App.jsx          # Router root — defines all routes
    │   ├── App.css          # All component styles (single CSS file, BEM-like classes)
    │   ├── index.css        # CSS custom properties (design tokens on :root)
    │   ├── components/      # Shared shell components
    │   ├── pages/           # Route-level page components
    │   │   └── management/  # Management sub-pages
    │   │       └── journey/ # Fully-built pages (e.g. Builder.jsx)
    │   ├── data/            # Static config (themes, nav items)
    │   ├── hooks/           # Custom hooks (useTheme)
    │   └── icons/           # Inline SVG icon components
    └── package.json
```

## Commands

All commands run from `block-builder/`:

```bash
# Dev server (http://localhost:5173)
node node_modules/vite/bin/vite.js

# Production build
node node_modules/vite/bin/vite.js build

# Lint
node node_modules/.bin/eslint src
```

> **Windows note:** `npx` and `.ps1` scripts are blocked by PowerShell execution policy. Always invoke Vite and ESLint via `node node_modules/...` as shown above.

## Architecture

### Routing (`App.jsx`)
`BrowserRouter` with a single nested route tree under `<Layout />`. The route structure mirrors the URL:

- `/` → redirect to `/dashboards`
- `/dashboards`, `/tasks`, `/journeys`, `/reviews`, `/entities`, `/reports`, `/profile`, `/guide` → top-level page components
- `/management` → `ManagementHome` (shows the drawer)
- `/management/journey/builder` → `JourneyBuilder` (specific, declared before catch-all)
- `/management/:sectionId/:pageSlug` → `ManagementSubPage` (generic catch-all)

When adding a new fully-built management page, declare its specific route **before** the `:sectionId/:pageSlug` catch-all in `App.jsx`.

### Shell layout (`components/Layout.jsx`)
`Layout` renders the persistent chrome (TopBar + Sidebar + SubNavPanel) and an `<Outlet />` for page content. It derives two pieces of state from the URL:

- **Sub-nav drawer**: open only when `location.pathname === '/management'` exactly. Navigating to any `/management/*` sub-page closes it automatically (drawer pattern).
- **Theme**: persisted to `localStorage` under key `bb-theme` via `useTheme` hook.

### Navigation data (`data/navItems.js`)
Single source of truth for all navigation. Exports:
- `NAV_MAIN` / `NAV_BOTTOM` — sidebar items with `path`, `Icon`, and optional `hasSubNav`
- `SUBNAV_DATA.management` — the 11 management sections with their links and route paths

`Sidebar` reads active/open state entirely from `useLocation()` — no separate nav state.

### Theming (`data/themes.js`, `index.css`)
Four themes (Dark Slate, Dark Gray, Warm Dark, Light). Theme switching calls `document.documentElement.style.setProperty()` for each CSS variable — no re-render required. All colours in `App.css` use CSS custom properties (`--bg-deep`, `--bg-surface`, `--bg-border`, `--text-*`, `--accent`). Never use hardcoded hex values in component styles.

### Icons (`icons/`)
Two files of inline SVG components — no external icon library:
- `NavIcons.jsx` — sidebar and top-bar icons
- `SubNavIcons.jsx` — management section icons

All icons use a shared `Ico` wrapper (20×20, `stroke="currentColor"`).

### Pages
- Most management sub-pages use `ManagementSubPage` (generic, data-driven from `SUBNAV_DATA`).
- Fully-built pages (e.g. `journey/Builder.jsx`) are self-contained with their own data and `.jb-*` CSS classes in `App.css`.
- All placeholder pages use `PageTemplate` (`pages/PageTemplate.jsx`).

### CSS conventions
- All styles are in `src/App.css` (component styles) and `src/index.css` (tokens).
- BEM-like naming: `.component__element--modifier`.
- Page-specific classes are prefixed by feature (e.g. `.jb-*` for Journey Builder).
- Full-width page components must set `flex: 1; align-self: stretch` on their root element to escape the `display: flex; align-items: center; justify-content: center` on `.content`.
