import { Component, inject } from '@angular/core';
import { UserInformationService } from '../services/user-information-service';

@Component({
  selector: 'app-professional-experience',
  imports: [],
  templateUrl: './professional-experience.html',
  styleUrl: './professional-experience.scss',
})
export class ProfessionalExperience {
  private readonly userInformationService = inject(UserInformationService);

  readonly professionalExperiences = this.userInformationService.getProfessionalExperiences();
}
