# Agent Instructions

Shared instructions for every coding agent working in this repository
(GitHub Copilot, Claude Code, Codex, Cursor, ...). `CLAUDE.md` imports this
file, so keep all project guidance here instead of duplicating it.

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
npm run format                         # format src with Prettier
npm run format:check                   # report files that aren't formatted
```

Tests use Angular's `ng test` builder with Vitest and jsdom. Its `--include`
option accepts a spec file or directory relative to `portfolio-front/`. There
is no lint script or ESLint configuration in this repository. Prettier is
configured in `.prettierrc` (with `.editorconfig`); run `npm run format`
before committing so every file keeps the same formatting.

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
  components live in `shared/`; `ResponsiveService` turns the breakpoint
  constants in `core/constants/breakpoints.ts` into signals.
- No CSS framework is used. Global styling in `src/styles.scss` loads the
  design tokens (`styles/_tokens.scss`, CSS custom properties), the base
  element styles (`styles/_base.scss`, a minimal reset that replaced
  Bootstrap's Reboot) and the shared building blocks
  (`styles/_components.scss`). Component-specific SCSS stays beside each
  component. Don't add Bootstrap or another CSS framework back.

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
  `ProfessionalExperience.entries`, `DropdownMenu.toggleMenu`/`closeMenu`).
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
  Format dates for the active language with `LANGUAGE_LOCALE` and the helpers
  in `shared/utils/date-range.ts` (UTC-based, so 'YYYY-MM-DD' dates never
  shift to the previous month); never hardcode a locale such as `'en-US'`.
- Avoid repeating magic string/number literals. Extract them to a named
  `const` (module-level for a single file, `core/constants/*.ts` — following
  `breakpoints.ts` — when shared across files) and reuse that same constant
  everywhere the value carries the same meaning, instead of redeclaring
  separate constants with identical values (see `COMPANY.UNICEN` in
  `user-information-service.ts` and the specs, and `APP_PAGE_PATHS` in
  `core/constants/app-page-routes.ts`, used for every link to a page).
- Child page routes set their static `title` to a `NAV.*` translation key via
  `getNavTranslationKey(path)` (`shared/utils/nav-translation-key.ts`) instead
  of literal text. Route metadata is centralized in
  `core/constants/app-page-routes.ts`: `APP_PAGE_ROUTES` is the source of truth
  for router configuration and `NAVIGATION_ROUTES` is reused by navigation UI.
  `DropdownMenu` must consume `NAVIGATION_ROUTES` instead of introspecting
  `router.config` (it renders the desktop links, or on mobile its own toggle
  button and panel driven by the `isMenuOpen` signal — not Bootstrap's
  dropdown JS), `Navbar` shows the brand (logo + name, linking home) on every
  breakpoint, and `TranslatedTitleStrategy`
  (`shared/services/translated-title-strategy.ts`, provided as `TitleStrategy`
  in `app.config.ts`) resolves the key to set the document `<title>` as
  `Carolina Díaz | <translated section>`, re-applying on language change.
  Reuse `getNavTranslationKey` rather than re-deriving the key when adding a
  page route.
- Reuse `ResponsiveService` and `BREAKPOINTS` for responsive
  behavior so TypeScript and CSS breakpoints remain aligned. In component
  SCSS, media queries use the variables in `src/styles/_breakpoints.scss`
  (`@use '<relative path>/styles/breakpoints' as bp;`), which mirror
  `breakpoints.ts`. Never `@use` `_tokens.scss` from a component: it emits
  the `:root` custom properties and would duplicate them.
- Icons are rendered with the shared `Icon` component
  (`<app-icon name="..." [size]="...">`, `shared/icon/`): stroke SVGs that
  inherit `currentColor` and are `aria-hidden`, so the surrounding button or
  link carries the accessible label. Add new icons to its `ICON_PATHS` map
  instead of inlining `<svg>` in templates or adding icon image assets.
- Reuse the site palette, base styles, and global styles from
  `src/styles.scss` before adding component-specific styles. Building blocks
  shared by several pages live in `src/styles/_components.scss`: `.eyebrow`,
  `.page-title`, `.button` + `.button-primary`/`.button-outline`, and
  `.tag-list` + `.tag`/`.tag-outline` for technology chips. Add a class there
  when a second page needs it instead of copying it into another component.
  Button labels never wrap (`white-space: nowrap`): put buttons in a
  `flex-wrap: wrap` row with `flex: 1 1 auto` so they sit side by side while
  both labels fit and stack full-width otherwise.
- Follow `.editorconfig` and Prettier: 2-space indentation, single-quoted
  TypeScript strings, UTF-8, final newlines, and a 100-character print width.
- Don't write comments in code (TypeScript, specs, HTML templates, SCSS, or
  config files such as `tsconfig*.json`). Make the code explain itself with
  descriptive names and named constants, and record the reasons behind
  non-obvious decisions in the "Recent decisions" section of this file
  instead.
- Use semantic HTML elements for structure, and keep `div`/`span` only for
  purely visual wrappers:
  - The `App` shell owns the page landmarks: `<header>` (navbar), a single
    `<main>` (routed page) and the footer. Don't add another `<main>` inside
    pages.
  - Navigation menus go in `<nav>` with an `aria-label` when there is more
    than one.
  - Each page or thematic block with its own heading is a `<section>`;
    self-contained items (experience cards, certifications) are `<article>`,
    with an inner `<header>`/`<footer>` when they have a title area or a
    closing area.
  - Lists of items use `<ul>`/`<ol>` with `<li>`; term/value pairs use
    `<dl>`; images that carry content use `<figure>`.
  - Headings follow the hierarchy (one `<h1>` per page, then `<h2>`, `<h3>`)
    without skipping levels.
  - Use `<button>` for actions and `<a>` for navigation, never click handlers
    on `div`/`span`.
  - Style through classes, not element selectors, so changing a tag never
    changes the look.
- `src/test-setup.ts` (registered in `angular.json` > `test` > `setupFiles`)
  clears `localStorage` before every test, so a test that switches the
  language with `LanguageService` doesn't leak it into the next one.
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
  path and `getNavTranslationKey`. (Superseded on 2026-11-10: the mobile
  section title was removed.)
- 2026-11-10: Design tokens live in `src/styles/_tokens.scss` (CSS custom
  properties built from an SCSS palette); components use the custom
  properties instead of hardcoded values.
- 2026-11-10: The `App` shell is a three-row grid (`header` / scrollable
  `main.page-container` / footer) at `100dvh`: header and footer stay fixed
  and span the full width, page content is centered at
  `--container-max-width`. Because `main` is the scroll container, `App`
  resets its `scrollTop` on every `NavigationEnd`.
- 2026-11-10: Redesigned header: dark full-width bar with the brand, links
  marked with `ariaCurrentWhenActive="page"` and a pill language selector
  (`aria-pressed`). The mobile section title was removed; the mobile menu is
  a custom panel that closes on link click, Escape and `NavigationEnd`.
  Popper.js was dropped from `index.html` since no Bootstrap dropdown remains
  (the Bootstrap JS bundle was later removed too).
- 2026-11-10: Version 1 of the site is frozen on the `release/v1` branch and
  deployed as its own Vercel project; its URL and screenshots live in
  `core/constants/legacy-site.ts` (`LEGACY_SITE`) and
  `src/assets/legacy/`. The footer's `LegacyPreview` button opens a card
  with the screenshot linking to it (closes on Escape, outside click or the
  close button). Social links are the shared `SocialLinks` component, fed by
  `UserInformationService.getProfessionalNetworks()`.
- 2026-11-10: The favicon (`public/favicon.ico`, `apple-touch-icon.png`)
  reproduces the navbar brand mark: white Space Grotesk "C" at 72% of the
  red square's height. Keep both in sync, and bump the `?v=` query in
  `index.html` when the icon changes.
- 2026-11-10: Professional Experience is a vertical timeline (`ExperienceItem`)
  instead of `CardInformation` cards; dates are formatted per language and
  roles with several periods (`dates`) list each term. The "Download CV"
  button downloads the CV of the active language (`public/cv/<lang>/`,
  configured in `core/constants/curriculum.ts`), always saved as
  `Resume-CarolinaDiaz.pdf`. The published CVs must not include the phone
  number.
- 2026-11-10: Education shows the degree, certifications, technical skills
  grouped by category and languages without the Bootstrap accordion.
  Categories come from `SKILL_CATEGORIES` (`core/constants/skill-categories.ts`)
  via `UserInformationService.getTechnicalSkillGroups()`; classify every new
  technology there (a spec fails if one falls into OTHER). Date ranges are
  formatted through the `DateRangeFormatter` service. With no Bootstrap
  JavaScript component left, the Bootstrap JS bundle was removed from
  `index.html`; only its Sass is used.
- 2026-11-10: Contact reuses `SocialLinks` with `variant="cards"` (large
  cards with the address; email highlighted) next to the original contact
  texts. `CenterContent` and the `me-*.svg` illustrations were removed; a
  page that should be vertically centered grows with `flex: 1` inside
  `.page-content` (see `contact.scss`). Desktop nav links draw their red
  underline with a `::after` that scales from left to right on hover/focus
  and stays on the active page.
- 2026-11-10: Templates use semantic HTML elements (`header`, `main`,
  `section`, `article`, `nav`, lists) instead of generic `div`s.
- 2026-11-10: Accessibility baseline (axe-core reports 0 WCAG 2.2 AA /
  best-practice violations on every page, desktop and mobile, menu and v1
  preview open). Keep it that way:
  - `<main>` is the scroll container, so it has `tabindex="0"` (keyboard
    scrolling); a "Skip to content" button (`NAV.SKIP_TO_CONTENT`) focuses
    it, and `App` moves focus to it after every in-app navigation.
  - `LanguageService.setLanguage` updates `<html lang>` so screen readers use
    the right pronunciation.
  - A global `prefers-reduced-motion` rule in `styles.scss` neutralizes all
    transitions and animations.
  - Interactive targets are at least `--touch-target` (44px) and every
    icon-only control has an `aria-label`.
- 2026-11-11: On mobile widths (`$mobile-max`) and on short viewports
  (`max-height` below `$short-screen-max-height`, 700px, in
  `_breakpoints.scss`) only the header stays fixed (`position: sticky`): the
  whole document scrolls and the footer comes after the content, because the
  mobile footer (~160px) would take too much of the screen. Desktop screens
  of normal height keep the fixed header + footer with `<main>` scrolling.
  `App` resets both scroll positions on navigation, and `LegacyPreview` sizes
  its mobile screenshot with the viewport height so the card fits between
  the header and the footer. In that mode the shell is a flex column at
  `min-height: 100dvh` with `main` and `.page-content` growing (`flex: 1`), so
  the footer stays at the bottom of the screen on short pages (Contact) and
  pages that center their content still can.
- 2026-11-11: Removed Bootstrap. An audit showed no Bootstrap class,
  component, JS or `--bs-*` variable was used anymore (`active` only matters
  combined with Bootstrap components); only its Reboot base styles were in
  effect, now reproduced in `styles/_base.scss`. `BOOTSTRAP_BREAKPOINTS` was
  renamed to `BREAKPOINTS`. The initial styles bundle dropped from ~228 kB.
- 2026-11-11: Removed every code comment and unused code (`ResponsiveService`
  now only exposes `isMobile`, unused tokens and translation keys were
  dropped). Reasons that used to live in comments:
  - `$mobile-max` in `_breakpoints.scss` must match `BREAKPOINTS.isMobile`.
  - `<main>` has `tabindex="0"` because it is a scroll container.
  - The `?v=` query on the favicon links busts caches of an older favicon
    served from the same origin.
  - In the palette, `$punch-red` is only for decorative or large text (it
    fails 4.5:1 on platinum); text, links and buttons use `$flag-red`.
  - The mobile v1 screenshot height `clamp(120px, 100dvh - 360px, 340px)`
    leaves room for the sticky header (80px), the footer (~160px) and the
    card's own header and padding.
  - `LegacyPreview` and `DropdownMenu` absolutely position their panels
    against `.footer` and `.app-header`, which is why those are positioned
    with a `z-index` above the page.
