import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { APP_PAGE_PATHS } from '../core/constants/app-page-routes';
import { Icon } from '../shared/icon/icon';
import { ParagraphsPipe } from '../shared/pipes/paragraphs-pipe';
import { UserInformationService } from '../shared/services/user-information-service';
import { getNavTranslationKey } from '../shared/utils/nav-translation-key';

@Component({
  selector: 'app-about',
  imports: [RouterLink, TranslatePipe, Icon, ParagraphsPipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  private readonly userInformationService = inject(UserInformationService);

  protected readonly user = this.userInformationService.user();
  protected readonly paths = APP_PAGE_PATHS;
  protected readonly navKey = getNavTranslationKey;
}
