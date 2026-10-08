import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UiPreferences } from '../../core/preferences/ui-preferences';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './overview.page.html',
  styleUrl: './overview.page.scss',
})
export class OverviewPage {
  protected readonly ui = inject(UiPreferences);
  protected readonly cards = [
    { icon: '◇', categoryFa: 'معماری', categoryEn: 'ARCHITECTURE', titleFa: 'ماژول‌های مستقل', titleEn: 'Feature-first modules', descriptionFa: 'قابلیت‌ها با مسیر، State و قرارداد اختصاصی توسعه داده می‌شوند.', descriptionEn: 'Each feature owns its routes, state and API contracts.' },
    { icon: '◉', categoryFa: 'رصد و پایش', categoryEn: 'OBSERVABILITY', titleFa: 'پایش یکپارچه', titleEn: 'Unified monitoring', descriptionFa: 'قراردادهای تایپ‌شده برای درخواست‌ها، رخدادها و عملکرد سیستم.', descriptionEn: 'Typed APIs for operations, traces, logs and performance.' },
    { icon: '✧', categoryFa: 'رابط کاربری', categoryEn: 'DESIGN SYSTEM', titleFa: 'سیستم طراحی منعطف', titleEn: 'Adaptive design system', descriptionFa: 'Material 3 با RTL و پوسته‌های روشن و تاریک.', descriptionEn: 'Material 3 with RTL and adaptive light/dark themes.' },
  ];
  protected readonly layers = [
    { label: 'Angular', description: '22 · Standalone · Signals', badge: 'READY' },
    { label: 'UI foundation', description: 'Angular Material 3 · CDK', badge: 'READY' },
    { label: 'Backend contracts', description: '.NET · Typed HTTP client', badge: 'PLANNED' },
    { label: 'Identity & OIDC', description: 'Secure sign-in · Permissions', badge: 'NEXT' },
  ];
  protected fa(): boolean { return this.ui.language() === 'fa'; }
}
