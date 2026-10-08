import { Routes } from '@angular/router';

export const MONITORING_ROUTES: Routes = [
  {
    path: '',
    title: 'پایش سیستم | Platform Foundation',
    loadComponent: () => import('./monitoring.page').then((m) => m.MonitoringPage),
  },
];
