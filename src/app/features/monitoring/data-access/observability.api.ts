import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_ENVIRONMENT } from '../../../core/config/app-environment';
import {
  LiveSnapshot, TelemetryItem, TelemetryPage, TelemetryQuery,
  TelemetrySummary, TelemetryTraceResult,
} from './telemetry.models';

/** Typed backend adapter. No embedded dashboards, fake auth or hard-coded metrics. */
@Injectable({ providedIn: 'root' })
export class ObservabilityApi {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_ENVIRONMENT);
  private get url(): string {
    return this.config.apiBaseUrl.replace(/\/$/, '') + '/api/platform/observability';
  }

  live(minutes = 15, limit = 50): Observable<LiveSnapshot> {
    return this.http.get<LiveSnapshot>(this.url + '/snapshot', {
      params: new HttpParams().set('minutes', minutes).set('limit', limit),
    });
  }

  summary(from?: string, to?: string): Observable<TelemetrySummary> {
    return this.http.get<TelemetrySummary>(this.url + '/summary', {
      params: this.parameters({ from, to }),
    });
  }

  records(query: TelemetryQuery = {}): Observable<TelemetryPage<TelemetryItem>> {
    return this.http.get<TelemetryPage<TelemetryItem>>(this.url + '/records', {
      params: this.parameters(query),
    });
  }

  trace(traceId: string, from?: string, to?: string): Observable<TelemetryTraceResult> {
    if (!/^[a-f0-9]{32}$/i.test(traceId)) throw new Error('Invalid trace ID.');
    return this.http.get<TelemetryTraceResult>(this.url + '/traces/' + traceId, {
      params: this.parameters({ from, to }),
    });
  }

  private parameters(values: Record<string, string | number | boolean | undefined>): HttpParams {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(values)) {
      if (value !== undefined && value !== '') params = params.set(key, String(value));
    }
    return params;
  }
}
