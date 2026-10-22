import { Route } from '@angular/router';
import { getNavTranslationKey } from '../../shared/utils/nav-translation-key';

export interface NavigationRoute {
  readonly path: string;
  readonly title: string;
}

export interface AppPageRoute extends NavigationRoute {
  readonly loadComponent: Route['loadComponent'];
}

export const APP_PAGE_ROUTES: readonly AppPageRoute[] = [
  {
    path: '',
    loadComponent: () => import('../../about/about').then((m) => m.About),
    title: getNavTranslationKey(''),
  },
  {
    path: 'professional-experience',
    loadComponent: () =>
      import('../../professional-experience/professional-experience').then(
        (m) => m.ProfessionalExperience,
      ),
    title: getNavTranslationKey('professional-experience'),
  },
  {
    path: 'education',
    loadComponent: () => import('../../education/education').then((m) => m.Education),
    title: getNavTranslationKey('education'),
  },
  {
    path: 'keep-in-touch',
    loadComponent: () => import('../../contact/contact').then((m) => m.Contact),
    title: getNavTranslationKey('keep-in-touch'),
  },
];

export const NAVIGATION_ROUTES: readonly NavigationRoute[] = APP_PAGE_ROUTES.map(
  ({ path, title }) => ({ path, title }),
);