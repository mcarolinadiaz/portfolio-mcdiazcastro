import { Routes } from '@angular/router';
import { APP_PAGE_ROUTES } from './core/constants/app-page-routes';

export const routes: Routes = [
  ...APP_PAGE_ROUTES,
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
