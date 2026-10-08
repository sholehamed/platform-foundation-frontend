import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import { APP_ENVIRONMENT } from '../config/app-environment';
import { AUTH_SESSION, AuthSession } from '../auth/auth-session';
import { apiContextInterceptor } from './api-context.interceptor';

describe('API context interceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;
  const authenticated = signal(true);
  const session: AuthSession = {
    authenticated: authenticated.asReadonly(),
    hasPermission: () => true,
    accessToken: () => 'testing-only',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiContextInterceptor])),
        provideHttpClientTesting(),
        { provide: APP_ENVIRONMENT, useValue: { production: false, apiBaseUrl: '' } },
        { provide: AUTH_SESSION, useValue: session },
      ],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });
  afterEach(() => controller.verify());

  it('adds bearer and correlation headers only to internal API URLs', () => {
    http.get('/api/platform/observability/summary').subscribe();
    const internal = controller.expectOne('/api/platform/observability/summary');
    expect(internal.request.headers.get('Authorization')).toBe('Bearer testing-only');
    expect(internal.request.headers.get('X-Correlation-ID')).toBeTruthy();
    internal.flush({});

    http.get('https://third-party.example/api/track').subscribe();
    const external = controller.expectOne('https://third-party.example/api/track');
    expect(external.request.headers.has('Authorization')).toBe(false);
    expect(external.request.headers.has('X-Correlation-ID')).toBe(false);
    external.flush({});
  });
});
