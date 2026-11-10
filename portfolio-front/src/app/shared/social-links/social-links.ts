import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../icon/icon';
import { UserInformationService } from '../services/user-information-service';

const EXTERNAL_URL_PREFIX = 'http';
/** Protocol, "www." and trailing slash are hidden in the visible address. */
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

  /** `icons`: compact icon buttons (footer). `cards`: large cards with the address (contact page). */
  readonly variant = input<SocialLinksVariant>('icons');

  // Web profiles open in a new tab; mailto links open the mail client.
  protected readonly networks = this.userInformationService
    .getProfessionalNetworks()
    .map((network) => ({
      ...network,
      isExternal: network.url.startsWith(EXTERNAL_URL_PREFIX),
      displayUrl: network.url.replace(DISPLAY_URL_NOISE, ''),
    }));
}
