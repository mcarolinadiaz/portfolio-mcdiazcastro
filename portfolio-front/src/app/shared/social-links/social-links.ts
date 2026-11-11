import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../icon/icon';
import { UserInformationService } from '../services/user-information-service';

const EXTERNAL_URL_PREFIX = 'http';
const DISPLAY_URL_NOISE = /^(https?:\/\/(www\.)?|mailto:)|\/$/g;

export type SocialLinksVariant = 'icons' | 'cards';

@Component({
  selector: 'app-social-links',
  imports: [Icon, TranslatePipe],
  templateUrl: './social-links.html',
  styleUrl: './social-links.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinks {
  private readonly userInformationService = inject(UserInformationService);

  readonly variant = input<SocialLinksVariant>('icons');

  protected readonly networks = this.userInformationService
    .getProfessionalNetworks()
    .map((network) => ({
      ...network,
      isExternal: network.url.startsWith(EXTERNAL_URL_PREFIX),
      displayUrl: network.url.replace(DISPLAY_URL_NOISE, ''),
    }));
}
