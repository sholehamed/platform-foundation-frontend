import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  template: `
    <main class="auth-screen">
      <article class="pf-card sign-in">
        <span class="identity">PF<span>.</span></span>
        <span class="pf-eyebrow">IDENTITY / COMING NEXT</span>
        <h1>اتصال احراز هویت</h1>
        <p>ورود امن به سامانه در مرحله اتصال OIDC و Permissionهای واقعی Backend فعال می‌شود. برای جلوگیری از دسترسی غیرمجاز، فعلاً ورود آزمایشی یا Token ساختگی نداریم.</p>
        <a mat-flat-button routerLink="/overview">بازگشت به فضای کاری</a>
      </article>
    </main>
  `,
  styles: [`
    .auth-screen { min-height: 100dvh; display: grid; place-items: center; padding: 20px; }
    .sign-in { width: min(440px, 100%); padding: 42px; display: flex; flex-direction: column; align-items: flex-start; gap: 13px; }
    .identity { width: 52px; height: 52px; border-radius: 15px; display: grid; place-items: center; background: #263d66; color: white; font: 800 22px 'Segoe UI'; margin-bottom: 12px; }
    .identity span { color: #8cbbef; }
    h1 { font-size: 22px; margin: 4px 0; color: var(--pf-heading); }
    p { font-size: 12px; line-height: 2.2; color: var(--pf-muted); margin: 0 0 14px; }
  `],
})
export class SignInPage {}
