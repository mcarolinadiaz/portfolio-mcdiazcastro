# Copilot Instructions

## Workspace and commands

The repository root is not the Angular workspace. Run frontend commands from
`portfolio-front/`, using the npm version pinned by `package.json`
(`npm@11.18.0`).

```bash
cd portfolio-front
npm start                              # Angular development server
npm run build                          # production build, including SSR output
npm test -- --watch=false              # all Vitest unit tests
npm test -- --include src/app/about/about.spec.ts --watch=false  # one test file
```

Tests use Angular's `ng test` builder with Vitest and jsdom. Its `--include`
option accepts a spec file or directory relative to `portfolio-front/`. There
is no lint script or ESLint configuration in this repository. Prettier is
configured in `.prettierrc` but has no npm script.

## Application architecture

- `src/main.ts` bootstraps the standalone `App` component with `appConfig`;
  client hydration is enabled in `app.config.ts`. The app is zoneless (no
  `zone.js` dependency, Angular's default since v21+); don't reintroduce
  `zone.js` or `provideZoneChangeDetection`.
- The application is also server-rendered. `main.server.ts` merges server
  providers, `server.ts` hosts the Angular SSR engine in Express, and
  `app.routes.server.ts` prerenders every route. Keep additions compatible
  with prerendering and avoid unguarded browser-only APIs.
- `App` is the persistent shell: it renders the navbar, the routed page, and
  the footer. The portfolio pages (`About`, `ProfessionalExperience`,
  `Education`, and `Contact`) are top-level routes in `app.routes.ts`,
  lazy-loaded with `loadComponent`.
- Portfolio data is centralized in
  `src/app/shared/services/user-information-service.ts`. Page components
  consume its user, experience, education, certification, language, and
  network data rather than duplicating that content. Shared presentation
  components live in `shared/`; `ResponsiveService` turns the Bootstrap
  breakpoint constants in `core/constants/breakpoints.ts` into signals.
- Global styling in `src/styles.scss` configures Bootstrap's Sass variables
  and exposes the palette as CSS custom properties. Component-specific SCSS
  stays beside each component.

## Repository conventions

- Components are standalone and use a TypeScript class with separate
  `*.html` and `*.scss` files. Add every template dependency to the
  component's `imports` array; there are no NgModules.
- Use Angular signals and signal-based `input()`/`model()`/`output()` APIs as
  the existing components do, and mark those fields `readonly`. Templates
  use built-in control flow (`@if`, `@for`) rather than structural directive
  syntax, and `[class.x]`/`[class]` bindings instead of `NgClass`/`NgStyle`.
- All components set `changeDetection: ChangeDetectionStrategy.OnPush`.
- Mark class members `protected` when they're only read from the component's
  own template, unless a `*.spec.ts` calls them directly without an `as any`
  cast — keep those public so tests stay type-safe (see
  `CardInformation.getEndDate`/`getDateToString`/`getListGroupItems`).
- Add or reuse Angular services when component functionality needs shared
  state, platform integration, or reusable behavior; keep page components
  focused on presenting and composing that functionality. Decorate plain
  root services with `@Service()` (the Angular 22 shorthand for
  `@Injectable({ providedIn: 'root' })`) when they only use `inject()`; fall
  back to `@Injectable` only for constructor injection or advanced provider
  config (`useClass`/`useValue`/`useExisting`, non-root scopes).
- Never hardcode the `'en'`/`'es'` language codes in components or templates.
  Use the `LANGUAGE` constant and `SupportedLanguage` type exported from
  `shared/services/language-service.ts` (e.g. `LANGUAGE.ENGLISH`,
  `LANGUAGE.SPANISH`) so every usage reads the language codes from one place.
- Avoid repeating magic string/number literals. Extract them to a named
  `const` (module-level for a single file, `core/constants/*.ts` — following
  `breakpoints.ts` — when shared across files) and reuse that same constant
  everywhere the value carries the same meaning, instead of redeclaring
  separate constants with identical values (see `COMPANY.UNICEN` in
  `card-information.ts`/`user-information-service.ts`, and the single `ZERO`
  constant reused in `card-information.ts`).
- Child page routes set their static `title` to a `NAV.*` translation key via
  `getNavTranslationKey(path)` (`shared/utils/nav-translation-key.ts`) instead
  of literal text. Route metadata is centralized in
  `core/constants/app-page-routes.ts`: `APP_PAGE_ROUTES` is the source of truth
  for router configuration and `NAVIGATION_ROUTES` is reused by navigation UI.
  `DropdownMenu` must consume `NAVIGATION_ROUTES` instead of introspecting
  `router.config`, `Navbar` derives its mobile section title from the deepest
  active route's `routeConfig.path` and renders the key with the `translate`
  pipe, and `TranslatedTitleStrategy`
  (`shared/services/translated-title-strategy.ts`, provided as `TitleStrategy`
  in `app.config.ts`) resolves the key to set the document `<title>` as
  `Carolina Díaz | <translated section>`, re-applying on language change.
  Reuse `getNavTranslationKey` rather than re-deriving the key when adding a
  page route.
- Reuse `ResponsiveService` and `BOOTSTRAP_BREAKPOINTS` for responsive
  behavior so TypeScript and CSS breakpoints remain aligned.
- Reuse the site palette, Bootstrap configuration, and global styles from
  `src/styles.scss` before adding component-specific styles.
- Follow `.editorconfig` and Prettier: 2-space indentation, single-quoted
  TypeScript strings, UTF-8, final newlines, and a 100-character print width.
- Component tests use Angular `TestBed` with the standalone component in
  `imports`, then await `fixture.whenStable()` before assertions.

## Recent decisions

- 2026-10-22: Flattened page routing by removing the thin `Home` wrapper route
  and keeping portfolio pages as top-level lazy routes. This reduced route
  indirection and simplified navigation behavior.
- 2026-10-22: Centralized route metadata in
  `src/app/core/constants/app-page-routes.ts`.
  `APP_PAGE_ROUTES` is the single source of truth for router setup, and
  `NAVIGATION_ROUTES` is the source for nav UI rendering.
- 2026-10-22: `DropdownMenu` now consumes `NAVIGATION_ROUTES` directly instead
  of reading `router.config`, to avoid coupling UI behavior to router tree
  shape.
- 2026-10-22: `Navbar` initializes mobile section title immediately and keeps
  it updated on navigation via `NavigationEnd`, using the deepest active route
  path and `getNavTranslationKey`.
