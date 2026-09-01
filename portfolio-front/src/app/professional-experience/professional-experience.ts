import { Component, inject } from '@angular/core';
import { UserInformationService } from '../services/user-information-service';
import { CardInformation } from "./card-information/card-information";

@Component({
  selector: 'app-professional-experience',
  imports: [CardInformation],
  templateUrl: './professional-experience.html',
  styleUrl: './professional-experience.scss',
})
export class ProfessionalExperience {
  private readonly userInformationService = inject(UserInformationService);

  professionalExperiences = this.userInformationService.getProfessionalExperiences();
}
