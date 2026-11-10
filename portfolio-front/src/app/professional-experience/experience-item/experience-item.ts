import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProfessionalExperience } from '../../shared/models/professional-experience';

/** An experience ready to render: dates already formatted for the active language. */
export interface ExperienceTimelineEntry {
  readonly experience: ProfessionalExperience;
  /** Whole period, e.g. "Sep 2024 – May 2026". */
  readonly dateRange: string;
  /** Individual periods when the role had several (teaching terms). */
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
