import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { APP_PAGE_PATHS } from '../core/constants/app-page-routes';
import { CURRICULUM } from '../core/constants/curriculum';
import { ProfessionalExperience as Experience } from '../shared/models/professional-experience';
import { Icon } from '../shared/icon/icon';
import { LANGUAGE_LOCALE, LanguageService } from '../shared/services/language-service';
import { UserInformationService } from '../shared/services/user-information-service';
import { DateRange, formatDateRange, spanDateRanges } from '../shared/utils/date-range';
import { getNavTranslationKey } from '../shared/utils/nav-translation-key';
import {
  ExperienceItem,
  ExperienceTimelineEntry,
} from './experience-item/experience-item';

const PRESENT_KEY = 'COMMON.PRESENT';

function getDateRanges(experience: Experience): DateRange[] {
  if (experience.dates?.length) {
    return experience.dates;
  }
  return experience.startDate
    ? [{ startDate: experience.startDate, endDate: experience.endDate ?? null }]
    : [];
}

@Component({
  selector: 'app-professional-experience',
  imports: [ExperienceItem, Icon, TranslatePipe],
  templateUrl: './professional-experience.html',
  styleUrl: './professional-experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalExperience {
  private readonly userInformationService = inject(UserInformationService);
  private readonly languageService = inject(LanguageService);
  private readonly presentLabel = toSignal(inject(TranslateService).stream(PRESENT_KEY), {
    initialValue: PRESENT_KEY,
  });

  private readonly experiences = this.userInformationService
    .getProfessionalExperiences()
    .map((experience) => ({ experience, ranges: getDateRanges(experience) }))
    .filter(({ ranges }) => ranges.length > 0);

  protected readonly titleKey = getNavTranslationKey(APP_PAGE_PATHS.PROFESSIONAL_EXPERIENCE);
  protected readonly curriculum = CURRICULUM;
  protected readonly firstYear = spanDateRanges(
    this.experiences.flatMap(({ ranges }) => ranges),
  ).startDate.getUTCFullYear();

  readonly entries = computed<ExperienceTimelineEntry[]>(() => {
    const locale = LANGUAGE_LOCALE[this.languageService.activeLanguage()];
    const present = this.presentLabel();
    const format = (range: DateRange) => formatDateRange(range, locale, present);

    return this.experiences.map(({ experience, ranges }) => {
      const span = spanDateRanges(ranges);
      return {
        experience,
        dateRange: format(span),
        terms: ranges.length > 1 ? ranges.map(format) : [],
        isCurrent: span.endDate === null,
      };
    });
  });
}
