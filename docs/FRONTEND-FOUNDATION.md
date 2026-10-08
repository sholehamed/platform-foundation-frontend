# Frontend Foundation · F01

## Decisions
- Angular 22 latest stable series (pinned compatible patch release), strict TS 6, Material 3, CSS variables / SCSS.
- Standalone + Zoneless (no zone.js) and lazy route imports.
- Feature-Based modular structure instead of a large NgModule or premature Nx monorepo.
- Angular Material as the **only component foundation**. No imported commercial template or second UI toolkit.
- Backend/UI separation: this repo owns all layouts and monitoring dashboard presentation; the .NET backend exposes only authorized JSON APIs.
- RTL Persian from bootstrap; English LTR toggle; font loading stays local, no third-party CDN mandatory.
- Signal-based Theme/Locale preferences are safe to store in localStorage; **tokens are not**.
- Contracts for auth and permissions exist, but real OIDC integration is a follow-up, never impersonated by demo authentication.
- HTTP interceptors add correlation ID and Bearer only for the trusted `/api/` origin. Protect cross-origin calls.
- JSON contracts should eventually be generated from the versioned backend OpenAPI contract to prevent drift; current Observability v1 types are intentionally isolated in one feature.
- Default page is a functional shell even when backend is offline. Monitoring requires a real token and live history API.

## Access and security
`AUTH_SESSION` is an injection token for an adapter. Default implementation is deny-all. Route guards improve UX, but all sensitive APIs **must enforce server-side authorization**. HTTP error messages are sanitized and never display raw backend exception messages.

## QA
- Unit tests: guards, interceptors, API URL/params, error mapping.
- E2E smoke: UI render/RTL, locale/theme switching, mobile navigation, fail-closed protected routes.
- CI: typecheck, ESLint, Vitest, production AOT build, Playwright.
- Do not merge failing CI or secrets.

## Future slices (separate PRs)
1. F02 Identity/OpenIddict OIDC with Authorization Code + PKCE where supported, permission-aware navigation and token refresh policy.
2. F03 Monitoring module: Overview, Requests, Logs, Exceptions, Traces, Slow Operations, Messaging.
3. F04 Shared application components: real tables, paging/filter chips, forms, empty/loading/error states.
4. F05 CI deploy, observability of frontend performance and error telemetry.
5. i18n Persian/calendar UX refinement, offline/SSR decisions only if concrete user needs emerge.

> Technical note: The initial dependency lockfile should be generated using pnpm 10 and committed before enabling frozen installs. Do not commit a fabricated lockfile.
