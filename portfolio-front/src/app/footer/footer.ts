import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { UrlSanitizerService } from '../shared/services/url-sanitizer-service';
import { SocialLinks } from '../shared/social-links/social-links';
import { LegacyPreview } from './legacy-preview/legacy-preview';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe, SocialLinks, LegacyPreview],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  private readonly urlSanitizerService = inject(UrlSanitizerService);
  protected readonly angularSite = this.urlSanitizerService.angularSite;
  protected readonly bootstrapSite = this.urlSanitizerService.bootstrapSite;
  protected readonly vscSite = this.urlSanitizerService.vscSite;
  protected readonly vitestSite = this.urlSanitizerService.vitestSite;
  protected readonly vercelSite = this.urlSanitizerService.vercelSite;
  protected readonly copilotSite = this.urlSanitizerService.copilotSite;
}
