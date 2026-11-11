# Portfolio Carolina Diaz

Hi there! I'm Carolina and this is my personal portfolio built with Angular 22, tested with Vitest and deployed with Vercel.

This portfolio shows my professional background, including my experience, education, and certifications, as well as my technical skills demonstration.

Please, feel free to reach out to me through my social networks:

- **LinkedIn:** [linkedin.com/in/mariacarolinadiaz](https://www.linkedin.com/in/mariacarolinadiaz/)
- **E-mail:** [diazmariacarolina6@gmail.com](mailto:diazmariacarolina6@gmail.com)

- **Live site:** [portfolio-carolinadiaz.vercel.app](https://portfolio-carolinadiaz.vercel.app/)
- **Previous version (v1):** [portfolio-carolinadiaz-v1.vercel.app](https://portfolio-carolinadiaz-v1.vercel.app/)

## Pages

1. **About me** — Introduction, location, work authorization, languages and bio.
2. **Professional Experience** — Timeline of every role with its period and technologies, plus a button to download the CV (English or Spanish, following the site language).
3. **Education** — Degree and thesis, certifications, technical skills grouped by area, and languages.
4. **Keep in Touch** — LinkedIn, GitHub and e-mail.

The whole site is available in **English and Spanish**, works on desktop and mobile, and the footer links to a preview of the previous version.

## Tech stack

- **Angular 22**: standalone components, signals, zoneless change detection, and server-side rendering with every route prerendered.
- **TypeScript** and **SCSS**, with design tokens as CSS custom properties. No CSS framework.
- **ngx-translate** for the English and Spanish texts (`src/assets/i18n/`).
- **Vitest** with jsdom for unit tests.
- **Prettier** for formatting.
- **Vercel** for hosting.

Accessibility is checked with axe-core (WCAG 2.2 AA): every page passes with no violations on desktop and mobile.

## Project structure

```text
portfolio-mcdiazcastro/
├── AGENTS.md                 # conventions for coding agents (CLAUDE.md imports it)
└── portfolio-front/          # Angular workspace
    ├── public/               # favicon, share image and CVs (cv/en, cv/es)
    └── src/
        ├── app/
        │   ├── about/  professional-experience/  education/  contact/   # pages
        │   ├── navbar/  footer/                                          # app shell
        │   ├── core/constants/   # routes, breakpoints, site URL, CV, skill categories
        │   └── shared/           # reusable components, services, models, pipes, utils
        ├── assets/               # translations and v1 screenshots
        └── styles/               # design tokens, base styles, shared building blocks
```

## Requirements

- Node.js 24 or higher
- npm 11 or higher

The Angular CLI doesn't need to be installed globally: the npm scripts use the version in the project.

## Getting started

```bash
git clone git@github.com:mcarolinadiaz/portfolio-mcdiazcastro.git
cd portfolio-mcdiazcastro/portfolio-front
npm install
npm start
```

Then open [http://localhost:4200](http://localhost:4200). To use another port: `npm start -- --port 4300`.

## Scripts

Run them from `portfolio-front/`:

| Command | Description |
| --- | --- |
| `npm start` | Development server with live reload |
| `npm run build` | Production build, including the prerendered pages |
| `npm test -- --watch=false` | Run all unit tests once |
| `npm test -- --include src/app/about/about.spec.ts --watch=false` | Run a single test file |
| `npm run format` | Format the source files with Prettier |
| `npm run format:check` | Check that every source file is formatted |

## Deployment

The site is deployed with Vercel from two branches:

| Branch | Site |
| --- | --- |
| `main` | [portfolio-carolinadiaz.vercel.app](https://portfolio-carolinadiaz.vercel.app/) |
| `release/v1` | [portfolio-carolinadiaz-v1.vercel.app](https://portfolio-carolinadiaz-v1.vercel.app/) (frozen previous version) |

Both projects use `portfolio-front` as root directory and `dist/portfolio-front/browser` as output directory.

## Contributing

Project conventions (code style, structure, accessibility and design decisions) are documented in [AGENTS.md](AGENTS.md). Please read it before making changes.
