import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { beforeEach, afterEach, describe, expect, it } from 'vitest';
import { APP_ENVIRONMENT } from '../../../core/config/app-environment';
import { ObservabilityApi } from './observability.api';
import { TelemetryKind } from './telemetry.models';

describe('ObservabilityApi', () => {
  let api: ObservabilityApi;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: APP_ENVIRONMENT, useValue: { production: false, apiBaseUrl: '' } },
      ],
    });
    api = TestBed.inject(ObservabilityApi);
    backend = TestBed.inject(HttpTestingController);
  });
  afterEach(() => backend.verify());

  it('builds typed and bounded records query params', () => {
    api.records({ kind: TelemetryKind.Trace, page: 2, pageSize: 25 }).subscribe();
    const req = backend.expectOne((request) => request.url.endsWith('/records'));
    expect(req.request.params.get('kind')).toBe('2');
    expect(req.request.params.get('page')).toBe('2');
    expect(req.request.params.get('pageSize')).toBe('25');
    req.flush({ items: [], total: 0, page: 2, pageSize: 25 });
  });

  it('rejects invalid trace IDs before fetching', () => {
    expect(() => api.trace('invalid')).toThrow();
    backend.expectNone((req) => req.url.includes('/traces/'));
  });
});
