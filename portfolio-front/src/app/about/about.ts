import { Component, inject } from '@angular/core';
import { UserInformationService } from '../services/user-information-service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly userInformationService = inject(UserInformationService);

  readonly user = this.userInformationService.user();

  readonly technicalSkills = this.userInformationService.getTechnicalSkills();
}
