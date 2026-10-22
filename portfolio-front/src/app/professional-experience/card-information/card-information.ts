import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ProfessionalExperience } from '../../shared/models/professional-experience';
import { ListGroup } from '../../shared/list-group/list-group';
import { COMPANY } from '../../core/constants/companies';

const DATE_LOCALE = 'en-US';
const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
};
const UNKNOWN_DATE_PLACEHOLDER = '-';
const ZERO = 0;

@Component({
  selector: 'app-card-information',
  imports: [ListGroup, TranslatePipe],
  templateUrl: './card-information.html',
  styleUrl: './card-information.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInformation {
  private readonly translateService = inject(TranslateService);

  readonly professionalExperience = input.required<ProfessionalExperience>();

  protected get experience(): ProfessionalExperience {
    return this.professionalExperience();
  }

  protected get isTeachingAssistant(): boolean {
    return this.experience.company.includes(COMPANY.UNICEN);
  }

  private getToLocaleDateString(date: Date | null | undefined): string {
    return date?.toLocaleDateString(DATE_LOCALE, DATE_FORMAT_OPTIONS) ?? UNKNOWN_DATE_PLACEHOLDER;
  }

  getEndDate(date: Date | null | undefined): string {
    if (date === null) {
      return this.translateService.instant('COMMON.PRESENT');
    }
    return date ? this.getToLocaleDateString(date) : UNKNOWN_DATE_PLACEHOLDER;
  }

  getDateToString(startDate: Date | null | undefined, endDate: Date | null | undefined): string {
    const startDateToString = this.getToLocaleDateString(startDate);
    const endDateToString = this.getEndDate(endDate);
    if (endDate === null || startDate?.getUTCFullYear() !== endDate?.getUTCFullYear()) {
      return `${startDateToString} - ${endDateToString}`;
    }
    return `${startDateToString.split(' ')[ZERO]} - ${endDateToString}`;
  }

  getListGroupItems(dates: { startDate: Date; endDate: Date | null }[] | undefined): string[] {
    if (!dates || dates.length === ZERO) {
      return [];
    }
    return dates.map((dateRange) => {
      return this.getDateToString(dateRange.startDate, dateRange.endDate);
    });
  }
}
