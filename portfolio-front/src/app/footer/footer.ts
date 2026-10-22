import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { UserInformationService } from '../shared/services/user-information-service';
import { UrlSanitizerService } from '../shared/services/url-sanitizer-service';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  private readonly userInformationService = inject(UserInformationService);
  private readonly urlSanitizerService = inject(UrlSanitizerService);
  protected readonly professionalNetworks = this.userInformationService.getProfessionalNetworks();
  protected readonly angularSite = this.urlSanitizerService.angularSite;
  protected readonly bootstrapSite = this.urlSanitizerService.bootstrapSite;
  protected readonly vscSite = this.urlSanitizerService.vscSite;
  protected readonly vitestSite = this.urlSanitizerService.vitestSite;
  protected readonly vercelSite = this.urlSanitizerService.vercelSite;
  protected readonly copilotSite = this.urlSanitizerService.copilotSite;
}
