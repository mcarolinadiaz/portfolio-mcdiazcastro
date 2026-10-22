import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DropdownMenu } from './dropdown-menu/dropdown-menu';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { ResponsiveService } from '../shared/services/responsive-service';
import { getNavTranslationKey } from '../shared/utils/nav-translation-key';

@Component({
  selector: 'app-navbar',
  imports: [ DropdownMenu, TranslatePipe ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  protected readonly title: string = 'Carolina Díaz';
  protected readonly mobileTitle: string = 'CD';
  readonly sectionTitle = signal('');

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  protected responsiveService = inject(ResponsiveService);

  constructor() {
    this.updateSectionTitle();

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.updateSectionTitle();
      });
  }

  private updateSectionTitle(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.sectionTitle.set(getNavTranslationKey(route.routeConfig?.path));
  }
}
