import { Component, inject } from '@angular/core';
import { UserInformationService } from '../shared/services/user-information-service';
import { UrlSanitizerService } from '../shared/services/url-sanitizer-service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly userInformationService = inject(UserInformationService);
  private readonly urlSanitizerService = inject(UrlSanitizerService);
  readonly professionalNetworks = this.userInformationService.getProfessionalNetworks();
  readonly angularSite = this.urlSanitizerService.angularSite;
  readonly bootstrapSite = this.urlSanitizerService.bootstrapSite;
  readonly vscSite = this.urlSanitizerService.vscSite;
  readonly vitestSite = this.urlSanitizerService.vitestSite;
  readonly vercelSite = this.urlSanitizerService.vercelSite;
  readonly copilotSite = this.urlSanitizerService.copilotSite;
}
