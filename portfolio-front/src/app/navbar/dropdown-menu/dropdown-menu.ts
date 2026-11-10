import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { ResponsiveService } from '../../shared/services/responsive-service';
import { LanguageSelector } from '../language-selector/language-selector';
import { NAVIGATION_ROUTES } from '../../core/constants/app-page-routes';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-dropdown-menu',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, LanguageSelector, Icon],
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class DropdownMenu {
  protected readonly responsiveService = inject(ResponsiveService);
  protected readonly appRoutes = NAVIGATION_ROUTES;
  protected readonly menuId = 'mobile-menu';
  readonly isMenuOpen = signal(false);

  private readonly router = inject(Router);

  constructor() {
    // Also covers navigation that doesn't come from a menu link (back button).
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenu());
  }

  toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
