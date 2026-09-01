import { Component, inject } from '@angular/core';
import { UserInformationService } from '../services/user-information-service';
import { ResponsiveService } from '../services/responsive-service';
import { CenterContent } from "../shared/center-content/center-content";

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
