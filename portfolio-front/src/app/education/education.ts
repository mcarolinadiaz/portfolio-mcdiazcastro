import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { UserInformationService } from '../shared/services/user-information-service';
import { AccordionComponent } from './accordion-component/accordion-component';
import { EducationItem } from './education-item/education-item';
import { ListGroup } from '../shared/list-group/list-group';

@Component({
  selector: 'app-education',
  imports: [AccordionComponent, EducationItem, ListGroup, TranslatePipe],
  templateUrl: './education.html',
  styleUrl: './education.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Education {
  private readonly userInformationService = inject(UserInformationService);
  protected readonly technicalSkills = this.userInformationService.getTechnicalSkills();
  protected readonly education = this.userInformationService.getEducation();
  protected readonly certifications = this.userInformationService.getCertifications();
  protected readonly languages = this.userInformationService.getLanguages();
}
