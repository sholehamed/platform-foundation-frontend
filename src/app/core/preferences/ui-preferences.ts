import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';

export type ThemePreference = 'light' | 'dark' | 'system';
export type UiLanguage = 'fa' | 'en';

/** Small application-wide preferences; no auth/session data is persisted. */
@Injectable({ providedIn: 'root' })
export class UiPreferences {
  private readonly doc = inject(DOCUMENT);
  readonly theme = signal<ThemePreference>(this.restoreTheme());
  readonly language = signal<UiLanguage>(this.restoreLanguage());

  constructor() {
    effect(() => {
      const language = this.language();
      this.doc.documentElement.lang = language;
      this.doc.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
      this.persist('pf.language', language);
    });
    effect(() => {
      const theme = this.theme();
      const dark = theme === 'dark' || (theme === 'system' &&
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.doc.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
      this.persist('pf.theme', theme);
    });
  }

  toggleTheme(): void { this.theme.set(this.theme() === 'dark' ? 'light' : 'dark'); }
  toggleLanguage(): void { this.language.set(this.language() === 'fa' ? 'en' : 'fa'); }

  private restoreTheme(): ThemePreference {
    const value = this.read('pf.theme');
    return value === 'light' || value === 'dark' || value === 'system' ? value : 'system';
  }

  private restoreLanguage(): UiLanguage {
    return this.read('pf.language') === 'en' ? 'en' : 'fa';
  }

  private read(key: string): string | null {
    try { return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null; }
    catch { return null; }
  }

  private persist(key: string, value: string): void {
    try { if (typeof localStorage !== 'undefined') localStorage.setItem(key, value); }
    catch { /* Private browsing may prevent preference persistence. */ }
  }
}
