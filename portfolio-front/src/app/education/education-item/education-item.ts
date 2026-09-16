import { Component, input } from '@angular/core';
import { ProfessionalExperience } from '../../shared/models/professional-experience';

@Component({
  imports: [],
  selector: 'app-education-item',
  styleUrl: './education-item.scss',
  templateUrl: './education-item.html',
})
export class EducationItem {
  educationItem = input.required<ProfessionalExperience>();

  getYearEducation() {
    return this.educationItem().startDate?.getFullYear();
  }
}
