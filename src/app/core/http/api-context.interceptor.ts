import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { APP_ENVIRONMENT } from '../config/app-environment';
import { AUTH_SESSION } from '../auth/auth-session';

function isTrustedApiRequest(url: string, apiBaseUrl: string): boolean {
  if (url.startsWith('/api/')) return true;
  if (!apiBaseUrl) return false;
  const prefix = apiBaseUrl.replace(/\/$/, '');
  return url.startsWith(prefix + '/api/');
}

export const apiContextInterceptor: HttpInterceptorFn = (request, next) => {
  const config = inject(APP_ENVIRONMENT);
  if (!isTrustedApiRequest(request.url, config.apiBaseUrl)) return next(request);

  const token = inject(AUTH_SESSION).accessToken();
  const correlationId = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : 'pf-' + Date.now().toString(36);

  const headers: Record<string, string> = { 'X-Correlation-ID': correlationId };
  if (token) headers['Authorization'] = 'Bearer ' + token;
  return next(request.clone({ setHeaders: headers }));
};
