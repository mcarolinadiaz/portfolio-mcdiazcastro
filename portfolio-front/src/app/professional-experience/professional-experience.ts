import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { APP_PAGE_PATHS } from '../core/constants/app-page-routes';
import { CURRICULUM } from '../core/constants/curriculum';
import { Icon } from '../shared/icon/icon';
import { DateRangeFormatter } from '../shared/services/date-range-formatter';
import { LanguageService } from '../shared/services/language-service';
import { UserInformationService } from '../shared/services/user-information-service';
import { getExperienceDateRanges, spanDateRanges } from '../shared/utils/date-range';
import { getNavTranslationKey } from '../shared/utils/nav-translation-key';
import { ExperienceItem, ExperienceTimelineEntry } from './experience-item/experience-item';

@Component({
  selector: 'app-professional-experience',
  imports: [ExperienceItem, Icon, TranslatePipe],
  templateUrl: './professional-experience.html',
  styleUrl: './professional-experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalExperience {
  private readonly userInformationService = inject(UserInformationService);
  private readonly dateRangeFormatter = inject(DateRangeFormatter);
  private readonly languageService = inject(LanguageService);

  private readonly experiences = this.userInformationService
    .getProfessionalExperiences()
    .map((experience) => ({ experience, ranges: getExperienceDateRanges(experience) }))
    .filter(({ ranges }) => ranges.length > 0);

  protected readonly titleKey = getNavTranslationKey(APP_PAGE_PATHS.PROFESSIONAL_EXPERIENCE);
  protected readonly curriculumFileName = CURRICULUM.fileName;
  protected readonly curriculumPath = computed(
    () => CURRICULUM.paths[this.languageService.activeLanguage()],
  );
  protected readonly firstYear = spanDateRanges(
    this.experiences.flatMap(({ ranges }) => ranges),
  ).startDate.getUTCFullYear();

  readonly entries = computed<ExperienceTimelineEntry[]>(() => {
    const format = this.dateRangeFormatter.format();

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
