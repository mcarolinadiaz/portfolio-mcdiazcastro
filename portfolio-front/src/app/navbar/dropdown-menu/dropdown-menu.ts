import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ResponsiveService } from '../../shared/services/responsive-service';
import { LanguageSelector } from '../language-selector/language-selector';
import { NAVIGATION_ROUTES } from '../../core/constants/app-page-routes';

@Component({
  selector: 'app-dropdown-menu',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, LanguageSelector],
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenu {
  protected readonly responsiveService = inject(ResponsiveService);
  protected readonly appRoutes = NAVIGATION_ROUTES;
}
