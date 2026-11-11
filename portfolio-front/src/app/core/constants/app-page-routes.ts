import { Route } from '@angular/router';
import { getNavTranslationKey } from '../../shared/utils/nav-translation-key';

export interface NavigationRoute {
  readonly path: string;
  readonly title: string;
}

export interface AppPageRoute extends NavigationRoute {
  readonly loadComponent: Route['loadComponent'];
}

export const APP_PAGE_PATHS = {
  ABOUT: '',
  PROFESSIONAL_EXPERIENCE: 'professional-experience',
  EDUCATION: 'education',
  CONTACT: 'keep-in-touch',
} as const;

export const APP_PAGE_ROUTES: readonly AppPageRoute[] = [
  {
    path: APP_PAGE_PATHS.ABOUT,
    loadComponent: () => import('../../about/about').then((m) => m.About),
    title: getNavTranslationKey(APP_PAGE_PATHS.ABOUT),
  },
  {
    path: APP_PAGE_PATHS.PROFESSIONAL_EXPERIENCE,
    loadComponent: () =>
      import('../../professional-experience/professional-experience').then(
        (m) => m.ProfessionalExperience,
      ),
    title: getNavTranslationKey(APP_PAGE_PATHS.PROFESSIONAL_EXPERIENCE),
  },
  {
    path: APP_PAGE_PATHS.EDUCATION,
    loadComponent: () => import('../../education/education').then((m) => m.Education),
    title: getNavTranslationKey(APP_PAGE_PATHS.EDUCATION),
  },
  {
    path: APP_PAGE_PATHS.CONTACT,
    loadComponent: () => import('../../contact/contact').then((m) => m.Contact),
    title: getNavTranslationKey(APP_PAGE_PATHS.CONTACT),
  },
];

export const NAVIGATION_ROUTES: readonly NavigationRoute[] = APP_PAGE_ROUTES.map(
  ({ path, title }) => ({ path, title }),
);
