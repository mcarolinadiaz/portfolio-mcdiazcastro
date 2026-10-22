import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProfessionalExperience } from '../../shared/models/professional-experience';

@Component({
  imports: [TranslatePipe],
  selector: 'app-education-item',
  styleUrl: './education-item.scss',
  templateUrl: './education-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationItem {
  readonly educationItem = input.required<ProfessionalExperience>();

  protected getYearEducation() {
    return this.educationItem().startDate?.getFullYear();
  }
}
