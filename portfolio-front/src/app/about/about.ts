import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CenterContent } from "../shared/center-content/center-content";
import { ResponsiveService } from '../shared/services/responsive-service';
import { UserInformationService } from '../shared/services/user-information-service';

@Component({
  selector: 'app-about',
  imports: [CenterContent, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  private readonly userInformationService = inject(UserInformationService);
  protected readonly responsiveService = inject(ResponsiveService);

  protected readonly user = this.userInformationService.user();

  protected readonly technicalSkills = this.userInformationService.getTechnicalSkills();
}
