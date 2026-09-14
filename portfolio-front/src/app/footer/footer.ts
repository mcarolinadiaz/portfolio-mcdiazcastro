import { Component, inject } from '@angular/core';
import { UserInformationService } from '../shared/services/user-information-service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly userInformationService = inject(UserInformationService);

  readonly professionalNetworks = this.userInformationService.getProfessionalNetworks();
}
