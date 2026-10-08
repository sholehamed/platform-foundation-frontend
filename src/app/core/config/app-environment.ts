import { InjectionToken } from '@angular/core';

export interface AppEnvironment {
  readonly production: boolean;
  /** Empty = same origin, recommended with a reverse proxy. */
  readonly apiBaseUrl: string;
}

export const APP_ENVIRONMENT = new InjectionToken<AppEnvironment>('APP_ENVIRONMENT');
export const environment: AppEnvironment = { production: false, apiBaseUrl: '' };
