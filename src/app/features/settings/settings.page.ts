import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UiPreferences, ThemePreference } from '../../core/preferences/ui-preferences';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <section class="preferences">
      <span class="pf-eyebrow">WORKSPACE / SETTINGS</span>
      <h1>{{ ui.language() === 'fa' ? 'تنظیمات محیط' : 'Workspace settings' }}</h1>
      <p class="pf-muted">{{ ui.language() === 'fa' ? 'تنظیمات نمایشی روی همین مرورگر ذخیره می‌شوند؛ اطلاعات حساب کاربری در این بخش نگهداری نمی‌شود.' : 'Appearance preferences stay in this browser. Authentication is managed separately.' }}</p>
      <div class="pf-card preference-card">
        <h2>{{ ui.language() === 'fa' ? 'پوسته و نمایش' : 'Appearance' }}</h2>
        <div class="choice-row" role="group" aria-label="Theme selection">
          @for (mode of modes; track mode.value) {
            <button mat-stroked-button [class.selected]="ui.theme() === mode.value" (click)="selectMode(mode.value)">
              {{ ui.language() === 'fa' ? mode.fa : mode.en }}
            </button>
          }
        </div>
        <hr />
        <h2>{{ ui.language() === 'fa' ? 'زبان و جهت صفحه' : 'Language and direction' }}</h2>
        <div class="choice-row">
          <button mat-stroked-button [class.selected]="ui.language() === 'fa'" (click)="ui.language.set('fa')">فارسی · RTL</button>
          <button mat-stroked-button [class.selected]="ui.language() === 'en'" (click)="ui.language.set('en')">English · LTR</button>
        </div>
      </div>
      <p class="footnote">{{ ui.language() === 'fa' ? 'اتصال حساب کاربری و تنظیمات سمت سرور در مرحله Auth تکمیل می‌شوند.' : 'Account settings will be connected when OIDC is implemented.' }}</p>
    </section>
  `,
  styles: [`
    .preferences { max-width: 800px; }
    h1 { color: var(--pf-heading); font-size: 26px; margin: 13px 0 8px; }
    p { font-size: 12px; line-height: 2; }
    .preference-card { margin-top: 30px; padding: 28px; }
    h2 { font-size: 15px; margin: 6px 0 16px; color: var(--pf-heading); }
    .choice-row { display: flex; flex-wrap: wrap; gap: 12px; }
    .choice-row button.selected { border-color: var(--pf-accent); background: var(--pf-active); color: var(--pf-accent); }
    hr { border: 0; border-top: 1px solid var(--pf-border); margin: 25px 0; }
    .footnote { margin-top: 23px; color: var(--pf-muted); }
  `],
})
export class SettingsPage {
  protected readonly ui = inject(UiPreferences);
  protected readonly modes: ReadonlyArray<{ value: ThemePreference; fa: string; en: string }> = [
    { value: 'light', fa: 'روشن', en: 'Light' },
    { value: 'dark', fa: 'تاریک', en: 'Dark' },
    { value: 'system', fa: 'سیستم', en: 'System' },
  ];
  protected selectMode(mode: ThemePreference): void { this.ui.theme.set(mode); }
}
