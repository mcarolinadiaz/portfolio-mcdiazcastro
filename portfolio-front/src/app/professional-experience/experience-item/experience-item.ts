import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProfessionalExperience } from '../../shared/models/professional-experience';

export interface ExperienceTimelineEntry {
  readonly experience: ProfessionalExperience;
  readonly dateRange: string;
  readonly terms: readonly string[];
  readonly isCurrent: boolean;
}

@Component({
  selector: 'app-experience-item',
  imports: [TranslatePipe],
  templateUrl: './experience-item.html',
  styleUrl: './experience-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceItem {
  readonly entry = input.required<ExperienceTimelineEntry>();
  readonly isLast = input(false);
}
