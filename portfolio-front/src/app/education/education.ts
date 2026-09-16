import { Component, inject } from '@angular/core';
import { UserInformationService } from '../shared/services/user-information-service';
import { AccordionComponent } from './accordion-component/accordion-component';
import { EducationItem } from './education-item/education-item';
import { ListGroup } from '../shared/list-group/list-group';

@Component({
  selector: 'app-education',
  imports: [AccordionComponent, EducationItem, ListGroup],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education {
  private readonly userInformationService = inject(UserInformationService);
  readonly technicalSkills = this.userInformationService.getTechnicalSkills();
  readonly education = this.userInformationService.getEducation();
  readonly certifications = this.userInformationService.getCertifications();
  readonly languages = this.userInformationService.getLanguages();
}
