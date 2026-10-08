import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { apiContextInterceptor } from './core/http/api-context.interceptor';
import { AUTH_SESSION, AnonymousAuthSession } from './core/auth/auth-session';
import { APP_ENVIRONMENT, environment } from './core/config/app-environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([apiContextInterceptor])),
    { provide: APP_ENVIRONMENT, useValue: environment },
    { provide: AUTH_SESSION, useClass: AnonymousAuthSession },
  ],
};
