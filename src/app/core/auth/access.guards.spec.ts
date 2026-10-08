import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { signal } from '@angular/core';
import { describe, beforeEach, it, expect } from 'vitest';
import { AUTH_SESSION, AuthSession } from './auth-session';
import { authGuard, permissionGuard } from './access.guards';

describe('route guards', () => {
  const authenticated = signal(false);
  let allowPermission = false;
  const session: AuthSession = {
    authenticated: authenticated.asReadonly(),
    hasPermission: () => allowPermission,
    accessToken: () => null,
  };
  beforeEach(() => {
    authenticated.set(false);
    allowPermission = false;
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AUTH_SESSION, useValue: session }],
    });
  });

  it('redirects anonymous callers to sign-in', () => {
    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as never, [], {} as never));
    expect(result).toEqual(TestBed.inject(Router).createUrlTree(['/auth/sign-in']));
  });

  it('forbids an authenticated user without permission', () => {
    authenticated.set(true);
    const result = TestBed.runInInjectionContext(() =>
      permissionGuard('platform.observability.read')({} as never, [], {} as never));
    expect(result).toEqual(TestBed.inject(Router).createUrlTree(['/forbidden']));
  });

  it('allows an authenticated user with permission', () => {
    authenticated.set(true);
    allowPermission = true;
    const result = TestBed.runInInjectionContext(() =>
      permissionGuard('platform.observability.read')({} as never, [], {} as never));
    expect(result).toBe(true);
  });
});
