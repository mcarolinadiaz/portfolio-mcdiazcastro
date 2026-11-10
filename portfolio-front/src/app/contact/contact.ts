import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { APP_PAGE_PATHS } from '../core/constants/app-page-routes';
import { SocialLinks } from '../shared/social-links/social-links';
import { UserInformationService } from '../shared/services/user-information-service';
import { getNavTranslationKey } from '../shared/utils/nav-translation-key';

@Component({
  selector: 'app-contact',
  imports: [SocialLinks, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly navKey = getNavTranslationKey(APP_PAGE_PATHS.CONTACT);
  protected readonly contactInformation = inject(UserInformationService).getContactInformation();
}
