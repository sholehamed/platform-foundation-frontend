import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AUTH_SESSION } from './auth-session';

export const authGuard: CanMatchFn = () => {
  const session = inject(AUTH_SESSION);
  const router = inject(Router);
  return session.authenticated() ? true : router.createUrlTree(['/auth/sign-in']);
};

export function permissionGuard(permission: string): CanMatchFn {
  return () => {
    const session = inject(AUTH_SESSION);
    const router = inject(Router);
    if (!session.authenticated()) return router.createUrlTree(['/auth/sign-in']);
    return session.hasPermission(permission) ? true : router.createUrlTree(['/forbidden']);
  };
}
