import { InjectionToken, Injectable, signal, type Signal } from '@angular/core';

export interface AuthSession {
  readonly authenticated: Signal<boolean>;
  hasPermission(permission: string): boolean;
  /** Access tokens must come from the real OIDC adapter, not localStorage. */
  accessToken(): string | null;
}

export const AUTH_SESSION = new InjectionToken<AuthSession>('AUTH_SESSION');

/** Deliberately denies access until the real backend identity flow is connected. */
@Injectable()
export class AnonymousAuthSession implements AuthSession {
  readonly authenticated = signal(false).asReadonly();

  hasPermission(_permission: string): boolean { return false; }
  accessToken(): string | null { return null; }
}
