import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardInformation } from "./card-information/card-information";
import { UserInformationService } from '../shared/services/user-information-service';

@Component({
  selector: 'app-professional-experience',
  imports: [CardInformation],
  templateUrl: './professional-experience.html',
  styleUrl: './professional-experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalExperience {
  private readonly userInformationService = inject(UserInformationService);

  protected readonly professionalExperiences = this.userInformationService.getProfessionalExperiences();
}
