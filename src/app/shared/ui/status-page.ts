import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  template: `<main class="status-page"><span class="code">403</span><h1>دسترسی غیرمجاز</h1><p>برای دسترسی به این بخش، Permission مناسب لازم است.</p><a mat-flat-button routerLink="/overview">بازگشت به خانه</a></main>`,
  styles: [statusStyles],
})
export class ForbiddenPage {}

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  template: `<main class="status-page"><span class="code">404</span><h1>صفحه پیدا نشد</h1><p>نشانی موردنظر وجود ندارد یا جابه‌جا شده است.</p><a mat-flat-button routerLink="/overview">بازگشت به خانه</a></main>`,
  styles: [statusStyles],
})
export class NotFoundPage {}

const statusStyles = `
  .status-page { min-height: 100dvh; padding: 25px; display: flex; flex-direction: column; gap: 15px; justify-content: center; align-items: center; text-align: center; }
  .code { font: 900 100px 'Segoe UI', sans-serif; letter-spacing: -.1em; color: var(--pf-accent); }
  h1 { margin: 0; font-size: 25px; color: var(--pf-heading); }
  p { margin: 0 0 10px; color: var(--pf-muted); font-size: 13px; }
`;
