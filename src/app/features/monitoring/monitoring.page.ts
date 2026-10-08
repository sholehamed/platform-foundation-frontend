import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { normalizeApiError } from '../../core/http/api-error';
import { ObservabilityApi } from './data-access/observability.api';
import { TelemetrySummary } from './data-access/telemetry.models';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule],
  template: `
    <section class="monitoring-page">
      <span class="pf-eyebrow">PLATFORM / OBSERVABILITY</span>
      <h1>پایش سیستم</h1>
      <p>اطلاعات واقعی از API مانیتورینگ Backend خوانده می‌شود.</p>
      @if (loading()) {
        <div class="pf-card state"><mat-spinner diameter="34" /><span>در حال دریافت اطلاعات…</span></div>
      } @else if (error()) {
        <div class="pf-card state" role="alert"><strong>{{ error() }}</strong><button mat-stroked-button (click)="reload()">تلاش مجدد</button></div>
      } @else if (summary(); as data) {
        <div class="metrics">
          <article class="pf-card"><span>عملیات</span><strong>{{ data.total }}</strong></article>
          <article class="pf-card"><span>خطاها</span><strong>{{ data.failed }}</strong></article>
          <article class="pf-card"><span>کندی‌ها</span><strong>{{ data.slow }}</strong></article>
          <article class="pf-card"><span>P95 · ms</span><strong>{{ data.p95DurationMs }}</strong></article>
        </div>
        <p class="hint">بازه یک ساعت اخیر · داده‌ها از SQL History خوانده شده‌اند.</p>
      } @else {
        <div class="pf-card state">داده‌ای برای نمایش وجود ندارد.</div>
      }
    </section>
  `,
  styles: [`
    h1 { color: var(--pf-heading); font-size: 25px; margin: 13px 0; }
    p { color: var(--pf-muted); font-size: 12px; line-height: 2; }
    .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 25px; }
    .metrics article { display: flex; flex-direction: column; gap: 15px; padding: 24px; }
    .metrics span { font-size: 12px; color: var(--pf-muted); }
    .metrics strong { font: 800 26px 'Segoe UI', sans-serif; color: var(--pf-heading); }
    .state { margin-top: 25px; padding: 40px; display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
    .hint { margin-top: 20px; }
    @media (max-width: 900px) { .metrics { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 500px) { .metrics { grid-template-columns: 1fr; } }
  `],
})
export class MonitoringPage {
  private readonly api = inject(ObservabilityApi);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly loading = signal(true);
  protected readonly summary = signal<TelemetrySummary | null>(null);
  protected readonly error = signal<string | null>(null);

  constructor() { this.reload(); }

  protected reload(): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.summary().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => { this.summary.set(data); this.loading.set(false); },
      error: (error: unknown) => {
        this.loading.set(false);
        this.error.set(normalizeApiError(error).message);
      },
    });
  }
}
