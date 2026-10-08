# Platform Foundation — Frontend

Standalone Angular 22 frontend for [Platform Foundation Backend](https://github.com/sholehamed/platform-foundation-backend). This is a reusable application foundation, **not** a backend-embedded monitoring dashboard.

## Stack

- Angular **22.2.2**, Angular Material / CDK **22.2.2**, Material 3 and SCSS
- Standalone routes/components, Zoneless by default, Signals for application state
- Node.js **24.15+**, pnpm **10.18.3**, TypeScript **6.0.x**
- Angular ESLint, Prettier, Vitest and Playwright
- RTL (Persian), optional English LTR, light/dark/system preferences
- Typed Observability HTTP adapter for backend v1 JSON API

## Run locally

```bash
git clone https://github.com/sholehamed/platform-foundation-frontend.git
cd platform-foundation-frontend
corepack enable
corepack prepare pnpm@10.18.3 --activate
pnpm install
pnpm start
```

Open http://localhost:4200. By default the Angular dev proxy forwards `/api` to `http://localhost:5000`. Edit `proxy.conf.json` to match the actual local Backend URL. No backend is required to view the public Overview/Settings shell.

**Production:** configure your reverse proxy to serve `/api` on the same origin, or override `APP_ENVIRONMENT` with an approved API base URL and explicit CORS configuration. Never put secrets in `src/`.

## Commands

| Command | Action |
| --- | --- |
| `pnpm start` | Local development |
| `pnpm build` | Production AOT build |
| `pnpm typecheck` | TypeScript check |
| `pnpm lint` | Angular ESLint |
| `pnpm test` | Vitest |
| `pnpm e2e` | Playwright (Chromium) |

To run E2E locally: `pnpm exec playwright install chromium` before `pnpm e2e`.

## Application structure

```text
src/app/
├── core/
│   ├── auth/              # session contract and fail-closed guards
│   ├── config/            # public runtime API configuration
│   ├── http/              # safe API context + error mapping
│   └── preferences/       # language, direction and theme signals
├── layout/shell/          # responsive Material shell
├── features/
│   ├── overview/          # non-sensitive preview/home
│   ├── settings/          # theme and locale controls
│   ├── auth/              # safe OIDC integration placeholder
│   └── monitoring/        # protected route + typed v1 monitoring API
└── shared/ui/             # generic status screens
```

## Authentication is intentionally not mocked in production

`AnonymousAuthSession` denies access to protected routes. No fake login button, insecure localStorage token or fabricated permission exists. The next milestone is replacing `AUTH_SESSION` with an OpenIddict/OIDC adapter and wiring the backend's `permission=platform.observability.read` claim. Server authorization remains authoritative regardless of Angular guards.

## Observability contract

The typed client in `src/app/features/monitoring/data-access` is based on:

- [Backend Observability History API](https://github.com/sholehamed/platform-foundation-backend/blob/main/docs/guides/OBSERVABILITY-HISTORY-API.md)
- [Domain Event lifecycle](https://github.com/sholehamed/platform-foundation-backend/blob/main/docs/guides/DOMAIN-EVENTS.md)

History endpoints are **off by default** and require authorized backend identity, `Observability:Persistence:Enabled`, and `Observability:EnableFrontendReadApi`. The monitoring route is inaccessible until a real auth adapter is connected. The backend stores metadata-only logs, not raw log text or stack traces.

## Conventions

Use lazy feature routes and Standalone components. Start with Signals for UI state; use RxJS for async I/O/cancellation. Keep feature-specific data access with its feature. Avoid global stores or a second UI framework until demonstrated necessary. Dates in APIs remain Gregorian ISO 8601, localized only for display.

Project decisions: [docs/FRONTEND-FOUNDATION.md](docs/FRONTEND-FOUNDATION.md).
