import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { APP_PAGE_PATHS } from '../core/constants/app-page-routes';
import { DateRangeFormatter } from '../shared/services/date-range-formatter';
import { UserInformationService } from '../shared/services/user-information-service';
import { getExperienceDateRanges, spanDateRanges } from '../shared/utils/date-range';
import { getNavTranslationKey } from '../shared/utils/nav-translation-key';
import { ProfessionalExperience } from '../shared/models/professional-experience';

const SKILL_GROUP_KEY_PREFIX = 'EDUCATION_PAGE.SKILL_GROUPS.';

@Component({
  selector: 'app-education',
  imports: [TranslatePipe],
  templateUrl: './education.html',
  styleUrl: './education.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Education {
  private readonly userInformationService = inject(UserInformationService);
  private readonly dateRangeFormatter = inject(DateRangeFormatter);

  protected readonly titleKey = getNavTranslationKey(APP_PAGE_PATHS.EDUCATION);
  protected readonly education = this.userInformationService.getEducation();
  protected readonly languages = this.userInformationService.getLanguages();
  protected readonly skillGroups = this.userInformationService
    .getTechnicalSkillGroups()
    .map((group) => ({ ...group, titleKey: `${SKILL_GROUP_KEY_PREFIX}${group.category}` }));

  private readonly formatPeriod = (item: ProfessionalExperience): string => {
    const ranges = getExperienceDateRanges(item);
    return ranges.length ? this.dateRangeFormatter.format()(spanDateRanges(ranges)) : '';
  };

  readonly degreePeriod = computed(() => this.formatPeriod(this.education));

  readonly certifications = computed(() =>
    this.userInformationService
      .getCertifications()
      .map((certification) => ({ certification, period: this.formatPeriod(certification) })),
  );
}
