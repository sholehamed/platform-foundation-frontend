import { Routes } from '@angular/router';
import { AppShell } from './layout/shell/app-shell';
import { authGuard, permissionGuard } from './core/auth/access.guards';

export const routes: Routes = [
  {
    path: '',
    component: AppShell,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview' },
      {
        path: 'overview',
        title: 'نمای کلی | Platform Foundation',
        loadComponent: () => import('./features/overview/overview.page').then((m) => m.OverviewPage),
      },
      {
        path: 'monitoring',
        canMatch: [authGuard, permissionGuard('platform.observability.read')],
        loadChildren: () => import('./features/monitoring/monitoring.routes').then((m) => m.MONITORING_ROUTES),
      },
      {
        path: 'settings',
        title: 'تنظیمات | Platform Foundation',
        loadComponent: () => import('./features/settings/settings.page').then((m) => m.SettingsPage),
      },
    ],
  },
  {
    path: 'auth/sign-in',
    title: 'ورود | Platform Foundation',
    loadComponent: () => import('./features/auth/sign-in.page').then((m) => m.SignInPage),
  },
  {
    path: 'forbidden',
    title: 'دسترسی غیرمجاز',
    loadComponent: () => import('./shared/ui/status-page').then((m) => m.ForbiddenPage),
  },
  {
    path: '**',
    title: 'صفحه پیدا نشد',
    loadComponent: () => import('./shared/ui/status-page').then((m) => m.NotFoundPage),
  },
];
