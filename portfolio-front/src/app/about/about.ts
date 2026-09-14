import { Component, inject } from '@angular/core';
import { CenterContent } from "../shared/center-content/center-content";
import { ResponsiveService } from '../shared/services/responsive-service';
import { UserInformationService } from '../shared/services/user-information-service';

@Component({
  selector: 'app-about',
  imports: [CenterContent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly userInformationService = inject(UserInformationService);
  protected responsiveService = inject(ResponsiveService);
  

  readonly user = this.userInformationService.user();

  readonly technicalSkills = this.userInformationService.getTechnicalSkills();
}
