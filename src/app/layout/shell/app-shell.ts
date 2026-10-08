import { Component, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { UiPreferences } from '../../core/preferences/ui-preferences';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [MatButtonModule, MatSidenavModule, MatToolbarModule, MatTooltipModule,
    RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
})
export class AppShell {
  protected readonly preferences = inject(UiPreferences);
  private readonly breakpoint = inject(BreakpointObserver);
  protected readonly compact = toSignal(
    this.breakpoint.observe('(max-width: 900px)').pipe(map((result) => result.matches)),
    { initialValue: false },
  );
  protected readonly menu = [
    { path: '/overview', icon: '◈', labelFa: 'نمای کلی', labelEn: 'Overview' },
    { path: '/monitoring', icon: '◎', labelFa: 'پایش سیستم', labelEn: 'Monitoring' },
    { path: '/settings', icon: '⚙', labelFa: 'تنظیمات', labelEn: 'Settings' },
  ] as const;

  protected isFa(): boolean { return this.preferences.language() === 'fa'; }
  protected closeMobile(drawer: MatSidenav): void {
    if (this.compact()) void drawer.close();
  }
}
