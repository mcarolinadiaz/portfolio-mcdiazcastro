import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../icon/icon';
import { UserInformationService } from '../services/user-information-service';

const EXTERNAL_URL_PREFIX = 'http';

@Component({
  selector: 'app-social-links',
  imports: [Icon, TranslatePipe],
  templateUrl: './social-links.html',
  styleUrl: './social-links.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinks {
  private readonly userInformationService = inject(UserInformationService);

  // Web profiles open in a new tab; mailto links open the mail client.
  protected readonly networks = this.userInformationService
    .getProfessionalNetworks()
    .map((network) => ({ ...network, isExternal: network.url.startsWith(EXTERNAL_URL_PREFIX) }));
}
